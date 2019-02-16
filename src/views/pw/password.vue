<template>
    <div class="pw">
        <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
            <el-form-item label="旧密码">
                <el-col :span="8">
                    <el-input v-model="formLabelAlign.name" :span="3"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="新密码">
                <el-col :span="8">
                <el-input v-model="formLabelAlign.region" :span="3"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="确认新密码">
                <el-col :span="8">
                <el-input v-model="formLabelAlign.type" :span="3"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" >立即保存</el-button>
                <el-button >重置</el-button>
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
          name: '',
          region: '',
          type: ''
        }
      };
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
