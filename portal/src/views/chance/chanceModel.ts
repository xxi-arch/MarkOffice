let field = {
    id: '',
    name: '',
    idcard: '',
    tel: '',
    address: '',
    email: '',
    status: '',
}

let model = {
    name: '用户管理',
    module: 'user',
    ajaxModel: 'user',
    detailTitle: '用户详情',
    createTitle: '新增用户',
    updateTitle: '修改用户',
}
let rules = {
    name: [{
        type:'number',
        required: true,
        message: '年龄不能为空'
    }]
}


interface exp {
    model: {
        /**
         * 中文名称
         */
        name: string,
        /**
         * 该模块的key，在系统中唯一存在
         */
        module: string
        /**
         * ajax类中的url
         */
        ajaxModel: string
        detailTitle: string
        createTitle: string
        updateTitle: string
    }
    field: {}
    rules:{}
}


export let info: exp = {model, field,rules}