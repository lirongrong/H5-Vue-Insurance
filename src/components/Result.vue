<template>
    <div>
        <div class="result">
            <p class="f18"><i class="iconfont icon-duigou colred mr10"></i>{{retitle}}</p>
            <p class="f14">{{recontent}}</p>
            <mu-flex justify-content="center" align-items="center">
                <router-link :to="btnUrl">
                    <mu-button full-width color="primary" class="rr-btn">{{btntitle}}</mu-button>
                </router-link>
            </mu-flex>
        </div>
    </div>
</template>
<script>
export default { 
    props:['retitle','recontent','btntitle','btnUrl']
}
</script>

<style>
.result{ padding:.1rem; text-align: center; line-height: .3rem;position: absolute;
top:30%;width: 100%;
}
.result .d-flex{ margin-top:.1rem;} 
</style>

