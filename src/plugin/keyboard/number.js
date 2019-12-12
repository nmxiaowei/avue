export default class NumberKeyboard {
  constructor(obj) {
    if (typeof obj !== 'object') {
      console.error('aKeyboard: The obj parameter needs to be an object <In "new aKeyboard()">');
      return;
    }

    this.obj = obj;

    const el = document.querySelector(obj.el);

    let keyboardStyle = '';
    if (typeof obj.style === 'object') {
      for (let i in obj.style) {
        keyboardStyle += i + ': ' + obj.style[i] + ';';
      }
    }

    let html = '<div class="akeyboard-numberKeyboard' + (obj.fixedBottomCenter ? ' akeyboard-keyboard-fixedBottomCenter' : '') + '" style="' + keyboardStyle + '">';

    // init keys
    html += '<div class="akeyboard-keyboard-innerKeys">';
    for (let i = 1; i < 10; i++) {
      html += '<div class="akeyboard-keyboard-keys akeyboard-keyboard-keys-' + i + '">' + i + '</div>';
      if (i % 3 === 0) {
        html += '</div><div class="akeyboard-keyboard-innerKeys">';
      }
    }
    html += '<div class="akeyboard-keyboard-keys akeyboard-keyboard-keys-0">0</div><div class="akeyboard-keyboard-keys akeyboard-keyboard-keys-Delete">Delete</div></div><div class="akeyboard-keyboard-innerKeys"><div class="akeyboard-keyboard-keys akeyboard-numberKeyboard-keys-Enter">Enter</div></div>';

    html += '</div>';

    el.innerHTML = html;
  }

  inputOn(inputEle, type, fn, customClick) {
    if (typeof inputEle !== 'string') {
      console.error('aKeyboard: The inputEle parameter needs to be a string <In "aKeyboard.inputOn()">');
      return;
    }

    if (typeof type !== 'string') {
      console.error('aKeyboard: The type parameter needs to be a string <In "aKeyboard.inputOn()">');
      return;
    }

    const inputEl = document.querySelector(inputEle),
      elKeysEl = document.querySelectorAll(this.obj.el + ' .akeyboard-keyboard-keys');

    for (let i = 0; i < elKeysEl.length; i++) {
      if (elKeysEl[i].innerHTML === 'Delete') {
        elKeysEl[i].onclick = function() {
          inputEl[type] = inputEl[type].substr(0, inputEl[type].length - 1);
          fn('Delete', inputEl[type]);
        };
        continue;
      }

      if (elKeysEl[i].innerHTML === 'Enter') {
        elKeysEl[i].onclick = function() {
          inputEl[type] += '\n';
          fn('Enter', inputEl[type]);
        };
        continue;
      }

      if (customClick && typeof customClick === 'object' && Object.keys(customClick).length > 0 && customClick[elKeysEl[i].innerHTML]) {
        elKeysEl[i].onclick = customClick[elKeysEl[i].innerHTML];
      } else {
        elKeysEl[i].onclick = function() {
          inputEl[type] += this.innerText;
          fn(this.innerText, inputEl[type]);
        };
      }
    }
  }

  onclick(btn, fn) {
    if (typeof btn !== 'string') {
      console.error('aKeyboard: The btn parameter needs to be a string <In "aKeyboard.onclick()">');
      return;
    }

    if (typeof fn !== 'function') {
      console.error('aKeyboard: The fn parameter needs to be a function <In "aKeyboard.onclick()">');
      return;
    }

    let elKeysEl = document.querySelector(this.obj.el + ' .akeyboard-keyboard-keys-' + btn);
    if (elKeysEl) elKeysEl.onclick = fn;
    else console.error('Can not find key: ' + btn);
  }
}
