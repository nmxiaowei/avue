export default (() => {
  function init(el: HTMLElement, binding: any) {
    const value = binding.value;
    if (value === false) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
  }
  return {
    mounted(el: HTMLElement, binding: any) {
      init(el, binding);
    },
    updated(el: HTMLElement, binding: any) {
      init(el, binding);
    },
  };
})();
