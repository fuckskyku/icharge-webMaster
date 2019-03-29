<template>
  <div class="moneyBillDetails">
    <div class="header">
      <p>
        资金账单&gt;
        <span>详情页</span>
      </p>
    </div>
    <div class="section">
      <div>
        <p class="title">基本详情</p>
        <div class="box hd">
          <div class="box_lt">
            <div class="cell">
              <span class="sub_title">充电流水号:</span>
              <span class="content">{{billInfo.moneySn}}</span>
            </div>
            <div class="cell">
              <span class="sub_title">类型:</span>
              <span class="content">{{billInfo.type}}</span>
            </div>
            <div class="cell">
              <span class="sub_title">之前未结算金额:</span>
              <span class="content">{{billInfo.historicalOutstandingAmount}}元</span>
            </div>
            <div class="cell">
              <span class="sub_title">之前账户余额:</span>
              <span class="content">{{billInfo.historicalBalance}}元</span>
            </div>
            <div class="cell">
              <span class="sub_title">时间:</span>
              <span class="content">{{ billInfo.createDate | formatDate }}</span>
            </div>
          </div>
          <div class="box_rt">
            <div class="cell">
              <span class="sub_title">金额:</span>
              <span class="content">{{billInfo.price}}元</span>
            </div>
            <div class="cell">
              <span class="sub_title">备注:</span>
              <span class="content">{{billInfo.remark}}</span>
            </div>
            <div class="cell">
              <span class="sub_title">未结算金额:</span>
              <span class="content">{{billInfo.outstandingAmount}}</span>
            </div>
            <div class="cell">
              <span class="sub_title">账户余额:</span>
              <span class="content">{{billInfo.balance}}元</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="title">账户详情</p>
        <div class="box hd">
          <div class="box_lt">
            <div class="cell">
              <span class="sub_title">收款账户:</span>
              <span class="content">{{billInfo.accountNumber}}</span>
            </div>
            <div class="cell">
              <span class="sub_title">账户名称:</span>
              <span class="content">{{billInfo.accountName}}</span>
            </div>
          </div>
          <div class="box_rt">
            <div class="cell">
              <span class="sub_title">开户行:</span>
              <span class="content">{{billInfo.bankDesposit}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getstaitionchargespendlogdetail } from "@/api/api";
export default {
  data() {
    return {
      id: "",
      billInfo: {
        id: 1,
        moneySn: "123456",
        type: 1,
        remark: "25252",
        price: 1,
        historicalOutstandingAmount: 3,
        outstandingAmount: 4,
        historicalBalance: 5,
        balance: 6,
        createDate: 1550823174,
        accountNumber: "",
        bankDesposit: "",
        accountName: ""
      }
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {
    this.id = this.$route.query.id;
    this.init();
  },
  methods: {
    ...mapActions(["setToKen"]),
    init() {
      getstaitionchargespendlogdetail({
        id: this.id
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
          // this.billInfo = res.data.data;
        }
      });
    }
  },
  components: {}
};
</script>
<style scoped lang="less">
.moneyBillDetails {
  width: 100%;
  background: #ffffff;
  .header {
    padding: 20px 30px;
    border-bottom: 1px solid #ebebeb;
    p {
      border-left: 4px solid #14bf6d;
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
      align-items: baseline;
    }
    .title {
      color: #000000;
      font-weight: 600;
      padding: 30px 0 0;
    }
    .sub_title {
      color: #797979;
      text-align: left;
    }
    .content {
      color: #2d2d2d;
      line-height: 24px;
      text-indent: 8px;
      img {
        vertical-align: top;
      }
    }
  }
}
</style>
