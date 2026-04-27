type ContextMenuItem = HTMLLIElement & {
  _onEnter?: () => void;
  _onLeave?: () => void;
};

export default (() => {
  let dialogDom: HTMLElement | null;
  let closeDialog: (() => void) | null;

  function setupChildMenus(items: ContextMenuItem[], currentDialogDom: HTMLElement, divTop: number, clientHeight: number) {
    items.forEach((ele, i) => {
      const childDom = ele.querySelector<HTMLElement>('ul');
      if (!childDom) return;
      Object.assign(childDom.style, {
        position: 'absolute',
        top: '-9999px',
        width: 'max-content',
      });
      if (ele._onEnter) {
        ele.removeEventListener('mouseenter', ele._onEnter);
        ele.removeEventListener('mouseleave', ele._onLeave!);
      }
      ele._onEnter = () => {
        const calcHeight = clientHeight - (divTop + ele.clientHeight * (i + 1)) - childDom.clientHeight;
        childDom.style.left = `${currentDialogDom.clientWidth + 1}px`;
        childDom.style.top = `${calcHeight < 0 ? calcHeight : 0}px`;
      };
      ele._onLeave = () => {
        childDom.style.top = '-9999px';
      };
      ele.addEventListener('mouseenter', ele._onEnter);
      ele.addEventListener('mouseleave', ele._onLeave);
    });
  }

  function setEvent(el: HTMLElement, binding: any) {
    const dom = document.getElementById(binding.value.id);
    if (dom) dom.style.display = 'none';
    el.oncontextmenu = function (e: MouseEvent) {
      e.preventDefault();
      const { id, event, hide, value } = binding.value;
      dialogDom = document.getElementById(id);
      if (!dialogDom) return;
      const { clientWidth, clientHeight } = document.documentElement;
      let { clientX: divLeft, clientY: divTop } = e;

      dialogDom.style.display = 'block';
      const { offsetWidth: dialogDomWidth, offsetHeight: dialogDomHeight } = dialogDom;

      if (clientHeight - divTop - dialogDomHeight < 0) {
        divTop -= dialogDomHeight;
      }
      if (clientWidth - divLeft - dialogDomWidth < 0) {
        divLeft -= dialogDomWidth;
      }

      const firstLevelItems = Array.from(dialogDom.querySelectorAll('li')).filter(
        (item) => item.parentNode === dialogDom
      ) as ContextMenuItem[];
      setupChildMenus(firstLevelItems, dialogDom, divTop, clientHeight);

      if (closeDialog) {
        document.removeEventListener('click', closeDialog);
      }
      closeDialog = () => {
        if (!dialogDom) return;
        dialogDom.style.display = 'none';
        hide && hide(value, e);
        document.removeEventListener('click', closeDialog!);
        closeDialog = null;
      };

      const showDialog = () => {
        if (!dialogDom) return;
        Object.assign(dialogDom.style, {
          position: 'fixed',
          zIndex: 1024,
          top: `${divTop}px`,
          left: `${divLeft}px`,
        });
        document.addEventListener('click', closeDialog!);
      };

      event ? event(value, showDialog) : showDialog();
    };
  }

  return {
    mounted(el: HTMLElement, binding: any) {
      setEvent(el, binding);
    },
    updated(el: HTMLElement, binding: any) {
      setEvent(el, binding);
    },
    unmounted(el: HTMLElement) {
      el.oncontextmenu = null;
      if (closeDialog) {
        document.removeEventListener('click', closeDialog);
        closeDialog = null;
      }
    },
  };
})();
