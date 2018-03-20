function util() {
    this.flag = true;
    var body = document.body;
    var safe = this;
    var validVersion = function () {
        var browser = navigator.appName
        var b_version = navigator.appVersion
        var version = b_version.split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (trim_Version == 'WOW64') {
            safe.flag = false
        } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
            safe.flag = false
        }
        else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
            safe.flag = false
        }
        else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
            safe.flag = false
        }
        else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
            safe.flag = false
        }
    }
    this.setBody = function () {
        var str = '<div class="el-tip el-tip--warning" id="tip">' +
            '<div class="el-tip_content">' +
            '<span class="el-tip__title">' +
            '您乘坐的浏览器版本太低了,你可以把浏览器从兼容模式调到极速模式' +
            '<br /> 实在不行就换浏览器吧;' +
            '</span>' +
            '<div class="el-tip_img">' +
            '<img src="/static/util/screen/huohu.png" alt="">' +
            '<img src="/static/util/screen/guge.png" alt="">' +
            '</div>' +
            '</div>' +
            '</div>';
        body.innerHTML = str + body.innerHTML
    }
    this.init = function () {
        validVersion();//检测浏览器的版本
        return this;
    }
}

var creen = new util().init();
var flag = creen.flag;
if (!flag) {
    creen.setBody();
}