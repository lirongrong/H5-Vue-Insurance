<template>
    <div class="list_box_con" ref="scrollBox">
        <router-link v-for="item in listdetail" :key="item.caseCode" :to="{path:'/prodetail',query:{caseCode:item.caseCode}}">
            <div class="border"></div>
            <div class="list_box">
                <div class="rr-flex rr-flex-align-center">
                    <span class="f14 rr-flex__item col333">{{item.prodName}}</span>
                    <img class="mobileLogo" v-bind:src="item.detail.mobileLogo"/>
                </div>
                <ul class="rr-flex ul_features">
                    <li class="rr-flex__item txtcut " v-for="(itemd,indexd) in item.detail.features" :key="indexd">
                        <i class="iconfont icon-duigou f10 fcred"></i>
                        <span>{{itemd.content}}</span>
                    </li>
                </ul>
                <ul class="ul_protect">
                    <li class="rr-flex" v-for="(items,indexs) in item.detail.protectItems" :key="indexs" v-if="indexs<5">
                        <span class="rr-flex__item col666">{{items.name}}</span>
                        <span style="max-width:2rem;text-align:right;">{{items.defaultValue}}</span>
                    </li>
                </ul>
                <div class="border_dashed"></div>
                <div class="rr-flex mt10">
                    <b class="rr-flex__item f16 colred">￥{{item.detail.price | Fen2Yuan(2)}}</b>
                    <!-- <span>销量 {{item.reply_count}}</span> -->
                </div>
            </div>
            <div class="border_8"></div>
        </router-link>
        <div class="tc div_loading">
            <i class="iconfont icon-loading animate_circle dib" v-if="isLoading"></i>
            <span v-else>没有更多数据</span>
        </div>
    </div>
</template>
<script>
import Promise from 'bluebird';
import http from '../utils/http';
export default {
    data(){
        return{
			pageIndex:1,
            pageSize:5, 
            listtotal: JSON.parse(window.localStorage.getItem('proList')),//所有的产品，已经在首页缓存过
            list:[],
            listdetail:[],//绑到页面上的list
            isLoading:true,
            beforeSortByType:null,//记录上一次的筛选条件
        }
    },
    props:{
        'sortByType':Number,
        'sortByPrice':Number,
    },
    mounted() {
        this.initData();
        this.listenScroll();
    },
    watch:{
        // pageIndex(value){
        //     this.listenPropChange();
        // },
        sortByType(value){
            this.listenPropChangeFirstPage();
        },
        sortByPrice(value){
            this.listenPropChangeFirstPage();
        },
        // sortByCompany(value){
        //     this.listenPropChangeFirstPage();
        // }
    },
    methods:{
        initData(){
            this.query(this.pageIndex,this.pageSize,this.sortByType,this.sortByPrice);
        },
        //筛选
        // sort(pageIndex,pageSize,sortByType,sortByPrice){
        //     let $this = this;
        //     console.log(pageIndex,pageSize,sortByType,sortByPrice);
        //     //切换筛选菜单type
        //     if(sortByType!=$this.beforeSortByType){
        //         $this.pageIndex=1;
		// 	    $this.pageSize=5;
        //         //从最初的totallist中筛选,把绑定的list值设为空
        //         $this.listtotal = JSON.parse(window.localStorage.getItem('proList'));
        //         $this.list = [];
        //         $this.listdetail = [];
        //         $this.isLoading = true;
        //         let selectList = [];
        //         for(let i in $this.listtotal){
        //             if($this.listtotal[i].secondCategory == sortByType){
        //                 selectList.push($this.listtotal[i]);
        //             }
        //         }
        //         $this.listtotal = selectList;
        //         //sort暂时先不做，因为list里面没有price字段，要遍历所有的detail,不可取
        //         // switch(sortBySort){
        //         //     case 0://综合排序
        //         //         break;
        //         //     case 1://销量优先
        //         //         break;
        //         //     case 2://价格最低
        //         //         $this.listtotal.sort($this.sortUp);
        //         //         console.log($this.listtotal);
        //         //         break;
        //         //     case 3://价格最高
        //         //         $this.listtotal.sort($this.sortDown);
        //         //         console.log($this.listtotal);
        //         //         break;
        //         //     case 4://最新上架
        //         //         break;
        //         // }
        //         $this.query(pageIndex,pageSize);
        //         $this.beforeSortByType = sortByType;
        //         return false;
        //     }
        //     //没有切换筛选菜单，多次点击;并且没有更多数据的时候
        //     else if($this.isLoading == false && sortByType == $this.beforeSortByType){
        //         return false;
        //     }
        //     //滚动加载
        //     else{
        //         $this.isLoading = true;
        //         $this.query(pageIndex,pageSize);
        //         return false;
        //     }
        // },
        query(pageIndex,pageSize,sortByType,sortByPrice){ 
            console.log(pageIndex,pageSize,sortByType,sortByPrice);
            let _this = this;
            http.get('insurance/getProduct',{
                pageIndex:pageIndex,
                pageSize:pageSize,
                SecondCategoryId:sortByType,
                sort:sortByPrice,
            }).then(res=>{
                console.log(res.data);
                if(pageIndex==1){
                    _this.listdetail=res.data;
                }else{
                    if(res.data.length<pageSize && res.data.length != 0){
                        _this.listdetail.push(res.data[i]);
                        _this.isLoading = false;
                        return false;
                    }else if(res.data.length == 0){
                        _this.isLoading = false;
                        return false;
                    }else{
                        for(var i in res.data){
                            _this.listdetail.push(res.data[i])
                        }
                    }
                    
                }
            })
            // console.log(pageIndex,pageSize);
            // let $this = this;
            // const size = Math.ceil($this.listtotal.length / pageSize);//页数，向上取整
            // //当在页数范围内的时候加载下一页
            // if(pageIndex <= size) {
            //     let start = pageSize*pageIndex-pageSize;
            //     let end = pageSize*pageIndex-1;
            //     if ($this.listtotal.length <= end )
            //         end = $this.listtotal.length -1 ;
            //     var arr = [];
            //     for(let i= start ; i<= end; i++){
            //         //debugger;
            //         $this.list.push($this.listtotal[i])
            //         arr.push($this.getDetail($this.list[i].caseCode));
            //         //console.log(arr);
            //         Promise.all(arr).then(function(result){
            //             $this.listdetail.push(result[result.length-1]);
            //         });
            //     }
            // }
            // //已经加载到了最后一页
            // else{
            //     $this.isLoading = false;
            //     return;
            // };
        },
        // getDetail(caseCode){
        //     var promise = new Promise(function(resolve, reject){
        //         http.post('productDetail',{
        //             caseCode:caseCode,
        //             platformType:1
        //         }).then(
        //             function(result){ 
        //                 //data.data.price = Fen2Yuan(data.data.price); //分转化为元
        //                 resolve(result.data.data);
        //                 //console.log(result);
        //                 console.log("成功");
        //             }
        //         ).catch(
        //             function(err){
        //                 reject(err);
        //                 console.log("失败");
        //             }
        //         );
        //     });
        //     return promise;
        // },
        //监听父级发生变化时，触发此函数获取新数据
        listenPropChangeFirstPage(){
            this.pageIndex = 1;
            this.query(this.pageIndex,this.pageSize,this.sortByType,this.sortByPrice); 
        },
        //滚动加载
		listenScroll(){ 
            let scrollBox = this.$refs.scrollBox;   
            scrollBox.addEventListener('scroll',()=>{ 
                let isLoading = false;
				// 距离底部时加载一次
				//console.log(Math.round(document.documentElement.scrollTop + window.innerHeight));
                //console.log(document.documentElement.scrollHeight);
        		let bottomOfWindow =  Math.round(scrollBox.scrollTop + scrollBox.offsetHeight) >= scrollBox.scrollHeight
				if (bottomOfWindow && isLoading == false) {
					isLoading = true
					console.log("开始加载下一页");
					this.pageIndex++
                    console.log(this.pageIndex);
                    this.query(this.pageIndex,this.pageSize,this.sortByType,this.sortByPrice);
				}
            })
			// window.onscroll=()=>{
			// 	let isLoading = false;
			// 	// 距离底部时加载一次
			// 	//console.log(Math.round(document.documentElement.scrollTop + window.innerHeight));
			// 	//console.log(document.documentElement.scrollHeight);
        	// 	let bottomOfWindow =  Math.round(document.documentElement.scrollTop + window.innerHeight) >= document.documentElement.scrollHeight
			// 	if (bottomOfWindow && isLoading == false) {
			// 		isLoading = true
			// 		console.log("开始加载下一页");
			// 		this.pageIndex++
            //         console.log(this.pageIndex);
            //         this.query(this.pageIndex,this.pageSize,this.sortByType,this.sortByPrice);
			// 	}
			// }
        },
        // //排序升序
        // sortUp (a,b) {
        //     return a.price-b.price;
        // },
        // //排序升序
        // sortDown (a,b) {
        //     return b.price-a.price;
        // }
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/mixin';
.list_box_con{
		 position: fixed; top:.4rem; left: 0; right:0; bottom:.5rem;overflow-y: auto;
	}
	.list_box{
		padding:.1rem;
		background: #fff;
		ul.ul_protect{
			padding:.1rem 0;
		}
	}
    .border_8{
        @include border(.08rem);
    }
	.border{
		@include border(.01rem);
	}
	.border_dashed{
		@include border_dashed(.01rem,#999)
	}
    .mobileLogo{ width: 80px; height: 30px;}
    .ul_features{ margin-top: .06rem;}
    .ul_features li{ background: #f5f5f5; margin-right: .04rem; padding:0 .04rem;}
    .div_loading{ 
		height: .4rem;
		line-height: .4rem;
		text-align: center;
		margin: 0 0 .05rem 0;
	}
</style>
