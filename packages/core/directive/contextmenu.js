
export default (() => {
  let dialogDom;
  function setEvent (el, value, event) {
    el.oncontextmenu = function (e) {
      dialogDom.style.display = 'block'
      let divLeft = e.clientX, divTop = e.clientY
      let client_width = document.documentElement.clientWidth;
      let client_height = document.documentElement.clientHeight;
      let dialogDom_width = dialogDom.offsetWidth;
      let dialogDom_height = dialogDom.offsetHeight
      let calcWidth = client_width - divLeft - dialogDom_width
      let calcHeight = client_height - divTop - dialogDom_height
      if (calcHeight < 0) {
        divTop = divTop - dialogDom_height
      }
      if (calcWidth < 0) {
        divLeft = divLeft - dialogDom_width
      }
      dialogDom.style.position = 'fixed'
      dialogDom.style.top = divTop + 'px'
      dialogDom.style.left = divLeft + 'px'
      event && event(value);
      const closeDialog = () => {
        dialogDom.style.display = 'none'
        document.body.removeEventListener('click', closeDialog)
      }
      document.body.addEventListener('click', closeDialog)
      return false;
    }
  }
  return {
    inserted (el, binding) {
      let id = binding.value.id
      let event = binding.value.event
      let value = binding.value.value
      dialogDom = document.getElementById(id)
      if (!dialogDom) return
      dialogDom.style.display = 'none'
      setEvent(el, value, event);
    },
    update (el, binding) {
      let event = binding.value.event
      let value = binding.value.value
      setEvent(el, value, event);
    }
  }
})()