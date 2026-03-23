// 路由懒加载：需要时才加载组件（首屏优化）
const Home = () => import('@/pages/Home/Home.vue')
const Search = () => import('@/pages/Search/Search.vue')
const Login = () => import('@/pages/Login/Login.vue')
const Register = () => import('@/pages/Register/Register.vue')
const Detail = () => import('@/pages/Detail/index.vue')
const AddCartSuccess = () => import('@/pages/AddCartSuccess/index.vue')
const Shopcart = () => import('@/pages/Shopcart/index.vue')
const Trade = () => import('@/pages/Trade/index.vue')
const Pay = () => import('@/pages/Pay/index.vue')
const PaySuccess = () => import('@/pages/PaySuccess/index.vue')
const Center = () => import('@/pages/Center/index.vue')
const GroupOrder = () => import('@/pages/Center/groupOrder/index.vue')
const MyOrder = () => import('@/pages/Center/myOrder/index.vue')

export default
    [
        {
            path: '/',
            redirect: '/home',
            meta: {
                show: true
            }
        },
        {
            path: '/detail/:id',
            component: Detail,
            name: 'detail',
            meta: {
                show: true
            }
        },
        {
            path: '/center',
            component: Center,
            name: 'center',
            redirect: '/center/myOrder',
            children: [
                {
                    path: '/center/groupOrder',
                    component: GroupOrder,
                    name: 'groupOrder',
                    meta: {
                        show: true
                    }
                },
                {
                    path: '/center/myOrder',
                    component: MyOrder,
                    name: 'myOrder',
                    meta: {
                        show: true
                    }
                },
            ],
            meta: {
                show: true
            }
        },
        {
            path: '/paySuccess',
            component: PaySuccess,
            name: 'paySuccess',
            meta: {
                show: true
            }
        },
        {
            path: '/pay',
            component: Pay,
            name: 'pay',
            meta: {
                show: true
            }
        },
        {
            path: '/trade',
            component: Trade,
            name: 'trade',
            meta: {
                show: true
            },
            beforeEnter: (to, from, next) => {
                if (from.path == '/shopcart') {
                    next()
                } else {
                    next('/login')
                }
            }
        },
        {
            path: '/addCartSuccess/:num',
            component: AddCartSuccess,
            name: 'addCartSuccess',
            meta: {
                show: true
            }
        },
        {
            path: '/shopcart',
            component: Shopcart,
            name: 'shopcart',
            meta: {
                show: true
            },
        },
        {
            path: '/home',
            component: Home,
            name: 'home',
            meta: {
                show: true
            }
        },
        {
            path: '/search/:keyword?',
            component: Search,
            name: 'search',
            meta: {
                show: true
            },
            //1.布尔值模式,只能传递params参数
            //props: true
            //2.对象模式：
            // props: { keyword: 'keyword' }
            //3.函数模式，可传递params参数和query参数
            props: (route) => ({ keyword: route.params.keyword, v: route.query.v })
            //#endregion

        },
        {
            path: '/login',
            component: Login,
            name: 'login',
            meta: {
                show: false
            }
        },
        {
            path: '/register',
            component: Register,
            name: 'register',
            meta: {
                show: false
            }
        }
    ]
