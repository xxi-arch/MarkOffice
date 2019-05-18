<template>
<!-- <el-dialog :title="title" width="630px" :visible.sync="dialogVisible" :before-close="handleClose" class="b-dialog">

    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="dialog-form" label-position="right" label-suffix="" size="mini">

        <el-row>
            <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                    {{ruleForm.name}}
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="状态" prop="status">
                    {{ util.detailFormatterDic( 'status',ruleForm.status)}}
                </el-form-item>
            </el-col>

        </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" >关 闭</el-button>
    </span>
</el-dialog> -->

<slideview    :listenerIDs="['maincard']" :noListenerIDs="[]" :noListenerClass="['el-table__body']" @side-close="handleClose" :body-style="{padding: 0, height: '100%'}">

<button @click="handleClose">关闭</button>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="dialog-form" label-position="right" label-suffix="" size="mini">

        <el-row>
            <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                    {{ruleForm.name}}
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="状态" prop="status">
                    {{ util.detailFormatterDic( 'status',ruleForm.status)}}
                </el-form-item>
            </el-col>

        </el-row>
    </el-form>
</slideview>
</template>

<script>
import slideview from '@/components/common/SlideView'

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
    components: {
        slideview: slideview,
    },
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
            let res
            switch (this.oper) {
                case 'detail':
                    this.title = info.title + '详情'
                    // res = await this.ajax.Api('select', {
                    //     id: this.map.id
                    // })
                    // this.ruleForm = res.data[0]
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
