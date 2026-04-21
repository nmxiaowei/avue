/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';

var script = create({
  name: "input-color",
  mixins: [props(), event()],
  props: {
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    colorFormat: String,
    predefineColors: {
      type: Array,
      default: () => {
        return [
          "#ff4500",
          "#ff8c00",
          "#ffd700",
          "#90ee90",
          "#00ced1",
          "#1e90ff",
          "#c71585",
          "rgba(255, 69, 0, 0.68)",
          "rgb(255, 120, 0)",
          "hsv(51, 100, 98)",
          "hsva(120, 40, 94, 0.5)",
          "hsl(181, 100%, 37%)",
          "hsla(209, 100%, 56%, 0.73)"
        ]
      }
    },
    showAlpha: {
      type: Boolean,
      default: true
    }
  }
});

export { script as default };
