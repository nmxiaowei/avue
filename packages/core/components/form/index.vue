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
             :type="type || column.type"
             @keyup.enter.native="enterChange"
             @change="handleChange">
    <span v-if="params.html"
          v-html="params.html"></span>
    <template :slot="column.prop+'Type'"
              slot-scope="{item,label,value,node,data}"
              v-if="column.typeslot">
      <slot :name="column.prop+'Type'"
            :item="item"
            :node="node"
            :data="data"
            :value="value"
            :label="label"></slot>
    </template>
    <template :slot="item.prop"
              v-for="item in columnOption"
              slot-scope="scope">
      <slot :row="scope.row"
            :dic="scope.dic"
            v-if="item.slot"
            :size="scope.size"
            :name="item.prop"
            :label="scope.label"></slot>
    </template>
  </component>
</template>

<script>
import { getComponent, getPlaceholder } from "core/dataformat";
export default {
  name: 'form-temp',
  props: {
    value: {},
    t: Function,
    uploadBefore: Function,
    uploadDelete: Function,
    uploadAfter: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    props: {
      type: Object
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
    },
    columnOption () {
      return ((this.column.children || []).column) || []
    }
  },
  watch: {
    text: {
      handler (val) {
        if (this.first || !this.validatenull(val)) {
          this.first = true;
          this.$emit('input', val);
        } else {
          this.first = true;
        }
      }
    },
    value: {
      handler (val) {
        this.text = val;
      },
      immediate: true
    }
  },
  methods: {
    getComponent,
    getPlaceholder,
    enterChange () {
      if (this.enter) {
        this.$emit('enter')
      }

    },
    handleChange (val) {
      this.$emit('change', val)
    }
  }
}
</script>