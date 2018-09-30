<template>
    <div>
        <header class="rr-flex">
            <div class=" rr-flex__item tl">
                <router-link :to="backUrl" v-if="isNaShow">
                    <i class="iconfont icon-fanhui ml10"></i>
                </router-link>
            </div>
            <div class="f16 rr-flex__item tc ">{{headtitle}}</div>
            <div class="rr-flex__item"></div>
        </header>
    </div>
</template>
<script>
export default {
    props:['headtitle','backUrl','isNaShow']
}
</script>

<style scoped>
header{
    position: fixed;top:0;left:0;right:0; background: #fff; height: .4rem; line-height: .4rem; z-index: 1000; border-bottom:.01rem solid #f5f5f5;
}
</style>

