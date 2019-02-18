<template>
    <div class="pw">
        <el-form :label-position="labelPosition" :rules="rules" label-width="120px" :model="formLabelAlign">
            <el-form-item label="旧密码"  prop="password">
                <el-col :span="8">
                    <el-input v-model="formLabelAlign.password" type="password" :span="3"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="新密码" prop="password1">
                <el-col :span="8">
                <el-input v-model="formLabelAlign.password1" type="password" :span="3"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="确认新密码" prop="password2">
                <el-col :span="8">
                <el-input v-model="formLabelAlign.password2" type="password" :span="3"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">立即保存</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          password: '',
          password1: '',
          password2: ''
        },
        rules: {
          password: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          password1: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '请再次输入新密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods:{
        save(){
            if(!this.formLabelAlign.password){
                this.$message({
                    message: '请输入旧密码！',
                    type: 'warning'
                });
                return
            }
            if(!this.formLabelAlign.password1){
                this.$message({
                    message: '请输入新密码！',
                    type: 'warning'
                });
                return
            }
            if(!this.formLabelAlign.password2){
                this.$message({
                    message: '请再次输入新密码！',
                    type: 'warning'
                });
                return
            }
            if(this.formLabelAlign.password2 !=this.formLabelAlign.password1){
                this.$message({
                    message: '两次密码输入不一致！',
                    type: 'warning'
                });
                return
            }
            this.post({url:"User/changePassword",data:{
                oldPassword:this.formLabelAlign.password,
                newPassword:this.formLabelAlign.password1,
                conPassword:this.formLabelAlign.password2,
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
        reset(){
            this.formLabelAlign.password = ""
            this.formLabelAlign.password1 = ""
            this.formLabelAlign.password2 = ""
        }
    }
}
</script>
<style lang="scss">
.pw{
    padding: 10px;
    padding-top: 30px;
    .el-form-item__content{
        text-align: left;
    }
}
</style>
