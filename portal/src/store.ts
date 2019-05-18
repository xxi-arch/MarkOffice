import Vue from 'vue'
import Vuex from 'vuex'

// import ajax from './components/util/ajax'

Vue.use(Vuex)

let anys: any
// let db=new ajax();

// console.log(Vue.ajax)

const state = {
    count: 1,                //test   
    sysInfo: {
        oemFootInfo: '©2018 OA办公自动化系统',
        oemLoginHelp: `<p>碰到任何问题，555555555`,
        oemBannerTitle: `<h1>OA</h1><span>办公自动化系统</span>`,   //登录后xx
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
    pagination: {
        pagerow: 10,   // 每页行数 
        pageno: 1,  // 初始页码
    },
    dic: anys,

    project:[], //当前项目的全部信息
    tasks: [], //项目下的全部task
    stages: [],//项目下的全部stage
    task: {},  //在操作的单独一个task
    stage: {},  //在操作的单独一个stage
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
        appendDicInfo(state, dic) {
            // console.log('from store',dic,state.dic)
            state.dic[dic.name] = dic.dic
        },
        updatePageInfo(state, page_info) {
            state.pageInfo.isShowToHome = page_info.isShowToHome
            state.pageInfo.isShowCrumb = page_info.isShowCrumb
            state.pageInfo.crumbName = page_info.crumbName
        },
        login(state, is_login) {
            state.isLogin = is_login
        },
        updateProjestInfo(state, info) {
            // console.log(info)
            state.tasks = info.tasks
            state.stages = info.stages
            state.project = info.project
        },
        updateTaskInfo(state, task) {
            // console.log(this.ajax)
            state.task = task
        },
        updateStageInfo(state, stage) {
            state.stage = stage
        }
    }
})

export default store