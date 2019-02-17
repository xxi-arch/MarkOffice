<template>
<div id="loginwrap">
    <div class="loginheader">
        <div class="title" v-html="$store.state.sysInfo.oemBannerTitle">

        </div>
    </div>
    <div class="logincontent">
        <div class="loginfrm clearfix">
            <div class="logincnt">
                <!-- <h4>登录</h4>-->
                <div class="loginbox">
                    <ul>
                        <li><label><i class="text-icon loginuser"></i></label>
                            <input type="text" value="" placeholder="请输入用户名" v-model="username"  @keyup.enter="login">
                            <p></p>
                        </li>
                        <li><label><i class="text-icon loginpassword"></i></label>
                            <input type="password" value="" placeholder="请输入密码"  v-model="password">
                            <p></p>
                        </li>
                        <li><label><i class="text-icon logincode"></i></label>
                            <input type="text" value="" placeholder="请输入验证码" v-model="verifycode">
                            <span>
                            <img title="点击刷新" @click="get_verifycode()" :src="img" width="90" height="32"></span>

                            <p></p>
                        </li>
                    </ul>
                    <div @click="login" class="btns clearfix"><a  class="btnlogin">登录</a></div>
                </div>
                <div class="describe" v-html="$store.state.sysInfo.oemLoginHelp ">

                </div>
            </div>
        </div>
    </div>
    <div class="loginfooter">
        <div class="logincopyright">
            {{ $store.state.sysInfo.oemFootInfo }}
        </div>
    </div>
</div>
</template>

<script>
import ajaxclass from "@/components/util/ajax";
let ajax = new ajaxclass();
export default {
    data: function () {
        return {
            img: "",
            password: '',
            username: '',
            verifycode: '',
            isLoading: false
        };
    },
    methods: {
        get_verifycode() {
            this.img = ajax.verifycode();
        },
        async login() {
            if (this.isLoading == false) {
                var loginvue = this;
                let paras = {
                    username: loginvue.username,
                    password: loginvue.password,
                    verifycode: loginvue.verifycode
                }
                this.isLoading = true
                let loginRes = await ajax.auth('login', paras);
                if (loginRes.meta.result == 1) {
                    this.$Message.info('登录成功');
                    let userRes = await ajax.auth('get_current_user_info');
                    this.$store.commit('updateUserInfo', userRes.data);
                    this.$router.push('/')
                    this.isLoading = true
                } else {
                    let msg = loginRes.errors[0].abstract_info
                    this.$Message.info(msg);
                    this.isLoading = false
                }
            } else {
                return false
            }
        }
    },
    async created() {
        this.get_verifycode()
        await ajax.auth('logout');
        let component = this;
        document.onkeydown = function (event) {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) { // enter 键
                component.login()
            }
        }
    }
};
</script>
