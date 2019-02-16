<template>
    <div id="header">
        <el-row>
            <el-col :span="4" class="left"><h1 class="logo">易念科技</h1></el-col>
            <el-col :span="20"> <div class="names"></div></el-col>
        </el-row>
        
       
    </div>
</template>
<script>
export default {
    
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
}
</style>
