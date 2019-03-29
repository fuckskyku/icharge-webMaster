<template>
    <div class="branchAccountDialog">
        <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="close">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
                    <el-input class="wd380" :disabled="accountDis" v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input class="wd380" :disabled="dis" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
                    <el-input class="wd380" :disabled="dis" v-model="ruleForm.role"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="create_account" @click="addAcound('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["title"],
  data() {
    return {
      dis: false,
      accountDis: false,
      dialogFormVisible: true,
      ruleForm: {
        account: "",
        name: "",
        role: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        role: [{ required: true, message: "请输入角色", trigger: "blur" }]
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {
    this.dialogFormVisible = true;
    if (this.title == "查看子账号") {
      this.dis = true;
      this.accountDis = true;
    }
    if (this.title == "修改子账号") {
      this.dis = false;
      this.accountDis = true;
    }
  },
  methods: {
    ...mapActions(["setToKen"]),
    addAcound(form) {
      if (this.title == "新增子账号") {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.$message({
              type: "success",
              message: "创建成功!"
            });
            this.dialogFormVisible = false;
            this.$emit("getMessage", false);
          } else {
            return false;
          }
        });
      } else if (this.title == "修改子账号") {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.$confirm("确认修改?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              center: true
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.dialogFormVisible = false;
                this.$emit("getMessage", false);
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消修改"
                });
              });
            this.dialogFormVisible = false;
            this.$emit("getMessage", false);
          } else {
            return false;
            this.$emit("getMessage", false);
          }
        });
      } else {
        this.dialogFormVisible = false;
        this.$emit("getMessage", false);
      }
    },
    close() {
      this.$emit("getMessage", false);
    }
  },
  components: {}
};
</script>
<style scoped lang="less">
.branchAccountDialog {
  .wd380 {
    width: 380px;
  }
  .dialog-footer {
    text-align: center;
  }
  .create_account {
    background: #14bf6d;
    color: #ffffff;
    width: 110px;
  }
}
</style>
