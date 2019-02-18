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
    height: 60px;
    border-bottom: 1px solid rgb(84, 92, 100);
    overflow: hidden;
    .el-row{
        display: flex;
    }
    .left{
        min-width: 100px;
        width: 150px;
    }
    .logo{
        float: left;
        height: 60px;
        font-size: 34px;
        line-height: 60px;
        text-align: center;
        width: 100%;
        text-indent: 1000000000000px;
        background:url("./../../static/login/logo.png") no-repeat center center;
        background-size: 100px 46px;
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
            height: 59px;
            line-height: 59px;
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
