/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';

var script = create({
  name: 'title',
  mixins: [props(), event()],
  props: {
    styles: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted () {

  },
  methods: {

  }
});

export { script as default };
