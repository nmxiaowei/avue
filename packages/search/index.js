import Search from './src/main';

Search.install = function (Vue) {
  Vue.component(Search.name, Search);
};

export default Search;