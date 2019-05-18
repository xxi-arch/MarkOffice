<template>
<div class="block">
    <div>
        <div class="right">
            <el-button v-if="is_showCreate==false" @click="is_showCreate=!is_showCreate" type="text" icon="el-icon-circle-plus" size="medium"></el-button>
            <el-button v-if="is_showCreate==true" @click="is_showCreate=!is_showCreate" type="text" icon="el-icon-error" size="medium"></el-button>
        </div>
        <el-form :inline="true" class="record_form" v-if="is_showCreate">
            <el-form-item>
                <el-input :style="{'width':  dic?'512px': '735px'}" v-model="contents" autosize placeholder="请输入内容" type="textarea"></el-input>
            </el-form-item>
            <el-form-item v-if="dic">
                <el-select style="width:215px;" v-model="types" placeholder="请选择类型">
                    <el-option :label="vo" :value="vo" v-for="  (vo,index) in dic  " :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-timeline :reverse="reverse">
        <el-timeline-item v-for="(vo, index) in activities" :key="index" :timestamp="vo.create_time " placement="top">
            <span>
                <el-tag type="info" v-if="vo.type"> {{vo.type}} </el-tag>
                  <template v-if="vo.user_name"> {{vo.user_name}} </template>
                {{vo.content}}
            </span>
        </el-timeline-item>
    </el-timeline>
</div>
</template>

<style scoped>
.record_form .el-textarea {
    width: 500px;
    margin-left: 30px;
}

.right .el-button {
    font-size: 30px;
    color: #409EFF;
}

.right .el-button--medium {
    padding: 1px 10px;
}
</style>

<script>
export default {
    props: {
        code: {
            type: Number,
        },
        modelName: {
            type: String,
            required: true,
        },
        dic: {
            type: Array,
            // validator: function (value) {
            //     return value >= 0 && value <= 128;
            // }
        }
    },
    data() {
        return {
            is_showCreate: false,
            reverse: false,
            activities: [],
            contents: '',
            types: '',
        };
    },
    methods: {
        async init() {
            // this.types=""
            this.contents = ""
            if (this.dic) {
                this.types = this.dic[0]
            }
            let res = await this.ajax.sys('getRecord', {
                code: this.code,
                model_name: this.modelName,
            })
            this.activities = res.data
            // console.log(this.activities)
        },
        async onSubmit() {
            if (!this.contents) {
                this.$message.error('请输入内容');
                return false
            }

            let res = await this.ajax.sys('createRecord', {
                code: this.code,
                model_name: this.modelName,
                content: this.contents,
                type: this.types,
            })
            this.init()
        },
    },
    async created() {

        this.init()
    },
    watch: {
        code() {
            this.init();
        },
        modelName() {
            this.init();
        }
    }
}
</script>
