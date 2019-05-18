<template>
<div id="wrapper">
    <!-- Header start -->
    <pagehead :user-name='$store.state.userInfo.user_name' :back-home="$store.state.pageInfo.isShowToHome"></pagehead>
    <!-- Header end -->
    <!--公用面包屑 -->
    <Breadcrumb v-if="$store.state.pageInfo.isShowCrumb">
        <BreadcrumbItem to="/">
            <Icon type="ios-home-outline"></Icon>首页
        </BreadcrumbItem>
        <BreadcrumbItem>{{$store.state.pageInfo.crumbName}}
        </BreadcrumbItem>
    </Breadcrumb>
    <!--\公用面包屑 -->
    <!-- Body start -->
    <router-view />
    <!-- Body end -->
    <!-- Footer start -->
    <pagefoot></pagefoot>
    <!-- Footer end -->
</div>
</template>

<script>
import pagehead from "./head.vue";
import pagefoot from "./foot.vue";

export default {
    components: {
        pagefoot,
        pagehead
    },
    data: function () {
        return {
            name: 1,
        };
    },
    methods: {
        updatePageInfo: function (val) {
            let crumb = ''
            switch (val.name.toString()) {
                case "main":
                    this.$store.commit("updatePageInfo", {
                        isShowToHome: false,
                        isShowCrumb: false,
                        crumbName: ""
                    })
                    break;
                default:
                    if (val.meta.crumb) {
                        crumb = val.meta.crumb
                    }
                    this.$store.commit("updatePageInfo", {
                        isShowToHome: true,
                        isShowCrumb: true,
                        crumbName: crumb
                    })
                    break;
            }
        }
    },
    created: function () {
        let c = this.$store.state.count;
        this.updatePageInfo(this.$route)
    },
    watch: {
        $route(val) {
            this.updatePageInfo(val)
        },
    },

};
</script>
