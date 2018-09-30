<template>
    <div class="rr-flex bottom-navigation tc">
        <router-link to="/" class="rr-flex__item">
            <i class="iconfont icon-tuijian"></i>
            <p>推荐</p>
        </router-link>
        <router-link to="/protype" class="rr-flex__item">
            <i class="iconfont icon-fenlei"></i>
            <p>分类</p>
        </router-link>
        <router-link to="/prolist" class="rr-flex__item">
            <i class="iconfont icon-liebiao"></i>
            <p>列表</p>
        </router-link>
        <router-link to="/userindex" class="rr-flex__item">
            <i class="iconfont icon-wode"></i>
            <p>我的</p>
        </router-link>
    </div>
</template>
<style>
.bottom-navigation{position: fixed;left:0;right:0;bottom:0; border-top:.01rem solid #d5d5d5; padding:.03rem 0; background: #fff;}
.bottom-navigation .router-link-exact-active,.bottom-navigation .router-link-exact-active p{ color: #f36e27;}
</style>

