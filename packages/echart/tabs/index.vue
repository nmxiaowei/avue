<template>
  <div :class="b()"
       :style="styleSizeName"
       ref="main">
    <avue-select v-if="isSelect"
                 :dic="typeof dataChart ==='string'?[]:dataChart"
                 :style="styleSelectName"
                 v-model="active"></avue-select>
    <div :class="b('list')"
         v-else>
      <div :class="b('item')"
           :style="[styleName,styleActiveName(item)]"
           v-for="(item,index) in dataChart"
           :key="index"
           @click="handleClick(item.value)">
        <div v-if="item.icon"
             :class="b('icon')"
             :style="[styleIconName,styleIconBgName(item),styleIconActiveName(item)]"></div>
        <span>{{item.label}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "tabs",
  data () {
    return {
      active: ""
    };
  },
  watch: {
    active (val) {
      if (!val) return;
      this.handleClick(val);
    },
    dataChart: {
      handler (val) {
        if (val.length !== 0) {
          this.active = val[0].value;
        }
      },
      immediate: true
    }
  },
  computed: {
    isSelect () {
      return this.type === "select";
    },
    type () {
      return this.option.type;
    },
    paramName () {
      return this.option.paramName;
    },
    iconSize () {
      return this.option.iconSize || 20;
    },
    styleSelectName () {
      return Object.assign(
        {
          fontSize: this.setPx(this.option.fontSize || 30)
        },
        this.styleSizeName
      );
    },
    styleIconName () {
      return Object.assign({
        marginRight: this.setPx(this.option.iconSplit),
        width: this.setPx(this.option.iconSize),
        height: this.setPx(this.option.iconSize)
      });
    },
    styleName () {
      return Object.assign(
        (() => {
          if (this.option.backgroundImage) {
            return {
              backgroundImage: `url(${this.option.backgroundImage})`,
              backgroundSize: "100% 100%"
            };
          }
          return {};
        })(),
        {
          borderColor: this.option.borderColor || "#fff",
          borderStyle: "solid",
          borderWidth: this.setPx(this.option.borderWidth || 0),
          margin: `0 ${this.setPx(this.option.split)}`,
          backgroundColor: this.option.backgroundColor,
          fontSize: this.setPx(this.option.fontSize || 30),
          color: this.option.color
        }
      );
    }
  },
  created () { },
  mounted () { },
  methods: {
    styleIconBgName (item) {
      if (item.icon) {
        return {
          backgroundImage: `url(${item.icon})`,
          backgroundSize: "100% 100%"
        };
      }
    },
    styleIconActiveName (item) {
      if (this.active == item.value && item.empIcon) {
        return {
          backgroundImage: `url(${item.empIcon})`,
          backgroundSize: "100% 100%"
        };
      }
    },
    styleActiveName (item) {
      if (this.active == item.value) {
        return Object.assign(
          (() => {
            if (this.option.empBackgroundImage) {
              return {
                backgroundImage: `url(${this.option.empBackgroundImage})`,
                backgroundSize: "100% 100%"
              };
            }
            return {};
          })(),
          {
            borderColor: this.option.empBorderColor || "#fff",
            borderStyle: "solid",
            borderWidth: this.setPx(this.option.empBorderWidth || 0),
            color: this.option.empColor
          }
        );
      }
    },
    handleClick (val) {
      this.active = val;
      this.click({
        type: this.name,
        child: this.child,
        value: this.active
      });
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
});
</script>


