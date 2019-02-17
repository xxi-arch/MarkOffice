import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    count: 1,                //test   
    sysInfo:{
        oemFootInfo:'©2018 OA办公自动化系统',
        oemLoginHelp:`<p>碰到任何问题，请及时联系：<br> 管理员(xxxx，<span class="redfnt">0571-88881232</span>)</p>`,
        oemBannerTitle:`<h1>OA</h1><span>办公自动化系统</span>`,   //登录后xx
    },
    isLogin: false,           //是否登录
    userInfo: {               //后端返回
        username: "admin",     
        user_name: "管理员",    
        user_mobile: "1",
        role_name: "管理员",
        functions: "user_manage,role_manage",        
    },

    pageInfo: {
        isShowToHome: false,    //是否显示返回首页的按钮
        isShowCrumb: true,   //是否显示面包屑 
        crumbName: '标题1',           //面包屑和页面标题 
    },
    pagination:{
        pagerow : 10   ,   // 每页行数 
        pageno  :1      ,  // 初始页码
    },
    dic:[],
}

const store = new Vuex.Store({
    state,
    mutations: {
        increment(state) {
            state.count++
        },
        updateUserInfo(state, user_info) { 
            state.userInfo = user_info
        },
        updateDicInfo(state, dic) {
            state.dic = dic
        },
        updatePageInfo(state, page_info) {
            state.pageInfo.isShowToHome = page_info.isShowToHome
            state.pageInfo.isShowCrumb = page_info.isShowCrumb
            state.pageInfo.crumbName = page_info.crumbName
        },
        login(state, is_login) {
            state.isLogin = is_login
        }
    }
})

export default store