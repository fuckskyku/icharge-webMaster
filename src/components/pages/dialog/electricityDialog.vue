<template>
    <div class="electricityDialog">
        <!-- dialog -->
        <el-dialog :title="title">
            <div class="dialog_section">
                <div>时段:</div>
                <div class="item">
                    <el-time-select
                        placeholder="起始时间"
                        class="wd200"
                        v-model="startTime"
                        :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
                    ></el-time-select>
                    <span>——</span>
                    <el-time-select
                        placeholder="结束时间"
                        v-model="endTime"
                        class="wd200"
                        :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: startTime
          }"
                    ></el-time-select>
                </div>
                <div class="item">
                    <el-time-select
                        placeholder="起始时间"
                        v-model="startTime"
                        class="wd200"
                        :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
                    ></el-time-select>
                    <span>——</span>
                    <el-time-select
                        placeholder="结束时间"
                        v-model="endTime"
                        class="wd200"
                        :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: startTime
          }"
                    ></el-time-select>
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
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["msg","title"],
  data() {
    return {
      tableData: [],
      startTime: "",
      endTime: "",
      //该数组控制input动态添加、删除
      arr: [{ startTime: "00:00", endTime: "12:00" }],
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
    createElectricity() {
      this.dialogFormVisible = true;
    },
    addElectricity() {},
    edit() {
      this.dialogFormVisible = true;
      that.$emit('getMessage', false)
      console.log("12132");
    },
    close(){
      this.$emit('getMessage', false)
    },
    del() {
      alert(1111);
    },
    
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
    }
    .sel {
      display: inline-block;
    }
    .dialog_btn {
      width: 24px;
      height: 24px;
    }
    .dialog_add {
    }
    .dialog_del {
    }
  }
}
</style>
