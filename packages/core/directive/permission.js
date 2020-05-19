function init (el, binding) {
  const value = binding.value;
  if (value === false) {
    el.style.display = "none"
  } else {
    el.style.display = ""
  }
}
export default {
  bind (el, binding) {
    init(el, binding)
  },
  update (el, binding) {
    init(el, binding)
  }
}
