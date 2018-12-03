import bem from 'utils/bem';
export default function(sfc) {
  sfc.name = 'avue-' + sfc.name;
  sfc.mixins = sfc.mixins || [];
  sfc.mixins.push(bem);
  return sfc;
}
