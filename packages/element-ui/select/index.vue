<template>
  <el-select ref="main"
             :class="b()"
             v-model="text"
             :size="size"
             :multiple="multiple"
             :filterable="remote?true:filterable"
             :remote="remote"
             :readonly="readonly"
             :remote-method="handleRemoteMethod"
             :collapse-tags="tags"
             :clearable="disabled?false:clearable"
             :placeholder="placeholder"
             @focus="handleFocus"
             @blur="handleBlur"
             @click.native="handleClick"
             :multiple-limit="limit"
             :allow-create="allowCreate"
             :default-first-option="defaultFirstOption"
             :disabled="disabled">
    <template v-if="group">
      <el-option-group v-for="(item,index) in netDic"
                       :key="index"
                       :label="getLabelText(item)">
        <el-option v-for="(citem,cindex) in item[groupsKey]"
                   :key="cindex"
                   :disabled="citem[disabledKey]"
                   :label="getLabelText(citem)"
                   :value="citem[valueKey]">
          <slot :name="prop+'Type'"
                :label="labelKey"
                :value="valueKey"
                :item="citem"></slot>
        </el-option>
      </el-option-group>
    </template>
    <template v-else>
      <el-option v-for="(item,index) in netDic"
                 :key="index"
                 :disabled="item[disabledKey]"
                 :label="getLabelText(item)"
                 :value="item[valueKey]">
        <slot :name="prop+'Type'"
              :label="labelKey"
              :value="valueKey"
              :item="item"></slot>
      </el-option>
    </template>

  </el-select>
</template>

<script>
import packages from 'core/packages';
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
import { sendDic } from "core/dic";
export default create({
  name: "select",
  mixins: [props(), event()],
  data () {
    return {
      netDic: []
    };
  },
  props: {
    value: {},
    drag: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 99
    },
    filterable: {
      type: Boolean,
      default: false
    },
    allowCreate: {
      type: Boolean,
      default: false
    },
    defaultFirstOption: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dic: {
      handler (val) {
        this.netDic = val;
      },
      immediate: true
    },
    text: {
      handler (val) {
        this.handleChange(val);
      },
      immediate: true
    }
  },
  created () { },
  mounted () {
    if (this.drag) {
      this.setSort()
    }
  },
  methods: {
    setSort () {
      if (!window.Sortable) {
        packages.logs('Sortable');
        return
      }
      const el = this.$refs.main.$el.querySelectorAll('.el-select__tags > span')[0]
      this.sortable = window.Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '')
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          const targetRow = this.value.splice(evt.oldIndex, 1)[0]
          this.value.splice(evt.newIndex, 0, targetRow)
        }
      })
    },
    handleRemoteMethod (query) {
      sendDic({
        url: this.dicUrl.replace("{{key}}", query),
        method: this.dicMethod,
        query: this.dicQuery
      }).then(res => {
        this.netDic = res;
      });
    }
  }
});
</script>