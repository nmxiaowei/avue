import TableTree from './src/main';

TableTree.install = function(Vue) {
  Vue.component(TableTree.name, TableTree);
};

export default TableTree;
