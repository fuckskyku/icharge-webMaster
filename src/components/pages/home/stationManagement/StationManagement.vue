<template>
  <div class="stationManagement">
    <div class="header">
      <p>桩站管理</p>
    </div>
    <div class="section">
      <p class="title">请选择您要进入的桩站账号：</p>
      <div class="content">
        <el-radio-group v-model="radio" @change="sel()">
          <div>
            <el-radio class="radio" :label="1">XXX桩站</el-radio>
          </div>
          <div>
            <el-radio class="radio" :label="2">XXX桩站</el-radio>
          </div>
          <div>
            <el-radio class="radio" :label="3">XXX桩站</el-radio>
          </div>
        </el-radio-group>
      </div>
    </div>
    <div class="footer">
      <button class="btn">进入管理桩站</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      radio: 1,

    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {
    // 修改element 单选框默认样式
    $(".is-checked+.el-radio__label").css("color","#14BF6D")
    $(".is-checked .el-radio__inner").css("border-color","#14BF6D")
    $(".is-checked .el-radio__inner").css("background","#14BF6D")
  },
  methods: {
    ...mapActions(["setToKen"]),
    sel() {   
      $(".el-radio__label").css("color","#606266")
      $(".el-radio__inner").css("border-color","#DCDFE6")
      $(".el-radio__inner").css("background","#ffffff")
      $(".is-checked+.el-radio__label").css("color","#14BF6D")
      $(".is-checked .el-radio__inner").css("border-color","#14BF6D")
      $(".is-checked .el-radio__inner").css("background","#14BF6D")

    },

  },
  components: {}
};
</script>
<style scoped lang="less">
.stationManagement{
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
    }
  }
  .section{
    .title{
      color: #14BF6D;
      padding: 30px 60px 30px;
    }
    .content{
      padding-left: 290px;
      div{
        padding: 10px 0;
        
      }
    }
  }
  .footer{
    padding: 0 0 80px 250px;
    .btn{
      width:186px;
      height:40px;
      background:#14BF6D;
      border-radius:5px;
      border: 1px solid #14BF6D;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
