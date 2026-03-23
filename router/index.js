import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
import routes from './routes'
import store from '@/store'  // 导入 store

let oringinPush = VueRouter.prototype.push
let oringinReplace = VueRouter.prototype.replace
//重写push和replace方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call || apply 都可以调用函数，并且可以指定函数的this指向
        //不同点：call传递参数用逗号隔开，apply传递参数用数组
        oringinPush.call(this, location, resolve, reject)
    } else {
        oringinPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        oringinReplace.call(this, location, resolve, reject)
    } else {
        oringinReplace.call(this, location, () => { }, () => { })
    }
}
//创建并暴露一个路由器
let router = new VueRouter({
    routes: routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosion) {
        //返回的这个y=e，代表的滚动条在最上方
        return { y: 0 };
    },
});
// 全局路由守卫
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;  // 修复：从 userInfo 中取 name

    if (token) {
        // 已登录用户禁止访问登录/注册页
        if (to.path === '/login' || to.path === '/register') {
            next('/home');
        } else {
            // 已登录，检查是否有用户信息
            if (name) {
                next();  // 有用户信息，直接放行
            } else {
                try {
                    // 无用户信息，先获取再放行
                    await store.dispatch('getUserInfo');
                    next();  // 修复：获取成功后必须调用 next()
                } catch (error) {
                    // token 失效，清除后重新登录
                    await store.dispatch('logout');
                    next('/login');
                }
            }
        }
    } else {
        // 未登录：白名单页面可以访问，其他跳转到登录页
        let whiteList = ['/login', '/register', '/home', '/search', '/detail'];
        if (whiteList.some(path => to.path.includes(path) || to.path === '/')) {
            next();
        } else {
            next('/login');
        }
    }
})
//配置路由
export default router
