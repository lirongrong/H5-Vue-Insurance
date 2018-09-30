/* eslint-disable */
import Vue from '../node_modules/_vue@2.5.16@vue'
import App from './App'
import prorecommend from './page/product/recommend'
import protype from './page/product/type'
import prolist from './page/product/list'
import prodetail from './page/product/detail'
import proinsure from './page/product/insure'
import insureresult from './page/product/insureresult' 
import userindex from './page/user/index'
import useredit from './page/user/edit'
import userauth from './page/user/auth'
import userauthresult from './page/user/authresult'
import userorderlist from './page/user/orderlist'
import userorderdetail from './page/user/orderdetail'
export default [{
    path: '/',
    component: App,
    children: [
      {
        path: '',
        component: prorecommend
      },
      {
        path: '/protype',
        component: protype
      },
      {
        path: '/prolist',
        component: prolist
      },
      {
        path: '/prodetail',
        component: prodetail
      },
      {
        path: '/proinsure',
        component: proinsure
      },
      {
        path:'/insureresult',
        component:insureresult,
      },
      {
        path:'/userindex',
        component:userindex
      },
      {
        path:'/useredit',
        component:useredit
      },
      {
        path:'/userauth',
        component:userauth
      },
      {
        path:'/userauthresult',
        component:userauthresult
      },
      {
        path:'/userorderlist',
        component:userorderlist
      },
      {
        path:'/userorderdetail',
        component:userorderdetail
      }
    ]
  }]