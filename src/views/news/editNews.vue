<template>
    <div class="addNews">
         <div class="add">
           
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="新闻标题" prop="name" :span="4">
                 <el-col :span="11">
                <el-input v-model="ruleForm.name" :span="4"></el-input>
                 </el-col>
            </el-form-item>
            <el-form-item label="新闻时间" required>
                <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;" format="yyyy 年 MM 月 dd 日"></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="新闻内容">
                <!-- <el-input type="textarea" v-model="ruleForm.desc"></el-input> -->
                <div id="websiteEditorElem" style="height: 500px"></div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="primary" plain  @click="back">返回</el-button>
            </el-form-item>
            </el-form>
    </div>
</template>
<script>
import E from 'wangeditor'
export default {
    data() {
      return {
        ruleForm: {
          name: '',
          date1: '',
          resource: '',
      
        },
        rules: {
          name: [
            { required: true, message: '请输入新闻标题', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
       
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
        }
      };
    },
    created(){
        console.log(this.$route.query.id)
        this.getData();
    },
    mounted(){
        this.resource = new E('#websiteEditorElem')
        this.resource.onchange = function () {
          
        }
        this.resource.create()
    },
    methods: {
        getData(){
            this.get({url:"New/select",data:{
                id:this.$route.params.id,
                signature:sessionStorage.token,
            }},(data)=>{

            })
        },
      submitForm() {
          if(!this.ruleForm.name){
                this.$message({
                    message: '请输入新闻标题',
                    type: 'warning'
                });
                return
            }
            if(!this.ruleForm.date1){
                this.$message({
                    message: '请选择新闻时间',
                    type: 'warning'
                });
                return
            }
            if(!this.resource.txt.html()){
              this.$message({
                    message: '请输入新闻内容',
                    type: 'warning'
                });
                return
            }
            this.post({url:"New/update",data:{
                id:this.$route.params.id,
                title:this.ruleForm.name,
                content:this.resource.txt.html(),
                date:this.ruleForm.date1.toString(),
                signature:sessionStorage.token
            }},(data)=>{
                if(data.status == 200){
                    this.$alert('密码修改成功，请重新登录', '', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$store.state.token = "";
                            sessionStorage.token = "";
                            this.$router.push("./login")
                        }
                    });
                   
                }else{
                    this.$message.error(data.msg);
                }
                
            })
      },
      resetForm(formName) {
          this.$refs[formName].resetFields();
          this.resource.txt.clear();
      },
      back(){
          this.$router.back(-1)
      }
    }
}
</script>
<style lang="scss">
.addNews{
     .add{
        padding-bottom: 10px;
        text-align: right;
        .el-button{
            padding: 8px 10px;
            margin-left: 2px;
        }
    }
    padding: 10px;
    padding-bottom: 50px;
    
}
.el-popper{
    z-index: 10002 !important;
}
</style>
