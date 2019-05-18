<template>
<slideview :listenerIDs="['projectMain','app']" :noListenerIDs="[]" :noListenerClass="['task-content-wrapper','task_status_checkbox']" @side-close="handleClose" :body-style="{padding: 0, height: '100%'}">

    <!-- <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button  @click="handleClose" style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div> -->

    <!-- <button @click="handleClose">关闭</button> -->

    <el-row :gutter="20" class="task_head">
        <span class="head-title">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bankuaimokuai"></use>
            </svg>
            <span class="head-title-content">
                {{ $store.state.project.title }}
            </span>
        </span>
        <span class="header-action text-right pointer"  @click="deleteTask" ><i class="el-icon-delete"></i></span>
        <span class="header-action text-right pointer"  @click="handleClose" ><i class="el-icon-close"></i></span>
    </el-row>
    <el-row :gutter="20">

        <el-form :label-position="'left'" label-width="100px" class="task_form">
            <el-form-item label="" label-width="0px">
                <div class="task-title">

                    <el-input v-if="is_taskTitleEdit" @blur="saveTaskTitle()" placeholder="请输入任务" v-model="task.title">
                        <el-button type="primary" slot="append" @click="saveTaskTitle()" icon="el-icon-check">保存</el-button>
                    </el-input>

                    <!-- <input type="text"  style="outline:none;" @blur="saveTaskTitle()" v-if="is_taskTitleEdit"  :rows="2" placeholder="请输入任务" v-model="task.title"/>

                    <div class=" text-right">
                        <span  v-if="is_taskTitleEdit"> <el-button  type="primary" @click="saveTaskTitle()" >保存</el-button> </span>
                    </div> -->

                    <!-- <el-input @blur="saveTaskTitle()" v-if="is_taskTitleEdit"  type="textarea" :rows="2" placeholder="请输入任务" v-model="task.title">
                    </el-input> -->
                    <el-tooltip :open-delay="1500" class="item" effect="dark" content="点击即可进行编辑" placement="bottom-start">
                        <div class="title-text" v-show="!is_taskTitleEdit" @click="is_taskTitleEdit=!is_taskTitleEdit"> {{task.title}} </div>
                    </el-tooltip>
                </div>
            </el-form-item>
            <el-form-item label="">
                <span slot="label"> <i class="el-icon-guide"></i>状态</span>
                <el-checkbox @change="saveTaskInfo()" v-if="task.status==1" v-model="task.status" :true-label="2" :false-label="1">未完成</el-checkbox>
                <el-checkbox @change="saveTaskInfo()" v-if="task.status==2" v-model="task.status" :true-label="2" :false-label="1">已完成</el-checkbox>
            </el-form-item>

            <el-form-item label="">
                <span slot="label"> <i class="el-icon-date"></i>起止时间</span>

                <el-date-picker style="width:278px" size="mini" v-model="time" :default-value="[new Date() ,new Date() ]" @change="saveTaskTime()" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['8:00:00', '17:00:00']">
                </el-date-picker>

                <!-- <el-date-picker v-model="task.start_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="saveTaskInfo()" default-time="8:00:00">
                    </el-date-picker> -->
            </el-form-item>
            <el-form-item label="">
                <span slot="label"> <i class="el-icon-bell"></i>优先级</span>
                <el-dropdown trigger="click" @command="updateTaskLevel">
                    <span class="el-dropdown-link">
                            <el-button type="info"    plain v-if="task.level==1" size="mini">普通</el-button>
                            <el-button type="warning" plain v-if="task.level==2" size="mini">紧急</el-button>
                            <el-button type="danger"  plain v-if="task.level==3" size="mini">非常紧急</el-button>
                        </span>
                    <el-dropdown-menu slot="dropdown" class="tasl_level">
                        <el-dropdown-item command="1">
                            <el-button type="info" plain size="mini">普通</el-button>
                            <span class="tasl_level_option" v-if="task.level==1"> <i class="el-icon-check"></i> </span>
                        </el-dropdown-item>
                        <el-dropdown-item command="2">
                            <el-button type="warning" plain size="mini">紧急</el-button>
                            <span  class="tasl_level_option" v-if="task.level==2"> <i class="el-icon-check"></i> </span>
                        </el-dropdown-item>
                        <el-dropdown-item command="3">
                            <el-button type="danger" plain size="mini">非常紧急</el-button>
                            <span  class="tasl_level_option" v-if="task.level==3"> <i class="el-icon-check"></i> </span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>
            <el-form-item label="">
                <span slot="label"> <i class="el-icon-edit"></i>备注</span>

                <!-- <el-input v-show="is_taskDescEdit" type="textarea" :rows="5" placeholder="输入备注" v-model="task.desc">
                </el-input> -->
               

                <div v-if="is_taskDescEdit" class="desc_editor desc_editor_edit">
                    <quill-editor  v-model="task.desc" ref="myQuillEditor" :options="editorOption">
                    </quill-editor>
                </div>
                <el-button v-show="is_taskDescEdit" @click="is_taskDescEdit=!is_taskDescEdit">取消</el-button>
                <el-button v-show="is_taskDescEdit" @click="saveTaskDesc()" type="primary">保存</el-button>

                <el-tooltip :open-delay="1500" class="item" effect="dark" content="点击即可进行编辑" placement="bottom-start">
                     <div class="desc_editor" v-if="!is_taskDescEdit && task.desc ">
                         <div class="ql-container ql-snow" v-if="!is_taskDescEdit">
                            <div class="ql-editor" v-if="!is_taskDescEdit">
                                <div class="title-text" v-if="!is_taskDescEdit" @click="is_taskDescEdit=!is_taskDescEdit" v-html="task.desc"> </div>
                            </div>
                        </div>
                     </div>
                </el-tooltip>

                <el-button type="text" v-show="!is_taskDescEdit && !task.desc " @click="is_taskDescEdit=!is_taskDescEdit">
                    点击添加描述
                </el-button>

            </el-form-item>
        </el-form>

        <el-tabs class="task-table">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i>跟进纪录</span>
                <record :code=" $store.state.task.id" modelName="task" :dic="['进展','需求','缺陷']"></record>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-folder-opened"></i>附件</span>
                <file :code=" $store.state.task.id" modelName="task"></file>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-chat-round"></i>操作纪录</span>

            </el-tab-pane>

        </el-tabs>

    </el-row>
</slideview>
</template>
<style scoped>
.desc_editor{
    width: 751px;
}
.desc_editor_edit{
    /* height: 200px; */
}
.ql-toolbar{
    padding: 0;
}
.task-table{
    margin-bottom: 100px;
}
</style>

<script>

import slideview from '@/components/common/SlideView'
import record from '@/components/common/record'
import file from '@/components/common/file'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import {
    quillEditor
} from 'vue-quill-editor'

export default {
    components: {
        slideview: slideview,
        record,
        file,
        quillEditor,
    },
    props: {
        id: {
            type: Number
        },
        map: {
            //为表格的一行数据。用于对该行进行处理
            type: Object
        },
        oper: {
            type: String,
            // validator: function (value) {
            //     // 这个值必须匹配下列字符串中的一个，根据该字段判断进行何种操作
            //     // return ['detail'].indexOf(value) !== -1
            // }
        },
        visible: {
            //该字段控制弹出层是否显示
            type: Boolean
        }
    },
    data() {
        return {
            dialogVisible: this.visible,
            task: this.$store.state.task,
            time: [],
            is_taskTitleEdit: false,
            is_taskDescEdit: false,
            editorOption: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                         [{ header: 1 }, { header: 2 },], // 1、2 级标题
                        //   [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                           [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                        // [{
                        //     'header': 1
                        // }, {
                        //     'header': 2
                        // }],
                        // [{
                        //     'list': 'ordered'
                        // }, {
                        //     'list': 'bullet'
                        // }],
                        // [{
                        //     'script': 'sub'
                        // }, {
                        //     'script': 'super'
                        // }],
                        // [{
                        //     'indent': '-1'
                        // }, {
                        //     'indent': '+1'
                        // }],
                        // [{
                        //     'direction': 'rtl'
                        // }],
                        [{
                            'size': ['small', false, 'large', 'huge']
                        }],
                        // [{
                        //     'header': [1, 2, 3, 4, 5, 6, false]
                        // }],
                     
                      
                        ['clean'],
                        ['link', 'image']
                    ],
                   
                }
            },
        };
    },
    methods: {
        handleClose(done) {
            this.dialogVisible = false
            this.$emit('emitComponents', {
                show: false,
                name: 'taskForm'
            })
        },
        saveTaskTitle() {
            this.is_taskTitleEdit = !this.is_taskTitleEdit
            this.saveTaskInfo()
        },
        saveTaskTime() {
            if (this.time) {
                this.task.start_time = this.time[0]
                this.task.end_time = this.time[1]
            } else {
                this.task.start_time = null
                this.task.end_time = null
            }
            this.saveTaskInfo()
        },
        saveTaskDesc() {
            this.is_taskDescEdit = !this.is_taskDescEdit
            this.saveTaskInfo()
        },
        saveTaskInfo() {
            this.$store.commit('updateTaskInfo', this.task);
            this.ajax.project('updateTaskInfo', this.task);
        },
        updateTaskLevel(level) {
            console.log(level)
            this.task.level = level
            this.saveTaskInfo()
        },
        deleteTask() {
            this.$confirm("是确定否删除", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.ajax.project('deleteTaskInfo', this.task);
                // this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // });
                this.handleClose()
            }).catch(() => {})

        },
        init() {
            if (this.visible == false) {
                return false
            }
            this.task = this.$store.state.task
            if (!this.task.start_time || !this.task.end_time) {
                this.time = []
            } else {
                this.time = []
                this.time[0] = this.task.start_time
                this.time[1] = this.task.end_time
            }
        }
    },
    async created() {
        this.init()
        var _self = this;
        document.onkeydown = function (e) {
            var key = window.event.keyCode;
            if (key == 27) {
                _self.handleClose()
            }
        }
    },
    watch: {
        visible() {
            this.dialogVisible = this.visible
            this.init()
        },
        id() {
            this.init()
        },
    }
};
</script>
