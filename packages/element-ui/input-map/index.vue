<template>
  <div :class="b()">
    <el-input readonly
              :size="size"
              :disabled="disabled"
              v-model="formattedAddress"
              :placeholder="placeholder">
      <el-button @click="handleOpen"
                 slot="append">{{title}}</el-button>
    </el-input>

    <el-dialog class="avue-dialog"
               width="80%"
               append-to-body
               modal-append-to-body
               :title="label"
               @close="handleClose"
               :visible.sync="box">
      <div :class="b('content')"
           v-if="box">
        <el-input :class="b('content-input')"
                  id="map__input"
                  :readonly="disabled"
                  v-model="address"
                  clearable
                  placeholder="输入关键字选取地点"></el-input>
        <div :class="b('content-box')">
          <div id="map__container"
               :class="b('content-container')"
               tabindex="0"></div>
          <div id="map__result"
               :class="b('content-result')"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "input-map",
  mixins: [props(), event()],
  data () {
    return {
      address: '',
      poi: {},
      marker: null,
      map: null,
      box: false
    };
  },
  watch: {
    formattedAddress () {
      this.address = this.formattedAddress;
    },
    text (val) {
      if (!this.validatenull(val)) {
        this.poi = {
          longitude: val[0],
          latitude: val[1],
          formattedAddress: val[2],
        }
      }
    },
    box: {
      handler () {
        if (this.box) {
          this.$nextTick(() =>
            this.init(() => {
              if (this.longitude && this.latitude) {
                this.addMarker(this.longitude, this.latitude);
                this.getAddress(this.longitude, this.latitude);
              }
            })
          );
        }
      },
      immediate: true
    }
  },
  computed: {
    formattedAddress () {
      return this.poi.formattedAddress
    },
    longitude () {
      return this.poi.longitude
    },
    latitude () {
      return this.poi.latitude
    },
    title () {
      return this.disabled ? "查看坐标" : '选择坐标'
    }
  },
  methods: {
    setVal () {
      this.text = [this.poi.longitude, this.poi.latitude, this.poi.formattedAddress]
      this.handleChange(this.text)
    },
    handleOpen () {
      this.box = true
    },
    //新增坐标
    addMarker (R, P) {
      this.clearMarker();
      this.marker = new window.AMap.Marker({
        position: [R, P]
      });
      this.marker.setMap(this.map);
    },
    //清空坐标
    clearMarker () {
      if (this.marker) {
        this.marker.setMap(null);
        this.marker = null;
      }
    },
    //获取坐标
    getAddress (R, P) {
      new window.AMap.service("AMap.Geocoder", () => {
        //回调函数
        let geocoder = new window.AMap.Geocoder({});
        geocoder.getAddress([R, P], (status, result) => {
          if (status === "complete" && result.info === "OK") {
            const regeocode = result.regeocode;
            this.poi = Object.assign(regeocode, {
              longitude: R,
              latitude: P
            });
            this.setVal();
            // 自定义点标记内容
            var markerContent = document.createElement("div");

            // 点标记中的图标
            var markerImg = document.createElement("img");
            markerImg.src =
              "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png";
            markerContent.appendChild(markerImg);

            // 点标记中的文本
            var markerSpan = document.createElement("span");
            markerSpan.className = "avue-input-map__marker";
            markerSpan.innerHTML = this.formattedAddress;
            markerContent.appendChild(markerSpan);
            this.marker.setContent(markerContent); //更新点标记内容
          }
        });
      });
    },
    handleClose () {
      window.poiPicker.clearSearchResults();
    },
    addClick () {
      this.map.on("click", e => {
        if (this.disabled || this.readonly) return
        const lnglat = e.lnglat;
        const P = lnglat.P || lnglat.Q;
        const R = lnglat.R;
        this.addMarker(R, P);
        this.getAddress(R, P);
      });
    },
    init (callback) {
      this.map = new window.AMap.Map("map__container", {
        zoom: 13,
        center: (() => {
          if (this.longitude && this.latitude) {
            return [this.longitude, this.latitude];
          }
        })()
      });
      this.initPoip();
      this.addClick();
      callback();
    },
    initPoip () {
      window.AMapUI.loadUI(["misc/PoiPicker"], PoiPicker => {
        var poiPicker = new PoiPicker({
          input: "map__input",
          placeSearchOptions: {
            map: this.map,
            pageSize: 10
          },
          searchResultsContainer: "map__result"
        });
        //初始化poiPicker
        this.poiPickerReady(poiPicker);
      });
    },
    poiPickerReady (poiPicker) {
      window.poiPicker = poiPicker;
      //选取了某个POI
      poiPicker.on("poiPicked", poiResult => {
        this.clearMarker();
        var source = poiResult.source,
          poi = poiResult.item;
        this.poi = Object.assign(poi, {
          formattedAddress: poi.name,
          longitude: poi.location.R,
          latitude: poi.location.P || poi.location.Q
        });
        this.setVal()
        if (source !== "search") {
          poiPicker.searchByKeyword(poi.name);
        }
      });
    }
  }
});
</script>
