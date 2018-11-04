<template>
  <span class="json-tree"
        :class="{'json-tree-root': parsed.depth === 0}">
    <span class="json-tree-row"
          v-if="parsed.primitive"
          @mouseover="hovered = true"
          @mouseout="hovered = false">
      <span class="json-tree-indent"
            v-for="n in (parsed.depth * 2 + 3)"
            :key="n">&nbsp;</span>
      <span class="json-tree-key"
            v-if="parsed.key">{{ parsed.key }}</span>
      <span class="json-tree-colon"
            v-if="parsed.key">:&nbsp;</span>
      <span class="json-tree-value"
            :class="'json-tree-value-' + parsed.type"
            :title="`${parsed.value}`">{{ `${parsed.value}` }}</span>
      <span class="json-tree-comma"
            v-if="!parsed.last">,</span>
      <span class="json-tree-indent">&nbsp;</span>
    </span>
    <span class="json-tree-deep"
          v-if="!parsed.primitive">
      <span class="json-tree-row json-tree-expando"
            @mouseover="hovered = true"
            @mouseout="hovered = false">
        <span class="json-tree-indent">&nbsp;</span>
        <span class="json-tree-sign"
              @click="expanded = !expanded">{{ expanded ? '-' : '+' }}</span>
        <span class="json-tree-indent"
              v-for="n in (parsed.depth * 2 + 1)"
              :key="n">&nbsp;</span>
        <span class="json-tree-key"
              v-if="parsed.key">{{ parsed.key }}</span>
        <span class="json-tree-colon"
              v-if="parsed.key">:&nbsp;</span>

        <span class="json-tree-open">{{ parsed.type === 'array' ? '[' : '{' }}</span>
        <span class="json-tree-collapsed"
              v-show="!expanded">&nbsp;/*&nbsp;{{ format(parsed.value.length) }}&nbsp;*/&nbsp;</span>
        <span class="json-tree-close"
              v-show="!expanded">{{ parsed.type === 'array' ? ']' : '}' }}</span>
        <span class="json-tree-comma"
              v-show="!expanded && !parsed.last">,</span>
        <span class="json-tree-indent">&nbsp;</span>
      </span>
      <span class="json-tree-deeper"
            v-show="expanded">
        <avue-json-tree v-for="(item, index) in parsed.value"
                        :key="index"
                        :data="data"
                        :kv="item"
                        :level="level"></avue-json-tree>
      </span>
      <span class="json-tree-row"
            v-show="expanded">
        <span class="json-tree-ending"
              :class="{'json-tree-paired': hovered}">
          <span class="json-tree-indent"
                v-for="n in (parsed.depth * 2 + 3)"
                :key="n">&nbsp;</span>
          <span class="json-tree-close">{{ parsed.type === 'array' ? ']' : '}' }}</span>
          <span class="json-tree-comma"
                v-if="!parsed.last">,</span>
          <span class="json-tree-indent">&nbsp;</span>
        </span>
      </span>
    </span>
  </span>
</template>

<script>
function parse (data, depth = 0, last = true, key = undefined, parent = [], isArray = false, index = -1) {
  let kv = { depth, last, primitive: true, key: JSON.stringify(key), parent, isArray, index }
  if (typeof data !== 'object') {
    return Object.assign(kv, { type: typeof data, value: JSON.stringify(data) })
  } else if (data === null) {
    return Object.assign(kv, { type: 'null', value: 'null' })
  } else if (Array.isArray(data)) {
    let value = data.map((item, index) => {
      key ? parent.push(key) : ''
      parent.push(index);
      return parse(item, depth + 1, index === data.length - 1, undefined, [...parent], true, index)
    })
    return Object.assign(kv, { primitive: false, type: 'array', value })
  } else {
    let keys = Object.keys(data)
    key ? parent.push(key) : ''
    let value = keys.map((item, index) => {
      return parse(data[item], depth + 1, index === keys.length - 1, item, [...parent], isArray, index)
    })
    return Object.assign(kv, { primitive: false, type: 'object', value })
  }
}

import create from '../../utils/create';
export default create({
  name: 'json-tree',

  props: {
    level: {
      type: Number,
      default: Infinity
    },
    kv: {
      type: Object
    },
    raw: {
      type: Object
    },
    data: {}
  },

  data () {
    return {
      expanded: true,
      hovered: false,
      list: {},
    }
  },

  computed: {
    parsed () {
      if (this.kv) {
        return this.kv
      }
      let result
      try {
        if (this.raw) {
          result = JSON.parse(this.raw);
        } else if (typeof this.data !== 'undefined') {
          result = this.data
        } else {
          result = '[Vue JSON Tree] No data passed.'
          console.warn(result)
        }

      } catch (e) {
        result = '[Vue JSON Tree] Invalid raw JSON.'
        console.warn(result)
      } finally {
        return parse(result)
      }
    }
  },

  methods: {
    format (n) {
      if (n > 1) return `${n} items`
      return n ? '1 item' : 'no items'
    }
  },

  created () {
    this.list = this.data;
    this.expanded = this.parsed.depth < this.level
  }
})
</script>
