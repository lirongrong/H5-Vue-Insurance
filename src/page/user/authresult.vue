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
            backUrl:'/userindex',
            headtitle:'认证结果',
            retitle:'认证成功',
            recontent:'您已通过认证,可以投保啦！',
            btntitle:'返回个人中心',
            btnUrl:'/userindex'
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
