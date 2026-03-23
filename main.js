import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//全局组件
import TypeNav from '@/components/TypeNav/index.vue'
import Carousle from '@/components/carousle'
import Pagination from '@/components/pagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousle.name, Carousle)
Vue.component(Pagination.name, Pagination)
//引入store
import store from './store'
import '@/mock/mockServe.js'
import VeeValidate from 'vee-validate'
//使用插件
Vue.use(VeeValidate)
//引入api
import * as API from '@/api'
Vue.prototype.$API = API
//引入懒加载插件
import VueLazyload from 'vue-lazyload';
//使用插件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('@/assets/loading.gif')
});



new Vue({
  render: h => h(App),
  //注册路由组件
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store
}).$mount('#app')
