<template>
  <component :is="getComponent(column.type,column.component)"
             v-model="text"
             v-bind="column"
             :column="column"
             :dic="dic"
             :disabled="disabled"
             :placeholder="getPlaceholder(column)"
             :props="column.props || props"
             :propsHttp="column.propsHttp || propsHttp"
             :size="column.size || size"
             :type="type || column.type"
             :upload-preview="uploadPreview"
             :upload-before="uploadBefore"
             :upload-after="uploadAfter"
             :upload-delete="uploadDelete"
             @keyup.enter.native="enterChange"
             @change="handleChange">
    <template :slot="column.prop+'Type'"
              slot-scope="{item,label,value}"
              v-if="column.typeslot">
      <slot :name="column.prop+'Type'"
            :item="item"
            :value="value"
            :label="label"></slot>
    </template>
  </component>
</template>

<script>
import { getComponent, getPlaceholder } from "core/dataformat";
export default {
  name: 'form-temp',
  props: {
    value: [Array, String, Number, Object, Boolean],
    t: Function,
    uploadBefore: Function,
    uploadDelete: Function,
    uploadAfter: Function,
    uploadPreview: Function,
    props: {
      type: Object
    },
    clearable: {
      type: Boolean
    },
    enter: {
      type: Boolean,
      default: true
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