<template>
<!--rolewrap-->
<div class="commonbox rolewrap">
    <!--roleleft-->
    <div class="roleleft">
        <div class="tablecommondiv">
            <table class="tablecommon table-roleleft">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>角色名称</th>
                        <th>合同范围</th>
                        <th>启用</th>

                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for=" (vo ,i ) in list " :key="i" :class="  (isEditFunction && vo.id == RowData.id )  ? 'current' : ''  ">
                        <template v-if="  vo.id != RowData.id  ||  isEditFunction  ">
                            <td>{{vo.id}}</td>
                            <td>{{vo.name}}</td>
                            <td>
                                <template v-if=" vo.scope_contract ==0  ">
                                    全部
                                </template>
                                <template v-if=" vo.scope_contract ==1  ">
                                    自己
                                </template>
                            </td>
                            <td>
                                <i v-if=" vo.status == 0 " class="text-icon icc-ok"></i>
                            </td>
                            <td>
                                <a v-if="vo.num_refer==0" @click="editShow( vo )"  class="alink">编辑</a>
                                <a v-if="vo.num_refer==0"  @click="del( vo )" class="alink">删除</a>
                                <a @click="functionShow( vo )"  class="alink">授权</a>
                                <span  class="arrow"></span>
                                <span v-if="isEditFunction && vo.id == RowData.id  " class="arrow"></span>
                            </td>
                        </template>

                        <template v-if=" isEdit  &&  vo.id == RowData.id  ">
                            <td>{{vo.id}}</td>
                            <td>
                                <input v-model="RowData.name" type="text" class="formtxt" >
                            </td>
                            <td>
                                <select v-model="RowData.scope_contract">
                                    <option value=0 >全部</option>
                                    <option value=1 >自己</option>
                                </select>
                            </td>

                            <td>
                                <select v-model="RowData.status">
                                <option value=0 >启用</option>
                                <option value=1 >禁用</option>
                            </select>
                            </td>
                            <td>
                                <a  @click="editCancel" class="alink">取消</a>
                                <a  @click="editSubmit"   class="alink">保存</a>
                            </td>
                        </template>
                    </tr>

                </tbody>
                <tfoot v-if=" isAdd">
                    <tr>
                        <td></td>
                        <td><input v-model="RowData.name" type="text" class="formtxt" value=""></td>
                        <td>
                            <select v-model="RowData.scope_contract">
                            <option value=0 >全部</option>
                            <option value=1 >自己</option>
                            </select>
                        </td>
                        <td>
                            <select v-model="RowData.status">
                                <option value=0 >启用</option>
                                <option value=1 >禁用</option>
                            </select>
                        </td>
                        <td>
                            <a @click="addCancel" class="alink">取消</a>
                            <a @click="addSubmit" class="alink">保存</a>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div class="tablebottom">
                <div class="btns"><a  @click="addShow" class="btn" target="_blank">新增一条</a></div>
                <div class="pagewrap">
                    <!--ivew组件翻页-->

                    <!--\ivew组件翻页-->
                </div>
            </div>
        </div>
    </div>
    <!--\roleleft-->
    <!--roleright-->
    <div class="roleright">
        <table class="tablecommon table-roleright">
            <thead>
                <tr>
                    <th>一级功能项</th>
                    <th>权限</th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr class="current">
                    <td>任务队列</td>
                    <td>操作权限</td>
                </tr> -->

                <tr v-for=" (vo,i ) in functionList " :key="i">
                    <td>{{ vo.name }}</td>
                    <td> <input type="checkbox"  :value="vo.code"   v-model="RowData.function" />  </td>
                </tr>
            </tbody>
        </table>
        <div class="btns">
            <button @click="functionSubmit" v-if=" isEditFunction  " class="btn btnred">保存授权</button>
        </div>
    </div>

    <!--\roleright-->
</div>

<!--\rolewrap-->
</template>

<script>
import ajaxclass from "@/components/util/ajax";
let ajax = new ajaxclass();

export default {
    components: {

    },
    data() {
        return {

            list: [],
            listCount: 0,

            isAdd: false,
            isEdit: false,

            isEditFunction: false,

            functionList: [],

            RowData: {
                id: '', //
                name: '',
                status: '0',
                scope_contract: '0',
            },
            pagination: {
                pagerow: this.$store.state.pagination.pagerow,
                pageno: this.$store.state.pagination.pageno,

            },

            roleFunction: [],

            selectItem: {
                txt: ''
            },
        }
    },
    methods: {
        async init() {
            let res = await ajax.role('select', this.getSelectItem())
            if (res.meta.result == 1) {
                this.list = res.data
                this.listCount = res.meta.total
            } else {
                this.alertError(res.errors[0].abstract_info)
            }
            this.addCancel()
            this.editCancel()
        },
        functionShow(vo) {
            console.log(vo)
            this.isEditFunction = true
            this.RowData = {
                id: vo.id,
                function: vo.functions.split(","),
            }
        },
        functionEditCancel() {
            this.isEditFunction = false
        },
        async functionSubmit() {
            let res = await ajax.role('authorize', {
                id: this.RowData.id,
                functions: this.RowData.function.join(",")
            })
            if (res.meta.result == 0) {
                this.alertError(res.errors[0].code + ` : ` + res.errors[0].abstract_info)
                // await this.init()
            } else {
                // await this.init()
                // this.addCancel()
                // this.editCancel()
                this.$Message.info('操作成功')
            }

        },
        pageSizeChange(n) {
            this.pagination.pagerow = n
            this.init()
        },
        getSelectItem() {
            return {
                status: -1,
                name: '',
            }
        },
        clearRowData() {
            this.RowData = {
                id: '', //
                name: '',
                status: '0',
                scope_contract: '0',
            }
        },

        addShow() {
            this.editCancel()
            this.clearRowData()
            this.functionEditCancel()
            this.isAdd = true
        },
        editShow(row) {
            this.addCancel()
            this.functionEditCancel()
            this.isEdit = true
            this.RowData = {
                id: row.id, //
                name: row.name, // name
                status: row.status,
                scope_contract: row.scope_contract,
            }
        },
        addCancel() {
            this.clearRowData()
            this.isAdd = false
        },
        editCancel() {
            this.clearRowData()
            this.isAdd = false
            this.isEdit = false
        },

        transformRequest(oper) {
            let row = this.RowData
            let error = 0
            if (oper == 'add') {
                delete row.id
            }
            if (!row.name) {
                this.$Message.info('名称不能为空')
                error++
            }

            if (error > 0) {
                return false
            } else {
                return row
            }
        },
        async submit(oper) {
            let RowData = this.transformRequest(oper)
            if (!RowData) {
                return false
            }
            let res = await ajax.role(oper, RowData)
            if (res.meta.result == 0) {
                this.alertError(res.errors[0].code + ` : ` + res.errors[0].abstract_info)
                await this.init()
            } else {
                await this.init()
                this.addCancel()
                this.editCancel()
            }
        },
        async addSubmit() {
            this.submit('add')
        },
        async editSubmit() {
            this.submit('edit')
        },
        async del(row) {
            if (window.confirm('确定要删除该条纪录吗？')) {
                let res = await ajax.role('del', {
                    id: row.id
                })
                if (res.meta.result == 0) {
                    this.alertError(res.errors[0].code + ` : ` + res.errors[0].abstract_info)
                }
                this.init()
            }
        },
    },
    async created() {
        this.init()
        let res = await ajax.role('list_functions')
        this.functionList = res.data
    }
}
</script>
