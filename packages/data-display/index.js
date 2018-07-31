import DataDisplay from './src/data-display.vue';

DataDisplay.install = function(Vue) {
  Vue.component(DataDisplay.name, DataDisplay);
};

export default DataDisplay;
