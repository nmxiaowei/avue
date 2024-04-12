
<script>
export default {
  name: "row",
  props: {
    row: Object,
    column: Object,
    index: Number,
    content: Function,
  },
  render: function (createElement) {
    if (!this.content) return
    return createElement('span', {}, this.content({ row: this.row, $index: this.index, column: this.column }))
  }
}
</script>