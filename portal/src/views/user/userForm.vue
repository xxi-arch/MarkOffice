<template>
<el-dialog :title="title" width="630px" :visible.sync="dialogVisible" :before-close="handleClose" class="b-dialog">

    <el-form :model="form" :rules="rules" ref="form" label-position="top"   class="dialog-form"  label-suffix="" size="mini">

        <el-row>

                        <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="姓名" prop="name">
                        <el-input type="text" v-model="form.name"  class="fw"  clearable></el-input>
                    </el-form-item>
                </el-col>
                

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="上级" prop="user" >
                        <el-select v-model="form.user" placeholder="请选择"   filterable clearable    >
                            <el-option v-for=" (vo,i) in $store.state.dic.user " :label="vo.name" :value="vo.code" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                

                                <el-col :span="12" v-if="chechFormDisplay('1','0')">
                    <el-form-item label="电话" prop="tel">
                        <el-input type="text" v-model="form.tel" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('0','1')">
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="text" v-model="form.email" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="身份证号" prop="idcard">
                        <el-input type="text" v-model="form.idcard" class="fw" clearable ></el-input>
                    </el-form-item>
                </el-col>
            

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="生日" prop="day"  >
                        <el-date-picker    format="yyyy-MM-dd"    value-format="yyyy-MM-dd" v-model="form.day" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>

                

                                <el-col :span="12" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="性别" prop="sex" >
                        <el-select v-model="form.sex" placeholder="请选择"   filterable clearable    >
                            <el-option v-for=" (vo,i) in $store.state.dic.sex " :label="vo.name" :value="vo.code" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                

                                <el-col :span="12"  v-if="chechFormDisplay('1','1')" >
                    <el-form-item label="状态" prop="status"   >
                        <el-select v-model="form.status" placeholder="请选择">
                            <el-option v-for=" (vo,i) in $store.state.dic.status " :label="vo.name" :value="vo.code" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                

                                <el-col :span="24" v-if="chechFormDisplay('1','1')">
                    <el-form-item label="地址" prop="address">
                        <el-input type="textarea" v-model="form.address" class="fw" clearable ></el-input>
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


// import {info} from './userModel'


const field =  {
    "name": null,
    "user": null,
    "tel": null,
    "email": null,
    "idcard": null,
    "day": null,
    "sex": null,
    "status": null,
    "address": null
} 

const models={
    code:"user",
    name:"用户",   
    is_create:Number("1"),   
    is_update:Number("1"),
    is_detail:Number("1"),
    detailTitle: "用户详情",
    createTitle: "新增用户",
    updateTitle: "修改用户",
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
            rules:  {
    "email": [
        {
            "type": "email",
            "message": "邮箱填写不正确"
        }
    ]
} 
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
                   await this.ajax.getDicByName('user,sex,status')
                }
                this.init()
            },
            deep: true
        }
    }
};
</script>
