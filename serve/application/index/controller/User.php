<?php
namespace app\index\controller;
use think\Db;
use think\Controller;
class User extends Controller
{
    public function select($limit=10,$page=1)
    {
        $map=[];
        if(input('status')){
            $map[]=['status','=',input('status')];
        }
        if(input('name')){
            $map[]= ['name','like','%'.input('name').'%'];
        }
        if(input('id')){
            $map[]= ['id','=',input('id')];
        }
        $total= Db::name('user')->where($map)->count();
        $res=Db::name('user')->where($map)->order('id desc')->limit($limit)->page($page)->select();
        $debug['sql']=Db::name('user')->getLastSql();
        return result_select($res,$total,1,$debug);
    }
    public function create()
    {
        $res= Db::name('user')->insert(input());
        return result($res);
    }
    public function update()
    {
        $res= Db::name('user')->update(input());
        return result($res);
    }
    public function delete()
    {
        $res= Db::name('user')->where('id',input('id'))->delete();
        return result($res);
    }
}