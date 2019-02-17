<template>
<el-dialog :title="title" width="630px" :visible.sync="dialogVisible" :before-close="handleClose">

    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="dialog-form" label-position="right" label-suffix="" size="mini">

        <el-row>
            <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                    {{ruleForm.name}}
                    <!--{{ruleForm.name" class="fw}} -->
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="身份证号码" prop="idcard">
                    {{ruleForm.idcard}}
                    <!--{{ruleForm.idcard}} -->
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="电话" prop="tel">
                    {{ruleForm.tel}}
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="年龄" prop="age">
                    {{ruleForm.age}}
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="状态" prop="status">
                    {{ util.detailFormatterDic( 'status',ruleForm.status)}}
                   
                </el-form-item>
            </el-col>

            <el-col :span="24">
                <el-form-item label="地址" prop="address">
                    {{ruleForm.address}}
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="Email" prop="email">
                    {{ruleForm.email}}
                </el-form-item>
            </el-col>

        </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" >关 闭</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">清 空</el-button> -->
        <!-- <el-button type="primary"  @click="submitForm('ruleForm')">保 存</el-button> -->
    </span>
</el-dialog>
</template>

<script>
let form = {
    id: '',
    name: '',
    idcard: '',
    tel: '',
    address: '',
    email: '',
    status: '',
}
let info = {
    title: '用户管理',
}
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
                return ['detail'].indexOf(value) !== -1
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
        };
    },
    methods: {
        handleClose(done) {
            this.dialogVisible = false
            this.$emit('emitComponents', {
                show: false,
                name: 'indexDetail'
            })
        },

        async init() {
            if (!this.visible) {
                return false;
            }
            switch (this.oper) {
                case 'detail':
                    this.title = info.title + '修改'
                    let res = await this.ajax[ajaxOper]('select', {
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
