<template>
    <div>
		<navigation :headtitle="headtitle" :isNaShow="isNaShow" :backUrl="backUrl"></navigation>
        <!--顶部筛选菜单-->
        <section class="sort_container mt40">
            <div class="sort_item" :class="{choose_type:sortBy == 'type'}" >
                <div class="sort_item_container" @click="chooseType('type')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'type'}">{{typeTitle}}</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8"/>
                        </svg>
                    </div>
                </div>
                <transition name="showlist" >
                    <section v-show="sortBy == 'type'" class="category_container sort_detail_type">
                        <section class="category_left">
                            <ul>
                                <li v-for="(item, index) in category" :key="index" class="category_left_li" :class="{category_active:firstId == item.code}" @click="selectCategoryName(item.code, index)">
                                    <section><span>{{item.name}}</span>
                                    </section>
                                </li>
                            </ul>
                        </section>
                        <section class="category_right">
                            <ul>
                                <li v-for="(item, index) in categoryDetail" :key="index" class="category_right_li" @click="getCategoryIds(item.code, item.name)" :class="{category_right_choosed: secondId == item.code}">
                                    <span>{{item.name}}</span>
                                    <span>{{item.count}}</span>
                                </li>
                            </ul>
                        </section>
                    </section>
                </transition>
            </div>
            <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
                <div class="sort_item_container" @click="chooseType('sort')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'sort'}">{{sortTitle}}</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8"/>
                        </svg>
                    </div>
                </div>
                <transition name="showlist">
                    <section v-show="sortBy == 'sort'" class="sort_detail_type">
                        <ul class="sort_list_container">
                            <li class="sort_list_li" v-for="(item,index) in sortByPriceData" :key="index" @click="sortList(item,index)">
                                <p :class="{sort_select: sortByPrice == index}" >
                                    <span>{{item}}</span>
                                </p>
                            </li>
                        </ul>
                    </section>
                </transition>
            </div>
            <div class="sort_item" :class="{choose_type:sortBy == 'company'}">
                <div class="sort_item_container" @click="chooseType('company')">
                    <span :class="{category_title: sortBy == 'company'}">{{companyTitle}}</span>
                    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                        <polygon points="0,3 10,3 5,8"/>
                    </svg>
                </div>
                <transition name="showlist">
                    <section v-show="sortBy == 'company'" class="sort_detail_type">
                        <ul class="sort_list_container">
							<li class="sort_list_li" v-for="(item,index) in sortByCmpanyData" :key="index" @click="companyList(item,index)">
                                <p data="0" :class="{sort_select: sortByCompany == index}">
                                    <span>{{item}}</span>
                                </p>
                            </li>
						</ul>
                    </section>
                </transition>
            </div>
        </section>
        <transition name="showcover">
            <div class="back_cover" v-show="sortBy" @click="hideModel"></div>
        </transition>
		<!--列表-->
		<product-list :sortByType="sortByType" :sortByPrice="sortByPrice" ></product-list>
		<bottom-navigator></bottom-navigator>
    </div>
</template>
<script>
import BottomNavigation from '../../components/BottomNavigation'
import Navigation from '../../components/Navigation'
import ProductList from '../../components/ProductList';
export default {
    data(){
        return {
			isNaShow:false,
            backUrl:'',
            headtitle:'保险列表',
			typeTitle: '保险类型', // 排序左侧头部标题
			sortTitle:'综合排序',
			companyTitle:'保险公司',
			firstId: 0, // 保险类型id值
			firstIndex:0,
			secondId: '', //筛选类型的id
			sortBy:'',//排序
            category: JSON.parse(localStorage.getItem("proTypeList")), // category分类左侧数据
            categoryDetail: null, // category分类右侧的详细数据
			sortByType:null,//保险分类
			sortByPrice:0,//默认是0，1是价格从低到高，2是价格从高到低
			sortByCompany:0,
			beforeSortByType:null,//记录上一次的筛选菜单 
			sortByPriceData:['默认','价格从低到高','价格从高到低'],
			sortByCmpanyData:['保险公司'],
        }
	},
	created(){
		this.initData();
	},
	mounted(){
	},
	components:{
		'product-list':ProductList,
        'bottom-navigator':BottomNavigation,
        'navigation':Navigation
    },
    methods: {
		//初始化获取数据
        async initData(){
			//获取从msite页面传递过来的参数
			if(this.$route.query.name){
				this.firstId = this.$route.query.pid;
				this.typeTitle = this.$route.query.name;
				this.selectCategoryName(this.$route.query.pid,this.$route.query.pindex)
				this.getCategoryIds(this.$route.query.id,this.$route.query.name);
			} else{
				this.typeTitle = '保险类型';
				this.selectCategoryName(2000,0)
			}
		    //获取category分类左侧数据
			//this.category = JSON.parse(localStorage.getItem("proTypeList"));
	    	//初始化时定位当前category分类左侧默认选择项，在右侧展示出其sub_categories列表
			this.category.forEach(item => {
				if (this.firstId == item.id) {
					this.categoryDetail = item.childs;
				}
			});
			
			// const rlist = await prolist();
			// this.proList=rlist.data.data;
			// this.proList.forEach(item => {	
			// 	this.proViewList = item.children;
			// });
        },
    	// 点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
    	async chooseType(type){
			if (this.sortBy !== type) {
				this.sortBy = type;
    		}else{
    			//再次点击相同选项时收回列表
    			this.sortBy = '';
    		}
    	},
		//选中Category左侧列表的某个选项时，右侧渲染相应的sub_categories列表
		selectCategoryName(id, index){  
			this.firstId = id;
			this.firstIndex = index;
			if(index!=undefined){
 				this.categoryDetail = this.category[index].childs;
			}
		},
		//选中Category右侧列表的某个选项时，进行筛选，重新获取数据并渲染
		getCategoryIds(id, name){
			this.secondId = id;
			this.sortBy = '';
			this.typeTitle = this.headTitle = name;
			this.sortByType = parseInt(id);
			if(this.sortByType == this.beforeSortByType){
				return;
			}else{
				this.beforeSortByType = this.sortByType;
				//this.pageIndex = 1;
			}
			
		},
		//点击遮罩层，默认关闭
		hideModel(){
			this.sortBy='';
		},
		next(){
			this.pageIndex++;
			console.log(this.pageIndex);
		},
		//点击某个排序方式，获取事件对象的data值，并根据获取的值重新获取数据渲染
		sortList(item,index){
			// let node;
			// // 如果点击的是 span 中的文字，则需要获取到 span 的父标签 p
			// if (event.target.nodeName.toUpperCase() !== 'P') {
			// 	node = event.target.parentNode;
			// } else {
			// 	node = event.target;
			// }
			this.sortByPrice = index;
			this.sortTitle = item;
			this.sortBy = '';
			
		},
		companyList(item,index){
			this.sortByCompany = index;
			this.companyTitle = item;
			this.sortBy = '';
		}
	},
	
}
</script>
<style lang="scss" scoped>
@import '../../assets/mixin';
	.sort_container{
		background-color: #fff;
		border-bottom: 0.006rem solid #f1f1f1;
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		display: flex;
		z-index: 13;
		box-sizing: border-box;
		.sort_item{
			@include sc(0.12rem, #444);
			@include wh(33.3%, 0.44rem);
			text-align: center;
			line-height: 0.44rem;
			.sort_item_container{
				@include wh(100%, 100%);
				position: relative;
				z-index: 14;
				background-color: #fff;
				box-sizing: border-box;
				line-height: 0.44rem;
				.sort_item_border{
					height: .44rem;
					border-right: 0.006rem solid $bc;
				}
			}
			.sort_icon{
				vertical-align: middle;
				transition: all .3s;
				fill:#666;
			}

		}
		.choose_type{
			.sort_item_container{

				.category_title{
					color: $blue;
				}
				.sort_icon{
					transform: rotate(180deg);
					fill:$blue;
				}
			}
		}
		.showlist-enter-active, .showlist-leave-active {
			transition: all .3s;
			transform: translateY(0);
		}
		.showlist-enter, .showlist-leave-active {
			opacity: 0;
			transform: translateY(-100%);
		}
		.sort_detail_type{
			width: 100%;
			position: absolute;
			display:flex;
			top: 0.44rem;
			left: 0;
			border-top: 0.005rem solid $bc;
			background-color: #fff;
		}
		.category_container{
			.category_left{
				flex: 1;
				background-color: #f1f1f1;
				height: 3.2rem;
				overflow-y: auto;
				span{
					@include sc(0.1rem, #666);
					line-height: 0.36rem;
				}
				.category_left_li{
					@include fj;
					padding:0 0.1rem;
					.category_icon{
						@include wh(.36rem, .36rem);
						vertical-align: middle;
						margin-right: .04rem;
					}
					.category_count{
						background-color: #ccc;
						@include sc(.08rem, #fff);
						padding: 0 .02rem;
						border: 0.005rem solid #ccc;
						border-radius: 0.16rem;
						vertical-align: middle;
						margin-right: 0.05rem;
					}
					.category_arrow{
						vertical-align: middle;
					}
				}
				.category_active{
					background-color: #fff;
				}
			}
			.category_right{
				flex: 1;
				background-color: #fff;
				padding-left: 0.1rem;
				height: 3.2rem;
				overflow-y: auto;
				.category_right_li{
					@include fj;
					height: 0.36rem;
					line-height:0.36rem;
					padding-right: 0.1rem;
					border-bottom: 0.005rem solid $bc;
					span{
						color: #666;
					}
				}
				.category_right_choosed{
					span{
						color: $blue;
					}
				}
			}
		}
		.sort_list_container{
			width: 100%;
			.sort_list_li{
				height: 0.5rem;
				display: flex;
				align-items: center;
				padding-left:10px;
				svg{
					@include wh(0.7rem, 0.7rem);
					margin:0 .3rem 0 .8rem;
				}
				p{
					line-height: 0.5rem;
					flex: auto;
					text-align: left;
					text-indent: 0.05rem;
					border-bottom: 0.005rem solid $bc;
					@include fj;
					align-items: center;
					span{
						color: #666;
					}
				}
				.sort_select{
					span{
						color: $blue;
					}
				}
			}
		}
	}
	.showcover-enter-active, .showcover-leave-active {
		transition: opacity .3s
	}
	.showcover-enter, .showcover-leave-active {
		opacity: 0
	}
	.back_cover{
		position: fixed;
		@include wh(100%, 100%);
		z-index: 10;
		background-color: rgba(0,0,0,0.3);
	}
	.list_box_con{
		//position: fixed;
		margin-top: 0.52rem;
		// width: 100%;
		// overflow-y: auto;
		// height: 100%;
	}
	.list_box{
		padding:.1rem;
		background: #fff;
		ul{
			padding:.1rem 0;
		}
	}
	.border{
		@include border(.01rem);
	}
	.border_dashed{
		@include border_dashed(.01rem,#999)
	}
	
</style>
