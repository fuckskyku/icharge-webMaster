<template>
  <div class="branchAccount">
    <div class="header">
      <p>子账号管理</p>
    </div>
    <div class="tabel_main">
      <el-container>
        <el-header style="height:auto;">
          <el-row class="search_content">
            <span style="float:right;">
              <el-button
                class="add"
                @click="addAccount"
              >新建</el-button>
            </span>
          </el-row>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            :row-style="{'border': 'none','text-align':'center'}"
            :header-cell-style="tableHeaderColor"
            :cell-style="{textAlign:'center',color:'#0C0C0C'}"
            stripe
            style="width: 100%"
          >
            <el-table-column prop="account" label="账号" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="examine(scope.row,scope.$index)" class="btn examine_btn">查看</el-button>
                <el-button @click="edit(scope.row,scope.$index)" class="btn edit_btn">修改</el-button>
                <el-button @click="del(scope.$index,scope.row)" class="btn delete_btn">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </div>
    <!-- dialog -->
    <branchAccountDialog v-if="dialogFormVisible" @getMessage="showMsg" :title="title"></branchAccountDialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import branchAccountDialog from "@/components/pages/dialog/branchAccountDialog";

export default {
  data() {
    return {
      dialogFormVisible: false,
      title: "新增子账号",
      tableData: [
        {
          account: "sc30",
          name: "库昊",
          role: "超级管理员"
        },
        { account: "sc30", name: "库昊", role: "超级管理员" }
      ],
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {},
  methods: {
    ...mapActions(["setToKen"]),
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    skip(type, param) {
      this.$router.push({
        name: type,
        params: {
          id: param
        }
      });
    },
    showMsg(val) {
      this.dialogFormVisible = val
    },
    addAccount() {
      this.title = "新增子账号"
      this.dialogFormVisible = true
    },
    examine(row, id) {
      this.dialogFormVisible = true;
      this.title = "查看子账号";
    },
    edit(row, id) {
      this.dis = false;
      this.accountDis = true;
      this.dialogFormVisible = true;
      this.title = "修改子账号";
    },
    del() {
      this.$confirm("是否删除该账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改table header的样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #14bf6d;color: #fff;font-weight: 500;text-align:center";
      }
    }
  },
  components: {
    branchAccountDialog
  }
};
</script>
<style scoped lang="less">
.branchAccount {
  width: 100%;
  background: #ffffff;
  .header {
    padding: 20px 30px;
    border-bottom: 1px solid #ebebeb;
    p {
      border-left: 4px solid #14bf6d;
      padding-left: 10px;
    }
  }
  .wd380 {
    width: 380px;
  }
  .el-form-item {
    margin-bottom: 36px;
  }
  .create_account {
    background: #14bf6d;
    color: #ffffff;
    width: 110px;
  }
  .dialog-footer {
    text-align: center;
  }
  .tabel_main {
    .el-container {
      width: 100%;
      .el-header {
        // padding: 0;
        margin: 15px 0;
      }
      .el-main {
        padding-top: 0;
      }
      .search_content .add {
        background: #14bf6d;
        width: 98px;
        border-radius: 5px;
        color: #ffffff;
      }
      .btn {
        margin: 0;
        border: none;
        background: transparent;
        padding: 0 10px;
      }
      .examine_btn {
        color: #14bf6d;
      }
      .edit_btn {
        color: #ff9c00;
      }
      .delete_btn {
        color: #fa5168;
      }
    }
  }
}
</style>
