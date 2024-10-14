export default (() => {
  let dialogDom;

  function setEvent (el, value, event, hide) {
    let v_params = value,
      e_params = event,
      h_params = hide
    el.oncontextmenu = function (e) {
      const { clientWidth, clientHeight } = document.documentElement;
      let { clientX: divLeft, clientY: divTop } = e;
      dialogDom.style.display = 'block';
      const { offsetWidth: dialogDomWidth, offsetHeight: dialogDomHeight } = dialogDom;

      let calcWidth = clientWidth - divLeft - dialogDomWidth
      let calcHeight = clientHeight - divTop - dialogDomHeight
      if (calcHeight < 0) {
        divTop = divTop - dialogDomHeight
      }
      if (calcWidth < 0) {
        divLeft = divLeft - dialogDomWidth
      }
      let liDom = dialogDom.querySelectorAll('li');
      const firstLevelItems = Array.from(liDom).filter(item => {
        return item.parentNode === dialogDom;
      });
      let len = firstLevelItems.length
      for (let i = 0; i < len; i++) {
        let ele = firstLevelItems[i]
        let childDom = ele.querySelector("ul");
        if (childDom) {
          childDom.style.position = 'absolute'
          childDom.style.top = '-9999px'
          childDom.style.width = 'max-content'
          ele.addEventListener('mouseenter', () => {
            childDom.style.left = `${dialogDom.clientWidth + 1}px`;
            const calc_height = clientHeight - (divTop + ele.clientHeight * (i + 1)) - childDom.clientHeight
            const top = calc_height < 0 ? calc_height : 0
            childDom.style.top = `${top}px`;
          });
          ele.addEventListener('mouseleave', () => {
            childDom.style.top = '-9999px'
          });
        }

      }

      function closeDialog () {
        dialogDom.style.display = 'none'
        h_params && h_params(v_params, e)
        document.removeEventListener('click', closeDialog)
      }

      function showDialog () {
        dialogDom.style.position = 'fixed'
        dialogDom.style.zIndex = 1024
        dialogDom.style.top = `${divTop}px`;
        dialogDom.style.left = `${divLeft}px`;
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
  return {
    inserted (el, binding) {
      let id = binding.value.id
      let event = binding.value.event
      let value = binding.value.value
      let hide = binding.value.hide
      dialogDom = document.getElementById(id)
      if (!dialogDom) return
      dialogDom.style.display = 'none'
      setEvent(el, value, event, hide);
    },
    update (el, binding) {
      let event = binding.value.event
      let value = binding.value.value
      let hide = binding.value.hide
      setEvent(el, value, event, hide);
    },
    unbind (el) {
      el.oncontextmenu = null;
    }
  }
})()
