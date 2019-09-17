<template>
  <div :class="b({'active':((active || overActive)&&!readonly),'move':moveActive,'click':disabled})"
       @mouseover.stop="disabled?false:handleMouseOver($event)"
       @mouseout.stop="disabled?false:handleMouseOut($event)"
       @mousedown.stop="disabled?false:handleMouseDown($event)"
       @mousemove="disabled?false:handleMouseMove($event)"
       @mouseup="disabled?false:handleMouseUp($event)"
       :style="styleName">
    <div :class="b('wrapper')"
         ref="wrapper">
      <template v-if="(active || overActive || moveActive)&&!readonly">
        <div :style="styleLineName"
             :class="b('line',['left'])"></div>
        <div :style="styleLineName"
             :class="b('line',['top'])"></div>
        <div :class="b('line',['label'])"
             :style="styleLabelName">{{baseLeft}},{{baseTop}}</div>
      </template>
      <template v-for="(item,index) in rangeList"
                v-if="!readonly">
        <div :class="b('range',[item.classname])"
             :key="index"
             v-if="active"
             :style="[styleRangeName,getRangeStyle(item.classname)]"
             @mousedown.stop="goLink(item,'mousedown',$event)"
             @mousemove.stop="goLink(item,'mousemove',$event)"
             @mouseup="goLink(item,'mouseup',$event)"></div>
      </template>
      <div :class="b('menu')"
           :style="styleMenuName"
           v-show="active || overActive">
        <slot name="menu"
              :zIndex="zIndex"
              :index="index"></slot>
      </div>
      <div :class="b('item')"
           ref="item">
        <slot></slot>
      </div>
      <div :class="b('mask')"
           v-if="!disabled && mask"></div>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import { getFixed } from "utils/util";
export default create({
  name: "draggable",
  props: {
    mask: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number,
      default: 1
    },
    readonly: {
      type: Boolean,
      default: false
    },
    resize: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 1
    },
    zIndex: {
      type: Number,
      default: 1
    },
    index: {
      type: Number,
      default: 1
    },
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  data () {
    return {
      rx: 0,
      ry: 0,
      x: 0,
      y: 0,
      baseWidth: 0,
      baseHeight: 0,
      baseLeft: 0,
      baseTop: 0,
      children: {},
      moveActive: false,
      overActive: false,
      rangeActive: false,
      active: false,
      rangeList: [
        {
          classname: "left",
          mousedown: "rangeMouseDown",
          mousemove: "rangeMouseXMove",
          mouseup: "rangeMouseUp"
        },
        {
          classname: "right",
          mousedown: "rangeMouseDown",
          mousemove: "rangeMouseXMove",
          mouseup: "rangeMouseUp"
        },
        {
          classname: "top",
          mousedown: "rangeMouseDown",
          mousemove: "rangeMouseXMove",
          mouseup: "rangeMouseUp"
        },
        {
          classname: "bottom",
          mousedown: "rangeMouseDown",
          mousemove: "rangeMouseYMove",
          mouseup: "rangeMouseUp"
        },
        {
          classname: "top-left",
          mousedown: "rangeMouseDown",
          mousemove: "rangeMouseMove",
          mouseup: "rangeMouseUp"
        },
        {
          classname: "top-right",
          mousedown: "rangeMouseDown",
          mousemove: "rangeMouseMove",
          mouseup: "rangeMouseUp"
        },
        {
          classname: "bottom-left",
          mousedown: "rangeMouseDown",
          mousemove: "rangeMouseMove",
          mouseup: "rangeMouseUp"
        },
        {
          classname: "bottom-right",
          mousedown: "rangeMouseDown",
          mousemove: "rangeMouseMove",
          mouseup: "rangeMouseUp"
        }
      ]
    };
  },
  computed: {
    scaleVal () {
      return this.scale;
    },
    styleMenuName () {
      return {
        transformOrigin: "0 0",
        transform: `scale(${this.scaleVal})`
      };
    },
    styleLineName () {
      return {
        borderWidth: this.setPx(this.scaleVal)
      };
    },
    styleRangeName () {
      const calc = 10 * this.scaleVal;
      return {
        width: this.setPx(calc),
        height: this.setPx(calc)
      };
    },
    styleLabelName () {
      return {
        fontSize: this.setPx(18 * this.scaleVal)
      };
    },
    styleName () {
      return Object.assign(
        (() => {
          if (this.active) {
            return Object.assign(
              {
                zIndex: 9999
              },
              this.styleLineName
            );
          }
          return { zIndex: this.zIndex };
        })(),
        {
          top: this.setPx(this.baseTop),
          left: this.setPx(this.baseLeft),
          width: this.setPx(this.baseWidth),
          height: this.setPx(this.baseHeight)
        }
      );
    }
  },
  watch: {
    baseWidth (val) {
      this.$refs.wrapper.style.width = this.setPx(val);
      if (this.resize && this.children.style) {
        this.children.style.width = this.setPx(val);
      }
    },
    baseHeight (val) {
      this.$refs.wrapper.style.height = this.setPx(val);
      if (this.resize && this.children.style) {
        this.children.style.height = this.setPx(val);
      }
    }
  },
  mounted () {
    this.children = this.$refs.item.firstChild;
    this.baseWidth = this.width || this.children.offsetWidth;
    this.baseHeight = this.height || this.children.offsetHeight;
    this.baseLeft = getFixed(this.left);
    this.baseTop = getFixed(this.top);
    // this.children.style.overflow = "hidden";
  },

  methods: {
    setLeft (left) {
      this.baseLeft = left;
    },
    setTop (top) {
      this.baseTop = top;
    },
    getRangeStyle (postion) {
      const calc = (10 * this.scaleVal) / 2;
      let result = {};
      let list = postion.split("-");
      list.forEach(ele => {
        result[ele] = this.setPx(-calc);
      });
      return result;
    },
    setOverActive (val) {
      this.overActive = val;
    },
    setActive (val) {
      this.active = val;
    },
    goLink (item, type, e) {
      this[item[type]](e, item.classname);
    },
    docMouseUp () {
      this.$emit("focus");
      window.onmouseup = e => {
        window.onmousemove = undefined;
        this.$emit("resize", {
          index: this.index,
          width: this.baseWidth,
          height: this.baseHeight
        });
        this.$emit("postion", {
          index: this.index,
          left: this.baseLeft,
          top: this.baseTop
        });
        this.rangeActive = false;
        this.moveActive = false;
      };
    },
    rangeMouseDown (e) {
      this.rangeActive = true;
      this.rx = e.clientX;
      this.ry = e.clientY;
      this.docMouseUp();
    },
    rangeMouseXMove (e, postion) {
      this.rangeMove(e, postion);
    },
    rangeMouseYMove (e, postion) {
      this.rangeMove(e, postion);
    },
    rangeMouseMove (e, postion) {
      this.rangeMove(e, postion);
    },
    rangeMove (e, postion) {
      //移动的方向
      let x, y;
      //移动的位置
      let xp, yp;
      //移动的正负
      let xc, yc;
      if (this.rangeActive) {
        window.onmousemove = e => {
          this.moveActive = true;
          const startX = e.clientX;
          const startY = e.clientY;
          if (postion === "right") {
            x = true;
            y = false;
          } else if (postion === "left") {
            x = true;
            xp = true;
            xc = true;
            y = false;
          } else if (postion === "top") {
            x = false;
            y = true;
            yp = true;
            yc = true;
          } else if (postion === "bottom") {
            x = false;
            y = true;
          } else if (postion === "bottom-right") {
            x = true;
            y = true;
          } else if (postion === "bottom-left") {
            x = true;
            y = true;
            xp = true;
            xc = true;
          } else if (postion === "top-right") {
            x = true;
            y = true;
            yp = true;
            yc = true;
          } else if (postion === "top-left") {
            x = true;
            y = true;
            xp = true;
            xc = true;
            yp = true;
            yc = true;
          }
          if (x) {
            let calc = (startX - this.rx) * this.step;
            if (xc) calc = -calc;
            if (xp) this.baseLeft = getFixed(this.baseLeft - calc);
            this.baseWidth = getFixed(this.baseWidth + calc);
          }
          if (y) {
            let calc = (startY - this.ry) * this.step;
            if (yc) calc = -calc;
            if (yp) this.baseTop = getFixed(this.baseTop - calc);
            this.baseHeight = getFixed(this.baseHeight + calc);
          }
          this.rx = startX;
          this.ry = startY;
        };
      }
    },
    rangeMouseUp () {
      this.$emit("blur");
      this.rangeActive = false;
    },
    handleMouseOut () {
      this.overActive = false;
    },
    handleMouseOver () {
      this.overActive = true;
    },
    handleMouseDown (e) {
      this.$emit("change", this.index);
      this.active = true;
      this.moveActive = true;
      this.x = e.clientX;
      this.y = e.clientY;
      this.docMouseUp();
    },
    handleMouseMove (e) {
      if (this.moveActive && !this.rangeActive) {
        window.onmousemove = e => {
          this.overActive = false;
          const startX = e.clientX;
          const startY = e.clientY;
          this.baseLeft = getFixed(
            this.baseLeft + (startX - this.x) * this.step
          );
          this.baseTop = getFixed(this.baseTop + (startY - this.y) * this.step);
          this.x = startX;
          this.y = startY;
        };
      }
    },
    handleMouseUp () {
      this.$emit("blur");
      this.moveActive = false;
    }
  }
});
</script>