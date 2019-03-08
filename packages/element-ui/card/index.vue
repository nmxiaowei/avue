<template>
  <div :class="b()">
    <el-row :span="24"
            :gutter="gutter">
      <el-col :span="span"
              v-if="vaildData(option.addBtn,true)">
        <div :class="b('item',{'add':true})"
             @click="rowAdd()">
          <i class="el-icon-plus"></i>
          <span>添加</span>
        </div>
      </el-col>
      <el-col :span="span"
              v-for="(item,index) in data"
              :key="index">
        <div :class="b('item')"
             @click="rowClick(item,index)">
          <div :class="b('body')">
            <div :class="b('avatar')">
              <img :src="item[imgKey]"
                   alt="">
            </div>
            <div :class="b('detail')">
              <div :class="b('title')">{{item[titleKey]}}</div>
              <div :class="b('info')">{{item[infoKey]}}</div>
            </div>
          </div>
          <div :class="b('menu')">
            <slot name="menu"
                  :index="index"
                  :row="item"></slot>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const propsDefault = {
  img: "img",
  title: "title",
  info: "info"
};
import create from "core/create";
export default create({
  name: "card",
  props: {
    props: {
      type: Object,
      default: () => {
        return propsDefault;
      }
    },
    option: {
      type: Object,
      default: () => {
        return {};
      }
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      propsDefault: propsDefault
    };
  },
  computed: {
    imgKey: function() {
      return this.option.props.img || this.propsDefault.img;
    },
    titleKey: function() {
      return this.option.props.title || this.propsDefault.title;
    },
    infoKey: function() {
      return this.option.props.info || this.propsDefault.info;
    },
    span() {
      return this.option.span || 8;
    },
    gutter() {
      return this.option.gutter || 20;
    }
  },
  methods: {
    rowAdd() {
      this.$emit("row-add");
    },
    rowClick(row, index) {
      this.$emit("row-click", row, index);
    }
  }
});
</script>
