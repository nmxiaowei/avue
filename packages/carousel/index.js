import Carousel from './src/main';

Carousel.install = function(Vue) {
    Vue.component(Carousel.name, Carousel);
};

export default Carousel;