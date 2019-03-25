<template>
  <div class="aside">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          background-color="#ffffff"
          text-color="#797979"
          active-text-color="#000000"
          :unique-opened="true"
        >
          <el-menu-item index="1" @click="skip('Home')">
            <div class="bd_left"></div>
            <img :src="menuObj.home" alt="">
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <div class="bd_left"></div>
              <img :src="menuObj.account" alt="">
              <span>账户设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item @click="skip('ChangePassword')" class="sub_title" index="2-1">
                <span class="fw600">·</span> 更改密码
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <div class="bd_left"></div>
              <img :src="menuObj.electric" alt="">
              <span>电费和优惠券管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item @click="skip('ElectricityManagement')" class="sub_title" index="3-1">
                <span class="fw600">·</span> 电费管理
              </el-menu-item>
              <el-menu-item @click="skip('StageElectricity')" class="sub_title" index="3-2">
                <span class="fw600">·</span> 时段电价
              </el-menu-item>
              <el-menu-item @click="skip('CouponManagement')" class="sub_title" index="3-3">
                <span class="fw600">·</span> 优惠券管理
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <div class="bd_left"></div>
              <img :src="menuObj.son" alt="">
              <span>子账号管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item @click="skip('RoleManagement')" class="sub_title" index="4-1">
                <span class="fw600">·</span> 角色管理
              </el-menu-item>
              <el-menu-item @click="skip('BranchAccount')" class="sub_title" index="4-2">
                <span class="fw600">·</span> 子账号管理
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <div class="bd_left"></div>
              <img :src="menuObj.pile" alt="">
              <span>桩站管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item @click="skip('CompanyInformation')" class="sub_title" index="5-1">
                <span class="fw600">·</span> 公司信息
              </el-menu-item>
              <el-menu-item @click="skip('StationManagement')" class="sub_title" index="5-2">
                <span class="fw600">·</span> 桩站管理
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <div class="bd_left"></div>
              <img :src="menuObj.bill" alt="">
              <span>账单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item @click="skip('ElectricityBills')" class="sub_title" index="6-1">
                <span class="fw600">·</span> 用电账单
              </el-menu-item>
              <el-menu-item @click="skip('MoneyBills')" class="sub_title" index="6-2">
                <span class="fw600">·</span> 资金账单
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import $ from "jquery";

export default {
  props: {
    msg: {
      type: String
    }
  },
  data() {
    return {
      menuObj: {
        home: "/static/img/aside/ic_home_n.png",
        homeActive: "/static/img/aside/ic_home_s.png",
        account: "/static/img/aside/ic_account_n.png",
        accountActive: "/static/img/aside/ic_account_s.png",
        electric: "/static/img/aside/ic_electric_n.png",
        electricActive: "/static/img/aside/ic_electric_s.png",
        son: "/static/img/aside/ic_son_n.png",
        sonActive: "/static/img/aside/ic_son_s.png",
        pile: "/static/img/aside/ic_pile_n.png",
        pileActive: "/static/img/aside/ic_pile_s.png",
        bill: "/static/img/aside/ic_bill_n.png",
        billActive: "/static/img/aside/ic_bill_s.png"
      },
    };
  },
  computed: {
    ...mapState(["token", "defaultActive","isClose"])
  },
  mounted() {
    $(".el-menu-item-group__title").css("padding", "0");
    window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
  },
  methods: {
    ...mapActions(["setToKen", "setDefaultActive","setIsClose"]),
    beforeunloadHandler(e) {
      // 监听页面关闭重置导航栏
      this.setDefaultActive("1");
    },
    handleSelect(key, keyPath) {
      // this.setDefaultActive(key);
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
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
  components: {}
};
</script>
<style scoped lang="less">
.aside {
  .sub_title {
    text-indent: 2em;
  }
  .is-opened .el-submenu__title span {
    color: #14bf6d !important;
  }
  .el-menu-item-group__title {
    padding: 0 !important;
  }
  .is-active .bd_left {
    width: 5px;
    height: 40px;
    background: #14bf6d;
    display: inline-block;
  }

  .el-menu-item.is-active {
    position: relative;
    font-weight: 600;
    .bd_left {
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -20px;
    }
  }
  .is-opened .el-submenu__title {
    background: #f4f4f4 !important;
  }
  .el-submenu__title {
    position: relative;
    .bd_left {
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -20px;
    }
  }
  .fw600 {
    font-weight: 600;
  }
}
</style>
