<template>
  <div class="drain-extend">
    <h1 class="trip-title">{{ $t("meal.meal1") }}</h1>
    <div class="extend-table">
      <table
        class="table new-table"
        border="1"
        style="border:1px solid #C4E8BF;overflow-x: scroll;"
      >
        <thead>
          <tr>
            <td rowspan="2" class="position head-bg" style="min-width: 1.26rem">
              {{ $t("meal.meal3") }}
            </td>
            <td rowspan="2">{{ $t("meal.meal4") }}</td>
            <td rowspan="2">{{ $t("meal.meal5") }}</td>
            <td rowspan="2">{{ $t("meal.meal6") }}</td>
            <td rowspan="2">{{ $t("meal.meal7") }}</td>
            <td colspan="5">{{ $t("meal.meal8") }}</td>
            <td colspan="5">{{ $t("meal.meal9") }}</td>
            <td colspan="5">{{ $t("meal.meal10") }}</td>
            <td colspan="2">{{ $t("meal.meal15") }}</td>
            <td colspan="2">{{ $t("meal.meal19") }}</td>
            <td rowspan="2">
              {{ $t("meal.meal22") }}
              <br />(ml)
            </td>
            <td colspan="2">{{ $t("meal.meal23") }}</td>
            <td rowspan="2">
              {{ $t("meal.meal22") }}
              <br />(ml)
            </td>
            <td rowspan="2">{{ $t("meal.meal27") }}</td>
            <td rowspan="2">
              {{ $t("meal.meal22") }}
              <br />(ml)
            </td>
            <td colspan="2">{{ $t("meal.meal29") }}</td>
            <td rowspan="2">
              {{ $t("meal.meal22") }}
              <br />(ml)
            </td>
            <td rowspan="2">{{ $t("meal.meal33") }}</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>{{ $t("meal.meal16") }}</td>
            <td>{{ $t("meal.meal17") }}</td>
            <td>{{ $t("meal.meal24") }}</td>
            <td>{{ $t("meal.meal25") }}</td>
            <td>{{ $t("meal.meal24") }}</td>
            <td>{{ $t("meal.meal25") }}</td>
            <td>{{ $t("meal.meal24") }}</td>
            <td>{{ $t("meal.meal25") }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in trTable" :key="index">
            <td class="meal-td position">{{ item.oldName }}</td>
            <td class="meal-td">
              <input v-model="item.oxygenSaturation" />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.bloodSugar"
              />
            </td>
            <td class="meal-td" style="min-width: 1.2rem;font-size: 0.14rem">
              <Input
                class="inputwidth"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.dietaryForm"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.toro"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.breathingMorning"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.breathingMidday"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.breathingEvening"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.breathing4"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.breathing5"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.pulseMorning"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.pulseMidday"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.pulseEvening"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.pulse4"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.pulse5"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.hotMorning"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.hotMidday"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.hotEvening"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.hot4"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.hot5"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.bloodShrink"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.bloodDiastolic"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.stapleFoodMorning"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.nonStapleFoodMorning"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.waterMorning"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.stapleFoodMidday"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.nonStapleFoodMidday"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.waterMidday"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.snack"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.snackWater"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.stapleFoodEvening"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.nonStapleFoodEvening"
              />
            </td>
            <td class="meal-td">
              <Input
                class="inputwidth textCenter"
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="item.waterEvening"
              />
            </td>
            <td class="meal-td" @click="openStress(index)">
              {{ showStress(index) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-submit">
      <button @click="etid">
        <i class="iconfont icon-baocun"></i>
        {{ $t("global.submit") }}
      </button>
    </div>

    <!-- 弹窗 -->
    <div class="mask" v-if="aKeyModal"></div>
    <div class="aKeyBox" v-if="aKeyModal">
      <div class="aKeyH">
        <div>{{ $t("dailySchedule.Focus") }}</div>
        <div class="timeSel">
          <p>{{ nowDay }}</p>
          <Select v-model="hourTime" style="width:100px" size="small">
            <Option
              v-for="(item, index) in timeList"
              :value="index"
              :key="index"
              >{{ item }}</Option
            >
          </Select>
        </div>
      </div>
      <div class="fdar">
        <div class="ftext">
          <div>F</div>
          <Input
            v-model="trTable[tableIndex].point[hourTime].akey.f"
            type="textarea"
            :autosize="{ minRows: 2 }"
          />
          <div
            class="yellow"
            @click="goTo('/Record', trTable[tableIndex].oldItem)"
          >
            {{ $t("Record.title") }}
          </div>
        </div>
        <div class="dtext">
          <div>D</div>
          <Input
            v-model="trTable[tableIndex].point[hourTime].akey.d"
            type="textarea"
            :autosize="{ minRows: 2 }"
          />
        </div>
        <div class="dtext">
          <div>A</div>
          <Input
            v-model="trTable[tableIndex].point[hourTime].akey.a"
            type="textarea"
            :autosize="{ minRows: 2 }"
          />
        </div>
        <div class="rtext">
          <div>R</div>
          <Input
            v-model="trTable[tableIndex].point[hourTime].akey.r"
            type="textarea"
            :autosize="{ minRows: 2 }"
          />
        </div>
      </div>
      <div class="footer">
        <Button type="primary" @click="handleStressCancel()">{{
          $t("global.cancel")
        }}</Button>
        <Button type="success" @click="handleStressSure()">{{
          $t("global.confirm")
        }}</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { listOldManByUnitId, getByUnitId, mealSave } from "../network/kongHX";
import Vue from "vue";
export default {
  data() {
    return {
      // 弹窗
      aKeyModal: false,
      nowDay: "", //今天yyyy-MM-dd
      dayRow: 0, //本月今天日期
      hourTime: 0, //重点小时
      timeList: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00"
      ],
      oldManList: [],
      trTable: [],
      userInfo: {},
      tableIndex: 0,
      oldpage:1
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getOldManList();
  },
  methods: {
    //展示重点
    showStress(index) {
      // console.log("showStress的index", index);
      var stress = [];
      var a = "";
      for (var i = 0; i < 24; i++) {
        // console.log(this.trTable[index].dayTime[i].akey.f);
        if (this.trTable[index].point[i].akey.f != "") {
          stress.push("F");
        }
        if (this.trTable[index].point[i].akey.d != "") {
          stress.push("D");
        }
        if (this.trTable[index].point[i].akey.a != "") {
          stress.push("A");
        }
        if (this.trTable[index].point[i].akey.r != "") {
          stress.push("R");
        }
      }
      a = Array.from(new Set(stress)).toString();
      return a;
    },
    //确定（重点弹框）
    handleStressSure() {
      this.aKeyModal = false;
    },
    //取消(重点弹框)
    handleStressCancel() {
      this.aKeyModal = false;
      location.reload();
    },
    //填写重点
    openStress(index) {
      this.aKeyModal = true;
      this.tableIndex = index;
    },
    //获取单位老人列表
    async getOldManList() {
      try {
        const res = await listOldManByUnitId({
          unitId: localStorage.getItem("unitId"),
          nursingId: this.userInfo.nursingId,
          page: this.oldpage,
          limit: 10
        });
        if (res.code === 0) {
          this.oldManList = this.oldManList.concat(res.data);
          if (this.oldManList.length < res.count) {
            this.oldpage = this.oldpage + 1;
            this.getOldManList();
          } else {
            this.getTime(res.count);
          }
        } else {
          this.$Notice.error({
            title: this.$t(global.loadFail),
            desc: res.data
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    getTime(length) {
      var date = new Date();
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      //获取当月天数
      var d = new Date(year, mon, 0).getDate();
      var day = date.getDate(); //获取今天日期
      this.dayRow = day;
      if (mon < 10) {
        mon = "0" + mon;
      }
      if (day < 10) {
        day = "0" + day;
      }
      this.nowDay = year + "-" + mon + "-" + day;
      //列表数组
      for (let i = 0; i < length; i++) {
        let a = {
          id: "",
          oldId: this.oldManList[i].oldId,
          oldItem: this.oldManList[i],
          unitId: localStorage.getItem("unitId"),
          oldName: this.oldManList[i].name,
          point: [
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "00:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "01:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "02:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "03:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "04:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "05:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "06:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "07:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "08:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "09:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "10:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "11:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "12:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "13:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "14:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "15:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "16:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "17:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "18:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "19:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "20:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "21:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "22:00"
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "23:00"
            }
          ],
          oxygenSaturation: "",
          bloodSugar: "",
          dietaryForm: "",
          toro: "",
          breathingMorning: "",
          breathingMidday: "",
          breathingEvening: "",
          breathing4: "",
          breathing5: "",
          pulseMorning: "",
          pulseMidday: "",
          pulseEvening: "",
          pulse4: "",
          pulse5: "",
          hotMorning: "",
          hotMidday: "",
          hotEvening: "",
          hot4: "",
          hot5: "",
          bloodShrink: "",
          bloodDiastolic: "",
          stapleFoodMorning: "",
          nonStapleFoodMorning: "",
          waterMorning: "",
          stapleFoodMidday: "",
          nonStapleFoodMidday: "",
          waterMidday: "",
          snack: "",
          snackWater: "",
          stapleFoodEvening: "",
          nonStapleFoodEvening: "",
          waterEvening: ""
        };
        Vue.set(this.trTable, i, a);
      }
      console.log("列表数组", this.trTable);
      this.getList();
    },
    //获取食事-括入力表
    async getList() {
      if (!this.oldManList.length) {
        return;
      }
      try {
        const res = await getByUnitId({
          unitId: localStorage.getItem("unitId"),
          time: this.nowDay
        });
        if (res.code === 0) {
          if (res.data == "") {
            const idArr = [];
            this.add(idArr);
          } else if (res.data.length < this.oldManList.length) {
            const extra = this.diff(res.data, this.oldManList);
            this.add(extra);
          } else {
            for (var i = 0; i < res.data.length; i++) {
              for (var j = 0; j < this.trTable.length; j++) {
                if (res.data[i].oldId == this.trTable[j].oldId) {
                  this.trTable[j].id = res.data[i].id;
                  this.trTable[j].oldId = res.data[i].oldId;
                  this.trTable[j].oxygenSaturation =
                    res.data[i].oxygenSaturation;
                  this.trTable[j].bloodSugar = res.data[i].bloodSugar;
                  this.trTable[j].dietaryForm = res.data[i].dietaryForm;
                  this.trTable[j].toro = res.data[i].toro;
                  this.trTable[j].breathingMorning =
                    res.data[i].breathingMorning;
                  this.trTable[j].breathingMidday = res.data[i].breathingMidday;
                  this.trTable[j].breathingEvening =
                    res.data[i].breathingEvening;
                  this.trTable[j].breathing4 = res.data[i].breathing4;
                  this.trTable[j].breathing5 = res.data[i].breathing5;
                  this.trTable[j].pulseMorning = res.data[i].pulseMorning;
                  this.trTable[j].pulseMidday = res.data[i].pulseMidday;
                  this.trTable[j].pulseEvening = res.data[i].pulseEvening;
                  this.trTable[j].pulse4 = res.data[i].pulse4;
                  this.trTable[j].pulse5 = res.data[i].pulse5;
                  this.trTable[j].hotMorning = res.data[i].hotMorning;
                  this.trTable[j].hotMidday = res.data[i].hotMidday;
                  this.trTable[j].hotEvening = res.data[i].hotEvening;
                  this.trTable[j].hot4 = res.data[i].hot4;
                  this.trTable[j].hot5 = res.data[i].hot5;
                  this.trTable[j].bloodShrink = res.data[i].bloodShrink;
                  this.trTable[j].bloodDiastolic = res.data[i].bloodDiastolic;
                  this.trTable[j].stapleFoodMorning =
                    res.data[i].stapleFoodMorning;
                  this.trTable[j].nonStapleFoodMorning =
                    res.data[i].nonStapleFoodMorning;
                  this.trTable[j].waterMorning = res.data[i].waterMorning;
                  this.trTable[j].stapleFoodMidday =
                    res.data[i].stapleFoodMidday;
                  this.trTable[j].nonStapleFoodMidday =
                    res.data[i].nonStapleFoodMidday;
                  this.trTable[j].waterMidday = res.data[i].waterMidday;
                  this.trTable[j].snack = res.data[i].snack;
                  this.trTable[j].snackWater = res.data[i].snackWater;
                  this.trTable[j].stapleFoodEvening =
                    res.data[i].stapleFoodEvening;
                  this.trTable[j].nonStapleFoodEvening =
                    res.data[i].nonStapleFoodEvening;
                  this.trTable[j].waterEvening = res.data[i].waterEvening;
                  this.trTable[j].point = JSON.parse(res.data[i].point);
                  break;
                }
              }
            }
            console.log("123", this.trTable);
          }
        } else {
          this.$Notice.error({
            title: this.$t(global.loadFail),
            desc: res.data
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    //新增
    async add(idArr) {
      const arr = [];
      if (idArr == "") {
        for (let i = 0; i < this.trTable.length; i++) {
          const water1 = this.trTable[i].waterMorning;
          const water2 = this.trTable[i].waterMidday;
          const water3 = this.trTable[i].waterEvening;
          const water4 = this.trTable[i].snackWater;
          if (this.trTable[i].waterMorning) {
            water1 = parseInt(this.trTable[i].waterMorning);
          }
          if (this.trTable[i].waterMidday) {
            water2 = parseInt(this.trTable[i].waterMidday);
          }
          if (this.trTable[i].waterEvening) {
            water3 = parseInt(this.trTable[i].waterEvening);
          }
          if (this.trTable[i].snackWater) {
            water4 = parseInt(this.trTable[i].snackWater);
          }
          var a = {
            id: this.trTable[i].id,
            oldId: this.trTable[i].oldId,
            unitId: parseInt(localStorage.getItem("unitId")),
            recordId: 0,
            oldName: this.trTable[i].oldName,
            recordTime: this.nowDay,
            point: JSON.stringify(this.trTable[i].point),
            oxygenSaturation: this.trTable[i].oxygenSaturation,
            bloodSugar: this.trTable[i].bloodSugar,
            dietaryForm: this.trTable[i].dietaryForm,
            toro: this.trTable[i].toro,
            breathingMorning: this.trTable[i].breathingMorning,
            breathingMidday: this.trTable[i].breathingMidday,
            breathingEvening: this.trTable[i].breathingEvening,
            breathing4: this.trTable[i].breathing4,
            breathing5: this.trTable[i].breathing5,
            pulseMorning: this.trTable[i].pulseMorning,
            pulseMidday: this.trTable[i].pulseMidday,
            pulseEvening: this.trTable[i].pulseEvening,
            pulse4: this.trTable[i].pulse4,
            pulse5: this.trTable[i].pulse5,
            hotMorning: this.trTable[i].hotMorning,
            hotMidday: this.trTable[i].hotMidday,
            hotEvening: this.trTable[i].hotEvening,
            hot4: this.trTable[i].hot4,
            hot5: this.trTable[i].hot5,
            bloodShrink: this.trTable[i].bloodShrink,
            bloodDiastolic: this.trTable[i].bloodDiastolic,
            stapleFoodMorning: this.trTable[i].stapleFoodMorning,
            nonStapleFoodMorning: this.trTable[i].nonStapleFoodMorning,
            waterMorning: water1,
            stapleFoodMidday: this.trTable[i].stapleFoodMidday,
            nonStapleFoodMidday: this.trTable[i].nonStapleFoodMidday,
            waterMidday: water2,
            snack: this.trTable[i].snack,
            waterEvening: water3,
            snackWater: water4,
            stapleFoodEvening: this.trTable[i].stapleFoodEvening,
            nonStapleFoodEvening: this.trTable[i].nonStapleFoodEvening
          };
          arr.push(a);
        }
      } else {
        for (let n = 0; n < this.trTable.length; n++) {
          for (let j = 0; n < idArr.length; j++) {
            const water1 = this.trTable[n].waterMorning;
            const water2 = this.trTable[n].waterMidday;
            const water3 = this.trTable[n].waterEvening;
            const water4 = this.trTable[n].snackWater;
            if (this.trTable[n].waterMorning) {
              water1 = parseInt(this.trTable[n].waterMorning);
            }
            if (this.trTable[n].waterMidday) {
              water2 = parseInt(this.trTable[n].waterMidday);
            }
            if (this.trTable[n].waterEvening) {
              water3 = parseInt(this.trTable[n].waterEvening);
            }
            if (this.trTable[n].snackWater) {
              water4 = parseInt(this.trTable[n].snackWater);
            }
            if (this.trTable[n].oldManId == idArr[j]) {
              var a = {
                id: this.trTable[n].id,
                oldId: this.trTable[n].oldId,
                unitId: localStorage.getItem("unitId"),
                oldName: this.trTable[n].name,
                point: JSON.stringify(this.pointArr),
                oxygenSaturation: this.trTable[n].oxygenSaturation,
                bloodSugar: this.trTable[n].bloodSugar,
                dietaryForm: this.trTable[n].dietaryForm,
                toro: this.trTable[n].toro,
                breathingMorning: this.trTable[n].breathingMorning,
                breathingMidday: this.trTable[n].breathingMidday,
                breathingEvening: this.trTable[n].breathingEvening,
                breathing4: this.trTable[n].breathing4,
                breathing5: this.trTable[n].breathing5,
                pulseMorning: this.trTable[n].pulseMorning,
                pulseMidday: this.trTable[n].pulseMidday,
                pulseEvening: this.trTable[n].pulseEvening,
                pulse4: this.trTable[n].pulse4,
                pulse5: this.trTable[n].pulse5,
                hotMorning: this.trTable[n].hotMorning,
                hotMidday: this.trTable[n].hotMidday,
                hotEvening: this.trTable[n].hotEvening,
                hot4: this.trTable[n].hot4,
                hot5: this.trTable[n].hot5,
                bloodShrink: this.trTable[n].bloodShrink,
                bloodDiastolic: this.trTable[n].bloodDiastolic,
                stapleFoodMorning: this.trTable[n].stapleFoodMorning,
                nonStapleFoodMorning: this.trTable[n].nonStapleFoodMorning,
                waterMorning: parseInt(this.trTable[n].waterMorning),
                stapleFoodMidday: this.trTable[n].stapleFoodMidday,
                nonStapleFoodMidday: this.trTable[n].nonStapleFoodMidday,
                waterMidday: parseInt(this.trTable[n].waterMidday),
                snack: this.trTable[n].snack,
                snackWater: parseInt(this.trTable[n].snackWater),
                stapleFoodEvening: this.trTable[n].stapleFoodEvening,
                nonStapleFoodEvening: this.trTable[n].nonStapleFoodEvening,
                waterEvening: parseInt(this.trTable[n].waterEvening)
              };
              arr.push(a);
            }
          }
        }
      }
      try {
        const res = await mealSave(arr);
        // console.log(res);
        // this.getOldManList();
        this.getList();
      } catch (err) {
        console.log(err);
      }
    },
    //修改
    etid() {
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("global.submitInfo"),
        okText: this.$t("global.sure"),
        cancelText: this.$t("global.cancel"),
        onOk: async () => {
          const arr = [];
          for (let i = 0; i < this.trTable.length; i++) {
            const water1 = this.trTable[i].waterMorning;
            const water2 = this.trTable[i].waterMidday;
            const water3 = this.trTable[i].waterEvening;
            const water4 = this.trTable[i].snackWater;
            if (this.trTable[i].waterMorning) {
              water1 = parseInt(this.trTable[i].waterMorning);
            }
            if (this.trTable[i].waterMidday) {
              water2 = parseInt(this.trTable[i].waterMidday);
            }
            if (this.trTable[i].waterEvening) {
              water3 = parseInt(this.trTable[i].waterEvening);
            }
            if (this.trTable[i].snackWater) {
              water4 = parseInt(this.trTable[i].snackWater);
            }
            var a = {
              id: this.trTable[i].id,
              oldId: this.trTable[i].oldId,
              unitId: parseInt(localStorage.getItem("unitId")),
              recordId: 0,
              oldName: this.trTable[i].oldName,
              recordTime: this.nowDay,
              point: JSON.stringify(this.trTable[i].point),
              oxygenSaturation: this.trTable[i].oxygenSaturation,
              bloodSugar: this.trTable[i].bloodSugar,
              dietaryForm: this.trTable[i].dietaryForm,
              toro: this.trTable[i].toro,
              breathingMorning: this.trTable[i].breathingMorning,
              breathingMidday: this.trTable[i].breathingMidday,
              breathingEvening: this.trTable[i].breathingEvening,
              breathing4: this.trTable[i].breathing4,
              breathing5: this.trTable[i].breathing5,
              pulseMorning: this.trTable[i].pulseMorning,
              pulseMidday: this.trTable[i].pulseMidday,
              pulseEvening: this.trTable[i].pulseEvening,
              pulse4: this.trTable[i].pulse4,
              pulse5: this.trTable[i].pulse5,
              hotMorning: this.trTable[i].hotMorning,
              hotMidday: this.trTable[i].hotMidday,
              hotEvening: this.trTable[i].hotEvening,
              hot4: this.trTable[i].hot4,
              hot5: this.trTable[i].hot5,
              bloodShrink: this.trTable[i].bloodShrink,
              bloodDiastolic: this.trTable[i].bloodDiastolic,
              stapleFoodMorning: this.trTable[i].stapleFoodMorning,
              nonStapleFoodMorning: this.trTable[i].nonStapleFoodMorning,
              waterMorning: water1,
              stapleFoodMidday: this.trTable[i].stapleFoodMidday,
              nonStapleFoodMidday: this.trTable[i].nonStapleFoodMidday,
              waterMidday: water2,
              snack: this.trTable[i].snack,
              waterEvening: water3,
              snackWater: water4,
              stapleFoodEvening: this.trTable[i].stapleFoodEvening,
              nonStapleFoodEvening: this.trTable[i].nonStapleFoodEvening
            };
            arr.push(a);
          }
          try {
            const res = await mealSave(arr);
            console.log(res);
            if (res.code === 0) {
              this.$Notice.success({
                title: this.$t("global.operationSuccess")
              });
              this.getList();
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
        }
      });
    },
    // 数组去重
    diff(arr1, arr2) {
      var a = [];
      var b = [];
      for (let j = 0; j < arr1.length; j++) {
        a.push(arr1[j].oldManId);
      }
      for (let i = 0; i < arr2.length; i++) {
        b.push(arr2[i].oldId);
      }
      let Difference = b.filter(item => !a.includes(item));
      return Difference;
    }
  }
};
</script>

<style lang="less">
.drain-extend {
  .extend-table {
    overflow-x: scroll;
  }
  .table {
    font-size: 0.14rem;
    white-space: nowrap;
    border-color: var(--border-color);
    line-height: 0.29rem /* 30/102 */;
    thead,
    tbody td:first-child {
      background: var(--table-bg);
      color: #fff;
    }
    .meal-td {
      min-width: 0.5rem;
      .inputwidth {
        min-width: 0.7rem;
      }
      .textCenter textarea {
        text-align: center;
      }
    }
  }
  textarea.ivu-input {
    color: black;
    font-size: 0.14rem;
  }
}
</style>

<style lang="less" scoped>
.sheetTable,
.sheet {
  padding: 0 0.25rem 0 0.15rem;
}
.sheetTable {
  border: 1px solid #e7e7e7;
  font-size: 0.14rem;
  width: 100%;
}
.sheetTable th {
  text-align: center;
  padding: 0.18rem 0;
  min-width: 0.9rem;
  /* background: #63af1e; */
  background: #92de8b;
  font-size: 0.14rem;
  color: #ffffff !important;
  text-align: center;
}
.sheetTable td {
  padding: none;
}
.sheetTitle {
  text-align: left;
  font-size: 0.18rem /* 18/102 */;
  line-height: 0.55rem /* 56/102 */;
  padding: 0 0.26rem /* 27/102 */;
  background: linear-gradient(90deg, #63af1e, #63af1e, #fff);
  color: #fff;
  margin: 0.25rem /* 25/102 */ 0;
}
.diaper {
  width: 100%;
  height: 100%;
  border: 1px solid #e7e7e7;
}
/* .diaper > tr > td {
  padding: 0.18rem 0;
} */
.timeTab {
  height: 0.5rem;
  font-size: 12px !important;
}
td textarea {
  width: 80% !important;
  height: 100% /* 80/102 */;
  margin-top: 10px;
  outline: none;
  resize: none;
  border: none;
}
td input {
  width: 100%;
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
/* 遮罩层 */
.mask {
  width: 100vw;
  height: 100vh;
  background: #000;
  opacity: 0.4;
  z-index: 4;
  position: fixed;
  top: 0;
  left: 0;
}
/* 对话框 */
.popupBox {
  width: 40%;
  position: fixed;
  top: 20%;
  left: 30%;
  /* margin: auto; */
  background: #70ad47;
  z-index: 5;
  text-align: left;
  border-radius: 0.05rem;
  padding: 0.04rem;
  font-size: 0.1rem;
}
.header {
  height: 0.3rem;
  color: #fff;
  line-height: 0.3rem;
  margin-left: 0.05rem;
}
.popBody {
  background: #fff;
  border-radius: 0.05rem;
  padding: 0.08rem;
}
.footer {
  text-align: right;
  margin-top: 0.05rem;
}
.footer button {
  margin-left: 0.05rem;
}
.abnormal {
  background: #ff0000;
  padding: 0.1rem 0.1rem;
  color: #fff;
  border: 2px solid #646464;
  margin-left: 0.1rem;
  font-weight: bold;
}
.abnormal.select {
  border: 4px solid black;
}
.abnormal.normal {
  background: #44ff44;
}
.popTit {
  width: 1rem;
  display: inline-block;
  text-align: right;
  margin-right: 10px;
}
/* 对话框（重点） */
.aKeyBox {
  width: 36%;
  position: fixed;
  top: 1rem;
  left: 34%;
  margin: auto;
  background: #fff;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.16);
  z-index: 5;
  text-align: left;
  /* padding: 0.1rem 0.08rem; */
  padding: 37px 22px;
  font-size: 0.1rem;
}
.aKeyH {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.timeSel {
  display: flex;
  align-items: center;
}
.timeSel p {
  margin-right: 0.05rem;
}
.fdar {
  border: 1px solid#CCC;
  margin-top: 0.1rem;
}
.ftext,
.dtext {
  padding: 6px 4px;
  border-bottom: 1px solid #ccc;
}
.rtext {
  padding: 6px 4px;
}
.letter {
  position: relative;
  top: -0.2rem;
}
.fdar textarea {
  width: 80%;
  height: 100%;
  margin: 0 10px;
  outline: none;
  resize: none;
  border: none;
}
.ftext {
  position: relative;
}
.yellow {
  width: 54px;
  height: 22px;
  background: #f6bd16;
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  float: right;
  position: absolute;
  right: 4px;
  bottom: 6px;
}
.textLeft {
  text-align: left;
}

.excretion .head-bg {
  font-size: 0.14rem;
}
</style>
