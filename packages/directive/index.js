export default (Vue) => {
  Vue.directive('permission', (el, binding) => {
    const value = binding.value;
    if (value === false) {
      el.style.display = "none"
    } else {
      el.style.display = ""
    }
  })
}