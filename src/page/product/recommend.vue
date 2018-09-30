<template>
    <div>
        <navigation :headtitle="headtitle" :isNaShow="isNaShow" :backUrl="backUrl"></navigation>
        <!--search-->
        <!-- <input class="common_input" placeholder="请输入内容" :value="searchValue" @keyup.enter="btnSearch"/> -->
        <!--tab-->
        <product-recommend-tab class="mt50"></product-recommend-tab>
        <!--recommendlist-->
        <div class="bg_white mt10 mb10">
            <div class="tc f12 subtitle">为你推荐</div>
            <router-link :to="{path:'/prodetail',query:{caseCode:item.caseCode}}" class="rr-flex pro_li" v-for="(item,index) in recommendList" :key="index" :id="item.caseCode"> 
                <img src="../../assets/prolist.jpg" class=" proli_img"/>
                <div class="rr-flex__item proli_text">
                    <h2 class="f12 col333 mt05">{{item.prodName}}</h2>
                    <p v-for="(items,indexs) in item.detail.features" :key="indexs" class="col999">
                        <i class="iconfont icon-duigou"></i>
                        {{items.content}}<br/>
                    </p>
                </div>
                <div class="mt05 rr-flex rr-flex-align-center mr10">
                    <span class="f16 colred">￥{{item.detail.price | Fen2Yuan(2)}}</span>
                </div>
            </router-link>
        </div> 
        <!--footer-->
        <global-footer></global-footer>
        <bottom-navigator></bottom-navigator>
    </div>
</template>
<script>
import BottomNavigation from '../../components/BottomNavigation'
import Navigation from '../../components/Navigation'
import ProductRecommendTab from '../../components/ProductRecommendTab' 
import Footer from '../../components/Footer'
import http from '../../utils/http'
import api from '../../utils/api'
export default {  
    data(){
        return{
            isNaShow:false,
            backUrl:'',
            headtitle:'推荐产品',
            searchValue:'',
            caseCodeList:['QX000321123303','QX000000002726','QX000000127254','QX000000127127'],//推荐的四款产品
            recommendList:[],
        }
    },
    components:{
        'product-recommend-tab':ProductRecommendTab,
        'global-footer':Footer,
        'bottom-navigator':BottomNavigation,
        'navigation':Navigation
    },
    beforeCreated(){
        
    },
    created() {
        this.init();
    },
    mounted(){
        // this.cacheProList();
        this.cachProType();
    },
    methods:{
        init(){
            var _this = this;
            http.get('insurance/getHomeProduct').then(res=>{
                _this.recommendList = res.data;
                console.log(res);
            })
            // for(let i in _this.caseCodeList){
            //     http.post('productDetail',{
            //         caseCode:_this.caseCodeList[i],
            //         platformType:1
            //     }).then(
            //         function(e){
            //             _this.recommendList.push(e.data.data);
            //             //console.log(_this.recommendList);
            //             console.log("成功");
            //         }
            //     ).catch(
            //         function(){
            //             console.log("失败");
            //         }
            //     );
            // }
        },
        //搜索
        btnSearch:function(){

        },
        // cacheProList(){
        //     http.get('insurance/getProduct',{
        //         pageIndex:1,
        //         pageSize:5,
        //         sort:0,
        //     }).then(function(e){
        //         console.log(e);
        //         let list = e.data;
        //         localStorage.setItem('proList',JSON.stringify(list));
        //     })
        // },
        cachProType(){
            // api.productTypeList();
            http.get('insurance/getCategorys').then(function(e){
                console.log(e);
                let list = e.data;
                localStorage.setItem('proTypeList',JSON.stringify(list));
            })
        }
    }
}
</script>
<style scoped>
.proli_img{ width: 120px; height: 80px;}
.proli_text{ font-size: 10px; color: #999; margin: 0 10px;}
.pro_li{ border-top:4px solid #f5f5f5;}
.iconfont{ font-size: 10px; color: red;}
.common_input{ margin-top:.5rem;}
</style>
