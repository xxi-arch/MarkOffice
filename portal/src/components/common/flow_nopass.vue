<template>
<Modal v-model="isShowModal_" title="不通过" :width="422" :mask-closable="false" @on-cancel="cancel">
    <!--主内容区-->
    <div class="layer layer-nopass">
        <h5>请填写审批不通过原因</h5>
        <textarea v-model="text" class="reason"></textarea>
    </div>
    <!--\主内容区-->

    <div slot="footer">
        <Button size="default" @click="cancel"  >取消</Button>
        <Button type="primary" size="default"  @click="submit()">  提交 </Button>
    </div>

</Modal>
</template>

<script>
export default {
    props: {
        isShowModal: {
            type: Boolean
        }
    },
    data() {
        return {
            isShowModal_: this.isShowModal,
            text: '',
            list_: this.list
        }
    },
    methods: {
        cancel() {
            this.isShowModal_ = false
            this.text = ''
            this.$emit('emitText', {
                isShowModal: this.isShowModal_,
                text: this.text
            })
        },
        submit() {
            this.$emit('emitText', {
                isShowModal: this.isShowModal_,
                text: this.text
            })
        }
    },
    watch: {
        isShowModal() {
            this.isShowModal_ = this.isShowModal
            this.text = ''
        },
    }

}
</script>
