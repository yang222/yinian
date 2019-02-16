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
                <el-button @click="handleClick(scope.row)"  size="small" type="primary" >查看</el-button>
                <el-button type="success" size="small">编辑</el-button>
                <el-button type="info" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    methods: {
        add(){
            this.$router.push("./addRecruit")
        },
        handleClick(row) {
            console.log(row);
        }
    },

    data() {
      return {
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
