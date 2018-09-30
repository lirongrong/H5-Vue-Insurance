<template>
    <div>
        <!--顶部title-->
        <div class="bg_white p10">
            <section class="rr-flex rr-flex-align-center">
                <span class="f16 rr-flex__item">{{detaildata.productName}}  {{detaildata.planName}}</span>
                <img :src="detaildata.mobileLogo" class="mobileLoge"/>
            </section>
            <p class="f16 colred">￥{{detaildata.price | Fen2Yuan(2)}}</p>
            <!-- <p class="f12 col666">
                <span >
                    <i class="iconfont icon-duigou colred f10"></i>
                    {{item.content}}
                </span>
            </p> -->
        </div>
        <section class="f12 p10 nowrap">
            <span v-for="(item,index) in detaildata.features" :key="index" class="mr10">
                <i class="iconfont icon-duigou colred f10"></i>
                <span v-html="item.content"></span>
            </span>
        </section>
        <div class="rr_border"><i></i></div>
        <!--保障方案-->
        <div class="bg_white p10">
            <h3>保障方案</h3>
            <section class="border_1 mt10">
                <div class="rr-flex">
                    <div style="background:#ddd; padding:0 10px;" class="rr-flex rr-flex_justify_center rr-flex_align_center">基本保额</div>
                    <nav class="rr_nav nowrap rr-flex__item">
                        <router-link v-for="(item,index) in selectSameNameProList" :key="index" :class="{active:index==sameNameIndex}" :to="{path:'/prodetail',query:{caseCode:item.caseCode}}" >{{item.planName}}</router-link>
                    </nav>
                </div>
                <div class="rr_nav_subcon">
                    <section>
                        <div >
                            <div class="p05 border_bottom rr-flex rr-flex-align-center" v-for="(item,index) in detaildata.protectItems" :key="index">
                                <span class="rr-flex__item">{{item.name}}</span>
                                <span @click="openProtectDialog(index)">
                                    {{item.defaultValue}}
                                    <i class="iconfont icon-wenti"></i>
                                </span>
                            </div>
                            <div class="p10 border_bottom rr-flex rr-flex-align-center">
                                <span class="rr-flex__item f16 colred">￥{{detaildata.price | Fen2Yuan(2)}}</span>
                                <a class="rr_btn" @click="openTrialDialog">保费试算</a>
                            </div>
                        </div>
                        <!-- <div v-if="!tabContents[tabIndex]" class="p10 tc">暂无数据</div> -->
                    </section>
                </div>
            </section>
            <p class="mt10">更多详情，请阅读<span class="colred">《投保须知》</span>和<span class="colred">《保险条款》</span></p>
            <!--产品详情-->
            <div style="text-align:center;" v-html="detaildata.fullDescription"></div>
        </div>
        <div class="rr_border"><i></i></div>
        <!--底部四个模块-->
        <section class="bg_white rr-flex tc colred rr_subtab">
            <div class="rr-flex__item" v-for="(item,index) in note" :key="index" @click="openNoteDialog(index)">
                <i class="iconfont" :class="item.icon"></i><br/>
                {{item.name}}
            </div>
        </section>
        <div class="rr_border" style="height:68px;"><i></i></div>
        <!--底部tab菜单-->
        <product-detail-tab-bottom style="position:fixed;bottom:0;left:0;right:0;" :btnTouBao="openTrialDialog"></product-detail-tab-bottom>
        <!--保障方案弹框-->
        <mu-dialog transition="slide-bottom" fullscreen :open.sync="isOpenProtectDialog" style="top:2rem;">
            <mu-appbar color="primary">
                <mu-button slot="right" flat  @click="closeProtectDialog">
                    关闭
                </mu-button>
            </mu-appbar>
            <div  class="mu-subcontent">
                <dl>
                    <!--保障方案-->
                    <div v-show="protectIndex == index" v-for="(item,index) in detaildata.protectItems" :key="index" class="noteLi">
                        <dd class="f12 col666 ml20" v-html="item.description"></dd>
                    </div>
                </dl>
            </div>
        </mu-dialog>
        <!--底部四个模块弹框-->
        <mu-dialog transition="slide-bottom" fullscreen :open.sync="isOpenNoteDialog" style="top:2rem;">
            <mu-appbar color="primary">
                <mu-button slot="right" flat  @click="closeNoteDialog">
                    关闭
                </mu-button>
            </mu-appbar>
            <div  class="mu-subcontent">
                <dl>
                    <!--拥有的权力-->
                    <div v-show="noteIndex == 0"  class="noteLi">
                        <div v-if="detaildata.droits">
                            <div v-for="(item,index) in detaildata.droits" :key="index">
                                <dt class="f14">
                                    <i class="iconfont icon-huangguan colred mr04"></i>{{item.name}}
                                </dt>
                                <dd class="f12 col666 ml20">{{item.description}}</dd>
                            </div>
                        </div>
                        <div v-else>暂无数据</div>
                    </div>
                    <!--理赔流程-->
                    <div v-show="noteIndex == 1"  class="noteLi">
                        <div v-if=" detaildata.flows">
                            <div v-for="(item,index) in detaildata.flows" :key="index">
                                <dt class="f14">
                                    <i class="iconfont icon-huangguan colred mr04"></i>{{item}}
                                </dt>
                                <dd class="f12 col666 ml20">{{item}}</dd>
                            </div>
                        </div>
                        <div v-else>暂无数据</div>
                    </div>
                    <!--经典案例-->
                    <div v-show="noteIndex == 2" class="noteLi">
                        <div v-if="detaildata.compensateCase">
                            <div v-for="(item,index) in detaildata.compensateCase" :key="index">
                                <dt class="f14">
                                    <i class="iconfont icon-huangguan colred mr04"></i>{{item}}
                                </dt>
                                <dd class="f12 col666 ml20">{{item}}</dd>
                            </div>
                        </div>
                        <div v-else>暂无数据</div>
                    </div>
                    <!--常见问题-->
                    <div v-show="noteIndex == 3"  class="noteLi">
                        <div v-if="detaildata.faqs">
                            <div v-for="(item,index) in detaildata.faqs" :key="index">
                                <dt class="f14">
                                    <i class="iconfont icon-huangguan colred mr04"></i>
                                    <span v-html="item.question"></span>
                                </dt>
                                <dd class="f12 col666 ml20 mt10" v-html="item.answer"></dd>
                            </div>
                        </div>
                        <div v-else>暂无数据</div>
                    </div>
                </dl>
            </div>
        </mu-dialog>
        <!--试算弹窗-->
        <mu-dialog transition="slide-bottom" fullscreen :open.sync="isOpenTrialDialog" style="top:2rem;">
            <mu-appbar color="primary">
                <mu-button slot="right" flat  @click="closeTrialDialog">
                    关闭
                </mu-button>
            </mu-appbar>
            <div class="mu-subcontent" style="padding-bottom:.5rem;">
                <section class="rr-flex rr-flex-align-center border_bottom pb10">
                    <h3 class="f16 rr-flex__item">{{detaildata.productName}}  {{detaildata.planName}}</h3>
                    <img :src="detaildata.mobileLogo" class="mobileLoge"/>
                </section>
                <!-- <form @submit.prevent="submit">
                    <input type="radio" id="type1" name="type" v-model="formdata" value="type1"/>
                    <label for="type1">type1</label>
                    <input type="radio" id="type2" name="type" v-model="formdata" value="type2"/>
                    <label for="type2">type2</label>
                </form> -->
                <form ref="form">
                    <div class="rr-flex rr-flex-align-center border_bottom ptb05" v-for="(item,index) in dataTrial" :key="index">
                        <span class="titleTrial f12">{{item.name}}</span>
                        <!--type 0 下拉框-->
                        <span v-if="item.type==0">
                            <span class="mr10 btnBorder" :class="innerItem.value==selectTrial.value?'active':''" v-for="(innerItem,innerIndex) in item.values" :key="innerIndex">
                                <!--type:1:普通选项-->
                                <!-- <mu-radio v-model="formdata.value" :value="item.name+'-'+innerItem.value" :label="innerItem.value"></mu-radio> -->
                                <!-- <input type="radio" name="radio" v-model="formdata.value" :value="innerItem.value" :id="innerItem.value"/>
                                <label class="f12" :for="innerItem.value">{{innerItem.value}}{{innerItem.unit}}</label> -->
                                <span v-if="item.protectItemId">
                                    <span class="f12" @click="btnTrial(item.protectItemId,innerItem.value,item.sort)">{{innerItem.value}}{{innerItem.unit}}</span>
                                </span>
                                <span v-if="item.key">
                                    <span class="f12" @click="btnTrial(item.key,innerItem.value,item.sort)">{{innerItem.value}}{{innerItem.unit}}</span>
                                </span>
                                <!--type:2:最小到最大按5的倍数遍历-->
                                <!-- <a v-if="innerItem[0].type==2" class="btnBorder"></a> -->
                            </span>
                        </span>
                        <!--type 1 日历-->
                        <span v-if="item.type==1">
                            <a class="btnBorder active">日历{{item.defaultValue}}</a>
                        </span>
                        <!--type 2 日历+下拉框-->
                        <span v-if="item.type==2">
                            <a class="btnBorder active">日历+下拉框{{item.defaultValue}}</a>
                        </span>
                        <!--type 3 文本输入框-->
                        <span v-if="item.type==3">
                            <a class="btnBorder active">文本输入框{{item.defaultValue}}</a>
                        </span>
                        <!--type 4 地区-->
                        <div v-if="item.type==4">
                            <a class="btnBorder active" @click="selectAddress">地区{{item.defaultValue}}</a>
                        </div>
                        <!--type 5 职业-->
                        <span v-if="item.type==5">
                            <a class="btnBorder active">职业{{item.defaultValue}}</a>
                        </span>
                        <!--type 6 文本-->
                        <span v-if="item.type==6">
                            <a class="btnBorder active">文本{{item.defaultValue}}</a>
                        </span>
                    </div>
                    <!-- <input type="submit" value="提交"> -->
                </form>
            </div>
            <div class="rr-flex dialogBottom rr-flex-align-center">
                <span class="rr-flex__item f16 colred">￥{{detaildata.price | Fen2Yuan(2)}}</span>
                <div class="rr-btn rr-flex" style="flex:1.4;align-items: center;justify-content:center; height:100%;" @click="submit">
                    确定
                </div>
            </div>
        </mu-dialog>
        <!--选择投保地址弹框-->
        <mu-slide-picker v-show="isShowAddress" :slots="addressSlots" :visible-item-count="7" :values="address"></mu-slide-picker>
    </div>
</template>
<script>
import Promise from 'bluebird';
import ProductDetailTabBottom from '../../components/ProductDetailTabBottom'; 
import http from '../../utils/http';
import {getNowFormatDate} from '../../utils/filters';

export default {
    components:{
        'product-detail-tab-bottom':ProductDetailTabBottom,
    },
    data:function(){
        return{
            caseCode:this.$route.query.caseCode,
            detaildata:'',
            totalList:JSON.parse(localStorage.getItem("proList")),
            selectSameNameProList:[],
            sameNameIndex:0,
            isOpenNoteDialog: false,
            isOpenProtectDialog:false,
            noteIndex:null,
            protectIndex:null,
            note:[
                {
                    name:'拥有权力',
                    icon:'icon-quanli'
                },
                {
                    name:'理赔流程',
                    icon:'icon-liucheng'
                },
                {
                    name:'典型案例',
                    icon:'icon-anli'
                },
                {
                    name:'常见问题',
                    icon:'icon-wenti'
                }
            ],
            isOpenTrialDialog:false,
            trialIndex:null,
            dataTrial:[],//保费试算数据
            // provinceList:[],//省
            // cityList:[],//市
            addressSlots: [
                {
                    width: '100%',
                    textAlign: 'right',
                    values: []
                }, {
                    width: '100%',
                    textAlign: 'left',
                    values: []
                }
            ],
            address: ['北京', '北京'],
            addressProvince: '北京',
            addressCity: '北京',
            addressProvinceList:[],
            addressCityList:[],
            isShowAddress:false,
            btnTrialActiveIndex:'',
            formdata:{}, 
            trialList:[],//试算因子默认值
            newTrialList:[],//新的试算因子
            oldTrial:{},//旧的试算因子
            selectTrial:{},//选中的试算因子
        }
    },
    created() {
        this.initData();
    },
    mounted(){
        this.sameNameCaseCodeList();
        this.initDefaultTrial();
        this.initProArea();
    },
    methods:{
        initData(){
            let _this = this;
            const caseCode = _this.$route.query.caseCode;
            http.post('productDetail',{
                caseCode:caseCode
            }).then(
                function(e){
                    _this.detaildata = e.data.data;
                    //_this.sameNameCaseCodeList(data.productName);
                    //console.log(_this.detaildata);
                    console.log("成功");
                }
            ).catch(
                function(){
                    console.log("失败");
                }
            );
        },
        //获取同名称的caseCodeList
        sameNameCaseCodeList:function(productName){
            let _this = this;
            let arr = [];
            for(let i in _this.totalList){
                if(_this.totalList[i].prodName == productName){
                    _this.selectSameNameProList.push(_this.totalList[i]);
                    //_this.selectCaseCodeList.push(_this.totalList[i].caseCode);
                    //console.log(_this.selectCaseCodeList);
                    // arr.push(_this.sameNameDetailList(_this.totalList[i].caseCode));
                    // Promise.all(arr).then(function(res){
                    //     _this.selectDetailList.push(res[res.length-1]);
                    //     console.log(_this.selectDetailList);
                    // })
                }
            }
        },
        //获取同名称的detailist
        // sameNameDetailList(caseCode){
        //     let promise = new Promise(function(resolve,reject){
        //         dataProdetail(caseCode).then(
        //             function(result){
        //                 let data = JSON.parse(result);
        //                 resolve(data.data);
        //                 console.log("成功");
        //             }
        //         ).catch(
        //             function(err){
        //                 reject(err);
        //                 console.log("失败");
        //             }
        //         )
        //     })
        //     return promise;
        // },
        openNoteDialog (index) {
            this.isOpenNoteDialog = true;
            this.noteIndex=index;
        },
        openProtectDialog(index){
            this.isOpenProtectDialog = true;
            this.protectIndex = index;
        },
        closeNoteDialog () {
            this.isOpenNoteDialog = false;
        },
        closeProtectDialog(){
            this.isOpenProtectDialog = false;
        },
        openTrialDialog(){
            this.isOpenTrialDialog = true;
        },
        closeTrialDialog(){
            this.isOpenTrialDialog = false;
        },
        //获取默认试算条件
        initDefaultTrial(){
            let _this = this;
            http.post('defaultTrial',{
                caseCode:_this.caseCode
            }).then(function(res){
                console.log(res.data);
                _this.dataTrial = res.data.data.restrictGenes;
                _this.trialList = res.data.data.priceArgs.genes;
                console.log(_this.dataTrial);
                for(let i in _this.dataTrial){
                    //当类型为地址时，给省市赋值
                    if(_this.dataTrial[i].type==4){
                        _this.addressProvinceList = _this.dataTrial[i].subRestrictGenes[0].values;
                        _this.addressCityList = _this.dataTrial[i].values;
                        return false;
                    }
                }
            }).catch(function(err){
                console.log(err);
            })
        },
        //获取投保地址省
        initProArea(){
            let _this = this;
            http.post('productInsuredArea',{
                caseCode:_this.caseCode
            }).then(res => {
                _this.provinceList = res.data.data.areas;
                //遍历省份获取市
                const promiseFunArr = [];
                for(let i in _this.provinceList){
                    //const areaCode = _this.provinceList[i].areaCode;
                    //promiseFunArr.push(dataProArea(_this.caseCode,_this.provinceList[i].areaCode));
                };
                
            });
        },
        //选择投保地址
        selectAddress(){
            this.isShowAddress=true;
            this.addressSlots[0].values = this.addressCityList
            this.addressSlots[1].values = this.addressProvinceList
            console.log(this.addressSlots);
        },
        //选中试算因子
        btnTrialActive(index){
            let _this = this;
            if(_this.btnTrialActiveIndex == index){
                _this.btnTrialActiveIndex = ''
            }else{
                _this.btnTrialActiveIndex = index;
            }
        },
        //试算
        btnTrial(index,val,sort){
            let _this = this;
            for(let i in _this.trialList){
                if(_this.trialList[i].protectItemId && _this.trialList[i].protectItemId == index){
                    let oldval = _this.trialList[i].value;
                    _this.trialList[i].value = val;
                    _this.newTrialList = _this.trialList;
                    _this.oldTrial = {
                        "protectItemId":index,
                        "value":oldval,
                        "sort":sort
                    };
                    _this.selectTrial = {
                        "protectItemId":index,
                        "value":val,
                    };
                    _this.httpBtnTrial(_this.newTrialList,_this.oldTrial);
                    return;
                }else if(_this.trialList[i].key && _this.trialList[i].key == index){
                    _this.trialList[i].value = val;
                    _this.newTrialList = _this.trialList;
                    _this.oldTrial = {
                        "key":index,
                        "value":val,
                        "sort":sort
                    };
                    _this.selectTrial = {
                        "protectItemId":index,
                        "value":val,
                    };
                    _this.httpBtnTrial(_this.newTrialList,_this.oldTrial);
                    return;
                }
            }
        },
        //求试算结果价格
        httpBtnTrial(newTrialList,oldTrial){
            let _this= this;
            let startDate = getNowFormatDate();
            http.post('orderTrial',{
                caseCode:_this.caseCode,
                startDate:startDate,
                newRestrictGenes:newTrialList,
                oldRestrictGene:oldTrial
            }).then(res=>{
                console.log(res.data.data);
                localStorage.setItem('orderTrial',JSON.stringify(res.data.data.priceArgs));
                localStorage.setItem('orderTrialPrice',JSON.stringify(res.data.data.price));
                let newPrice = res.data.data.price;
                _this.detaildata.price=newPrice;
                
            })
        },
        //提交表单,跳转到投保页面
        submit() {
            // this.$refs.form.validate().then(res =>{
            //     console.log(res);
            // })
            this.$router.push({path:'/proinsure',query:{caseCode:this.caseCode}})
        },
    },
    computed:{
        //封装最小值到最大值按步数遍历出的值
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/mixin.scss';
.rr_border:before{
    @include border_color(.01rem,#ddd);content:'';display: block;
}
.rr_border i{
    @include border(.12rem);display: block;
}
.rr_nav{ background: #f5f5f5;}
.rr_nav a{display: inline-block; border-radius: 10px; line-height: .2rem; color: #333; margin: .1rem .05rem; padding: 0 .1rem;}
.rr_nav a.active{ background:#F44336; padding: 0 .1rem; color: #fff;}
.rr_subtab .rr-flex__item{ padding:.1rem 0; border-right:1px solid #ddd;}
.rr_subtab .rr-flex__item:last-child{border-right:none;}
.mobileLoge{ width: .6rem; height: .2rem;}
.noteLi{ padding:.1rem 0; border-bottom: .01rem solid #f5f5f5;} 
.titleTrial{ flex-basis: 1rem; margin-right: .06rem;}
.dialogBottom{ position: fixed; bottom: 0; left: 0; right: 0;height: .4rem; background: #fff; border-top: .01rem solid #d3d3d3;}
</style>


