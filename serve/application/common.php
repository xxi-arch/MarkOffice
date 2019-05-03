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
function result($result=1,$data=[],$total=0){
    $res['data']=$data;
    $res['meta']['result']=$result;
    $res['meta']['total']=$total;
    $res['errors']['info']='';
 
    return json($res);
}

function result_select($data=[],$total=0,$result=1,$debug){
    $res['data']=$data;
    $res['meta']['result']=$result;
    $res['meta']['total']=$total;
    $res['errors']['info']='';
    $res['errors']['debug']=$debug;
    return json($res);
}