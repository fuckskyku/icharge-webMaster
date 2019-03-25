<template>
  <div class="electricityManagement">
    <div class="header">
      <p>更改密码</p>
    </div>
    <div class="section">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="220px" class="ruleForm">
        <el-form-item label="电费" prop="electricCharge">
          <el-input class="wd380" v-model="ruleForm.electricCharge" placeholder="元/度"></el-input>
        </el-form-item>
        <el-form-item label="服务费" prop="serviceCharge">
          <el-input class="wd380" v-model="ruleForm.serviceCharge" placeholder="元/度"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="success" @click="submit('ruleForm')">提交电价设置</el-button>
          <el-button class="btn cancel" type="success" @click="skip('')">设置各时段涨跌</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      ruleForm: {
        electricCharge: "",
        serviceCharge: ""
      },
      rules: {
        electricCharge: [
          { required: true, message: "请输入电费", trigger: "blur" }
        ],
        serviceCharge: [
          { required: true, message: "请输入服务费", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {},
  methods: {
    ...mapActions(["setToKen"]),
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          alert("submit!");
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
.electricityManagement {
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
  .btn{
    width:186px;
    height:40px;
    background:#14BF6D;
    border-radius:5px;
    border: none;
    margin-top: 40px;
  }
  .cancel{
    background:#ffffff;
    border: 1px solid #14BF6D;
    color: #14BF6D;
    margin-left: 40px;
  }
}
</style>
