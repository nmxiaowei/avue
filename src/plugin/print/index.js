export default function({ id, html }) {
  let domHtml = '';
  let allHtml = document.documentElement.innerHTML;
  let bodyHtmlStart = allHtml.substr(0, allHtml.indexOf('<body'));
  let bodyHtmlEnd = allHtml.substr(allHtml.indexOf('</body>'));
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
