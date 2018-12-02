/**
 * Create a basic component with common options
 */

import bem from '../mixins/bem';
const install = function(Vue) {
    Vue.component(this.name, this);
};

export default function(sfc) {
    sfc.name = 'avue-' + sfc.name;
    sfc.install = sfc.install || install;
    sfc.mixins = sfc.mixins || [];
    sfc.mixins.push(bem);
    return sfc;
}