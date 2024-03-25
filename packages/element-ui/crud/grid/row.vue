
<script>
export default {
  name: "row",
  props: {
    row: Object,
    index: Number,
    content: Function,
  },
  render: function (createElement) {
    if (!this.content) return
    return createElement('span', {}, this.content({ row: this.row, $index: this.index }))
  }
}
</script>