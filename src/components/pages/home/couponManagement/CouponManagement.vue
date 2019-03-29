<template>
  <div class="couponManagement">
    <div class="header">
      <p>优惠券管理</p>
    </div>
    <div class="tabel_main">
      <el-container>
        <el-header style="height:auto;">
          <el-row class="search_content">
            <span style="float:right;">
              <el-button
                class="add"
                @click="addcoupon"
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
            <el-table-column prop="id" label="优惠券ID"></el-table-column>
            <el-table-column prop="statusName" label="状态"></el-table-column>
            <el-table-column prop="price" label="面额"></el-table-column>
            <el-table-column prop="threshold" label="门槛"></el-table-column>
            <el-table-column prop="totalNumber" label="总数"></el-table-column>
            <el-table-column prop="limitNumber" label="限领"></el-table-column>
            <el-table-column label="领取起止时间" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.getStartTime | formatDate }}-{{scope.row.getEndTime | formatDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="使用起止时间" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.useStartTime | formatDate }}-{{scope.row.useEndTime | formatDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="skip('CouponDetails',scope.row.id)" class="btn examine_btn">查看</el-button>
                <el-button @click="del(scope.row.id)" class="btn delete_btn">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </div>
    <!-- dialog -->
    <couponDialog v-if="dialogFormVisible" @getMessage="showMsg" :title="title"></couponDialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getcouponlist, delCoupon } from "@/api/api";
import couponDialog from "@/components/pages/dialog/couponDialog";

export default {
  data() {
    return {
      title: "",
      dialogFormVisible: false,
      tableData: []
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["setToKen"]),
    init() {
      this.getcouponlistFun()
    },
    getcouponlistFun() {
      getcouponlist({}).then(res => {
        if (res.data.code == 200) {
          if (res.data.code == 200 && res.data.data != null) {
            this.tableData = res.data.data.list;
          }
        }
      });
    },
    skip(type, param) {
      this.$router.push({
        name: type,
        query: {
          id: param
        }
      });
    },
    del(id) {
      this.$confirm("是否删除该优惠券?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          delCoupon({
            id: id
          }).then(res=> {
            if(res.data.code == 200){
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getcouponlistFun()
            }else{
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          })
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addcoupon() {
      this.title = "新增优惠券"
      this.dialogFormVisible = true
    },
    showMsg(val) {
      this.dialogFormVisible = val;
      this.getcouponlistFun()
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #14bf6d;color: #fff;font-weight: 500;text-align:center";
      }
    }
  },
  components: {
    couponDialog
  }
};
</script>
<style scoped lang="less">
.couponManagement {
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
