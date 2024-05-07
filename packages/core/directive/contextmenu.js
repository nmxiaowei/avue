export default (() => {
  let dialogDom;

  function setEvent(el, value, event, hide, first) {
    let v_params = value,
      e_params = event,
      h_params = hide
    if (first) {
      el.oncontextmenu = function (e) {
        e.preventDefault();
        let divLeft = e.clientX,
          divTop = e.clientY
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

        function closeDialog() {
          dialogDom.style.display = 'none'
          h_params & h_params(v_params, e)
          document.removeEventListener('click', closeDialog)
        }

        function showDialog() {
          dialogDom.style.display = 'block'
          dialogDom.style.position = 'fixed'
          dialogDom.style.zIndex = 1024
          dialogDom.style.top = divTop + 'px'
          dialogDom.style.left = divLeft + 'px'
          document.addEventListener('click', closeDialog)
        }
        if (e_params) {
          e_params(v_params, showDialog, e);
        } else {
          showDialog()
        }

      }
    }

  }
  return {
    mounted(el, binding) {
      let id = binding.value.id
      let event = binding.value.event
      let hide = binding.value.hide
      let value = binding.value.value
      dialogDom = document.getElementById(id)
      if (!dialogDom) return
      dialogDom.style.display = 'none'
      setEvent(el, value, event, hide, true);
    },
    update(el, binding) {
      let event = binding.value.event
      let hide = binding.value.hide
      let value = binding.value.value
      setEvent(el, value, event, hide, false);
    }
  }
})()
