<template>
  <div :class="b()">
    <el-input :prefix-icon="prefixIcon"
              :suffix-icon="suffixIcon"
              :placeholder="placeholder"
              v-model="text"
              :popper-class="popperClass"
              :size="size"
              ref="main"
              @clear="handleClear"
              :clearable="disabled?false:clearable"
              :disabled="disabled"
              @click="handleClick"
              @focus="handleShow">
      <template #append>
        <icon-temp @click="handleShow"
                   :text="text"
                   :size="28"
                   :small="size==='small'"></icon-temp>

      </template>
    </el-input>
    <div v-if="box">
      <el-dialog class="avue-dialog"
                 :title="placeholder"
                 :before-close="beforeClose"
                 :append-to-body="$AVUE.appendToBody"
                 lock-scroll
                 v-model="box"
                 :width="dialogWidth">
        <div :class="b('filter')">
          <el-input :placeholder="validData(option.filterText,t('tip.input'))"
                    :size="size"
                    v-model="filterText"></el-input>
        </div>
        <avue-tabs :option="option"
                   @change="handleTabs"></avue-tabs>
        <div :class="b('list')">
          <div :class="b('item')"
               v-for="(item,index) in list"
               @click="handleSubmit(item.value)"
               :key="index">
            <icon-temp :text="item.value"
                       :size="item.size"
                       :small="size==='small'"
                       :color="item.color"></icon-temp>
            <p>{{item.label || item.value}}</p>
          </div>　
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import iconTemp from 'common/components/icon/index';
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "input-icon",
  components: {
    iconTemp
  },
  mixins: [props(), event(), locale],
  props: {
    beforeClose: Function,
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    dialogWidth: {
      type: String,
      default: '80%'
    },
    iconList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data () {
    return {
      filterText: '',
      box: false,
      tabs: {}
    };
  },
  computed: {
    list () {
      let list = this.tabs.list.map(ele => {
        if (!ele.value && !ele.label) {
          return {
            label: ele,
            value: ele
          }
        }
        return ele
      });
      if (this.filterText) {
        list = list.filter(ele => ele.label.indexOf(this.filterText) !== -1)
      }
      return list
    },
    option () {
      return {
        column: this.iconList
      };
    }
  },
  created () {
    this.tabs = this.iconList[0]
  },
  methods: {
    handleClear () {
      setTimeout(() => {
        this.box = false;
      }, 0)
    },
    handleTabs (tabs) {
      this.tabs = tabs;
    },
    handleSubmit (item) {
      this.box = false;
      this.text = item;
      this.handleChange(item);
    },
    handleShow () {
      this.$refs.main.blur();
      if (this.disabled || this.readonly) return;
      this.tabs = this.iconList[0]
      this.box = true;
    }
  }
});
</script>


