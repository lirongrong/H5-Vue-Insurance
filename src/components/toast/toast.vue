<template>
    <div class="toast-top">{{msg}}</div>
</template>
<script>
export default { 
    props:['msg']
}
</script>
<style>
.toast-top{ background: #f44336; position: fixed; top:0; left: 0; right: 0; color: #fff;line-height: .3rem; padding: .1rem; z-index: 10000;}
</style>


