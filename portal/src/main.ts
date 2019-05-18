import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/main.css'
import './assets/iconfont.js'
import moment from 'moment'
import ajax from '@/components/util/ajax'
import util from '@/components/util/util'
// import VModal from 'vue-js-modal'


// Vue.use(VModal,{dialog : true })
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false

/**
 * alert错误信息
 */
Vue.prototype.alertError = function (info: string) {
    this.$Message.info({
        content: info,
        duration: 5,
        closable: true
    });
}
/**
 * 判断是否包含某权限
 */
Vue.prototype.isExistFunction = function ( ...params:string[] ) {
    for (let n = 0; n < params.length; n++) {
        const element = params[n];
        let fun = this.$store.state.userInfo.functions
        if (fun.indexOf(element) != -1) {
            return true
        }
    }
    return false;
}
/**
 * 用于模板中统一的日期时间格式化
 */
Vue.prototype.dataFormat = function (params: string,type:string) {
    if (params) {
        switch (type) {
            case 'day':
                return moment(params).format('YYYY-MM-DD')
            case 'time':
                return moment(params).format('YYYY-MM-DD HH:mm:ss')
            default:
                // return moment(params).format('YYYY-MM-DD HH:mm:ss')
                return moment(params).format('YYYY-MM-DD')
        }
    } else {
        return ''
    }
}


/**
 * 全局实例化类
 */
Vue.prototype.ajax = new ajax();
Vue.prototype.util = new util();
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
