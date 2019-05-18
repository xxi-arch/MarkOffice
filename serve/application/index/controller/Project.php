<?php
namespace app\index\controller;

use think\Db;
use think\Controller;

class Project extends Controller
{
    public function index()
    { }
    public function project_list()
    {
        $sql = " SELECT id,md5(id) as mid ,title  from t_project where status='1' ";
        $res = Db::query($sql);
        return json($res);
    }
    public function project_task($mid)
    {
        $res['task'] = Db::query("SELECT * FROM t_project_task WHERE MD5(id_project)='$mid'  and enable=1  order by `order`,id ");
        $res['stage'] = Db::query("SELECT * FROM t_project_stage WHERE MD5(id_project)='$mid' ");
        $res['project']=Db::query(" SELECT * FROM t_project WHERE MD5(id) ='$mid' ")[0];
        return json($res);
    }
    public function get_projict_user($userArray)
    { }
    public function updateTaskInfo()
    {
        $res = Db::table('t_project_task')->update(input());
        $getLastSql = Db::table('t_project_task')->getLastSql();
        return resSuccess($res, $getLastSql);
    }
    public function createTask()
    {
        $res = Db::table('t_project_task')->insert(input());
        $getLastSql = Db::table('t_project_task')->getLastSql();
        return resSuccess($res, $getLastSql);
    }
    public function deleteTaskInfo()
    {
        $id = input('id');
        $res = Db::table('t_project_task')->delete($id);
        $getLastSql = Db::table('t_project_task')->getLastSql();
        return resSuccess($res, $getLastSql);
    }

    /**\
     *在当页中进行任务排序
     */
    public  function taskStoreMove()
    {
        $ids = input('ids'); //id string
        $stage = input('stage'); //stage id
        $arr = explode(",", $ids);
        for ($i = 0; $i < count($arr); $i++) {
            $data = array('id' => $arr[$i], 'order' => $i, 'stage' => $stage);
            $res = Db::table('t_project_task')->update($data);
        }
        $getLastSql = Db::table('t_project_task')->getLastSql();
        return resSuccess($res, $getLastSql);
    }
    /**
     * 把任务移动到不同的stage中
     */
    public function taskStoreStage()
    {
        $taskId = input('task'); //id string
        $stage = input('stage'); //stage id
        $maxRow = Db::Query(" select max(`order`) as max from t_project_task where stage = $stage  group by stage  ");
        $data['order'] = $maxRow ? $maxRow[0]['max'] + 1 : 0;
        $data['stage'] = $stage;
        $data['id'] = $taskId;
        $res = Db::table('t_project_task')->update($data);
        $getLastSql = Db::table('t_project_task')->getLastSql();
        return resSuccess($res, $getLastSql);
    }
}
