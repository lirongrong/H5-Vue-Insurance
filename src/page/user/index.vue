<template>
    <div>
        <!--我的-->
        <div class="content rr">
            <div class="user_top pr">
                <img id="imgPhoto" src="../../assets/prolist.jpg" class="user_img" />
                <input id="flPhoto" type="file" />
                <!--<span id="flPhoto_text">更换头像</span>-->
                <p class="tc user_text" id="name" data-bind="text:name">会员</p>
                <div class="user_jifen pa tr ">
                    <span class="fl f12 ml10" >点击头像可替换图片</span>
                    <span class="fr redirect f12 " >
                        <router-link to="/useredit" class="colfff">我的资料 ></router-link>
                    </span>
                    
                </div>
            </div>
            <div class="user_mid clearfix">
                <span class="fl" style="margin-top: 6px;">投保前请认证您的信息</span>
                <router-link to="/userauth">
                    <a class="btn_blue fr colorange" id="btnSignIn" style="margin-top: 4px;">认证 ></a>
                </router-link>
            </div>
            <div class="user_ul clearfix">
                <router-link to="/userorderlist">
                    <div class="fl per_25 item-link tc redirect" data-url="user-product-index.html" data-no-cache="true">
                        <i class="iconfont icon-wodechanpin"></i><br />
                        <span class="mt8">我的保单</span>
                    </div>
                </router-link>
                <router-link to="">
                    <div class="fl per_25 item-link tc redirect" data-url="user-product-collect.html" data-no-cache="true">
                        <i class="iconfont icon-anli"></i><br />
                        <span class="mt8">我的收藏</span>
                    </div>
                </router-link>
            </div>
            <div class="user_ul">
                <div class="user_ul_li">
                    <i class="icon icon-kefu"></i>
                    <span class="ml5">联系我们</span>
                    <i class="iconfont icon-more fr mt15"></i>
                </div>
            </div>
        </div>
        <bottom-navigation></bottom-navigation>
    </div>
</template>
<script>
import BottomNavigation from '../../components/BottomNavigation'
export default {
    components:{
        'bottom-navigation':BottomNavigation
    }
}
</script>
<style scoped>
.content.rr{ background: #fff;}
.user_top {
    background-image: url("../../assets/user_bg.jpg");
    height: 200px;
    background-size: 100% auto;
    background-position: center center;
    padding-top: 30px;
}

.user_img {
    width: 90px;
    height: 90px;
    border-radius: 80px;
    border: 6px solid;
    border-color: rgba(255,255,255,.7);
    display: block;
    margin: 0 auto;
}

.user_text {
    color: #fff;
    font-size: 18px;
    margin-top: 4px;
}

.user_jifen {
    height: 32px;
    line-height: 32px;
    background: rgba(0,0,0,.5);
    color: rgba(255,255,255,.8);
    font-size: 16px;
    bottom: 0;
    left: 0;
    right: 0;
    padding-right: 10px;
}

.user_mid {
    padding: 10px;
    height: 60px;
    border-bottom: 10px solid #f5f5f5;
}

.user_ul {
    border-bottom: 10px solid #f5f5f5;
}

    .user_ul .per_25 {
        border-right: 1px solid #f5f5f5;
        border-bottom: 1px solid #f5f5f5;
        padding: 24px 0;
    }

        .user_ul .per_25 .mt8 {
            display: block;
        }

.user_phone {
    font-size: 18px;
    margin-top: 10px;
}

.user_ul_li {
    border-bottom: 1px solid #f5f5f5;
    height: .4rem;
    line-height: .4rem;
    padding: 0 .1rem;
}

#flPhoto {
    width: 90px;
    height: 90px;
    opacity: 0;
    position: absolute;
    left: 50%;
    margin-left: -45px;
    top: 30px;
}

#flPhoto_text {
    width: 70px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    background: #0894ec;
    margin: 4px auto 0;
    display: block;
}
</style>

