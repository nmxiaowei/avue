/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';

var script = create({
  name: "radio",
  mixins: [props(), event()],
  data () {
    return {
      name: 'radio',
    };
  },
  props: {
    modelValue: {}
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
});

export { script as default };
