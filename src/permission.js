import router from './router/router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/util/auth'
import {
  vaildUtil
} from '@/util/yun';
import {
  setTitle
} from '@/util/util';
import {
  validatenull
} from '@/util/validate';
import {
  asyncRouterMap
} from '@/router/router'
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration
function hasPermission(roles, permissionRoles) {
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const lockPage = store.getters.website.lockPage;
router.addRoutes(asyncRouterMap); // 动态添加可访问路由表
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar

  if (store.getters.token) { // determine if there has token
    /* has token*/
    if (store.getters.isLock && to.path != lockPage) {
      next({
        path: lockPage
      })
      NProgress.done();
    } else if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.roles
          next({ ...to,
            replace: true
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({
              path: '/login'
            })
            NProgress.done();
          })
        })
      } else {
        let flag = true;
        const whiteList = store.getters.website.whiteList
        for (let i = 0; i < whiteList.length; i++) {
          if (new RegExp("^" + whiteList[i].toString() + ".*", "g").test(to.path)) {
            flag = false;
            break;
          }
        }
        if (flag) {
          const value = to.query.src ? to.query.src : to.path;
          const label = to.query.name ? to.query.name : to.name;
          store.commit('ADD_TAG', {
            label: label,
            value: value,
            query: to.query
          });
        }
        next()
      }
    }
  } else {
    /* has no token*/
    let flag = true;
    const whiteList = store.getters.website.whiteList
    for (let i = 0; i < whiteList.length; i++) {
      if (new RegExp("^" + whiteList[i].toString() + ".*", "g").test(to.path)) {
        flag = false;
        break;
      }
    }
    if (!flag) {
      next()
    } else {
      next('/login')
      NProgress.done();
    }
  }
})

//寻找子菜单的父类
function findMenuParent(tag) {
  let tagCurrent = [];
  const menu = store.getters.menu;
  tagCurrent.push(tag);
  return tagCurrent;
  // //如果是一级菜单直接返回
  // for (let i = 0, j = menu.length; i < j; i++) {
  //     if (menu[i].href == tag.value) {
  //         tagCurrent.push(tag);
  //         return tagCurrent;
  //     }
  // }

  // let currentPathObj = menu.filter(item => {
  //     if (item.children.length == 1) {
  //         return item.children[0].href === tag.value;
  //     } else {
  //         let i = 0;
  //         let childArr = item.children;
  //         let len = childArr.length;
  //         while (i < len) {
  //             if (childArr[i].href === tag.value) {
  //                 return true;
  //                 break;
  //             }
  //             i++;
  //         }
  //         return false;
  //     }
  // })[0];
  // tagCurrent.push({
  //     label: currentPathObj.label,
  //     value: currentPathObj.href
  // });
  // tagCurrent.push(tag);
  // return tagCurrent;

}
router.afterEach((to, from) => {
  NProgress.done();
  setTimeout(() => {
    const tag = store.getters.tag;
    setTitle(tag.label);
    store.commit('SET_TAG_CURRENT', findMenuParent(tag));
    //百度统计代码
    var _hmt = _hmt || [];
    (function () {
      //每次执行前，先移除上次插入的代码
      document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?23c7f40fa073fadc2a7f8bfe079fd17f";
      hm.id = "baidu_tj"
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-105756702-2');
  }, 0);
})
