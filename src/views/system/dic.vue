<template>
<div>
    <div class="subtabBar">
        <ul>
            <li :class="  dicName =='ip_type' ? 'current':'' "><a  @click="init('ip_type')" >IP类型</a></li>

            <li :class="  dicName =='machine_room' ? 'current':'' "><a  @click="init('machine_room')" >机房</a></li>

            <li :class="  dicName =='worksheet_type' ? 'current':'' "><a  @click="init('worksheet_type')" >工单</a></li>
            <li :class="  dicName =='contract_type' ? 'current':'' "><a  @click="init('contract_type')" >合同类型</a></li>
            <li :class="  dicName =='bandwidth_type' ? 'current':'' "><a  @click="init('bandwidth_type')" >宽带类型</a></li>
            <li :class="  dicName =='cabinet_size' ? 'current':'' "><a  @click="init('cabinet_size')" >机柜尺寸</a></li>
            <li :class="  dicName =='circuit_type' ? 'current':'' "><a  @click="init('circuit_type')" >线路类型</a></li>

        </ul>
    </div>
    <!--userwrap-->
    <div class="tablecommondiv">
        <table class="tablecommon table-diciptype" v-if=" dicName != 'machine_room'  ">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>名称</th>
                    <th v-if="dicName== 'contract_type' ">
                        合同类型
                    </th>
                    <th>启用</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for=" (vo ,i ) in list " :key="i">
                    <template v-if="  vo.id != RowData.id ">
                        <td>{{vo.id}}</td>
                        <td>{{vo.name}}</td>
                        <td v-if="dicName== 'contract_type' " v-html=" vo.sell_or_buy=='1' ? '销售':'采购'  ">

                        </td>

                        <td>
                            <i v-if=" vo.status == 0 " class="text-icon icc-ok"></i>
                        </td>
                        <td>
                            <a v-if="vo.num_refer==0"  @click="del( vo )" class="alink">删除</a>
                            <a v-if="vo.num_refer==0" @click="editShow( vo )"  class="alink">编辑</a>
                        </td>
                    </template>

                    <template v-if=" isEdit  &&  vo.id == RowData.id  ">
                        <td>{{vo.id}}</td>
                        <td>
                            <input v-model="RowData.name" type="text" class="formtxt" value="">
                            </td>

                        <td v-if="dicName== 'contract_type' ">
                            <select v-model="RowData.sell_or_buy">
                                <option value='1' >销售</option>
                                <option value='2' >采购</option>
                            </select>
                        </td>

                        <td>
                            <select v-model="RowData.status">
                                <option value=0 >启用</option>
                                <option value=1 >禁用</option>
                            </select>
                        </td>

                        <td>
                            <a  @click="editCancel" class="alink">取消</a>
                            <a  @click="editSubmit"   class="alink">保存</a>
                        </td>
                    </template>
                </tr>

            </tbody>
            <tfoot v-if=" isAdd">
                <tr>
                    <td></td>
                    <td><input v-model="RowData.name" type="text" class="formtxt" value=""></td>

                    <td v-if="dicName== 'contract_type' ">
                        <select v-model="RowData.sell_or_buy">
                                <option value='1' >销售</option>
                                <option value='2' >采购</option>
                            </select>
                    </td>

                    <td>
                        <select v-model="RowData.status">
                            <option value=0 >启用</option>
                            <option value=1 >禁用</option>
                        </select>
                    </td>
                    <td>
                        <a @click="addCancel" class="alink">取消</a>
                        <a @click="addSubmit" class="alink">保存</a>
                    </td>
                </tr>
            </tfoot>
        </table>

        <table class="tablecommon table-dicmachineroom" v-if=" dicName == 'machine_room'  ">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>机房名称</th>
                    <th>简称</th>
                    <th>地址</th>
                    <th>楼层</th>
                    <th>房间号</th>
                    <th>机房联系人</th>
                    <th>机房联系电话</th>

                    <th>启用</th>
                    <th>操作</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for=" (vo ,i ) in list " :key="i">
                    <template v-if="  vo.id != RowData.id ">
                        <td>{{vo.id}}</td>
                        <td>{{vo.name}}</td>
                        <td>{{vo.simple_name}}</td>
                        <td>{{vo.address}}</td>
                        <td>{{vo.floor_num}}</td>
                        <td>{{vo.room_num}}</td>
                        <td>{{vo.contact_name}}</td>
                        <td>{{vo.contact_phone}}</td>
                        <td>
                            <i v-if=" vo.status == 0 " class="text-icon icc-ok"></i>
                        </td>
                        <td>
                            <a v-if="vo.num_refer==0"  @click="del( vo )" class="alink">删除</a>
                            <a v-if="vo.num_refer==0" @click="editShow( vo )"  class="alink">编辑</a>
                        </td>
                    </template>

                    <template v-if=" isEdit  &&  vo.id == RowData.id  ">
                        <td>{{vo.id}}</td>

                        <td>
                            <input v-model="RowData.name" type="text" class="formtxt"  placeholder='机房名称' >
                        </td>
                        <td>
                            <input v-model="RowData.simple_name" type="text" class="formtxt"  placeholder='简称' >
                        </td>
                        <td>
                            <input v-model="RowData.address" type="text" class="formtxt"  placeholder='楼层' >
                        </td>
                        <td>
                            <input v-model="RowData.floor_num" type="text" class="formtxt"  placeholder='房间号' >
                        </td>
                        <td>
                            <input v-model="RowData.room_num" type="text" class="formtxt"  placeholder='机房名称' >
                        </td>
                        <td>
                            <input v-model="RowData.contact_name" type="text" class="formtxt"  placeholder='机房联系人' >
                        </td>
                        <td>
                            <input v-model="RowData.contact_phone" type="text" class="formtxt"  placeholder='机房联系电话' >
                        </td>

                        <td>
                            <select v-model="RowData.status">
                                <option value=0 >启用</option>
                                <option value=1 >禁用</option>
                            </select>
                        </td>
                        <td>
                            <a  @click="editCancel" class="alink">取消</a>
                            <a  @click="editSubmit"   class="alink">保存</a>
                        </td>
                    </template>
                </tr>

            </tbody>

            <tfoot v-if=" isAdd">
                <tr>
                    <td></td>
                    <!-- <td><input v-model="RowData.name" type="text" class="formtxt" ></td> -->
                    <td>
                        <input v-model="RowData.name" type="text" class="formtxt"  placeholder='机房名称' >
                        </td>
                    <td>
                        <input v-model="RowData.simple_name" type="text" class="formtxt"  placeholder='简称' >
                        </td>
                    <td>
                        <input v-model="RowData.address" type="text" class="formtxt"  placeholder='楼层' >
                        </td>
                    <td>
                        <input v-model="RowData.floor_num" type="text" class="formtxt"  placeholder='房间号' >
                        </td>
                    <td>
                        <input v-model="RowData.room_num" type="text" class="formtxt"  placeholder='机房名称' >
                        </td>
                    <td>
                        <input v-model="RowData.contact_name" type="text" class="formtxt"  placeholder='机房联系人' >
                        </td>
                    <td>
                        <input v-model="RowData.contact_phone" type="text" class="formtxt"  placeholder='机房联系电话' >
                        </td>

                    <td>
                        <select v-model="RowData.status">
                            <option value=0 >启用</option>
                            <option value=1 >禁用</option>
                        </select>
                    </td>
                    <td>
                        <a @click="addCancel" class="alink">取消</a>
                        <a @click="addSubmit" class="alink">保存</a>
                    </td>
                </tr>
            </tfoot>
        </table>

        <div class="tablebottom">
            <div class="btns"><a  @click="addShow" class="btn" target="_blank">新增一条</a></div>
            <div class="pagewrap">
                <!--ivew组件翻页-->

                <!--\ivew组件翻页-->
            </div>
        </div>
    </div>

    <!--\userwrap-->
</div>
</template>

<script>
import ajaxclass from "@/components/util/ajax";
let ajax = new ajaxclass();

export default {
    components: {},
    data() {
        return {
            url: {},
            list: [],
            dicName: "ip_type",
            isAdd: false,
            isEdit: false,

            RowData: {
                id: "",
                name: "",

                sell_or_buy: '',

                simple_name: '',
                address: '',
                floor_num: '',
                room_num: '',
                contact_name: '',
                contact_phone: '',

                status: "0",
                dic_name: this.dicName
            }
        };
    },
    methods: {
        async init(dic_name) {
            this.dicName = dic_name;
            let res = await ajax.dic("select", {
                dic_name: this.dicName,
                status: -1,
                text: ""
            });
            if (res.meta.result == 1) {
                this.list = res.data;
            } else {
                this.alertError(res.errors[0].abstract_info);
            }
        },
        clearRowData() {
            this.RowData = {
                id: "",
                name: "",

                sell_or_buy: '',

                simple_name: '',
                address: '',
                floor_num: '',
                room_num: '',
                contact_name: '',
                contact_phone: '',

                status: "0",
                dic_name: this.dicName
            };
        },
        addShow() {
            this.editCancel()
            this.clearRowData();
            this.isAdd = true;
        },
        editShow(row) {
            this.addCancel()
            this.isEdit = true;
            this.RowData = {
                id: row.id,
                name: row.name,
                status: row.status,
                dic_name: this.dicName,

                simple_name: row.simple_name,
                address: row.address,
                floor_num: row.floor_num,
                room_num: row.room_num,
                contact_name: row.contact_name,
                contact_phone: row.contact_phone,

            };

            switch (this.dicName.toString()) {
                case 'machine_room':
                    this.RowData = {
                        id: row.id,
                        name: row.name,
                        status: row.status,
                        dic_name: this.dicName,
                        simple_name: row.simple_name,
                        address: row.address,
                        floor_num: row.floor_num,
                        room_num: row.room_num,
                        contact_name: row.contact_name,
                        contact_phone: row.contact_phone,
                    };
                    break;
                case "contract_type":
                    this.RowData = {
                        id: row.id,
                        name: row.name,
                        status: row.status,
                        dic_name: this.dicName,
                        sell_or_buy: row.sell_or_buy,
                    };
                    break;

                default:
                    this.RowData = {
                        id: row.id,
                        name: row.name,
                        status: row.status,
                        dic_name: this.dicName,
                    };
                    break;
            }

        },

        addCancel() {
            this.clearRowData();
            this.isAdd = false;
        },
        editCancel() {
            this.clearRowData();
            this.isAdd = false;
            this.isEdit = false;
        },
        transformRequest(oper) {
            let row = {}
            let alertText = ''
            switch (this.dicName.toString()) {
                case 'machine_room':
                    alertText = !this.RowData.simple_name ? '简称不能为空' : ''
                    alertText = !this.RowData.address ? '地址不能为空' : ''
                    row = this.RowData
                    break;
                case "contract_type":
                    alertText = !this.RowData.sell_or_buy ? '合同类型不能为空' : ''
                    break;
                default:
                    row.name = this.RowData.name
                    row.dic_name = this.dicName
                    row.status = this.RowData.status
                    break;
            }
            alertText = !this.RowData.name ? '名称不能为空' : ''
            if (alertText == '') {
                return row
            } else {
                this.$Message.info(alertText);
                return false
            }

            // if (this.RowData.name) {
            //     return this.RowData;
            // } else {
            //     this.$Message.info("字段不能为空");
            //     return false;
            // }
        },
        async addSubmit() {
            let RowData = this.RowData;
            delete RowData.id;
            if (!this.transformRequest("add")) {
                return false
            }
            let res = await ajax.dic("add", RowData);
            if (res.meta.result == 0) {
                this.alertError(
                    res.errors[0].code + ` : ` + res.errors[0].abstract_info
                );
                this.init(this.dicName);
            } else {
                await this.init(this.dicName);
                this.addCancel();
            }
        },
        async editSubmit() {
            if (!this.transformRequest("add")) {
                return false
            }
            let res = await ajax.dic("edit", this.RowData);
            if (res.meta.result == 0) {
                this.alertError(
                    res.errors[0].code + ` : ` + res.errors[0].abstract_info
                );
            }
            await this.init(this.dicName);
            this.editCancel();
        },
        async del(row) {
            if (window.confirm("确定要删除该条纪录吗？")) {
                let res = await ajax.dic("del", {
                    dic_name: this.dicName,
                    id: row.id
                });
                if (res.meta.result == 0) {
                    this.alertError(
                        res.errors[0].code + ` : ` + res.errors[0].abstract_info
                    );
                }
                this.init(this.dicName);
            }
        }
    },
    created() {
        this.init("ip_type");
    }
};
</script>
