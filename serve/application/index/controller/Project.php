<?php
namespace app\index\controller;
use think\Db;
use think\Controller;
class Project extends Controller
{
    public function index(){

    }
    public function project_list(){
        $sql=" SELECT id,md5(id) as mid ,title  from t_project where status='1' ";
        $res=Db::query($sql);
        return json($res);
    }
    public function project_task($mid){
        $res['task']=Db::query("SELECT * FROM t_project_task WHERE MD5(id_project)='$mid'  and enable=1  ");
        $res['stage']=Db::query("SELECT * FROM t_project_stage WHERE MD5(id_project)='$mid' ");
        return json($res);
    }
    public function get_projict_user($userArray){
        
    }
}