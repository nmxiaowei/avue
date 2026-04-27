import packages from 'core/packages';

export default function (doc: HTMLElement, option: Record<string, any> = {}) {
  if (!(window as any).html2canvas) {
    packages.logs('Screenshot');
    return;
  }
  return (window as any).html2canvas(doc, option);
}
