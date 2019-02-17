import moment from 'moment'
import validator from 'validator';
import phone from 'is-chinese-phone-number'

import store from '../../store'

class util {
    /** 
     * 复制对象
     * @param params 
     */
    public copy(params: any) {
        return Object.assign({}, params);
    }


  
    /**
     * 格式化表格中的字典
     * @param row 
     * @param column 
     * @param cellValue 
     * @param index 
     */
    public formatterDic(row:any, column:any, cellValue:any, index:any){
        let field=column.property.toString()
        let dic=store.state.dic[field]
        for(var i in dic) {
            if(dic[i]['id'] ==cellValue){
                return dic[i]['text']
            }
        }
        return cellValue
    }
    public detailFormatterDic(field:any,text:any):String{
        let dic=store.state.dic[field]
        for(var i in dic) {
            if(dic[i]['id'] ==text){
                return dic[i]['text']
            }
        }
        return text
    }
    public option_dic(field:any){
        let dic=store.state.dic[field]
        return dic
    }

















    public isEmail(param: string) {
        return validator.isEmail(param)
    }
    /**
     * check if the string has a length of zero.
     * @param param 
     */
    public isEmpty(param: string) {
        return validator.isEmpty(param)
    }
    /**
     * check if the string is a float.
     * @param param 
     */
    public isFloat(param: string) {
        return validator.isFloat(param.toString())
    }
    /**
     * check if the string is an IP (version 4 or 6).
     * @param param 
     */
    public isIP(param: string) {
        return validator.isIP(param)
    }
    /**
     * check if the string is an integer.
     * @param param 
     */
    public isInt(param: string) {
        return validator.isInt(param)
    }
    /**
     * check if the string is valid JSON (note: uses JSON.parse).
     * @param param 
     */
    public isJSON(param: string) {
        return validator.isJSON(param)
    }
    /**
     * check if the string is a mobile phone number,
     * @param param 
     */
    public isMobilePhone(param: string) {
        return validator.isMobilePhone(param, 'zh-CN')
    }
    /**
     * 电话号码，有无区号都可 
     * @param param 
     */
    public isTelPhone(param: string) {
        return phone.landline(param)
    }
    /**
     * check if the string is a valid port number.
     * @param param 
     */
    public isPort(param: string) {
        return validator.isPort(param)
    }
    /**
     * check if the string is an URL.
     * @param param 
     */
    public isURL(param: string) {
        return validator.isURL(param)
    }
    /**
     * 批量检测权限是否满足当前规则
     * string   port url telphone mobilephone  json  int ip float  email 
     */
    public ruler(ruler: any, row: any) {

        let res = {
            result: true,
            msg: ''
        }
        try {
            for (const i in row) {
                for (let n in ruler) {
                    let r = ruler[n]
                    if (i.toString() == n.toString() && r) {
                        if ('required' in r && r.required) {
                            if (this.isEmpty(row[i].toString())) {
                                return {
                                    result: false,
                                    msg: r.name + '不能为空'
                                }
                            }
                        }
                        if ('type' in r && r.type && row[i]) {
                            switch (r.type) {
                                case 'float':
                                    console.log(row[i])
                                    if (!this.isFloat(row[i].toString())) {
                                        return {
                                            result: false,
                                            msg: r.name + '填写不正确,请重新填写'
                                        }
                                    }
                                    break;
                                case 'mobilephone':
                                    if (!this.isMobilePhone(row[i])) {
                                        return {
                                            result: false,
                                            msg: r.name + '填写不正确,请重新填写'
                                        }
                                    }
                                    break;
                                case 'telphone':
                                    if (!this.isTelPhone(row[i])) {
                                        return {
                                            result: false,
                                            msg: r.name + '填写不正确,请重新填写'
                                        }
                                    }
                                    break;
                                case 'port':
                                    if (!this.isPort(row[i])) {
                                        return {
                                            result: false,
                                            msg: r.name + '填写不正确,请重新填写'
                                        }
                                    }
                                    break;
                                case 'url':
                                    if (!this.isURL(row[i])) {
                                        return {
                                            result: false,
                                            msg: r.name + '填写不正确,请重新填写'
                                        }
                                    }
                                    break;
                                case 'json':
                                    if (!this.isJSON(row[i])) {
                                        return {
                                            result: false,
                                            msg: r.name + '填写不正确,请重新填写'
                                        }
                                    }
                                    break;
                                case 'int':
                                    if (!this.isInt(row[i])) {
                                        return {
                                            result: false,
                                            msg: r.name + '填写不正确,请重新填写'
                                        }
                                    }
                                    break;
                                case 'ip':
                                    if (!this.isIP(row[i])) {
                                        return {
                                            result: false,
                                            msg: r.name + '填写不正确,请重新填写'
                                        }
                                    }
                                    break;
                                case 'email':
                                    if (!this.isEmail(row[i])) {
                                        return {
                                            result: false,
                                            msg: r.name + '填写不正确,请重新填写'
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
            return res
        } catch (e) {
            console.log( ruler, row,e)
        }
    }



}

export default util