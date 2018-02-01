<template>
	<iframe v-if="$route.query.src" :src='$route.query.src' class="iframe" ref="iframe"  v-loading.fullscreen.lock="fullscreenLoading"></iframe>  
    <iframe v-else :src="urlPath" class="iframe" ref="iframe"  v-loading.fullscreen.lock="fullscreenLoading"></iframe>  
</template>

<script>
	export default {
		name: 'myiframe',
		data() {
			return {
				fullscreenLoading: false,
				urlPath: this.getUrlPath() //iframe src 路径  
			}
		},
		created() {
			
		},
		mounted () {
			this.$route.query.src = this.$route.query.src?this.$route.query.src.replace('$','#'):'';
			this.iframeInit()
			window.onresize = () => {
				this.iframeInit()
			}
		},
		props:['routerPath'],
		watch: {
			$route:function(){
				this.$route.query.src = this.$route.query.src?this.$route.query.src.replace('$','#'):'';
			},
			routerPath: function(val) {// 监听routerPath变化，改变src路径  
				this.urlPath = this.getUrlPath();  
			}  
		} ,
		components: {

		},
		methods: {
			iframeInit(){
				const iframe=this.$refs.iframe;
				this.fullscreenLoading = true;
				const clientHeight=document.documentElement.clientHeight-120;
				iframe.style.height=`${clientHeight}px`;
				if (iframe.attachEvent) {
					iframe.attachEvent('onload', () => {
						this.fullscreenLoading = false
					})
				} else {
					iframe.onload = () => {
						this.fullscreenLoading = false
					}
				}
			},
			getUrlPath:function() {//获取 iframe src 路径  
				let url = window.location.href;  
				url = url.replace("/myiframe","");  ;
				return url;  
			},  
		}
	}
</script>

<style>
	.iframe {
        width: 100%;
        height: 100%;
		border: 0;
		overflow: hidden;
        box-sizing: border-box;
     }
</style>