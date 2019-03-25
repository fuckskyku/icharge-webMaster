<template>
  <div class="approve">
    <Header></Header>
    <div class="container">
      <div class="header">
        <p>桩站资质认证</p>
      </div>
      <div class="approve_status review" v-if="companyInfo.status == 0">审核中</div>
      <div class="approve_status" v-if="companyInfo.status == 2">审核失败：*****</div>
      <div class="section">
        <el-form :model="ruleForm" ref="ruleForm" label-width="300px" class="demo-ruleForm">
          <el-form-item label="桩站公司名称:" prop="licenceName">
            <el-input class="wd380" disabled v-model="ruleForm.licenceName"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码:" prop="licenceCode">
            <el-input class="wd380" disabled v-model="ruleForm.licenceCode"></el-input>
          </el-form-item>
          <el-form-item label="桩站营业执照正面:" prop="licenceImg">
            <img :src="ruleForm.licenceImg" class="avatar">
          </el-form-item>
          <el-form-item label="管理员姓名:" prop="managerName">
            <el-input class="wd380" v-model="ruleForm.managerName" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份证号:" @blur="checkId()" prop="managerIdcardNo">
            <el-input class="wd380" disabled v-model="ruleForm.managerIdcardNo"></el-input>
          </el-form-item>
          <el-form-item label="身份证正面+本人拍照:" prop="managerHandIdcardImg">
            <img :src="ruleForm.managerHandIdcardImg" class="avatar">
          </el-form-item>
          <el-form-item label="桩站具体地址:" prop="stationAddress">
            <el-input class="wd380" disabled v-model="ruleForm.staAdress"></el-input>
          </el-form-item>
          <el-form-item label="银行名称:" prop="bankName">
            <el-input class="wd380" disabled v-model="ruleForm.bankName"></el-input>
          </el-form-item>
          <el-form-item label="银行卡账号:" prop="bankCard">
            <el-input class="wd380" disabled v-model="ruleForm.bankCard"></el-input>
            <div class="el-upload__tip">* 个体户的必须用法人本身的银行账号，企业必须用对公账号。不支持信用卡，6~35位</div>
          </el-form-item>

          <el-form-item label="银行卡开户地址:" required>
            <el-input class="wd160" disabled v-model="ruleForm.bankAdress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="wd186" type="success" @click="skip('Approve')">重新填写</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {
  getStationUserInfo
} from "@/api/api";
import Header from "@/components/publicTemplate/Header";

export default {
  data() {
    return {
      ruleForm: {}
    };
  },
  computed: {
    ...mapState(["token", "ak", "userInfo", "companyInfo"])
  },
  mounted() {
    this.init()
    this.ruleForm = this.companyInfo
    if(this.companyInfo.status == 1) {
      this.skip("Home")
    }
    if(this.companyInfo.status == 2){
      
    }
    console.log("companyInfo", this.companyInfo);
  },
  methods: {
    ...mapActions(["setToKen", "setUserInfo","setCompanyInfo"]),
    init() {
      getStationUserInfo().then(res=> {
        if(res.data.code == 200) {
          var companyInfo = res.data.data;
          var companyInfoObj = [{ key: "userId", value: companyInfo.userId},
            { key: "licenceName", value: companyInfo.licenceName},
            { key: "staId", value: companyInfo.staId },
            {key: "licenceCode", value: companyInfo.licenceCode },
            {key: "licenceImg",value: companyInfo.licenceImg },
            {key: "managerName",value: companyInfo.managerName},
            {key: "managerIdcardNo",value: companyInfo.managerIdcardNo},
            {key: "managerHandIdcardImg",value: companyInfo.managerHandIdcardImg},
            { key: "bankName", value: companyInfo.bankName },
            { key: "bankCard",value: companyInfo.bankCard },
            {key: "bankAdress",value: companyInfo.bankAdress},
            {key: "staAdress",value: companyInfo.staAdress},
            {key: "remarks",value: companyInfo.remarks},
            { key: "staLat",value: companyInfo.staLat},
            {key: "remarks",value: companyInfo.remarks},
            {key: "staLng", value: companyInfo.staLng},
            { key: "status", value: companyInfo.status},
            {key: "createTime",value: companyInfo.createTime},
          ];
          this.setCompanyInfo(companyInfoObj);
        }
      })
    },
    skip(type) {
      this.$router.push({
        name: type
      });
    }
  },
  components: {
    Header
  }
};
</script>
<style scoped lang="less">
@import "../../../assets/less/approve/idnex.less";
</style>
