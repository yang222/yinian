<template>
    <div class="addNews">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="招聘职位" prop="name" :span="4">
                 <el-col :span="11">
                    <el-input v-model="ruleForm.name" :span="4"></el-input>
                 </el-col>
            </el-form-item>
            <el-form-item label="招聘时间" required>
                <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="薪资范围" :span="4">
                 <el-col :span="3">
                    <el-input v-model="ruleForm.num1" :span="3"></el-input>
                 </el-col>
                 <el-col class="line" :span="1">-</el-col>
                 <el-col :span="3">
                    <el-input v-model="ruleForm.num2" :span="3"></el-input>
                 </el-col>
            </el-form-item>
            <el-form-item label="职位描述" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" class="text"></el-input>
            </el-form-item>
            <el-form-item label="职位要求" prop="descs">
                <el-input type="textarea" v-model="ruleForm.descs" class="text"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="primary" plain @click="back">返回</el-button>
            </el-form-item>
            </el-form>
    </div>
</template>
<script>
export default {
    data() {
      return {
        ruleForm: {
          name: '',
          date1: '',
          num1:"",
          num2:"",
          desc: '',
          descs: '',
        },
        rules: {
          name: [
            { required: true, message: '请填写招聘职位', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写职位描述', trigger: 'blur' }
          ],
          descs: [
            { required: true, message: '请填写职位要求', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.post({url:"Recruit/add",data:{
                position:this.ruleForm.name,
                payStart:this.ruleForm.num1,
                payEnd:this.ruleForm.num2,
                date:new Date(this.ruleForm.date1).getTime(),
                content:this.ruleForm.desc,
                require:this.ruleForm.descs,
                signature:sessionStorage.token,
                uid:sessionStorage.uid
            }},(data)=>{
                if(data.status == 200){
                    this.$message({
                      message: "添加成功！",
                      type: 'success'
                    });
                    // this.resetForm('ruleForm');
                    setTimeout(()=>{
                      this.$router.back(-1)
                    })
                }else{
                    this.$message.error(data.msg);
                }
                
            })
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm.num1 = ""
        this.ruleForm.num2 = ""
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
    .line{text-align: center}
    .text{
      text-align: left;
      textarea{
          height: 150px;
          font-size: 14px;
          width: 50%;
          resize: none;
      }
    }
}
</style>
