<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件
/**
 * resule 1 成功 0失败
 * data 返回的数据list
 * total  返回数据条数
 */
function result($result=1,$data=[],$total=0,$message="",$sql=""){
    $res['data']=$data;
    $res['meta']['result']=$result;
    $res['meta']['total']=$total;
    $res['errors']['info']=$message;
    $res['errors']['debug']=$sql;
    return json($res);
}

function resError($message){
    return result(0,[],0,$message);
}
function resSuccess($result,$sql=""){
    return result($result,[],0,'',$sql);
}
function result_select($data=[],$total=0,$result=1,$debug){
    $res['data']=$data;
    $res['meta']['result']=$result;
    $res['meta']['total']=$total;
    $res['errors']['info']='';
    $res['errors']['debug']=$debug;
    return json($res);
}