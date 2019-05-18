<template>
<div class="block">
    <!-- <div class="right">
        <el-button v-if="is_showCreate==false" @click="is_showCreate=!is_showCreate" type="text" icon="el-icon-circle-plus" size="medium"></el-button>
        <el-button v-if="is_showCreate==true" @click="is_showCreate=!is_showCreate" type="text" icon="el-icon-error" size="medium"></el-button>
    </div> -->

    <el-upload :before-upload="onBeforeUpload" accept="image/*,text/*,application/msword,application/vnd.ms-powerpoint,application/vnd.ms-works,application/zip" v-show="is_showCreate" class="upload-block" :data="uploadFileData" :show-file-list="false" drag :action="url" :on-success="init">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传  </em> </div>
        <!-- <div class="el-upload__text">仅支持jpg jif doc docx ppt </div> -->
    </el-upload>

    <el-table :data="list" style="width: 100%">
        <el-table-column prop="filename" label="文件名">
        </el-table-column>
        <el-table-column prop="user_name" label="上传人" width="80">
        </el-table-column>
        <el-table-column prop="create_time" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="sizekb" label="大小(KB)" width="100">
        </el-table-column>
        <el-table-column prop="" label="操作" width="140">
            <template slot="header" slot-scope='scope'>
                <div class="right">
                    <el-tooltip content="添加附件" placement="top" effect="light">
                        <el-button v-show="is_showCreate==false" @click="is_showCreate=!is_showCreate" type="text" icon="el-icon-circle-plus" size="medium"></el-button>
                    </el-tooltip>
                    <el-tooltip content="取消添加" placement="top" effect="light">
                        <el-button v-show="is_showCreate==true" @click="is_showCreate=!is_showCreate" type="text" icon="el-icon-error" size="medium"></el-button>
                    </el-tooltip>
                </div>
            </template>
            <template slot-scope="scope">
                <el-button @click.native.prevent="openRow(scope.row)" type="text" size="small">打开</el-button>
                <el-button @click.native.prevent="updateRow(scope.row)" type="text" size="small">重命名</el-button>
                <el-button @click.native.prevent="deleteRow(scope.row)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<style scoped>
.upload-block .el-upload .el-upload-dragger {
    width: 777px;
}

.upload-block {
    width: 100%;
}

.right .el-button {
    font-size: 30px;
    color: #409EFF;
}

.el-upload {
    width: 777px;
}
</style>

<script>
export default {
    props: {
        code: {
            type: Number,
            required: true,
        },
        modelName: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            url: this.ajax.getUploadUrl(),
            uploadFileData: {
                code: this.code,
                model_name: this.modelName,
            },
            is_showCreate: false,
            list: [],
        }
    },
    methods: {
        async init() {
            let res = await this.ajax.sys('getFile', {
                code: this.code,
                model_name: this.modelName,
            })
            this.list = res.data
            // console.log(res)
        },
        onBeforeUpload(file) {
            console.log(file)
            const isIMAGE = file.type === 'image/jpeg' || 'image/gif' || 'image/png';
            console.log(isIMAGE)

            const isLt1M = file.size / 1024 / 1024 < 10;
            if (!isIMAGE) {
                this.$message.error('上传文件只能是图片格式!');
            }
            if (!isLt1M) {
                this.$message.error('上传文件大小不能超过10MB!');
            }
            return isIMAGE && isLt1M;
        },
        async updateRow(row) {
            let name = row.filename.substring(0, row.filename.lastIndexOf("."))
            // let kzm = row.filename.substr(row.filename.indexOf("."));
            this.$prompt('请输入文件名称,不包含扩展名', '文件重命名', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: name,
                inputValidator: (val) => {
                    return val ? true : false;
                },
                inputErrorMessage: '请输入文件名称'
            }).then(async ({
                value
            }) => {
                // let kzm = row.filename.substr(row.filename.indexOf("."));
                let filename = `${value}.${row.filetype}`
                let res = await this.ajax.sys('setFileName', {
                    id: row.id,
                    filename: filename
                })
                this.init()

            }).catch(() => {})

        },
        async deleteRow(row) {
            this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                let res = await this.ajax.sys('deleteFile', {
                    id: row.id
                });
                if (res.meta.result) {
                    this.$message.success("操作成功");
                    this.init();
                } else {
                    this.$message.error(res.errors.info);
                }
            }).catch(() => {})
        },
        openRow(row) {
            window.open(row.filepath);
        }
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
