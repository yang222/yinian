<template>
  <div class="login-container">
    <div class="login-wrap">
      <el-form class="login-form" autoComplete="on" ref="loginForm" label-position="left" inline-message>
        <h3 class="title"><img src="../../../static/login/logo.png" class="logo"><span class="text">易念科技管理后台</span></h3>
        <el-form-item>
          
               <span class="iconfont icon-yonghu"></span>
       
          <el-input name="username" type="text" autoComplete="on" placeholder="用户名" v-model="loginForm.username" />
        </el-form-item>
        <el-form-item >
         
              <span class="iconfont icon-mima"></span>
      
            <el-input name="password"  autoComplete="on" v-model="loginForm.password"
            placeholder="密码" type="password" @keyup.enter.native="enter"></el-input>
            <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;height:60px;border-radius:30px;font-size:18px;" round  @click="enter">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    
  </div>
</template>

<script>


export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
        callback()
    }
    const validatePass = (rule, value, callback) => {
        callback()
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },

  methods: {
    showPwd() {
     
    },
    handleLogin() {
    
    },
    enter(){
        if(!this.loginForm.username){
          this.$message({
            message: '请输入用户名！',
            type: 'warning'
          });
          return
        }
        if(!this.loginForm.password){
          this.$message({
            message: '请输入用户密码！',
            type: 'warning'
          });
          return
        }
        this.post({url:"Index/login",data:{
          username:this.loginForm.username,
          password:this.loginForm.password,
        }},(data)=>{
            if(data.status == 200){
              this.$store.state.token = data.data.signature;
              this.$store.state.uid = data.data.uid;
              sessionStorage.uid = data.data.uid;
              sessionStorage.token = data.data.signature;
              this.$router.push("./home")
            }else{
              this.$message.error(data.msg);
            }
            
        })
      
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#fff;
/* reset element-ui css */
.login-container {
  .iconfont{
    font-size: 24px;
    color: #66b1ff;
  }
  .el-input {
    display: inline-block;
    height: 46px;
    width: 85%;
    vertical-align: top;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      font-size:16px;
      color: #000;
      height: 58px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-text-fill-color: #000 !important;
      }
    }
  }
  .el-form-item {
    background:rgba(255,255,255,1);
    border:1px solid rgba(229,229,229,1);
    border-radius: 30px;
    width: 400px;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    color: #454545;
  }
}

</style>
<style rel="stylesheet/scss" lang="scss">
$dark_gray:#889aa4;
.login-container {
  width: 100%;
  height: 100%;
  min-width: 1024px;
  min-height: 576px;
  background:url('../../assets/background.png') no-repeat;
  background-size: cover;
  position: relative;
  .el-form-item__content{
    height: 60px;
    line-height:60px;
    font-size:0;
  }
  .svg-container_login{
    height: 22px;
    font-size: 22px;
    padding-top:2px;
  }
  .login-wrap {
    position:absolute;
    top:10%;
    left:10%;
    width:80%;
    height:80%;
    min-width:821px;
    min-height:462px;
    background:rgba(255,255,255,0);
    border-radius:21px;
    box-shadow:0px 0px 21px rgba(0,0,0,0.2);
    .login-form{
      float: left;
      width: 45%;
      height: 100%;
      padding-left:20px;
      text-align:center;
      background:rgba(255,255,255,1);
      border-radius:21px 0 0 21px;
      .title{
        display: block;
        margin: 80px 0 100px 0;
        height: 46px;
        line-height:46px;
        .logo{
          display: inline-block;
          vertical-align: top;
          margin:0 16px 0 0;
          height: 46px;
          width: 96px;
        }
        .text{
          display: inline-block;
          vertical-align: top;
          font-size: 30px;
          line-height:46px;
          height: 46px;
          color: #333;
        }
      }
      .el-form-item{
        margin-bottom: 25px;
      }
    }
  }
  .show-pwd {
    position: absolute;
    right: 21px;
    top: 13px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .svg-container{
    font-size:0;
  }
  .el-form-item{
    border-color:#aaa;
  }
}

</style>
