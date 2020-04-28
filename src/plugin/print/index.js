export default function({ id, html }) {
  const style = `
    <style>
    body{
      min-width:1000px;
    }
    .avue-form__menu,.el-table__fixed-right,.avue-crud__search,.avue-crud__menu, .avue-crud__pagination,.avue-crud__tip{
      display: none;
    }
    .el-select,
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner,
    .el-cascader,
    .avue-input-number {
      width: 100% !important;
    }
    </style >
  `;
  let domHtml = '';
  let allHtml = document.documentElement.innerHTML;
  let bodyHtmlStart = allHtml.substr(0, allHtml.indexOf('<body'));
  bodyHtmlStart = bodyHtmlStart + '<body >' + style;
  let bodyHtmlEnd = allHtml.substr(allHtml.indexOf('</body>'));
  bodyHtmlEnd = bodyHtmlEnd + '</body>';
  if (id) {
    let obj = document.getElementById(id);
    if (!obj) {
      return false;
    }
    domHtml = bodyHtmlStart + document.getElementById(id).innerHTML + bodyHtmlEnd;
  } else if (html) {
    domHtml = bodyHtmlStart + html + bodyHtmlEnd;
  }
  var tab = window.open('', 'Avue打印插件');
  tab.document.open();
  tab.document.write(domHtml);
  setTimeout(() => {
    tab.window.print();
    tab.close();
  }, 0);
}
