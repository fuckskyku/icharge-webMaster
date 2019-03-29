<template>
  <div class="changePassword">
    <div class="header">
      <p>更改密码</p>
    </div>
    <div class="section">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="220px" class="ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input class="wd380" disabled v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input class="wd380" v-model="ruleForm.oldPwd" placeholder="请输入旧密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pwd">
          <el-input class="wd380" v-model="ruleForm.pwd" placeholder="请输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePwd">
          <el-input class="wd380" v-model="ruleForm.rePwd" placeholder="请输入确认密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="wd186" type="success" @click="submit('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { updatepassword } from "@/api/api";
import utils from "@/utils/index";

export default {
  data() {
    return {
      ruleForm: {
        account: "",
        oldPwd: "",
        pwd: "",
        rePwd: ""
      },
      rules: {
        oldPwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        pwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 26, message: "长度在 6 到 26个字符", trigger: "blur" }
        ],
        rePwd: [{ required: true, message: "请确认密码", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState(["token", "userInfo"])
  },
  mounted() {
    this.ruleForm.account = this.userInfo.mobile
  },
  methods: {
    ...mapActions(["setToKen"]),
    submit(form) {
      var that = this
      this.$refs[form].validate(valid => {
        if(!utils.equalTo(this.ruleForm.pwd,this.ruleForm.rePwd)) {
          that.$notify({
            title: "提示",
            message: "密码不一致，请重新输入",
            type: "error"
          });
          return ;
        }
        if (valid) {
          console.log(this.ruleForm.oldPwd)
          console.log(this.ruleForm.pwd)
          updatepassword({
            OldPassword: this.ruleForm.oldPwd,
            NewPassword: this.ruleForm.pwd
          }).then(res => {
            if (res.data.code == 200) {
              that.$notify({
                title: "提示",
                message: "密码修改成功",
                type: "success"
              });
            }else{
              that.$notify({
                title: "提示",
                message: res.data.message,
                type: "success"
              });
            }
          });
        } else { 
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {}
};
</script>
<style scoped lang="less">
.changePassword {
  width: 100%;
  height: 478px;
  background: #ffffff;
  .header {
    padding: 20px 30px;
    border-bottom: 1px solid #ebebeb;
    p {
      border-left: 4px solid #14bf6d;
      padding-left: 10px;
    }
  }
  .ruleForm {
    padding: 50px 0;
  }
  .el-form-item {
    margin-bottom: 30px;
  }
  .wd380 {
    width: 380px;
  }
  .wd186 {
    width: 186px;
    background: #14bf6d;
  }
}
</style>
