//内置的校验规则
// after{target} - 比target要大的一个合法日期，格式(DD/MM/YYYY)
// alpha - 只包含英文字符
// alpha_dash - 可以包含英文、数字、下划线、破折号
// alpha_num - 可以包含英文和数字
// before:{target} - 和after相反
// between:{min},{max} - 在min和max之间的数字
// confirmed:{target} - 必须和target一样
// date_between:{min,max} - 日期在min和max之间
// date_format:{format} - 合法的format格式化日期
// decimal:{decimals?} - 数字，而且是decimals进制
// digits:{length} - 长度为length的数字
// dimensions:{width},{height} - 符合宽高规定的图片
// email - 不解释
// ext:[extensions] - 后缀名
// image - 图片
// in:[list] - 包含在数组list内的值
// ip - ipv4地址
// max:{length} - 最大长度为length的字符
// mimes:[list] - 文件类型
// min - max相反
// mot_in - in相反
// numeric - 只允许数字
// regex:{pattern} - 值必须符合正则pattern
// required - 不解释
// size:{kb} - 文件大小不超过
// url:{domain?} - (指定域名的)url
import {Validator} from 'vee-validate'

const dictionary = {
    zh_CN: {
        messages: {
            // <input type="text" v-model="phoneNumber" name="phone" v-validate="'required|phone'">
            required: (field) => "请输入您的" + field,
            email:() => '请填写有效邮箱地址'
        },
        // 上述messages提示信息中field显示的内容在此设置，对应标签的name属性
        attributes:{
            aname:'投保人姓名',
            abirthday:'投保人出生日期',
            amobile:'投保人手机号码',
            aidCard:'投保人身份证号码', 
            aemail:'投保人邮箱',
            iname:'被保人姓名',
            imobile:'被保人手机号码',
            iemail:'被保人邮箱',
            ibirthday:'被保人出生日期',
            iidCard:'被保人身份证号码',
            ijob:'被保人职业',
            bname:'受益人姓名',
            bbirthday:'受益人出生日期',
            bidCard:'受益人身份证号码',
            bscale:'收益比例',
        }
    }
}
Validator.updateDictionary(dictionary);

Validator.extend('username',{
    messages:{
        zh_CN:field => '请输入真实用户名'
    },
    validate:value => {
        return /[\u4e00-\u9fa5]{2,10}/.test(value) //2到10位（中文、英文、）
    }
})

Validator.extend('mobile',{
    messages:{
        zh_CN:field => '手机号码输入不正确'
    },
    validate:value => {
        return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
}) 

Validator.extend('password', {
    messages: {
        zh_CN: field => '请设置6-16位数字、字母登录密码'
    },
    validate: value => {
        return /^[0-9A-Za-z]{6,20}$/.test(value);
    }
});

Validator.extend('code', {
    messages: {
        zh_CN: field => '请输入正确的验证码'
    },
    validate: value => {
        return /[0-9]{6}/.test(value);
    }
});

Validator.extend('idCard', {
    messages: {
        zh_CN: (field) => '身份证号码不正确！'
    },
    validate: (value) => {
        var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
        var pass = true;

        if (!value || !/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
            pass = false;
        } else if (!city[value.substr(0, 2)]) {
            pass = false;
        } else {
            //18位身份证需要验证最后一位校验位
            if (value.length == 18) {
                value = value.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = value[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != value[17]) {
                    pass = false;
                }
            }
        }
        return pass;
    }
});

// Validator.extend('idCard',{
//     messages:{
//         zh_CN:field => '请输入正确的身份证号码' //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，可能为数字或字符X
//     },
//     validate:value =>{
//         return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
//     }
// })

export default Validator;