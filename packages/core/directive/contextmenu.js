export default (() => {
  let dialogDom;
  let closeDialog;

  function setupChildMenus(items, dialogDom, divTop, clientHeight) {
    items.forEach((ele, i) => {
      const childDom = ele.querySelector("ul");
      if (!childDom) return;
      Object.assign(childDom.style, {
        position: "absolute",
        top: "-9999px",
        width: "max-content",
      });
      // 使用具名函数以便移除，避免重复绑定
      if (ele._onEnter) {
        ele.removeEventListener("mouseenter", ele._onEnter);
        ele.removeEventListener("mouseleave", ele._onLeave);
      }
      ele._onEnter = () => {
        const calcHeight =
          clientHeight -
          (divTop + ele.clientHeight * (i + 1)) -
          childDom.clientHeight;
        childDom.style.left = `${dialogDom.clientWidth + 1}px`;
        childDom.style.top = `${calcHeight < 0 ? calcHeight : 0}px`;
      };
      ele._onLeave = () => {
        childDom.style.top = "-9999px";
      };
      ele.addEventListener("mouseenter", ele._onEnter);
      ele.addEventListener("mouseleave", ele._onLeave);
    });
  }

  function setEvent(el, binding) {
    const dom = document.getElementById(binding.value.id);
    if (dom) dom.style.display = "none";
    el.oncontextmenu = function (e) {
      e.preventDefault();
      const { id, event, hide, value } = binding.value;
      dialogDom = document.getElementById(id);
      if (!dialogDom) return;
      const { clientWidth, clientHeight } = document.documentElement;
      let { clientX: divLeft, clientY: divTop } = e;

      dialogDom.style.display = "block";
      const { offsetWidth: dialogDomWidth, offsetHeight: dialogDomHeight } =
        dialogDom;

      if (clientHeight - divTop - dialogDomHeight < 0) {
        divTop -= dialogDomHeight;
      }
      if (clientWidth - divLeft - dialogDomWidth < 0) {
        divLeft -= dialogDomWidth;
      }

      // 筛选第一层级 li
      const firstLevelItems = Array.from(
        dialogDom.querySelectorAll("li")
      ).filter((item) => item.parentNode === dialogDom);
      setupChildMenus(firstLevelItems, dialogDom, divTop, clientHeight);

      // 移除旧的 click 监听后再绑定，防止重复
      if (closeDialog) {
        document.removeEventListener("click", closeDialog);
      }
      closeDialog = () => {
        dialogDom.style.display = "none";
        hide && hide(value, e);
        document.removeEventListener("click", closeDialog);
        closeDialog = null;
      };

      const showDialog = () => {
        Object.assign(dialogDom.style, {
          position: "fixed",
          zIndex: 1024,
          top: `${divTop}px`,
          left: `${divLeft}px`,
        });
        document.addEventListener("click", closeDialog);
      };

      event ? event(value, showDialog) : showDialog();
    };
  }

  return {
    mounted(el, binding) {
      setEvent(el, binding);
    },
    updated(el, binding) {
      setEvent(el, binding);
    },
    unmounted(el) {
      el.oncontextmenu = null;
      if (closeDialog) {
        document.removeEventListener("click", closeDialog);
        closeDialog = null;
      }
    },
  };
})();
