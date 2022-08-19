<template>
  <div :class="[b(),className]"
       :style="styleSizeName"
       ref="main">
    <div :id="id">
      <div></div>
    </div>
  </div>
</template>

<script>
import { uuid } from 'utils/util'
import create from "core/create";
export default create({
  name: "code",
  props: {
    code: String
  },
  data () {
    return {
      id: 'code_' + uuid(),

    };
  },
  watch: {
    code () {
      this.initVue()
    }
  },
  mounted () {
    this.initVue()
  },
  methods: {
    initVue () {

      let template = this.getSource("template");
      if (!template) return
      let script = this.getSource("script");
      if (script) {
        script = script.replace(/export default/, "return");
      }
      let styleCss = this.getSource("style");
      let styleId = 'style-' + this.id;
      if (document.getElementById(styleId)) {
        document.getElementById(styleId).remove()
      }
      let style = document.createElement("style");
      style.id = styleId
      style.innerHTML = styleCss;
      document.head.appendChild(style);
      let obj = new Function(script)();
      obj.template = template;
      let constructor = window.Vue.extend(obj);
      new constructor().$mount(document.getElementById(this.id).childNodes[0]);
    },
    getSource (type) {
      const reg = new RegExp(`<${type}[^>]*>`);
      let content = this.code;
      let matches = content.match(reg);
      if (matches) {
        let start = content.indexOf(matches[0]) + matches[0].length;
        let end = content.lastIndexOf(`</${type}`);
        return content.slice(start, end)
      }
    }
  }
});
</script>