<template>
  <div :class="b({'active':(active || overActive),'move':moveActive})"
       @mouseover="disabled?false:handleMouseOver($event)"
       @mouseout="disabled?false:handleMouseOut($event)"
       @mousedown="disabled?false:handleMouseDown($event)"
       @mousemove="disabled?false:handleMouseMove($event)"
       @mouseup="disabled?false:handleMouseUp($event)"
       :style="styleName">
    <div :class="b('wrapper')"
         ref="wrapper">
      <template v-if="active || overActive || moveActive">
        <div :class="b('line',['left'])"></div>
        <div :class="b('line',['top'])"></div>
        <div :class="b('line',['label'])">{{baseLeft}},{{baseTop}}</div>
      </template>
      <div :class="b('range',[item.classname])"
           v-for="(item,index) in rangeList"
           :key="index"
           v-if="active"
           @mousedown.stop="goLink(item,'mousedown',$event)"
           @mousemove.stop="goLink(item,'mousemove',$event)"
           @mouseup="goLink(item,'mouseup',$event)"></div>
      <div :class="b('item')"
           ref="item">
        <slot></slot>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "draggable",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 0
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
  data() {
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
          classname: "right",
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
          classname: "bottom-right",
          mousedown: "rangeMouseDown",
          mousemove: "rangeMouseMove",
          mouseup: "rangeMouseUp"
        }
      ]
    };
  },
  computed: {
    styleName() {
      return {
        top: this.setPx(this.baseTop),
        left: this.setPx(this.baseLeft),
        width: this.setPx(this.baseWidth + 20),
        height: this.setPx(this.baseHeight + 20),
        zIndex: this.zIndex
      };
    }
  },
  watch: {
    active(val) {
      if (val) {
        this.$emit("change", this.index);
      }
    },
    baseWidth(val) {
      this.$refs.wrapper.style.width = this.setPx(val);
      this.children.style.width = this.setPx(val);
    },
    baseHeight(val) {
      this.$refs.wrapper.style.height = this.setPx(val);
      this.children.style.height = this.setPx(val);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.children = this.$refs.item.firstChild;
      this.baseWidth = this.width || this.children.offsetWidth;
      this.baseHeight = this.height || this.children.offsetHeight;
      this.baseLeft = this.left;
      this.baseTop = this.top;
      this.children.style.overflow = "hidden";
    });
  },

  methods: {
    setActive(val) {
      this.active = val;
    },
    goLink(item, type, e) {
      this[item[type]](e);
    },
    docMouseUp() {
      this.$emit("focus");
      window.document.onmouseup = e => {
        window.document.onmousemove = undefined;
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
    rangeMouseDown(e) {
      this.rangeActive = true;
      this.rx = e.clientX;
      this.ry = e.clientY;
      this.docMouseUp();
    },
    rangeMouseXMove(e) {
      this.rangeMove(e, true, false);
    },
    rangeMouseYMove(e) {
      this.rangeMove(e, false, true);
    },
    rangeMouseMove(e) {
      this.rangeMove(e, true, true);
    },
    rangeMove(e, x, y) {
      if (this.rangeActive) {
        window.document.onmousemove = e => {
          this.active = false;
          this.moveActive = true;
          const startX = e.clientX;
          const startY = e.clientY;
          if (x)
            this.baseWidth = this.baseWidth + (startX - this.rx) * this.step;
          if (y)
            this.baseHeight = this.baseHeight + (startY - this.ry) * this.step;
          this.rx = startX;
          this.ry = startY;
        };
      }
    },
    rangeMouseUp() {
      this.$emit("blur");
      this.rangeActive = false;
    },
    handleMouseOut() {
      this.overActive = false;
    },
    handleMouseOver() {
      this.overActive = true;
    },
    handleMouseDown(e) {
      this.active = true;
      this.moveActive = true;
      this.x = e.clientX;
      this.y = e.clientY;
      this.docMouseUp();
    },
    handleMouseMove(e) {
      if (this.moveActive && !this.rangeActive) {
        window.document.onmousemove = e => {
          this.active = false;
          this.overActive = false;
          const startX = e.clientX;
          const startY = e.clientY;
          this.baseLeft = this.baseLeft + (startX - this.x) * this.step;
          this.baseTop = this.baseTop + (startY - this.y) * this.step;
          this.x = startX;
          this.y = startY;
        };
      }
    },
    handleMouseUp() {
      this.$emit("blur");
      this.moveActive = false;
    }
  }
});
</script>
