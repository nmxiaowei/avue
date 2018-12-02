import CrudImg from '../crud/src/crud-img';

CrudImg.install = function(Vue) {
    Vue.component(CrudImg.name, CrudImg);
};

export default CrudImg;