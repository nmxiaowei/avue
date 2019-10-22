class Keyboard {
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

    let html = '<div class="akeyboard-keyboard' + (obj.fixedBottomCenter ? ' akeyboard-keyboard-fixedBottomCenter' : '') + '" style="' + keyboardStyle + '">';

    // init keys
    let numberKeys = [];
    for (let i = 1; i < 10; i++) {
      numberKeys.push(i.toString());
    }
    numberKeys.push('0');

    const keys = [
      ['`'].concat(numberKeys).concat([
        '-', '=', 'Delete'
      ]),
      ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
      ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
      ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
      ['Space']
    ];

    let thisKeys;
    const shiftKey = [],
      capsKey = [];
    for (let i = 0; i < keys.length; i++) {
      shiftKey.push([]);
      capsKey.push([]);
      thisKeys = keys[i];
      for (let a = 0; a < thisKeys.length; a++) {
        if (thisKeys[a].length === 1) {
          capsKey[i].push(thisKeys[a].toUpperCase());
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
        capsKey[i].push(thisKeys[a]);
      }
    }

    for (let i = 0; i < keys.length; i++) {
      thisKeys = keys[i];
      html += '<div class="akeyboard-keyboard-innerKeys">';
      for (let a = 0; a < thisKeys.length; a++) {
        html += '<div class="akeyboard-keyboard-keys akeyboard-keyboard-keys-' + thisKeys[a] + '">' + thisKeys[a] + '</div>';
      }
      html += '</div>';
    }

    html += '</div>';

    el.innerHTML = html;

    // bind the shift and caps key
    const elKeysEl = document.querySelectorAll(obj.el + ' .akeyboard-keyboard-keys-Shift');

    function shiftKeyClickFn() {
      if (!this.isShift) {
        if (document.querySelector(obj.el + ' .akeyboard-keyboard-keys-Caps').isCaps) {
          return;
        }

        // shift
        elKeysEl[0].isShift = true;
        elKeysEl[1].isShift = true;
        elKeysEl[0].innerHTML = 'SHIFT';
        elKeysEl[1].innerHTML = 'SHIFT';

        const keysInnerEl = document.querySelectorAll(obj.el + ' .akeyboard-keyboard-innerKeys');

        let thisEl;
        for (let i = 0; i < keysInnerEl.length; i++) {
          thisEl = keysInnerEl[i];
          for (let a = 0; a < thisEl.childNodes.length; a++) {
            if (shiftKey[i][a] === 'Shift') {
              continue;
            }
            thisEl.childNodes[a].innerHTML = shiftKey[i][a];
          }
        }

        return;
      }
      elKeysEl[0].isShift = false;
      elKeysEl[1].isShift = false;
      elKeysEl[0].innerHTML = 'Shift';
      elKeysEl[1].innerHTML = 'Shift';

      const keysInnerEl = document.querySelectorAll(obj.el + ' .akeyboard-keyboard-innerKeys');

      let thisEl;
      for (let i = 0; i < keysInnerEl.length; i++) {
        thisEl = keysInnerEl[i];
        for (let a = 0; a < thisEl.childNodes.length; a++) {
          thisEl.childNodes[a].innerHTML = keys[i][a];
        }
      }
    }

    elKeysEl[0].onclick = shiftKeyClickFn;
    elKeysEl[0].isShift = false;

    elKeysEl[1].onclick = shiftKeyClickFn;
    elKeysEl[1].isShift = false;

    const elCapsEl = document.querySelector(obj.el + ' .akeyboard-keyboard-keys-Caps');

    elCapsEl.onclick = function() {
      if (!this.isCaps) {
        if (document.querySelector(obj.el + ' .akeyboard-keyboard-keys-Shift').isShift) {
          return;
        }

        // caps
        this.isCaps = true;
        this.classList.add('keyboard-keyboard-keys-focus');

        const keysInnerEl = document.querySelectorAll(obj.el + ' .akeyboard-keyboard-innerKeys');

        let thisEl;
        for (let i = 0; i < keysInnerEl.length; i++) {
          thisEl = keysInnerEl[i];
          for (let a = 0; a < thisEl.childNodes.length; a++) {
            thisEl.childNodes[a].innerHTML = capsKey[i][a];
          }
        }

        return;
      }

      this.isCaps = false;
      this.classList.remove('keyboard-keyboard-keys-focus');

      const keysInnerEl = document.querySelectorAll(obj.el + ' .akeyboard-keyboard-innerKeys');

      let thisEl;
      for (let i = 0; i < keysInnerEl.length; i++) {
        thisEl = keysInnerEl[i];
        for (let a = 0; a < thisEl.childNodes.length; a++) {
          thisEl.childNodes[a].innerHTML = keys[i][a];
        }
      }
    };

    elCapsEl.isCaps = false;
  }

  inputOn(inputEle, type, fn) {
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
      if (elKeysEl[i].innerHTML === 'Shift' || elKeysEl[i].innerHTML === 'Caps') {
        continue;
      }

      if (elKeysEl[i].innerHTML === 'Delete') {
        elKeysEl[i].onclick = function() {
          inputEl[type] = inputEl[type].substr(0, inputEl[type].length - 1);
          fn('Delete');
        };
        continue;
      }

      if (elKeysEl[i].innerHTML === 'Tab') {
        elKeysEl[i].onclick = function() {
          inputEl[type] += '  ';
          fn('Tab');
        };
        continue;
      }

      if (elKeysEl[i].innerHTML === 'Enter') {
        elKeysEl[i].onclick = function() {
          inputEl[type] += '\n';
          fn('Enter');
        };
        continue;
      }

      if (elKeysEl[i].innerHTML === 'Space') {
        elKeysEl[i].onclick = function() {
          inputEl[type] += ' ';
          fn('Space');
        };
        continue;
      }

      elKeysEl[i].onclick = function() {
        inputEl[type] += this.innerText;
        fn(this.innerText);
      };
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

    elKeysEl.onclick = fn;
  }
}

module.exports = Keyboard;
