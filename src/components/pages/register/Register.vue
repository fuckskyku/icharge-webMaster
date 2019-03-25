<template>
  <div class="register parent">
    <Header></Header>
    <div class="child">
      <div class="step">
        <el-steps :active="active" align-center finish-status="success">
          <el-step title="手机号验证" style=""></el-step>
          <el-step title="填写密码"></el-step>
          <el-step title="注册成功"></el-step>
        </el-steps>
      </div>
      <!-- 步骤1 -->
      <div class="container" v-if="active == 0">
        <div class="head">充电桩场站运营商账号注册</div>
        <div class="section">
          <el-form
            :model="registerForm"
            ref="registerForm"
            label-width="100px"
            class="wd300"
            :rules="rules"
          >
            <el-form-item label-width="0px" prop="account">
              <img class="icon" src="/static/img/login_register_findPassword/ic_number.png" alt="">
              <input v-model="registerForm.account" class="v_input" placeholder="请输入手机号">
            </el-form-item>
            <el-form-item label-width="0px" prop="code">
              <img class="icon" src="/static/img/login_register_findPassword/ic_validate.png" alt="">
              <input
                id="code_input"
                class="v_input verify_code"
                v-model="registerForm.code"
                placeholder="请输入验证码"
              >
              <el-button type="success" :disabled="dis" :class="[style,{'disabled':dis == true}]" @click="getCodes()">{{codeMsg}}</el-button>
            </el-form-item>
            <el-button type="success" class="submit" @click="next('registerForm')">确 定</el-button>
            <div class="footer">
              <router-link :to="{path:'/Login'}">已有账号，直接登录</router-link>
            </div>
          </el-form>
        </div>
      </div>
      <!-- 步骤2 -->
      <div class="container" v-if="active == 1">
        <div class="head">充电桩场站运营商账号注册</div>
        <div class="section">
          <el-form
            :model="registerForm"
            ref="registerForm"
            label-width="100px"
            class="wd300"
            :rules="rules2"
          >
            <el-form-item label-width="0px" prop="account">
              <img class="icon" src="/static/img/login_register_findPassword/ic_number.png" alt="">
              <input v-model="registerForm.account" type="text" disabled class="v_input">
            </el-form-item>
            <el-form-item label-width="0px" prop="password">
              <img class="icon" src="/static/img/login_register_findPassword/ic_password.png" alt="">
              <input v-model="registerForm.password" type="password" class="v_input" placeholder="请输入密码">
            </el-form-item>
            <el-form-item label-width="0px" prop="confirmPwd">
              <img class="icon" src="/static/img/login_register_findPassword/ic_password.png" alt="">
              <input v-model="registerForm.confirmPwd" type="password" class="v_input" placeholder="请再次确认密码">
            </el-form-item>
            <el-button type="success" class="submit" @click="next('registerForm')">确 定</el-button>
            <div class="footer">
              <router-link :to="{path:'/Login'}">已有账号，直接登录</router-link>
            </div>
          </el-form>
        </div>
      </div>
      <!-- 步骤3 -->
      <div class="container" v-if="active == 3">
        <div class="head">恭喜您成功注册！</div>
        <div class="section sec">
          <div class="success_icon"><img src="/static/img/login_register_findPassword/img_success.png" alt=""></div>
          <div class="desc">
            <p>您绑定的手机号是{{registerForm.account}}，此手机号是登录新活充电桩站管理后台的账号。</p>
            <p>进行资质认证，您将体验更多功能。</p>
          </div>
          <el-button type="success" class="submit quality" @click="skip('Login')">立即进行资质认证</el-button>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { isregistermobile, getPhoneCode, firstoperate, register } from "@/api/api";
import utils from "@/utils/index.js";
import Header from '@/components/publicTemplate/Header';

export default {
  data() {
    return {
      data: [],
      active: 0,
      codeMsg: "获取验证码",
      dis: false,
      style: 'checkCode',
      isRegister: false,
      registerForm: {
        account: "",
        password: "",
        confirmPwd: "",
        code: ""
      },
      rules: {
        account: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      rules2: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" },{ min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }],
        confirmPwd: [{ required: true, message: "请再次确认密码", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState(["token"])
  },
  beforeCreate(){
    console.log(this.$route.name)
  },
  mounted() {
    //this.setClearStore()
  },
  methods: {
    ...mapActions(["setToKen","setClearStore"]),
    // 下一步
    next(form) {
      var that = this;
      this.$refs[form].validate(valid => {
        if (valid) {
          if(this.active == 0){
            //验证手机号码是否注册过
            if(!this.isRegister){
              this.$notify({
                title: "提示",
                message: "尚未获取验证码",
                type: "warning"
              });
              return
            }else{
              firstoperate({
                mobile: this.registerForm.account,
                code: this.registerForm.code
              }).then(res =>{
                if(res.data.code == 200){
                  that.active++;
                }else{
                  console.log(res.data.code)
                  this.$notify({
                    title: "提示",
                    message: res.data.message,
                    type: "error"
                  });
                  return
                }
              })
            }
          }
          if(this.active == 1){
            if(!utils.equalTo(this.registerForm.password,this.registerForm.confirmPwd)){
              this.$notify({
                title: "提示",
                message: "密码不一致请重新填写",
                type: "error"
              });
              return
            }else{
              register({
                mobile: this.registerForm.account,
                password: this.registerForm.password,
                code: this.registerForm.code
              }).then(res =>{
                if(res.data.code == 200){

                  // 注册成功跳转至第三步
                  this.active += 2
                }else{
                  this.$notify({
                  title: "提示",
                  message: res.data.message,
                  type: "error"
                });
                }
              })
            }
            //this.setToKen('1234')
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      
    },
    //点击获取短信验证码
    getCodes() {
      var that = this
      if (!utils.required(this.registerForm.account)) {
        this.$notify({
          title: "提示",
          message: "请填写手机号码",
          type: "error"
        });
        return
      }
      if (!utils.tel(this.registerForm.account)) {
        this.$notify({
          title: "提示",
          message: "您填写的手机号码不正确",
          type: "error"
        });
        return
      }
      //验证手机号码是否注册过
      isregistermobile({
        mobile: this.registerForm.account
      }).then(res =>{
        if(res.data.code == 200){
          if(res.data.data.isRegister){
            that.$notify({
              title: "提示",
              message: "您的手机号码已注册请登录",
              type: "info"
            });
            return;
          }else{
            getPhoneCode({
              tel: this.registerForm.account
            }).then(res =>{
              if(res.data.code == 200){
                this.$notify({
                  title: "提示",
                  message: "短信已发送请查收",
                  type: "success"
                });
                that.isRegister = true
                var miao = 60;
                that.dis = true
                var timehandler = setInterval(()=> {
                  that.codeMsg = miao + "秒后再获取";
                  that.dis = true;
                  miao--;
                  if (timehandler != null && miao <= 0) {
                    clearInterval(timehandler);
                    that.dis = false;
                    that.codeMsg = "获取短信验证码";
                  }
                },1000);
              }else{
                that.$notify({
                  title: "提示",
                  message: res.data.message,
                  type: "info"
                });
              }
            })
          }
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
@import "../../../assets/less/register/index.less";
.el-step__head .is-process {
  color: #ffffff;
  border-color: #FF8A00 !important;
}
</style>
