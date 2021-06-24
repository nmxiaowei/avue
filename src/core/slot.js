export default {
  methods: {
    getSlotName (item = {}, type = 'D', slot) {
      let result = {
        F: 'Form',
        H: 'Header',
        E: 'Error',
        L: 'Label',
        S: 'Search',
        T: 'Type',
        D: ''
      }
      let name = (item.prop + result[type]).toLowerCase()
      if (slot) return slot[name]
      return name
    },
    getSlotList (list = [], slot) {
      return Object.keys(slot).filter(ele => {
        let result = false;
        list.forEach(name => {
          if (ele.includes(name.toLowerCase())) result = true;
        })
        return result;
      })
    }
  }
}