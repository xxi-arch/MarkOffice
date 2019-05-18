<template>
    <el-card shadow="always" class="maincard">
        <el-row>
            <el-col :span="24" class="breadcrumbgroup">
                <el-col :span="12">
                    <!-- <h2 class="commontit">  测试管理 </h2> -->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>测试列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>

                <el-col :span="12" class="serachgroup">
                    <el-select placeholder="请选择" v-model="selectItem.status" size="mini" clearable>
                        <el-option :key="1" label="启用" value="1">启用</el-option>
                        <el-option :key="2" label="禁用" value="2">禁用</el-option>
                    </el-select>
                    <el-input size="mini" placeholder="请输入内容" v-model="selectItem.name" clearable></el-input>
                    <el-button size="mini" type="primary" @click="init">搜索</el-button>
                </el-col>

            </el-col>
            <el-col :span="24">
                <el-table :data="list.row" border>
                    <el-table-column prop="id" label="ID" ></el-table-column>
                    <el-table-column prop="name" label="姓名" ></el-table-column>
                    <el-table-column prop="idcard" label="身份证号"></el-table-column>
                    <el-table-column prop="tel" label="电话"></el-table-column>
                    <el-table-column prop="age" label="年龄"></el-table-column>
                    <el-table-column prop="address" label="地址" width="200"></el-table-column>
                    <el-table-column prop="email" label="Email"></el-table-column>
                    <el-table-column prop="status" label="状态" :formatter="util.formatterDic"></el-table-column>

                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="updateRow(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click.native.prevent="detailRow(scope.row)" type="text" size="small">详情</el-button>
                            <el-button @click.native.prevent="deleteRow(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>


                </el-table>
            </el-col>
            <el-col :span="24" class="pagegroup">
                <el-col :span="12">
                    <el-button size="mini" type="primary" icon="el-icon-plus" @click="createRow()">添加</el-button>
                </el-col>
                <el-col :span="12" class="paginationgroup">
                    <el-pagination size="mini" @current-change="init" :current-page.sync="pagination.page" @size-change="pageSizeChange" :page-size.sync="pagination.limit" layout="total,prev, pager, next, jumper, sizes" :total="list.total"></el-pagination>
                </el-col>
            </el-col>
        </el-row>

        <indexForm :oper="indexForm.oper" :visible="indexForm.visible" :map="indexForm.map" @emitComponents="emitComponents"></indexForm>
        <indexDetail :oper="indexDetail.oper" :visible="indexDetail.visible" :map="indexDetail.map" @emitComponents="emitComponents"></indexDetail>

    </el-card>
</template>

<script>
    import indexForm from "./indexForm.vue";
    import indexDetail from "./indexDetail.vue";

    let ajaxOper = 'user'

    let selectItem = {
        status: '',
        name: '',
        limit: 0,
        page: 0,
    }

    export default {
        components: {
            indexForm: indexForm,
            indexDetail: indexDetail,
        },
        data() {
            return {
                indexForm: {
                    visible: false,
                    map: {}
                },
                indexDetail: {
                    visible: false,
                    map: {}
                },
                pagination: {
                    limit: this.$store.state.pagination.pagerow,
                    page: this.$store.state.pagination.pageno
                },
                selectItem: this.util.copy(selectItem),
                list: {
                    row: [],
                    total: 0
                }
            };
        },
        methods: {
            async deleteRow(row) {
        this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(async () => {
            let res = await this.ajax[ajaxOper]("delete", {
            id: row.id
        });
        if (res.meta.result) {
            this.$message.success("操作成功");
            this.init();
        } else {
            this.$message.error(res.errors.info);
        }
    });
    },
    async updateRow(row) {
        this.indexForm.visible = true;
        this.indexForm.map = row;
        this.indexForm.oper = 'update';
    },
    async detailRow(row) {
        this.indexDetail.visible = true;
        this.indexDetail.map = row;
        this.indexDetail.oper = 'detail';
    },
    async createRow() {
        this.indexForm.visible = true;
        this.indexForm.map = {};
        this.indexForm.oper = 'create';
    },
    indexForm_visible(oper, row) {
        this.indexForm.visible = true;
        this.indexForm.map = {};
    },
    emitComponents(n) {
        this[n.name].visible = false;
        this[n.name].map= {};
        this.init();
    },
    pageSizeChange(n) {
        this.pagination.pagerow = n;
        this.init();
    },
    async init() {
        let selectItem = this.getSelectItem();
        if (!selectItem) {
            return false;
        }
        let res = await this.ajax[ajaxOper]("select", selectItem);
        if (res.meta.result) {
            this.list.row = res.data;
            this.list.total = res.meta.total;
        } else {
            this.$message.error(res.errors.info);
        }
    },
    getSelectItem() {
        let selectItem = this.selectItem
        selectItem.limit = this.pagination.limit
        selectItem.page = this.pagination.page
        return selectItem;
    }
    },
    async created() {
        this.init();
    },

    };
</script>
