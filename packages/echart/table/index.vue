<template>
  <div :class="b()"
       :style="[styleSizeName,{overflow:(scroll?'hidden':'inherit')}]">
    <el-dialog :visible.sync="visible"
               modal-append-to-body
               append-to-body
               title="数据显隐"
               width="30%">
      <avue-checkbox :dic="columnOption"
                     :props="{value:'prop'}"
                     v-model="columnData"></avue-checkbox>
    </el-dialog>
    <el-dialog :visible.sync="listVisible"
               modal-append-to-body
               :class="b('allview')"
               title="详细数据"
               append-to-body
               width="80%">
      <avue-crud :option="listOption"
                 :data="dataTabel"></avue-crud>
    </el-dialog>
    <div :style="styleTdName"
         :class="b('table')">
      <div :class="b('tr')">
        <div :class="b('td')"
             :style="[styleThName,styleWidth(indexWidth)]"
             v-if="index">
          <div :class="b('menu')"
               :style="styleMenuName">
            <i class="el-icon-menu"
               v-if="columnShow"
               @click="visible=true"></i>
            <i class="el-icon-view"
               v-if="columnViews"
               @click="listVisible=true"></i>
          </div>
        </div>
        <template v-for="(item,index) in columnOption">
          <div :class="b('td')"
               :style="[styleThName,styleWidth(item.width)]"
               v-if="(columnData || []).includes(item.prop)"
               :key="index"
               @click="handleSortable(item.prop)">
            {{item.label}}
          </div>
        </template>
      </div>
      <div :class="b('tr')"
           v-if="totalFlag">
        <div :class="[b('td')]"
             :style="[styleWidth(indexWidth)]"
             v-if="index">
          合计
        </div>
        <template v-for="(item,index) in columnOption">
          <div :class="b('td')"
               :style="[styleWidth(item.width)]"
               v-if="(columnData || []).includes(item.prop)"
               :key="index">
            {{totalData[item.prop]}}
          </div>
        </template>
      </div>
      <div :class="b('body')"
           ref="body"
           :style="styleSizeName">
        <transition-group :enter-active-class="option.enterActiveClass"
                          :leave-active-class="option.leaveActiveClass"
                          tag="div">
          <div v-for="(citem,cindex) in dataTabel"
               @click="rowClick(citem,cindex)"
               :key="dataTabelLen-cindex"
               :class="b('tr',['line'])"
               :style="[styleTrName(cindex),{ top:setPx(cindex * lineHeight +top)}]">
            <div :class="b('td')"
                 :style="[styleWidth(indexWidth)]"
                 :key="index"
                 v-if="index">
              <div :class="b('index',[(cindex+1)+''])"> {{(cindex+1)}}</div>
            </div>
            <template v-for="(item,index) in columnOption">
              <div :class="b('td')"
                   v-if="(columnData ||[]).includes(item.prop)"
                   :style="[styleTdName,styleWidth(item.width)]"
                   :key="index">
                <el-tooltip class="item"
                            effect="dark"
                            :content="citem[item.prop]"
                            placement="top">
                  <span v-html="citem[item.prop]"></span>
                </el-tooltip>
              </div>
            </template>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "table",
  data () {
    return {
      visible: false,
      listVisible: false,
      columnData: [],
      indexWidth: 80,
      top: 0,
      prop: "",
      scrollCheck: "",
      activeIndex: 0,
      query: {}
    };
  },
  watch: {
    columnOption: {
      handler () {
        this.columnData = [];
        this.columnOption.forEach(ele => {
          if (ele.hide != true) {
            this.columnData.push(ele.prop);
          }
        });
      },
      immediate: true
    },
    scrollCount () {
      this.setTime();
    },
    count () {
      this.setTime();
    },
    scrollTime () {
      this.setTime();
    },
    count () {
      this.setTime();
    },
    scroll: {
      handler (val) {
        this.setTime();
      },
      immediate: true
    }
  },
  computed: {
    listOption () {
      return Object.assign(
        {
          align: "center",
          headerAlign: "center",
          size: "mini",
          menu: false,
          header: false,
          height: 500,
          sumText: "合计",
          showSummary: true,
          column: this.option.column
        },
        (() => {
          return {
            sumColumnList: this.totalList.map(column => {
              return {
                name: column,
                type: "sum"
              };
            })
          };
        })()
      );
    },
    totalList () {
      return this.option.totalList || [];
    },
    totalFlag () {
      return !this.validatenull(this.totalList);
    },
    totalData () {
      let obj = {};
      this.totalList.forEach(prop => {
        this.dataChart.forEach(ele => {
          obj[prop] = (obj[prop] || 0) + Number(ele[prop]);
          obj[prop] = Number(obj[prop].toFixed(2));
        });
      });
      return obj;
    },
    columnShow () {
      return this.option.columnShow;
    },
    columnViews () {
      return this.option.columnViews;
    },
    columnShowWhite () {
      return this.option.columnShowWhite || [];
    },
    columnShowList () {
      return this.option.columnShowList || [];
    },
    dataTabelLen () {
      return this.dataChart.length;
    },
    dataTabel () {
      let list = this.dataChart;
      if (!this.validatenull(this.prop)) {
        list = this.sortArrys(list, this.prop);
      }
      return list;
    },
    allHeight () {
      const count = this.count - (this.totalFlag ? 2 : 1);
      const calcState = this.dataChartLen - count;
      return calcState * this.lineHeight;
    },
    count () {
      return (this.option.count || 10) + 1;
    },
    dataChartLen () {
      return (this.dataChart || []).length;
    },
    lineHeight () {
      return parseInt(this.height / this.count);
    },
    index () {
      return this.option.index;
    },
    scroll () {
      return this.option.scroll;
    },
    scrollTime () {
      return this.option.scrollTime || 5000;
    },
    fontSize () {
      return this.option.fontSize || 14;
    },
    scrollCount () {
      return this.option.scrollCount || this.count;
    },
    speed () {
      return this.scrollCount * this.lineHeight;
    },
    styleThName () {
      return {
        fontSize: this.setPx(this.fontSize),
        background: this.option.headerBackground || "rgba(0, 0, 0, 0.01)",
        color: this.option.headerColor || "rgba(154, 168, 212, 1)"
      };
    },
    columnOption () {
      return this.crudOption.column || [];
    },
    styleTdName () {
      return {
        fontSize: this.setPx(this.fontSize),
        lineHeight: this.setPx(this.lineHeight),
        height: this.setPx(this.lineHeight),
        color: this.option.bodyColor || "rgba(154, 168, 212, 1)",
        borderColor: this.option.borderColor || "rgba(51, 65, 107, 1)"
      };
    },
    styleMenuName () {
      return {
        lineHeight: this.setPx(this.lineHeight),
        color: this.option.headerColor || "rgba(154, 168, 212, 1)"
      };
    },
    sortableProp () {
      return this.option.sortableProp || "order";
    },
    crudOption () {
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
    styleWidth (width) {
      return {
        width: this.setPx(width),
        flex: width ? "initial" : 1
      };
    },
    resetData () {
      this.top = 0;
    },
    handleSortable (prop) {
      this.propQuery[this.sortableProp] = prop;
      this.updateData();
    },
    setTime () {
      this.top = 0;
      clearInterval(this.scrollCheck);
      setTimeout(() => {
        if (this.scroll) {
          this.scrollCheck = setInterval(() => {
            if (this.top <= -this.allHeight) {
              this.top = 0;
            } else {
              this.top = this.top - this.speed;
            }
          }, this.scrollTime);
        }
      }, 2000);
    },
    styleTrName (index) {
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
    rowClick (item, index) {
      this.clickFormatter && this.clickFormatter({
        type: index,
        value: item,
        data: this.dataChart
      });
    },
    handleClick (value, index) {
      this.activeIndex = index;
      this.query.type = value;
      this.updateData();
    }
  }
});
</script>


