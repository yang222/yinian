<template>
    <div id="home">
        <headers></headers>
        <el-row class="tac">
            <el-col class="leftList">
                <el-menu
                :default-active="this.$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                router
                active-text-color="#ffd04b">
         
                <el-menu-item index="/newsList" route="./newsList">
                    <i class="el-icon-menu"></i>
                    <span slot="title">新闻管理</span>
                </el-menu-item>
         
                <el-menu-item index="/recruitList">
                    <i class="el-icon-document"></i>
                    <span slot="title">招聘管理</span>
                </el-menu-item>
                <el-menu-item index="/password">
                    <i class="el-icon-setting"></i>
                    <span slot="title">修改密码</span>
                </el-menu-item>
                </el-menu>
              
            </el-col>
            <el-col class="rightCont">
                <router-view></router-view>
            </el-col>
        </el-row>    
    </div>
</template>
<script>
import headers from "@/components/header"
export default {
    components:{
        headers
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style lang="scss">
#home{
    padding:0;
    margin: 0;
    height: 100%;
    .el-row{
        display: flex;
    }
    .tac{
        height: 100%;
    }
    .leftList{
        height: 100%;
        box-sizing: border-box;
        padding-top: 100px;
        background: rgb(84, 92, 100);
        width: 200px;
    }
    .link{
        display: block;
        width: 100%;
        height: 100%;
    }
    .rightCont{
        flex: 1;
        box-sizing: border-box;
        padding-top: 100px;
    }
}
</style>
