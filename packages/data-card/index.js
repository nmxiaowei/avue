import DataCard from './src/data-card.vue';

DataCard.install = function(Vue) {
  Vue.component(DataCard.name, DataCard);
};

export default DataCard;
