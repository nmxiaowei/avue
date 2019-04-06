<template>
  <div :class="b()"
       :style="styleSizeName">
    <div :class="b('header')"
         v-if="!validatenull(queryList)"
         :style="styleTdName">
      <div :class="b('item',{'active':activeIndex===index})"
           v-for="(item,index) in queryList"
           :key="index"
           @click="handleClick(item.value,index)"
           :style="styleTdName">
        {{ item.label }}
      </div>
    </div>
    <table :style="styleTdName"
           :class="b({'line':!line})"
           cellspacing="0"
           cellpadding="0">
      <tr>
        <th :style="styleThName">
          {{indexLabel}}
        </th>
        <th v-for="(item,index) in columnOption"
            :style="styleThName"
            :key="index">
          {{item.label}}
        </th>
      </tr>
      <tr v-for="(citem,cindex) in dataChart"
          :style="styleTrName(cindex)"
          :key="cindex">
        <td :style="styleTdName"
            :key="index">
          <div :class="b('index',[(cindex+1)+''])"> {{(cindex+1)}}</div>
        </td>
        <td v-for="(item,index) in columnOption"
            :style="styleTdName"
            :key="index">
          <avue-count-up :end="citem[item.prop]"></avue-count-up>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "table",
  data() {
    return {
      activeIndex: 0,
      query: {}
    };
  },
  computed: {
    dataChartLen() {
      return this.dataChart.length;
    },
    lineHeight() {
      return parseInt(this.height / this.dataChartLen);
    },
    index() {
      return this.option.index;
    },
    indexLabel() {
      return this.option.indexLabel || "排名";
    },
    line() {
      return this.option.line;
    },
    queryList() {
      return this.component.queryList || {};
    },
    styleThName() {
      return {
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
        lineHeight: this.setPx(this.lineHeight),
        textAlign: this.option.bodyTextAlign || "center",
        background: this.option.bodyBackground || "rgba(0, 0, 0, 0.01)",
        color: this.option.bodyColor || "rgba(154, 168, 212, 1)",
        borderColor: this.option.borderColor || "rgba(51, 65, 107, 1)"
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


