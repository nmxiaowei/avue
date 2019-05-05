<template>
  <div :class="b()"
       :style="styleSizeName">
    <el-dialog :visible.sync="visible"
               modal-append-to-body
               append-to-body
               width="30%">
      <avue-checkbox :dic="columnList"
                     v-model="columnData"></avue-checkbox>
    </el-dialog>
    <div :class="b('menu')"
         :style="styleMenuName">
      <i class="el-icon-menu"
         v-if="columnShow"
         @click="visible=true"></i>
    </div>
    <div :style="styleTdName"
         :class="b('table',{'line':!line})">
      <div :class="b('tr')">
        <div :class="b('td')"
             :style="[styleThName,{width:setPx(indexWidth)}]"
             v-if="index">
          {{indexLabel}}
        </div>
        <div :class="b('td')"
             v-for="(item,index) in columnOption"
             :style="[styleThName,styleWidth(item)]"
             v-if="columnData.includes(item.prop)"
             :key="index"
             @click="handleSortable(item.prop)">
          {{item.label}}
        </div>
      </div>
      <div :class="b('body')"
           ref="body"
           :style="styleSizeName">
        <div :class="b('tr',['line'])"
             v-for="(citem,cindex) in dataTabel"
             :style="[styleTrName(cindex),{ top:setPx(cindex * lineHeight +top)}]"
             :key="cindex">
          <div :class="b('td')"
               :style="[styleThName,styleWidth(citem)]"
               :key="index"
               v-if="index">
            <div :class="b('index',[(cindex+1)+''])"> {{(cindex+1)}}</div>
          </div>
          <div :class="b('td')"
               v-for="(item,index) in columnOption"
               v-if="columnData.includes(item.prop)"
               :style="[styleTdName,styleWidth(item)]"
               :key="index">
            <span v-html="citem[item.prop]"></span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "table",
  data() {
    return {
      visible: false,
      columnData: [],
      indexWidth: 50,
      top: 0,
      prop: "",
      scrollCheck: "",
      activeIndex: 0,
      query: {}
    };
  },
  watch: {
    scrollCount() {
      this.setTime();
    },
    count() {
      this.setTime();
    },
    scrollTime() {
      this.setTime();
    },
    count() {
      this.setTime();
    },
    scroll: {
      handler(val) {
        this.setTime();
      },
      immediate: true
    }
  },
  created() {
    this.columnList.forEach(ele => {
      if (!this.columnShowList.includes(ele.value)) {
        this.columnData.push(ele.value);
      }
    });
  },
  computed: {
    columnList() {
      let list = this.columnOption.map(ele => {
        if (!this.columnShowWhite.includes(ele.prop)) {
          return {
            label: ele.label,
            value: ele.prop
          };
        }
        return false;
      });
      return list.filter(ele => {
        return ele.value;
      });
    },
    columnShow() {
      return this.option.columnShow;
    },
    columnShowWhite() {
      return this.option.columnShowWhite || [];
    },
    columnShowList() {
      return this.option.columnShowList || [];
    },
    dataTabel() {
      let list = this.dataChart;
      if (!this.validatenull(this.prop)) {
        list = this.sortArrys(list, this.prop);
      }
      return list;
    },
    allHeight() {
      const count = this.count - 1;
      const calcState = this.dataChartLen - count;
      return calcState * this.lineHeight;
    },
    count() {
      return (this.option.count || 10) + 1;
    },
    dataChartLen() {
      return this.dataChart.length;
    },
    lineHeight() {
      return parseInt(this.height / this.count);
    },
    index() {
      return this.option.index;
    },
    scroll() {
      return this.option.scroll;
    },
    scrollTime() {
      return this.option.scrollTime || 5000;
    },
    indexLabel() {
      return this.option.indexLabel || "排名";
    },
    line() {
      return this.option.line;
    },
    fontSize() {
      return this.option.fontSize || 14;
    },
    scrollCount() {
      return this.option.scrollCount || this.count;
    },
    speed() {
      return this.scrollCount * this.lineHeight;
    },
    styleThName() {
      return {
        fontSize: this.setPx(this.fontSize),
        textAlign: this.option.headerTextAlign || "center",
        background: this.option.headerBackground || "rgba(0, 0, 0, 0.01)",
        color: this.option.headerColor || "rgba(154, 168, 212, 1)"
      };
    },
    columnOption() {
      return this.crudOption.column || [];
    },
    styleTdName() {
      return {
        fontSize: this.setPx(this.fontSize),
        lineHeight: this.setPx(this.lineHeight),
        textAlign: this.option.bodyTextAlign || "center",
        background: this.option.bodyBackground || "rgba(0, 0, 0, 0.01)",
        color: this.option.bodyColor || "rgba(154, 168, 212, 1)",
        borderColor: this.option.borderColor || "rgba(51, 65, 107, 1)"
      };
    },
    styleMenuName() {
      return {
        color: this.option.headerColor || "rgba(154, 168, 212, 1)"
      };
    },
    crudOption() {
      return Object.assign(this.option, {
        menu: false,
        align: "center",
        headerAlign: "center",
        header: false
      });
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    styleWidth(item) {
      return {
        width: this.setPx(item.width),
        flex: item.width ? "auto" : 1
      };
    },
    resetData() {
      this.top = 0;
    },
    handleSortable(prop) {
      this.prop = prop;
    },
    setTime() {
      this.top = 0;
      clearInterval(this.scrollCheck);
      if (this.scroll) {
        this.scrollCheck = setInterval(() => {
          if (this.top <= -this.allHeight) {
            this.top = 0;
          } else {
            this.top = this.top - this.speed;
          }
        }, this.scrollTime);
      }
    },
    styleTrName(index) {
      let result = {
        lineHeight: this.setPx(this.lineHeight)
      };
      if (index % 2 === 0) {
        result.background = this.option.othColor;
      } else {
        result.background = this.option.nthColor;
      }
      return result;
    },
    handleClick(value, index) {
      this.activeIndex = index;
      this.query.type = value;
      this.updateData();
    }
  }
});
</script>


