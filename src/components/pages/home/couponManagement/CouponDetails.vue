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
            <!-- <div class="cell">
              <span class="sub_title">优惠券编号:</span>
              <span class="content">{{tableData.}}</span>
            </div>-->
            <div class="cell">
              <span class="sub_title">状态:</span>
              <span class="content">{{tableData.couStatus == 1 ? "已过期" : tableData.couStatus == 0 ? "生效中" : tableData.couStatus == 2? "已删除" : ""}}</span>
            </div>
            <div class="cell">
              <span class="sub_title">适用桩站:</span>
              <span class="content">{{tableData.staName}}</span>
            </div>
          </div>
          <div class="box_rt">
            <div class="cell">
              <span class="sub_title">面额:</span>
              <span class="content">{{tableData.price}}元</span>
            </div>
            <div class="cell">
              <span class="sub_title">门槛:</span>
              <span class="content">订单金额满{{tableData.threshold}}元可用</span>
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
              <span class="content">{{tableData.totalNumber}}张</span>
            </div>
            <div class="cell">
              <span class="sub_title">已使用数量:</span>
              <span class="content">{{tableData.userUseCount}}张</span>
            </div>
            <div class="cell">
              <span class="sub_title" style="width:78px">使用时间:</span>
              <span class="content">{{tableData.useStartTime|formatDate}} - {{tableData.useEndTime|formatDate}}</span>
            </div>
          </div>
          <div class="box_rt">
            <div class="cell">
              <span class="sub_title">已领取数量:</span>
              <span class="content">{{tableData.userGetCount}}张</span>
            </div>
            <div class="cell">
              <span class="sub_title">领取时间:</span>
              <span class="content">{{tableData.getDate|formatDate}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getstationcoupondetail } from "@/api/api";

export default {
  data() {
    return {
      id: "",
      tableData: [],
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
      getstationcoupondetail({
        couId: this.id
      }).then(res => {
        if (res.data.code == 200 && res.data.data != null) {
          this.tableData = res.data.data;
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
      align-items: baseline;
    }
    .title {
      color: #000000;
      font-weight: 600;
      padding: 30px 0 0;
    }
    .sub_title {
      color: #797979;
      // min-width: 84px;
    }
    .content {
      color: #2d2d2d;
      line-height: 24px;
      text-indent: 8px;
    }
  }
}
</style>
