<template>
    <div>
        <navigation :headtitle="headtitle" :isNaShow="isNaShow" :backUrl="backUrl"></navigation>
        <div class="mt50">
            <div class="bg_white mt05" v-for="(item,index) in typelist" :key="index">
                <mu-list>
                    <div class="mu-item-wrapper">
                        <i class="iconfont icon-baoxian ml10 col999"></i>
                        <span class="f14">{{item.name}}</span>
                    </div>
                </mu-list>
                <mu-list v-for="(a,i) in item.childs" :key="i" style="border-top:1px solid #f5f5f5">
                    <router-link :to="{path:'/prolist',query:{pid:item.code,pindex:index,id:a.code,name:a.name}}">
                        <mu-list-item button :ripple="false">
                            <mu-list-item-title class="f12">{{a.name}}</mu-list-item-title>
                            <mu-list-item-action>
                                <mu-badge class="rr_badge">{{a.count}}</mu-badge>
                            </mu-list-item-action>
                        </mu-list-item>
                    </router-link>
                </mu-list>
            </div>
        </div>
        <!--footer-->
        <global-footer></global-footer>
        <bottom-navigator></bottom-navigator>
    </div>
</template>
<script>
import Footer from '../../components/Footer'
import BottomNavigation from '../../components/BottomNavigation'
import Navigation from '../../components/Navigation'
export default {
    data(){
        return{
            isNaShow:false,
            backUrl:'',
            headtitle:'产品分类',
            typelist:JSON.parse(localStorage.getItem("proTypeList")),
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            //this.classlist = dataProtype();
            //console.log(this.classlist);
        }
    },
    components:{
        'global-footer':Footer,
        'bottom-navigator':BottomNavigation,
        'navigation':Navigation
    }
}
</script>
<style scoped>
.mu-list{ padding:0;}
</style>
