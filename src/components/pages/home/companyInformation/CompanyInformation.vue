<template>
  <div class="companyInfo">
    <div class="header">
      <p>公司信息</p>
    </div>
    <div class="section">
      <div>
        <p class="title">基本信息</p>
        <div class="box hd">
          <div class="box_lt">
            <div class="cell">
              <span class="sub_title">桩站公司名称:</span>
              <span class="content">{{companyInfo.licenceName}}</span>
            </div>
            <div class="cell">
              <span class="sub_title">管理员姓名:</span>
              <span class="content">{{companyInfo.managerName}}</span>
            </div>
            <div class="cell">
              <span class="sub_title">桩站营业执照正面:</span>
              <span class="content"><img :src="companyInfo.licenceImg" alt=""></span>
            </div>
            <div class="cell">
              <span class="sub_title">桩站具体地址:</span>
              <span class="content">{{companyInfo.staAdress}}</span>
            </div>
          </div>
          <div class="box_rt">
            <div class="cell">
              <span class="sub_title">统一社会信用代码:</span>
              <span class="content">{{companyInfo.licenceCode}}</span>
            </div>
            <div class="cell">
              <span class="sub_title">身份证号:</span>
              <span class="content">{{companyInfo.managerIdcardNo}}</span>
            </div>
            <div class="cell">
              <span class="sub_title">身份证正面+本人拍照:</span>
              <span class="content"><img :src="companyInfo.managerHandIdcardImg" alt=""></span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="title">银行卡信息</p>
        <div class="box fd">
          <div class="box_lt">
            <div class="cell">
              <span class="sub_title">银行名称:</span>
              <span class="content">{{companyInfo.bankName}}</span>
            </div>
            <div class="cell">
              <span class="sub_title">银行卡账号:</span>
              <span class="content">{{companyInfo.bankCard}}</span>
            </div>
          </div>
          <div class="box_rt">
            <div class="cell">
              <span class="sub_title">银行卡开户地址:</span>
              <span class="content">{{companyInfo.bankAdress}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getStationUserInfo } from "@/api/api";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["token","companyInfo"])
  },
  mounted() {},
  methods: {
    ...mapActions(["setToKen","setCompanyInfo"]),
    init() {
      // companyInfo
      getStationUserInfo({}).then(res =>{
        if(res.data.code == 200) {
          console.log(res.data.data)
          this.companyInfo = res.data.data
          var companyInfo = this.companyInfo
          var companyInfoObj = [
            { key: "userId", value: companyInfo.userId },
            { key: "licenceName", value: companyInfo.licenceName },
            { key: "staId", value: companyInfo.staId },
            { key: "licenceCode", value: companyInfo.licenceCode },
            { key: "licenceImg", value: companyInfo.licenceImg },
            { key: "managerName", value: companyInfo.managerName },
            { key: "managerIdcardNo", value: companyInfo.managerIdcardNo },
            { key: "managerHandIdcardImg", value: companyInfo.managerHandIdcardImg },
            { key: "bankName", value: companyInfo.bankName },
            { key: "bankCard", value: companyInfo.bankCard },
            { key: "bankAdress", value: companyInfo.bankAdress },
            { key: "staAdress", value: companyInfo.staAdress },
            { key: "remarks", value: companyInfo.remarks },
            { key: "staLat", value: companyInfo.staLat },
            { key: "remarks", value: companyInfo.remarks },
            { key: "staLng", value: companyInfo.staLng },
            { key: "status", value: companyInfo.status },
            { key: "createTime", value: companyInfo.createTime }
          ];
          this.setCompanyInfo(companyInfoObj);
        }
      })
    }
  },
  components: {}
};
</script>
<style scoped lang="less">
.companyInfo {
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
      text-align: right;
    }
    .content {
      color: #2d2d2d;
      line-height: 24px;
      text-indent: 8px;
      img{
        vertical-align: top;
        width: 210px;
        height: 140px;
      }
    }
  }
}
</style>
