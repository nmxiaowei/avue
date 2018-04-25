const _import = require('./_import');
import Layout from '@/page/index/'
export default [{
    path: '/login',
    name: '登录页',
    component: _import('login/index'),
    meta: {
        keepAlive: true,
    }
},
{ path: '/lock', name: '锁屏页', component: _import('lock/index') },
{ path: '*', redirect: '/404', hidden: true },
{ path: '/404', component: _import('error-page/404', 'components'), name: '404' },
{ path: '/403', component: _import('error-page/403', 'components'), name: '403' },
{ path: '/500', component: _import('error-page/500', 'components'), name: '500' },
{
    path: '/',
    name: '主页',
    redirect: '/wel'
},
{
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    children: [
        {
            path: ":routerPath",
            name: 'iframe',
            component: _import('iframe/main', 'components'),
            props: true
        }
    ]

}]