<template>
  <div class="h_header">
    <div class="h_body">
      <div class="h_hd">
        <div class="logo">
          <img src="/static/img/logo.png" alt="">
        </div>
        <span>新活充电桩站管理后台</span>
      </div>
      <div class="h_fd" v-if="token == ''">登录</div>
      <div class="h_fd" v-if="token != ''">
        <div>
          <img src="/static/img/home_other/ic_picture.png" alt="">
          {{userInfo.nickName}}
        </div>
        <div @click="quit()" class="quit">
          <img src="/static/img/home_other/ic_quit.png" alt=""> 退出
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
    return {};
  },
  computed: {
    ...mapState(["token", "userInfo", "companyInfo"])
  },
  mounted() {
    console.log(this.userInfo);
    this.init();
  },
  methods: {
    ...mapActions(["setToKen", "setCompanyInfo"]),
    init() {
      getStationUserInfo().then(res => {
        console.log("res", res.data);
        if (res.data.code == 200) {
          if (res.data.data != null) {
            var companyInfo = res.data.data;
            var companyInfoObj = [
              {
                key: "userId",
                value: companyInfo.userId
              },
              {
                key: "licenceName",
                value: companyInfo.licenceName
              },
              {
                key: "staId",
                value: companyInfo.staId
              },
              {
                key: "licenceCode",
                value: companyInfo.licenceCode
              },
              {
                key: "licenceImg",
                value: companyInfo.licenceImg
              },
              {
                key: "managerName",
                value: companyInfo.managerName
              },
              {
                key: "managerIdcardNo",
                value: companyInfo.managerIdcardNo
              },
              {
                key: "managerHandIdcardImg",
                value: companyInfo.managerHandIdcardImg
              },
              {
                key: "bankName",
                value: companyInfo.bankName
              },
              {
                key: "bankCard",
                value: companyInfo.bankCard
              },
              {
                key: "bankAdress",
                value: companyInfo.bankAdress
              },
              {
                key: "staAdress",
                value: companyInfo.staAdress
              },
              {
                key: "remarks",
                value: companyInfo.remarks
              },
              {
                key: "staLat",
                value: companyInfo.staLat
              },
              {
                key: "staLng",
                value: companyInfo.staLng
              },
              {
                key: "status",
                value: companyInfo.status
              },
              {
                key: "createTime",
                value: companyInfo.createTime
              }
            ];
            this.setCompanyInfo(companyInfoObj)
          }
        }
      });
    },
    quit() {}
  },
  components: {}
};
</script>
<style scoped lang="less">
</style>
