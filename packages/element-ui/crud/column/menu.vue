<template>
  <span v-if="['img','upload'].includes(column.type)">
    <div class="avue-crud__img">
      <img v-for="(item,index) in getImgList(row,column)"
           :src="item"
           :key="index"
           @click="openImg(getImgList(row,column),index)" />
    </div>
  </span>
  <span v-else-if="['url'].includes(column.type)">
    <el-link v-for="(item,index) in corArray(row[column.prop],column.separator)"
             type="primary"
             :key="index"
             :href="item"
             :target="column.target || '_blank'">{{item}}</el-link>
  </span>
  <span v-else-if="['rate'].includes(column.type)">
    <avue-rate disabled
               v-model="row[column.prop]" />
  </span>
  <span v-else
        v-html="handleDetail(row,column)"></span>
</template>

<script>
import { detail } from "core/detail";
import { DIC_PROPS, DIC_SPLIT } from 'global/variable'
export default {
  props: {
    column: Object,
    row: Object
  },
  inject: ['crud'],
  methods: {
    openImg (list, index) {
      list = list.map(ele => {
        return { thumbUrl: ele, url: ele }
      })
      this.$ImagePreview(list, index);
    },
    corArray (list, separator = DIC_SPLIT) {
      if (this.validatenull(list)) {
        return []
      } else if (!Array.isArray(list)) {
        return list.split(separator);
      }
      return list
    },
    getImgList (row, column) {
      let url = (column.propsHttp || {}).home || ''
      let value = (column.props || {}).value || DIC_PROPS.value;
      if (this.validatenull(row[column.prop])) return []
      if (column.listType == 'picture-img') return [url + row[column.prop]]
      let list = this.corArray(this.deepClone(row[column.prop]), column.separator);
      list.forEach((ele, index) => {
        if (typeof ele === 'object') {
          list[index] = url + ele[value];
        } else {
          list[index] = url + ele;
        }
      })
      return list;
    },
    handleDetail (row, column) {
      let result = row[column.prop];
      let DIC = column.parentProp ? (this.crud.cascaderDIC[row.$index] || {})[column.prop] : this.crud.DIC[column.prop]
      result = detail(row, column, this.crud.tableOption, DIC);
      if (!this.validatenull(DIC)) {
        row["$" + column.prop] = result;
      }
      return result;
    },
  }
}
</script>

<style>
</style>