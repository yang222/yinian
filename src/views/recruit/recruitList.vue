.<template>
    <div id="news">
        <div class="add">
            <el-button type="warning" @click="add">新增招聘</el-button>
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            fixed
            prop="date"
            label="日期"
            width="180">
            </el-table-column>
            <el-table-column
            prop="position"
            label="职位"
            width="120">
            </el-table-column>
             <el-table-column
            prop="pay"
            label="薪资"
            width="150"
            >
            </el-table-column>
            <el-table-column
            prop="content"
            label="职位职责"
            >
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
                <!-- <el-button @click="handleClick(scope.row)"  size="small" type="primary" >查看</el-button> -->
                <el-button type="success" @click="toEdit(scope.row.id)" size="small">编辑</el-button>
                <el-button type="info" @click="deletes(scope.row.id)" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            style="margin-top:20px;"
            @current-change="change"
            :total="totals">
        </el-pagination>
    </div>
</template>
<script>
export default {
     data() {
      return {
        page:"1",
        pageSize:10,
        totals:1,
        tableData: []
      }
    },
    created(){
        this.getData();
    },
    methods: {
        //获取招聘
        getData(){
            this.get({url:"Recruit/lists",data:{
                page:this.page,
                pageSize:this.pageSize,
                signature:sessionStorage.token,
                uid:sessionStorage.uid
            }},(data)=>{
                if(data.status == 200){
                    this.tableData = data.data;
                    this.totals = Number(data.totalNum);
                    // this.$message({
                    //   message: "添加成功！",
                    //   type: 'success'
                    // });
                    // this.resetForm('ruleForm');
                }else{
                    this.$message.error(data.msg);
                }
                
            })
        },
        //删除招聘信息
        delete(id){
            this.post({url:"Recruit/delete",data:{
                id:id,
                signature:sessionStorage.token,
                uid:sessionStorage.uid
            }},(data)=>{
                if(data.status == 200){
                    this.$message({
                      message: "删除成功！",
                      type: 'success'
                    });
                    this.getData();
                }else{
                    this.$message.error(data.msg);
                }
                
            })
        },
        change(page){
            this.page = page;
            this.getData();
        },
        add(){
            this.$router.push("./addRecruit")
        },
        toEdit(id){
            this.$router.push({path:"./editRecruit",query:{id:id}});
        },
        deletes(index){
            this.$confirm('是否删除此条招聘信息?', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delete(index)
            }).catch(() => {
                
            });
        }
    },
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
