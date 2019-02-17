<template>
<div >

    {{ head }}
</div>
</template>

<script>
export default {
    inject: ['getMap'],
    props: {
        field: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        editable: {
            type: String,
            default: ''
        },
        head: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            // field_: this.field,
            // title_: this.title,
            // editable_: editable,
            head_: this.head,
        }
    },
    created(){
        // console.log( this.getMap )
    }
}
</script>
