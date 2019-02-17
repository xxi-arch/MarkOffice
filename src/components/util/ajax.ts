import axios from 'axios'
import router from '../../router'
let config = {
    'url': '/serve/index.php?s='
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
                    return false
                }
            }],
            headers: {
                'Content-Type': 'multipart/form-data;charset=UTF-8',
            }
        }
        this.axiosConfig = {}
    }

    public async auth(subpath: string, paras?: any) {
        let tmp = await this.postrequest('/index/index/index/' + subpath, paras);
        return tmp;
    }

    public async loadDic(){
        let tmp = await this.postrequest('/index/index/dic/',"");
        return tmp;
    }


    public async postrequest(url: string, paras: any) {
        let tmp: any = await axios.post(this.baseurl + url, paras, this.axiosConfig)
        return tmp.data;
    }

    public verifycode() {
        let tmp = this.baseurl + '/service/auth/verifycode?r=' + Math.random();
        return tmp
    }



    public async user(subpath: string, paras?: any) {
        let tmp = await this.postrequest('/index/user/' + subpath, paras);
        return tmp;
    }

    public async project(subpath: string, paras?: any) {
        let tmp = await this.postrequest('/index/project/' + subpath, paras);
        return tmp;
    }

















}


export default ajax 