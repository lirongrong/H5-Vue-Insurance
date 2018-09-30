import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import MuseUI from 'muse-ui'
import VeeValidate from 'vee-validate'  
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import Validator from './utils/validator';
import 'muse-ui/dist/muse-ui.css'
import './assets/common.css'
import './assets/iconfont.css'
import * as filters from './utils/filters'
import toast from './components/toast/index' 
//import {toast} from './utils/ui'

Vue.use(MuseUI);
Vue.use(VueRouter);
Vue.use(toast);
const router = new VueRouter({
  routes
})

Validator.addLocale(zh_CN);
Vue.use(VeeValidate,{
  locale:'zh_CN'
});

// 遍历所有导出的过滤器并添加到全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

//Vue.prototype.$toast = toast; 
console.log(typeof(Vue));
console.dir(Vue);
