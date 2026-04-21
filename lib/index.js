const mod = require('./src/index.js');
const value = mod && Object.prototype.hasOwnProperty.call(mod, 'default') ? mod.default : mod;
module.exports = value;
module.exports.default = value;
if (mod && typeof mod === 'object') {
  Object.keys(mod).forEach((key) => {
    if (key !== 'default' && key !== '__esModule') {
      module.exports[key] = mod[key];
    }
  });
}
