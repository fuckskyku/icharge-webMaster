<template>
  <div class="moneyBills">
    <div class="header">
      <p>资金账单</p>
    </div>
    <div class="section">
      <div class="tabel_main">
      <el-container>
        <el-main>
          <el-table
            :data="tableData"
            :row-style="{'border': 'none','text-align':'center'}"
            :header-cell-style="tableHeaderColor"
            :cell-style="{textAlign:'center',color:'#0C0C0C'}"
            stripe
            style="width: 100%"
          >
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="price" label="金额"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="skip('MoneyBillDetails')" class="btn examine_btn">查看</el-button>
                <!-- <el-button @click="skip('ElectricityBillsDetails',scope.row.id)" class="btn examine_btn">查看</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      tableData: [
        {
          time: "2018年11月9日15:45:30",
          type: "收入",
          remark: "充电",
          price: "68",
        },
        { time: "2018年11月9日15:45:30",
          type: "收入",
          remark: "充电",
          price: "68", }
      ],
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {},
  methods: {
    ...mapActions(["setToKen"]),
    skip(type, param) {
      this.$router.push({
        name: type,
        params: {
          id: param
        }
      });
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #14bf6d;color: #fff;font-weight: 500;text-align:center";
      }
    }
  },
  components: {}
};
</script>
<style scoped lang="less">
.moneyBills {
  width: 100%;
  background: #ffffff;
  .header {
    padding: 20px 30px;
    border-bottom: 1px solid #ebebeb;
    p {
      border-left: 4px solid #14bf6d;
      padding-left: 10px;
      color: #000000;
      font-size: 18px;
    }
  }
  .section {
    padding: 20px 15px;
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
}
</style>
