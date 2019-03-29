<template>
  <div class="stageElectricity">
    <div class="header">
      <p>时段电价</p>
    </div>
    <div class="section">
      <!-- 无数据时 -->
      <div class="cell border" v-if="visibility">
        <div class="sub_title border_rt display">· 时段一
          <div class="tag">示例</div>
        </div>
        <div class="content border_rt display">
          <div>
            <p>18:00~22:00</p>
            <p>09:00~12:00</p>
            <p>06:00~08:00</p>
          </div>
        </div>
        <div class="desc display border_rt">在各桩服务费基础上上涨10%</div>
        <div class="handle display">
          <div>
            <div class="edit">
              <el-button class="btn edit_btn">编辑</el-button>
            </div>
            <div class="del">
              <el-button class="btn del_btn">删除</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 有数据时 -->
      <div class="cell border" v-if="!visibility" v-for="(item,index) in tableData" :key="index">
        <div class="sub_title border_rt display">· 时段{{index + 1}}</div>
        <div class="content border_rt display">
          <div>
            <p v-for="(list,i) in item.Times" :key="i">{{list}}</p>
          </div>
        </div>
        <div class="desc display border_rt">
          <p>{{item.Increase < 0 ? '在各桩服务费基础上下调'+item.Increase*100+'%' : item.Increase > 0 ? '在各桩服务费基础上上涨'+item.Increase*100+'%' : "全天一致的电价" }}</p>
        </div>
        <div class="handle display">
          <div>
            <div class="edit" @click="editElectricity('编辑时段电价');msg=item.Number">
              <el-button class="btn edit_btn">编辑</el-button>
            </div>
            <div class="del" @click="del(item.Number)">
              <el-button class="btn del_btn">删除</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="tip">* 您可通过设置各个时段费用的涨跌（只在“服务费”基础上涨下调，基础的“电费”不会变），来调节各时段前来充电的用户数量，增加充电桩有效利用率。</div>
      <el-button class="add_btn" @click="addElectricity('新增时段电价')">新增时段电价</el-button>
    </div>
    <!-- dialog -->
    <electricityDialog v-if="dialogFormVisible" @getMessage="showMsg" :msg="msg" :title="title"></electricityDialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import electricityDialog from "@/components/pages/dialog/electricityDialog";
import {
  getstationintervalpricelist,
  deletestationtimeintervalprice
} from "@/api/api";

export default {
  data() {
    return {
      tableData: [],
      visibility: true,
      dialogFormVisible: false,
      msg: "0",
      title: "",
      formLabelWidth: "120px"
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
      this.getstationintervalpricelistFun();
    },
    addElectricity(title) {
      this.msg = 0;
      this.title = title;
      this.dialogFormVisible = true;
    },
    editElectricity(title) {
      this.title = title;
      this.dialogFormVisible = true;
    },
    edit() {
      this.dialogFormVisible = true;
      console.log("12132");
    },
    // 删除时段电价列表
    del(param) {
      console.log(param);
      this.$confirm("是否删除该时段电价?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletestationtimeintervalprice({
            timeNumber: param
          }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getstationintervalpricelistFun();
            } else {
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
      console.log(val);
      this.dialogFormVisible = val;
      this.getstationintervalpricelistFun();
    },
    getstationintervalpricelistFun() {
      getstationintervalpricelist({
        pageNumber: 1,
        pageSize: 30
      }).then(res => {
        if (res.data.code == 200) {
          if (res.data.data != null) {
            this.tableData = res.data.data;
            this.tableData.map((item, index) => {
              item.Times = item.Times.split("|");
            });
            this.visibility = false;
          } else {
            this.visibility = true;
          }
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
.stageElectricity {
  width: 100%;
  background: #ffffff;
  padding: 42px 0;
  .header {
    padding: 20px 30px;
    border-bottom: 1px solid #ebebeb;
    p {
      border-left: 4px solid #14bf6d;
      padding-left: 10px;
    }
  }
  .section {
    width: 750px;
    margin: 42px auto;
  }
  .cell {
    width: 700px;
    min-height: 100px;
    display: flex;
    text-align: center;
    .display {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sub_title {
      flex: 3;
      background: #14bf6d;
      color: #ffffff;
      position: relative;
      .tag {
        width: 40px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        background: #ff9c00;
        font-size: 12px;
        position: absolute;
        top: -1px;
        left: -1px;
      }
    }
    .content {
      flex: 4;
      padding: 10px;
    }
    .desc {
      flex: 9;
    }
    .handle {
      flex: 2.5;
    }
    .btn {
      width: 50px;
      height: 22px;

      border-radius: 11px;
    }
    .edit_btn {
      background: transparent;
      padding: 0;
      margin: 0;
      border: 1px solid #14bf6d;
      color: #14bf6d;
      position: relative;
      z-index: 111;
    }
    .del_btn {
      border: none;
      background: transparent;
      padding: 0;
      margin: 5px 0 0;
      border: 1px solid #fa5168;
      color: #fa5168;
      position: relative;
      z-index: 111;
    }
  }
  .tip {
    color: #797979;
    font-size: 14px;
    line-height: 21px;
    margin-top: 14px;
  }
  .add_btn {
    width: 186px;
    height: 40px;
    border-radius: 5px;
    background: #14bf6d;
    border: 1px solid #14bf6d;
    color: #ffffff;
    display: block;
    margin: 40px auto;
  }
  .border {
    border: 1px solid #14bf6d;
  }
  .border_lt {
    border-left: 1px solid #14bf6d;
  }
  .border_rt {
    border-right: 1px solid #14bf6d;
  }
  .wd200 {
    width: 200px;
  }
  .wd400 {
    width: 400px;
  }
  .wd110 {
    width: 110px;
  }
  .dialog_section {
    padding: 0 50px;
    .dialog_sub_title {
      width: 30px;
      height: 14px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .item {
      color: #e0e0e0;
      margin: 20px 0;
      display: flex;
      // justify-content: center;
      align-items: center;
      .lt {
        flex: 7;
      }
      .rt {
        flex: 2;
        // display: flex;
        // align-items : center;
      }
    }
    .sel {
      display: inline-block;
    }
    .dialog_btn {
      width: 24px;
      height: 24px;
      margin: 0 10px 0 0;
    }
    .dialog_add {
    }
    .dialog_del {
    }
  }
}
</style>
