<template>
<el-card shadow="always" class="project-card">
      <div >
            <ul >
                <li  v-for="(vo,i) in list.row " :key="i">
                    <router-link :to="'/project/'+vo.mid">
                        <span>{{vo.title}}</span>
                    </router-link>
                </li>
                 
            </ul>
        </div>
</el-card>
</template>

<script>

let ajaxOper = 'project'
let selectItem = {
    status: '',
    name: '',
    limit: 0,
    page: 0,
}

export default {

    data() {
        return {
            pagination: {
                limit: this.$store.state.pagination.pagerow,
                page: this.$store.state.pagination.pageno
            },
            selectItem: this.util.copy(selectItem),
            list: {
                row: [],
                total: 0
            }
        };
    },
    methods: {
        async init() {
            let selectItem = this.getSelectItem();
            if (!selectItem) {
                return false;
            }
            let res = await this.ajax[ajaxOper]("project_list", selectItem);

            if (res) {
                this.list.row = res;
                // this.list.total = res.meta.total;
            } else {
                this.$message.error(res.errors.info);
            }
        },
        getSelectItem() {
            let selectItem = this.selectItem
            selectItem.limit = this.pagination.limit
            selectItem.page = this.pagination.page
            return selectItem;
        }
    },
    async created() {
        this.init();
    },

};
</script>
