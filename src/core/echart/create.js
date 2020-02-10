import create from '../create';
import common from './common';
import { KEY_ECHART_NAME } from 'global/variable';
export default function(sfc) {
  sfc.name = KEY_ECHART_NAME + sfc.name;
  sfc.mixins = sfc.mixins || [];
  sfc.mixins.push(common);
  return create(sfc);
}
