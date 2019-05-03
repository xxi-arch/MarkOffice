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
        required: true,
        message: '年龄不能为空'
    }]
}


interface exp {
    model: {
        name: string,
        module: string
        ajaxModel: string
        detailTitle: string
        createTitle: string
        updateTitle: string
    }
    field: {}
}


export let info: exp = {model, field}