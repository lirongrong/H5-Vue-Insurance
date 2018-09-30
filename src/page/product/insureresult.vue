<template>
    <div>
        <navigation :headtitle="headtitle" :isNaShow="isNaShow" :backUrl="backUrl"></navigation>
        <result :retitle="retitle" :recontent="recontent" :btntitle="btntitle" :btnUrl="btnUrl"></result>
    </div>
</template>

<script>
import Navigation from '../../components/Navigation'
import Result from '../../components/Result'
export default {
    data(){
        return{
            isNaShow:true,
            backUrl:'/proindex',
            headtitle:'投保结果',
            retitle:'保单提交成功',
            recontent:'您的保单已提交，3个工作日内我们会联系到您',
            btntitle:'返回产品列表',
            btnUrl:'/prolist'
        }
    },
    components:{
        'navigation':Navigation,
        'result':Result,
    }
}
</script>

<style>

</style>
