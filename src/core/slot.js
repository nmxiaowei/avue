export default {
  data () {
    return {
      slotList: {},
      slotReload: false
    }
  },
  mounted () {
    this.getSlotList()
    setTimeout(() => this.slotReload = true)
  },
  methods: {
    getSlotName (item = {}, type = 'D') {
      let result = {
        F: 'Form',
        H: 'Header',
        E: 'Error',
        L: 'Label',
        S: 'Search',
        T: 'Type',
        D: ''
      }
      return item.prop + result[type]
    },
    getSlotList () {
      this.slotList = {};
      Object.keys(this.$scopedSlots).forEach(ele => {
        this.$set(this.slotList, ele, true);
      })
    }
  }
}