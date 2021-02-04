export default {
  data () {
    return {
      slotList: {}
    }
  },
  mounted () {
    this.getSlotList()
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
      Object.keys(this.$scopedSlots).forEach(ele => {
        this.$set(this.slotList, ele, true);
      })
    }
  }
}