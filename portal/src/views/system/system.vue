<template>
<div id="main" class="clearfix">
    <!--主内容区-->
    <div class="containarea">
        <h2 class="commontit">系统管理</h2>
        <div class="container">

            <div class="tabletop clearfix">
                <div class="tab">
                    <ul>
                        <li v-if="isExistFunction('user_manage')"  :class=" currentName=='user' ? 'current' : '' ">
                            <router-link to="/system/user">
                                用户管理
                            </router-link>
                        </li>
                        <li v-if="isExistFunction('role_manage')" :class=" currentName=='role'? 'current' : '' ">
                            <router-link to="/system/role">
                                角色管理
                            </router-link>
                        </li>
                        <li v-if="isExistFunction('dic_manage')" :class=" currentName=='dic'? 'current' : '' ">
                            <router-link to="/system/dic">
                                字典管理
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <router-view />
        </div>

    </div>
    <!--\主内容区-->
</div>
</template>

<script>
export default {
    data() {
        return {
            currentName: this.$route.name
        }
    },
    watch: {
        $route(val) {
             this.currentName=this.$route.name
        },
    },

}
</script>
