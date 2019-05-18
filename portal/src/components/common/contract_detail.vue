<template>
<Modal v-model="isShowModal_" title="合同信息" :width="672" :mask-closable="false" @on-cancel="cancel">
    <!--主内容区-->
    <Spin fix  v-if="loading"><div>加载中</div></Spin>
    <div class="layer layer-contractinfo" v-if="!loading">
        <div class="formlist">
            <ul class="clearfix">
                <li><label>合同类型：</label><span class="txt">{{row.contract_type_name}}</span></li>
                <li><label>合同编号：</label><span class="txt">{{row.contract_code}}</span></li>
                <li><label v-html="row.sell_or_buy==1? '销售员：':'采购员：' "></label><span class="txt">{{row.user_name}}</span></li>
                <li><label>项目名称：</label><span class="txt">{{row.project_name}}</span></li>
                <li v-if="row.sell_or_buy==1"><label>客户名称： </label><span class="txt">{{row.client_name}}</span></li>
                <li v-if="row.sell_or_buy==2"><label>供应商名称： </label><span class="txt">{{row.supplier_name}}</span></li>
                <li v-if="row.paper_doc"><label>纸质合同收到时间：</label><span class="txt">{{dataFormat(row.paper_doc_recv_time)}}</span></li>
                <li v-if="row.paper_doc"><label>合同签订日期：</label><span class="txt">{{dataFormat(row.paper_doc_sign_time) }}</span></li>
            </ul>
            <div class="form clearfix">
                <label>合同服务内容：</label>
                <div class="cnt " v-html=" toLine( row.service_desc )">
                </div>
            </div>
            <div class="form clearfix">
                <label>付款方式：</label>
                <div class="cnt" v-html=" toLine( row.payment_desc )">
                </div>
            </div>

            <div class="form clearfix" v-if="row.sell_or_buy==1 && row.commission_pay_type>0 "   >
                <label>佣金：</label>
                <div class="cnt">
                    {{row.commission_desc}}
                </div>
            </div>

            <p class="form clearfix">
                <label>有效期：</label>
                <span class="txt">  {{ dataFormat(row.expire_time) }} </span>
            </p>

            <p class="form clearfix" v-if="row.electron_doc">
                <label>电子文件：</label>
                <span class="txt"> <a  :href="row.electron_doc_fullpath"  target='_blank' >   {{row.electron_doc}} </a> </span>
            </p>

            <p class="form clearfix" v-if="row.paper_doc">
                <label>纸质合同：</label>
                <span class="txt"> <a  :href="row.paper_doc_fullpath"  target='_blank' >   {{row.paper_doc}} </a> </span>
            </p>

        </div>
    </div>
    <!--\主内容区-->
    <div slot="footer">
        <Button type="primary"  @click="cancel">确定</Button>
    </div>

</Modal>
</template>

<script>
import ajaxclass from "@/components/util/ajax";
let ajax = new ajaxclass();
export default {
    props: {
        map: {
            type: Object
        },
        isShowModal: {
            type: Boolean
        }
    },
    data() {
        return {
            isShowModal_: this.isShowModal,
            id: this.map.id,
            //1增加页面需要参数
            row: {},
            loading:true,
        }
    },
    methods: {
        cancel() {
            this.isShowModal_ = false
            this.$emit('emitComponents', {
                show: this.isShowModal_,
                name: 'contract_detail'
            })
        },
        toLine(str) {
            try {
                let arr = JSON.parse(str)
                let res = ''
                for (let i = 0; i < arr.length; i++) {
                    res += arr[i]['description'] + '<br>';
                }
                return res
            } catch (e) {
                return str;
            }
        },
        async init() {
            //扩充init方法
            if (this.map.id != -1 && this.isShowModal_) {
                console.log(this.map)
                this.loading=true
                let res = await ajax.contract('detail', {
                    id: this.map.id
                })
                this.loading=false
                if (res.meta.result == 1) {
                    this.row = res.data
                } else {
                    this.alertError(res.errors[0].abstract_info)
                }
            }
        }
    },
    async created() {
        this.init()
    },
    watch: {
        isShowModal() {
            this.isShowModal_ = this.isShowModal
        },
        map: {
            handler(newValue, oldValue) {
                this.init()
            },
            deep: true
        }
    }
}
</script>
