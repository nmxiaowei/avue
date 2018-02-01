<template>
	<div class="yun-login-web">
		<div class="yun-login-bg" id="loginBgBox">
			<div class="login-bg login_bg1" id="loginBg" @mouseover='bgmouseover' @mouseout='bgmouseout' @mousemove='bgmousemove'></div>
		</div>
		<div class="yun-login-logo">
			<img :src="headerLogo" class="yun-login-logo-img" />
			<div class="yun-login-logo-title">
				<p>库尔勒农村商业银行</p>
				<small>KORLA RURAL COMMERCIAL BANK</small>
			</div>
			<p class="yun-login-logo-subtitle">库尔勒快贷采集系统</p>
		</div>
		<div class="yun-login-main">
			<div class="yun-login-banner">
				<div class="login-banner">
					<p class="title">"安全存储</p>
					<p class="subtitle">数据井井有条"</p>
				</div>
				<div class="login-banner hidden">
					<p class="title">"在线预览</p>
					<p class="subtitle">数据即开即看"</p>
				</div>
				<div class="login-banner hidden">
					<p class="title">"多端并用</p>
					<p class="subtitle">数据随身携带"</p>
				</div>
			</div>
			<div class="yun-login-box">
				<p class="yun-login-tip">账号密码登录</p>
				<div class="yun-login-form">
					<div class="yun-login-form-box">
						<div class="yun-form-cell">
							<!--<div class="yun-form-label">账号</div>-->
							<input class="yun-form-input" type="text" placeholder="请输入用户名" v-model="user.username" @keyup.enter="login" />
						</div>
						<div class="yun-form-cell">
							<!--<div class="yun-form-label">密码</div>-->
							<input class="yun-form-input" type="password" placeholder="请输入密码" v-model="user.passwd" @keyup.enter="login" />
						</div>
					</div>
					<div class="yun-login-form-menu">
						<a class="pull-right" @click="unlogin">无网登录</a>
					</div>
					<div class="yun-login-form-btn">
						<button v-waves class="yun-login-btn yun-login-pirmay" @click="login">登录</button>
					</div>
				</div>
				<div class="yun-login-box-footer">
					<a href="">登录遇到问题？</a>|
					<a href="">系统帮助手册</a>
				</div>
			</div>
		</div>
		<div class="yun-login-footer">
			库尔勒农村商业银行所有版权 ©2013-2017&nbsp;|&nbsp;库尔勒快贷采集系统
		</div>
	</div>
</template>

<script>
function banner() {
	var loginBg = document.getElementById('loginBg');
	var loginBgBox = document.getElementById('loginBgBox');
	var loginBanners = document.getElementsByClassName('login-banner');
	let count = 0;
	setInterval(function() {
		count++;
		loginBg.className = 'login-bg login_bg' + count;
		for (var i = 0; i < loginBanners.length; i++) {
			if ((i + 1) == count) {
				loginBanners[i].className = 'login-banner'
			} else {
				loginBanners[i].className = 'login-banner hidden';
			}
		}
		if (count == 3) {
			count = 0;
		}
	}, 3000);
}
var startX, startY, endX, endY;
import { mapState } from 'vuex';
import { setSessionStore, vaildUtil } from '@/util/yun'
import headerLogo from '@/assets/img/logo.png'
import waves from '@/directive/waves/index.js' // 水波纹指令
export default {
	name: 'login',
	directives: {
    	waves
  	},
	data() {
		return {
			user: {
				username: 'admin',
				passwd: '11111111',
			},
			headerLogo:headerLogo,
		}
	},
	created() {

	},
	mounted() {
		banner();
	},
	computed: mapState({

	}),
	props: [],
	methods: {
		bgmousemove(e) {
			endX = e.pageX;
			endY = e.pageX;
			var x = -(endX - startX) * 0.06;
			var y = -(endY - startY) * 0.06;
			x > 40 ? x = 40 : x;
			y > 40 ? y = 40 : y;
			loginBgBox.style.transform = `matrix(1.1, 0, 0, 1.1, ${x},${y} )`;
		},
		bgmouseover(e) {
			startX = e.pageX;
			startY = e.pageX
			loginBgBox.style.transform = `matrix(1.1, 0, 0, 1.1, 0,0 )`;
		},
		bgmouseout() {
			startX = 0;
			startY = 0;
			endX = 0;
			endY = 0;
			loginBgBox.style.transform = `matrix(1, 0, 0, 1, 0,0 )`;
		},
		//养植信息验证器,
		loginVaild() {
			return new Promise((resolve, reject) => {
				const h = this.$createElement;
				let config = {
					msg: '',
					type: 0,
					boxtype: 'warning',
					title: '警告',
					data: '',
				}
				resolve(config);
			});
		},
		unlogin() {
			this.$store.commit('SET_ONLINE', false);
			this.$router.push({ path: '/' })
		},
		login() {
			this.$store.dispatch('LoginByUsername', this.user).then(res => {
				if(res.data==null){
					 this.$message.error({
						message: res.message,
						center: true
					});
				}else{
					this.$router.push({ path: '/' })
				}
				
			})
		}
	},
	components: {

	}
}
</script>

<style lang="scss" scoped>
.yun-login-web {}



/*背景大图盒子*/

.yun-login-bg {
	width: 100%;
	height: 100%;
	position: fixed;
	transition: all 500ms linear;
}



/*背景图轮询*/

.login-bg {
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
}



/*背景图1-3*/

.login_bg1 {
	background: url(../assets/img/bg/bg3.jpg) no-repeat center center;
	background-size: cover;
}

.login_bg2 {
	background: url(../assets/img/bg/bg2.jpg) no-repeat center center;
	background-size: cover;
}

.login_bg3 {
	background: url(../assets/img/bg/bg1.jpg) no-repeat center center;
	background-size: cover;
}



/*背景图的文字提示盒子*/

.yun-login-banner {
	position: absolute;
	top: 280px;
	left: 150px;
}



/*背景图文字提示*/

.login-banner {
	color: #fff;
	font-size: 46px;
}



/*背景图文字提示第一行文字*/

.login-banner>.title {}



/*背景图文字提示第二行文字*/

.login-banner>.subtitle {
	text-indent: 1em;
}



/*登录页面的中间部分*/

.yun-login-main {
	padding: 90px 0;
	height: auto;
	overflow: hidden;
}



/*登录页面的框子*/

.yun-login-box {
	padding: 30px 0 0 0;
	background: #fff;
	border-radius: 5px;
	position: relative;
	right: 100px;
	width: 320px;
	height: auto;
	overflow: hidden;
	float: right;
}



/*页面的logo*/

.yun-login-logo {
	position: relative;
	padding: 20px 15px;
	display: flex;
	align-items: center;
	color: #fff;
}



/*logo的图片素材*/

.yun-login-logo-img {
	margin-top:-5px;
	width: 45px;
}



/*logo的文字素材*/

.yun-login-logo-title {
	position: relative;
	padding: 0 10px 0 8px;
	text-align: center;
	color:#fff;
}



/*logo文字辅助素材的横线*/

.yun-login-logo-title:after {
	position: absolute;
	top: 5%;
	right: 0;
	content: '';
	width: 1px;
	height: 90%;
	background: #fff;
}



/*logo文字*/

.yun-login-logo-title>p {
	font-size: 20px;
	font-weight: bold;
	line-height: 20px;
	letter-spacing:2px;
}



/*logo文字的英文字母*/

.yun-login-logo-title>small {
	font-size: 12px;
}

.yun-login-logo-subtitle {
	padding: 0 10px;
	font-size: 28px;
}

.yun-login-tip {
	margin-top: -5px;
	font-size: 18px;
	text-align: center;
}



/*登录的form表单盒子*/

.yun-login-form-box {
	margin: 30px auto 0 auto;
	width: 100%;
	border: 1px solid #e7e7e7;
	border-radius: 5px;
}

.yun-login-form {
	padding: 0 20px;
}



/*form表单的每一行*/

.yun-form-cell {
	display: flex;
	align-items: center;
	border-bottom: 1px solid #e7e7e7;
}

.yun-form-cell:last-child {
	border: 0;
}



/*form表单每一行中的文字提示*/

.yun-form-label {
	padding-right: 10px;
	width: 50px;
	font-size: 16px;
	text-indent: 3px;
}



/*form表单中每一行文字的输入框*/

.yun-form-input {
	width: 250px;
	height: 45px;
	background: transparent;
	border: 0;
	text-indent: 15px;
}

.yun-login-form-menu>a {
	line-height: 50px;
}

.yun-login-form-footer {
	text-align: center;
}

.yun-login-form-btn .yun-login-btn {}

.yun-login-btn {
	display: inline-block;
	line-height: 1;
	white-space: nowrap;
	cursor: pointer;
	background: #fff;
	border: 1px solid #c4c4c4;
	color: #1f2d3d;
	margin: 0;
	padding: 12px 15px;
	font-size: 16px;
	border-radius: 4px;
}



/*登录按钮*/

.yun-login-pirmay {
	width: 100%;
	background: #4180e9;
	border: 1px solid #4180e9;
	color: #fff;
}

.yun-login-box-footer {
	margin-top: 8px;
	padding: 0 20px;
	height: 60px;
	background: rgb(243, 248, 255);
}

.yun-login-box-footer>a {
	padding: 0 8px;
	color: #333;
	line-height: 60px;
}

.yun-login-footer {
	position: absolute;
	bottom: 15px;
	width: 100%;
	font-size: 16px;
	line-height: 45px;
	text-align: center;
	color: #fff;
}
</style>