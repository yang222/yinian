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
            <el-form-item label="新闻作者" prop="author">
                <el-col :span="11">
                <el-input v-model="ruleForm.author" :span="4"></el-input>
                 </el-col>
            </el-form-item>
            <el-form-item label="新闻时间" required>
                <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;" format="yyyy 年 MM 月 dd 日"></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="新闻类别">
              <el-radio-group v-model="ruleForm.type">
                <el-radio label="1">行业新闻</el-radio>
                <el-radio label="2">易念新闻</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="添加图片">
                <!-- <el-input type="textarea" v-model="ruleForm.desc"></el-input> -->
                <div class="addimg">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-change="addFile"
                    :before-upload ="before"
                    :file-list="fileList2"
                    :on-success="success"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </div>
            </el-form-item>
            <el-form-item label="新闻简介" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" class="text"></el-input>
            </el-form-item>
            <el-form-item label="新闻内容">
                <!-- <el-input type="textarea" v-model="ruleForm.desc"></el-input> -->
                <div id="websiteEditorElem"></div>
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
            type:"1",
            desc:"",
            author:"",
        },
        files:[],
        url:this.http+"New/upload?signature="+sessionStorage.token+"&uid="+sessionStorage.uid,
        rules: {
          name: [
            { required: true, message: '请输入新闻标题', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
       
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写新闻简介', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请填写新闻作者', trigger: 'blur' }
          ]
        },
        fileList2: []
      };
    },
    mounted(){
        this.resource = new E('#websiteEditorElem')
        this.resource.onchange = function () {
          
        }
        this.resource.create()
    },
    methods: {
      submitForm() {
            if(!this.ruleForm.name){
                this.$message({
                    message: '请输入新闻标题',
                    type: 'warning'
                });
                return
            }
            if(!this.ruleForm.author){
                this.$message({
                    message: '请填写新闻作者',
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
            if(!this.ruleForm.date1){
              this.$message({
                    message: '请输入新闻简介！',
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
            var files=[];
            this.fileList2.forEach((e,i)=>{
                files.push({
                    filename:this.fileList2[i].filename,
                    url:this.fileList2[i].url,
                })
            })
            this.postJson({url:"New/add",data:JSON.stringify({
                title:this.ruleForm.name,
                content:this.resource.txt.html(),
                date:new Date(this.ruleForm.date1).getTime(),
                about:this.ruleForm.desc ,
                image_url:files,
                type:this.ruleForm.type,
                author:this.ruleForm.author,
                signature:sessionStorage.token,
                uid:sessionStorage.uid,
            })},(data)=>{
                if(data.status == 200){
                    this.$message({
                      message: "添加新闻成功！",
                      type: 'success'
                    });
                    setTimeout(()=>{
                        this.$router.back(-1)
                    },500)
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
      },
      handleRemove(file, fileList) {
        this.fileList2.forEach((e,i)=>{
            if(this.fileList2[i].url==file.url ){
                this.fileList2.splice(i,1);
            }
        })
      },
      handlePreview(file) {
      },
      before(file,fileList){
          if(file.size > 500*1024){
              this.$message.error("图片大小超出500KB，请重新上传！");
              return false;
          }
      },
      addFile(file,fileList){
          if(file.size > 500*1024){
              this.$message.error("图片大小超出500KB，请重新上传！");
              return false;
          }
      },
      success(response, file, fileList){
            
            if(response.status!=200){
                this.$message.error(response.msg);
            }else{
                this.fileList2.push({name:response.data.url,url:response.data.url,filename:response.data.filename})
            }
      }
    }
}
</script>
<style lang="scss">
.addNews{
    height: 100%;
    overflow-y: scroll;
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
    .el-form-item__content{text-align: left;}   
    .upload-demo{width: 800px;}  
    .w-e-text-container{
        height: 500px !important;/*!important是重点，因为原div是行内样式设置的高度300px*/
    }
}
.el-popper{
    z-index: 10002 !important;
}
</style>
