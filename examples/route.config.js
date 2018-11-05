import navConfig from './nav.config.json';
const loadDocs = function(path) {
    return r => require.ensure([], () =>
        r(require(`./docs${path}.md`)),
        'group');
};
const load = function(name) {
    return r => require.ensure([], () =>
        r(require(`./pages/${name}.vue`)),
        'group');
};

const registerRoute = (navConfig) => {
    const route = [];
    let navs = navConfig;
    route.push({
        path: '/component',
        redirect: '/component/installation',
        component: load('component'),
        children: []
    }, {
        path: '/about',
        component: load('about'),
        children: []
    }, {
        path: '/',
        component: load('index'),
        children: []
    });
    navs.forEach(nav => {
        if (nav.href) return;
        if (nav.groups) {
            nav.groups.forEach(group => {
                group.list.forEach(nav => {
                    addRoute(nav);
                });
            });
        } else if (nav.children) {
            nav.children.forEach(nav => {
                addRoute(nav);
            });
        } else {
            addRoute(nav);
        }
    });

    function addRoute(page) {
        const component = loadDocs(page.path);
        let child = {
            path: page.path.slice(1),
            meta: {
                title: page.title || page.name,
                description: page.description
            },
            name: 'component-' + (page.title || page.name),
            component: component.default || component
        };

        route[0].children.push(child);
    };
    return route;
};

let route = registerRoute(navConfig);



export default route;