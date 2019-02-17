<template>
<Modal v-model="isShowModal_" :title="title_" :width="672" :mask-closable="false" @on-cancel="cancel">
    <!--主内容区-->
    <div class="layer layer-approvedetail">
        <div class="tablecommondiv">
            <table class="tablecommon table-approvedetail">
                <thead>
                    <tr>
                        <th>审批角色</th>
                        <th>审批人姓名</th>
                        <th>审批时间</th>
                        <th>审批结果</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for=" (vo ,i ) in list_ " :key="i">
                        <td>{{ vo.step_desc  }}</td>
                        <td>{{vo.user_name}}</td>
                        <td> {{ dataFormat( vo.step_time,'time' ) }} </td>
                        <td>
                            <template v-if="vo.status==0"> 待审批</template>
                            <template v-if="vo.status==1"> 通过 </template>
                            <template v-if="vo.status==2"> 不通过 </template>
                        </td>
                        <td>{{vo.comment}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
       <div slot="footer">
        <Button type="primary"  @click="cancel">确定</Button>
    </div>
    <!--\主内容区-->
</Modal>
</template>
<script>
export default {
    props: {
        list: {
            type: Array
        },
        isShowModal: {
            type: Boolean
        },
        title:{
            default:'带宽复用审批详情',
            type:String,
        }
    },
    data() {
        return {
            isShowModal_: this.isShowModal,
            list_: this.list,
            title_:this.title,
        }
    },
    methods: {
        cancel() {
            this.isShowModal_ = false
            this.$emit('emitShowDetail', this.isShowModal_)
        }
    },
    watch: {
        isShowModal() {
            this.isShowModal_ = this.isShowModal
        },
        title(){
             this.title_ = this.title
        },
        list: {
            handler(newValue, oldValue) {
                this.list_ = this.list
            },
            deep: true
        }
    }

}
</script>
