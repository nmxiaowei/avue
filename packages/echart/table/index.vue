<template>
  <div :class="b()"
       :style="styleSizeName">
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
          {{citem[item.prop]}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "table",
  computed: {
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
    },
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
});
</script>


