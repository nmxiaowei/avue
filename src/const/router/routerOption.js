import {
  DIC
} from '@/const/dic'
export default {
  border: true,
  index: true,
  selection: true,
  delBtn: false,
  editBtn: false,
  page: false,
  height: '500',
  menuWidth: '150',
  dicData: DIC,
  column: [{
    label: "姓名",
    prop: "name"
  }, {
    label: "git地址",
    prop: "git",
    solt: true,
  }]
};
