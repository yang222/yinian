<template>
    <div id="home">
        <headers></headers>
        <el-row class="tac">
            <el-col class="leftList">
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <!-- <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu> -->
                <router-link to="./newsList">
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">新闻管理</span>
                </el-menu-item>
                </router-link>
                <router-link to="./recruitList">
                <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title">招聘管理</span>
                </el-menu-item>
                </router-link>
                <router-link to="./password">
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">修改密码</span>
                </el-menu-item>
                </router-link>
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
    }
}
</style>
