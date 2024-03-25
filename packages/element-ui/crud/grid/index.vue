<template>
  <div :class="b()">
    <div :class="b('hide')">
      <slot></slot>
    </div>
    <el-row>
      <el-col v-for="(c,p) in data"
              :span="crud.gridOption.span"
              :key="p">
        <div :class="b('content')">
          <div v-for="(item,index) in column"
               :class="[b('item'),{'title':item.prop==crud.columnOption[0].prop,'row':item.row},item.type || item.prop,]"
               :key="index">
            <row-item :content="item.header"
                      :row="c"
                      :index="p"
                      :class="[b('label'),item.labelClassName]"></row-item>
            <row-item :content="item.default"
                      :row="c"
                      :index="p"
                      :class="[b('value'),item.className]"></row-item>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
import rowItem from './row';
export default create({
  name: 'crud__grid',
  inject: ["crud"],
  components: {
    rowItem
  },
  props: {
    data: Array
  },
  data () {
    return {
      id: 'crud-grid',
      column: []
    }
  }
})
</script>

<style>
</style>