<template>
<el-dialog :title="title" width="630px" :visible.sync="dialogVisible" :before-close="handleClose">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="dialog-form" label-position="right" label-suffix="" size="mini">

        <el-row>
            <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" class="fw"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="身份证号码" prop="idcard">
                    <el-input v-model="ruleForm.idcard"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="电话" prop="tel">
                    <el-input v-model="ruleForm.tel"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="ruleForm.age"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="状态" prop="status">
                    <el-select v-model="ruleForm.status" placeholder="请选择活动区域">
                        <el-option v-for=" (vo,i) in util.option_dic('status') " :label="vo.text" :value="vo.id" :key="i"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="24">
                <el-form-item label="地址" prop="address">
                    <el-input type="textarea" v-model="ruleForm.address"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="Email" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="日期" prop="day">
                    <el-date-picker v-model="ruleForm.day" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>

        </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" >关 闭</el-button>
        <el-button @click="resetForm('ruleForm')">清 空</el-button>
        <el-button type="primary"  @click="submitForm('ruleForm')">保 存</el-button>
    </span>

</el-dialog>
</template>

<script>

import {info} from './indexModel'
console.log(info)
 

let rules = {
    name: [{
        required: true,
        message: '年龄不能为空'
    }]
}
let form = {
    id: '',
    name: '',
    idcard: '',
    tel: '',
    address: '',
    email: '',
    status: '',
    day: '',
}
// let info = {
//     title: '用户管理',
// }
let ajaxOper = 'user'
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
            ruleForm: this.util.copy(form),
            title: '',
            rules: rules,

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
                    let res = await this.ajax[ajaxOper](this.oper, this.ruleForm)
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
                    this.title = info.model.createTitle 
                    this.ruleForm = this.util.copy(form)
                    break; 
                case 'update':
                    this.title = info.model.updateTitle 
                    res = await this.ajax[ajaxOper]('select', {
                        id: this.map.id
                    })
                    this.ruleForm = res.data[0]
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
            handler(newValue, oldValue) {
                this.init()
            },
            deep: true
        }
    }
};
</script>
