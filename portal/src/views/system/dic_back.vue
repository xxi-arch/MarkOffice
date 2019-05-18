<template>
<div>
    <div class="subtabBar">
        <ul>
            <li><a href="dic-worksheet.html">工单</a></li>
            <li><a href="dic-machineroom.html">机房</a></li>
            <li class="current"><a href="dic-iptype.html">IP类型</a></li>
            <li><a href="dic-function.html">功能</a></li>
            <li><a href="dic-flow.html">流程</a></li>
            <li><a href="dic-contracttype.html">合同类型</a></li>
            <li><a href="dic-bandwidth.html">带宽资源</a></li>
        </ul>
    </div>
    <!--userwrap-->
    <div class="tablecommondiv">

        <grid :data="data">
            <column field="id" title="ID" editable="false">
               
            </column>

            <column field="name" title="标题" editable="false"></column>
            <column field="status" title="启用" editable="false"></column>
            <column field="" title="操作" editable="false">

                <template slot="oper" >
                    
                    <a href="#" class="alink">删除</a>

                </template>
            </column>
        </grid>





        <div class="tablebottom">
            <div class="btns"><a href="#" class="btn" target="_blank">新增一条</a></div>
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
import grid from '@/components/common/grid.vue'
import column from '@/components/common/column.vue'
export default {
    components: {
        grid,
        column,
    },
    data() {
        return {
            data: [{
                    id: 1,
                    name: '12312313'
                },
                {
                    id: 2,
                    name: 'yi12342343'
                },
                {
                    id: 3,
                    name: 'yi15555'
                },
            ]
        }
    },
}
</script>
