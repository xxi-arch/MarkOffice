<template>
<!--userwrap-->
<div class="commonbox userwrap">
    <!--userleft-->
    <div class="userleft">
        <div class="tabletop clearfix">
            <div class="search userset clearfix">
                <input type="text" v-model="selectItem.txt " class="formtxt w4" placeholder="输入姓名">
                <a @click="init()" class="btn">搜索</a>
            </div>
        </div>
        <div class="tablecommondiv">
            <table class="tablecommon table-account">
                <thead>
                    <tr>
                        <th>登录名</th>
                        <th>姓名</th>
                        <th>角色</th>
                        <th>启用</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for=" (vo ,i ) in list " :key="i" :class="  vo.id == RowData.id   ? 'current' : ''  ">
                        <td>{{ vo.username }}</td>
                        <td>{{ vo.user_name }}</td>
                        <td>{{ vo.role_name }}</td>
                        <td>
                            <i v-if=" vo.status == 0 " class="text-icon icc-ok"></i>
                        </td>
                        <td>
                            <a v-if="vo.num_refer==0 && vo.id > 0"  @click="del( vo )" class="alink">删除</a>
                            <a v-if="vo.num_refer==0 && vo.id > 0" @click="editShow( vo )"  class="alink">编辑</a>
                            <a v-if="vo.status==0 && vo.id > 0" @click="set_status( vo ,1 )"  class="alink">禁用</a>
                            <a v-if="vo.status==1" @click="set_status( vo ,0 )"  class="alink">启用</a>

                            <a v-if="vo.num_refer > 0 || vo.id < 0 "  @click="change_password(vo)"  class="alink">修改密码</a>

                            <span class="arrow"  v-if="  vo.id == RowData.id   "  ></span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="tablebottom">
                <div class="btns" @click="addShow"><a   class="btn" target="_blank">新增一条</a></div>
                <div class="pagewrap">
                    <!--ivew组件翻页-->
                    <Page :total="listCount" show-sizer :page-size.sync="pagination.pagerow" show-total show-elevator :current.sync="pagination.pageno" @on-change='init' @on-page-size-change=" pageSizeChange " />
                    <!--\ivew组件翻页-->
                </div>
            </div>
        </div>
    </div>
    <!--\userleft-->
    <!--userright-->
    <div class="userright">
        <div class="useredit-area">
            <h4>用户添加</h4>
            <ul>
                <li><label>登录名：</label><input type="text" class="formtxt"  v-model="RowData.username" :disabled=" isEdit || isEditPw " ></li>
                <li><label>姓名：</label><input type="text" class="formtxt" v-model="RowData.user_name" :disabled="isEditPw "></li>
                <li><label>密码：</label><input type="text" class="formtxt" v-model="RowData.password"></li>
                <li class="selectli clearfix">
                    <label>角色：</label>
                    <div class="select select-role">
                        <!--iview组件 select-->
                        <select  v-model="RowData.role" :disabled="isEditPw ">
                            <option v-for=" (vo,i ) in roleList "  :key="i" :value="vo.id" > {{vo.name}} </option>
                        </select>
                        <!--\iview组件 select-->
                    </div>
                </li>
                <li><label>手机号码：</label><input type="text" class="formtxt"  v-model="RowData.user_mobile" :disabled="isEditPw " ></li>
                <li class="selectli clearfix">
                    <label>启用状态：</label>
                    <div class="select select-status">
                        <!--iview组件 select-->
                        <select  v-model="RowData.status" :disabled="isEditPw ">
                            <option value=0 >启用</option>
                            <option value=1 >禁用</option>
                        </select>
                        <!--\iview组件 select-->
                    </div>
                </li>
            </ul>
        </div>
        <div class="btns">
            <button @click="addCancel();editCancel();  " v-if="isAdd || isEdit" class="btn btnblue">取消</button>
            <button @click="addSubmit" v-if="isAdd" class="btn btnred">保存新增</button>
            <button @click="editSubmit" v-if="isEdit" class="btn btnred">保存修改</button>
            <button @click="PwSubmit" v-if="isEditPw" class="btn btnred">保存密码</button>
        </div>
    </div>
    <!--\userright-->
</div>
<!--\userwrap-->
</template>

<script>
import ajaxclass from "@/components/util/ajax";
let ajax = new ajaxclass();

export default {
    components: {},
    data() {
        return {

            list: [],
            listCount: 0,

            isAdd: false,
            isEdit: false,
            isEditPw: false,
            roleList: [],

            RowData: {
                id: '', //
                role: '',
                user_name: '', // name
                username: '', // login name
                status: '0',
                password: '',
                user_mobile: '', //
            },
            pagination: {
                pagerow: this.$store.state.pagination.pagerow,
                pageno: this.$store.state.pagination.pageno,
            },
            selectItem: {
                txt: ''
            },
        }
    },
    methods: {
        async init() {
            let res = await ajax.user('select', this.getSelectItem())
            if (res.meta.result == 1) {
                this.list = res.data
                this.listCount = res.meta.total
            } else {
                this.alertError(res.errors[0].abstract_info)
            }
            this.addCancel()
            this.editCancel()
        },

        pageSizeChange(n) {
            this.pagination.pagerow = n
            this.init()
        },
        async set_status(e, status) {
            if (confirm('确定要进行该操作吗？')) {
                let res = await ajax.user('set_status', {
                    id: e.id,
                    status: status
                })
                if (res.meta.result == 0) {
                    this.alertError(res.errors[0].code + ` : ` + res.errors[0].abstract_info)
                    await this.init()
                } else {
                    await this.init()
                    this.addCancel()
                    this.editCancel()
                }
            }
        },
        getSelectItem() {
            return {
                pageno: this.pagination.pageno,
                pagerow: this.pagination.pagerow,
                role: -1,
                status: -1,
                txt: this.selectItem.txt,
            }
        },
        clearRowData() {
            this.RowData = {
                id: '', //
                role: '',
                user_name: '', // name
                username: '', // login name
                status: '0',
                password: '',
                user_mobile: '', //
            }
        },

        addShow() {
            this.editCancel()
            this.clearRowData()
            this.isAdd = true
        },
        editShow(row) {
            this.addCancel()
            this.isEdit = true
            this.RowData = {
                id: row.id, //
                role: row.role,
                user_name: row.user_name, // name
                username: row.username, // login name
                status: row.status,
                password: '',
                user_mobile: row.user_mobile, //
            }
        },
        change_password(row) {
            this.addCancel()
            this.editCancel()
            this.isEditPw = true
            this.RowData = {
                id: row.id, //
                role: row.role,
                user_name: row.user_name, // name
                username: row.username, // login name
                status: row.status,
                password: '',
                user_mobile: row.user_mobile, //
            }
        },
        cancel(){
            this.clearRowData()
            this.isAdd = false
            this.isEdit = false
            this.isEditPw=false
        },
        addCancel() {
            this.cancel()
        },
        editCancel() {
            this.cancel()
        },

        transformRequest(oper) {
            let row = this.RowData
            let error = 0
            if (oper != 'change_password') {
                if (oper == 'add') {
                    delete row.id
                }
                if (!row.user_name) {
                    this.$Message.info('名称不能为空')
                    error++
                }
                if (!row.username) {
                    this.$Message.info('登录名不能为空')
                    error++
                }
                if (!row.role) {
                    this.$Message.info('请选择角色')
                    error++
                }
            }else{
                if (!row.password) {
                    this.$Message.info('密码不能为空')
                    error++
                }
                row={id:row.id,password :row.password }
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
            let res = await ajax.user(oper, RowData)
            if (res.meta.result == 0) {
                this.alertError(res.errors[0].code + ` : ` + res.errors[0].abstract_info)
                await this.init()
            } else {
                this.$Message.info('操作成功')
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
        async PwSubmit() {
            this.submit('change_password')
        },
        async del(row) {
            if (window.confirm('确定要删除该条纪录吗？')) {
                let res = await ajax.user('del', {
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
        let res = await ajax.role('select', {
            name: '',
            status: -1
        })
        this.roleList = res.data
    }
}
</script>
