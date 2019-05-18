import axios from 'axios'
import router from '../../router'
import store from '../../store'
import md5 from 'md5'

let config = {
    'url': '/serve/index.php?s=',
    'md5': false
}
class ajax {
    private baseurl: string
    private axiosConfig: any
    constructor() {
        this.baseurl = config.url
        this.axiosConfig = {
            transformRequest: [function (data: any) {
                var formData = new FormData();
                for (let i in data) {
                    if (Array.isArray(data[i])) {
                        for (let n in data[i]) {
                            formData.append(i, data[i][n]);
                        }
                    } else {
                        formData.append(i, data[i]);
                    }
                }
                return formData
            }],
            transformResponse: [function (data: any, headers: any) {
                try {
                    data = JSON.parse(data)
                    for (let i = 0; i < data.errors.length; i++) {
                        const element = data.errors[i]
                        if (element.code < 0) {
                            router.push('/login')
                            return false
                        }
                    }
                    return data;
                } catch (e) {
                    // alert(1)
                    return false
                }
            }],
            headers: {
                'Content-Type': 'multipart/form-data;charset=UTF-8',
            }
        }
        this.axiosConfig = {}
    }
    private async postrequest(url: string, paras: any) {
        let tmp: any = await axios.post(this.baseurl + url, paras, this.axiosConfig).catch(function (error) {
            if (error.response) {
                document.write(error.response.data)
            } else {
                console.log('Error', error.message);
            }
        });
        return tmp.data;
    }
    public getUploadUrl(){
        return this.baseurl + "/index/sysapi/uploadsend"
    }






    public async auth(subpath: string, paras?: any) {
        let tmp = await this.postrequest('/index/index/index/' + subpath, paras);
        return tmp;
    }

    public async loadDic() {
        let tmp = await this.postrequest('/index/dic/loadDic/', '');
        return tmp;
    }

    /**
     * sys_dic 跳转页面不需要重新加载的字典
     * @param dicNameString 字典名称
     */
    public async getDicByName(dicNameString: string) {
        let dicName = dicNameString.split(',')
        const sys_dic = ['enable', 'status', 'sex']
        // console.log('getDicByName', dicNameString)
        for (let i = 0; i < dicName.length; i++) {
            const element = dicName[i];
            if (store.state.dic[element] && (sys_dic.indexOf(element) > -1)) {
                return
            }
            let dic = await this.postrequest('/index/dic/getDic/', { dicName: element });

            await store.commit('appendDicInfo', {
                name: element,
                dic: dic
            });
        }

    }




    public verifycode() {
        let tmp = this.baseurl + '/service/auth/verifycode?r=' + Math.random();
        return tmp
    }


    public async baseApi(model: string, oper: string, paras?: any) {
        if (config.md5) {
            paras.model = md5(model)
            paras.oper = md5(oper)
        } else {
            paras.model = model
            paras.oper = oper
        }
        let tmp = await this.postrequest('/index/api/init', paras);
        return tmp
    }





    public async project(subpath: string, paras?: any) {
        let tmp = await this.postrequest('/index/project/' + subpath, paras);
        return tmp;
    }

    public async sys(subpath: string, paras?: any) {
        let tmp = await this.postrequest('/index/sysapi/' + subpath, paras);
        return tmp;
    }


















}


export default ajax 