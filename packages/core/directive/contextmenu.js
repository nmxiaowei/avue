
export default (() => {
  let dialogDom;
  function setEvent (el, value, event, first) {
    let v_params = value, e_params = event
    if (first) {
      el.oncontextmenu = function (e) {
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
        const closeDialog = () => {
          dialogDom.style.display = 'none'
          document.removeEventListener('click', closeDialog)
        }
        const showDialog = () => {
          dialogDom.style.display = 'block'
          dialogDom.style.position = 'fixed'
          dialogDom.style.zIndex = 1024
          dialogDom.style.top = divTop + 'px'
          dialogDom.style.left = divLeft + 'px'
          document.addEventListener('click', closeDialog)
        }
        if (e_params) {
          e_params(v_params, showDialog);
        } else {
          showDialog()
        }
        return false;
      }
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
      setEvent(el, value, event, true);
    },
    update (el, binding) {
      let event = binding.value.event
      let value = binding.value.value
      setEvent(el, value, event, false);
    }
  }
})()