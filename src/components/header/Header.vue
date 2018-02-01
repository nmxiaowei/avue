<template>
	<div class="mint-header">
		<div class="mint-header-button is-left">
			<slot name="left"></slot>
		</div>
		<h1 class="mint-header-title">{{title}}</h1>
		<div class="mint-header-button is-right">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script>
export default {
  name: "header",
  data() {
    return {};
  },
  created() {},
  props: ["title"],
  components: {}
};
</script>

<style>
.mint-header {
  background: #fdfdfd !important;
  color: #324157 !important;
  border-bottom: 3px solid #324157 !important;
}
</style>