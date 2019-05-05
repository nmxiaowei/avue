<template>
  <div class="avue-echart avue-echart-slide"
       :style="styleSizeName">
    <div class="swiper-container">
      <div class="swiper-wrapper"
           v-if="reload">
        <slot></slot>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "slide",
  data() {
    return {
      reload: true
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    delay() {
      return this.option.delay || 3000;
    },
    autoplay() {
      return this.vaildData(this.option.autoplay, false);
    }
  },
  watch: {
    option: {
      handler() {
        this.reload = false;
        this.$nextTick(() => {
          this.reload = true;
          this.init();
        });
      },
      deep: true
    }
  },
  methods: {
    init() {
      new Swiper(
        ".swiper-container",
        Object.assign(
          (() => {
            if (this.autoplay) {
              return {
                autoplay: {
                  delay: this.delay,
                  disableOnInteraction: false
                }
              };
            }
            return {};
          })(),
          {
            spaceBetween: 80,
            pagination: {
              el: ".swiper-pagination",
              clickable: true
            },
            observer: true,
            observeParents: true
          }
        )
      );
    }
  }
});
</script>

