<template>
  <div id="food-time">
    <div class="trip-title">{{ $t("FoodTime.title") }}</div>

    <div class="deta_header">
      <!-- 筛选条件 -->
      <div class="selectBox">
        <div class="year">
          <DatePicker
            class="calendarFont"
            :editable="false"
            type="year"
            style="100% 100%"
            format="yyyy"
            v-model="occurrenceYear"
            @on-change="changYear($event)"
          ></DatePicker>
        </div>
        <div class="occurrenceDay">
          <Select
            v-model="occurrenceDay"
            style="width: 100%"
            @on-change="changTable($event)"
          >
            <Option
              v-for="item in occurrenceDayList"
              :value="item.date"
              :key="item.date"
              format="yyyy-MM-dd"
              >{{ item.date }}</Option
            >
          </Select>
        </div>
      </div>

      <div class="modifyDay">
        作成日：
        <DatePicker
          class="calendarFont"
          :editable="false"
          style="100% 100%"
          v-model="modifyDay"
          format="yyyy-MM-dd"
          @on-change="changDay($event)"
        ></DatePicker>
      </div>
    </div>

    <div style="overflow-x:scroll">
      <table
        class="time-table new-table"
        border="1"
        style="border:1px solid #C4E8BF;"
      >
        <thead>
          <tr>
            <th colspan="2" class="position">
              {{ month }}{{ $t("FoodTime.month") }}
            </th>
            <td
              v-for="(item, index) in dayNum"
              :key="index"
              style="max-width: 0.3rem;"
            >
              {{ index + 1 < 10 ? "0" : "" }}{{ index + 1 }}
            </td>
            <th style="min-width: 1.5rem;">{{ $t("FoodTime.Remarks") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tabList" :key="index">
            <td class="head-bg position1">{{ index + 1 }}</td>
            <td class="itemNameTd head-bg position2">
              {{ item.tdItem.cName }}
            </td>
            <td
              v-for="(item2, index2) in item.numList"
              @click="setIndex(index, index2)"
              :key="index2"
            >
              {{ item2 < 0 ? null : item2 }}
              <div style="width:0.3rem" class="fuBox">
                <div v-if="index == clickIndex && index2 == clickIndex2">
                  <div
                    :class="{
                      ziBox: true,
                      ziBoxTwo: index > tabList.length - 3
                    }"
                  >
                    <div @click.stop="setInput(0, index, index2)">0</div>
                    <div @click.stop="setInput(1, index, index2)">1</div>
                    <div @click.stop="setInput(2, index, index2)">2</div>
                    <div @click.stop="setInput(3, index, index2)">3</div>
                    <div @click.stop="setInput(4, index, index2)">4</div>
                    <div
                      class="seleText"
                      @click.stop="setInput(-1, index, index2)"
                    >
                      取消
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <Input
                v-model="item.remark"
                type="textarea"
                :autosize="{ minRows: 2 }"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="time-info">
      <div class="info-title">{{ $t("FoodTime.Evaluation") }}</div>
      <ul class="info-list">
        <li>{{ $t("FoodTime.can4") }}</li>
        <li>{{ $t("FoodTime.can3") }}</li>
        <li>{{ $t("FoodTime.can2") }}</li>
        <li>{{ $t("FoodTime.can1") }}</li>
        <li>{{ $t("FoodTime.can0") }}</li>
      </ul>
    </div>
    <div class="table-submit">
      <button @click="handleSubmit()">
        <i class="iconfont icon-submit"></i>
        {{ $t("global.submit") }}
      </button>
    </div>
  </div>
</template>

<script>
import { getFoodList, foodAdd, getDateById } from "../network/kongHX";
import Vue from "vue";
import { format } from "../assets/utils/Tools";
export default {
  name: "foodList",
  data() {
    return {
      month: 0,
      startDate: "", //本月1号
      nowDay: "", //今天xxxx-xx-xx
      dayNum: 0, //当月天数
      editId: 0,
      oldInfo: {}, //老人信息
      standardList: [0, 1, 2, 3, 4],
      tabList: [],
      nameList: [
        {
          cName: this.$t("FoodTime.Sober"),
          rName: "awake"
        },
        {
          cName: this.$t("FoodTime.have"),
          rName: "eatDesire"
        },
        {
          cName: this.$t("FoodTime.take"),
          rName: "posture"
        },
        {
          cName: this.$t("FoodTime.peralatan"),
          rName: "pickUp"
        },
        {
          cName: this.$t("FoodTime.fix"),
          rName: "fixation"
        },
        {
          cName: this.$t("FoodTime.chopsticks"),
          rName: "actions"
        },
        {
          cName: this.$t("FoodTime.send"),
          rName: "send"
        },
        {
          cName: this.$t("FoodTime.mouth"),
          rName: "carry"
        }
      ],
      clickIndex: -1,
      clickIndex2: -1,
      occurrenceYear: format(new Date(), "YYYY"),
      occurrenceDay: "",
      occurrenceDayList: [],
      modifyDay: "",
      createDate: ""
    };
  },
  created() {
    this.oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    this.year = JSON.stringify(new Date().getFullYear());
    this.getDetaList();
  },
  methods: {
    //获取生成日列表
    async getDetaList() {
      try {
        const res = await getDateById({
          oldManId: this.oldInfo.oldId,
          year: this.year,
          type: 11
        });
        if (res.code === 0) {
          if (res.data.length) {
            this.occurrenceDayList = res.data;
            this.occurrenceDay = res.data[0].date;
            this.modifyDay = res.data[0].date;
            this.createDate = res.data[0].date;
            this.month = res.data[0].date.substring(5, 7);
            this.getTime();
          } else {
            this.occurrenceDayList = res.data;
            this.modifyDay = format(new Date(), "YYYY-MM-DD");
            this.createDate = format(new Date(), "YYYY-MM-DD");
            this.occurrenceDay = "";
            this.month = this.modifyDay.substring(5, 7);
            this.getTime();
          }
        } else {
          this.$Notice.error({
            title: this.$t("global.loadFail"),
            desc: res.data
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    //根据生成日切换表格
    changTable(e) {
      if (e) {
        this.createDate = e;
        this.modifyDay = e;
        this.month = this.modifyDay.substring(5, 7);
        this.getTime();
      }
    },
    //修改生成日
    changDay(e) {
      if (e) {
        this.modifyDay = e;
        this.month = this.modifyDay.substring(5, 7);
        this.createDate = e;
        this.getTime();
      }
    },
    //切换年份
    changYear(e) {
      this.year = e;
      this.occurrenceYear = e;
      this.getDetaList();
    },
    //获取点击显示下拉框的下标
    setIndex(index, index2) {
      this.clickIndex = index;
      this.clickIndex2 = index2;
    },
    //选择下拉框
    setInput(value, index, index2) {
      if (index2 === 0) {
        //选择1号
        for (let i = 0; i < this.dayNum; i++) {
          this.tabList[index].numList[i] = parseInt(value);
        }
      } else {
        this.tabList[index].numList[index2] = parseInt(value);
      }
      this.$set(this, "clickIndex", -1);
      this.$set(this, "clickIndex2", -1);
    },
    //获取
    async getList() {
      try {
        const res = await getFoodList({
          oldManId: this.oldInfo.oldId,
          month: this.createDate
        });
        if (res.code === 0) {
          var resArr = []; //返回对象转化
          for (let i in res.data) {
            let o = {};
            o[i] = res.data[i];
            resArr.push(o);
          }
          // console.log("返回数组", resArr);
          for (var i = 0; i < this.nameList.length; i++) {
            for (var j = 0; j < resArr.length; j++) {
              for (var d in resArr[j]) {
                if (this.nameList[i].rName == d) {
                  this.tabList[i].numList = this.listType(resArr[j], i);
                  // console.log("返回相对应项目的index", j);
                  // console.log("返回相对应项目的项目名称", d);
                  break;
                }
              }
            }
          }
          if (res.data.id) {
            this.editId = res.data.id;
          }
        } else {
          this.$Notice.error({
            title: this.$t("global.loadFail"),
            desc: res.data
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    getTime() {
      var monNum = [];
      //获取当月天数
      var d = new Date(this.year, this.month, 0).getDate();
      this.dayNum = d;
      let a = -1;
      for (let i = 1; i <= d; i++) {
        monNum.push(a);
      }

      for (let j = 0; j < this.nameList.length; j++) {
        Vue.set(this.tabList, j, {
          name: JSON.parse(JSON.stringify(this.nameList[j].rName)),
          numList: JSON.parse(JSON.stringify(monNum)),
          remark: "",
          tdItem: JSON.parse(JSON.stringify(this.nameList[j]))
        });
      }
      this.getList();
    },
    handleSubmit() {
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("global.submitInfo"),
        okText: this.$t("global.sure"),
        cancelText: this.$t("global.cancel"),
        onOk: async () => {
          let data = {
            oldManId: this.oldInfo.oldId,
            type: 11,
            year: this.createDate.substring(0, 4)
          };
          getDateById(data).then(res => {
            if (res.code == 0) {
              let result = true; //默认该生成日为添加
              if (res.data.length) {
                for (let i = 0; i < res.data.length; i++) {
                  if (
                    this.createDate.substring(0, 7) ===
                    res.data[i].date.substring(0, 7)
                  ) {
                    //该生成日的年份里有该数据，修改该日期的
                    result = false;
                  }
                }
              } else {
                //该生成日的年份里没有数据，添加该日期的
                result = true;
              }
              //判断是修改还是添加
              if (result) {
                this.handerAdd();
              } else {
                this.handerEdit();
              }
            }
          });
        }
      });
    },
    //添加
    async handerAdd() {
      try {
        let requestObj = {};
        this.nameList.forEach((item, index) => {
          requestObj[item.rName] = JSON.stringify(this.objType(item.rName));
        });
        requestObj["id"] = "";
        requestObj["oldManId"] = this.oldInfo.oldId;
        requestObj["operatorId"] = "";
        requestObj["createDate"] = this.createDate;
        // console.log("请求对象", requestObj)
        const res = await foodAdd(requestObj);
        console.log(res);
        if (res.code === 0) {
          this.$Notice.success({
            title: this.$t("global.operationSuccess")
          });
          this.getDetaList();
        } else if (res.code === 415) {
          this.$Notice.error({
            title: this.$t("global.operationFail"),
            desc: this.$t("global.claim")
          });
        } else {
          this.$Notice.error({
            title: this.$t("global.operationFail"),
            desc: res.data
          });
          return false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    //修改
    async handerEdit() {
      // console.log("输入的数组", this.tabList);
      let requestObj = {};
      this.nameList.forEach((item, index) => {
        requestObj[item.rName] = JSON.stringify(this.objType(item.rName));
      });
      requestObj["id"] = this.editId;
      requestObj["oldManId"] = this.oldInfo.oldId;
      requestObj["operatorId"] = "";
      requestObj["createDate"] = this.createDate;
      // console.log("请求对象", requestObj);
      try {
        const res = await foodAdd(requestObj);
        console.log(res);
        if (res.code === 0) {
          this.$Notice.success({
            title: this.$t("global.operationSuccess")
          });
          this.getDetaList();
        } else if (res.code === 415) {
          this.$Notice.error({
            title: this.$t("global.operationFail"),
            desc: this.$t("global.claim")
          });
        } else {
          this.$Notice.error({
            title: this.$t("global.operationFail"),
            desc: res.data
          });
          return false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    //转化对象
    objType(str) {
      let obj = {};
      let a = 0;
      for (let i = 0; i < this.tabList.length; i++) {
        if (str == this.tabList[i].name) {
          let arr = this.tabList[i].numList;
          a = i;
          arr.forEach((item, index) => {
            let d = index + 1;
            let n = "day" + d;
            obj[n] = parseInt(item);
          });
        }
      }
      // console.log("转化后的对象", obj);
      obj["remark"] = this.tabList[a].remark;
      return obj;
    },
    //转化数组
    listType(obj, i) {
      let arr = [];
      for (var key in obj) {
        let obj2 = JSON.parse(obj[key]);
        for (var keys in obj2) {
          arr.push(obj2[keys]); //值
          // console.log(obj2[keys],keys); //名
        }
        this.tabList[i].remark = arr[arr.length - 1];
        arr.pop();
        return arr;
      }
    }
  }
};
</script>

<style lang="less" scoped>
#food-time {
  text-align: left;

  table.time-table {
    background: #fff;
    width: 100%;
    border-collapse: collapse;
    border-color: var(--border-color);
    margin-bottom: 0.29rem /* 30/102 */;
    font-size: 0.14rem /* 14/102 */;
    line-height: 0.49rem /* 50/102 */;
    text-align: center;
    border-radius: 5px;
    // overflow: hidden;
    tbody {
      .itemNameTd {
        line-height: 0.25rem;
        min-width: 2rem;
        white-space: pre-wrap;
      }
      .head-bg {
        font-size: 0.14rem;
      }
      td:first-child {
        min-width: 0.2rem;
        background: var(--table-bg);
        color: #fff;
      }
      .fuBox {
        position: relative;
        z-index: 3;
      }
      .ziBox {
        width: 100%;
        line-height: 0.2rem;
        position: absolute;
        overflow: auto;
        margin: 5px 0;
        padding: 5px 0;
        background: #fff;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        z-index: 3;
        .seleText {
          font-size: 0.12rem;
          color: #333;
        }
      }
      .ziBoxTwo {
        bottom: 0;
      }
    }
    th {
      text-align: center;
      background: var(--table-bg);
      color: #fff;
    }
    td:first-child,
    // td:nth-child(2) {
    //   background: #92de8b;
    //   color: #fff;
    // }
    td input {
      border: none;
      text-align: center;
    }
    td input:focus {
      outline: medium;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
    }
    td {
      position: relative;
    }
    td textarea {
      width: 90% !important/* 80/102 */;
      height: 90% /* 80/102 */;
      outline: none;
      resize: none;
      border: none;
      z-index: 99;
      position: absolute;
      top: 5%;
      left: 5%;
      bottom: 5%;
    }
  } // table end

  .time-info {
    display: flex;
    font-size: 0.16rem /* 16/102 */;
    color: #000;
    .info-title {
      margin-right: 0.2rem /* 20/102 */;
    }
  } // .trip-info ned
}
</style>