<template>
    <div class="couponDialog">
        <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="close">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="面额" :label-width="formLabelWidth" prop="price">
                    <el-input class="wd424" v-model="ruleForm.price" placeholder="元"></el-input>
                </el-form-item>
                <el-form-item label="门槛" :label-width="formLabelWidth" prop="threshold">
                    <el-input class="wd424" v-model="ruleForm.threshold" placeholder="元"></el-input>
                </el-form-item>
                <el-form-item label="总数" :label-width="formLabelWidth" prop="totalNumber">
                    <el-input class="wd424" v-model="ruleForm.totalNumber" placeholder="元"></el-input>
                </el-form-item>
                <el-form-item label="限领" :label-width="formLabelWidth" prop="limitNumber">
                    <el-input class="wd424" v-model="ruleForm.limitNumber" placeholder="元"></el-input>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth" required>
                    <div class="title">
                        <span style="color:red">*&nbsp;</span>领取起止时间
                    </div>
                    <div class="section">
                        <el-form-item prop="getStartTime">
                            <el-date-picker
                                type="datetime"
                                placeholder="起始日期时间"
                                class="wd200"
                                v-model="ruleForm.getStartTime"
                            ></el-date-picker>
                        </el-form-item>
                        <span class="line">—</span>
                        <el-form-item prop="getEndTime">
                            <el-date-picker
                                placeholder="结束日期时间"
                                type="datetime"
                                v-model="ruleForm.getEndTime"
                                class="wd200"
                            ></el-date-picker>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth" prop="price">
                    <div class="title">
                        <span style="color:red">*&nbsp;</span>使用起止时间
                    </div>
                    <div class="section">
                        <el-form-item prop="useStartTime">
                            <el-date-picker
                                type="datetime"
                                placeholder="起始日期时间"
                                class="wd200"
                                v-model="ruleForm.useStartTime"
                            ></el-date-picker>
                        </el-form-item>
                        <span class="line">—</span>
                        <el-form-item prop="useEndTime">
                            <el-date-picker
                                placeholder="结束日期时间"
                                type="datetime"
                                v-model="ruleForm.useEndTime"
                                class="wd200"
                            ></el-date-picker>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth">
                    <div class="tips">注意：用户可以在领取时间段预先领取，但在使用时间段内才能使用。</div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="submit" @click="submit('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getPermissionList, addcoupon } from "@/api/api";

export default {
  props: ["msg", "title"],
  data() {
    return {
      dis: false,
      dialogFormVisible: true,
      formLabelWidth: "150px",
      ruleForm: {
        price: "",
        threshold: "",
        totalNumber: "",
        limitNumber: "",
        getStartTime: "",
        getEndTime: "",
        useStartTime: "",
        useEndTime: ""
      },
      rules: {
        price: [{ required: true, message: "请输入面额", trigger: "blur" }],
        threshold: [
          { required: true, message: "请输入使用门槛", trigger: "blur" }
        ],
        totalNumber: [
          { required: true, message: "请输入总数", trigger: "blur" }
        ],
        limitNumber: [
          { required: true, message: "请输入限领数", trigger: "blur" }
        ],
        getStartTime: [
          { required: true, message: "请输入领取开始时间", trigger: "blur" }
        ],
        getEndTime: [
          { required: true, message: "请输入领取结束时间", trigger: "blur" }
        ],
        useStartTime: [
          { required: true, message: "请输入使用结束时间", trigger: "blur" }
        ],
        useEndTime: [
          { required: true, message: "请输入使用结束时间", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {
    this.dialogFormVisible = true;
    if (this.title == "查看优惠券") {
      this.dis = true;
    }
    $(".el-dialog").css("width", "800px");
  },
  methods: {
    ...mapActions(["setToKen"]),
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
            this.ruleForm.getStartTime = new Date(this.ruleForm.getStartTime).getTime() / 1000
            this.ruleForm.getEndTime = new Date(this.ruleForm.getEndTime).getTime() / 1000
            this.ruleForm.useStartTime = new Date(this.ruleForm.useStartTime).getTime() / 1000
            this.ruleForm.useEndTime = new Date(this.ruleForm.useEndTime).getTime() / 1000
          addcoupon({
            Price: this.ruleForm.price,
            Threshold: this.ruleForm.threshold,
            TotalCount: this.ruleForm.totalNumber,
            LimitCount: this.ruleForm.limitNumber,
            GetStartTime: this.ruleForm.getStartTime,
            GetEndTime: this.ruleForm.getEndTime,
            UseStartTime: this.ruleForm.useStartTime,
            UseEndTime: this.ruleForm.useEndTime,
          }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "设置成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
            this.dialogFormVisible = false;
            this.$emit("getMessage", false);
          });
        } else {
          return false;
        }
      });
    },
    close() {
      this.$emit("getMessage", false);
    }
  },
  components: {}
};
</script>
<style scoped lang="less">
.couponDialog {
  .wd424 {
    width: 424px;
  }
  .wd200 {
    width: 200px;
  }
  .tips {
    // text-indent: 40px;
    color: #797979;
  }
  .line {
    color: #e0e0e0;
    margin: 0 4px;
  }
  .title {
    position: relative;
    left: -50px;
    color: #333333;
  }
  .section {
    display: flex;
  }
  .el-form {
    width: 800px;
    margin: 0 auto;
    position: relative;
    // left: -40px;
  }
  .dialog-footer {
    text-align: center;
  }
  .submit {
    background: #14bf6d;
    color: #ffffff;
    width: 110px;
  }
}
</style>
