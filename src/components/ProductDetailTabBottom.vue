<template>
    <div class="rr-flex bg_white tc rr_tab_bottom">
        <div class="rr-flex__item">
            <i class="iconfont icon-dianhua"></i><br/>
            电话客服
        </div>
        <div class="rr-flex__item">
            <i class="iconfont icon-zaixian"></i><br/>
            在线咨询
        </div>
        <div class="rr-flex__item">
            <i class="iconfont icon-yuyue"></i><br/>
            预约顾问
        </div>
        <div class="rr-flex__item rr-btn rr-flex" style="flex:1.4;align-items: center;justify-content:center" @click="btnTouBao">
            立即投保
        </div>
    </div>
</template>
<script>
export default {
    props:["btnTouBao"],
    methods:{
        
    }
}
</script>
<style scoped>
.rr_tab_bottom{ border-top:1px solid #ddd;}
.rr_tab_bottom .rr-flex__item{ padding:.06rem 0; border-right:1px solid #ddd;}
.rr_tab_bottom .rr-flex__item:last-child{border-right:none;}
</style>


