<template>
    <div > 
        <navigation :headtitle="headtitle" :isNaShow="isNaShow" :backUrl="backUrl"></navigation>
        <div class="mt50">
            <div v-for="(item,index) in orderlist" :key="index" class="bg_white border_bottom p10" style="margin-bottom:.06rem;">
                <div class='rr-flex rr-flex-align-center'>
                    <p class='rr-flex__item f16'>{{item.productName}}</p>
                    <p >{{item.orderID}}</p>
                </div> 
                <div class='rr-flex mt05'>
                    <div class='rr-flex__item tl'>
                        <p class='f14 col333'>{{item.beiBaoRen}}</p>
                        <p class='f12 col999'>被保人</p>
                    </div>
                    <div class='rr-flex__item tc'>
                        <p class='f14 col333'>{{item.baoE}}</p>
                        <p class='f12 col999'>保额</p>
                    </div>
                    <div class='rr-flex__item tr'>
                        <p class='f14 col333'>{{item.qiXian}}</p>
                        <p class='f12 col999'>投保期限</p>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>
<script>
import Navigation from '../../components/Navigation'
export default {
    data(){
        return{
            isNaShow:true,
            backUrl:'/userindex',
            headtitle:'我的保单',
            orderlist: [
                {
                    orderID: "1",
                    productName: '定期寿险',
                    beiBaoRen: '猪八戒',
                    baoE: '10000',
                    qiXian: '100年'
                },
                {
                    orderID: "2",
                    productName: '航空险',
                    beiBaoRen: '孙悟空',
                    baoE: '10000',
                    qiXian: '100年'
                },
                {
                    orderID: "3",
                    productName: '交通险',
                    beiBaoRen: '唐僧',
                    baoE: '10000',
                    qiXian: '100年'
                },
                {
                    orderID: "4",
                    productName: '健康险',
                    beiBaoRen: '沙和尚',
                    baoE: '10000',
                    qiXian: '100年'
                } 
            ]
        }
    },
    components:{
        'navigation':Navigation
    }
}
</script>
<style> 
</style>
