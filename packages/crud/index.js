import Crud from './src/main';

Crud.install = function(Vue) {
  Vue.component(Crud.name, Crud);
};

export default Crud;
