<template>
    <div class="pull-auto datashow-contailer">
        <div class="item" :style="{background:data.color}">
            <div class="item-header">
                <p>{{data.title}}</p>
                <span>{{data.subtitle}}</span>
            </div>
            <div class="item-body">
                <h2>{{data.count}}</h2>
            </div>
            <div class="item-footer">
                <span>{{data.allcount}}</span>
                <p>{{data.text}}</p>
            </div>
            <p class="item-tip">{{data.key}}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "datashow",
  props: {
    data: {
      type: Object,
      default: {}
    },
    span: {
      type: Number,
      default: 6
    }
  }
};
</script>

<style lang="scss" scoped>
.datashow-contailer {
}
.item {
  position: relative;
  margin: 15px;
  padding: 12px;
  min-width: 260px;
  height: 144px;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  color: #fff;
}
.item-header {
  position: relative;
  & > p {
    margin: 0px;
    font-size: 14px;
  }
  & > span {
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    background: rgba(255, 255, 255, 0.3);
  }
}
.item-body {
  & > h2 {
    margin: 0;
    font-size: 32px;
    line-height: 60px;
  }
}
.item-footer {
  line-height: 16px;
  & > span {
    font-size: 10px;
  }
  & > p {
    margin: 0px;
    font-size: 11px;
  }
}
.item-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 80px;
  height: 80px;
  bottom: 10px;
  right: 10px;
  border: 2px solid #fff;
  border-radius: 100%;
  font-size: 48px;
  transform: rotate(-40deg);
  opacity: 0.1;
}
</style>
