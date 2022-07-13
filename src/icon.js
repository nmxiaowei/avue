import * as Icons from '@element-plus/icons-vue'
export default (app) => {
  for (const key in Icons) {
    app.component(transElIconName(key), Icons[key])
  }
}

function transElIconName (iconName) {
  return 'el-icon' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase())
}