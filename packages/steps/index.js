import Steps from './src/main';

Steps.install = function(Vue) {
    Vue.component(Steps.name, Steps);
};

export default Steps;