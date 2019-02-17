import Vue from 'vue'
import Router from 'vue-router'
import main from './views/main/main.vue'
import ajaxclass from './components/util/ajax'
import store from './store'

Vue.use(Router)
const ajax = new ajaxclass()
const rt = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: main,
            children: [
                {
                    name: 'main',
                    path: '',
                    meta: {
                        title: 'OA'
                    },
                    component: () => import('./views/main/function.vue')
                },
                {
                    name: 'test',
                    path: '/test/index',
                    meta: {
                        title: '测试',
                        crumb: '测试'
                    },
                    component: () => import('./views/test/index.vue')
                },
                {
                    name: 'project',
                    path: '/project/:index',
                    meta: {
                        title: '项目管理',
                        crumb: '项目管理'
                    },
                    component: () => import('./views/project/index.vue')
                },

                {
                    name: 'projectlist',
                    path: '/projectlist',
                    meta: {
                        title: '全部项目',
                        crumb: '全部项目'
                    },
                    component: () => import('./views/project/project_list.vue'),
                   
                },












   
            
      
                {
                    name: 'system',
                    path: '/system',
                    component: () => import('./views/system/system.vue'),
                    children: [
                        {
                            name: 'dic',
                            path: '/system/dic',
                            component: () => import('./views/system/dic.vue')
                        }, {
                            name: 'user',
                            path: '/system/user',
                            component: () => import('./views/system/user.vue')
                        }, {
                            name: 'role',
                            path: '/system/role',
                            component: () => import('./views/system/role.vue')
                        },
                    ]
                },

            ]
        },

        {
            path: '/login',
            name: 'login',
            component: () => import('./views/main/login.vue')
        },
        {
            path: '*',
            name: 'error404',
            component: () => import('./views/main/404.vue')
        }
    ]
})


rt.beforeEach(async (to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.name != 'login') {
        let userRes = await ajax.auth('get_current_user_info')
        if (userRes) {
            for (let i = 0; i < userRes.errors.length; i++) {
                const element = userRes.errors[i]
                if (element.code < 0) {
                    // rt.app.$Message.info('越权操作-请重新登录')
                    rt.push('login')
                    return false
                }
            }
        }
        store.commit('updateUserInfo', userRes.data);
    }
    next()
})

export default rt