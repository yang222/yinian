<template>
    <div id="header">
        <el-row>
            <el-col :span="3" class="left"><h1 class="logo">易念科技</h1></el-col>
            <el-col :span="21" class="right"> <div class="names"><a href="javascript:;" @click="loginOut">退出登录 <span></span></a></div></el-col>
        </el-row>
        
       
    </div>
</template>
<script>
export default {
    methods:{
        loginOut(){
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
    .left{
        min-width: 100px;
    }
    .logo{
        float: left;
        height: 60px;
        font-size: 34px;
        line-height: 60px;
        text-align: center;
        width: 100%;
    }
    .right{
        text-align: right;
        .names{
            display: inline-block;
            height: 60px;
            line-height: 60px;
            padding-right: 30px;
            a{
                display: block;
            }
        }
    }
}
</style>
