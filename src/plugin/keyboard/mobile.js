export default class MobileKeyboard {
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

    let html = '<div class="akeyboard-mobileKeyboard' + (obj.fixedBottomCenter ? ' akeyboard-keyboard-fixedBottomCenter' : '') + '" style="' + keyboardStyle + '">';

    //init keys
    let numberKeys = [];
    for (let i = 1; i < 10; i++) {
      numberKeys.push(i.toString());
    }
    numberKeys.push('0');

    const keys = obj.keys || [
      ['`'].concat(numberKeys).concat([
        '-', '='
      ]),
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
      ['⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '⇦'],
      ['Space', 'Enter']
    ]

    let thisKeys;
    const shiftKey = []
    for (let i = 0; i < keys.length; i++) {
      shiftKey.push([]);
      thisKeys = keys[i];
      for (let a = 0; a < thisKeys.length; a++) {
        if (thisKeys[a].length === 1) {
          switch (thisKeys[a]) {
            case '`':
              shiftKey[i].push('~');
              continue;
            case '1':
              shiftKey[i].push('!');
              continue;
            case '2':
              shiftKey[i].push('@');
              continue;
            case '3':
              shiftKey[i].push('#');
              continue;
            case '4':
              shiftKey[i].push('$');
              continue;
            case '5':
              shiftKey[i].push('%');
              continue;
            case '6':
              shiftKey[i].push('^');
              continue;
            case '7':
              shiftKey[i].push('&');
              continue;
            case '8':
              shiftKey[i].push('*');
              continue;
            case '9':
              shiftKey[i].push('(');
              continue;
            case '0':
              shiftKey[i].push(')');
              continue;
            case '-':
              shiftKey[i].push('_');
              continue;
            case '=':
              shiftKey[i].push('+');
              continue;
            case '[':
              shiftKey[i].push('{');
              continue;
            case ']':
              shiftKey[i].push('}');
              continue;
            case '\\':
              shiftKey[i].push('|');
              continue;
            case ';':
              shiftKey[i].push(':');
              continue;
            case '\'':
              shiftKey[i].push('"');
              continue;
            case ',':
              shiftKey[i].push('<');
              continue;
            case '.':
              shiftKey[i].push('>');
              continue;
            case '/':
              shiftKey[i].push('?');
              continue;
          }
          shiftKey[i].push(thisKeys[a].toUpperCase());
          continue;
        }
        shiftKey[i].push(thisKeys[a]);
      }
    }

    for (let i = 0; i < keys.length; i++) {
      thisKeys = keys[i];
      html += '<div class="akeyboard-keyboard-innerKeys">';
      for (let a = 0; a < thisKeys.length; a++) {
        html += '<div class="akeyboard-mobileKeyboard-keys akeyboard-mobileKeyboard-keys-' + thisKeys[a] + '">' + thisKeys[a] + '</div>';
      }
      html += '</div>';
    }

    html += '</div>';

    el.innerHTML = html;

    let containShift = false
    keys.forEach(key => {
      if (key.includes("Shift") || key.includes("⇧")) {
        containShift = true
        return
      }
    })
    //bind the shift
    if (containShift) {
      const elKeysEl = document.querySelectorAll(obj.el + ' .akeyboard-mobileKeyboard-keys-⇧');

      elKeysEl.forEach(el => {
        el.onclick = function () {
          if (!this.isShift) {
            //shift
            el.classList.add('akeyboard-mobileKeyboard-keys-focus');
            el.isShift = true;

            const keysInnerEl = document.querySelectorAll(obj.el + ' .akeyboard-keyboard-innerKeys');

            let thisEl;
            for (let i = 0; i < keysInnerEl.length; i++) {
              thisEl = keysInnerEl[i];
              for (let a = 0; a < thisEl.childNodes.length; a++) {
                thisEl.childNodes[a].innerHTML = shiftKey[i][a];
              }
            }

            return;
          }
          el.isShift = false;
          el.classList.remove('akeyboard-mobileKeyboard-keys-focus');

          const keysInnerEl = document.querySelectorAll(obj.el + ' .akeyboard-keyboard-innerKeys');

          let thisEl;
          for (let i = 0; i < keysInnerEl.length; i++) {
            thisEl = keysInnerEl[i];
            for (let a = 0; a < thisEl.childNodes.length; a++) {
              thisEl.childNodes[a].innerHTML = keys[i][a];
            }
          }
        }
      })
    }
  }

  inputOn (inputEle, type, fn, customClick) {
    if (typeof inputEle !== 'string') {
      console.error('aKeyboard: The inputEle parameter needs to be a string <In "aKeyboard.inputOn()">');
      return;
    }

    if (typeof type !== 'string') {
      console.error('aKeyboard: The type parameter needs to be a string <In "aKeyboard.inputOn()">');
      return;
    }

    const inputEl = document.querySelector(inputEle),
      elKeysEl = document.querySelectorAll(this.obj.el + ' .akeyboard-mobileKeyboard-keys');

    for (let i = 0; i < elKeysEl.length; i++) {
      switch (elKeysEl[i].innerHTML) {
        case '⇧':
          continue;

        case '⇦':
          elKeysEl[i].onclick = function () {
            inputEl[type] = inputEl[type].substr(0, inputEl[type].length - 1);
            fn('Delete', inputEl[type]);
          }
          continue;

        case 'Enter':
          elKeysEl[i].onclick = function () {
            inputEl[type] += '\n';
            fn('Enter', inputEl[type]);
          }
          continue;

        case 'Space':
          elKeysEl[i].onclick = function () {
            inputEl[type] += ' ';
            fn('Space', inputEl[type]);
          }
          continue;
      }

      if (customClick && typeof customClick == 'object' && Object.keys(customClick).length > 0 && customClick[elKeysEl[i].innerHTML]) {
        elKeysEl[i].onclick = customClick[elKeysEl[i].innerHTML]
      } else {
        elKeysEl[i].onclick = function () {
          inputEl[type] += this.innerText;
          fn(this.innerText, inputEl[type]);
        };
      }
    }
  }

  onclick (btn, fn) {
    if (typeof btn !== 'string') {
      console.error('aKeyboard: The btn parameter needs to be a string <In "aKeyboard.onclick()">');
      return;
    }

    if (typeof fn !== 'function') {
      console.error('aKeyboard: The fn parameter needs to be a function <In "aKeyboard.onclick()">');
      return;
    }
    let elKeysEl = document.querySelector(this.obj.el + ' .akeyboard-mobileKeyboard-keys-' + btn);
    if (elKeysEl) elKeysEl.onclick = fn;
    else console.error("Can not find key: " + btn)
  }
}
