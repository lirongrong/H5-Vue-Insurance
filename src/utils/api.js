
import http from './http';
import Promise from 'bluebird';

export default {
    //获取产品类型
    productTypeList () {
        const jsonType = [
            {
                id:2000,
                name:'意外保险',
                value:0,
                children:[
                    {
                        id:2018,
                        name:'人身意外保险',
                        value:0,
                        list:[]
                    },
                    {
                        id:2016,
                        name:'交通意外保险',
                        value:0,
                        list:[]
                    },
                    {
                        id:2017,
                        name:'航空意外保险',
                        value:0,
                        list:[]
                    }
                ]
            },
            {
                id:2001,
                name:'旅游保险',
                value:0,
                children:[
                    {
                        id:2019,
                        name:'申根签证保险',
                        value:0,
                        list:[]
                    },
                    {
                        id:2020,
                        name:'境外旅行保险',
                        value:0,
                        list:[]
                    },
                    {
                        id:2021,
                        name:'国内旅游保险',
                        value:0,
                        list:[]
                    },
                    {
                        id:2022,
                        name:'出国留学保险',
                        value:0,
                        list:[]
                    },
                    {
                        id:2041,
                        name:'户外运动保险',
                        value:0,
                        list:[]
                    }
                ]
            },
            {
                id:2008,
                name:'家财保险',
                value:0,
                children:[
                    {
                        id:2034,
                        name:'自住型家财险',
                        value:0,
                        list:[]
                    },
                    {
                        id:2035,
                        name:'出租型家财险',
                        value:0,
                        list:[]
                    },
                    {
                        id:2036,
                        name:'承租型家财险',
                        value:0,
                        list:[]
                    },
                    {
                        id:2037,
                        name:'网店专用型家财险',
                        value:0,
                        list:[]
                    }
                ]
            },
            {
                id:2002,
                name:'健康保险',
                value:0,
                children:[
                    {
                        id:2027,
                        name:'重大疾病保险',
                        value:0,
                        list:[]
                    },
                    {
                        id:2028,
                        name:'住院医疗保险',
                        value:0,
                        list:[]
                    },
                    {
                        id:2025,
                        name:'护理保险',
                        value:0,
                        list:[]
                    },
                    {
                        id:2026,
                        name:'疾病保险',
                        value:0,
                        list:[]
                    }
                ]
            },
            {
                id:2006,
                name:'人寿保险',
                value:0,
                children:[
                    {
                        id:2029,
                        name:'定期寿险',
                        value:0,
                        list:[]
                    },
                    {
                        id:2030,
                        name:'终身寿险',
                        value:0,
                        list:[]
                    },
                    {
                        id:2032,
                        name:'两全保险',
                        value:0,
                        list:[]
                    }
                ]
            },
        ]
        http.post('productList').then(
            function(e){
                let arr = e.data.data.products;
                for(let i in arr){
                    for(let v in jsonType){
                        if(jsonType[v].id == arr[i].fristCategory ){
                            jsonType[v].value++;
                            for(let s in jsonType[v].children){
                                if(jsonType[v].children[s].id == arr[i].secondCategory){
                                    jsonType[v].children[s].value++;
                                    jsonType[v].children[s].list.push(arr[i]);
                                }
                            }
                        }
                    }
                }
                console.log("成功");
                //存入localstorage
                localStorage.setItem("proTypeList",JSON.stringify(jsonType));
            }
        ).catch(
            function(){
                console.log("失败");
            }
        ); 
        return jsonType;
    },
    //证件类型枚举
    cardType(){
        const cardType = [
            {
                id:'1',
                value:'身份证',
            },
            {
                id:'2',
                value:'护照',
            },
            {
                id:'99',
                value:'其他'
            }
        ];
        return cardType;
    },
    //投保人与被保人关系
    relation(){
        const relation = [
            {
                id:'1',
                value:'本人'
            },
            {
                id:'2',
                value:'妻子'
            },
            {
                id:'3',
                value:'丈夫'
            },
            {
                id:'4',
                value:'儿子'
            },
            {
                id:'5',
                value:'女儿'
            },
            {
                id:'6',
                value:'父亲',
            },
            {
                id:'7',
                value:'母亲'
            },
            {
                id:'99',
                value:'其他'
            }
        ]
        return relation;
    }
} 

// //获取产品的默认试算条件
// export const dataDefaultTrial = (caseCode) => fetch('defaultTrial',{
//     caseCode:caseCode,
// },'POST');

// //获取产品的投保省份
// export const dataProArea = (caseCode,areaCode) => {
//     return new Promise(function(resolve,reject){
//         if(areaCode==undefined || areaCode=="" || areaCode == null){
//             resolve(
//                 fetch('productInsuredArea',{
//                     caseCode:caseCode
//                 },'POST')
//             );
//         }else if(areaCode){
//             resolve(
//                 fetch('productInsuredArea',{
//                     caseCode:caseCode,
//                     areaCode:areaCode
//                 },'POST')
//             );
//         }else{
//             reject("失败")
//         }
//     })
// }
