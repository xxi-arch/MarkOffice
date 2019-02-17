<template>

  <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    

<!-- 
<header id="header">
    <div class="headerwrap clearfix" >
      <h1>OA</h1><div class="title">办公自动化系统</div>

        <div class="righttxt">
            <div class="logininfo">
                <p class="welcome">欢迎您：<span>{{name}}</span></p>
                <ul>
                    
                    <li class="home" v-if="backHome">
                        <router-link to="/">
                            <span class="text-icon"></span>
                                <em>返回首页</em>
                        </router-link>
                    </li>
                    <li class="logout">
                    <router-link to="/login">
                        <span class="text-icon"></span>
                        <em>退出系统</em>
                    </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</header> -->

</template>

<script>
export default {
    props: {
        userName: {
            type: String,
            default: ''
        },
        backHome: {
            type: Boolean,
            default: true
        }

    },
    data() {
        return {
            name: this.userName
        }
    },
}
</script>
