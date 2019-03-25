<template>
  <div class="moneyBillDetails">
    <div class="header">
      <p>资金账单&gt;<span>详情页</span></p>
    </div>
    <div class="section">
      <div>
        <p class="title">基本详情</p>
        <div class="box hd">
          <div class="box_lt">
            <div class="cell">
              <span class="sub_title">充电流水号:</span>
              <span class="content">2018091200093443219</span>
            </div>
            <div class="cell">
              <span class="sub_title">类型:</span>
              <span class="content">收入</span>
            </div>
            <div class="cell">
              <span class="sub_title">之前未结算金额:</span>
              <span class="content">63.78元</span>
            </div>
            <div class="cell">
              <span class="sub_title">之前账户余额:</span>
              <span class="content">63.78元</span>
            </div>
            <div class="cell">
              <span class="sub_title">时间:</span>
              <span class="content">2018年12月12日14:28:22</span>
            </div>
          </div>
          <div class="box_rt">
            <div class="cell">
              <span class="sub_title">金额:</span>
              <span class="content">83367834556</span>
            </div>
            <div class="cell">
              <span class="sub_title">备注:</span>
              <span class="content">充电</span>
            </div>
            <div class="cell">
              <span class="sub_title">未结算金额:</span>
              <span class="content">213.78元</span>
            </div>
            <div class="cell">
              <span class="sub_title">账户余额:</span>
              <span class="content">213.78元</span>
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
              <span class="content">2018091200093443219</span>
            </div>
            <div class="cell">
              <span class="sub_title">账户名称:</span>
              <span class="content">厦门牛庄有限公司</span>
            </div>
          </div>
          <div class="box_rt">
            <div class="cell">
              <span class="sub_title">开户行:</span>
              <span class="content">建设银行</span>
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
    return {};
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {},
  methods: {
    ...mapActions(["setToKen"])
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
      img{
        vertical-align: top;
      }
    }
  }
}
</style>
