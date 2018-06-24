import TableTree from './src/main';

/* istanbul ignore next */
TableTree.install = function(Vue) {
    Vue.component(TableTree.name, TableTree);
};

export default TableTree;