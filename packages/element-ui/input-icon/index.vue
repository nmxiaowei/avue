<template>
  <div :class="b()">
    <el-input :placeholder="placeholder"
              :model-value="text"
              :popper-class="popperClass"
              :size="size"
              ref="main"
              :clearable="disabled?false:clearable"
              :disabled="disabled"
              @change="handleChange"
              @click="handleClick"
              @focus="handleShow">
      <template #append>
        <icon-temp @click="handleShow"
                   :text="text"
                   :size="28"
                   small></icon-temp>

      </template>
    </el-input>
    <div v-if="box">
      <el-dialog custom-class="avue-dialog avue-dialog--none"
                 :title="placeholder"
                 :append-to-body="$AVUE.appendToBody"
                 v-model="box"
                 :width="dialogWidth">
        <avue-tabs :option="option"
                   @change="handleTabs"></avue-tabs>
        <div :class="b('list')">
          <div :class="b('item')"
               v-for="(item,index) in list"
               @click="handleSubmit(item.value)"
               :key="index">
            <icon-temp :text="item.value"
                       :size="item.size"
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
import iconTemp from 'common/components/icon/index';
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "input-icon",
  components: {
    iconTemp
  },
  mixins: [props(), event()],
  props: {
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
      box: false,
      tabs: {}
    };
  },
  computed: {
    list () {
      let list = (this.tabs.list || []).map(ele => {
        if (!ele.value && !ele.label) {
          return {
            value: ele
          }
        }
        return ele
      });
      return list
    },
    option () {
      return {
        column: this.iconList
      };
    }
  },
  created () {
    this.tabs = this.iconList[0] || {};
  },
  methods: {
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
      this.box = true;
    }
  }
});
</script>


