import DataProgress from './src/data-progress.vue';

DataProgress.install = function(Vue) {
    Vue.component(DataProgress.name, DataProgress);
};

export default DataProgress;