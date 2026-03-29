import * as Icons from '@element-plus/icons-vue';

export default (app: any) => {
  for (const key in Icons) {
    app.component(transElIconName(key), (Icons as Record<string, any>)[key]);
  }
};

function transElIconName(iconName: string) {
  return 'el-icon' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());
}
