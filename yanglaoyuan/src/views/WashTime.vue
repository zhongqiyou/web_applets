<template>
  <div id="wash-time">
    <div class="trip-title">{{ $t("WashTime.title") }}</div>

    <div class="deta_header">
      <!-- 筛选条件 -->
      <div class="selectBox">
        <div class="year">
          <DatePicker
            class="calendarFont"
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
          style="100% 100%"
          v-model="modifyDay"
          format="yyyy-MM-dd"
          @on-change="changDay($event)"
        ></DatePicker>
      </div>
    </div>

    <table
      class="table new-table"
      border="1"
      v-for="(item, index) in topTabList"
      :key="index"
      v-show="index == remarkID"
      style="border:1px solid #C4E8BF;width: 100%;margin-bottom: 0.3rem;"
    >
      <tr>
        <td class="head-bg">{{ $t("DrainTrip.Mobility") }}</td>
        <td colspan="5" style="text-align: left" class="assist">
          <CheckboxGroup
            v-model="item.actionAssist"
            @on-change="changActionAssist($event, index)"
          >
            <Checkbox label="1">{{ $t("DrainTrip.need") }}</Checkbox>
            <Checkbox label="9" :disabled="item.disabledCheckbox">{{
              $t("DrainTrip.Crutch")
            }}</Checkbox
            >（
            <Checkbox label="2" :disabled="item.disabledCheckbox">{{
              $t("DrainTrip.leg")
            }}</Checkbox>
            <Checkbox label="3" :disabled="item.disabledCheckbox">{{
              $t("DrainTrip.Multi")
            }}</Checkbox
            >）
            <Checkbox label="4" :disabled="item.disabledCheckbox">{{
              $t("DrainTrip.Silver")
            }}</Checkbox>
            <Checkbox label="10" :disabled="item.disabledCheckbox">{{
              $t("DrainTrip.Walker")
            }}</Checkbox
            >（
            <Checkbox label="5" :disabled="item.disabledCheckbox">{{
              $t("DrainTrip.walker4")
            }}</Checkbox>
            <Checkbox label="6" :disabled="item.disabledCheckbox">{{
              $t("DrainTrip.walkingU")
            }}</Checkbox>
            <Checkbox label="7" :disabled="item.disabledCheckbox">{{
              $t("DrainTrip.Forearm")
            }}</Checkbox
            >）
            <Checkbox label="8" :disabled="item.disabledCheckbox">{{
              $t("DrainTrip.Wheelchair")
            }}</Checkbox>
          </CheckboxGroup>
        </td>
      </tr>
    </table>

    <div style="overflow-x: scroll;">
      <table
        class="time-table new-table"
        border="1"
        style="border:1px solid #C4E8BF;"
      >
        <thead>
          <tr>
            <td colspan="3" class="bg position">
              {{ month }} {{ $t("WashTime.Month") }}
            </td>
            <td
              v-for="(item, index) in dayNum"
              :key="index"
              style="max-width: 0.3rem;"
            >
              {{ index + 1 < 10 ? "0" : "" }}{{ index + 1 }}
            </td>
            <td style="min-width: 1.5rem;">{{ $t("WashTime.Remarks") }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tabList" :key="index">
            <td
              v-if="item.tdItem.tdNum > 0"
              class="head-bg position1"
              :rowspan="item.tdItem.tdNum"
            >
              {{ item.tdItem.leftName }}
            </td>
            <td class="head-bg position2" style="min-width:0.3rem">
              {{ index + 1 }}
            </td>
            <td class="head-bg itemNameTd position3">
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
      <div class="info-title">{{ $t("WashTime.Evaluation") }}</div>
      <ul class="info-list">
        <li>{{ $t("WashTime.points4") }}</li>
        <li>{{ $t("WashTime.points3") }}</li>
        <li>{{ $t("WashTime.points2") }}</li>
        <li>{{ $t("WashTime.points1") }}</li>
        <li>{{ $t("WashTime.points0") }}</li>
      </ul>
    </div>
    <div class="table-submit">
      <button id="subBtn" @click="handleSubmit()" style="margin-left: 20px;">
        <i class="iconfont icon-baocun"></i>
        {{ $t("global.submit") }}
      </button>
    </div>
  </div>
</template>

<script>
import {
  getWashList,
  sendAdd,
  sendModify,
  getDateById
} from "../network/kongHX";
import Vue from "vue";
import { format } from "../assets/utils/Tools";
export default {
  name: "washTimeTable",
  data() {
    return {
      month: 0,
      startDate: "", //本月1号
      nowDay: "", //今天xxxx-xx-xx
      dayNum: 0, //当月天数
      dayRow: 0, //本月今天日期
      editId: 0,
      oldInfo: {}, //老人信息
      nameList: [
        {
          tdNum: 7,
          tdNo: 1,
          leftName: this.$t("WashTime.Take"),
          cName: this.$t("WashTime.sit"),
          rName: "bodySit"
        },
        {
          tdNum: 0,
          tdNo: 1,
          cName: this.$t("WashTime.Use"),
          rName: "bodyShower"
        },
        {
          tdNum: 0,
          tdNo: 2,
          cName: this.$t("WashTime.Spread"),
          rName: "bodySoap"
        },
        {
          tdNum: 0,
          tdNo: 3,
          cName: this.$t("WashTime.Body"),
          rName: "bodyBath"
        },
        {
          tdNum: 0,
          tdNo: 4,
          cName: this.$t("WashTime.shed"),
          rName: "bodyShed"
        },
        {
          tdNum: 0,
          tdNo: 5,
          cName: this.$t("WashTime.towel"),
          rName: "bodyWashTowel"
        },
        {
          tdNum: 0,
          tdNo: 1,
          cName: this.$t("WashTime.standUp"),
          rName: "bodyStandUp"
        },
        {
          tdNum: 4,
          tdNo: 1,
          leftName: this.$t("WashTime.Wash"),
          cName: this.$t("WashTime.Pour"),
          rName: "hairWater"
        },
        {
          tdNum: 0,
          tdNo: 2,
          cName: this.$t("WashTime.Pick"),
          rName: "hairShampoo"
        },
        {
          tdNum: 0,
          tdNo: 3,
          cName: this.$t("WashTime.mencuci"),
          rName: "hairWash"
        },
        {
          tdNum: 0,
          tdNo: 4,
          cName: this.$t("WashTime.shed"),
          rName: "hairShed"
        },
        {
          tdNum: 4,
          tdNo: 1,
          leftName: this.$t("WashTime.goods1"),
          cName: this.$t("WashTime.tub"),
          rName: "tubNoCross"
        },
        {
          tdNum: 0,
          tdNo: 2,
          cName: this.$t("WashTime.down"),
          rName: "tubNoSit"
        },
        {
          tdNum: 0,
          tdNo: 3,
          cName: this.$t("WashTime.stand2"),
          rName: "tubNoStand"
        },
        {
          tdNum: 0,
          tdNo: 4,
          cName: this.$t("WashTime.bathOut"),
          rName: "tubNoOut"
        },
        {
          tdNum: 8,
          tdNo: 1,
          leftName: this.$t("WashTime.goods2"),
          cName: this.$t("WashTime.busBoard"),
          rName: "tubYesPerchedA"
        },
        {
          tdNum: 0,
          tdNo: 2,
          cName: this.$t("WashTime.bathtub"),
          rName: "tubYesFeet"
        },
        {
          tdNum: 0,
          tdNo: 3,
          cName: this.$t("WashTime.stand"),
          rName: "tubYesStandA"
        },
        {
          tdNum: 0,
          tdNo: 6,
          cName: this.$t("WashTime.down2"),
          rName: "tubYesSit"
        },
        // {
        //   tdNum: 0,
        //   tdNo: 5,
        //   cName: this.$t("WashTime.stand"),
        //   rName: "tubYesStandB"
        // },
        // {
        //   tdNum: 0,
        //   tdNo: 4,
        //   cName: this.$t("WashTime.busBoard"),
        //   rName: "tubYesPerchedB"
        // },
        {
          tdNum: 0,
          tdNo: 7,
          cName: this.$t("WashTime.stickOut"),
          rName: "tubYesStick"
        },
        {
          tdNum: 0,
          tdNo: 8,
          cName: this.$t("WashTime.outside"),
          rName: "tubYesOutside"
        }
      ],
      standardList: [0, 1, 2, 3, 4],
      tabList: [],
      clickIndex: -1,
      clickIndex2: -1,
      topTabList: [],
      remarkID: 0,
      selectAList: [],
      crutchItemList: [],
      actionAssistItemList: [],
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
    //切换行为辅助
    changActionAssist(e, index) {
      this.topTabList[index].disabledCheckbox = false;
      //选择了没必要,清除并且禁用其他选项
      for (let i = 0; i < e.length; i++) {
        if (e[i] == 1) {
          this.topTabList[index].disabledCheckbox = true;
          // this.topTabList[index].actionAssist = ["1"];
          break;
        }
      }
      //默认不选中杖
      for (let i = 0; i < e.length; i++) {
        if (e[i] == 9) {
          this.topTabList[index].actionAssist.splice(i, 1);
          break;
        }
      }
      //选择了杖括号里的,默认选中杖
      for (let i = 0; i < e.length; i++) {
        if (e[i] == 2 || e[i] == 3) {
          this.topTabList[index].actionAssist.push("9");
          break;
        }
      }
      //默认不选歩行器
      for (let i = 0; i < e.length; i++) {
        if (e[i] == 10) {
          this.topTabList[index].actionAssist.splice(i, 1);
          break;
        }
      }
      //选择了歩行器括号里的,默认选中歩行器
      for (let i = 0; i < e.length; i++) {
        if (e[i] == 5 || e[i] == 6 || e[i] == 7) {
          this.topTabList[index].actionAssist.push("10");
          break;
        }
      }
    },
    //获取生成日列表
    async getDetaList() {
      try {
        const res = await getDateById({
          oldManId: this.oldInfo.oldId,
          year: this.year,
          type: 12
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
    // 处理选择单选框（再次点击取消选择）
    handleRadioGroup(index, type, value) {
      if (this.topTabList[index][type] == value) {
        setTimeout(() => {
          this.topTabList[index][type] = "";
        }, 10);
      }
    },
    //查看这一天的移动辅助
    selectTop(index) {
      this.remarkID = index;
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
    getTime() {
      var monNum = [];
      //获取当月天数
      var d = new Date(this.year, this.month, 0).getDate();
      this.dayNum = d;
      let a = -1;
      for (let i = 1; i <= d; i++) {
        monNum.push(a);
      }

      for (let m = 0; m < d; m++) {
        Vue.set(this.topTabList, m, {
          actionAssist: [], //行动辅助
          disabledCheckbox: false //禁用多选框
        });
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
    //获取列表
    async getList() {
      try {
        const res = await getWashList({
          id: this.oldInfo.oldId,
          month: this.createDate
        });
        if (res.code === 0) {
          console.log("remarkID", this.remarkID);
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
            this.showTopTab(res.data);
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
    //获取上表格(选择框)
    showTopTab(data) {
      const obj1 = JSON.parse(data.actionAssist); //行动辅助
      const arr1 = [];
      for (let i in obj1) {
        arr1.push(obj1[i]);
      }
      for (let j = 0; j < this.dayNum; j++) {
        //移动辅助有选择项目，如果选择了没必要就要禁止选择别的项目
        if (arr1[j].length) {
          for (let n = 0; n < arr1[j].length; n++) {
            if (arr1[j][n] == 1) {
              this.topTabList[j].disabledCheckbox = true;
              break;
            }
          }
        }

        this.topTabList[j].actionAssist = arr1[j];
      }
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
            type: 12,
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
    getTopTabCon() {
      const actionAssistList = [];
      for (let sele = 0; sele < this.topTabList.length; sele++) {
        actionAssistList.push(this.topTabList[sele].actionAssist);
      }
      this.selectAList = actionAssistList;
    },
    //添加
    async handerAdd() {
      this.getTopTabCon();
      let requestObj = {};
      this.nameList.forEach((item, index) => {
        requestObj[item.rName] = JSON.stringify(this.objType(item.rName));
      });
      requestObj["tubYesStandB"] = "";
      requestObj["tubYesPerchedB"] = "";
      requestObj["id"] = "";
      requestObj["oldManId"] = this.oldInfo.oldId;
      requestObj["operatorId"] = "";
      requestObj["createDate"] = this.createDate;
      requestObj["actionAssist"] = JSON.stringify(
        this.objTypeTwo(this.selectAList)
      );
      try {
        const res = await sendAdd(requestObj);
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
      this.getTopTabCon();
      let requestObj = {};
      this.nameList.forEach((item, index) => {
        requestObj[item.rName] = JSON.stringify(this.objType(item.rName));
      });
      requestObj["tubYesStandB"] = "";
      requestObj["tubYesPerchedB"] = "";
      requestObj["id"] = this.editId;
      requestObj["oldManId"] = this.oldInfo.oldId;
      requestObj["operatorId"] = "";
      requestObj["createDate"] = this.createDate;
      requestObj["actionAssist"] = JSON.stringify(
        this.objTypeTwo(this.selectAList)
      );
      // console.log("请求对象", requestObj);
      try {
        const res = await sendModify(requestObj);
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
    //转化对象2
    objTypeTwo(arr) {
      let obj = {};
      arr.map((e, index) => {
        let d = index + 1;
        let n = "day" + d;
        obj[n] = e;
      });
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
    },
    // 处理选择单选框（再次点击取消选择）
    handleRadioGroup(index, type, value) {
      if (this.topTabList[index][type] == value) {
        setTimeout(() => {
          this.topTabList[index][type] = "";
        }, 10);
      } else {
        this.topTabList[index][type] = value;
      }
    }
  }
};
</script>
<style lang="less" scoped>
#wash-time {
  font-size: 0.14rem /* 14/102 */;
  .head-bg {
    font-size: 0.14rem;
  }
  .time-table {
    width: 100%;
    font-size: 0.14rem /* 12/102 */;
    background: #fff;
    border-color: var(--border-color);
    thead {
      line-height: 0.49rem /* 50/102 */;
    }
    .itemNameTd {
      min-width: 1.8rem;
      white-space: pre-wrap;
    }
    .fuBox {
      position: relative;
      z-index: 3;
    }
    .ziBox {
      width: 100%;
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
    tbody td {
      // max-width: 0.49rem /* 50/102 */;
      height: 0.49rem /* 50/102 */;
      // padding: 0.03rem /* 3/102 */;

      &:last-child {
        min-width: auto;
      }
      &:first-child {
        width: 0.2rem /* 20/102 */;
      }
      .record {
        width: 0.1rem;
        border: none;
        outline: medium;
      }
      .remarks {
        width: 1rem;
        border: none;
        outline: medium;
      }
    }
    td {
      height: 0.49rem /* 50/102 */;
      // padding: 0.01rem /* 3/102 */;
      &:last-child {
        min-width: auto;
      }
      &:first-child {
        width: 0.2rem /* 20/102 */;
      }
    }
    td input {
      border: none;
      text-align: center;
      padding: none;
    }
    td input:focus {
      outline: medium;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
    }
    td textarea {
      width: 80% !important;
      height: 100% /* 80/102 */;
      margin-top: 10px;
      outline: none;
      resize: none;
      border: none;
    }
    .bg {
      background: var(--table-bg);
      color: #fff;
    }
  } // .time-table end
  .time-info {
    text-align: left;
    display: flex;
    font-size: 0.16rem /* 16/102 */;
    color: #000;
    margin-top: 0.2rem /* 20/102 */;
    .info-title {
      margin-right: 0.2rem /* 20/102 */;
    }
  } // .trip-info ned
} // #wash-time end
</style>