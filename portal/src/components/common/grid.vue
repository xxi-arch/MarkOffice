<template>
<table class="tablecommon table-diciptype">
    <thead>
        <tr>
            <th v-for=" ( vo,i ) in columns " :key="i">
                {{vo.title}}
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for=" (vo ,i ) in data_ " :key="i">
            <td v-for=" (col ,n ) in columns " :key="n">
                {{ vo[col.field] }}
                <slot name="oper"></slot>
            </td>
        </tr>

        <!-- <tr>
            <td>***</td>
            <td>***</td>
           <td><i class="text-icon icc-ok"></i></td>
            <td><a href="#" class="alink">删除</a><a href="#" class="alink">编辑</a></td>
        </tr> -->
 
    </tbody>
    <tfoot>
        <tr>
            <td></td>
            <td><input type="text" class="formtxt" value=""></td>
            <td>
                <select>
                            <option>启用</option>
                            <option>禁用</option>
                        </select>
            </td>
            <td><a href="#" class="alink">取消</a><a href="#" class="alink">保存</a></td>
        </tr>
    </tfoot>

</table>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default(){
                return []
            },
        },
        // columns: {
        //     type: Array,
        //     default: []
        // },

        // url:{
        //     type : Object,
        //     default:{
        //         select : '',
        //         edit:'',
        //         del:'',
        //         add:'',
        //     }
        // }
    },
    data() {
        return {
            // columns :this.columns,
            data_: this.data,
            columns: [],
        }
    },
    provide: function () {
        return {
            getMap: 'map12312312312'
        }
    },
    created() {
        this.columns = this.$slots
        let columns = []
        for (let i = 0; i < this.$slots.default.length; i++) {
            const element = this.$slots.default[i];
            if (this.$slots.default[i].componentOptions.tag == 'column') {
                columns.push(this.$slots.default[i].componentOptions.propsData)
            }
            // columns.push(this.$slots.default[i].componentOptions.propsData)
        }
        this.columns = columns
        // console.log(this.columns)
    }
}
</script>
