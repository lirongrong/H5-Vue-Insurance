<template>
    <div>
        <!--头部-->
        <navigation :headtitle="headtitle" :isNaShow="isNaShow" :backUrl="backUrl"></navigation>
        <form class="mt50" @submit.prevent="validateBeforeSubmit">
            <div class="input-box mt20">
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem">姓名*</span>
                    <div class="rr-flex__item">
                        <input class="rr-input " name="aname" v-validate="'required|username'"  v-model.trim="userData.cName" placeholder="如需开具发票，投保人请填写发票抬头"/>
                        <p v-show="errors.has('aname')" class="colred f10">{{ errors.first('aname') }}</p>
                    </div>
                </div> 
                
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem">性别*</span>
                    <mu-flex class="select-control-row" :key="'radio ' + index" v-for="(item,index) in sex">
                        <mu-radio :value="index" v-model="userData.sex"  :label="'' + item" class="mr10"></mu-radio>
                    </mu-flex>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem">出生日期*</span>
                    <span class="rr-flex__item">
                        <mu-date-input v-model="userData.birthday" name="abirthday" v-validate="'required'" container="bottomSheet" label-float full-width></mu-date-input>
                        <p v-show="errors.has('abirthday')" class="colred f10">{{ errors.first('abirthday') }}</p>
                    </span>
                    <i class="iconfont icon-more"></i>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem" >手机号码*</span>
                    <div class="rr-flex__item">
                        <input class="rr-input "   name="amobile" v-validate="'required|mobile'" v-model.trim="userData.mobile" placeholder=""/>
                        <p v-show="errors.has('amobile')" class="colred f10">{{errors.first('amobile')}}</p>
                    </div>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem" >身份证号码*</span>
                    <div class=" rr-flex__item">
                        <input class="rr-input"   name="aidCard" v-validate="'required|idCard'" v-model.trim="userData.cardCode" placeholder="请输入有效证件号"/>
                        <p v-show="errors.has('aidCard')" class="colred f10">{{errors.first('aidCard')}}</p>
                    </div>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem" >电子邮箱*</span>
                    <div class="rr-flex__item">
                        <input class="rr-input " name="aemail" v-validate="'required|email'" v-model.trim="userData.email" placeholder="便于接收电子保单"/>
                        <p v-show="errors.has('aemail')" class="colred f10">{{errors.first('aemail')}}</p>
                    </div>
                </div>
            </div>
            <div style="margin:.1rem;" >
                <mu-button full-width color="primary" class="rr-btn"  type="submitForm">确定</mu-button>
            </div>
        </form>
    </div>
</template>
<script>
import Navigation from '../../components/Navigation'
export default {
    data(){
        return{
            isNaShow:true,
            backUrl:'/userindex',
            headtitle:'认证',
            userData:{},
            sex:['男','女']
        }
    },
    components:{
        'navigation':Navigation
    },
    methods:{
        //表单验证
        validateBeforeSubmit(){
            let _this = this;
            _this.$validator.validateAll().then((res)=>{
                if(res){
                    _this.submitForm();
                    return;
                }else{
                    console.log('请填写必填项');
                }
            });
             
        },
        //表单提交
        submitForm(){
            console.log("提交")
            console.log(this.userData);
            this.$router.push({path:'/userauthresult'})
        }
    }
}
</script>
<style scoped>

</style>

