export default (Vue) => {
  Vue.directive('permission', (el, binding) => {
    const value = binding.value;
    if (value === false || value === undefined) {
      el.style.display = "none"
    } else {
      el.style.display = ""
    }
  })
}