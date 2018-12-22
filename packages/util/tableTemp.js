import { vaildData } from 'utils/util';
import { validatenull } from 'utils/validate';
/**
 * @description 拼接table模版
 * @param {*} columnOption 模版格式
 * @param {*} list 数据格式
 */
// 样式
const style = `
table{
  font-size:12px;
  border-collapse:collapse;
  border-spacing:0;
  border-left:1px solid #ebeef5;
  border-top:1px solid #ebeef5;
  text-align:center;
}
table td{
  padding:8px 10px;
  border-right:1px solid #ebeef5;
  border-bottom:1px solid #ebeef5;
}
table th{
  padding:10px 0;
  font-weight:bold;
  background-color: #fafafa;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
  border-right:1px solid #ebeef5;
  border-bottom:1px solid #ebeef5;
  color:#333;
}
`;

export default function (columnOption, list, tableOption) {
  let html = `<style>${style}</style>`;
  if (!validatenull(tableOption.title)) { html = html + `<h2>${tableOption.title}</h2>`; }

  let table = '<table  width="100%" cellspacing="0" cellpadding="0">';
  // 处理头部
  let table_header = '';
  table_header = '<tr>';
  columnOption.forEach((ele, index) => {
    table_header = `${table_header}<th width="${ele.width || ''}">${
      ele.label
      }</th>`;
  });
  table_header = `${table_header}</tr>`;

  // 处理数据
  let table_body = '';
  list.forEach(ele => {
    table_body = `${table_body}<tr>`;
    columnOption.forEach(column => {
      const prop = column.prop;
      const value = vaildData(ele['$' + prop], ele[prop]) || '';
      table_body = `${table_body}<td>${value}</td>`;
    });
    table_body = `${table_body}</tr>`;
  });

  // 合并模版
  table = `${table}${table_header}${table_body}</table>`;
  return html + table;
}
