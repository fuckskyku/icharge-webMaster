<template>
  <div class="stageElectricity">
    <div class="header">
      <p>时段电价</p>
    </div>
    <div class="section">
      <div class="cell border" v-if="visibility">
        <div class="sub_title border_rt display">· 时段一
          <div class="tag">示例</div>
        </div>
        <div class="content border_rt display">
          <div>
            <p>18:00~22:00</p>
            <p>09:00~12:00</p>
            <p>06:00~08:00</p>
          </div>
        </div>
        <div class="desc display border_rt">在各桩服务费基础上上涨10%</div>
        <div class="handle display">
          <div>
            <div class="edit">
              <el-button class="btn edit_btn">编辑</el-button>
            </div>
            <div class="del">
              <el-button class="btn del_btn">删除</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="cell border" v-if="!visibility">
        <div class="sub_title border_rt display">· 时段一</div>
        <div class="content border_rt display">
          <div>
            <p>18:00~22:00</p>
            <p>09:00~12:00</p>
            <p>06:00~08:00</p>
          </div>
        </div>
        <div class="desc display border_rt">在各桩服务费基础上上涨10%</div>
        <div class="handle display">
          <div>
            <div class="edit" @click="edit()">
              <el-button class="btn edit_btn" >编辑</el-button>
            </div>
            <div class="del" @click="del()">
              <el-button class="btn del_btn">删除</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="tip">* 您可通过设置各个时段费用的涨跌（只在“服务费”基础上涨下调，基础的“电费”不会变），来调节各时段前来充电的用户数量，增加充电桩有效利用率。</div>
      <el-button class="add_btn" @click="createElectricity('新增时段电价')">新增时段电价</el-button>
    </div>
    <!-- dialog -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <div class="dialog_section">
        <div>时段:</div>
        <div class="item" v-for="(item,index) in arr" :key="index">
          <div class="lt">
            <el-time-select
              placeholder="起始时间"
              class="wd200"
              v-model="item.startTime"
              :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
            ></el-time-select>
            <span>——</span>
            <el-time-select
              placeholder="结束时间"
              v-model="item.endTime"
              class="wd200"
              :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: startTime
          }"
            ></el-time-select>
          </div>
          <div class="rt">
            <img class="dialog_btn dialog_del" @click="editStage('del')" v-if="arr.length != 1" src="/static/img/home_other/ic_del.png" alt="">
            <img class="dialog_btn dialog_add" @click="editStage('add')" v-if="index == arr.length - 1" src="/static/img/home_other/ic_add.png" alt="">
          </div>
        </div>
        <div class="">
          <div class="sel">涨跌比例:</div>
          <el-select class="wd400" v-model="value" placeholder="请选择比例">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="add_btn wd110" @click="addElectricity()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <electricityDialog v-if="dialogFormVisible" @getMessage="showMsg()" :msg="msg" :title="title" /> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import electricityDialog from "@/components/pages/dialog/electricityDialog";

export default {
  data() {
    return {
      tableData: [],
      visibility: true,
      dialogFormVisible: false,
      msg: "123",
      title: "",
      formLabelWidth: "120px",
      startTime: "",
      endTime: "",
      arr: [
        { startTime: "00:00", endTime: "12:00" },
        { startTime: "00:00", endTime: "12:00" }
      ],
      ruleForm: {
        title: "新增时段电价"
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      value: ""
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {},
  methods: {
    ...mapActions(["setToKen"]),
    createElectricity(title) {
      this.title = title;
      this.dialogFormVisible = true;
    },
    editElectricity(title) {
      this.title = title;
      this.dialogFormVisible = true;
    },
    addElectricity() {

    },
    editStage(params,index) {
      var that = this
      if(params == 'add'){
        this.arr.push({startTime: '00:00',endTime: '12:00'})
      }else{
        var slice = that.arr.splice(index,1)
      }
      console.log(this.arr)
    },
    edit() {
      this.dialogFormVisible = true;
      console.log("12132");
    },
    skip(type, param) {
      this.$router.push({
        name: type,
        params: {
          id: param
        }
      });
    },
    showMsg(visibility) {
      this.dialogFormVisible = visibility;
    },
    del() {
      alert(1111);
    }
  },
  components: {
    electricityDialog
  }
};
</script>
<style scoped lang="less">
.stageElectricity {
  width: 100%;
  background: #ffffff;
  padding: 42px 0;
  .header {
    padding: 20px 30px;
    border-bottom: 1px solid #ebebeb;
    p {
      border-left: 4px solid #14bf6d;
      padding-left: 10px;
    }
  }
  .section {
    width: 600px;
    margin: 42px auto;
  }
  .cell {
    width: 600px;
    height: 120px;
    display: flex;
    text-align: center;
    .display {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sub_title {
      flex: 3;
      background: #14bf6d;
      color: #ffffff;
      position: relative;
      .tag {
        width: 40px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        background: #ff9c00;
        font-size: 12px;
        position: absolute;
        top: -1px;
        left: -1px;
      }
    }
    .content {
      flex: 4;
    }
    .desc {
      flex: 9;
    }
    .handle {
      flex: 2.5;
    }
    .btn {
      width: 50px;
      height: 22px;

      border-radius: 11px;
    }
    .edit_btn {
      background: transparent;
      padding: 0;
      margin: 0;
      border: 1px solid #14bf6d;
      color: #14bf6d;
      position: relative;
      z-index: 111;
    }
    .del_btn {
      border: none;
      background: transparent;
      padding: 0;
      margin: 5px 0 0;
      border: 1px solid #fa5168;
      color: #fa5168;
      position: relative;
      z-index: 111;
    }
  }
  .tip {
    color: #797979;
    font-size: 14px;
    line-height: 21px;
    margin-top: 14px;
  }
  .add_btn {
    width: 186px;
    height: 40px;
    border-radius: 5px;
    background: #14bf6d;
    border: 1px solid #14bf6d;
    color: #ffffff;
    display: block;
    margin: 40px auto;
  }
  .border {
    border: 1px solid #14bf6d;
  }
  .border_lt {
    border-left: 1px solid #14bf6d;
  }
  .border_rt {
    border-right: 1px solid #14bf6d;
  }
  .wd200 {
    width: 200px;
  }
  .wd400 {
    width: 400px;
  }
  .wd110 {
    width: 110px;
  }
  .dialog_section {
    padding: 0 50px;
    .dialog_sub_title {
      width: 30px;
      height: 14px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .item {
      color: #e0e0e0;
      margin: 20px 0;
      display: flex;
      // justify-content: center;
      align-items : center; 
      .lt{
        flex: 7;
      }
      .rt{
        flex: 2;
        // display: flex;
        // align-items : center; 
      }
    }
    .sel {
      display: inline-block;
    }
    .dialog_btn {
      width: 24px;
      height: 24px;
      margin: 0 10px 0 0;
    }
    .dialog_add {
    }
    .dialog_del {
    }
  }
}
</style>
