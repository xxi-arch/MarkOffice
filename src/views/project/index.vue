<template>
<div>
    <el-row class="object_main" :gutter="20">

        <el-col :span="1" class="task_list">
            <el-row>
                <div>
                    <span class="title_name">待认领</span>
                    <span class="title_amount">2</span>

                    <el-dropdown trigger="click" size="medium" class="task_list_option">
                        <span class="el-dropdown-link">
                                <el-button icon="el-icon-more" class="task-icon-more"  type="text"></el-button>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><i class="el-icon-document" divided> 编辑列表</i></el-dropdown-item>
                            <el-dropdown-item><i class="el-icon-news" divided></i> 在此后添加新列表</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                </div>

                <div>
                    <el-card class="task-card">
                        <div class="task-priority bg-priority-2"></div>
                        <el-col :span="2">
                            <el-checkbox class="task_status_checkbox" size="medium">
                            </el-checkbox>
                        </el-col>
                        <el-col :span="20">
                            <header class="task-content-wrapper">
                                22
                            </header>
                            <div class="task-infos">
                                <span class="task-wrapper"><i class="el-icon-document"></i>2/10</span>
                                <span class="task-wrapper"><i class="el-icon-picture"></i></span>
                                <span class="task-wrapper"><i class="el-icon-news"></i></span>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <span class="task_user_img" style="background-image: url('https://striker.teambition.net/thumbnail/11176478146bfbf43acbf94f7024ea691725/w/200/h/200');"></span>
                        </el-col>
                    </el-card>
                    <el-card class="task-card">
                        <div class="task-priority bg-priority-2"></div>
                        <el-col :span="2">
                            <el-checkbox class="task_status_checkbox" size="medium">
                            </el-checkbox>
                        </el-col>
                        <el-col :span="20">
                            <header class="task-content-wrapper">
                                22
                            </header>
                            <div class="task-infos">
                                <span class="task-wrapper"><i class="el-icon-document"></i>2/10</span>
                                <span class="task-wrapper"><i class="el-icon-picture"></i></span>
                                <span class="task-wrapper"><i class="el-icon-news"></i></span>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <span class="task_user_img" style="background-image: url('https://striker.teambition.net/thumbnail/11176478146bfbf43acbf94f7024ea691725/w/200/h/200');"></span>
                        </el-col>
                    </el-card>
                </div>

                <div>
                    <!-- <el-card class="task-card-create-button">
                        <el-button icon="el-icon-plus" type="text"></el-button>
                    </el-card> -->

                    <el-card class="task-card create-card">
                        <div class="create-iteam">
                            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="text">
                            </el-input>
                        </div>
                        <div class="create-iteam">
                            <div>
                                <user :visible="userModule.visible" :map="userModule.map" @emitComponents="emitComponents"></user>
                            </div>
                        </div>

                    </el-card>

                </div>

            </el-row>
        </el-col>

    </el-row>
</div>
</template>

<script>
let ajaxOper = 'project'
let selectItem = {
    status: '',
    name: '',
    mid: '',
    limit: 0,
    page: 0,
}

import user from '@/components/common/user'
export default {
    components: {
        user: user,
    },
    data() {
        return {
            userModule: {
                visible: false,
                map: [1,2]
            },
            pagination: {
                limit: this.$store.state.pagination.pagerow,
                page: this.$store.state.pagination.pageno
            },
            selectItem: this.util.copy(selectItem),
            list: {
                row: [],
                total: 0
            },
            text: '',
            visible2: false,
        };
    },
    methods: {
        async init() {
            let selectItem = this.getSelectItem();
            if (!selectItem) {
                return false;
            }
            let res = await this.ajax[ajaxOper]("project_task", selectItem);
            this.list.row = res;
        },
        getSelectItem() {
            let selectItem = this.selectItem
            selectItem.mid = this.$route.params.index
            selectItem.limit = this.pagination.limit
            selectItem.page = this.pagination.page
            return selectItem;
        },
        emitComponents(n) {
            this[n.name].visible = false;
            this[n.name].map = {};
            this.init();
        },
    },
    async created() {
        this.init();
    },

};
</script>
