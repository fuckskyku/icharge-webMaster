<template>
  <div class="couponDetails">
    <div class="header">
      <p>
        优惠券管理>
        <span>详情页</span>
      </p>
    </div>
    <div class="section">
      <div>
        <p class="title">基本详情</p>
        <div class="box hd">
          <div class="box_lt">
            <div class="cell">
              <span class="sub_title">优惠券编号:</span>
              <span class="content">2018091200093443219</span>
            </div>
            <div class="cell">
              <span class="sub_title">状态:</span>
              <span class="content">可用</span>
            </div>
            <div class="cell">
              <span class="sub_title">适用桩站:</span>
              <span class="content">XX桩站</span>
            </div>
          </div>
          <div class="box_rt">
            <div class="cell">
              <span class="sub_title">面额:</span>
              <span class="content">20元</span>
            </div>
            <div class="cell">
              <span class="sub_title">门槛:</span>
              <span class="content">订单金额满150元可用</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="title">其他详情</p>
        <div class="box fd">
          <div class="box_lt">
            <div class="cell">
              <span class="sub_title">总发放数量:</span>
              <span class="content">XX张</span>
            </div>
            <div class="cell">
              <span class="sub_title">已使用数量:</span>
              <span class="content">XX张</span>
            </div>
            <div class="cell">
              <span class="sub_title">使用时间:</span>
              <span class="content">2018年12月12日14:28:22 - 2018年12月12日14:28:22</span>
            </div>
          </div>
          <div class="box_rt">
            <div class="cell">
              <span class="sub_title">已领取数量:</span>
              <span class="content">XX张</span>
            </div>
            <div class="cell">
              <span class="sub_title">领取时间:</span>
              <span class="content">2018年12月12日14:28:22</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      dialogFormVisible: false,
      dis: false,
      accountDis: false,
      tableData: [
        {
          couponID: "YHQ6534452143",
          status: "可用",
          price: "30",
          threshold: "50",
          totalNumber: "11",
          limitNumber: "2",
          receiveTime: "2019年3月12日-2019年4月12日",
          useTime: "2019年3月12日-2019年4月12日"
        }
      ],
      ruleForm: {
        price: "",
        threshold: "",
        totalNumber: "",
        limitNumber: "",
        getStartTime: "",
        getEndTime: "",
        useStartTime: "",
        useEndTime: "",
        title: "新增优惠券"
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
      },
      formLabelWidth: "200px"
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
    skip(type, param) {
      this.$router.push({
        name: type,
        params: {
          id: param
        }
      });
    },
    addAcound(form) {
      if (this.ruleForm.title == "新增子账号") {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.$message({
              type: "success",
              message: "创建成功!"
            });
            this.dialogFormVisible = false;
          } else {
            return false;
          }
        });
      } else if (this.ruleForm.title == "修改子账号") {
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
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消修改"
                });
              });
            this.dialogFormVisible = false;
          } else {
            return false;
          }
        });
      } else {
        this.dialogFormVisible = false;
      }
    },
    examine(row, id) {
      this.dis = true;
      this.accountDis = true;
      this.dialogFormVisible = true;
      this.ruleForm.title = "查看子账号";
    },
    edit(row, id) {
      this.dis = false;
      this.accountDis = true;
      this.dialogFormVisible = true;
      this.ruleForm.title = "修改子账号";
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
.couponDetails {
  width: 100%;
  background: #ffffff;
  .header {
    padding: 20px 30px;
    border-bottom: 1px solid #ebebeb;
    p {
      // border-left: 4px solid #14bf6d;
      padding-left: 10px;
      color: #797979;
      font-size: 18px;
      span {
        color: #000000;
      }
    }
  }
  .wd380 {
    width: 380px;
  }
  .section {
    padding: 0 30px 30px;
    .box {
      display: flex;
      padding: 0 0 20px;
    }
    .hd {
      border-bottom: 1px solid #ebebeb;
    }
    .fd {
    }
    .box_lt {
      flex: 1;
    }
    .box_rt {
      flex: 1;
    }
    .cell {
      line-height: 60px;
      display: flex;
      align-items:baseline; 
    }
    .title {
      color: #000000;
      font-weight: 600;
      padding: 30px 0 0;
    }
    .sub_title {
      color: #797979;
      text-align: right;
    }
    .content {
      color: #2d2d2d;
      line-height: 24px;
      text-indent: 8px;
    }
  }
}
</style>
