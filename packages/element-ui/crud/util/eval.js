export default function treeToArray (safe, data = []) {
  let tmp = []
  data.forEach((item, index) => {
    item['_index'] = index
    tmp.push(item)
    if (item.children && item.children.length > 0) {
      const res = treeToArray(safe, item.children)
      tmp = tmp.concat(res)
    }
  })
  return tmp
}

export function addAttrs (safe, data = [], { parent = null, preIndex = false, level = 1, expandLevel = 0, expand = false, show = true } = {}) {
  data.forEach((item, index) => {
    const _id = (preIndex ? `${preIndex}-${index}` : index) + ''
    item['_id'] = _id;
    item['_level'] = level;
    item['_expand'] = (function () {
      if (expand) return true;
      else if (expandLevel !== 0 && level < expandLevel) {
        return true;
      } else {
        return false;
      }
    })();
    item['_parent'] = parent;
    item['_show'] = show;
    if (item.children && item.children.length > 0) {
      addAttrs(safe, item.children, {
        parent: item,
        level: level + 1,
        expand,
        expandLevel: expandLevel,
        preIndex: _id,
        status
      })
    }
  })
}