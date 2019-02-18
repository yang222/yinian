// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueResource from "vue-resource";
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // 全局css
import '@/icons' // icon
import Vuex from "vuex"
// import store from './store'

Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.productionTip = false

const store=new Vuex.Store({
    state:{
        token:"",
    }   
})

var http = "http://www.yinian.com:8080/Admin/";
Vue.prototype.post=function(obj,success,error){
  this.$http.post(http+obj.url,obj.data,{
        headers:{'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
        emulateJSON: true
  })
  .then((da)=>{
      if(da.status == "200"){
          success(da.body);
      }else{
        error(da.body)
      }
  })
  .catch((err)=>{    
    
  //    this.$router.push("/login");
  })
}
function UrlSearch(data) {
    var name,value;
    var str= sessionStorage.auth; //取得整个地址栏
    var num=str.indexOf("?")
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
    var arr=str.split("&"); //各个参数放到数组里
    for(var i=0;i < arr.length;i++){
         num=arr[i].indexOf("=");
        name=arr[i].substring(0,num);
        value=arr[i].substr(num+1);
        if(name == data) {
            return value       
         }
    }
}
Vue.prototype.postJson=function(obj,success,error){
    var data = JSON.parse(obj.data);
    var tauth = getAuth;
    data.from = UrlSearch("from");
    data.tokenType = UrlSearch("tokenType");
    data.sign = UrlSearch("sign");
    if(data.size){
        this.$http.post(http+obj.url+tauth+"&size="+data.size+"&index1="+data.index1+"&index2="+data.index2,JSON.stringify(data),{
            headers:{'Content-Type' : 'application/json; charset=UTF-8',},
            emulateJSON: true
        })
        .then((da)=>{   
            if(da.body.statusCode == "10000200" || da.body.success){
                success(da.body);
                return; false
            }else{
                error(da.body)
            }
            if(da.status == "200"){
                success(da.body);
            }
        })
        .catch((err)=>{    
            
        //    this.$router.push("/login");
        })
    }else{
        this.$http.post(http+obj.url+tauth,JSON.stringify(data),{
            headers:{'Content-Type' : 'application/json; charset=UTF-8',},
            emulateJSON: true
        })
        .then((da)=>{   
            if(da.body.statusCode == "10000200" || da.body.success){
                success(da.body);
                return; false
            }else{
                error(da.body)
            }
            if(da.status == "200"){
                success(da.body);
            }
        })
        .catch((err)=>{    
            
        //    this.$router.push("/login");
        })
    }
  
}
Vue.prototype.get=function(obj,success,error){
    this.$http.get(http+obj.url,{params:obj.data},{
        headers:{'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',},
        emulateJSON: true
    })
    .then((da)=>{
        
        if(da.body.statusCode == "10000200" || da.status == 200){
            success(da.body);
        }else{
            error(da.body)
        }
    })
    .catch((err)=>{    
        
    })
}

router.beforeEach((to, from, next) => {
    console.log(sessionStorage.token)
    if(sessionStorage.token == "" || sessionStorage.token == "undefined"){
        if(to.path == '/login') {
            next()
        }else {
            next({ path: './login' })
        }
    }else{
        next()
    }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


