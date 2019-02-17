<template>
<div id="app">
    <router-view />
</div>
</template>

<script>

export default {
    created() {
        this.initDic()
    },
    methods: {
        async initDic() {
            let dic = await this.ajax.loadDic()
            this.$store.commit('updateDicInfo', dic);
        }
    }
}
</script>
