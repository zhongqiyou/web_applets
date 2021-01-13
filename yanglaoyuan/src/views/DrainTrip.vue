<template>
  <div id="drain-trip">
    <h1 class="trip-title">{{ $t("DrainTrip.title") }}</h1>

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
          :editable="false"
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
      style="border:1px solid #C4E8BF;"
    >
      <tr>
        <td class="head-bg" style="min-width: 1.2rem;">
          {{ $t("DrainTrip.fangFa") }}
        </td>
        <td colspan="5" style="text-align: left">
          <CheckboxGroup v-model="item.excretionType">
            <Checkbox label="1">{{ $t("DrainTrip.WC") }}</Checkbox>
            <Checkbox label="2">{{ $t("DrainTrip.Urinal") }}</Checkbox>
            <Checkbox label="3">{{ $t("DrainTrip.Portable") }}</Checkbox>
            <Checkbox label="4">{{ $t("DrainTrip.Diaper") }}</Checkbox>
            <Checkbox label="5">{{ $t("DrainTrip.Other") }}</Checkbox>
          </CheckboxGroup>
        </td>
      </tr>
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
      <tr>
        <td class="head-bg">{{ $t("DrainTrip.rod") }}</td>
        <td>
          <RadioGroup v-model="item.walkingStick" size="large">
            <Radio
              @mouseup.native="handleRadioGroup(index, 'walkingStick', 1)"
              :label="1"
              >{{ $t("DrainTrip.Yes") }}</Radio
            >
            <Radio
              @mouseup.native="handleRadioGroup(index, 'walkingStick', 2)"
              :label="2"
              >{{ $t("DrainTrip.No") }}</Radio
            >
          </RadioGroup>
        </td>
        <td class="head-bg" style="width: 1.7rem">{{ $t("DrainTrip.Do") }}</td>
        <td>
          <RadioGroup v-model="item.handrail" size="large">
            <Radio
              @mouseup.native="handleRadioGroup(index, 'handrail', 1)"
              :label="1"
              >{{ $t("DrainTrip.Yes") }}</Radio
            >
            <Radio
              @mouseup.native="handleRadioGroup(index, 'handrail', 2)"
              :label="2"
              >{{ $t("DrainTrip.No") }}</Radio
            >
          </RadioGroup>
        </td>
        <td style="min-width: 1rem;" class="head-bg">
          {{ $t("DrainTrip.Excretion") }}
        </td>
        <td>
          <CheckboxGroup v-model="item.consumables">
            <Checkbox label="1">{{ $t("DrainTrip.Putter") }}</Checkbox>
            <Checkbox label="2">{{ $t("DrainTrip.Paper") }}</Checkbox>
            <Checkbox label="3">{{ $t("DrainTrip.Diapers") }}</Checkbox>
          </CheckboxGroup>
        </td>
      </tr>
    </table>

    <div style="overflow-x: scroll;">
      <table
        class="trip-month new-table"
        border="1"
        style="border:1px solid #C4E8BF;"
      >
        <thead>
          <tr>
            <td colspan="2" class="position" style="background: #fff;">
              {{ month }} {{ $t("global.month") }}
            </td>
            <td
              v-for="(item, index) in dayNum"
              :key="index"
              style="width: 0.3rem;"
            >
              {{ index + 1 < 10 ? "0" : "" }}{{ index + 1 }}
            </td>
            <td style="min-width: 1.27rem;">{{ $t("DrainTrip.Remarks") }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tabList" :key="index">
            <td class="head-bg position1" style="min-width:0.3rem">
              {{ index + 1 }}
            </td>
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
                      ziBoxTwo: index > tabList.length - 5
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
                style="min-width:1.5rem"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="trip-info">
      <div class="info-title">{{ $t("DrainTrip.Remarks") }}</div>
      <ul class="info-list">
        <li>{{ $t("DrainTrip.points4") }}</li>
        <li>{{ $t("DrainTrip.points3") }}</li>
        <li>{{ $t("DrainTrip.points2") }}</li>
        <li>{{ $t("DrainTrip.points1") }}</li>
        <li>{{ $t("DrainTrip.points0") }}</li>
      </ul>
    </div>
    <div class="table-submit">
      <button id="subBtn" @click="handerSubmit()" style="margin-left: 20px;">
        <i class="iconfont icon-baocun"></i>
        {{ $t("global.submit") }}
      </button>
    </div>
  </div>
</template>

<script>
import {
  getExcretionList,
  excretionAdd,
  excretionModify,
  getDateById
} from "../network/kongHX";
import { format } from "../assets/utils/Tools";
import Vue from "vue";
import { get } from "../network/http";
export default {
  name: "excretionList",
  data() {
    return {
      list: [
        {
          name: "title1",
          id: 1,
          otherContent: "",
          contentTextLeft: "(",
          contentTextRight: ")",
          contentTextWidth: "100px",
          showContent: true
        },
        {
          name: "title2",
          id: 2,
          showContent: false
        },
        {
          name: "title3",
          id: 3,
          otherContent: "",
          contentTextLeft: "(",
          contentTextRight: "hgia)",
          contentTextWidth: "1rem",
          showContent: true
        }
      ],
      isChange: -1,
      ban: true,
      radioValue: 0,
      test: false,
      objA: {
        aList: [
          { id: 1, name: "aaa", showContent: false },
          { id: 2, name: "bbb", showContent: false },
          { id: 3, name: "ccc", showContent: false }
        ],
        aValue: "",
        ban: false
      },

      topTabList: [],
      year: "",
      month: 0,
      dayNum: 0, //本月天数
      coningTabal: [],
      editId: "", //修改时主键id
      remarkID: 0,
      oldInfo: {}, //老人信息
      nameList: [
        {
          tdNum: 2,
          tdNo: 1,
          leftName: this.$t("DrainTrip.control"),
          cName: this.$t("DrainTrip.Feeling"),
          rName: "pissFeeling"
        },
        {
          tdNum: 2,
          tdNo: 1,
          leftName: this.$t("DrainTrip.cognitive"),
          cName: this.$t("DrainTrip.intention"),
          rName: "intention"
        },
        {
          tdNum: 0,
          tdNo: 2,
          cName: this.$t("DrainTrip.Feel"),
          rName: "shitBear"
        },
        {
          tdNum: 6,
          tdNo: 1,
          leftName: this.$t("DrainTrip.action"),
          cName: this.$t("DrainTrip.rolling"),
          rName: "tumble"
        },
        {
          tdNum: 0,
          tdNo: 2,
          cName: this.$t("DrainTrip.gettingUp"),
          rName: "getUp"
        },
        {
          tdNum: 0,
          tdNo: 3,
          cName: this.$t("DrainTrip.sedentary"),
          rName: "sedentariness"
        },
        {
          tdNum: 0,
          tdNo: 4,
          cName: this.$t("DrainTrip.rising"),
          rName: "rise"
        },
        {
          tdNum: 0,
          tdNo: 5,
          cName: this.$t("DrainTrip.standing"),
          rName: "often"
        },
        {
          tdNum: 0,
          tdNo: 6,
          cName: this.$t("DrainTrip.move"),
          rName: "move"
        },
        {
          tdNum: 11,
          tdNo: 1,
          leftName: this.$t("DrainTrip.pengeluaran"),
          cName: this.$t("DrainTrip.direction"),
          rName: "changeSide"
        },
        {
          tdNum: 0,
          tdNo: 2,
          cName: this.$t("DrainTrip.underwear"),
          rName: "offCloth"
        },
        {
          tdNum: 0,
          tdNo: 3,
          cName: this.$t("DrainTrip.seatSit"),
          rName: "sit"
        },
        {
          tdNum: 0,
          tdNo: 4,
          cName: this.$t("DrainTrip.angry"),
          rName: "anger"
        },
        {
          tdNum: 0,
          tdNo: 5,
          cName: this.$t("DrainTrip.paper"),
          rName: "takePaper"
        },
        {
          tdNum: 0,
          tdNo: 6,
          cName: this.$t("DrainTrip.wipe"),
          rName: "cleansing"
        },
        {
          tdNum: 0,
          tdNo: 7,
          cName: this.$t("DrainTrip.standUp"),
          rName: "standUp"
        },
        {
          tdNum: 0,
          tdNo: 8,
          cName: this.$t("DrainTrip.pat"),
          rName: "replacePat"
        },
        {
          tdNum: 0,
          tdNo: 9,
          cName: this.$t("DrainTrip.preparing"),
          rName: "prepareCloth"
        },
        {
          tdNum: 0,
          tdNo: 10,
          cName: this.$t("DrainTrip.flush"),
          rName: "washWater"
        },
        {
          tdNum: 0,
          tdNo: 11,
          cName: this.$t("DrainTrip.washHands"),
          rName: "washHand"
        },
        // {
        //   tdNum: 0,
        //   tdNo: 2,
        //   cName: this.$t("DrainTrip.toilet"),
        //   rName: "known"
        // },
        {
          tdNum: 1,
          tdNo: 1,
          leftName: this.$t("DrainTrip.move"),
          cName: this.$t("DrainTrip.returnRoom"),
          rName: "backRoom"
        }
      ],
      tabList: [],
      selectEList: [],
      selectAList: [],
      selectCList: [],
      selectWList: [],
      selectHList: [],
      clickIndex: -1,
      clickIndex2: -1,
      dblclickNum: 0,
      occurrenceYear: format(new Date(), "YYYY"),
      occurrenceDay: "",
      occurrenceDayList: [],
      modifyDay: "",
      createDate: ""
    };
  },
  created() {
    this.oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    this.getRadio();
    this.year = JSON.stringify(new Date().getFullYear());
    this.getDetaList();
  },
  mounted() {},
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
          type: 10
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

    getRadio() {
      this.radioValue = 1;
      if (this.radioValue) {
        this.isChange = this.radioValue - 1;
      }
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
    //切换上表格
    selectTop(index) {
      this.remarkID = index;
      console.log("这一天index", this.remarkID);
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
          consumables: [], //排泄用品
          excretionType: [], //排泄方法
          handrail: "", //扶手
          walkingStick: "", //需要P型杆
          disabledCheckbox: false //禁用多选框
        });
      }
      console.log("上表格", this.topTabList);

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
    async getList() {
      try {
        const res = await getExcretionList({
          oldManId: this.oldInfo.oldId, // 老人id
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
          //有数据变成提交编辑
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
      const obj2 = JSON.parse(data.consumables); //排泄用品
      const obj3 = JSON.parse(data.excretionType); //排泄方法
      const obj4 = JSON.parse(data.walkingStick); //需要P型杆
      const obj5 = JSON.parse(data.handrail); //是否需要测试扶手
      const arr1 = [];
      const arr2 = [];
      const arr3 = [];
      const arr4 = [];
      const arr5 = [];
      for (let ia in obj1) {
        arr1.push(obj1[ia]);
      }
      for (let ib in obj2) {
        arr2.push(obj2[ib]);
      }
      for (let ic in obj3) {
        arr3.push(obj3[ic]);
      }
      for (let id in obj4) {
        arr4.push(obj4[id]);
      }
      for (let ie in obj5) {
        arr5.push(obj5[ie]);
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
        this.topTabList[j].consumables = arr2[j];
        this.topTabList[j].excretionType = arr3[j];
        this.topTabList[j].walkingStick = arr4[j];
        this.topTabList[j].handrail = arr5[j];
      }
    },
    //点击保存
    handerSubmit() {
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("global.submitInfo"),
        okText: this.$t("global.sure"),
        cancelText: this.$t("global.cancel"),
        onOk: async () => {
          let data = {
            oldManId: this.oldInfo.oldId,
            type: 10,
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
      const excretionTypeList = [];
      const actionAssistList = [];
      const consumablesList = [];
      const walkingStickList = [];
      const handrailList = [];
      for (let sele = 0; sele < this.topTabList.length; sele++) {
        excretionTypeList.push(this.topTabList[sele].excretionType);
        actionAssistList.push(this.topTabList[sele].actionAssist);
        consumablesList.push(this.topTabList[sele].consumables);
        walkingStickList.push(this.topTabList[sele].walkingStick);
        handrailList.push(this.topTabList[sele].handrail);
      }
      this.selectEList = excretionTypeList;
      this.selectAList = actionAssistList;
      this.selectCList = consumablesList;
      this.selectWList = walkingStickList;
      this.selectHList = handrailList;
    },
    //添加
    async handerAdd() {
      this.getTopTabCon();
      try {
        let requestObj = {};
        this.nameList.forEach((item, index) => {
          requestObj[item.rName] = JSON.stringify(this.objType(item.rName));
        });
        requestObj["known"] = "";
        requestObj["id"] = "";
        requestObj["oldManId"] = this.oldInfo.oldId;
        requestObj["operatorId"] = "";
        requestObj["createDate"] = this.createDate;
        requestObj["actionAssist"] = JSON.stringify(
          this.objTypeTwo(this.selectAList)
        );
        requestObj["consumables"] = JSON.stringify(
          this.objTypeTwo(this.selectCList)
        );
        requestObj["excretionType"] = JSON.stringify(
          this.objTypeTwo(this.selectEList)
        );
        requestObj["handrail"] = JSON.stringify(
          this.objTypeTwo(this.selectHList)
        );
        requestObj["walkingStick"] = JSON.stringify(
          this.objTypeTwo(this.selectWList)
        );
        // console.log("请求对象", requestObj);
        const res = await excretionAdd(requestObj);
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

      try {
        let requestObj = {};
        this.nameList.forEach((item, index) => {
          requestObj[item.rName] = JSON.stringify(this.objType(item.rName));
        });
        requestObj["known"] = "";
        requestObj["id"] = parseInt(this.editId);
        requestObj["oldManId"] = this.oldInfo.oldId;
        requestObj["operatorId"] = "";
        requestObj["createDate"] = this.createDate;
        requestObj["actionAssist"] = JSON.stringify(
          this.objTypeTwo(this.selectAList)
        );
        requestObj["consumables"] = JSON.stringify(
          this.objTypeTwo(this.selectCList)
        );
        requestObj["excretionType"] = JSON.stringify(
          this.objTypeTwo(this.selectEList)
        );
        requestObj["handrail"] = JSON.stringify(
          this.objTypeTwo(this.selectHList)
        );
        requestObj["walkingStick"] = JSON.stringify(
          this.objTypeTwo(this.selectWList)
        );
        // console.log("请求对象", requestObj);
        const res = await excretionModify(requestObj);
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
    getdwalkingStick(index) {
      console.log("排泄方法", this.topTabList[index].excretionType);
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
#drain-trip {
  text-align: left;
  .head-bg {
    font-size: 0.14rem;
  }
  .table {
    label {
      margin-right: 0.1rem /* 10/102 */;
      input {
        margin-right: 0.03rem /* 3/102 */;
      }
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    border-color: var(--border-color);
    margin-bottom: 0.29rem /* 30/102 */;
    font-size: 0.14rem /* 14/102 */;
    line-height: 0.29rem /* 30/102 */;
    background: #fff;
    tbody {
      .itemNameTd {
        min-width: 1.5rem;
        white-space: pre-wrap;
      }
      .fuBox {
        position: relative;
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
        z-index: 900;
        .seleText {
          font-size: 0.12rem;
          color: #333;
        }
      }
      .ziBoxTwo {
        bottom: 0;
      }
    }
  } // table end
  .trip-month {
    text-align: center;
    border-radius: 5px;
    thead {
      line-height: 0.39rem;
    }
  }
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
  .bg {
    background: var(--table-bg);
    color: #fff;
  }
  .trip-info {
    display: flex;
    font-size: 0.16rem /* 16/102 */;
    color: #000;
    .info-title {
      margin-right: 0.2rem /* 20/102 */;
    }
  } // .trip-info ned
} //  #drain-trip end
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>