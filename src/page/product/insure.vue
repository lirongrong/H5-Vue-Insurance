<template>
    <div>
        <!--提示信息-->
        <toast :msg="msg" v-if="isShowMsg"></toast>
        <form @submit.prevent="validateBeforeSubmit" >
            <!--为谁投保-->
            <div class="input-box mt20">
                <div class="input-box-con-list rr-flex rr-flex-align-center" @click="openDiaSelectWho">
                    <span style="flex-basis:1rem">为谁投保</span>
                    <span class="rr-flex__item">{{trialPeople[trialIndex]}}</span>
                    <i class="iconfont icon-more"></i>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem">起保日期</span>
                    <span class="rr-flex__item">
                        <mu-date-input v-model="startDate" container="bottomSheet" label-float full-width></mu-date-input>
                    </span>
                    <i class="iconfont icon-more"></i>
                </div>
            </div>
            <!--投保人信息-->
            <div v-if="trialIndex==1" class="input-box mt20">
                <div class="input-box-title">投保人信息</div>
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem">姓名*</span>
                    <div class="rr-flex__item">
                        <input class="rr-input " name="aname" v-validate="'required|username'"  v-model.trim="applicant.cName" placeholder="如需开具发票，投保人请填写发票抬头"/>
                        <p v-show="errors.has('aname')" class="colred f10">{{ errors.first('aname') }}</p>
                    </div>
                </div> 
                
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem">性别*</span>
                    <mu-flex class="select-control-row" :key="'radio ' + index" v-for="(item,index) in sex">
                        <mu-radio :value="index" v-model="applicant.sex"  :label="'' + item" class="mr10"></mu-radio>
                    </mu-flex>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem">出生日期*</span>
                    <span class="rr-flex__item">
                        <mu-date-input v-model="applicant.birthday" name="abirthday" v-validate="'required'" container="bottomSheet" label-float full-width></mu-date-input>
                        <p v-show="errors.has('abirthday')" class="colred f10">{{ errors.first('abirthday') }}</p>
                    </span>
                    <i class="iconfont icon-more"></i>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem" >手机号码*</span>
                    <div class="rr-flex__item">
                        <input class="rr-input "   name="amobile" v-validate="'required|mobile'" v-model.trim="applicant.mobile" placeholder=""/>
                        <p v-show="errors.has('amobile')" class="colred f10">{{errors.first('amobile')}}</p>
                    </div>
                </div>
                <!-- <div class="input-box-con-list rr-flex rr-flex-align-center" @click="openDiaSelectId">
                    <span style="flex-basis:1rem" >证件类型*</span>
                    <span class="rr-flex__item" v-for="(item,index) in cardTypeValue" :key="index" v-if="item.id == applicant.cardType">{{item.value}}</span>
                    <i class="iconfont icon-more"></i>
                </div> -->
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem" >身份证号码*</span>
                    <div class=" rr-flex__item">
                        <input class="rr-input"   name="aidCard" v-validate="'required|idCard'" v-model.trim="applicant.cardCode" placeholder="请输入有效证件号"/>
                        <p v-show="errors.has('aidCard')" class="colred f10">{{errors.first('aidCard')}}</p>
                    </div>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem" >电子邮箱*</span>
                    <div class="rr-flex__item">
                        <input class="rr-input " name="aemail" v-validate="'required|email'" v-model.trim="applicant.email" placeholder="便于接收电子保单"/>
                        <p v-show="errors.has('aemail')" class="colred f10">{{errors.first('aemail')}}</p>
                    </div>
                </div>
            </div>
            <!--被保人信息-->
            <div class="input-box mt20">
                <div class="input-box-title">被保人信息</div> 
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem">姓名*</span>
                    <div class="rr-flex__item">
                        <input class="rr-input "  name="iname" v-validate="'required|username'" v-model.trim="insurants.cName" placeholder="如需开具发票，投保人请填写发票抬头"/>
                        <p v-show="errors.has('iname')" class="colred f10">{{errors.first('iname')}}</p>
                    </div>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center" @click="openDiaSelectBenePosition(1)">
                    <span style="flex-basis:1rem" >我是被保险人的*</span>
                    <div class="rr-flex__item">
                        <div v-if="insurants.relationId==item.id" name="选择类型"  v-for="(item,index) in relation" :key="index">
                            {{item.value}}
                        </div>
                    </div>
                    <i class="iconfont icon-more"></i>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem" >性别*</span>
                    <mu-flex class="select-control-row" :key="'radio ' + index" v-for="(item,index) in sex">
                        <mu-radio :value="index" v-model="insurants.sex"  :label="'' + item" class="mr10"></mu-radio>
                    </mu-flex>
                </div>
                <div v-if="trialIndex==0" class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem" >手机号码*</span>
                    <div class="rr-flex__item">
                        <input class="rr-input "  name="imobile" v-validate="'required|mobile'" v-model.trim="insurants.mobile" placeholder="" type="number"/>
                        <p v-show="errors.has('imobile')" class="colred f10">{{errors.first('imobile')}}</p>
                    </div>
                </div>
                <div v-if="trialIndex==0" class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem" >电子邮箱*</span>
                    <div class="rr-flex__item">
                        <input class="rr-input " name="iemail" v-validate="'required|email'" v-model.trim="insurants.email" placeholder="便于接收电子保单"/>
                        <p v-show="errors.has('iemail')" class="colred f10">{{errors.first('iemail')}}</p>
                    </div>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem" >出生日期*</span>
                    <span class="rr-flex__item">
                        <mu-date-input v-model="insurants.birthday" name="ibirthday" v-validate="'required'" container="bottomSheet" label-float full-width></mu-date-input>
                        <p v-show="errors.has('ibirthday')" class="colred f10">{{ errors.first('ibirthday') }}</p>
                    </span>
                    <i class="iconfont icon-more"></i>
                </div>
                <!-- <div class="input-box-con-list rr-flex rr-flex-align-center" @click="openDiaSelectId">
                    <span style="flex-basis:1rem" class="colred">证件类型</span>
                    <span class="rr-flex__item" v-for="(item,index) in cardTypeValue" :key="index" v-if="item.id == insurants.cardType">{{item.value}}</span>
                    <i class="iconfont icon-more"></i>
                </div> -->
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem">身份证号码*</span>
                    <div class="rr-flex__item">
                        <input class="rr-input " name="iidCard" v-validate="'required|idCard'" v-model.trim="insurants.cardCode" placeholder="请输入有效证件号"/>
                        <p v-show="errors.has('iidCard')" class="colred f10">{{ errors.first('iidCard') }}</p>
                    </div>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center" @click="openDiaAddress">
                    <span style="flex-basis:1rem">居住省份</span>
                    <span class="rr-flex__item">{{addressProvince}}-{{addressCity}}{{addressArea}}</span>
                    <input hidden v-model="insurants.provCityId"/>
                    <i class="iconfont icon-more"></i>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center" @click="openDiaJob">
                    <span style="flex-basis:1rem">职业*</span>
                    <span class="rr-flex__item">{{job}}</span>
                    <input hidden v-model="insurants.job" name="ijob" v-validate="'required'"/>
                    <p v-show="errors.has('ijob')" class="colred f10">{{ errors.first('ijob') }}</p>
                    <i class="iconfont icon-more"></i>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem">购买份数</span>
                    <span class="rr-flex__item">{{number}}份</span>
                </div>
            </div>
            <!--受益人信息-->
            <div class="input-box mt20"> 
                <div class="input-box-title rr-flex" >
                    <span style="flex-basis:1rem">受益人信息</span>
                </div>
                <!--选项为指定受益人才会显示-->
                <div >
                    <!-- <div class="input-box-con-list rr-flex rr-flex-align-center">
                        <span style="flex-basis:1rem;font-weight:bold">受益人1</span>
                    </div> -->
                    <div class="input-box-con-list rr-flex rr-flex-align-center">
                        <span style="flex-basis:1rem">受益人姓名*</span>
                        <div class="rr-flex__item">
                            <input class="rr-input " v-validate="'required|username'" name="bname" v-model.trim="beneficiaryInfos.cName" placeholder="姓名应与投保有效证件相符"/>
                            <p v-show="errors.has('bname')" class="colred f10">{{ errors.first('bname') }}</p>
                        </div>
                    </div>
                    <!-- <div class="input-box-con-list rr-flex rr-flex-align-center" @click="openDiaSelectBeneId">
                        <span style="flex-basis:1rem" >证件类型*</span>
                        <span class="rr-flex__item">{{beneIdType[beneIdTypeIndex]}}</span>
                        <i class="iconfont icon-more"></i>
                    </div> -->
                    <div class="input-box-con-list rr-flex rr-flex-align-center" @click="openDiaSelectBenePosition(2)">
                        <span style="flex-basis:1rem" >受益人是被保人的</span>
                        <span class="rr-flex__item" v-for="(item,index) in relation" :key="index" v-if="beneficiaryInfos.relationId==item.id">{{item.value}}</span>
                        <i class="iconfont icon-more"></i>
                    </div>
                    <div class="input-box-con-list rr-flex rr-flex-align-center">
                        <span style="flex-basis:1rem" >性别*</span>
                        <mu-flex class="select-control-row" :key="'radio ' + index" v-for="(item,index) in sex">
                            <mu-radio :value="index" v-model="beneficiaryInfos.sex"  :label="'' + item" class="mr10"></mu-radio>
                        </mu-flex>
                    </div>
                    <div class="input-box-con-list rr-flex rr-flex-align-center">
                        <span style="flex-basis:1rem" >出生日期*</span>
                        <span class="rr-flex__item">
                            <mu-date-input v-model="beneficiaryInfos.birthday" name="bbirthday" v-validate="'required'" container="bottomSheet" label-float full-width></mu-date-input>
                            <p v-show="errors.has('bbirthday')" class="colred f10">{{ errors.first('bbirthday') }}</p>
                        </span>
                        <i class="iconfont icon-more"></i>
                    </div>
                    <div class="input-box-con-list rr-flex rr-flex-align-center">
                        <span style="flex-basis:1rem" >身份证号码*</span>
                        <div class="rr-flex__item">
                            <input class="rr-input " v-validate="'required|idCard'" name="bidCard" v-model.trim="beneficiaryInfos.cardCode" placeholder="请输入有效证件号"/>
                            <p v-show="errors.has('bidCard')" class="colred f10">{{ errors.first('bidCard') }}</p>
                        </div>
                    </div>
                    <div class="input-box-con-list rr-flex rr-flex-align-center">
                        <span style="flex-basis:1rem" >收益比例*</span>
                        <div class="rr-flex__item">
                            <input class="rr-input" v-validate="'required|numeric'" name="bscale" v-model.trim="beneficiaryInfos.proportion" placeholder="请填写收益百分比" type="number"/>
                            <p v-show="errors.has('bscale')" class="colred f10">{{ errors.first('bscale') }}</p>
                        </div>
                        <span>%</span>
                    </div>
                </div>
            </div>
            <!--紧急联系人-->
            <div class="input-box mt20">
                <div class="input-box-title rr-flex"  >
                    <span>紧急联系人（选填）</span>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem">联系人姓名</span>
                    <div class="rr-flex__item">
                        <input class="rr-input" name="name" v-validate="'name'" v-model="OtherInfo.urgencyContact" placeholder="请填写真实姓名"/>
                        <p v-show="errors.has('name')" class="colred f10">{{ errors.first('name') }}</p>
                    </div>
                </div>
                <div class="input-box-con-list rr-flex rr-flex-align-center">
                    <span style="flex-basis:1rem">联系人手机号码</span>
                    <div class="rr-flex__item">
                        <input class="rr-input " name="mobile" v-validate="'mobile'" v-model="OtherInfo.urgencyContactMobile" placeholder="请输入有效的手机号码"/>
                        <p v-show="errors.has('mobile')" class="colred f10">{{ errors.first('mobile') }}</p>
                    </div>
                </div>
            </div>
            <!--声明-->
            <mu-flex class="select-control-row mt10" style="margin-bottom:.5rem;">
                <mu-checkbox v-model="normal.checkbox" :label="'我已查看并同意'"></mu-checkbox>
                <span class="colred mt04">《投保声明》</span>
            </mu-flex>
            <!--底部提交按钮-->
            <div class="rr-flex bg_white tc rr-bottom-tab">
                <div class="rr-flex__item">
                    <span>价格</span>
                </div>
                <button type="submitForm" class="rr-flex__item rr-btn rr-flex" style="flex:1.4;align-items: center;justify-content:center">
                    提交
                </button>
            </div>
        </form>
        <!--底部弹框-为谁投保-->
        <mu-bottom-sheet :open.sync="isOpenSelectWho">
            <mu-list>
                <mu-sub-header>为谁投保</mu-sub-header>
                <mu-list-item button v-for="(item,index) in trialPeople" :key="index" @click="selectWho(index)">
                    <mu-list-item-title :class="trialIndex==index?'active':''">{{item}}</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
        <!--底部弹框-证件类型-->
        <mu-bottom-sheet :open.sync="isOpenSelectId">
            <mu-list>
                <mu-sub-header>证件类型</mu-sub-header>
                <mu-list-item button v-for="(item,index) in cardTypeValue" :key="index" @click="selectId(item.id)">
                    <mu-list-item-title :class="applicant.cardType==item.id?'active':''">{{item.value}}</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
        <!--底部弹框-居住省份-->
        <div class="demo-picker-container" v-show="isOpenAddress">
            <mu-slide-picker :slots="addressSlots" :visible-item-count="5" @change="addressChange" :values="address"></mu-slide-picker>
            <div class="mu-overlay" @click="closeDiaAddress"></div>
        </div>
        <!--底部弹框-职业-->
        <mu-bottom-sheet :open.sync="isOpenSelectJob" style="top:50%; overflow-y:auto;">
            <mu-list>
                <mu-sub-header>职业</mu-sub-header>
                <mu-expansion-panel v-for="(item,index) in jobList" :key="index">
                    <div slot="header" :id="item.id">{{item.name}}</div>
                    <mu-expansion-panel v-for="(items,indexs) in item.children" :key="indexs">
                        <div slot="header" :id="items.id">{{items.name}}</div>
                        <div class="job-con" v-for="(itemss,indexss) in items.children" :key="indexss" @click="btnSelectJob(itemss.name,item.id,items.id,itemss.id)">
                            <div :id="itemss.id">{{itemss.name}}<span class="f10 colred">{{itemss.level}}类</span></div>
                        </div>
                    </mu-expansion-panel>
                </mu-expansion-panel>
            </mu-list>
        </mu-bottom-sheet>
        <!--底部弹框-受益人证件类型-->
        <mu-bottom-sheet :open.sync="isOpenSelectBeneId">
            <mu-list>
                <mu-sub-header>证件类型</mu-sub-header>
                <mu-list-item button v-for="(item,index) in beneIdType" :key="index" @click="selectBeneId(index)">
                    <mu-list-item-title :class="beneIdTypeIndex==index?'active':''">{{item}}</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
        <!--底部弹框-受益人身份-->
        <mu-bottom-sheet :open.sync="isOpenSelectBenePosition">
            <mu-list>
                <mu-sub-header>是被保险人的</mu-sub-header>
                <mu-list-item button v-for="(item,index) in relation" :key="index" @click="selectBenePosition(index,item.id)">
                    <mu-list-item-title v-if="reType=='toubao'" :class="insurants.relationId==item.id?'active':''">{{item.value}}</mu-list-item-title>
                    <mu-list-item-title v-if="reType=='shouyi'" :class="beneficiaryInfos.relationId==item.id?'active':''">{{item.value}}</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
    </div>
</template>
<script>
import http from '../../utils/http';
import {toTree,getNowFormatDate,regMobile,regEmail,regIdCard} from '../../utils/filters';
import api from '../../utils/api';
import ui from '../../utils/ui';
export default {
    data(){
        return{
            msg:'',
            isShowMsg:false,
            caseCode:this.$route.query.caseCode,
            isOpenSelectWho:false,
            isOpenSelectId:false,
            trialPeople:['本人','他人'],
            trialIndex:0,
            startDate: getNowFormatDate(),
            name:'',
            cardTypeValue:api.cardType(),
            relation:api.relation(),
            //relationIndex:0,
            reType:null,//投保还是收益 选择与被保人的关系
            sex:['男','女'], 
            job:'',
            number:'1',
            isOpenAddress:false,
            addressProvinceList:[],//省
            addressProvinceLists:[],
            addressCityList:[],//市
            addressCityLists:[],
            addressAreaList:[],//区
            addressSlots: [
                {
                    width: '100%',
                    textAlign: 'left',
                    values: []
                }, {
                    width: '100%',
                    textAlign: 'left',
                    values: []
                },
                {
                    width: '100%',
                    textAlign: 'left',
                    values: []
                }
            ],
            address: [],
            addressProvince: '',
            addressCity: '',
            addressArea:'',
            jobList:[],
            isOpenSelectJob:false,
            beneIdType:['身份证','护照','其他'],
            beneIdTypeIndex:0,
            isOpenSelectBeneId:false, 
            benePositionIndex:0,
            isOpenSelectBenePosition:false,
            normal: {
                checkbox:true
            },
            //投保人
            applicant:{
                cardType:1,
                sex:0,
            },
            //被保人
            insurants:{
                insurantId:ui.rndNum(4),//被保人id,4位数的随机数
                cardType:1,
                sex:0,
                relationId:1,
                count:1,
                singlePrice:localStorage.getItem('orderTrialPrice'),
            },
            //受益人
            beneficiaryInfos:{
                sex:0,
                serial:1,//受益序列
                cardType:1,
                relationId:1
            },
            //其他
            OtherInfo:{

            }
        }
    },
    created(){
        this.getAddress(0);
        this.getJob();
    },
    methods:{
        openDiaSelectWho(){
            this.isOpenSelectWho=true;
        },
        selectWho(index){
            this.trialIndex=index;
            this.isOpenSelectWho=false;
        },
        openDiaSelectId(){
            this.isOpenSelectId=true;
        },
        selectId(index){ 
            this.insurants.cardType=index;
            this.isOpenSelectId=false;
        },
        openDiaAddress(){
            this.isOpenAddress=true;
            this.addressSlots[0].values=this.addressProvinceList;
            this.addressSlots[1].values=this.addressCityList;
            this.addressSlots[2].values=this.addressAreaList;
        },
        addressChange(value, index){
            let _this = this;
            let areaCode = '';
            switch (index) {
                //选择省
                case 0:
                    this.addressProvince = value;
                    for(let i in _this.addressProvinceLists){
                        if(_this.addressProvinceLists[i].areaName == value){
                            areaCode = _this.addressProvinceLists[i].areaCode;
                            _this.addressProvinceCode=areaCode;
                            break;
                        }
                    }
                    _this.getAddress(1,areaCode);
                    const arr = _this.addressCityList;
                    this.addressSlots[1].values = arr
                    this.addressSlots[2].values = _this.addressAreaList
                    this.addressCity = arr[0]
                    this.addressArea = _this.addressAreaList[0]
                    break
                //选择市
                case 1:
                    this.addressCity = value; 
                    for(let s in _this.addressCityLists){
                        if(_this.addressCityLists[s].areaName == value){
                            areaCode = _this.addressCityLists[s].areaCode;
                            _this.addressCityCode=areaCode;
                            break;
                        }
                    }
                    _this.getAddress(2,areaCode);
                    const arr1 = _this.addressAreaList;
                    this.addressSlots[2].values = arr1
                    this.addressArea = arr1[0]
                    break
                //选择区
                case 2:
                    this.addressArea = value;
                    for(let m in _this.addressAreaLists){
                        if(_this.addressAreaLists[m].areaName == value){
                            areaCode = _this.addressAreaLists[s].areaCode;
                            _this.addressAreaCode=areaCode;
                            break;
                        }
                    }
                    break
            }
            this.address = [this.addressProvince, this.addressCity,this.addressArea];
            if(_this.addressAreaCode==undefined){
                this.applicant.provCityId = _this.addressProvinceCode+'-'+_this.addressCityCode;
                this.insurants.provCityId = _this.addressProvinceCode+'-'+_this.addressCityCode;
            }else{
                this.applicant.provCityId = _this.addressProvinceCode+'-'+_this.addressCityCode+'-'+_this.addressAreaCode;
                this.insurants.provCityId = _this.addressProvinceCode+'-'+_this.addressCityCode+'-'+_this.addressAreaCode;
            } 
        },
        closeDiaAddress(){
            this.isOpenAddress=false;
        },
        //获取省市区
        getAddress(type,areaCode){
            let _this = this;
            //省
            if(typeof(areaCode)=="undefined" && type == 0){
                http.post('productInsuredArea',{
                    caseCode:_this.caseCode,
                    areaCode:''
                }).then(res => {
                    let areas = res.data.data.areas;
                    _this.addressProvinceLists = areas;
                    for(let i in areas){
                        _this.addressProvinceList.push(areas[i].areaName);
                    }
                    let firstCode = areas[0].areaCode;
                    _this.getAddress(1,firstCode);
                })
            }
            //市
            else if(type == 1){
                _this.addressCityList = [];
                http.post('productInsuredArea',{
                    caseCode:_this.caseCode,
                    areaCode:areaCode
                }).then(res=>{
                    let areas = res.data.data.areas;
                    _this.addressCityLists = areas;
                    for(let i in areas){
                        _this.addressCityList.push(areas[i].areaName);
                    }
                    let firstCode = areas[0].areaCode;
                    _this.getAddress(2,firstCode);
                })
            }
            //区
            else if(type ==2){
                _this.addressAreaList = [];
                http.post('productInsuredArea',{
                    caseCode:_this.caseCode,
                    areaCode:areaCode
                }).then(res=>{
                    let areas = res.data.data.areas;
                    _this.addressAreaLists = areas;
                    for(let i in areas){
                        _this.addressAreaList.push(areas[i].areaName);
                    }
                })
            }
        },
        //获取职业
        getJob(){
            let _this = this;
            http.post('productInsuredJob',{
                caseCode:_this.caseCode
            }).then(res=>{
                if(res.data.data == null) {
                    return
                }else{
                    let data = res.data.data.jobs;
                    _this.jobList = toTree(data);
                    console.log(_this.jobList);
                } 
            })
        },
        //打开职业弹框
        openDiaJob(){
            this.isOpenSelectJob=true;
        },
        //选择职业
        btnSelectJob(val,id,ids,idss){
            this.job=val;
            this.isOpenSelectJob = false;
            this.insurants.job = id +'-'+ ids + '-' + idss;
        },
        //打开受益人证件类型选择弹框
        openDiaSelectBeneId(){
            this.isOpenSelectBeneId=true;
        },
        //选择受益人证件类型选择
        selectBeneId(index){
            this.beneIdTypeIndex=index;
            this.isOpenSelectBeneId=false;
        },
        //打开选择受益人身份类型
        openDiaSelectBenePosition(index){
            //被保人选择
            if (index == 1)
                this.reType = 'toubao';
            else if(index == 2)
                this.reType ='shouyi';
            this.isOpenSelectBenePosition=true;
        },
        //选择受益人身份类型
        selectBenePosition(index,id){ 
            if(this.reType == 'toubao'){
                this.insurants.relationId = id;
            }else if(this.reType =='shouyi'){
                this.beneficiaryInfos.relationId = id;
            }
            
            this.isOpenSelectBenePosition=false;
        },
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
            let _this = this;
            let applicant = null;
            let insurants = [{}];
            let a = _this.applicant;
            let i = _this.insurants; 
            let b = _this.beneficiaryInfos;
            //为自己投保，投保人和被保人信息是一样的
            if(_this.trialIndex==0){
                applicant = ui.copy(i,applicant);
                delete applicant.relationId;
                delete applicant.singlePrice;
                delete applicant.count;
                delete applicant.insurantId;
                applicant.birthday = getNowFormatDate( i.birthday);
                insurants[0] = ui.copy(i,insurants[0]);
                delete insurants[0].email;
            }
            //为他人投保，投保人和被保人信息分开的
            else if(_this.trialIndex==1){
                //投保人信息
                applicant = a;
                insurants[0] = i;
                applicant.birthday = getNowFormatDate( a.birthday);
            }
            insurants[0].birthday = getNowFormatDate(i.birthday);
            b.birthday = getNowFormatDate(b.birthday);
            insurants[0].beneficiaryInfos = [{}];
            insurants[0].beneficiaryInfos[0] = b;
            //产品试算信息(试算接口获得)
            let priceArgs = localStorage.getItem('orderTrial');
            console.log(applicant);
            console.log(insurants);
            console.log(priceArgs);
            //承保
            http.post('insure',{
                caseCode:_this.caseCode,
                startDate:getNowFormatDate(this.startDate),
                applicant:applicant,
                insurants:insurants,
                priceArgs:priceArgs
            }).then(res=>{
                let respMsg = res.data.respMsg
                let data = res.data.data;
                //成功
                if(res.data.respCode == 0){
                    localStorage.setItem('insure',data);
                    _this.$router.push({path:'/insureresult'})
                }
                //失败
                else{
                    this.$toast(_this,respMsg);
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
.rr-bottom-tab{ border-top:.01rem solid #d5d5d5;}

</style>

