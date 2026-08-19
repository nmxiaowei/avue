export interface ClipboardOption {
  text: string | number | null | undefined;
  fallback?: boolean;
}

const legacyCopy = (text: string) => {
  const activeElement = document.activeElement as HTMLElement | null;
  const selection = window.getSelection();
  const ranges = selection ? Array.from({ length: selection.rangeCount }, (_, index) => selection.getRangeAt(index).cloneRange()) : [];
  const textarea = document.createElement('textarea');
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.setAttribute('aria-hidden', 'true');
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style[isRTL ? 'right' : 'left'] = '-9999px';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  const copied = document.execCommand('copy');
  textarea.remove();
  if (selection) {
    selection.removeAllRanges();
    ranges.forEach((range) => selection.addRange(range));
  }
  activeElement?.focus?.({ preventScroll: true });
  if (!copied) throw new Error('浏览器拒绝写入剪切板。');
};

export default async function ({ text, fallback = true }: ClipboardOption) {
  if (typeof document === 'undefined') throw new Error('当前环境不支持剪切板。');
  const value = text === null || text === undefined ? '' : String(text);
  const clipboard = navigator.clipboard;
  if (clipboard && typeof clipboard.writeText === 'function' && window.isSecureContext) {
    try {
      await clipboard.writeText(value);
      return;
    } catch (error) {
      if (!fallback) throw error;
    }
  }
  if (!fallback) throw new Error('当前浏览器不支持剪切板写入。');
  legacyCopy(value);
}
