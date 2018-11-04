import Json from './src/main';

Json.install = function(Vue) {
    Vue.component(Json.name, Json);
};

export default Json;