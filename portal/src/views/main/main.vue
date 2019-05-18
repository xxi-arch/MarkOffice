<template>
<el-container style=" border: 1px solid #eee;height: 100%;   " >
    <!-- <el-aside width="200px">
        <div class="container">

            <el-menu class="" :default-openeds="['1', '3']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>导航一</template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>

            </el-menu>


        </div>

    </el-aside> -->

    <el-container>
        <el-header style="text-align: right; font-size: 12px">
            <el-menu :default-active="active" class="el-menu-demo" mode="horizontal" router>
                <el-menu-item index="home" :route="{ path: '/' }">首页</el-menu-item>
                <!-- <el-menu-item index="test" :route="{ path: '/test/index' }">测试</el-menu-item> -->
                <!-- <el-menu-item index="user" :route="{ path: '/user/list' }">用户管理</el-menu-item> -->
                <el-menu-item index="chance" :route="{ path: '/chance/list' }">商机</el-menu-item>
                <el-menu-item index="customer" :route="{ path: '/customer/list' }">客户</el-menu-item>
                <el-menu-item index="contacts" :route="{ path: '/contacts/list' }">联系人</el-menu-item>
                <el-menu-item index="product" :route="{ path: '/product/list' }">产品</el-menu-item>
                <el-menu-item index="project" :route="{ path: '/projectlist' }">项目</el-menu-item>
                <!-- <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>-->
            </el-menu>
        </el-header>
        <el-main>
            <router-view />
            <!-- <el-footer style="text-align: right; font-size: 12px;  ">
      <el-menu :default-active="active" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="home" :route="{ path: '/' }">CRM</el-menu-item>
        <el-menu-item index="home" :route="{ path: '/' }">项目管理</el-menu-item>
        <el-menu-item index="home" :route="{ path: '/' }">日常办公</el-menu-item>
        <el-menu-item index="home" :route="{ path: '/' }">系统设1置</el-menu-item>
      </el-menu>
    </el-footer> -->
            <!-- <div id="oem_footer">©2018 CRM项目管理系统</div> -->

        </el-main>
    </el-container>
</el-container>
</template>

<style>
</style>

<script>
export default {
    data() {
        return {
            active: this.$route.name
        };
    }
};
</script>
<style>
.leftmenu{
    background-color: brown;
    width: 300px;
    height: 10000px !important;
}

.container {

  height: 100%;
  position: absolute;
}
</style>
