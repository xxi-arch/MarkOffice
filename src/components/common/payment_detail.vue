<template>
<Modal v-model="isShowModal_" title="收款情况一览表" :width="1294" :mask-closable="false" @on-cancel="cancel">
    <!--主内容区-->
    <div class="layer layer-accountdetail">
        <div class="tablecommondiv">
            <table class="tablecommon table-accountdetail">
                <thead>
                    <tr>
                        <th>合同编号</th>
                        <th>销售员</th>
                        <th>项目名称</th>
                        <th>客户名称</th>
                        <th>付款方式</th>
                        <th>计费日期</th>
                        <th>应收金额</th>
                        <th>开票金额</th>
                        <th>开票日期</th>
                        <th>发票号</th>
                        <th>到账金额</th>
                        <th>到账日期</th>
                        <th>备注/付款凭证</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for=" (vo ,i ) in list " :key="i">
                        <td> {{vo.contract_code}}</td>
                        <td>{{vo.user_name}}</td>
                        <td>{{vo.project_name}}</td>
                        <td>{{vo.name_payer}}</td>
                        <td>
                            <span  :key="i" v-for="(v,i) in dic.pay_type " v-if=" v.id== vo.pay_type" v-html="v.name " > </span>
                        </td>
                        <td>始：{{dataFormat(vo.collect_start) }}
                            <template v-if=" vo.collect_end < 4070914352000">
                                <br>止：{{dataFormat(vo.collect_end) }}
                            </template>
                        </td>
                        <td>{{vo.amount}}</td>
                        <td>{{vo.amount_invoice}}</td>
                        <td v-html=" toLine(vo.invoice_dates,'invoice_dates') "></td>
                        <td v-html=" toLine(vo.invoice_nums,'invoice_nums') "></td>
                        <td>{{vo.amount_collected}}</td>
                        <td v-html=" toLine(vo.collect_dates,'collect_date') "></td>
                        
                        <td v-html="toLine(vo.voucher_comment,'bz')">
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
        <div class="tablebottom">
            <div class="pagewrap">
                <!--ivew组件翻页-->
                <Page :total="listCount" show-sizer :page-size.sync="pagination.pagerow" show-total show-elevator :current.sync="pagination.pageno" @on-change='init' @on-page-size-change=" pageSizeChange " />
                <!--\ivew组件翻页-->
            </div>
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
            list: [],
            listCount: 0,
            pagination: {
                pagerow: this.$store.state.pagination.pagerow,
                pageno: this.$store.state.pagination.pageno,
            },

            isShowModal_: this.isShowModal,
            id: this.map.id,
             dic: {
                 pay_type: this.$store.state.pay_type,
            },
            //1增加页面需要参数
            row: {},
        }
    },
    methods: {
        cancel() {
            this.isShowModal_ = false
            this.$emit('emitComponents', {
                show: this.isShowModal_,
                name: 'payment_detail'
            })
        },
        async init() {
            //扩充init方法
            if (this.map.id != -1 && this.isShowModal_) {
                let res = await ajax.collect('select', {
                    collect_status: '-1', //已付未付 1已付 0 未付 99已经付完 -1为不选
                    collect_time_end:  this.util.getNow(), //收款时间段结束时间
                    collect_time_start: '', //收款时间段开始时间
                    contract_code: '', //合同编号
                    contract_id: this.map.id, //合同id -1为不选
                    invoice_num: '', //发票编号
                    invoice_status: '-1', //有无发票 1 有 0没有 -1为不选
                    pageno: this.pagination.pageno, //页码
                    pagerow: this.pagination.pagerow, //每页行数
                    payer_name: '', //付款单位
                    project_name: '', //项目名称
                    user_name: '', //销售员
                })
                if (res.meta.result == 1) {
                    this.list = res.data
                    this.listCount = res.meta.total
                } else {
                    this.alertError(res.errors[0].abstract_info)
                }
            }
        },
        pageSizeChange(n) {
            this.pagination.pagerow = n
            this.init()
        },
        toLine(str, e) {
            try {
                let arr = JSON.parse(str)
                let res = ''
                if (!e) {
                    e = 'description'
                }
                switch (e) {
                    case 'description':
                        for (let i = 0; i < arr.length; i++) {
                            res += arr[i]['description'] + '<br>';
                        }
                        break;
                    case 'collect_date':
                        for (let i = 0; i < arr.length; i++) {
                            res += arr[i]['collect_date'] + '<br>';
                        }
                        break
                    case 'bz':
                        for (let i = 0; i < arr.length; i++) {
                            res += arr[i]['comments'] + '/' + arr[i]['collect_voucher'] + '<br>';
                        }
                        break
                    case 'invoice_dates':
                        for (let i = 0; i < arr.length; i++) {
                            res += arr[i]['invoice_dates'] + '<br>';
                        }
                        break;
                    case 'invoice_nums':
                        for (let i = 0; i < arr.length; i++) {
                            res += arr[i]['invoice_num'] + '<br>';
                        }
                        break;

                    default:
                        break;
                }
                return res
            } catch (e) {
                return str;
            }
        },
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
