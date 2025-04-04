export default {
  props: {
    render: Function,
    row: Object,
    index: [String, Number],
    column: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dic: {
      type: Array,
      default: () => {
        return []
      }
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    },
    event: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  render() {
    return this.render.call(this, {
      column: this.column,
      dic:this.dic,
      params: this.params,
      event: this.event,
      row: this.row,
      index: this.index
    })
  }
}
