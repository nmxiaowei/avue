<template>
  <div :class="b()"
       :style="styleSizeName">
    <div :class="b('header')"
         v-if="queryList"
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
           cellspacing="0"
           cellpadding="0">
      <tr>
        <th v-for="(item,index) in columnOption"
            :style="styleThName"
            :key="index">
          {{item.label}}
        </th>
      </tr>
      <tr v-for="(citem,cindex) in dataChart"
          :key="cindex">
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
    queryList() {
      return this.component.queryList || {};
    },
    styleThName() {
      return {
        textAlign: this.style.headerTextAlign || "center",
        background: this.style.headerBackground || "rgba(0, 0, 0, 0.01)",
        color: this.style.headerColor || "rgba(154, 168, 212, 1)"
      };
    },
    styleTdName() {
      return {
        textAlign: this.style.bodyTextAlign || "center",
        background: this.style.bodyBackground || "rgba(0, 0, 0, 0.01)",
        color: this.style.bodyColor || "rgba(154, 168, 212, 1)",
        borderColor: this.style.borderColor || "rgba(51, 65, 107, 1)"
      };
    },
    columnOption() {
      return this.crudOption.column || [];
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
    handleClick(value, index) {
      this.activeIndex = index;
      this.query.type = value;
      this.updateData();
    }
  }
});
</script>


