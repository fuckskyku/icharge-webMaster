<template>
  <div class="electricityManagement">
    <div class="header">
      <p>电费管理</p>
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
          <el-button class="btn cancel" type="success" @click="addElectricity">设置各时段涨跌</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- dialog -->
    <electricityDialog v-if="dialogFormVisible" @getMessage="showMsg" :msg="msg" :title="title"></electricityDialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { settingstationprice } from "@/api/api";
import utils from "@/utils/index";
import electricityDialog from "@/components/pages/dialog/electricityDialog";

export default {
  data() {
    return {
      visibility: false,
      dialogFormVisible: false,
      title: "新增时段电价",
      msg: "0",
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
    ...mapState(["token","stationPrice"])
  },
  mounted() {
    this.ruleForm = this.stationPrice
  },
  methods: {
    ...mapActions(["setToKen","setStationPrice"]),
    addElectricity() {
      this.dialogFormVisible = true;
    },
    showMsg(val) {
      this.dialogFormVisible = val;
    },
    submit(form) {
      var that = this;
      this.$refs[form].validate(valid => {
        if (
          !utils.number(this.ruleForm.electricCharge) ||
          !utils.number(this.ruleForm.serviceCharge)
        ) {
          that.$notify({
            title: "提示",
            message: "输入有误，请重新输入",
            type: "error"
          });
          return;
        }
        if (valid) {
          settingstationprice({
            ElectricityPrice: this.ruleForm.electricCharge,
            ServicePrice: this.ruleForm.serviceCharge
          }).then(res => {
            if (res.data.code == 200) {
              var priceObj = [
                {
                  key: "electricityPrice",
                  value: this.ruleForm.electricCharge
                },
                {
                  key: "servicePrice",
                  value: this.ruleForm.serviceCharge
                }
              ]
              this.setStationPrice(priceObj)
              that.$notify({
                title: "提示",
                message: "设置成功",
                type: "success"
              });
            } else {
              that.$notify({
                title: "提示",
                message: res.data.message,
                type: "success"
              });
            }
          });
        } else {
          // that.$notify({
          //   title: "提示",
          //   message: "设置失败，请重新设置",
          //   type: "error"
          // });
          return false;
        }
      });
    }
  },
  components: {
    electricityDialog
  }
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
  .btn {
    width: 186px;
    height: 40px;
    background: #14bf6d;
    border-radius: 5px;
    border: none;
    margin-top: 40px;
  }
  .cancel {
    background: #ffffff;
    border: 1px solid #14bf6d;
    color: #14bf6d;
    margin-left: 40px;
  }
}
</style>
