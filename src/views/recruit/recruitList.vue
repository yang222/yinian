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
            width="150">
            </el-table-column>
            <el-table-column
            prop="name"
            label="职位"
            width="120">
            </el-table-column>
             <el-table-column
            prop="province"
            label="薪资"
            width="150"
            >
            </el-table-column>
            <el-table-column
            prop="province"
            label="招聘内容"
            >
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
                <!-- <el-button @click="handleClick(scope.row)"  size="small" type="primary" >查看</el-button> -->
                <el-button type="success" @click="toEdit(scope.$index)" size="small">编辑</el-button>
                <el-button type="info" @click="deletes(scope.$index)" size="small">删除</el-button>
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
    methods: {
        add(){
            this.$router.push("./addRecruit")
        },
        toEdit(index){
            const id = this.tableData[index].id;
            this.$router.push({path:"./editNews",query:{id:id}});
        },
        deletes(index){
            this.$confirm('是否删除此条招聘信息?', '', {
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
    },

    data() {
      return {
        totals:20,
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
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
