<template>
<el-dialog :title="title" width="630px" :visible.sync="dialogVisible" :before-close="handleClose" class="b-dialog">

    <el-form :model="form" :rules="rules" ref="form" label-position="top"   class="dialog-form"  label-suffix="" size="mini">

        <el-row>

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="客户ID" prop="customer_id" >
                        <el-select v-model="form.customer_id" placeholder="请选择"   filterable clearable    >
                            <el-option v-for=" (vo,i) in $store.state.dic.user " :label="vo.name" :value="vo.code" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="姓名" prop="name">
                        <el-input type="text" v-model="form.name" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="手机" prop="mobile">
                        <el-input type="text" v-model="form.mobile" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="电话" prop="telephone">
                        <el-input type="text" v-model="form.telephone" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="qq" prop="qq">
                        <el-input type="text" v-model="form.qq" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="微信" prop="wx">
                        <el-input type="text" v-model="form.wx" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="传真" prop="fax">
                        <el-input type="text" v-model="form.fax" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input type="text" v-model="form.email" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="是否关键决策人" prop="decision">
                        <el-input type="text" v-model="form.decision" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="部门" prop="depment">
                        <el-input type="text" v-model="form.depment" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="职务" prop="post">
                        <el-input type="text" v-model="form.post" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="性别" prop="sex">
                        <el-input type="text" v-model="form.sex" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="地址" prop="address">
                        <el-input type="text" v-model="form.address" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="备注" prop="desc">
                        <el-input type="text" v-model="form.desc" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('0','1')">
                    <el-form-item label="创建人ID" prop="create_user_id">
                        <el-input type="text" v-model="form.create_user_id" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('0','1')">
                    <el-form-item label="负责人ID" prop="owner_user_id">
                        <el-input type="text" v-model="form.owner_user_id" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="下次联系时间" prop="next_time">
                        <el-input type="text" v-model="form.next_time" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                        

        </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" >关 闭</el-button>
        <el-button @click="resetForm('form')">清 空</el-button>
        <el-button type="primary"  @click="submitForm('form')">保 存</el-button>
    </span>

</el-dialog>
</template>


<script>


// import {info} from './contactsModel'


const field =  {
    "id": null,
    "customer_id": null,
    "name": null,
    "mobile": null,
    "telephone": null,
    "qq": null,
    "wx": null,
    "fax": null,
    "email": null,
    "decision": null,
    "depment": null,
    "post": null,
    "sex": null,
    "address": null,
    "desc": null,
    "create_user_id": null,
    "owner_user_id": null,
    "next_time": null,
    "create_time": null,
    "update_time": null
} 

const models={
    code:"contacts",
    name:"联系人",   
    is_create:Number("1"),   
    is_update:Number("1"),
    is_detail:Number("1"),
    detailTitle: "联系人详情",
    createTitle: "新增联系人",
    updateTitle: "修改联系人",
}

// console.log(util)

// const rules = 



export default {
    props: {
        map: {
            //为表格的一行数据。用于对该行进行处理
            type: Object
        },
        oper: {
            type: String,
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个，根据该字段判断进行何种操作
                return ['create', 'update'].indexOf(value) !== -1
            }
        },
        visible: {
            //该字段控制弹出层是否显示
            type: Boolean
        }
    },
    data() {
        return {
            dialogVisible: this.visible,
            form: this.util.copy(field),
            title: '',
            rules:  {} 
            // {
            //     name: [
            //         // type:'number',
            //         { required: true, message: '请输入提现金额', trigger: 'blur' },
            //         { type:this.util, message: '请输入正确的提现金额', trigger: 'blur' }
            //     ]
            // },
        };
    },
    methods: {
        handleClose(done) {
            this.dialogVisible = false
            this.$emit('emitComponents', {
                show: false,
                name: 'indexForm'
            })
        },
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let res = await this.ajax.baseApi(models.code,this.oper, this.form)
                    switch (res.meta.result.toString()) {
                        case '1':
                            this.$message.success("操作成功");
                            this.handleClose()
                            break;
                        case '0':
                            this.$message.error("数据没有被修改");
                            break;
                        default:
                            this.$message.error("操作失败");
                            break;
                    }
                } else {
                    this.$message.error('请完善表单信息');
                }
            }); 
        },
        chechFormDisplay(is_reveal_create,is_reveal_update){
            if(this.oper=='create' && is_reveal_create=='1' ){
                return true
            }else if(this.oper=='update' && is_reveal_update=='1' ){
                return true
            }else{
                return false
            }

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        async init() {
            if (!this.visible) {
                return false;
            }
            let res 
            switch (this.oper) {
                case 'create':
                    this.title = models.createTitle 
                    this.form = this.util.copy(field)
                    break; 
                case 'update':
                    this.title = models.updateTitle 
                    res = await this.ajax.baseApi(models.code,'select', {
                        id: this.map.id
                    })
                    this.form = res.data[0]
                    break;
                default:
                    break;
            }
        }
    },

    async created() {
        this.init()
    },
     watch: {
        visible() {
            this.dialogVisible = this.visible
        },
        map: {
            async handler(newValue, oldValue) {
                if(this.visible){
                   await this.ajax.getDicByName('user')
                }
                this.init()
            },
            deep: true
        }
    }
};
</script>
