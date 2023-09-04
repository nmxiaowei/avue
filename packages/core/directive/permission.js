export default (() => {
  function init (el, binding) {
    const value = binding.value;
    if (value === false) {
      el.style.display = "none"
    } else {
      el.style.display = ""
    }
  }
  return {
    mounted (el, binding) {
      init(el, binding)
    },
    updated (el, binding) {
      init(el, binding)
    }
  }
})()