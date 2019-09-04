import packages from "core/packages";
export default function (doc, option = {}) {
  if (!window.html2canvas) {
    packages.logs("Screenshot");
    return
  }
  return window.html2canvas(doc, option)
}