export default {
  methods: {
    getSlotName (item = {}, type = 'D', slot) {
      let result = {
        F: '-form',
        H: '-header',
        E: '-error',
        L: '-label',
        S: '-search',
        T: '-type',
        D: ''
      }
      let name = (item.prop + result[type])
      if (slot) return slot[name]
      return name
    },
    getSlotList (list = [], slot, propList) {
      propList = propList.map(ele => ele.prop)
      return Object.keys(slot).filter(ele => {
        let result = false;
        if (!propList.includes(ele)) {
          list.forEach(name => {
            if (ele.includes(name)) result = true;
          })
        }
        return result;
      })
    }
  }
}