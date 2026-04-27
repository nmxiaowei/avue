import bem from 'utils/bem';
import { KEY_COMPONENT_NAME } from 'global/variable';

type SfcComponent = {
  name: string;
  mixins?: any[];
  [key: string]: any;
};

export default function create<S extends SfcComponent>(sfc: S): S {
  sfc.name = KEY_COMPONENT_NAME + sfc.name;
  sfc.mixins = sfc.mixins || [];
  sfc.mixins.push(bem);

  return sfc;
}
