<template>
    <div class="rr-flex bg_white">
        <div class="rr-flex__item tc">
            <router-link to="/protype">
                <span class="bg_round_red dib mt20">
                    <i class="iconfont icon-wodechanpin"></i>
                </span><br/>
                <span class="f12 mt10 dib col333">所有产品</span>
            </router-link>
        </div>
        <!-- <div class="rr-flex__item tc">
            <router-link to="/policysearch">
                <span class="bg_round_red dib mt20">
                    <i class="iconfont icon-sousuo"></i>
                </span><br/>
                <span class="f12 mt10 dib col333">查询保单</span>
            </router-link>
        </div> -->
        <div class="rr-flex__item tc">
            <router-link to="/chat">
                <span class="bg_round_red dib mt20">
                    <i class="iconfont icon-lingdang"></i>
                </span><br/>
                <span class="f12 mt10 dib col333">叮咚理赔</span>
            </router-link>
        </div>
    </div>
</template>
<script>
// eslint-disable-next-line
/* eslint-disable */
export default {}
</script>
<style scoped>
.bg_round_red{ width: 40px;height: 40px; line-height: 40px; text-align: center; color: #fff;border-radius: 100%; background: #F44336;}
.bg_white{ padding-bottom: 15px;}
</style>