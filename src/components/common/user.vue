<template>
<div class="user_model">

    <el-popover width="252" trigger="click">

        <div>222222222222222</div>
        <div>222222222222222</div>
        <div>222222222222222</div>
        <div>222222222222222</div>
        <div>222222222222222</div>
        <div>222222222222222</div>
        <span slot="reference"  href="javascript:;" >   <i class="el-icon-question"></i>待认领  </span>

    </el-popover>

</div>
</template>

<style scoped>
.user_model span {
    cursor: pointer
}
</style>

<script>
export default {
    props: {
        map: {
            type: Array,
        },
        oper: {
            type: String,
        },
        visible: {
            type: Boolean,
        }
    },
    data() {
        return {
            dialogVisible: this.visible,
            // ruleForm: this.util.copy(form),
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
            if (this.map.length > 0) {
                let user = this.ajax.project('get_projict_user', {
                    userArray: this.map
                })
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
