export default {
  data () {
    return {
      slotList: {},
    }
  },
  mounted () {
    setTimeout(() => this.getSlotList())
  },
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
    getSlotList () {
      this.slotList = {};
      Object.keys(this.$slots).forEach(ele => {
        this.slotList[ele] = true
      })
    }
  }
}