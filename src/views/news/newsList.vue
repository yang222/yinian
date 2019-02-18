<template>
    <div id="news">
        <div class="add">
            <el-button type="warning" @click="add">新增新闻</el-button>
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            fixed
            prop="date"
            label="日期"
            width="150">
            </el-table-column>
            <el-table-column
            prop="title"
            label="新闻标题"
            width="120">
            </el-table-column>
            <el-table-column
            prop="content"
            label="新闻内容"
            >
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
                <!-- <el-button size="small" type="primary" >查看</el-button> -->
                <el-button type="success" @click="toEdit(scope.$index)" size="small" >编辑</el-button>
                <el-button type="info"  @click="deletes(scope.$index)" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            style="margin-top:20px;"
            :total="totals">
        </el-pagination>
    </div>
</template>
<script>
export default {
    data() {
      return {
        tableData: [{
            id:"1",
            date: '2016-05-03',
            title: '王小虎',
            content: '上海市普陀区金沙江路 1518 弄',
      
        }],
        totals:10
      }
    },
    methods:{
        add(){
            this.$router.push("./addNews")
        },
        getData(){
            this.get({url:"New/lists",data:{
                signature:sessionStorage.token,
            }},(data)=>{
                // if()
                this.tableData = data.data;
            })
        },
        toEdit(index){
            const id = this.tableData[index].id;
            this.$router.push({path:"./editNews",query:{id:id}});
        },
        deletes(index){
            this.$confirm('是否删除此条新闻?', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                    
            });
        }
    }
}
</script>
<style lang="scss">
#news{
    padding: 10px;
    .add{
        padding-bottom: 10px;
        text-align: right;
        .el-button{
            padding: 8px 10px;
            margin-left: 2px;
        }
    }
    .el-button--small{
        padding: 4px 10px;
        margin-left: 2px;
    }
}
</style>
