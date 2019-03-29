<template>
  <div class="electricityDialog">
    <!-- dialog -->
    <el-dialog :title="title" :visible.sync="dialogVisible" @close="close">
      <div class="dialog_section">
        <div>时段:</div>
        <div class="item" v-for="(item,index) in arr" :key="index">
          <div class="lt">
            <el-time-select
              placeholder="起始时间"
              class="wd200"
              v-model="item.startTime"
              :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '23:45'
          }"
            ></el-time-select>
            <span>——</span>
            <el-time-select
              placeholder="结束时间"
              v-model="item.endTime"
              class="wd200"
              :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '23:45',
            minTime: startTime
          }"
            ></el-time-select>
          </div>
          <div class="rt">
            <div class="dialog_del" @click="editor('del',index)" v-if="arr.length != 1">
              <img src="/static/img/home_other/ic_del.png" alt="">
            </div>
            <div class="dialog_add" @click="editor('add',index)" v-if="index == arr.length - 1">
              <img src="/static/img/home_other/ic_add.png" alt="">
            </div>
          </div>
        </div>
        <div class="">
          <div class="sel">涨跌比例:</div>
          <el-select class="wd400" v-model="ratio" @change="bindRatioChange" placeholder="请选择比例">
            <el-option
              v-for="item in ratioOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="add_btn wd110" @click="addElectricity()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { settingstationtimeintervalprice, getstationintervalpricelist } from "@/api/api";

export default {
  props: ["msg", "title"],
  data() {
    return {
      dialogVisible: true,
      tableData: [],
      startTime: "",
      endTime: "",
      //该数组控制input动态添加、删除
      arr: [{ startTime: "00:00", endTime: "12:00" }],
      ratioOptions: [],
      ratio: ""
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["setToKen"]),
    init() {
      this.dialogVisible = true;
      if (this.msg != "0") {
        this.getstationintervalpricelistFun()
      }
      var ratioData = [];
      for (var i = -99; i < 100; i++) {
        if (i < 0) {
          ratioData[i + 99] = i + "%";
        } else if (i > 0) {
          ratioData[i + 99] = "+" + i + "%";
        } else {
          ratioData[i + 99] = i + "%";
        }
      }
      ratioData.map((item, index) => {
        this.ratioOptions.push({
          value: index,
          label: item
        });
      });
    },
    addElectricity() {
      var that = this;
      //开始时段集合,用逗号分隔
      var startTimeStr = "";
      //结束时段集合，用逗号分隔
      var endTimeStr = "";
      this.arr.map((item, index) => {
        if (this.arr.length > 1) {
          startTimeStr += item.startTime + ",";
          endTimeStr += item.endTime + ",";
        } else {
          startTimeStr += item.startTime;
          endTimeStr += item.endTime;
        }
      });
      startTimeStr = startTimeStr.slice(0, startTimeStr.length);
      endTimeStr = endTimeStr.slice(0, endTimeStr.length);
      console.log(
        "startTimeStr",
        startTimeStr,
        "endTimeStr",
        endTimeStr,
        this.ratio.replace("%", "") / 100
      );
      this.$confirm("确定设置该时段电价吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          settingstationtimeintervalprice({
            timenumber: that.msg,
            timebegins: startTimeStr,
            timeends: endTimeStr,
            increase: that.ratio.replace("%", "") / 100
          }).then(res => {
            console.log("设置时段电价",res.data.data)
            if (res.data.code == 200) {
              that.$message({
                type: "success",
                message: "设置成功!"
              });
              this.dialogVisible = false;
              that.$emit("getMessage", false);
            } else {
              that.$message({
                type: "error",
                message: res.data.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消设置"
          });
        });
    },
    editor(type, index) {
      if (type == "add") {
        this.arr.push({ startTime: "00:00", endTime: "12:00" });
        console.log(this.arr);
      } else {
        this.$confirm("是否删除该时段电价?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var slice = this.arr.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            console.log(this.arr);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    getstationintervalpricelistFun() {
      var that = this
      this.arr = []
      var tableData = []
      that.tableData = []
      getstationintervalpricelist({
        pageSize: 100
      }).then(res =>{
        if(res.data.code == 200){
          console.log(res.data.data)
          this.tableData = res.data.data
          this.tableData.map((item,index)=>{
            item.Times = item.Times.split('|')
            if(item.Number == this.msg){
              tableData = item.Times
            }
          })
          console.log(this.tableData)
          tableData.map((item,index) =>{
            that.arr.push({
              startTime: item.split('~')[0].substring(0,5),
              endTime: item.split('~')[1].substring(0,5),
            })
          })
          console.log('that.that.arr',that.arr)
        }
      })

    },
    bindRatioChange(value) {
      console.log("ratio", this.ratio);
      var result = this.ratio.replace("%", "") / 100;
      console.log(result);
    },
    edit() {
      that.$emit("getMessage", false);
    },
    close() {
      this.$emit("getMessage", false);
    }
  },
  components: {}
};
</script>
<style scoped lang="less">
.electricityDialog {
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
    width: 180px;
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
      align-items: center;
      .lt {
      }
      .rt {
        display: flex;
        align-items: center;
      }
    }
    .sel {
      display: inline-block;
    }
    .dialog_btn {
      width: 24px;
      height: 24px;
    }
    .dialog_add {
      margin-left: 10px;
    }
    .dialog_del {
      margin-left: 10px;
    }
  }
}
</style>
