<template>
  <div class="approve">
    <div id="map"></div>
    <Header></Header>
    <div class="container">
      <div class="header">
        <p>桩站资质认证</p>
      </div>
      <div class="content" v-if="!visibility">
        <div class="img_success">
          <img src="/static/img/quality/img_success.png" alt>
        </div>
        <div class="desc">您已成功提交资质认证信息，请耐心等待我司工作人员的审核处理。审核通过后，我司会与您联系并且签订合同、收取保证金、安排对接。</div>
      </div>
      <div class="section" v-if="visibility">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="300px"
          class="demo-ruleForm"
        >
          <el-form-item label="桩站公司名称:" prop="clientName">
            <el-input class="wd380" v-model="ruleForm.clientName" placeholder="请输入桩站公司名称"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码:" prop="creditCode">
            <el-input class="wd380" v-model="ruleForm.creditCode" placeholder="请输入统一社会信用代码"></el-input>
          </el-form-item>
          <el-form-item label="桩站营业执照正面:" prop="licenseUrl">
            <img :src="licenseUrl" class="avatar">
            <el-upload
              class="avatar-uploader"
              :action="upload_qiniu_url"
              :show-file-list="false"
              :on-success="handleStationSuccess"
              :on-error="handleError"
              :before-upload="beforeStationUpload"
              :data="qiniuData"
            >
              <el-button type="success" @click="getQiniuTokenFun();">点击上传图片</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="管理员姓名:" prop="name">
            <el-input class="wd380" v-model="ruleForm.name" placeholder="请输入管理员姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号:" @blur="checkId()" prop="IdNum">
            <el-input class="wd380" v-model="ruleForm.IdNum" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="身份证正面+本人拍照:" prop="identityUrl">
            <img :src="identityUrl" class="avatar">
            <el-upload
              class="avatar-uploader"
              :action="upload_qiniu_url"
              :show-file-list="false"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :data="qiniuData"
            >
              <el-button type="success" @click="getQiniuTokenFun();">点击上传图片</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="桩站具体地址:" prop="stationAddress">
            <el-input
              class="wd380"
              @blur="search()"
              v-model="ruleForm.stationAddress"
              placeholder="请填写桩站具体地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="银行名称:" prop="bankNameValue">
            <el-select v-model="ruleForm.bankNameValue" clearable class="wd380" placeholder="请选择">
              <el-option
                v-for="(item,index) in bankNameOptions"
                :key="index"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行卡账号:" prop="bankAccount">
            <el-input class="wd380" v-model="ruleForm.bankAccount" placeholder="请输入银行卡账号"></el-input>
            <div class="el-upload__tip">* 个体户的必须用法人本身的银行账号，企业必须用对公账号。不支持信用卡，6~35位</div>
          </el-form-item>
          <el-form-item label="确认银行卡账号:" prop="confirmBankAccount">
            <el-input class="wd380" v-model="ruleForm.confirmBankAccount" placeholder="请输入银行卡账号"></el-input>
            <div class="el-upload__tip">* 再次输入银行卡账号进行确认</div>
          </el-form-item>
          <el-form-item label="银行卡开户地址:" required>
            <el-col :span="5">
              <el-form-item prop="bankProvinceValue">
                <el-select
                  v-model="ruleForm.bankProvinceValue"
                  @change="getcityFun"
                  clearable
                  class="wd160"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item,index) in bankProvinceOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="bankCityValue">
                <el-select
                  v-model="ruleForm.bankCityValue"
                  clearable
                  class="wd160"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item,index) in bankCityOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="branchBankName">
                <el-input class="wd160" v-model="ruleForm.branchBankName" placeholder="请填写支行名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <div class="el-upload__tip branch_tip">* 填写支行名称，如吕岭支行。请不要重复填写省市信息和银行名称</div>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button class="wd186" type="success" @click="submit('ruleForm')">立即提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {
  editStationUserInfo,
  getbanklist,
  getcity,
  getQiniuToken,
  getStationUserInfo
} from "@/api/api";
import Header from "@/components/publicTemplate/Header";
import Footer from "@/components/publicTemplate/Footer";
import { MP } from "@/utils/map.js";
import utils from "@/utils/index.js";

export default {
  data() {
    return {
      visibility: true,
      map: "", //地图实例
      localSearch: "", //智能搜索实例化对象
      userLocation: { lng: "", lat: "" }, //搜索结果
      licenseUrl: "/static/img/quality/img_1.png",
      identityUrl: "/static/img/quality/img_2.png",
      pid: "", //省份的话填0，城市的父级id
      ruleForm: {
        clientName: "",
        creditCode: "",
        licenseUrl: "",
        name: "",
        IdNum: "",
        identityUrl: "",
        stationAddress: "",
        bankNameValue: "",
        bankAccount: "",
        confirmBankAccount: "",
        bankProvinceValue: "",
        bankCityValue: "",
        branchBankName: ""
      },
      rules: {
        clientName: [
          { required: true, message: "请输入桩站公司名称", trigger: "blur" },
          { min: 3, max: 26, message: "长度在 3 到 26个字符", trigger: "blur" }
        ],
        creditCode: [
          { required: true, message: "请输入统一社会信用代码", trigger: "blur" }
        ],
        licenseUrl: [
          { required: true, message: "请上传桩站营业执照正面", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入管理员姓名", trigger: "blur" }
        ],
        IdNum: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        identityUrl: [
          {
            required: true,
            message: "请上传身份证正面+本人拍照",
            trigger: "blur"
          }
        ],
        stationAddress: [
          { required: true, message: "请填写具体地址", trigger: "blur" }
        ],
        bankNameValue: [
          { required: true, message: "请选择银行名称", trigger: "blur" }
        ],
        bankAccount: [
          { required: true, message: "请输入银行卡账号", trigger: "blur" }
        ],
        confirmBankAccount: [
          { required: true, message: "请确认银行卡账号", trigger: "blur" }
        ],
        bankProvinceValue: [
          { required: true, message: "请选择开户银行所在省份", trigger: "blur" }
        ],
        bankCityValue: [
          { required: true, message: "请选择开户银行所在城市", trigger: "blur" }
        ],
        branchBankName: [
          { required: true, message: "请填写支行名称", trigger: "blur" }
        ]
      },
      bankNameOptions: [],
      bankProvinceOptions: [],
      bankCityOptions: [],
      qiniuData: {
        key: "",
        token: ""
      },
      upload_qiniu_url: "https://upload.qiniup.com", // 七牛云上传储存区域的上传域名
      imgQiniuUrl: "http://img.mseenet.com/", //七牛图片外链
      qiniuToken: ""
    };
  },
  computed: {
    ...mapState(["token", "ak", "companyInfo"])
  },
  mounted() {
    //this.setToKen('')
    this.getbanklistFun();
    this.getprovinceFun();

    var _this = this;
    this.$nextTick(() => {
      MP(_this.ak).then(BMap => {
        //在此调用api
        _this.init();
      });
    });
  },
  methods: {
    ...mapActions(["setToKen", "setCompanyInfo"]),
    // 返回地址解析结果
    search() {
      var that = this;
      //智能搜索
      that.localSearch = new BMap.LocalSearch(that.map, {
        onSearchComplete: addressTransformFun
      });
      if (that.ruleForm.stationAddress != "") {
        that.localSearch.search(that.ruleForm.stationAddress);
      }
      function addressTransformFun() {
        that.userLocation = that.localSearch.getResults().getPoi(0).point;
        console.log(that.userLocation);
      }
    },
    init() {
      // 创建地图实例
      this.map = new BMap.Map("map");
      getStationUserInfo().then(res => {
        if (res.data.data == null || res.data.data == "") {
          this.visibility = true;
        } else {
          this.visibility = false;
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
          that.setCompanyInfo(companyInfoObj);
          this.skip("ApproveFaild");
        }
      });
    },
    handleStationSuccess(res, file) {
      this.ruleForm.licenseUrl = this.imgQiniuUrl + res.key;
      this.licenseUrl = this.ruleForm.licenseUrl;
    },
    beforeStationUpload(file) {
      this.qiniuData.key = file.name;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleSuccess(res, file) {
      this.ruleForm.identityUrl = this.imgQiniuUrl + res.key;
      this.identityUrl = this.ruleForm.identityUrl;
    },
    beforeUpload(file) {
      this.qiniuData.key = file.name;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleError(res) {
      console.log(res);
    },
    // 获取七牛token
    getQiniuTokenFun() {
      getQiniuToken().then(res => {
        this.qiniuData.token = res.data.data.token;
        console.log(this.qiniuData.token);
      });
    },
    getcityFun(val) {
      var pId = "";
      this.ruleForm.bankCityValue = "";
      this.bankCityOptions = [];
      this.bankProvinceOptions.map(item => {
        if (item.label == val) {
          pId = item.value;
        }
      });
      getcity({
        pId: pId,
        level: 2
      }).then(res => {
        if (res.data.code == 200) {
          this.bankCityOptions = res.data.data;
        }
      });
    },
    getprovinceFun() {
      getcity({
        pId: 0,
        level: 1
      }).then(res => {
        if (res.data.code == 200) {
          this.bankProvinceOptions = res.data.data;
        }
      });
    },
    getbanklistFun() {
      getbanklist().then(res => {
        if (res.data.code == 200) {
          this.bankNameOptions = [];
          res.data.data.map((item, index) => {
            this.bankNameOptions.push({ label: item.name, value: item.id });
          });
        }
      });
    },
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          editStationUserInfo({
            licenceName: this.ruleForm.clientName,
            licenceCode: this.ruleForm.creditCode,
            licenceImg: this.ruleForm.licenseUrl,
            managerName: this.ruleForm.name,
            managerIdcardNo: this.ruleForm.IdNum,
            managerHandIdcardImg: this.ruleForm.identityUrl,
            bankName: this.ruleForm.bankNameValue,
            bankCard: this.ruleForm.bankAccount,
            bankAdress:
              this.ruleForm.bankProvinceValue +
              this.ruleForm.bankCityValue +
              this.ruleForm.branchBankName,
            staAdress: this.ruleForm.stationAddress,
            remarks: this.ruleForm.clientName,
            staLat: this.userLocation.lat,
            staLng: this.userLocation.lng
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("上传成功");
              loading.close();
              this.visibility = false;
            } else {
              this.$notify({
                title: "提示",
                message: res.data.message,
                type: "error"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
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
    }
  },
  components: {
    Header,
    Footer
  }
};
</script>
<style scoped lang="less">
@import "../../../assets/less/approve/idnex.less";
</style>
