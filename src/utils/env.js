/**
 * 配置本地环境、测试环境和线上环境之间的切换
 */
let apiUrl='http://localhost:53853/api/';
let apiOwnURL='http://localhost:53853/';
// let apiUrl = 'http://ins.xiaohu.in/api/';
// let apiOwnURL = 'http://ins.xiaohu.in/'; 

if (process.env.NODE_ENV == 'development') {
    apiUrl='http://tuneapi.qixin18.com/api/'


}else if(process.env.NODE_ENV == 'production'){
    apiUrl='http://api.qixin18.com/api/'
}

export default{
    apiUrl,apiOwnURL
}