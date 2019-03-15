<template>
    <div id="news">
        <div class="search" style="text-align:left;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="新闻标题">
                    <el-input v-model="formInline.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="新闻发布人">
                    <el-input v-model="formInline.author" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="新闻日期">
                    <el-date-picker
                            v-model="formInline.date"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="新闻类型">
                    <el-select v-model="formInline.type" placeholder="" @change="onSubmit">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="行业动态" value="1"></el-option>
                    <el-option label="易念动态" value="2"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="新闻中英文版">
                    <el-select v-model="formInline.is_cn" placeholder="" @change="onSubmit">
                    <el-option label="中文版" value="1"></el-option>
                    <el-option label="英文版" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="warning" @click="add">新增新闻</el-button>
                </el-form-item>
            </el-form>
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
            width="300">
            </el-table-column>
            <el-table-column
            prop="about"
            label="新闻简介"
            width="300"
            >
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="300">
            <template slot-scope="scope">
                <!-- <el-button size="small" type="primary" >查看</el-button> -->
                <el-button type="success" @click="toEdit(scope.row.id)" size="small" >编辑</el-button>
                <el-button type="primary" @click="toEnews(scope.row.id)" size="small" >英文版</el-button>
                <el-button type="info"  @click="deletes(scope.row.id)"  size="small">删除</el-button>
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
        tableData: [],
        totals:10,
        pageSize:"10",
        page:1,
        formInline: {
            title: '',
            author: '',
            date: '',
            type: '0',
            is_cn:"1",
        }
      }
    },
    created(){
        this.getData();
    },
    methods:{
        add(){
            this.$router.push("./addNews")
        },
        getData(){
            this.get({url:"New/lists",data:{
                page:this.page,
                pageSize:this.pageSize,
                title:this.formInline.title,
                author:this.formInline.author,
                date:this.formInline.date == ""?0:new Date(this.formInline.date).getTime(),
                type:this.formInline.type,
                signature:sessionStorage.token,
                uid:sessionStorage.uid,
                is_cn:this.formInline.is_cn,
            }},(data)=>{
                if(data.status == 200){
                    this.tableData = data.data;
                    this.totals = Number(data.totalNum)
                }else{
                    this.$message.error(data.msg);
                }
                
            })
        },
        // 删除新闻
        deletes(id){
            this.$confirm('是否删除此条新闻?', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.post({url:"New/delete",data:{
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
            }).catch(() => {
                    
            });
            
        },
        change(page){
            this.page = page;
            this.getData();
        },
        toEdit(id){
            this.$router.push({path:"./editNews",query:{id:id}});
        },
        toEnews(id){
            this.$router.push({path:"./eNews",query:{id:id}});
        },
        onSubmit() {
            this.getData();
        }
    }
}
</script>
<style lang="scss">
#news{
    padding: 20px;
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
    .cell{overflow: hidden; text-overflow: ellipsis;white-space: nowrap;overflow: hidden;}
}
</style>
