import bem from 'utils/bem';
import { KEY_COMPONENT_NAME } from 'global/variable';
import { defineComponent } from 'vue'
export default function (sfc) {
  sfc.name = KEY_COMPONENT_NAME + (sfc.name || '');
  sfc.mixins = sfc.mixins || [];
  sfc.mixins.push(bem);
  return defineComponent(sfc);
}
