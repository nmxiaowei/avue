<template>
  <custom v-if="render"
          :render="render"
          :index="index"
          :row="row"
          :dic="dic"
          :column="column"
          :params="params"
          :event="event"></custom>
  <component v-else
             :is="getComponent(column)"
             v-model="text"
             v-bind="getBind(column)"
             align="left"
             v-on="event"
             :column="Object.assign(column,params)"
             :dic="dic"
             :clearValidate="clearValidate"
             :box-type="boxType"
             ref="temp"
             :disabled="column.disabled || disabled"
             :readonly="column.readonly || readonly"
             :placeholder="boxType == 'view' ? '' : getPlaceholder(column)"
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
            v-if="!item.endsWith('-desc')"
            :name="item"></slot>
    </template>
  </component>
  <template v-if="!render && boxType !== 'view'">
    <slot v-if="columnSlot.includes(column.prop + '-desc')"
          :name="column.prop + '-desc'"
          :column="column"
          :description="column.description"
          :descClass="column.descClass"
          :size="column.size || size"></slot>
    <span v-else
          :class="column.descClass ? column.descClass : 'field-desc'">
      {{column.description}}
    </span>
  </template>
</template>

<script>
import custom from "./custom";
import { getComponent, getPlaceholder } from "core/dataformat";
import slot from 'core/slot'
export default {
  name: 'form-temp',
  mixins: [slot],
  emits: ['update:modelValue', 'change', 'enter'],
  components: {
    custom
  },
  props: {
    modelValue: {},
    clearValidate: Function,
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