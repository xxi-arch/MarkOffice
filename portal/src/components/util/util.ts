import moment from 'moment'
import validator from 'validator';
import phone from 'is-chinese-phone-number'
import ajax from './ajax'
import store from '../../store'
let db = new ajax();


class util {
    /** 
     * 复制对象
     * @param params 
     */
    public copy(params: any) {
        return Object.assign({}, params);
    }

    // public async getDicByName(dicName: any) {
    //     let dic
    //     if (store.state.dic[dicName]) {
    //         dic = store.state.dic[dicName]
    //     } else {
    //         let dic=await db.getAjaxDicByName(dicName);
    //         console.log(store)
    //         let obj={}
    //         // obj[dicName]=dic
    //         store.commit('appendDicInfo', {
    //             dicName:dic
    //         });
    //     }
    //     return dic

    // }

    /**
     * 格式化表格中的字典
     * @param row 一整行数据
     * @param column    字段名字
     * @param cellValue  字段的值
     * @param index      index  
     */
    public formatterDic(dic_group : any,  cellValue: any ) {
        // console.log(this)
        // console.log( row,column,cellValue,index )

        // let field = column.property.toString()
        let dic = store.state.dic[dic_group]
        if (dic) {
            for (var i in dic) {
                if (dic[i]['code'] == cellValue) {
                    return dic[i]['name']
                }
            }
        }
        return cellValue
    }
    public detailFormatterDic(field: any, text: any) {
        let dic = store.state.dic[field]
        if (!dic) {
            return text
        }
        for (var i in dic) {
            if (dic[i]['code'] == text) {
                return dic[i]['name']
            }
        }
        return text
    }

    public async option_dic(field: any) {
        return store.state.dic[field]
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




}

export default util