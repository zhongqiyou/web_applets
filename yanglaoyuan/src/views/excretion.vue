<template>
  <div class="sheet excretion">
    <div class="trip-title">{{ $t("excretion.Excretion") }}</div>
    <div style="overflow-x:scroll">
      <table
        class="sheetTable new-table"
        border="1px"
        cellspacing="1"
        cellpadding="0"
        style="border:1px solid #C4E8BF;"
      >
        <tr>
          <th class="position">{{ $t("excretion.userName") }}</th>
          <th>{{ $t("excretion.method") }}</th>
          <th>{{ $t("excretion.kind") }}</th>
          <th v-for="(item1, index1) in timeList" :key="index1">{{ item1 }}</th>
          <th>{{ $t("dailySchedule.Focus") }}</th>
        </tr>
        <tbody v-for="(item, index) in trTable" :key="index">
          <tr>
            <td rowspan="2" class="head-bg position">{{ item.name }}</td>
            <td style="width: 1rem;">
              <table
                class="diaperFF"
                border="1px"
                cellspacing="1"
                cellpadding="0"
              >
                <tr>
                  <td
                    :v-model="item.fangfa1"
                    @click="selectFF(index, 1)"
                    :class="{ active: item.fangfa1 }"
                  >
                    {{ $t("excretion.toilet") }}
                  </td>
                  <td
                    :v-model="item.fangfa2"
                    @click="selectFF(index, 2)"
                    :class="{ active: item.fangfa2 }"
                  >
                    {{ $t("excretion.toiletP") }}
                  </td>
                </tr>
              </table>
            </td>
            <td class="head-bg">{{ $t("excretion.urination") }}</td>
            <td
              style="height: 0.3rem;"
              v-for="(item2, index2) in item.dayTime"
              :key="index2"
            >
              <table
                class="diaper"
                border="1px"
                cellspacing="1"
                cellpadding="0"
              >
                <tr>
                  <td
                    v-for="(item3, index3) in item2.hourList"
                    :key="index3"
                    @click="recordAdd(index, index2, index3, 1)"
                    @dblclick="lookAnnex()"
                    :style="{ background: showcolur(item3.colour) }"
                  >
                    <input
                      disabled
                      v-model="
                        trTable[index].dayTime[index2].hourList[index3].num
                      "
                    />
                  </td>
                </tr>
              </table>
            </td>
            <td style="background:#fff" rowspan="2" @click="openStress(index)">
              {{ showStress(index) }}
            </td>
          </tr>
          <tr style="width: 100%;">
            <td>
              <table
                class="diaperFF"
                style="width: 100%;"
                border="1px"
                cellspacing="1"
                cellpadding="0"
              >
                <tr>
                  <td
                    :v-model="item.fangfa3"
                    @click="selectFF(index, 3)"
                    :class="{ active: item.fangfa3 }"
                  >
                    {{ $t("excretion.urine") }}
                  </td>
                  <td
                    :v-model="item.fangfa4"
                    @click="selectFF(index, 4)"
                    :class="{ active: item.fangfa4 }"
                  >
                    {{ $t("excretion.diaper") }}
                  </td>
                </tr>
              </table>
            </td>
            <td class="head-bg">{{ $t("excretion.Defecation") }}</td>
            <td
              style="height: 0.3rem;"
              v-for="(item2, index2) in item.dayTime2"
              :key="index2"
            >
              <table
                class="diaper"
                border="1px"
                cellspacing="1"
                cellpadding="0"
              >
                <tr>
                  <td
                    v-for="(item3, index3) in item2.hourList"
                    :key="index3"
                    @click="recordAdd(index, index2, index3, 2)"
                    @dblclick="lookAnnex()"
                    :style="{ background: showcolur(item3.colour) }"
                  >
                    <input
                      disabled
                      v-model="
                        trTable[index].dayTime2[index2].hourList[index3].num
                      "
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 遮罩层 -->
    <div
      class="mask"
      v-show="showModal || showModalTwo || aKeyModal || showAnnex"
      @click="shutModal()"
    ></div>
    <!-- 新增排尿记录弹框 -->
    <div class="popupBox" v-if="showModalTwo">
      <div class="header">{{ $t("excretion.select") }}</div>
      <div class="popBody">
        <div class="fiex">
          <div>
            <p style="margin-top: 0.26rem;">
              <span class="popTit">{{ $t("excretion.abnormal") }}:</span>
              <span
                class="abnormal"
                v-bind:class="{ select: addObjTwo.state == 2 }"
                style="padding:0.1rem 0.14rem"
                @click="urinationNum(2)"
              ></span>
            </p>
            <p style="margin-top: 0.26rem;">
              <span class="popTit">{{ $t("excretion.normal") }}:</span>
              <span
                class="abnormal normal"
                v-bind:class="{ select: addObjTwo.state == 1 }"
                style="padding:0.1rem 0.14rem"
                @click="urinationNum(1)"
              ></span>
            </p>
          </div>
          <div class="fiex">
            <p style="margin-top: 0.26rem;">
              <span class="popTit">{{ $t("excretion.volume2") }}:</span>
              <Input
                v-model="addObjTwo.amount"
                size="large"
                style="width: 1rem"
              />CC
            </p>
          </div>
        </div>
        <div class="footer">
          <Button type="primary" @click="handleCancel(1)">{{
            $t("global.cancel")
          }}</Button>
          <Button type="success" @click="handleSure(1)">{{
            $t("global.confirm")
          }}</Button>
        </div>
      </div>
    </div>
    <!-- 新增排便记录弹框 -->
    <div class="popupBox" v-if="showModal">
      <div class="header">{{ $t("excretion.select") }}</div>
      <div class="popBody">
        <p style="margin-top: 0.26rem;">
          <span class="popTit">{{ $t("excretion.abnormal") }}:</span>
          <span
            v-for="(item, index) in annex.typeList"
            class="abnormal"
            v-bind:class="{
              select: index === abnormaIndex && normalIndex == -1
            }"
            :key="index"
            @click="abnormalNum(index)"
            >{{ index + 1 }}</span
          >
        </p>
        <p style="margin-top: 0.26rem;">
          <span class="popTit">{{ $t("excretion.normal") }}:</span>
          <span
            class="abnormal normal"
            v-for="(item, index) in annex.typeList"
            :key="index"
            v-bind:class="{
              select: index === normalIndex && abnormaIndex == -1
            }"
            @click="normalNum(index)"
            >{{ index + 1 }}</span
          >
        </p>
        <p style="margin-top: 0.26rem;">
          <span class="popTit">{{ $t("excretion.volume") }}:</span>
          <RadioGroup
            v-model="addObj.amount"
            size="small"
            @click="fecalVolume(item.value)"
          >
            <Radio
              v-for="(item, index) in annex.measureList"
              :key="index"
              :label="item.value"
              >{{ item.name }}</Radio
            >
          </RadioGroup>
        </p>
        <div class="footer">
          <Button type="primary" @click="handleCancel(2)">{{
            $t("global.cancel")
          }}</Button>
          <Button type="success" @click="handleSure(2)">{{
            $t("global.confirm")
          }}</Button>
        </div>
      </div>
    </div>
    <!-- 填写重点弹框 -->
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
            v-model="trTable[tableIndex].dayTime[hourTime].akey.f"
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
            v-model="trTable[tableIndex].dayTime[hourTime].akey.d"
            type="textarea"
            :autosize="{ minRows: 2 }"
          />
        </div>
        <div class="dtext">
          <div>A</div>
          <Input
            v-model="trTable[tableIndex].dayTime[hourTime].akey.a"
            type="textarea"
            :autosize="{ minRows: 2 }"
          />
        </div>
        <div class="rtext">
          <div>R</div>
          <Input
            v-model="trTable[tableIndex].dayTime[hourTime].akey.r"
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
    <!-- 附件弹框 -->
    <div
      v-show="showAnnex"
      class="annex"
      v-bind:style="{ left: screenLeft, top: screenTop }"
      draggable="true"
    >
      <div class="annexBox">
        <div class="annex_name">
          <div class="annexTopL">{{ $t("excretion.Serial") }}</div>
          <div class="annexTopR">{{ $t("Record.Shape") }}</div>
        </div>
        <div class="annex_cont">
          <div
            class="annex_item"
            v-for="(item, index) in annex.typeList"
            :key="index"
          >
            <p class="num">{{ index + 1 }}</p>
            <img class="ann_img" v-if="index < 6" :src="item.img" />
            <p class="ann_img" v-else>{{ item.name }}</p>
            <p class="depict">{{ item.describe }}</p>
          </div>
        </div>
        <!-- <div class="annex_footer">
          <RadioGroup v-model="addObj.amount" size="small">
            <Radio
              style="margin:0 0.2rem"
              :disabled="true"
              v-for="(item, index) in annex.measureList"
              :key="index"
              :label="item.value"
            >{{item.name}}</Radio>
          </RadioGroup>
          <span
            style="margin:0 10px"
            v-for="(item,index) in annex.measureList"
            :key="index"
          >{{index+1 +'.'}}{{item.value}}</span>
        </div> -->
      </div>
    </div>
    <!-- 提交 -->
    <div class="table-submit">
      <button @click="etid()">
        <i class="iconfont icon-submit"></i>
        {{ $t("global.submit") }}
      </button>
    </div>
  </div>
</template>
<script>
import { getAttachment, listOldManByUnitId } from "../network/kongHX";
import {
  getExcretionRecord,
  excretionRecordAdd,
  excretionRecordModify
} from "../network/kongHX";
import { get } from "../network/http";
import Vue from "vue";
export default {
  name: "",
  data() {
    return {
      annex: {
        typeList: [
          {
            value: 1,
            img: require("../assets/images/excretionImg/1.png"),
            describe: this.$t("excretion.affection1")
          },
          {
            value: 2,
            img: require("../assets/images/excretionImg/2.png"),
            describe: this.$t("excretion.affection2")
          },
          {
            value: 3,
            img: require("../assets/images/excretionImg/3.png"),
            describe: this.$t("excretion.affection3")
          },
          {
            value: 4,
            img: require("../assets/images/excretionImg/4.png"),
            describe: this.$t("excretion.affection4")
          },
          {
            value: 5,
            img: require("../assets/images/excretionImg/5.png"),
            describe: this.$t("excretion.affection5")
          },
          {
            value: 6,
            img: require("../assets/images/excretionImg/6.png"),
            describe: this.$t("excretion.affection6")
          },
          {
            value: 7,
            name: this.$t("excretion.affection7"),
            describe: this.$t("excretion.affection8")
          }
        ],
        measureList: [
          { value: 0, name: "少【0】" },
          { value: 1, name: "C1【1】" },
          { value: 2, name: "C2【2】" },
          { value: 3, name: "C3【3】" }
        ]
      },
      queryTime: "", //表格显示时间
      beginDate: "",
      finishDate: "",
      trTable: [],
      nowDay: "", //今天xxxx-xx-xx
      dayRow: 0, //本月今天日期
      showModal: false,
      showModalTwo: false,
      aKeyModal: false,
      baseUrl: "",
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
      hourTime: 0, //重点小时
      recordTime: "", //排泄记录时间
      tableIndex: 0, //列表下标
      twoFourIndex: 0, //24小时的下标
      hourIndex: 0, //十分钟下标
      dayEditId: "", //修改时主键id
      addObj: {
        type: "", //1排尿2排便
        state: "", //1正常2异常
        num: "",
        amount: ""
      },
      addObjTwo: {
        state: "",
        amount: ""
      },
      abnormaIndex: -1,
      normalIndex: -1,
      showAnnex: false, //展示附件
      screenLeft: "25%", //鼠标点击距离屏幕左边距离
      screenTop: "100px", //鼠标点击距离屏幕上边距离
      seleModel: 0,
      oldManList: [],
      userInfo: {},
      oldpage: 1,
      timeOutEvent: 0,
      time: null,
      dblclickNum: 0
    };
  },
  created() {
    this.baseUrl = localStorage.getItem("baserl");
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log("看看人员", this.userInfo);
    // this.getAnnex();
    this.getOldManList();
  },
  methods: {
    //关闭弹框
    shutModal() {
      this.showAnnex = false;
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
            // console.log("老人列表", this.oldManList);
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
          name: this.oldManList[i].name,
          oldItem: this.oldManList[i],
          fangfa1: false, //方法
          fangfa2: false,
          fangfa3: false,
          fangfa4: false,
          //1排尿+重点
          dayTime: [
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "00:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "01:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "02:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "03:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "04:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "05:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "06:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "07:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "08:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "09:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "10:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "11:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "12:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "13:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "14:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "15:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "16:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "17:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "18:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "19:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "20:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "21:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "22:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            },
            {
              akey: { a: "", f: "", d: "", r: "" },
              time: "23:00",
              hourList: [
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                },
                {
                  colour: "",
                  medium: ""
                }
              ]
            }
          ],
          //2排便
          dayTime2: [
            {
              time: "00:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "01:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "02:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "03:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "04:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "05:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "06:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "07:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "08:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "09:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "10:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "11:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "12:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "13:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "14:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "15:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "16:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "17:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "18:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "19:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "20:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "21:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "22:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            },
            {
              time: "23:00",
              hourList: [
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                },
                {
                  colour: "",
                  medium: "",
                  num: ""
                }
              ]
            }
          ]
        };
        Vue.set(this.trTable, i, a);
      }
      console.log("列表数组", this.trTable);
      this.getList();
    },
    async getList() {
      if (!this.oldManList.length) {
        return;
      }
      try {
        const res = await getExcretionRecord({
          unitId: localStorage.getItem("unitId")
        });
        if (res.code === 0) {
          if (res.data == "") {
            const idArr = [];
            this.add(idArr);
          } else if (res.data.length < this.oldManList.length) {
            const extra = this.diff(res.data, this.oldManList);
            console.log("多出来", extra);
            this.add(extra);
          } else {
            for (var i = 0; i < res.data.length; i++) {
              for (var j = 0; j < this.trTable.length; j++) {
                if (res.data[i].oldManId == this.trTable[j].oldId) {
                  this.trTable[j].id = res.data[i].id;
                  this.trTable[j].oldId = res.data[i].oldManId;
                  // this.trTable[j].name = res.data[i].oldManName;
                  this.trTable[j].fangfa1 = JSON.parse(res.data[i].toolTypeA);
                  this.trTable[j].fangfa2 = JSON.parse(res.data[i].toolTypeB);
                  this.trTable[j].fangfa3 = JSON.parse(res.data[i].toolTypeC);
                  this.trTable[j].fangfa4 = JSON.parse(res.data[i].toolTypeD);
                  this.trTable[j].dayTime = JSON.parse(res.data[i].content);
                  this.trTable[j].dayTime2 = JSON.parse(res.data[i].content2);
                  break;
                }
              }
            }
            console.log("888", this.trTable);
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
    },
    //获取附件
    async getAnnex() {
      try {
        const res = await getAttachment({});
        console.log(res);
        if (res.code === 0) {
          var astr = res.data[0].typeList;
          var bstr = res.data[0].measureList;
          this.annex.typeList = JSON.parse(astr);
          this.annex.measureList = JSON.parse(bstr);
        } else {
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
          var a = {
            content: JSON.stringify(this.trTable[i].dayTime),
            content2: JSON.stringify(this.trTable[i].dayTime2),
            id: this.trTable[i].id,
            oldManId: this.trTable[i].oldId,
            oldManName: this.trTable[i].name,
            toolTypeA: this.trTable[i].fangfa1.toString(),
            toolTypeB: this.trTable[i].fangfa2.toString(),
            toolTypeC: this.trTable[i].fangfa3.toString(),
            toolTypeD: this.trTable[i].fangfa4.toString(),
            createDate: this.nowDay
          };
          arr.push(a);
        }
      } else {
        for (let n = 0; n < this.trTable.length; n++) {
          for (let j = 0; j < idArr.length; j++) {
            if (this.trTable[n].oldId == idArr[j]) {
              var a = {
                content: JSON.stringify(this.trTable[n].dayTime),
                content2: JSON.stringify(this.trTable[n].dayTime2),
                id: this.trTable[n].id,
                oldManId: this.trTable[n].oldId,
                oldManName: this.trTable[n].name,
                toolTypeA: this.trTable[n].fangfa1.toString(),
                toolTypeB: this.trTable[n].fangfa2.toString(),
                toolTypeC: this.trTable[n].fangfa3.toString(),
                toolTypeD: this.trTable[n].fangfa4.toString(),
                createDate: this.nowDay
              };
              arr.push(a);
            }
          }
        }
      }
      // console.log('请求数组',arr);
      try {
        const res = await excretionRecordAdd(arr);
        // console.log(res);
        // this.getOldManList();
        this.getList();
      } catch (err) {
        console.log(err);
      }
    },
    //修改
    async etid() {
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("global.submitInfo"),
        okText: this.$t("global.sure"),
        cancelText: this.$t("global.cancel"),
        onOk: async () => {
          const arr = [];
          for (let i = 0; i < this.trTable.length; i++) {
            var a = {
              content: JSON.stringify(this.trTable[i].dayTime),
              content2: JSON.stringify(this.trTable[i].dayTime2),
              id: this.trTable[i].id,
              oldManId: this.trTable[i].oldId,
              oldManName: this.trTable[i].name,
              toolTypeA: this.trTable[i].fangfa1.toString(),
              toolTypeB: this.trTable[i].fangfa2.toString(),
              toolTypeC: this.trTable[i].fangfa3.toString(),
              toolTypeD: this.trTable[i].fangfa4.toString(),
              createDate: this.nowDay
            };
            arr.push(a);
          }
          // console.log("请求数据", arr);
          try {
            const res = await excretionRecordModify(arr);
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
    //展示颜色正常异常null
    showcolur(value) {
      //1正常2异常
      if (value != "") {
        return value == 2 ? "#ff0000" : "#44ff44";
      } else {
        return "#fff";
      }
    },
    //展示数字
    showNum(value) {
      if (value == 1) {
        return true;
      } else {
        return false;
      }
    },
    //选择异常
    abnormalNum(index) {
      this.addObj.num = index + 1;
      this.addObj.state = 2;
      this.abnormaIndex = index;
      this.normalIndex = -1;
    },
    //选择正常
    normalNum(index) {
      this.addObj.num = index + 1;
      this.addObj.state = 1;
      this.normalIndex = index;
      this.abnormaIndex = -1;
    },
    //选择便量
    fecalVolume(value) {
      this.addObj.amount = value;
    },
    //选择排尿类型
    urinationNum(type) {
      //1正常2异常
      this.addObjTwo.state = type;
    },
    //确定（选择弹框）
    handleSure(type) {
      //1排尿2排便
      if (type === 1) {
        if (this.addObjTwo.state == "") {
          this.$Notice.error({
            title: this.$t("excretion.selectNo")
          });
          return false;
        }
        this.trTable[this.tableIndex].dayTime[this.twoFourIndex].hourList[
          this.hourIndex
        ].colour = this.addObjTwo.state; //正常异常
        this.trTable[this.tableIndex].dayTime[this.twoFourIndex].hourList[
          this.hourIndex
        ].medium = this.addObjTwo.amount; //量
        this.showModalTwo = false;
        this.addObj = {
          state: "",
          amount: ""
        };
      } else {
        if (this.addObj.num == "") {
          this.$Notice.error({
            title: this.$t("excretion.selectNo")
          });
          return false;
        }
        this.showModal = false;
        this.trTable[this.tableIndex].dayTime2[this.twoFourIndex].hourList[
          this.hourIndex
        ].colour = this.addObj.state; //正常异常
        this.trTable[this.tableIndex].dayTime2[this.twoFourIndex].hourList[
          this.hourIndex
        ].medium = this.addObj.amount; //量
        this.trTable[this.tableIndex].dayTime2[this.twoFourIndex].hourList[
          this.hourIndex
        ].num = this.addObj.num; //序号
        this.addObj = {
          state: "",
          num: "",
          amount: ""
        };
        this.abnormaIndex = -1;
        this.normalIndex = -1;
      }
    },
    //取消(选择弹框)
    handleCancel(type) {
      //1排尿2排便
      if (type === 1) {
        this.addObjTwo = {
          state: "",
          amount: ""
        };
        this.showModalTwo = false;
      } else {
        this.addObj = {
          type: "",
          state: "",
          num: "",
          amount: ""
        };
        this.abnormaIndex = -1;
        this.normalIndex = -1;
        this.showModal = false;
      }
    },
    //取消(重点弹框)
    handleStressCancel() {
      this.aKeyModal = false;
      location.reload();
    },
    //确定（重点弹框）
    handleStressSure() {
      this.aKeyModal = false;
    },
    //新增排泄记录
    recordAdd(index, index2, index3, type) {
      this.dblclickNum++;
      let timeoutflag = true;
      if (timeoutflag != null) {
        setTimeout(() => {
          if (this.dblclickNum == 1) {
            //单击事件
            var that = this;
            that.tableIndex = index;
            that.twoFourIndex = index2;
            that.hourIndex = index3;
            //1排尿2排便
            if (type === 1) {
              that.showModalTwo = true;
            } else {
              that.showModal = true;
            }
          }
          if (this.dblclickNum == 2) {
            //双击事件
            this.showAnnex = true;
          }
          this.dblclickNum = 0;
        }, 500);
      }
    },

    //双击展示附件
    lookAnnex() {
      clearTimeout(this.time);
      // alert("双击事件");
      this.showAnnex = true;
    },
    //展示重点
    showStress(index) {
      // console.log("showStress的index", index);
      var stress = [];
      var a = "";
      for (var i = 0; i < 24; i++) {
        // console.log(this.trTable[index].dayTime[i].akey.f);
        if (this.trTable[index].dayTime[i].akey.f != "") {
          stress.push("F");
        }
        if (this.trTable[index].dayTime[i].akey.d != "") {
          stress.push("D");
        }
        if (this.trTable[index].dayTime[i].akey.a != "") {
          stress.push("A");
        }
        if (this.trTable[index].dayTime[i].akey.r != "") {
          stress.push("R");
        }
      }
      a = Array.from(new Set(stress)).toString();
      return a;
    },
    //填写重点
    openStress(index) {
      this.aKeyModal = true;
      this.tableIndex = index;
    },
    //选择方法
    selectFF(index, num) {
      if (num === 1) {
        this.trTable[index].fangfa1 = !this.trTable[index].fangfa1;
      } else if (num === 2) {
        this.trTable[index].fangfa2 = !this.trTable[index].fangfa2;
      } else if (num === 3) {
        this.trTable[index].fangfa3 = !this.trTable[index].fangfa3;
      } else if (num === 4) {
        this.trTable[index].fangfa4 = !this.trTable[index].fangfa4;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.sheetTable,
#annexTab {
  font-size: 0.14rem !important;
  z-index: 5;
}
.sheet {
  padding: 0 0.25rem 0 0.15rem;
}
.sheetTable {
  border: 1px solid #e7e7e7;
  font-size: 0.14rem;
  width: 100%;
  .active {
    background: #f6bd16;
  }
  th {
    text-align: center;
    padding: 0.18rem 0;
    min-width: 0.9rem;
    /* background: #63af1e; */
    background: #92de8b;
    font-size: 0.14rem;
    color: #ffffff !important;
    text-align: center;
  }
  td {
    padding: none;
  }
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
.diaperFF > tr > td {
  min-width: 0.6rem;
  max-width: 0.6rem;
  white-space: pre-wrap;
  padding: 0.05rem 0.03rem;
  background: #fff;
}
/* 附件表 */
.annex {
  width: 5rem;
  height: 4rem;
  background: #fff;
  // border: 1px solid #f5f5f5;
  box-sizing: border-box;
  border-radius: 0.05rem;
  padding: 0.03px;
  /* margin-top: 50px; */
  position: fixed;
  left: 25%;
  z-index: 5;
  .annexBox {
    width: 100%;
    font-size: 0.14rem !important;
    z-index: 666;
  }
  .annex_name {
    height: 0.5rem;
    border-top-left-radius: 0.05rem;
    border-top-right-radius: 0.05rem;
    display: flex;
    align-items: center;
    background: #f6bd16;
    .annexTopL {
      width: 1rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
    }
    .annexTopR {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .annex_cont {
    width: 100%;
    height: 3.5rem;
    overflow-y: auto;
    .annex_item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .num {
        width: 0.83rem;
        height: 100%;
        line-height: 0.6rem;
        box-sizing: border-box;
        border-right: 1px solid #ccc;
      }
      .ann_img {
        width: 1.2rem;
        height: 0.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #ccc;
        background: #c4c4bc;
      }
      .depict {
        width: 2.8rem;
        padding: 0.1rem;
        text-align: left;
      }
      &:last-child {
        border: none;
      }
    }
  }
  .annex_footer {
    width: 100%;
    height: 0.5rem;
    display: flex;
    align-items: center;
    background: #5ad9a6;
    position: absolute;
    bottom: 0;
    border-bottom-left-radius: 0.05rem;
    border-bottom-right-radius: 0.05rem;
  }
}
#annexTab {
  width: 100%;
  border: 0.1px solid #f5f5f5;
  background: #fff;
  border-collapse: separate;
  border-radius: 0.05rem;
  overflow: hidden;
  td {
    padding: 0.03px;
    height: 0.3rem;
    /* line-height: 0.3rem; */
    border: 1px solid #ccc;
    /* text-align: left; */
  }
  thead {
    background: #f6bd16;
  }
  .annImgTd {
    width: 1rem;
    height: 0.3rem !important;
    /* text-align: center; */
    /* line-height: 0.3rem; */
    .annImg {
      width: 100%;
      /* height: 0.3rem; */
      height: 100px;
      object-fit: cover;
      line-height: 0.3rem;
      border: none;
      padding: none;
      margin-top: 0.06rem;
    }
  }
  tbody tr:last-child {
    background: #5ad9a6;
  }
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
/* 去除上传文件按钮样式 */
.ivu-upload-drag {
  border: none;
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
/* 对话框(排便) */
.popupBox {
  width: 50%;
  position: fixed;
  top: 20%;
  left: 25%;
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
  .fiex {
    display: flex;
    align-items: center;
  }
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