<template>
<div>
<div  class="project_type " >
    <el-row :gutter="20">
         <el-col :span="12" >
              <el-row :gutter="20">
             <el-col :span="12" >
                 <span class="project_title">
                      <i title="点击收藏该项目" class="el-icon-star-off pointer" ></i> 
                      
                      <!-- el-icon-star-on -->
                       <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                             {{$store.state.project.title}} <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu style="min-width:200px;" slot="dropdown">
                            <el-dropdown-item >项目1xxxxxxxxx</el-dropdown-item>
                            <el-dropdown-item >项目2</el-dropdown-item>
                            <el-dropdown-item >项目3</el-dropdown-item>
                  
                        </el-dropdown-menu>
                        </el-dropdown>
                 </span>
                
                 
             </el-col>
              <el-col :span="12" class="right">
                  <el-radio-group v-model="stage_type"  class="right" size="small">
                    <el-radio-button label="1">任务</el-radio-button>
                    <el-radio-button label="2">需求</el-radio-button>
                    <el-radio-button label="3">缺陷</el-radio-button>
                </el-radio-group>
             </el-col>
               </el-row>
                <!-- <el-button type="text" icon="">新建任务组</el-button> -->
         </el-col>
         <el-col :span="12" class="project_type_right right" >
             <i class="el-icon-setting pointer" ></i>
             <!-- <el-button   size="mini"  type="text" plain icon="el-icon-setting"></el-button> -->
         </el-col>
    </el-row>
  </div>
<div id="projectMain">




<el-row class="object_main" :gutter="20">
    <!-- <draggable :list="$store.state.stages " > -->
        <!-- <draggable :list="$store.state.stages "
                       :options="{group:'stages',filter:'.undraggables',handle:'.ui-sortable-handle',ghostClass:'stage-ghost',animation: 200,forceFallback:false}"
                       id="board-scrum-stages" class="board-scrum-stages" :move="stageMove" @update="stageSort"> -->


        <el-col :span="1" class="task_list" v-for="  (s,index) in $store.state.stages  " :key="index">
            <el-row>
                <div>
                    <span class="title_name">{{s.text}}</span>
                    <span class="title_amount">{{stageNum(s.id)}}</span>
                    <el-dropdown trigger="click" size="medium" class="task_list_option">
                        <span class="el-dropdown-link">
                                <el-button icon="el-icon-more" class="task-icon-more"  type="text"></el-button>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><i class="el-icon-document" divided> 编辑列表</i></el-dropdown-item>
                            <el-dropdown-item><i class="el-icon-news" divided></i> 在此后添加新列表</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

                <div  :stage_id="s.id" >
                    <draggable 
                    :list="$store.state.tasks"
                    group="task"
                    :forceFallback="false"
                    @change="change"
                    @end="end"
                    :move="move"
                     class="list-group"
                    >

                    <template  v-for="  (t,task_index) in $store.state.tasks">
                            <el-card  class="list-group-item task-card  " 
                            v-if=" t.stage==s.id  && t.status!=2 " :id="t.id" :sssss="task_index" :key="t.id">
                                <div class="task-priority bg-priority-0" v-if="t.level==1"></div>
                                <div class="task-priority bg-priority-1" v-if="t.level==2"></div>
                                <div class="task-priority bg-priority-2" v-if="t.level==3"></div>
                                <el-col :span="2">
                                    <el-checkbox class="task_status_checkbox check-box" size="medium" @change="saveTaskInfo(t)" v-model="t.status" :true-label="2" :false-label="1"></el-checkbox>
                                </el-col>
                                <el-col :span="20" class="task-content-set">
                                    <header class="task-content-wrapper pointer" href="#" @click="taskForm_visible(t,s)" 
                                    >
                                    <span class="task-content-text"  >{{t.title}}</span>
                                    </header>
                                    <div class="task-infos">
                                        <el-tooltip :open-delay="1000" class="item" effect="light" :content="t.start_time +'到'+ t.end_time " placement="top-start">
                                            <span v-if="t.start_time" class="task-wrapper"><i class="el-icon-date"></i></span>
                                        </el-tooltip>
                                        <!-- <span class="task-wrapper"><i class="el-icon-document"></i>2/10</span> -->
                                        <!-- <span class="task-wrapper"><i class="el-icon-picture"></i></span>
                                    <span class="task-wrapper"><i class="el-icon-news"></i></span> -->
                                    </div>
                                </el-col>
                                <el-col :span="2">
                                    <el-tooltip :open-delay="500" class="item" effect="light" :content="t.create_user_name" placement="top-start">
                                        <span class="task_user_img" style="background-image: url('https://striker.teambition.net/thumbnail/11176478146bfbf43acbf94f7024ea691725/w/200/h/200');"></span>
                                    </el-tooltip>
                                </el-col>
                            </el-card>
                    </template>

                    <template  v-for="  (t,task_index) in $store.state.tasks">
                            <el-card  class="list-group-item task-card done " 

                            v-if=" t.stage==s.id  && t.status==2 " :id="t.id" :sssss="task_index" :key="t.id">
                                <el-col :span="2">
                                    <el-checkbox class="task_status_checkbox check-box" size="medium" @change="saveTaskInfo(t)" v-model="t.status" :true-label="2" :false-label="1"></el-checkbox>
                                </el-col>
                                <el-col :span="20" class="task-content-set">
                                    <header class="task-content-wrapper pointer" href="#" @click="taskForm_visible(t,s)" 
                                    >
                                    <span class="task-content-text"  >{{t.title}}</span>
                                    </header>
                                    <div class="task-infos">
                                    </div>
                                </el-col>
                                <el-col :span="2">
                                    <el-tooltip :open-delay="500" class="item" effect="light" :content="t.create_user_name" placement="top-start">
                                        <span class="task_user_img" style="background-image: url('https://striker.teambition.net/thumbnail/11176478146bfbf43acbf94f7024ea691725/w/200/h/200');"></span>
                                    </el-tooltip>
                                </el-col>
                            </el-card>
                    </template>



                     </draggable>


                </div>

                <div>
                    <el-card v-if="create.stage!= s.id && s.is_create==1 " class="task-card  task-card-create-button pointer">
                        <a  class=" task-card-create-button-span " href="javascript:;"  @click="show_create_task(s)">
                            <i class="el-icon-plus"></i>
                        </a>
                        <!-- <el-button  icon="el-icon-plus" type="text"></el-button> -->
                    </el-card>

                    <el-card class="task-card create-card" v-if="create.stage == s.id  ">
                        <div class="create-iteam">
                            <el-input @keyup.enter.native="createTask(s)" :autofocus="true" ref="createtextrea" type="textarea" :rows="2" placeholder="请输入内容" v-model="createTaskText">
                            </el-input>
                        </div>
                        <div class="create-iteam">
                            <!-- <div>
                                <user :visible="userModule.visible" :map="userModule.map" @emitComponents="emitComponents"></user>
                            </div> -->
                            <div class="right">
                                <el-button @click="cancelCreateTask()" size="mini">取消</el-button>
                                <el-button type="primary" size="mini" @click="createTask(s)">创建</el-button>
                            </div>
                        </div>
                    </el-card>

                </div>

            </el-row>
        </el-col>
   <!-- </draggable> -->
    </el-row>

    <taskForm v-if="taskForm.visible " :id="taskForm.id" :oper="taskForm.oper" :visible="taskForm.visible" :map="taskForm.map" @emitComponents="emitComponents"></taskForm>

</div>
</div>
</template>

<script>
let ajaxOper = 'project'
let selectItem = {
    status: '',
    name: '',
    mid: '',
    limit: 0,
    page: 0,
}

import draggable from 'vuedraggable'
import user from '@/components/common/user'
import task from '@/views/project/task.vue'

export default {
    components: {
        user: user,
        taskForm: task,
        draggable,
    },
    data() {
        return {
            userModule: {
                visible: false,
                map: [1, 2]
            },
            pagination: {
                limit: this.$store.state.pagination.pagerow,
                page: this.$store.state.pagination.pageno
            },
            selectItem: this.util.copy(selectItem),
            list: {
                row: [],
                total: 0
            },
            createTaskText: '',
            visible2: false,

            stage: [],

            task: [],
            create: {
                stage: '',
            },
            taskForm: {
                visible: false,
                map: {},
                id: -1,
            },
            stage_type:'1',// 1 任务 2 需求 3缺陷
            taskStages:[],
            options:{group:'task',ghostClass:'task-ghost',dragClass:'task-drag',fallbackClass:'task-drag',forceFallback:false}
        };
    },
    computed: {
        stageNum() {
            let this_ = this
            return function (stage) {
                let num = 0;
                for (let i = 0; i < this_.$store.state.tasks.length; i++) {
                    const element = this_.$store.state.tasks[i];
                    if (element.stage == stage) {
                        num++
                    }
                }
                return num
            }
        },
        taskVuex:{
            get(){
                return this.$store.state.tasks
            },
            set(value){
                // console.log('save vuex task :',value)
            }
        },
      
    },
    methods: {
        async init() {
            let selectItem = this.getSelectItem();
            if (!selectItem) {
                return false;
            }
            let res = await this.ajax.project("project_task", selectItem);
            this.$store.commit('updateProjestInfo', {
                tasks: res.task,
                stages: res.stage,
                project:res.project,
            });
            this.createTaskText = ""

            this.getTaskStages();
        },
        getTaskStages(){
            let stage=this.$store.state.stages
            let task=this.$store.state.tasks
            for (let i = 0; i < stage.length; i++) {
                const s = stage[i];
                stage[i]['tasks']=[]
                for (let n = 0; n < task.length; n++) {
                    const t = task[n];
                    if(s.id==t.stage){
                        stage[i]['tasks'].push(t)
                    }
                }
            }
            
            this.taskStages=stage
            // return stage;
        },
        //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
        change: function (evt) {
        // console.log('change',evt)
        },
        //start ,end ,add,update, sort, remove 得到的都差不多
        start: function (evt) {
        // console.log('start',evt)
        },
         end: async function (event) {
        // console.log('end',event)
            const toStageCode = event.to.parentNode.getAttribute('stage_id');
            let codes = '';
            for (let i = 0, len = event.to.children.length; i < len; i++) {
                codes += ',' + event.to.children[i].getAttribute('id');
            }
            let task=-1
            let oper='sort'
            if(event.to!=event.from){
                //移动到别的stage下  taskStoreStage
                task=event.item.getAttribute('id')
                await this.ajax.project('taskStoreStage', {
                    task:task,
                    stage:toStageCode,
                });
            }else{
                //排序   taskStoreMove
                // console.log(codes.substr(1),toStageCode )
                await this.ajax.project('taskStoreMove', {
                    ids:codes.substr(1),
                    stage:toStageCode,
                });
            }
            this.init();

        },
        move: function (evt, originalEvent) {
        //   console.log(evt)
        // console.log("from move ",evt,originalEvent) //鼠标位置
        },
    
        stageMove(evt) {
            // console.log( evt.draggedContext.element.code, evt.relatedContext.element.code)
            this.preCode = evt.draggedContext.element.code;
            this.nextCode = evt.relatedContext.element.code;
        },
        stageSort() {
             sort(this.preCode, this.nextCode, this.code);
        },
   
        taskForm_visible(task, stage) {
            // console.log('task LIst ', task)
            this.taskForm.visible = true;
            this.taskForm.map.task = task;
            this.taskForm.map.stage = stage;
            this.taskForm.id = task.id;
            this.$store.commit('updateTaskInfo', task);
            this.$store.commit('updateStageInfo', stage);
        },
        saveTaskInfo(task) {
            this.$store.commit('updateTaskInfo', task);
            this.ajax.project('updateTaskInfo', task);
        },
        getSelectItem() {
            let selectItem = this.selectItem
            selectItem.mid = this.$route.params.index
            selectItem.limit = this.pagination.limit
            selectItem.page = this.pagination.page
            return selectItem;
        },
        async show_create_task(stage) {
            this.create.stage = stage.id
        },
        async createTask(stage) {
            if (!this.createTaskText.trim()) {
                return false
            }
            let res = await this.ajax.project("createTask", {
                id_project: stage.id_project,
                stage: stage.id,
                title: this.createTaskText,
            });
            this.init();
        },
        test() {

        },
        cancelCreateTask() {
            this.create.stage = ''
        },
        emitComponents(n) {
            this[n.name].visible = false;
            this[n.name].map = {};
            this.init();
        },

    },
    async created() {
        this.init();
    },

};
</script>

 <style scoped>
 #projectMain{
     margin-top: 37px;
 }
.project_type{
    /* margin-left: 10px; */
    padding: 5px;
    /* padding-left: 10px; */
    width: 100%;
    position: absolute;
    top: 1px;
    left: 0px;;
    background-color: #FFF;
    background-color:hsla(0,0%,100%,.95);
    /* text-align: center; */
    margin-bottom: 2px;
    box-shadow: 0 2px 3px rgba(0,0,0,0.05);
}
.project_type .project_type_right{
    padding-right: 40px !important;
}
.project_title{
    color: #606266;
    font-weight: 500;
    line-height: 30px;
    margin-left: 20px;
    font-size: 14px;
}
</style>

