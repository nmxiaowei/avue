type LogType = 'default' | 'primary' | 'success' | 'warning' | 'danger';
type ColorfulText = { text?: string; type?: LogType };

const log: Record<string, any> = {};

function typeColor(type: LogType = 'default') {
  let color = '';
  switch (type) {
    case 'default':
      color = '#35495E';
      break;
    case 'primary':
      color = '#3488ff';
      break;
    case 'success':
      color = '#43B883';
      break;
    case 'warning':
      color = '#e6a23c';
      break;
    case 'danger':
      color = '#f56c6c';
      break;
    default:
      break;
  }
  return color;
}

log.capsule = function (title: string, info: string, type: LogType = 'primary') {
  console.log(
    `%c ${title} %c ${info} %c`,
    'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    `background:${typeColor(type)}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
    'background:transparent'
  );
};

log.colorful = function (textArr: ColorfulText[]) {
  console.log(
    `%c${textArr.map((t) => t.text || '').join('%c')}`,
    ...textArr.map((t) => `color: ${typeColor(t.type)};`)
  );
};

log.default = function (text: string) {
  log.colorful([{ text }]);
};

log.primary = function (text: string) {
  log.colorful([{ text, type: 'primary' }]);
};

log.success = function (text: string) {
  log.colorful([{ text, type: 'success' }]);
};

log.warning = function (text: string) {
  log.colorful([{ text, type: 'warning' }]);
};

log.danger = function (text: string) {
  log.colorful([{ text, type: 'danger' }]);
};

export default log;
