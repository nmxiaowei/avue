<template>
  <div :class="b()">
    <el-input :prefix-icon="prefixIcon"
              :suffix-icon="suffixIcon"
              :size="size"
              @clear="handleClear"
              :clearable="clearableVal"
              :rows="rows"
              :autosize="{ minRows: minRows, maxRows: maxRows}"
              :disabled="disabled"
              ref="main"
              :model-value="address"
              @focus="handleShow"
              @click.="handleClick"
              :placeholder="placeholder">
    </el-input>
    <div v-if="box">
      <el-dialog class="avue-dialog"
                 :width="dialogWidth"
                 :before-close="beforeClose"
                 :append-to-body="$AVUE.appendToBody"
                 lock-scroll
                 :title="placeholder"
                 @close="handleClose"
                 v-model="box">
        <div :class="b('content')"
             v-if="box">
          <el-input :class="b('content-input')"
                    id="map__input"
                    :size="size"
                    @clear="clear"
                    :readonly="disabled"
                    v-model="formattedAddress"
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
        <span class="avue-dialog__footer">
          <el-button type="primary"
                     :size="size"
                     icon="el-icon-check"
                     v-if="!(disabled || readonly)"
                     @click="handleSubmit">{{t("common.submitBtn")}}</el-button>
        </span>

      </el-dialog>
    </div>

  </div>
</template>
<script>
import packages from "core/packages";
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
import locale from "core/locale";
export default create({
  name: "input-map",
  mixins: [props(), event(), locale],
  props: {
    beforeClose: Function,
    mapChange: Function,
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    dialogWidth: {
      type: String,
      default: '80%'
    },
    rows: Number,
    minRows: {
      type: Number,
      default: 1
    },
    maxRows: {
      type: Number
    }
  },
  data () {
    return {
      formattedAddress: '',
      address: '',
      poi: {},
      marker: null,
      map: null,
      box: false
    };
  },
  watch: {
    poi (val) {
      this.formattedAddress = val.formattedAddress
    },
    value (val) {
      if (this.validatenull(val)) {
        this.poi = {}
        this.address = ''
      }
    },
    text (val) {
      if (!this.validatenull(val)) {
        this.poi = {
          longitude: val[0],
          latitude: val[1],
          formattedAddress: val[2],
        }
        this.address = val[2];
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
    longitude () {
      return this.text[0]
    },
    latitude () {
      return this.text[1]
    },
    title () {
      return (this.disabled || this.readonly) ? "查看" : '选择'
    }
  },
  methods: {
    handleTextValue (val) {
      if (!this.validatenull(val)) {
        this.poi = {
          longitude: val[0],
          latitude: val[1],
          formattedAddress: val[2],
        }
        this.address = val[2];
      }
    },
    handleModelValue (val) {
      if (this.validatenull(val)) this.poi = {}
    },
    clear () {
      this.poi = {};
      this.clearMarker();
    },
    handleSubmit () {
      this.setVal()
      this.box = false;
    },
    handleClear () {
      this.text = [];
      this.poi = {};
      this.handleChange(this.text)
      setTimeout(() => {
        this.box = false;
      }, 0)
    },
    setVal () {
      this.text = [this.poi.longitude, this.poi.latitude, this.poi.formattedAddress]
      this.handleChange(this.text)
    },
    handleShow () {
      this.$refs.main.blur();
      this.box = true;
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
      //回调函数
      let geocoder = new window.AMap.Geocoder({});
      geocoder.getAddress([R, P], (status, result) => {
        if (status === "complete" && result.info === "OK") {
          this.mapChange && this.mapChange(result)
          const regeocode = result.regeocode;
          this.poi = Object.assign(regeocode, {
            longitude: R,
            latitude: P
          });
          // 自定义点标记内容
          var markerContent = document.createElement("div");
          // 点标记中的图标
          var markerImg = document.createElement("img");
          markerImg.style.width = "25px"
          markerImg.src =
            "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png";
          markerContent.appendChild(markerImg);

          // 点标记中的文本
          var markerSpan = document.createElement("span");
          markerSpan.className = "avue-input-map__marker";
          markerSpan.innerHTML = this.poi.formattedAddress;
          markerContent.appendChild(markerSpan);
          this.marker.setContent(markerContent); //更新点标记内容
        }
      });
    },
    handleClose () {
      window.poiPicker.clearSearchResults();
    },
    addClick () {
      this.map.on("click", e => {
        if (this.disabled || this.readonly) return
        const lnglat = e.lnglat;
        const P = lnglat.lat;
        const R = lnglat.lng;
        this.addMarker(R, P);
        this.getAddress(R, P);
      });
    },
    init (callback) {
      if (!window.AMap) {
        packages.logs('Map')
        return
      }
      this.map = new window.AMap.Map("map__container", Object.assign({
        zoom: 13,
        center: (() => {
          if (this.longitude && this.latitude) return [this.longitude, this.latitude];
        })()
      }, this.params));
      this.initPoip();
      this.addClick();
      callback();
    },
    initPoip () {
      if (!window.AMapUI) {
        packages.logs('MapUi')
        return
      }
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
          longitude: poi.location.lng,
          latitude: poi.location.lat
        });
        if (source !== "search") {
          poiPicker.searchByKeyword(poi.name);
        }
      });
    }
  }
});
</script>
