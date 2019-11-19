<template>
  <component :is="getComponent(column.type,column.component)"
             :action="column.action"
             :append="column.append"
             :accordion="column.accordion"
             :typeslot="column.typeslot"
             :appendClick="column.appendClick"
             :border="column.border"
             :button="column.button"
             :children="column.children"
             :group="column.group"
             :change="column.change"
             :changeoOnSelect="column.changeoOnSelect"
             :checked="column.checked"
             :clearable="column.clearable"
             :changeOnSelect="column.changeOnSelect"
             :click="column.click"
             :onRemove="column.onRemove"
             :showWordLimit="column.showWordLimit"
             :column="column"
             :target="column.target"
             :colors="column.colors"
             :canvasOption="column.canvasOption"
             :controls-position="column.controlsPosition"
             :data="column.data"
             :dataType="column.dataType"
             :defaultCheckedKeys="column.defaultCheckedKeys"
             :defaultExpandedKeys="column.defaultExpandedKeys"
             :defaultExpandAll="column.defaultExpandAll"
             :defaultTime="column.defaultTime"
             :dic="dic"
             :dicUrl="column.dicUrl"
             :dicMethod="column.dicMethod"
             :dicQuery="column.dicQuery"
             :disabled="disabled"
             :drag="column.drag"
             :endPlaceholder="column.endPlaceholder"
             :expand-trigger="column.expandTrigger"
             :filter="column.filter"
             :blur="column.blur"
             :focus="column.focus"
             :default-value="column.defaultValue"
             :default-time="column.defaultTime"
             :typeformat="column.typeformat"
             :filesize="column.filesize"
             :filterable="column.filterable"
             :format="column.format"
             :formatTooltip="column.formatTooltip"
             :iconClasses="column.iconClasses"
             :label="column.label"
             :limit="column.limit"
             :listType="column.listType"
             :loadText="column.loadText"
             :min="column.min"
             :max="column.max"
             :minlength="column.minlength"
             :maxlength="column.maxlength"
             :minRows="column.minRows"
             :maxRows="column.maxRows"
             :multiple="column.multiple"
             :nodeClick="column.nodeClick"
             :options="column.options"
             :oss="column.oss"
             :parent="column.parent"
             :pickerOptions="column.pickerOptions"
             :placeholder="getPlaceholder(column)"
             :precision="column.precision"
             :prefixIcon="column.prefixIcon"
             :prepend="column.prepend"
             :prependClick="column.prependClick"
             :prop="column.prop"
             :props="column.props || props"
             :propsHttp="column.propsHttp || propsHttp"
             :range="column.range"
             :iconList="column.iconList"
             :readonly="column.readonly"
             :checkStrictly="column.checkStrictly"
             :separator="column.separator"
             :showFileList="column.showFileList"
             :showInput="column.showInput"
             :showStops="column.showStops"
             :showAllLevels="column.showAllLevels"
             :showText="column.showText"
             :size="column.size || size"
             :startPlaceholder="column.startPlaceholder"
             :step="column.step"
             :suffixIcon="column.suffixIcon"
             :texts="column.texts"
             :tip="column.tip"
             :type="column.type"
             :accept="column.accept"
             :tags="column.tags"
             :upload-before="uploadBefore"
             :upload-after="uploadAfter"
             :value-format="column.valueFormat"
             :voidIconClass="column.voidIconClass"
             :remote="column.remote"
             :autocomplete="column.autocomplete"
             v-model="text"
             :allow-create="column.allowCreate"
             :default-first-option="column.defaultFirstOption"
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
    uploadAfter: Function,
    props: {
      type: Object
    },
    clearable: {
      type: Boolean
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
    handleChange (val) {
      this.$emit('change', val)
    }
  }
}
</script>
