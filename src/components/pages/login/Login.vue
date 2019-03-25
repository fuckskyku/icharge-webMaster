<template>
  <div class="login parent">
    <div class="child">
      <div class="container">
        <div class="title">新活充电桩站管理后台</div>
        <div class="head">充电桩场站运营商账号登录</div>
        <div class="section">
          <el-form
            :model="loginForm"
            ref="loginForm"
            label-width="100px"
            class="demo-ruleForm"
            :rules="rules"
          >
            <el-form-item label-width="0px" prop="account">
              <img class="icon" src="/static/img/login_register_findPassword/ic_number.png" alt="">
              <input class="v_input" v-model="loginForm.account" placeholder="管理员的手机号/用户名">
            </el-form-item>
            <el-form-item label-width="0px" prop="password">
              <img
                class="icon"
                src="/static/img/login_register_findPassword/ic_password.png"
                alt=""
              >
              <input class="v_input" type="password" v-model="loginForm.password" placeholder="请输入密码">
            </el-form-item>
            <el-form-item label-width="0px" prop="code">
              <img
                class="icon"
                src="/static/img/login_register_findPassword/ic_validate.png"
                alt=""
              >
              <input
                id="code_input"
                class="v_input verify_code"
                v-model="loginForm.code"
                placeholder="请输入验证码"
              >
              <!-- 图形验证码 -->
              <img class="v_container" @click="randomImg()" :src="codeSrc" alt="">
            </el-form-item>
            <el-button class="submit" @click="submitLogin('loginForm')">登 录</el-button>
            <div class="footer">
              <router-link :to="{path:'/Register'}">注册</router-link>
              <router-link :to="{path:'/ForgotPassword'}">忘记密码？</router-link>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import store from "@/Store/store";
import { isregistermobile, login, captcha } from "@/api/api";
import utils from "@/utils/index.js";
import $ from "jquery";

export default {
  data() {
    return {
      codeSrc: "",
      verifyCode: "",
      id: "",
      loginForm: {
        account: "",
        password: "",
        code: ""
      },
      rules: {
        account: [
          { required: true, message: "管理员的手机号/用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState(["token", "userInfo", "sessionId"])
  },
  created() {},
  mounted() {
    this.randomImg();
  },
  methods: {
    ...mapActions(["setToKen", "setUserInfo"]),
    // 刷新验证码
    randomImg() {
      // this.codeSrc = this.codeSrc + "?" + Math.random() * 10;
      captcha().then(res => {
        this.codeSrc = res.data.data;
      });
    },
    submitLogin(form) {
      var that = this;
      console.log(this.sessionId);

      this.$refs[form].validate(valid => {
        if (valid) {
          isregistermobile({
            Mobile: this.loginForm.account
          }).then(res => {
            if (res.data.code == 200) {
              if (res.data.data.isRegister == true) {
                console.log("this.sessionId", that.sessionId);
                login({
                  Mobile: that.loginForm.account,
                  Code: that.loginForm.code,
                  Password: that.loginForm.password,
                  SessionId: that.sessionId
                }).then(res => {
                  if (res.data.code == 200) {
                    console.log(res.data.data);
                    var userInfo = res.data.data;
                    that.$notify({
                      title: "提示",
                      message: "登录成功",
                      type: "success"
                    });
                    var userInfoObj = [
                      {
                        key: "userId",
                        value: userInfo.userId
                      },
                      {
                        key: "token",
                        value: userInfo.token
                      },
                      {
                        key: "nickName",
                        value: userInfo.nickName
                      },
                      {
                        key: "userName",
                        value: userInfo.userName
                      },
                      {
                        key: "expirationDate",
                        value: userInfo.expirationDate
                      },
                      {
                        key: "staId",
                        value: userInfo.staId
                      },
                      {
                        key: "hasCredient",
                        value: userInfo.hasCredient
                      }
                    ];
                    that.setUserInfo(userInfoObj);
                    that.setToKen(res.data.data.token);
                    console.log(that.userInfo);
                    this.skip("Home");
                  } else {
                    that.$notify({
                      title: "提示",
                      message: res.data.message,
                      type: "error"
                    });
                  }
                });
              } else {
                this.$notify({
                  title: "提示",
                  message: "您的账号尚未注册,请先注册后再登录",
                  type: "warning"
                });
              }
            } else {
              this.$notify({
                title: "提示",
                message: res.data.message,
                type: "error"
              });
            }
          });
        } else {
          // error submit
          return false;
        }
      });
    },
    skip(type) {
      this.$router.push({
        name: type
      });
    }
  },
  components: {}
};
</script>
<style scoped lang="less">
@import "../../../assets/less/login/index.less";
</style>
