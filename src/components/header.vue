<template>
    <div id="header">
        <el-row>
            <el-col  class="left"><h1 class="logo">易念科技</h1></el-col>
            <el-col  class="right"> <div class="names"><a href="javascript:;" @click="loginOut">退出登录 <span class="iconfont icon-tuichu" style=""></span></a></div></el-col>
        </el-row>
        
       
    </div>
</template>
<script>
export default {
    methods:{
        loginOut(){
            this.$store.state.token = "";
            sessionStorage.token = "";
            this.$router.push("./login")
        }
    }
}
</script>
<style lang="scss">
#header{
    height: 88px;
    border-bottom: 1px solid rgb(84, 92, 100);
    overflow: hidden;
    position: fixed;
    top:0;
    left: 0;
    z-index: 1000003;
    background: #fff;
    width: 100%;
    .el-row{
        display: flex;
    }
    .left{
        min-width: 150px;
        width: 200px;
    }
    .logo{
        float: left;
        height: 88px;
        font-size: 34px;
        line-height: 60px;
        text-align: center;
        width: 100%;
        text-indent: -1000000000000px;
        background:url("./../../static/login/logo.png") no-repeat center center;
        background-size: auto 80%;
    }
    .right{
        flex: 1;
        text-align: right;
        .iconfont{
            float: right;
            width: 22px;
            height: 22px;
            color: #333;
            font-size: 22px;
        }
        .names{
            display: inline-block;
            height: 99px;
            line-height: 99px;
            padding-right: 30px;
            a{
                display: block;
                &:hover{
                    color: #66b1ff;
                    .iconfont{
                        color: #66b1ff;
                    }
                }
            }
        }
    }
}
</style>
