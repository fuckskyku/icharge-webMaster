<template>
  <div class="roleDialog">
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="close">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
          <el-input class="wd380" :disabled="dis" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" prop="account">
          <!--  -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="create_account" @click="addRole('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getPermissionList, editRole } from "@/api/api";

export default {
  props: ["msg", "title"],
  data() {
    return {
      dis: false,
      dialogFormVisible: true,
      formLabelWidth: "100px",
      ruleForm: {
        account: "",
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      },
     
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {
    this.dialogFormVisible = true;
    if (this.title == "修改角色" || this.title == "查看角色") {
      this.dis = true;
    }
  },
  methods: {
    ...mapActions(["setToKen"]),
    init() {
      getPermissionList({}).then(res => {});
    },
    addRole(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          editRole({
            RoleId: "",
            RoleName: "",
            Remark: "",
            PermissionIds: "" //权限ID， 多个权限使用 英文状态逗号隔开
          }).then(res => {});
          this.$message({
            type: "success",
            message: "创建成功!"
          });
          this.dialogFormVisible = false;
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
.roleDialog {
  .wd380 {
    width: 380px;
  }
  .box {
    width: 378px;
    border-radius: 5px;
    display: flex;
    border: 1px solid #ebebeb;
    .lt {
      flex: 1;
      border-right: 1px solid #ebebeb;
      .radio {
        margin: 23px 0;
        position: relative;
      }
      .triangle {
        border-width: 5px 8px 5px 8px;
        border-style: solid;
        border-color: transparent transparent transparent #14bf6d;
        position: absolute;
        top: 3px;
        right: -26px;
        display: none;
      }
    }
    .rt {
      flex: 1;
    }
    .box_hd {
      background: #f8f8f8;
      height: 38px;
      line-height: 38px;
      text-align: center;
    }
    .box_bd {
      padding: 30px 10px;
      text-align: center;
    }
  }
  .el-form {
    width: 500px;
    margin: 0 auto;
    position: relative;
    left: -40px;
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
