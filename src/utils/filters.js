/* 过滤器 */
const Fen2Yuan = (price,num) => {
    if ( typeof price !== "number" || isNaN( price ) )
        return null;
    if (!num )
        return ( price / 100 );
    return ( price / 100 ).toFixed( num );
};

//封装最小值到最大值按步数遍历出的值
const MinToMax = (min,max,step) => {
    let length = (max-min)/step;
    let begin = min - step;
    let arr =[];
    for (let i=0; i<=length;i++){
        begin += step
        arr.push(begin);
    }
    return arr;
}

//date为空的时候获取的是当前的日期，date有值的时候转格式,格式为YYYY-MM-DD
const getNowFormatDate = (date) =>{
    if(date==undefined){
        var date = new Date();
    }else{
        var date = new Date(date);
    } 
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

const toTree = (data) =>{
    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
        delete item.children;
    });
    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {};
    data.forEach(function (item) {
        map[item.id] = item;
    });
    //console.log(map);
    var val = [];
    data.forEach(function (item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.parentId];
        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            (parent.children || ( parent.children = [] )).push(item);
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });
    return val;
}

//正则
const regMobile = /0?(13|14|15|17|18|19)[0-9]{9}/;//手机号码
const regEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;//电子邮箱
const regIdCard = /\d{17}[\d|x]|\d{15}/;//身份证号码

export {Fen2Yuan,MinToMax,getNowFormatDate,toTree,regMobile,regEmail,regIdCard};