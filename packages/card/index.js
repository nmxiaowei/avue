import Card from './src/main';

Card.install = function(Vue) {
    Vue.component(Card.name, Card);
};

export default Card;