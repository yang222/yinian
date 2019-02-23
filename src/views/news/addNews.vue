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
            <el-form-item label="新闻类别">
              <el-radio-group v-model="ruleForm.type">
                <el-radio label="1">易念新闻</el-radio>
                <el-radio label="2">行业新闻</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="添加图片">
                <!-- <el-input type="textarea" v-model="ruleForm.desc"></el-input> -->
                <div class="addimg">
                  <el-upload
                    class="upload-demo"
                    :action="url"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
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
                <div id="websiteEditorElem" style="height: 400px"></div>
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
        },
        url:"http://www.yinian.com:8080/Admin/New/upload?signature="+sessionStorage.token+"&uid="+sessionStorage.uid,
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
          ]
        },
        fileList2: [{name: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg', 
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
         {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
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
            this.post({url:"New/add",data:{
                title:this.ruleForm.name,
                content:this.resource.txt.html(),
                date:this.ruleForm.date1.getTime(),
                signature:sessionStorage.token,
                uid:sessionStorage.uid,
            }},(data)=>{
                if(data.status == 200){
                    this.$message({
                      message: "添加新闻成功！",
                      type: 'success'
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
      },
      handleRemove(file, fileList) {
        this.post({url:"New/remove ",data:{
            name:file.name,
            signature:sessionStorage.token,
            uid:sessionStorage.uid,
        }},(data)=>{
            if(data.status == 200){
                this.$message({
                    message: "删除成功！",
                    type: 'success'
                });
                
            }else{
                this.$message.error(data.msg);
            }
            
        })
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      success(file){
        console.log(file)
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
}
.el-popper{
    z-index: 10002 !important;
}
</style>
