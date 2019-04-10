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
    <div :style="styleTdName"
         :class="b('table',{'line':!line})">
      <div :class="b('tr')">
        <div :class="b('td')"
             :style="styleThName"
             v-if="index">
          {{indexLabel}}
        </div>
        <div :class="b('td')"
             v-for="(item,index) in columnOption"
             :style="styleThName"
             :key="index">
          {{item.label}}
        </div>
      </div>
      <div :class="b('body')"
           ref="body"
           :style="styleSizeName">
        <div :class="b('tr',['line'])"
             v-for="(citem,cindex) in dataChart"
             :style="[styleTrName(cindex),{ top:setPx(cindex * lineHeight +top)}]"
             :key="cindex">
          <div :class="b('td')"
               :style="styleTdName"
               :key="index"
               v-if="index">
            <div :class="b('index',[(cindex+1)+''])"> {{(cindex+1)}}</div>
          </div>
          <div :class="b('td')"
               v-for="(item,index) in columnOption"
               :style="styleTdName"
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
      top: 0,
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
  computed: {
    allHeight() {
      return (this.count - 1) * this.lineHeight;
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
    queryList() {
      return this.component.queryList || {};
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


