type ContextMenuBinding = {
  id?: string;
  value?: any;
  disabled?: boolean;
  event?: (value: any, show: () => void, event: MouseEvent) => void | boolean;
  hide?: (value: any, event: MouseEvent, reason?: string) => void;
};

type ContextMenuState = {
  el: HTMLElement;
  binding: { value: ContextMenuBinding };
  handler: (event: MouseEvent) => void;
  dialog: HTMLElement | null;
  triggerEvent: MouseEvent | null;
  submenuCleanups: Array<() => void>;
  dialogClick?: (event: MouseEvent) => void;
};

const GUTTER = 8;
const stateMap = new WeakMap<HTMLElement, ContextMenuState>();
let activeState: ContextMenuState | null = null;

const clamp = (value: number, min: number, max: number) => {
  const upper = Math.max(min, max);
  return Math.min(upper, Math.max(min, value));
};

function getViewport() {
  const root = document.documentElement;
  return {
    width: root.clientWidth || window.innerWidth,
    height: root.clientHeight || window.innerHeight,
  };
}

function clearSubmenus(state: ContextMenuState) {
  state.submenuCleanups.forEach((cleanup) => cleanup());
  state.submenuCleanups = [];
}

function hideSubmenus(dialog: HTMLElement) {
  dialog.querySelectorAll<HTMLElement>('.avue-contextmenu__submenu').forEach((menu) => {
    menu.style.display = 'none';
    menu.style.visibility = 'hidden';
  });
}

function setupSubmenus(state: ContextMenuState, menu: HTMLElement) {
  const items = Array.from(menu.children).filter(
    (item): item is HTMLElement => item instanceof HTMLElement && item.tagName === 'LI',
  );
  items.forEach((item) => {
    const submenu = Array.from(item.children).find(
      (child): child is HTMLElement =>
        child instanceof HTMLElement && (child.tagName === 'UL' || child.tagName === 'OL'),
    );
    if (!submenu) return;

    submenu.classList.add('avue-contextmenu', 'avue-contextmenu__submenu');
    Object.assign(submenu.style, {
      position: 'fixed',
      display: 'none',
      visibility: 'hidden',
    });
    const show = () => {
      const viewport = getViewport();
      const itemRect = item.getBoundingClientRect();
      submenu.style.display = 'block';
      submenu.style.visibility = 'hidden';
      const submenuRect = submenu.getBoundingClientRect();
      const openLeft = itemRect.right + 4;
      const left = openLeft + submenuRect.width + GUTTER > viewport.width
        ? itemRect.left - submenuRect.width - 4
        : openLeft;
      submenu.style.left = `${clamp(left, GUTTER, viewport.width - submenuRect.width - GUTTER)}px`;
      submenu.style.top = `${clamp(itemRect.top, GUTTER, viewport.height - submenuRect.height - GUTTER)}px`;
      submenu.style.visibility = 'visible';
    };
    const hide = () => {
      submenu.style.display = 'none';
      submenu.style.visibility = 'hidden';
    };
    item.addEventListener('mouseenter', show);
    item.addEventListener('mouseleave', hide);
    state.submenuCleanups.push(() => {
      item.removeEventListener('mouseenter', show);
      item.removeEventListener('mouseleave', hide);
    });
    setupSubmenus(state, submenu);
  });
}

function removeGlobalListeners() {
  document.removeEventListener('pointerdown', handleDocumentPointerDown, true);
  document.removeEventListener('keydown', handleDocumentKeydown, true);
}

function closeActive(reason = 'close') {
  const state = activeState;
  if (!state) return;
  activeState = null;
  removeGlobalListeners();
  clearSubmenus(state);
  if (state.dialog) {
    if (state.dialogClick) {
      state.dialog.removeEventListener('click', state.dialogClick);
      state.dialogClick = undefined;
    }
    state.dialog.style.display = 'none';
    state.dialog.style.visibility = 'hidden';
    state.dialog.setAttribute('aria-hidden', 'true');
  }
  const { hide, value } = state.binding.value || {};
  if (hide && state.triggerEvent) hide(value, state.triggerEvent, reason);
}

function handleDocumentPointerDown(event: PointerEvent) {
  const state = activeState;
  if (!state || !state.dialog) return;
  const target = event.target as Node | null;
  if (target && (state.dialog.contains(target) || state.el.contains(target))) return;
  closeActive('outside');
}

function handleDocumentKeydown(event: KeyboardEvent) {
  const state = activeState;
  if (!state || !state.dialog) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    closeActive('escape');
    return;
  }
  if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) return;
  const items = Array.from(state.dialog.children).filter(
    (item): item is HTMLElement => item instanceof HTMLElement && item.tagName === 'LI',
  );
  if (!items.length) return;
  event.preventDefault();
  const currentIndex = items.findIndex((item) => item === document.activeElement);
  if (event.key === 'Enter' && currentIndex >= 0) {
    items[currentIndex].click();
    return;
  }
  const nextIndex = event.key === 'ArrowUp'
    ? (currentIndex - 1 + items.length) % items.length
    : (currentIndex + 1) % items.length;
  items[nextIndex].focus();
}

function placeDialog(state: ContextMenuState) {
  const dialog = state.dialog;
  const triggerEvent = state.triggerEvent;
  if (!dialog || !triggerEvent) return;
  const viewport = getViewport();
  dialog.classList.add('avue-contextmenu');
  dialog.setAttribute('role', 'menu');
  dialog.setAttribute('tabindex', '-1');
  Object.assign(dialog.style, {
    position: 'fixed',
    zIndex: '3000',
    display: 'block',
    visibility: 'hidden',
    left: '0px',
    top: '0px',
  });
  const rect = dialog.getBoundingClientRect();
  const left = clamp(triggerEvent.clientX, GUTTER, viewport.width - rect.width - GUTTER);
  const top = clamp(triggerEvent.clientY, GUTTER, viewport.height - rect.height - GUTTER);
  dialog.style.left = `${left}px`;
  dialog.style.top = `${top}px`;
  dialog.style.visibility = 'visible';
  dialog.setAttribute('aria-hidden', 'false');

  clearSubmenus(state);
  hideSubmenus(dialog);
  setupSubmenus(state, dialog);
  Array.from(dialog.children).forEach((item) => {
    if (item instanceof HTMLElement && item.tagName === 'LI') {
      item.setAttribute('role', 'menuitem');
      item.setAttribute('tabindex', '-1');
    }
  });
  state.dialogClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target || !target.closest('li') || target.closest('[data-contextmenu-keep-open]')) return;
    closeActive('select');
  };
  dialog.addEventListener('click', state.dialogClick);
  dialog.focus();
  document.addEventListener('pointerdown', handleDocumentPointerDown, true);
  document.addEventListener('keydown', handleDocumentKeydown, true);
}

function openContextMenu(state: ContextMenuState, event: MouseEvent) {
  const config = state.binding.value || {};
  if (config.disabled || !config.id) return;
  const dialog = document.getElementById(config.id);
  if (!dialog) return;
  event.preventDefault();
  if (activeState) closeActive('switch');
  state.dialog = dialog;
  state.triggerEvent = event;
  const show = () => {
    if (activeState && activeState !== state) closeActive('switch');
    activeState = state;
    placeDialog(state);
  };
  if (typeof config.event === 'function') {
    const result = config.event(config.value, show, event);
    if (result === false) return;
  } else {
    show();
  }
}

function bind(el: HTMLElement, binding: any) {
  const existing = stateMap.get(el);
  if (existing) {
    existing.binding = binding;
    return;
  }
  const state = {
    el,
    binding,
    dialog: null,
    triggerEvent: null,
    submenuCleanups: [],
    handler: (event: MouseEvent) => openContextMenu(state, event),
  } as ContextMenuState;
  el.addEventListener('contextmenu', state.handler);
  stateMap.set(el, state);
  const id = binding.value && binding.value.id;
  if (id) {
    const dialog = document.getElementById(id);
    if (dialog) dialog.style.display = 'none';
  }
}

export default {
  mounted(el: HTMLElement, binding: any) {
    bind(el, binding);
  },
  updated(el: HTMLElement, binding: any) {
    bind(el, binding);
  },
  unmounted(el: HTMLElement) {
    const state = stateMap.get(el);
    if (!state) return;
    if (activeState === state) closeActive('unmount');
    clearSubmenus(state);
    el.removeEventListener('contextmenu', state.handler);
    stateMap.delete(el);
  },
};
