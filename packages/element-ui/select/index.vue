<template>
  <el-select ref="main"
             :class="b()"
             v-model="text"
             :size="size"
             :loading="loading"
             :loading-text="loadingText"
             :multiple="multiple"
             :filterable="remote?true:filterable"
             :remote="remote"
             :readonly="readonly"
             :no-match-text="noMatchText"
             :no-data-text="noDataText"
             :remote-method="handleRemoteMethod"
             :popper-class="popperClass"
             :popper-append-to-body="popperAppendToBody"
             :collapse-tags="tags"
             :clearable="clearableVal"
             :placeholder="placeholder"
             @focus="handleFocus"
             @blur="handleBlur"
             @click.native="handleClick"
             @change="changeSelect"
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
          <slot :label="labelKey"
                :value="valueKey"
                :item="citem"
                v-if="$scopedSlots.default">
          </slot>
          <template v-else>
            <span>{{ getLabelText(citem) }}</span>
            <span v-if="citem[descKey]"
                  :class="b('desc')">{{ citem[descKey] }}</span>
          </template>
        </el-option>
      </el-option-group>
    </template>
    <template v-else>
      <el-checkbox v-model="checkAll"
                   v-if="all&&multiple"
                   :class="b('check')"
                   @change='selectAll'>全选</el-checkbox>
      <el-option v-for="(item,index) in netDic"
                 :key="index"
                 :disabled="item[disabledKey]"
                 :label="getLabelText(item) "
                 :value="item[valueKey]">
        <slot :label="labelKey"
              :value="valueKey"
              :item="item"
              v-if="$scopedSlots.default">
        </slot>
        <template v-else>
          <span>{{ getLabelText(item) }}</span>
          <span v-if="item[descKey]"
                :class="b('desc')">{{ item[descKey] }}</span>
        </template>
      </el-option>
    </template>

  </el-select>
</template>

<script>
import packages from 'core/packages';
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
import { sendDic } from "core/dic";
import { DIC_SPLIT } from 'global/variable';
export default create({
  name: "select",
  mixins: [props(), event()],
  data () {
    return {
      checkAll: false,
      created: false,
      netDic: [],
      loading: false,
    };
  },
  props: {
    loadingText: {
      type: String,
    },
    noMatchText: {
      type: String,
    },
    noDataText: {
      type: String,
    },
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
      default: 0
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
    },
    all: {
      type: Boolean,
      default: false
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    text (val) {
      if (!this.validatenull(val)) {
        if (this.remote && !this.created) {
          this.created = true
          this.handleRemoteMethod(this.multiple ? this.text.join(DIC_SPLIT) : this.text)
        }
      }
    },
    dic: {
      handler (val) {
        this.netDic = val;
      },
      immediate: true
    }
  },
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
      window.Sortable.create(el, {
        animation: 100,
        onEnd: evt => {
          const targetRow = this.value.splice(evt.oldIndex, 1)[0]
          this.value.splice(evt.newIndex, 0, targetRow)
        }
      })
    },
    handleRemoteMethod (query) {
      this.loading = true;
      sendDic({
        column: this.column,
        value: query,
      }).then(res => {
        this.loading = false;
        this.netDic = res;
      });
    },
    selectAll () {
      this.text = []
      if (this.checkAll) {
        this.netDic.map((item) => {
          this.text.push(item[this.valueKey])
        })
      }
    },
    changeSelect (val) {
      this.checkAll = val.length === this.netDic.length
    }
  }
});
</script>