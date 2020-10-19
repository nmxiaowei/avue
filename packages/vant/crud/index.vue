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
        <template slot="prev-text">
          <van-icon name="arrow-left" />
        </template>
        <template slot="next-text">
          <van-icon name="arrow" />
        </template>
      </van-pagination>
    </van-sticky>
    <avue-cell :option="columnOption"></avue-cell>
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
    columnOption () {
      let result = [];
      let column = this.deepClone(this.tableOption.column) || [];
      this.data.forEach((ele, index) => {
        let cell = [{
          title: ele[this.titleKey],
          value: ele[this.valueKey],
          center: true,
          label: ele[this.labelKey],
          children: {
            span: this.span,
            column: column.filter(item => {
              if (![this.titleKey, this.valueKey, this.labelKey].includes(item.prop)) {
                return true
              }
            }).map(item => {
              let value = detail(ele, item, this.tableOption, this.DIC[item.prop]);
              return Object.assign(item, {
                title: item.label,
                labelDisplay: true,
                value: value
              })
            })
          }
        }]
        result.push({
          label: ' ',
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
