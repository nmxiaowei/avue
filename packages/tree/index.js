import Tree from './src/main';

Tree.install = function(Vue) {
    Vue.component(Tree.name, Tree);
};

export default Tree;