<template>
	<div class="app-main">
		<div class="yun-content">
			<div class="banner-sky"></div>
			<div class="banner-text">
				<h1>《严肃信贷纪律、防控信贷风险的“八条禁令”》</h1>
				<span :class="['actor',{typeing:isText}]">{{text}}</span>
			</div>
			
		</div>
	</div>
</template>

<script>
import DATA from "@/const/wel";
import { mapState } from "vuex";
import { dateFormat } from "@/util/yun";
export default {
  name: "wel",
  data() {
    return {
      DATA: DATA,
      text: "",
      time: "",
      actor: "",
      count: 0,
      isText: false
    };
  },
  created() {
    this.actor = this.DATA[this.count] || "";
    setTimeout(() => {
      this.isText = true;
      this.setData();
    }, 2000);
    setInterval(() => {
      this.time = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
    }, 1000);
  },
  computed: mapState({
    user: state => state.user
  }),
  methods: {
    getData() {
      if (this.count < this.DATA.length - 1) {
        this.count++;
      } else {
        this.count = 0;
      }
      this.isText = true;
      this.actor = this.DATA[this.count];
    },
    setData() {
      let num = 0;
      let count = 0;
      let active = false;
      let timeoutstart = 5000;
      let timeoutend = 1000;
      let timespeed = 10;
      setInterval(() => {
        if (this.isText) {
          if (count == this.actor.length) {
            active = true;
          } else {
            active = false;
          }
          if (active) {
            num--;
            this.text = this.actor.substr(0, num);
            if (num == 0) {
              this.isText = false;
              setTimeout(() => {
                count = 0;
                this.getData();
              }, timeoutend);
            }
          } else {
            num++;
            this.text = this.actor.substr(0, num);
            if (num == this.actor.length) {
              this.isText = false;
              setTimeout(() => {
                this.isText = true;
                count = this.actor.length;
              }, timeoutstart);
            }
          }
        }
      }, timespeed);
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
.yun-content {
  background-color: #eee;
}

.banner-sky {
  position: absolute;
  top: -100px;
  bottom: -15px;
  width: 100%;
  height: 100%;
  transform: skewY(-4deg);
  transform-origin: center;
  background-color: #fcfcfc;
}

.banner-text {
  position: relative;
  padding: 0 20px;
  color: #333;
}

.actor {
  height: 250px;
  overflow: hidden;
  font-size: 18px;
  color: #333;
}

.actor:after {
  content: "";
  width: 3px;
  height: 25px;
  vertical-align: -5px;
  margin-left: 5px;
  background-color: #333;
  display: inline-block;
  animation: blink 0.4s infinite alternate;
}

.typeing:after {
  animation: none;
}

@keyframes blink {
  to {
    opacity: 0;
  }
}
</style>