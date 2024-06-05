<template>
  <custom v-if="render"
          :render="render"
          :index="index"
          :row="row"
          :column="column"
          :params="params"
          :event="event"></custom>
  <component v-else
             :is="getComponent(column)"
             v-model="text"
             v-bind="getBind(column)"
             v-on="event"
             :column="Object.assign(column,params)"
             :dic="dic"
             :box-type="boxType"
             ref="temp"
             :disabled="column.disabled || disabled"
             :readonly="column.readonly || readonly"
             :placeholder="getPlaceholder(column)"
             :props="column.props || props"
             :propsHttp="column.propsHttp || propsHttp"
             :size="column.size || size"
             :table-data="tableData"
             :type="type || column.type"
             :column-slot="columnSlot"
             @keyup.enter="enterChange">
    <template #="scope"
              v-if="$slots.default">
      <slot v-bind="scope"></slot>
    </template>
    <template #
              v-else-if="params.html">
      <span v-html="params.html"></span>
    </template>
    <template v-for="item in columnSlot"
              #[item]="scope">
      <slot v-bind="scope"
            :name="item"></slot>
    </template>
  </component>
</template>

<script>
import custom from "./custom";
import { getComponent, getPlaceholder } from "core/dataformat";
import slot from 'core/slot'
export default {
  name: 'form-temp',
  mixins: [slot],
  emits: ['update:modelValue', 'change'],
  components: {
    custom
  },
  props: {
    modelValue: {},
    uploadSized: Function,
    uploadBefore: Function,
    uploadDelete: Function,
    uploadAfter: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    boxType: String,
    row: Object,
    render: Function,
    index: [String, Number],
    columnSlot: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    clearable: {
      type: Boolean
    },
    enter: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },
    propsHttp: {
      type: Object,
      default: () => {
        return {}
      }
    },
    props: {
      type: Object
    },
    dic: {
      type: Array
    },
    placeholder: {
      type: String
    },
    size: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    readonly: {
      type: Boolean
    },
    column: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    params () {
      return this.column.params || {}
    },
    event () {
      return this.column.event || {}
    },
    text: {
      get () {
        return this.modelValue
      },
      set (val) {
        this.$emit('update:modelValue', val);
        this.$emit('change', val)
      }
    }
  },
  methods: {
    getComponent (column) {
      return getComponent(column.type, column.component)
    },
    getPlaceholder,
    getBind (column) {
      let params = { ...column, ...this.params, ...this.$uploadFun(column) };
      ['value', 'className'].forEach(ele => {
        delete params[ele]
      })
      return params
    },
    enterChange () {
      if (typeof this.column.enter === 'function') {
        this.column.enter({ value: this.text, column: this.column })
      } else if (this.enter) {
        this.$emit('enter')
      }
    }
  }
}
</script>