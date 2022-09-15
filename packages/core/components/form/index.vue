<template>
  <component :is="getComponent(column.type,column.component)"
             v-model="text"
             v-bind="Object.assign(column,$uploadFun(column))"
             v-on="event"
             :column="Object.assign(column,params)"
             :dic="dic"
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
             @keyup.enter.native="enterChange">
    <span v-if="params.html"
          v-html="params.html"></span>
    <template slot-scope="scope"
              v-for="item in getSlotName(column,'T',$scopedSlots)?[column]:[]">
      <slot :name="getSlotName(item,'T')"
            v-bind="scope"></slot>
    </template>
    <template v-for="item in columnSlot"
              slot-scope="scope"
              :slot="item">
      <slot v-bind="scope"
            :name="item"></slot>
    </template>
  </component>
</template>

<script>
import { getComponent, getPlaceholder } from "core/dataformat";
import slot from 'core/slot'
export default {
  name: 'form-temp',
  mixins: [slot],
  props: {
    value: {},
    uploadBefore: Function,
    uploadDelete: Function,
    uploadAfter: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
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
        return this.value
      },
      set (val) {
        this.$emit('input', val);
        this.$emit('change', val)
      }
    }
  },
  methods: {
    getComponent,
    getPlaceholder,
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