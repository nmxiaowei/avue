<template>
  <div :class="b('mobile')">
    <van-sticky>
      <van-pagination v-if="pageFlag"
                      :class="b('page')"
                      v-model="page.currentPage"
                      force-ellipses
                      :total-items="page.total"
                      :mode="page.mode"
                      :show-page-size="page.pagerCount"
                      :items-per-page="page.pageSize">
      </van-pagination>
    </van-sticky>
    <avue-cell :option="columnOption">
      <template v-for="item in propOption"
                :slot="item.prop"
                slot-scope="{index}">
        <slot v-if="item.slot"
              :row="list[index]"
              :index="index"
              :label="list[index]['$'+item.prop]"
              :column="item"
              :name="item.prop"></slot>
      </template>
      <template :slot="`${item.prop}Value`"
                v-for="(item,index) in cellOption"
                slot-scope="{}">
        <slot v-if="$scopedSlots[valueKey]"
              :name="valueKey"
              :index="index"
              :label="list[index]['$'+item.prop]"
              :column="item"
              :row="list[index]"></slot>
        <span v-else
              :key="index">{{(list[index] || {})[valueKey]}}</span>
      </template>
      <template :slot="`${item.prop}Title`"
                v-for="(item,index) in cellOption"
                slot-scope="{}">
        <slot v-if="$scopedSlots[titleKey]"
              :name="titleKey"
              :index="index"
              :label="list[index]['$'+item.prop]"
              :column="item"
              :row="list[index]"></slot>
        <span v-else
              :key="index">{{(list[index] || {})[titleKey]}}</span>
      </template>
      <template :slot="`${item.prop}Label`"
                v-for="(item,index) in cellOption"
                slot-scope="{}">
        <slot v-if="$scopedSlots[labelKey]"
              :name="labelKey"
              :index="index"
              :label="list[index]['$'+item.prop]"
              :column="item"
              :row="list[index]"></slot>
        <span v-else
              :key="index"> {{(list[index] ||{})[labelKey]}}</span>
      </template>
    </avue-cell>
  </div>
</template>

<script>
import init from "../../core/common/init.js"
import create from "core/create";
import { detail } from "core/detail";
import { DIC_PROPS } from 'global/variable';
export default create({
  name: "crud",
  data () {
    return {
      propsDefault: DIC_PROPS,
      list: [],
      defaultPage: {
        total: 0,
        mode: 'multi',
        pagerCount: 5,
        currentPage: 1,
        pageSize: 10,
      }
    }
  },
  props: {
    loading: Boolean,
    page: {
      type: Object,
      default () {
        return {};
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    props: {
      type: Object,
      default: () => DIC_PROPS
    }
  },
  watch: {
    data: {
      handler () {
        this.dataInit();
      },
      deep: true,
      immediate: true
    },
    page: {
      handler () {
        this.pageInit();
      },
      deep: true,
    },
  },
  mixins: [init()],
  computed: {
    pageFlag () {
      return this.defaultPage.total != 0
    },
    span () {
      return this.tableOption.span
    },
    tableProps () {
      return this.tableOption.props || {}
    },
    titleKey () {
      return this.tableProps.title || this.propsDefault.title;
    },
    valueKey () {
      return this.tableProps.value || this.propsDefault.value;
    },
    labelKey () {
      return this.tableProps.label || this.propsDefault.label;
    },
    propOption () {
      return this.tableOption.column || []
    },
    cellOption () {
      let list = this.deepClone(this.columnOption.data);
      let result = [];
      list.forEach(ele => {
        let column = ele.column[0]
        delete column.children
        result.push(column)
      })
      return result
    },
    columnOption () {
      let result = [];
      let column = this.deepClone(this.tableOption.column) || [];
      this.list.forEach((ele, index) => {
        let cell = [{
          title: ele[this.titleKey],
          value: ele[this.valueKey],
          center: true,
          label: ele[this.labelKey],
          prop: `cell${index}`,
          children: {
            span: this.span,
            column: column.filter(item => {
              if (![this.titleKey, this.valueKey, this.labelKey].includes(item.prop)) {
                return true
              }
            }).map((item, cindex) => {
              let value = detail(ele, item, this.tableOption, this.DIC[item.prop]);
              if (value !== ele[item.prop]) this.$set(ele, '$' + item.prop, value)
              return Object.assign(this.deepClone(item), {
                title: item.label,
                labelDisplay: true,
                value: value
              })
            })
          }
        }]
        result.push({
          column: cell
        })
      })
      return {
        data: result
      }
    }
  },
  created () {
    this.pageInit();
  },
  methods: {
    dataInit () {
      this.list = this.data;
      //初始化序列的参数
      this.list.forEach((ele, index) => {
        ele.$index = index;
      });
    },
    pageInit () {
      this.defaultPage = Object.assign(this.defaultPage, this.page, {
        total: Number(this.page.total || this.defaultPage.total),
        currentPage: Number(this.page.currentPage || this.defaultPage.currentPage),
        pageSize: Number(this.page.pageSize || this.defaultPage.pageSize)
      })
      this.updateValue();
    },
    updateValue () {
      this.$emit('update:page', this.defaultPage)
      this.$emit("on-load", this.defaultPage);
    }
  }
})

</script>
