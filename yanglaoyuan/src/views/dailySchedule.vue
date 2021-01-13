<template>
  <div class="sheet">
    <div class="trip-title">{{ $t("dailySchedule.title") }}</div>
    <!--<div class="screen-l">
      <Select v-model="seleModel" style="width:1.26rem" size="large" @on-change="handleSeleUnit">
          <Option v-for="item in seleData" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>-->
    <div style="overflow-x:scroll">
      <table
        class="sheetTable new-table"
        border="1px"
        cellspacing="1"
        cellpadding="0"
        v-for="(item, index) in oldList"
        :key="index"
      >
        <tbody v-if="item.list.length">
          <tr>
            <th class="first position">
              <span class="users">{{ $t("dailySchedule.username") }}</span>
              <span class="users" style="text-align: right">{{
                $t("dailySchedule.time")
              }}</span>
            </th>
            <th v-for="(item, index) in item.titleArr" :key="index">
              {{ item }}
            </th>
          </tr>
          <tr>
            <td class="head-bg position">
              <tr
                style="border:0;font-weight:500; width: 3.5rem; text-align: left;font-size: 0.2rem;letter-spacing: 0.05rem; color: #000;"
              >
                {{
                  item.oldManName
                }}
              </tr>
              <!--<tr class="small-button" >
              <span v-for="(itemTitle,index) in smallList" :key="index" @click="handleIsSmall(itemTitle,index,item.oldManName,item.oldManId)">{{itemTitle}}</span>
            </tr>
            ['介','看','療','医','栄','谈','药'] 
            <div class="keynote">
              <div class="mask" v-show="isSmall" @click="isSmall = false"></div>
              <div class="child" id="child" v-show="isSmall">
                <div class="keynote-time">
                  <div style="font-size: .18rem;">{{smallTitle}}</div>
                  <div>
                    <Select v-model="pointDate" style="width:1rem" @on-change="handleChangeDate('small')">
                        <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
                </div>
                <div style="border: 1px solid #ccc; line-height: .45rem;"><input type="text" style="width: 100%; font-size: .15rem;" v-model="smallContent" /></div>
                <div class="keynote-btn">
                  <button class="case-btn" @click="handleSmallSubmit">{{$t("global.sure")}}</button>
                </div>
              </div>
              </div>-->
              <tr style="border:0;white-space: nowrap;" class="routing">
                <span
                  class="btncolor"
                  style="background:#6ec8eb"
                  @click="goTo('/FacilitiesPlan2?oldId=' + item.oldManId)"
                  >{{ $t("dailySchedule.plan") }}</span
                >
                <span
                  class="btncolor"
                  style="background:#5ad9a6"
                  @click="setCase(item.oldManId, item.oldManName)"
                  >{{ $t("dailySchedule.Case") }}</span
                >
                <span
                  class="btncolor"
                  style="background:#5b90fa"
                  @click="setMaskShow(item.oldManId, item.oldManName)"
                  >{{ $t("dailySchedule.Focus") }}</span
                >
                <span
                  class="btncolor"
                  style="background:#f6bd16"
                  @click="setObtain(item.oldManId, item.oldManName)"
                  >{{ $t("dailySchedule.Obtain") }}</span
                >
              </tr>
            </td>

            <template v-for="(itemOld, oldIndex) in item.list">
              <td
                v-for="(itemCon, Cindex) in itemOld.content1"
                :key="Cindex + '' + oldIndex"
                style="background: #fff; vertical-align: top;"
              >
                <tr
                  v-if="itemCon.length > 0"
                  style="border: 0;border-bottom: 1px solid #C4E8BF"
                >
                  {{
                    itemCon
                  }}
                </tr>
                <tr v-if="itemCon.length > 0" style="border: 0;">
                  <p
                    @click="handleClickContent(index, oldIndex, Cindex)"
                    style="height: .4rem;border-bottom: 1px solid #C4E8BF"
                  >
                    {{ itemOld.content2[Cindex] }}
                  </p>
                </tr>
                <tr
                  v-if="itemCon.length > 0"
                  style="border: 0;"
                  :class="'job_' + itemOld.jsonStr[Cindex]"
                >
                  <Input
                    type="textarea"
                    :disabled="
                      itemOld.jsonStr[Cindex] != userInfo.level &&
                        itemOld.jsonStr[Cindex] != ''
                    "
                    style="background: transparent"
                    @on-blur="handleSeleJob(index, oldIndex, Cindex)"
                    autosize
                    v-model="itemOld.content3[Cindex]"
                  />
                </tr>
              </td>
            </template>
          </tr>
        </tbody>
      </table>

      <!-- 重点表 -->
      <div class="keynote">
        <div class="mask" v-show="maskShow" @click="maskShow = false"></div>
        <div class="child" id="child" v-show="maskShow">
          <div class="keynote-time">
            <div>{{ $t("dailySchedule.Focus") }}</div>
            <div>
              <Select
                v-model="pointDate"
                @on-change="handleChangeDate('point')"
                style="width:1rem"
              >
                <Option
                  v-for="item in dayList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
          </div>
          <table class="keynote-table">
            <tr>
              <td>
                <div>
                  F
                  <Input
                    type="textarea"
                    autosize
                    v-model="point.f"
                    class="new-width-input"
                    style="width: 100%;"
                  />
                </div>
                <div>
                  <router-link
                    :to="'/Record?oldId=' + handleId"
                    class="after"
                    >{{ $t("Record.title") }}</router-link
                  >
                </div>
              </td>
            </tr>
            <tr>
              <td>
                D
                <Input
                  type="textarea"
                  autosize
                  v-model="point.d"
                  class="new-width-input"
                  style="width: 100%;"
                />
              </td>
            </tr>
            <tr>
              <td>
                A
                <Input
                  type="textarea"
                  autosize
                  v-model="point.a"
                  class="new-width-input"
                  style="width: 100%;"
                />
              </td>
            </tr>
            <!--<tr>
                    <td>
                      <input type="text" v-model="point.r" placeholder="R" />
                    </td>
            </tr>-->
          </table>

          <div class="keynote-btn">
            <button class="case-btn" @click="handlePointSubmit">
              {{ $t("global.sure") }}
            </button>
          </div>
        </div>
      </div>
      <!-- 病历表 -->
      <div class="keynote">
        <div
          class="mask"
          v-show="setCaseShow"
          @click="setCaseShow = false"
        ></div>
        <div class="child" id="child" v-show="setCaseShow">
          <div class="keynote-time">
            <div>{{ $t("dailySchedule.record") }}</div>
            <div>
              <Select
                v-model="pointDate"
                style="width:1rem"
                @on-change="handleChangeDate('case')"
              >
                <Option
                  v-for="item in dayList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
          </div>
          <table class="keynote-table">
            <tr>
              <td>
                F
                <Input
                  type="textarea"
                  autosize
                  v-model="records.f"
                  class="new-width-input"
                  style="width: 100%;"
                />
              </td>
            </tr>
            <tr>
              <td>
                {{ $t("dailySchedule.pass") }}
                <Input type="textarea" autosize v-model="records.pass" />
              </td>
            </tr>
            <tr>
              <td>
                {{ $t("dailySchedule.content") }}
                <Input type="textarea" autosize v-model="records.content" />
              </td>
            </tr>
          </table>

          <div class="keynote-btn">
            <button class="case-btn" @click="handleCaseSubmit">
              {{ $t("global.sure") }}
            </button>
          </div>
        </div>
      </div>
      <div class="keynote">
        <div
          class="mask"
          v-show="setObtainShow"
          @click="setObtainShow = false"
        ></div>
        <div class="child" id="child" v-show="setObtainShow">
          <div class="obtain">
            <div
              class="obtain-all"
              :class="{ obtain_avtive: obtainSelect == 1 }"
              @click="handleAllGain"
            >
              {{ $t("dailySchedule.all") }}
            </div>
            <div
              class="obtain-medicine"
              :class="{ obtain_avtive: obtainSelect == 2 }"
              @click="handleGetGain"
            >
              <!-- {{ levelCate[userInfo.level] }} -->
              {{ $t("dailySchedule.record3") }}
            </div>
          </div>
          <div style="line-height: .4rem; background: #ccc; color: #fff;">
            {{ $t("dailySchedule.communication") }}
          </div>
          <div style="overflow-y:scroll; max-height: 3rem">
            <table class="keynote-table">
              <tr v-for="(item, index) in gainList" :key="index">
                <td>
                  {{ item.recordDate }}
                </td>
                <td
                  style="max-width: 1rem;word-break: break-all;word-wrap: break-word;"
                >
                  {{ item.content }}
                </td>
                <td
                  style="max-width: 1rem;word-break: break-all;word-wrap: break-word;"
                >
                  {{ item.sign }}
                </td>
              </tr>
              <tr>
                <td style="min-width: 1.3rem;max-width:1.5rem">
                  <DatePicker
                    class="calendarFont"
                    :editable="false"
                    placement="bottom-end"
                    :placeholder="$t('global.sele')"
                    style="width: 100%"
                    :value="gain.recordDate"
                    @on-change="gain.recordDate = $event"
                  />
                </td>
                <td>
                  <Input type="textarea" autosize v-model="gain.content" />
                </td>
                <td style="max-width: 1rem;">
                  <Input type="textarea" autosize v-model="gain.sign" />
                </td>
              </tr>
            </table>
          </div>
          <div class="keynote-btn">
            <button class="case-btn" @click="handleGainSubmit">
              {{ $t("global.sure") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <ul class="table-footer">
      <li>{{ $t("positionArray.chaperone") }}</li>
      <li>{{ $t("positionArray.nurse") }}</li>
      <li>{{ $t("positionArray.doctor") }}</li>
      <li>{{ $t("positionArray.division") }}</li>
      <li>{{ $t("positionArray.dietitian") }}</li>
      <li>{{ $t("afterRecord.Nursing1") }}</li>
      <li>{{ $t("afterRecord.Pharmacist") }}</li>
    </ul>
    <div class="table-submit">
      <!--<button @click="handleSave">
        <i class="iconfont icon-baocun"></i>
        {{$t('global.preservation')}}
      </button>-->
      <button @click="handleSubmit">
        <i class="iconfont icon-submit"></i>
        {{ $t("global.submit") }}
      </button>
    </div>
  </div>
</template>

<script>
import {
  getDailyTable,
  getDailyCase,
  getDailyPoint,
  getDailyGain,
  sendDailyTable,
  sendDailyPoint,
  sendDailyCase,
  sendDailyGain,
  getUnit,
  getOldByUnit,
  sendRoleData,
  getRoleData
} from "../network/Sinyu.js";
import { format } from "../assets/utils/Tools";
export default {
  data: function() {
    return {
      oldInfo: {},
      userInfo: {},
      maskShow: false,
      setCaseShow: false,
      setObtainShow: false,
      timeChange: [
        "6:00",
        "7:00",
        "8:00",
        "9:00",
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
        "23:00",
        "00:00",
        "1:00",
        "2:00",
        "3:00",
        "4:00",
        "5:00"
      ],
      dailyList: [],
      records: {
        f: "",
        pass: "",
        content: "",
        date: "6:00"
      },
      point: {
        f: "",
        d: "",
        a: ""
      },
      gain: {
        recordDate: "",
        content: "",
        sign: ""
      },
      gainList: [],
      pointDate: "6:00",
      seleModel: 0,
      seleData: [],
      dayList: [],
      oldList: [],
      isSmall: false,
      smallList: [
        this.$t("dailySchedule.record1"),
        this.$t("dailySchedule.record2"),
        this.$t("dailySchedule.record3"),
        this.$t("dailySchedule.record4"),
        this.$t("dailySchedule.record5"),
        this.$t("dailySchedule.record6"),
        this.$t("dailySchedule.record7")
      ],
      smallContent: "",
      smallTitle: this.$t("dailySchedule.record1"),
      smallIndex: null,
      oldName: "",
      oldId: null,
      handleId: null,
      way: null,
      obtainSelect: 1 //1是全部2是医师
      // profession:''
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    this.timeChange.forEach(res => {
      this.dayList.push({
        value: res,
        label: res
      });
    });
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // this.profession = this.userInfo.level
    //获取今天日期
    this.getTime();
    //        网络请求
    this._getUnit();
  },
  methods: {
    setMaskShow(id, name) {
      this.handleId = id;
      this.oldName = name;
      this.maskShow = true;
      this._getDailyPoint();
    },
    setCase(id, name) {
      this.handleId = id;
      this.oldName = name;
      this.setCaseShow = true;
      this._getDailyCase();
    },
    setObtain(id, name) {
      this.handleId = id;
      this.oldName = name;
      this.setObtainShow = true;
      this._getDailyGain("all");
    },
    handleIsSmall(type, index, name, id) {
      //  处理点击了介看医等
      this.oldName = name;
      this.oldId = id;
      this.smallTitle = type;
      this.smallIndex = index;
      this.isSmall = true;
      if (index === 0) this.way = 4;
      if (index === 1) this.way = 5;
      if (index === 2) this.way = 6;
      if (index === 3) this.way = 7;
      if (index === 4) this.way = 8;
      if (index === 5) this.way = 9;
      if (index === 6) this.way = 10;
      this._getRoleData({
        oldId: id,
        recordTime: format(Date.now()),
        time: this.pointDate,
        type: this.way
      });
    },
    handleChangeDate(type) {
      //  点击改变时间
      if (type == "small") {
        this._getRoleData({
          oldId: this.oldId,
          recordTime: format(Date.now()),
          time: this.pointDate,
          type: this.way
        });
      } else if (type == "point") {
        this._getDailyPoint();
      } else {
        this._getDailyCase();
      }
    },
    handleClickContent(index, oldIndex, Cindex) {
      ///   点击了老人输入框第二条
      if (this.oldList[index].list[oldIndex].content2[Cindex]) {
        this.$set(this.oldList[index].list[oldIndex].content2, [Cindex], "");
        return;
      } else {
        this.$set(
          this.oldList[index].list[oldIndex].content2,
          [Cindex],
          this.$t("dailySchedule.success")
        );
        return;
      }
    },
    handleSeleJob(index, oldIndex, Cindex) {
      //  点击了老人输入框第三条
      if (this.oldList[index].list[oldIndex].content3[Cindex]) {
        this.$set(
          this.oldList[index].list[oldIndex].jsonStr,
          [Cindex],
          this.userInfo.level
        );
      } else {
        this.$set(this.oldList[index].list[oldIndex].jsonStr, [Cindex], "");
      }
    },
    handleSmallSubmit() {
      ///   点击提交介看医等
      let data = {
        content: this.smallContent,
        oldId: this.oldId,
        oldName: this.oldName,
        recordTime: format(Date.now()),
        time: this.pointDate,
        type: this.way
      };
      sendRoleData(data).then(res => {
        if (res.code === 0) {
          this.$Notice.success({
            title: this.$t("global.successfully"),
            duration: 2
          });
        } else {
          this.$Notice.error({
            title: this.$t("global.failed"),
            duration: 2
          });
        }
        this.isSmall = false;
        this.smallContent = "";
      });
    },
    // handleSeleUnit(){ ///   点击切换单元
    //   this._getOldList({
    //     time:format(Date.now()),
    //     unitId:this.unitList[this.seleModel].id
    //   })
    // },
    handleSave() {
      //  点击保存
    },
    handleSubmit() {
      //   点击提交
      let data = [];
      this.oldList.forEach(res => {
        res.list.forEach((result, i) => {
          result.content1.forEach((data, index) => {
            if (data == this.$t("ServePlan.sele1"))
              result.content1[index] = "1";
            if (data == this.$t("ServePlan.sele2"))
              result.content1[index] = "2";
            if (data == this.$t("ServePlan.sele3"))
              result.content1[index] = "3";
            if (data == this.$t("ServePlan.sele4"))
              result.content1[index] = "4";
          });
          let obj = {
            content1: JSON.stringify(result.content1),
            content2: JSON.stringify(result.content2),
            content3: JSON.stringify(result.content3),
            jsonStr: JSON.stringify(result.jsonStr),
            id: result.id,
            oldId: result.oldId,
            oldName: res.oldManName,
            recordDate: format(Date.now()),
            recordId: this.userInfo.adminId, //工作人员id，谁录入数据就填谁
            time: this.timeChange[i % this.timeChange.length]
          };
          data.push(obj);
        });
      });
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("ServePlan.uploads"),
        okText: this.$t("global.sure"),
        cancelText: this.$t("global.cancel"),
        onOk: async () => {
          ///    提交项目
          try {
            const res = await sendDailyTable(data);
            if (res.code === 0) {
              this.$Notice.success({
                title: this.$t("global.successfully"),
                duration: 2
              });
            } else {
              this.$Notice.error({
                title: this.$t("global.failed"),
                duration: 2
              });
            }
          } catch (err) {
            console.log(err);
            this.$Notice.error({
              title: this.$t("global.failed"),
              duration: 2
            });
          }
        }
      });
    },
    handleCaseSubmit() {
      ///   病历表点击确认上传
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("ServePlan.uploads"),
        okText: this.$t("global.sure"),
        cancelText: this.$t("global.cancel"),
        onOk: async () => {
          try {
            const data = {
              content: this.records.content,
              f: this.records.f,
              id: this.records.id,
              oldId: this.handleId,
              oldName: this.oldName,
              pass: this.records.pass,
              recordDate: format(Date.now()),
              recordId: this.userInfo.adminId,
              time: this.pointDate
            };
            const res = await sendDailyCase(data);
            if (res.code === 0) {
              this.$Notice.success({
                title: this.$t("global.operationSuccess"),
                duration: 2
              });
            } else {
              this.$Notice.error({
                title: this.$t("global.failed"),
                duration: 2
              });
            }
          } catch (err) {
            this.$Notice.error({
              title: this.$t("global.failed"),
              duration: 2
            });
          }
          this.setCaseShow = false;
        }
      });
    },
    handlePointSubmit() {
      //   重点表确认上传
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("ServePlan.uploads"),
        okText: this.$t("global.sure"),
        cancelText: this.$t("global.cancel"),
        onOk: async () => {
          try {
            const data = {
              a: this.point.a,
              d: this.point.d,
              f: this.point.f,
              // r: this.point.r,
              id: this.point.id,
              oldId: this.handleId,
              oldName: this.oldName,
              recordDate: format(Date.now()),
              recordId: this.userInfo.adminId,
              recordName: this.userInfo.userName,
              time: this.pointDate
            };
            const res = await sendDailyPoint(data);
            if (res.code === 0) {
              this.$Notice.success({
                title: this.$t("global.operationSuccess"),
                duration: 2
              });
            } else {
              this.$Notice.error({
                title: this.$t("global.failed"),
                duration: 2
              });
            }
          } catch (err) {
            this.$Notice.error({
              title: this.$t("global.failed"),
              duration: 2
            });
          }
          this.maskShow = false;
        }
      });
    },
    handleGainSubmit() {
      //   提交获取表
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("ServePlan.uploads"),
        okText: this.$t("global.sure"),
        cancelText: this.$t("global.cancel"),
        onOk: async () => {
          try {
            const data = {
              content: this.gain.content,
              oldId: this.handleId,
              oldName: this.oldName,
              recordDate: this.gain.recordDate,
              recordId: this.userInfo.adminId,
              recordLevel: this.userInfo.level,
              sign: this.gain.sign,
              dailyRoutineDate: format(Date.now())
            };
            const res = await sendDailyGain(data);
            if (res.code === 0) {
              this.$Notice.success({
                title: this.$t("global.operationSuccess"),
                duration: 2
              });
              this.gain = {
                recordDate: "",
                content: "",
                sign: ""
              };
            } else {
              this.$Notice.error({
                title: this.$t("global.failed"),
                duration: 2
              });
            }
          } catch (err) {
            this.$Notice.error({
              title: this.$t("global.failed"),
              duration: 2
            });
          }
          this.setObtainShow = false;
        }
      });
    },
    handleAllGain() {
      this._getDailyGain("all");
    },
    handleGetGain() {
      this._getDailyGain("doctor");
    },
    ////         网络请求          ////
    _getUnit() {
      //  获取单元
      getUnit({
        nursingId: this.userInfo.nursingId
      })
        .then(res => {
          if (res.code === 0) {
            this.unitList = res.data;
            if (res.data.length > 0) {
              res.data.forEach((result, index) => {
                this.seleData.push({
                  value: index,
                  label: result.name
                });
              });
            }
            this._getOldList({
              time: format(Date.now()),
              unitId: localStorage.getItem("unitId")
            });
          }
        })
        .catch(err => {
          console.warn(err);
        });
    },
    _getOldList(data) {
      getOldByUnit(data)
        .then(res => {
          if (res.code === 0) {
            res.data.forEach((result, resIndex) => {
              let array = [];
              result.list.forEach((res, index) => {
                array.push(this.timeChange[index]);
                res.content1 = JSON.parse(res.content1);
                if (res.content1.length === 0) {
                  res.content1 = [""];
                }
                res.content1.forEach((data, index) => {
                  if (data == "1")
                    res.content1[index] = this.$t("ServePlan.sele1");
                  if (data == "2")
                    res.content1[index] = this.$t("ServePlan.sele2");
                  if (data == "3")
                    res.content1[index] = this.$t("ServePlan.sele3");
                  if (data == "4")
                    res.content1[index] = this.$t("ServePlan.sele4");
                });
                if (res.content2 === null) {
                  res.content2 = [];
                  res.content1.forEach((data, index) => {
                    res.content2[index] = "";
                  });
                } else {
                  res.content2 = JSON.parse(res.content2);
                }
                if (res.content3 === null) {
                  res.content3 = [];
                  res.content1.forEach((data, index) => {
                    res.content3[index] = "";
                  });
                } else {
                  res.content3 = JSON.parse(res.content3);
                }
                if (res.jsonStr === null) {
                  res.jsonStr = [];
                  res.content1.forEach((data, index) => {
                    res.jsonStr[index] = "";
                  });
                } else {
                  res.jsonStr = JSON.parse(res.jsonStr);
                }
                for (let i = 0; i < res.content1.length - 1; i++) {
                  array.push("");
                }
                result.titleArr = array;
              });
            });
            this.oldList = res.data;
          }
        })
        .catch(err => {
          console.warn(err);
        });
    },
    async _getDailyCase() {
      //  获取每日课程病历表
      try {
        const data = {
          id: this.handleId,
          date: format(Date.now()),
          time: this.pointDate
        };
        const res = await getDailyCase(data);
        if (res.code === 0 && res.data.length > 0) {
          this.records = res.data[0];
        } else {
          this.records = {
            date: "6:00"
          };
        }
      } catch (err) {}
    },
    async _getDailyPoint() {
      //  获取每日课程重点表
      try {
        const data = {
          id: this.handleId,
          date: format(Date.now()),
          time: this.pointDate
        };
        const res = await getDailyPoint(data);
        if (res.code === 0 && res.data.length > 0) {
          this.point = res.data[0];
        } else {
          this.point = {};
        }
      } catch (err) {}
    },
    async _getDailyGain(type) {
      if (type == "all") {
        this.obtainSelect = 1;
      } else if (type == "doctor") {
        this.obtainSelect = 2;
      }
      //  获取每日课程获取表
      try {
        const data = {
          id: this.handleId,
          level: type == "all" ? "" : 3,
          time: format(Date.now())
        };
        const res = await getDailyGain(data);
        if (res.code === 0 && res.data) {
          this.gainList = res.data;
        } else {
          this.gainList = "";
        }
      } catch (err) {}
    },
    _getRoleData(data) {
      getRoleData(data)
        .then(res => {
          if (res.code === 0) {
            if (res.data) {
              this.smallContent = res.data.content;
            } else {
              this.smallContent = "";
            }
          }
        })
        .catch(err => {
          console.warn(err);
        });
    },
    getTime() {
      var date = new Date();
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var day = date.getDate(); //获取今天日期
      this.dayRow = day;
      if (mon < 10) {
        mon = "0" + mon;
      }
      if (day < 10) {
        day = "0" + day;
      }
      this.nowDay = year + "-" + mon + "-" + day;
    }
  }
};
</script>

<style lang="less">
input {
  border: 0;
  outline: none;
  padding: 0 0.03rem /* 3/102 */;
}
.ivu-input[disabled] {
  background: transparent;
  color: #000;
}

.ivu-input {
  background: transparent;
}

.first {
  width: 2.24rem;
  height: 0.63rem;
  position: relative;
}

th[class="first"]:before {
  // content: "";
  position: absolute;
  width: 0.01rem;
  height: 2.38rem;
  top: 0;
  left: 0;
  background-color: #e7e7e7;
  display: block;
  transform: rotate(-75deg);
  transform-origin: top;
}

.sheetTable {
  border: solid #e7e7e7;
  border-width: 0px 1px 1px 0px;
  font-size: 0.14rem;
  width: 100%;

  input {
    border: 0;
    outline: none;
    padding: 0 0.03rem /* 3/102 */;
  }
}

.sheetTable th {
  text-align: center;
  min-width: 0.9rem;
  // background: #63af1e;
  background: var(--table-bg);
  font-size: 0.14rem;
  color: #ffffff !important;
  text-align: center;
}

.sheetTable tbody > tr > td > tr {
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid var(--table-bg);
  border-top: 1px solid var(--table-bg);
  line-height: 0.44rem;
}

.routing {
  display: flex;
  align-items: center;
  text-align: left;
  padding-left: 0.1rem;
}

.btncolor {
  display: inline-block;
  height: 0.34rem;
  // width: 0.5rem;
  margin-right: 0.04rem;
  line-height: 0.34rem;
  border-radius: 0.04rem;
  padding: 0 0.1rem;
  color: #000;
}

.users {
  white-space: nowrap;
  display: block;
  text-align: left;
  font-size: 0.16rem;
  font-weight: 500;
  padding: 0 0.1rem /* 10/102 */;
}

.keynote {
  width: 100%;
  height: 100%;
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.3;
  z-index: 999;
}

.child {
  position: fixed;
  width: 4.24rem;
  /* height: 2.57rem; */
  border: 1px solid #ccc;
  /* text-align: center;
  line-height: 2.57rem; */
  top: calc(50% - 1.4rem);
  left: calc(50% - 2rem);
  background: #fff;
  padding: 0.26rem 0.22rem;
  color: #333;
  z-index: 1000;
}

.keynote-time {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.21rem;
}

.keynote-table {
  width: 100%;
  border: 1px solid #ccc;
  td {
    text-align: left;
    border-bottom: 1px solid #ccc;
    text-align: left;
    padding: 0 0.05rem;
    height: 0.51rem;
    border-right: 1px solid #ccc;
    font-size: 0.14rem;
  }
  input {
    width: 100%;
    font-size: 0.15rem /* 15/102 */;
  }
}

.after {
  width: 0.54rem;
  height: 0.22rem;
  background: #f6bd16;
  text-align: center;
  line-height: 0.22rem;
  font-size: 0.12rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  float: right;
  border-radius: 0.02rem;
}

.keynote-btn {
  text-align: right;
}

.case-btn {
  width: 0.8rem;
  height: 0.34rem;
  background: #f6bd16;
  border-radius: 0.04rem;
  border: 0;
  margin-top: 0.23rem;
}

.keynote-th {
  background: #ccc !important;
  padding: 0.09rem 0;
}

.obtain {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.14rem;
}

.obtain-all {
  width: 0.92rem;
  height: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  margin-right: 0.1rem;
  margin-bottom: 0.1rem;
  background: #d9f7be;
}

.obtain-medicine {
  width: 0.92rem;
  height: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  margin-right: 0.1rem;
  margin-bottom: 0.1rem;
  background: #d9f7be;
}
.obtain_avtive {
  background: #52c41a;
}

.screen-l {
  display: flex;
  align-items: center;
  margin-bottom: 0.1rem;

  .ivu-select-selection {
    border-color: #ededed;
  }

  .screen-search {
    display: flex;
    margin-left: 0.1rem /* 20/102 */;

    button {
      width: 0.55rem /* 87/102 */;
      line-height: 38px;
      letter-spacing: 0.02rem /* 2/102 */;
      font-size: 0.14rem /* 15/102 */;
      border: 0;
      background: #5b90fa;
      color: #fff;
    }

    input {
      height: 0.39rem /* 40/102 */;
      line-height: 0.39rem /* 40/102 */;
      border: 1px solid #ededed;
      padding: 0.09rem /* 9/102 */;
      border-radius: 0.03rem /* 3/102 */;
    }
  }
}

.small-button {
  text-align: left;
  padding-left: 0.1rem;

  span {
    padding: 0.05rem /* 5/102 */;
    background: #e6b9b8;
    margin-right: 0.05rem /* 5/102 */;
    text-align: center;
    color: #000;

    &:nth-child(2) {
      background: #ffff00;
    }

    &:nth-child(3) {
      background: #b7dee8;
    }

    &:nth-child(4) {
      background: #92d050;
    }

    &:nth-child(5) {
      background: #fac090;
    }

    &:nth-child(6) {
      background: #b2a1c7;
    }

    &:nth-child(7) {
      background: #e46d0a;
    }
  }
}

.table-footer {
  margin-top: 0.1rem /* 10/102 */;
  display: flex;
  // justify-content: flex-end;
  align-items: center;
  font-size: 0.14rem /* 14/102 */;

  li {
    padding-left: 0.25rem /* 25/102 */;
    margin: 0 0.15rem /* 15/102 */;
    position: relative;
    line-height: 0.25rem /* 25/102 */;

    &::before {
      width: 0.2rem /* 20/102 */;
      height: 0.2rem /* 20/102 */;
      border-radius: 50%;
      display: block;
      content: "";
      background: #fde9d9;
      position: absolute;
      left: 0;
      top: 0;
    }

    &:nth-child(2)::before {
      background: #ffff00;
    }

    &:nth-child(3)::before {
      background: #00b0f0;
    }

    &:nth-child(4)::before {
      background: #92d050;
    }

    &:nth-child(5)::before {
      background: #e26b0a;
    }

    &:nth-child(6)::before {
      background: #b1a0c7;
    }

    &:nth-child(7)::before {
      background: #fff;
    }
  }
}

.job_1 {
  background: #fde9d9;

  .ivu-input {
    color: #000;
  }
}

.job_2 {
  background: #ffff00;

  .ivu-input {
    color: #000;
  }
}

.job_3 {
  background: #00b0f0;

  .ivu-input {
    color: #000;
  }
}

.job_4 {
  background: #92d050;

  .ivu-input {
    color: #000;
  }
}

.job_5 {
  background: #e26b0a;

  .ivu-input {
    color: #000;
  }
}

.job_6 {
  background: #b1a0c7;

  .ivu-input {
    color: #000;
  }
}

.job_7 {
  background: #fff;

  .ivu-input {
    color: #000;
  }
}
</style>
