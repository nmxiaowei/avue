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
      params: this.params,
      event: this.event,
      row: this.row,
      index: this.index
    })
  }
}
