<template>
  <div class="home">
    <div class="header">
      <div class="box">
        <div class="box_hd yellow">
          <img src="/static/img/home_other/ic_electric.png" alt="">今天已充电
        </div>
        <div class="box_bd">
          <div class="box_bd_lt">
            <p>{{stationInfo.todayChargesCount}}</p>
            <p>次</p>
          </div>
          <div class="box_bd_rt">
            <p>{{stationInfo.todayChargesDegree}}</p>
            <p>度</p>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="box_hd red">
          <img src="/static/img/home_other/ic_station.png" alt="">充电桩在用情况
        </div>
        <div class="box_bd">
          <div class="box_bd_lt">
            <p>{{stationInfo.clientCount}}</p>
            <p>根在用</p>
          </div>
          <div class="box_bd_rt">
            <p>{{stationInfo.freeClient}}</p>
            <p>根闲置</p>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="box_hd blue">
          <img src="/static/img/home_other/ic_money.png" alt="">今天已入账
        </div>
        <div class="box_bd">
          <div class="box_bd_lt">
            <p>{{stationInfo.todayRecordedCount}}</p>
            <p>笔</p>
          </div>
          <div class="box_bd_rt">
            <p>{{stationInfo.todayRecorded}}</p>
            <p>元</p>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="box">
        <div class="box_lt">
          <div class="box_hd">
            <p>用电账单</p>
          </div>
          <div class="box_bd">
            <div class="table table_title">
              <div class="cell">时间</div>
              <div class="cell">电量</div>
              <div class="cell">操作</div>
            </div>
            <div v-if="chargeOrderEmpty" class="empty">--暂无数据--</div>
            <div
              class="table"
              v-if="!chargeOrderEmpty"
              v-for="(item,index) in chargeOrderList"
              :key="index"
            >
              <div class="cell">{{ item.createTime | formatDate }}</div>
              <div class="cell">{{item.degree}}度</div>
              <div class="cell check" @click="skip('ElectricityBillDetails',item.id)">查看</div>
            </div>
          </div>
        </div>
        <div class="box_rt">
          <div class="box_hd">
            <p>停留过久的车辆</p>
          </div>
          <div class="box_bd">
            <div class="empty" v-if="cardEmpty">--暂无数据--</div>
            <div class="table" v-if="!cardEmpty" v-for="(item,index) in cardList" :key="index">
              <div class="cell">{{cardList.numberPlate}}</div>
              <div class="cell">{{cardList.nickName}}</div>
              <div class="cell check">{{cardList.mobile}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="box">
        <div class="box_hd">
          <p>资金记录</p>
        </div>
        <div class="box_bd">
          <div class="table table_title">
            <div class="cell">时间</div>
            <div class="cell">类型</div>
            <div class="cell">备注</div>
            <div class="cell">金额</div>
            <div class="cell">操作</div>
          </div>
          <div class="empty" v-if="moneyEmpty">--暂无数据--</div>
          <div class="table" v-if="!moneyEmpty" v-for="(item,index) in moneyList" :key="index">
            <div class="cell">{{ item.createTime | formatDate }}</div>
            <div class="cell">{{item.name}}</div>
            <div class="cell">{{item.remark}}</div>
            <div class="cell">{{item.price}}元</div>
            <div class="cell check">查看</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Aside from "@/components/publicTemplate/Aside";
import {
  getStationIndexInfo,
  getstationchargespendloglist,
  getchargeorderlist
} from "@/api/api";

export default {
  data() {
    return {
      stationInfo: {},
      chargeOrderList: [],
      moneyList: [],
      cardList: [],
      chargeOrderEmpty: false,
      moneyEmpty: false,
      cardEmpty: false
    };
  },
  computed: {
    ...mapState(["token", "companyInfo"])
  },
  mounted() {
    var that = this
    // this.clearLocalStorage()
    this.$nextTick(() =>{
      that.init();
    })
  },
  methods: {
    ...mapActions(["setToKen", "setCompanyInfo", "setClearStore"]),
    init() {
      // 获取桩站首页信息详情
      getStationIndexInfo({}).then(res => {
        if (res.data.code == 200 && res.data.data != null) {
          this.stationInfo = res.data.data;
          this.cardList = res.data.data.parkingList;
          if (res.data.data.parkingList == "") {
            this.cardEmpty = true;
          }
        }
      });
      // 获取资金记录列表
      getstationchargespendloglist({
        pageNumber: 1,
        pageSize: 5
      }).then(res => {
        if (res.data.code == 200) {
          if (res.data.data != null) {
            this.chargeOrderList = res.data.data.list;
            if (res.data.data.list == "") {
              this.moneyEmpty = true;
            }
          }
        }
      });
      // 获取用电记录列表
      getchargeorderlist({
        pageNumber: 1,
        pageSize: 5
      }).then(res => {
        if (res.data.code == 200) {
          if (res.data.data != null) {
            this.moneyList = res.data.data.list;
            if (res.data.data.list == "") {
              this.chargeOrderEmpty = true;
            }
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
    }
  },
  components: {
    Aside
  }
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  margin-bottom: 100px;
  .header {
    display: flex;
    .box {
      background: #ffffff;
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
      flex: 1;
      margin: 5px;
      .box_hd {
        padding: 20px 20px;
        font-size: 20px;
        img {
          position: relative;
          top: 4px;
        }
      }
      .box_bd {
        display: flex;
        text-align: center;
        padding: 0 0 20px;
        .box_bd_lt {
          flex: 1;
        }
        .box_bd_rt {
          flex: 1;
        }
        p:nth-child(1) {
          font-weight: 400;
          font-size: 30px;
        }
        p:nth-child(2) {
          color: #797979;
          margin-top: 10px;
        }
      }
      .yellow {
        color: #ff9c00;
      }
      .red {
        color: #fa5168;
      }
      .blue {
        color: #4daef8;
      }
    }
  }
  .section {
    .box {
      display: flex;
      .box_hd {
        padding: 20px 30px;
        border-bottom: 1px solid #ebebeb;
        p {
          border-left: 4px solid #14bf6d;
          padding-left: 10px;
          color: #333333;
          font-size: 18px;
        }
      }
    }
    .box_lt {
      flex: 12;
      background: #ffffff;
      border-radius: 5px;
      margin: 5px;
      .box_bd {
        padding: 20px 16px;
        .table {
          width: 100%;
          height: 50px;
          display: flex;
          border-radius: 5px;
          align-items: center;
          color: #0c0c0c;
          .cell {
            flex: 3;
            text-align: center;
          }
          .cell:first-child {
            flex: 4;
          }
        }
        .table:nth-child(odd) {
          background: #f8f8f8;
        }
        .table:nth-child(even) {
          background: #ffffff;
        }
        .table:nth-child(1) {
          background: #14bf6d;
          color: #ffffff;
        }
        .check {
          color: #14bf6d;
        }
      }
    }
    // 停留过久车辆
    .box_rt {
      flex: 10;
      background: #ffffff;
      border-radius: 5px;
      margin: 5px;
      .box_bd {
        padding: 20px 16px;
        .table {
          width: 100%;
          height: 40px;
          border: 1px solid #e5e5e5;
          display: flex;
          border-radius: 5px;
          align-items: center;
          color: #0c0c0c;
          background: #fafafa;
          margin: 10px 0;
          .cell {
            flex: 1;
            text-align: center;
          }
          .cell:first-child {
            flex: 1;
            color: #14bf6d;
          }
        }
      }
    }
  }
  .footer {
    .box {
      background: #ffffff;
      border-radius: 5px;
      margin: 5px;
      .box_hd {
        padding: 20px 30px;
        border-bottom: 1px solid #ebebeb;
        p {
          border-left: 4px solid #14bf6d;
          padding-left: 10px;
          color: #333333;
          font-size: 18px;
        }
      }
      .box_bd {
        padding: 20px 16px;
        .table {
          width: 100%;
          height: 50px;
          display: flex;
          border-radius: 5px;
          align-items: center;
          color: #0c0c0c;
          .cell {
            flex: 3;
            text-align: center;
          }
          .cell:first-child {
            flex: 4;
          }
        }
        .table:nth-child(odd) {
          background: #f8f8f8;
        }
        .table:nth-child(even) {
          background: #ffffff;
        }
        .table:nth-child(1) {
          background: #14bf6d;
          color: #ffffff;
        }
        .check {
          color: #14bf6d;
        }
      }
    }
  }
  .empty {
    text-align: center;
    margin: 40px 0;
    color: #797979;
  }
}
</style>
