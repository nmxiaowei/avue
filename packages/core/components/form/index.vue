<template>
  <component :is="getComponent(column.type,column.component)"
             v-model="text"
             v-bind="getBind(column)"
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
import { getComponent, getPlaceholder } from "core/dataformat";
import slot from 'core/slot'
export default {
  name: 'form-temp',
  mixins: [slot],
  emits: ['update:modelValue', 'change'],
  props: {
    modelValue: {},
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
  data () {
    return {
      first: false,
      text: undefined,
    }
  },
  computed: {
    params () {
      return this.column.params || {}
    },
    event () {
      return this.column.event || {}
    }
  },
  watch: {
    text: {
      handler (val) {
        if (this.first || !this.validatenull(val)) {
          this.first = true;
          this.$emit('update:modelValue', val);
          this.$emit('change', val)
        } else {
          this.first = true;
        }
      }
    },
    modelValue: {
      handler (val) {
        this.text = val;
      },
      immediate: true
    }
  },
  methods: {
    getComponent,
    getPlaceholder,
    getBind (column) {
      delete column.value
      return column
    },
    enterChange () {
      let enter = this.column.enter;
      if (!this.validatenull(enter)) {
        if (typeof enter === 'function') this.column.enter(this.text, this.column)
      } else if (this.enter) {
        this.$emit('enter')
      }
    }
  }
}
</script>