import toast from './toast.vue'
export default {
    install:function(Vue){
        Vue.component("toast",toast);
        Vue.prototype.$toast = (_this,msg) =>{
            _this.msg = msg;
            _this.isShowMsg = true;
            setTimeout(function(){
                _this.msg = '';
                _this.isShowMsg = false;
            },3000)
        };
    }
}