<template>
<div id="bedsore-assess">
  <div class="trip-title">{{$t("BedsoreAssess.title")}}</div>
  <div class="assess-header">

    <!-- <label>使用者名：<input type="text" /></label> -->
    <label>
      {{$t("BedsoreAssess.Location")}}<span class="required">*</span>：
      <input type="text" v-model="BedsoreAssess_list.happenPart" style="width:auto;" />
    </label>
    <label>
      {{$t("BedsoreAssess.LocationDate")}}：
      <input type="text" maxlength="4" v-model="BedsoreAssess_list.happenDate[0]" disabled style="text-align:center;" />
      {{$t("global.year")}}
      <input maxlength="2" type="text" v-model="BedsoreAssess_list.happenDate[1]" disabled style="text-align:center;" />
      {{$t("global.month")}}
      <input maxlength="2" v-model="BedsoreAssess_list.happenDate[2]" style="text-align:center;" disabled type="text" />
      {{$t("global.day")}}
    </label>
  </div>
  <div style="overflow-x:scroll;">
    <table class="table table-padding new-table" border="1" style="text-align:center;overflow:auto;">
      <thead>
        <tr>
          <td class="head-bg" colspan="1" style>{{$t("BedsoreAssess.EvaluationDate")}}</td>
          <td class="hemorrhoids-td-padding" colspan="1" style="white-space:nowrap;" v-for="(item , index) in listDate" :key="index">
            <!-- <Select  v-model="BedsoreAssess_list.assessmentDate[index].month" class="span-none-padding"  style="width:48%;position:relative;" :placeholder="$t('BedsoreAssess.choose')">
              <Option  v-for="month in monthList" :value="month.value" :key="month.value">{{ month.label }}</Option>
            </Select> -->
            {{BedsoreAssess_list.assessmentDate[index].month}}<span>-</span>{{BedsoreAssess_list.assessmentDate[index].day}}

            <!-- <Select v-if="dayList.length != 0" v-model="BedsoreAssess_list.assessmentDate[index].day" class="span-none-padding"  style="width:48%;position:relative;" :placeholder="$t('BedsoreAssess.choose')">
              <Option  v-for="day in dayList" :value="day.value" :key="day.value">{{ day.label }}</Option>
            </Select> -->
          </td>
          <td class="head-bg" colspan="8">{{$t("BedsoreAssess.EveryTwoWeek")}}</td>
          <td class="head-bg" style="width: 1rem">{{$t("DrainTrip.Remarks")}}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="head-bg" rowspan="7">{{$t("BedsoreAssess.DESIGNR")}}</td>
          <td class colspan="1" style="white-space:nowrap;" v-for="(item , index) in listDate" :key="index">
            <!-- <Input
              type="text"
              class="new-width-input special"
              maxlength="2"
              v-model="BedsoreAssess_list.deepness[index]"
            />-->

            <Select @on-change="optionOne($event,index)" v-model="BedsoreAssess_list.deepness[index]" class="span-none-padding" style="width:100%;position:relative;" :placeholder="$t('BedsoreAssess.choose')">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </td>
          <td>{{$t("BedsoreAssess.Depth")}}</td>
          <td class="td-unified-center">【d0】{{$t("BedsoreAssess.None")}}</td>
          <td class="td-unified-center">【d1】{{$t("BedsoreAssess.Persistent")}}</td>
          <td class="td-unified-center">【d2】{{$t("BedsoreAssess.dermis")}}</td>
          <td class="td-unified-center">【D3】{{$t("BedsoreAssess.subcutaneous")}}</td>
          <td class="td-unified-center">【D4】{{$t("BedsoreAssess.tissue")}}</td>
          <td class="td-unified-center">【D5】{{$t("BedsoreAssess.cavities")}}</td>
          <td class="td-unified-center">【DU】{{$t("BedsoreAssess.determined")}}</td>
          <td rowspan="7">
            <i-input type="textarea" :autosize="{minRows: 20}" class="special" :placeholder="$t('evaluate.foodMedicine.enter')" v-model="BedsoreAssess_list.remark"></i-input>
          </td>
        </tr>
        <tr>
          <td class colspan="1" style="white-space:nowrap;" v-for="(item , index) in listDate" :key="index">
            <Select @on-change="optionOne($event,index)" v-model="BedsoreAssess_list.exudation[index]" class="span-none-padding" style="width:100%;position:relative;" :placeholder="$t('BedsoreAssess.choose')">
              <Option v-for="(item , number) in cityList2" :value="item.value" :key="number">{{ item.label }}</Option>
            </Select>
          </td>

          <td>{{$t("BedsoreAssess.Exudate")}}</td>
          <td class="td-unified-center">【e0】{{$t("BedsoreAssess.None2")}}</td>
          <td class="td-unified-center">【e1】{{$t("BedsoreAssess.Small")}}</td>
          <td class="td-unified-center">【e3】{{$t("BedsoreAssess.Moderate")}}</td>
          <td class="td-unified-center" colspan="4">【E6】{{$t("BedsoreAssess.Large")}}</td>
        </tr>
        <tr>
          <td class colspan="1" style="white-space:nowrap;" v-for="(item , index) in listDate" :key="index">
            <Select @on-change="optionOne($event,index)" v-model="BedsoreAssess_list.maxSize[index]" class="span-none-padding" style="width:100%;position:relative;" :placeholder="$t('BedsoreAssess.choose')">
              <Option v-for="(item , number) in cityList3" :value="item.value" :key="number">{{ item.label }}</Option>
            </Select>
          </td>
          <td>{{$t("BedsoreAssess.Maximum")}}</td>
          <td class="td-unified-center">【s0】{{$t("BedsoreAssess.damage")}}</td>
          <td class="td-unified-center">【s3】{{$t("BedsoreAssess.than4")}}</td>
          <td class="td-unified-center">【s6】{{$t("BedsoreAssess.than16")}}</td>
          <td class="td-unified-center">【s8】{{$t("BedsoreAssess.then16in32")}}</td>
          <td class="td-unified-center">【s9】{{$t("BedsoreAssess.than32")}}</td>
          <td class="td-unified-center">【s12】{{$t("BedsoreAssess.than64")}}</td>
          <td class="td-unified-center">【S15】{{$t("BedsoreAssess.than100")}}</td>
        </tr>
        <tr>
          <td class colspan="1" style="white-space:nowrap;" v-for="(item , index) in listDate" :key="index">
            <Select @on-change="optionOne($event,index)" v-model="BedsoreAssess_list.lightDisease[index]" class="span-none-padding" style="width:100%;position:relative;" :placeholder="$t('BedsoreAssess.choose')">
              <Option v-for="(item , number) in cityList4" :value="item.value" :key="number">{{ item.label }}</Option>
            </Select>
          </td>
          <td>{{$t("BedsoreAssess.i1")}}</td>
          <td class="td-unified-center">【i0】{{$t("BedsoreAssess.i2")}}</td>
          <td class="td-unified-center">【i1】{{$t("BedsoreAssess.i3")}}</td>
          <td class="td-unified-center" colspan="2">【I3】{{$t("BedsoreAssess.i4")}}</td>
          <td class="td-unified-center" colspan="3">【I9】{{$t("BedsoreAssess.i5")}}</td>
        </tr>
        <tr>
          <td class colspan="1" style="white-space:nowrap;" v-for="(item , index) in listDate" :key="index">
            <Select @on-change="optionOne($event,index)" v-model="BedsoreAssess_list.improvePercen[index]" class="span-none-padding" style="width:100%;position:relative;" :placeholder="$t('BedsoreAssess.choose')">
              <Option v-for="(item , number) in cityList5" :value="item.value" :key="number">{{ item.label }}</Option>
            </Select>
          </td>
          <td>{{$t("BedsoreAssess.g0")}}</td>
          <td class="td-unified-center">【g0】{{$t("BedsoreAssess.g1")}}</td>
          <td class="td-unified-center">【g1】{{$t("BedsoreAssess.g2")}}</td>
          <td class="td-unified-center">【g3】{{$t("BedsoreAssess.g3")}}</td>
          <td class="td-unified-center">【G4】{{$t("BedsoreAssess.g4")}}</td>
          <td class="td-unified-center">【G5】{{$t("BedsoreAssess.g5")}}</td>
          <td class="td-unified-center" colspan="2">【G6】{{$t("BedsoreAssess.g6")}}</td>
        </tr>
        <tr>
          <td class colspan="1" style="white-space:nowrap;" v-for="(item , index) in listDate" :key="index">
            <Select @on-change="optionOne($event,index)" v-model="BedsoreAssess_list.badColumnGroup[index]" class="span-none-padding" style="width:100%;position:relative;" :placeholder="$t('BedsoreAssess.choose')">
              <Option v-for="(item , number) in cityList6" :value="item.value" :key="number">{{ item.label }}</Option>
            </Select>
          </td>
          <td>{{$t("BedsoreAssess.n1")}}</td>
          <td class="td-unified-center">【n0】{{$t("BedsoreAssess.n2")}}</td>
          <td class="td-unified-center" colspan="2">【N3】{{$t("BedsoreAssess.n3")}}</td>
          <td class="td-unified-center" colspan="4">【N6】{{$t("BedsoreAssess.n4")}}</td>
        </tr>
        <tr>
          <td class colspan="1" style="white-space:nowrap;" v-for="(item , index) in listDate" :key="index">
            <Select @on-change="optionOne($event,index)" v-model="BedsoreAssess_list.pocketSize[index]" class="span-none-padding" style="width:100%;position:relative;" :placeholder="$t('BedsoreAssess.choose')">
              <Option v-for="(item , number) in cityList7" :value="item.value" :key="number">{{ item.label }}</Option>
            </Select>
          </td>
          <td colspan="3">{{$t("BedsoreAssess.p0")}}</td>
          <td class="td-unified-center">【p0】{{$t("BedsoreAssess.p1")}}</td>
          <td class="td-unified-center">【P6】{{$t("BedsoreAssess.p2")}}</td>
          <td class="td-unified-center">【P9】{{$t("BedsoreAssess.p3")}}</td>
          <td class="td-unified-center">【P12】{{$t("BedsoreAssess.p4")}}</td>
          <td class="td-unified-center" colspan="1">【P24】{{$t("BedsoreAssess.p5")}}</td>
        </tr>
        <tr>
          <td class="head-bg">{{$t("BedsoreAssess.total")}}</td>
          <td class colspan="1" style="white-space:nowrap;" v-for="(item , index) in listDate" :key="index">
            <Input type="text" class="new-width-input special" maxlength="3" v-model="BedsoreAssess_list.aggregateScore[index]" />
          </td>
          <td class="head-bg" colspan="9">{{$t("BedsoreAssess.Evaluate")}}</td>
        </tr>
        <tr>
          <td class="head-bg">{{$t("BedsoreAssess.content")}}</td>
          <td colspan="15">
            <Input type="textarea" autosize class="new-width-input" v-model="BedsoreAssess_list.detail" :placeholder="$t('evaluate.foodMedicine.enter')" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="table-submit">
    <button @click="onSend">
      <i class="iconfont icon-baocun"></i>
      {{$t('global.submit')}}
    </button>
  </div>
</div>
</template>

<script>
import {
  selectBedsoreList,
  insertBedsoreList,
  updateBedsoreList,
} from "../network/every";
import Vue from "vue";
import newVue from './new.vue';
export default {
  data() {
    return {
      oldId: "",
      BedsoreAssess_list: {
        assessmentDate: [{
            month: "01",
            day: "10"
          },
          {
            month: "",
            day: ""
          },
          {
            month: "",
            day: ""
          },
          {
            month: "",
            day: ""
          },
          {
            month: "",
            day: ""
          },
          {
            month: "",
            day: ""
          },
        ],
        deepness: ["", "", "", "", "", ""],
        exudation: ["", "", "", "", "", ""],
        maxSize: ["", "", "", "", "", ""],
        lightDisease: ["", "", "", "", "", ""],
        improvePercen: ["", "", "", "", "", ""],
        badColumnGroup: ["", "", "", "", "", ""],
        pocketSize: ["", "", "", "", "", ""],
        aggregateScore: ["", "", "", "", "", ""],
        happenDate: [],
        oldManId: 2,
        id: "",
        operatorId: 0,
        createDate: "2020-7-18",
        remark: "",
        detail: ""
      },
      listDate: [1, 2, 3, 4, 5, 6],
      cityList: [{
          value: 'd0',
          label: 'd0'
        },
        {
          value: 'd1',
          label: 'd1'
        },
        {
          value: 'd2',
          label: 'd2'
        },
        {
          value: 'D3',
          label: 'D3'
        },
        {
          value: 'D4',
          label: 'D4'
        },
        {
          value: 'D5',
          label: 'D5'
        },
        {
          value: 'DU',
          label: 'DU'
        }
      ],
      cityList2: [{
          value: 'e0',
          label: 'e0'
        },
        {
          value: 'e1',
          label: 'e1'
        },
        {
          value: 'e3',
          label: 'e3'
        },
        {
          value: 'E6',
          label: 'E6'
        }
      ],
      cityList3: [{
          value: 's0',
          label: 's0'
        },
        {
          value: 's3',
          label: 's3'
        },
        {
          value: 's6',
          label: 's6'
        },
        {
          value: 's8',
          label: 's8'
        },
        {
          value: 's9',
          label: 's9'
        },
        {
          value: 's12',
          label: 's12'
        },
        {
          value: 'S15',
          label: 'S15'
        }
      ],
      cityList4: [{
          value: 'i0',
          label: 'i0'
        },
        {
          value: 'i1',
          label: 'i1'
        },
        {
          value: 'I3',
          label: 'I3'
        },
        {
          value: 'I9',
          label: 'I9'
        }
      ],
      cityList5: [{
          value: 'g0',
          label: 'g0'
        },
        {
          value: 'g1',
          label: 'g1'
        },
        {
          value: 'g3',
          label: 'g3'
        },
        {
          value: 'G4',
          label: 'G4'
        },
        {
          value: 'G5',
          label: 'G5'
        },
        {
          value: 'G6',
          label: 'G6'
        }
      ],
      cityList6: [{
          value: 'n0',
          label: 'n0'
        },
        {
          value: 'N3',
          label: 'N3'
        },
        {
          value: 'N6',
          label: 'N6'
        }
      ],
      cityList7: [{
          value: 'p0',
          label: 'p0'
        },
        {
          value: 'P6',
          label: 'P6'
        },
        {
          value: 'P9',
          label: 'P9'
        },
        {
          value: 'P12',
          label: 'P12'
        },
        {
          value: 'P24',
          label: 'P24'
        }
      ],
      monthList: [],
      dayList: [],
      arr: [],
      year: ""
    };
  },
  methods: {
    optionOne(h, index) {
      // console.log(h , index);
      let a = this.BedsoreAssess_list.deepness[index];
      let b = this.BedsoreAssess_list.exudation[index];
      let c = this.BedsoreAssess_list.maxSize[index];
      let d = this.BedsoreAssess_list.lightDisease[index];
      let e = this.BedsoreAssess_list.improvePercen[index];
      let f = this.BedsoreAssess_list.badColumnGroup[index];
      let g = this.BedsoreAssess_list.pocketSize[index];
      let num = 0;
      let arr = [
        parseInt(a ? a.substr(1) : 0), parseInt(b ? b.substr(1) : 0), parseInt(c ? c.substr(1) : 0), parseInt(d ? d.substr(1) : 0), parseInt(e ? e.substr(1) : 0), parseInt(f ? f.substr(1) : 0), parseInt(g ? g.substr(1) : 0),
      ]
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
          num = num + arr[i];
        }
      }
      console.log(a, b, c, d, e, f, g);
      if (a == "" && b == "" && c == "" && d == "" && e == "" && f == "" && g == "") {
        this.BedsoreAssess_list.aggregateScore[index] = "";
      } else {
        this.BedsoreAssess_list.aggregateScore[index] = num;
      }

    },
    onSend() {
      this.onInsertBedsoreList();
    },
    // 数据插入
    async onInsertBedsoreList() {
      if (
        this.BedsoreAssess_list.happenPart == "" ||
        !this.BedsoreAssess_list.hasOwnProperty("happenPart")
      ) {
        this.$Notice.error({
          title: this.$t("global.reminder"),
          desc: this.$t("BedsoreAssess.position"),
        });
        return;
      }

      this.BedsoreAssess_list.oldManId = this.oldId;
      // 所有数据处理
      let list = {};
      for (let i in this.BedsoreAssess_list) {
        Vue.set(list, i, this.BedsoreAssess_list[i]);
      }

      list.happenDate =
        this.BedsoreAssess_list.happenDate[0] +
        "-" +
        this.BedsoreAssess_list.happenDate[1] +
        "-" +
        this.BedsoreAssess_list.happenDate[2];
      list.assessmentDate = JSON.stringify(
        this.BedsoreAssess_list.assessmentDate
      );
      list.deepness = JSON.stringify(this.BedsoreAssess_list.deepness);
      list.exudation = JSON.stringify(this.BedsoreAssess_list.exudation);
      list.maxSize = JSON.stringify(this.BedsoreAssess_list.maxSize);
      list.lightDisease = JSON.stringify(this.BedsoreAssess_list.lightDisease);
      list.improvePercen = JSON.stringify(
        this.BedsoreAssess_list.improvePercen
      );
      list.badColumnGroup = JSON.stringify(
        this.BedsoreAssess_list.badColumnGroup
      );
      list.pocketSize = JSON.stringify(this.BedsoreAssess_list.pocketSize);
      list.aggregateScore = JSON.stringify(
        this.BedsoreAssess_list.aggregateScore
      );

      console.log(list);

      if (list.id == "") {
        // 插入
        try {
          let res = await insertBedsoreList(list);
          console.log(res, "插入");
          if (res.code == 0) {
            this.$Notice.success({
              title: this.$t("global.reminder"),
              desc: this.$t("global.operationSuccess"),
            });
          } else {
            this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: this.$t("global.failed"),
            });
          }
          this.onSelectBedsoreList();

        } catch (err) {
          console.log(err);
          this.$Notice.error({
            title: this.$t("global.reminder"),
            desc: this.$t("global.failed"),
          });
        }

      } else {
        console.log("update");
        // 更新
        try {
          let result = await updateBedsoreList(list);
          console.log(result, "更新");
          if (result.code == 0) {
            this.$Notice.success({
              title: this.$t("global.reminder"),
              desc: this.$t("global.operationSuccess"),
            });
          } else {
            this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: this.$t("global.failed"),
            });
          }
          this.onSelectBedsoreList();
        } catch (err) {
          console.log(err);
          this.$Notice.error({
            title: this.$t("global.reminder"),
            desc: this.$t("global.failed"),
          });
        }

      }
    },
    // 数据更新
    async onUpdateBedsoreList() {},
    // 数据获取
    async onSelectBedsoreList() {
      // 获取褥瘡発生日
      let oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
      this.BedsoreAssess_list.happenDate[0] = oldInfo.happenedDate.substring(0, 4);
      this.BedsoreAssess_list.happenDate[1] = oldInfo.happenedDate.substring(5, 7);
      this.BedsoreAssess_list.happenDate[2] = oldInfo.happenedDate.substring(8, 10);

      try {
        let res = await selectBedsoreList({
          happenDate: `${this.BedsoreAssess_list.happenDate[0]}-${this.BedsoreAssess_list.happenDate[1]}-${this.BedsoreAssess_list.happenDate[2]}`,
          oldManId: this.oldId,
        });
        if (res.code == 0 || res.code == 416) {
          if (res.data.length >= 1) {
            this.BedsoreAssess_list = res.data[0];
            // 数据处理渲染
            this.BedsoreAssess_list.happenDate = res.data[0].happenDate.split("-");
            this.BedsoreAssess_list.assessmentDate = JSON.parse(
              res.data[0].assessmentDate
            );
            this.BedsoreAssess_list.deepness = JSON.parse(res.data[0].deepness);
            this.BedsoreAssess_list.exudation = JSON.parse(res.data[0].exudation);
            this.BedsoreAssess_list.maxSize = JSON.parse(res.data[0].maxSize);
            this.BedsoreAssess_list.lightDisease = JSON.parse(
              res.data[0].lightDisease
            );
            this.BedsoreAssess_list.improvePercen = JSON.parse(
              res.data[0].improvePercen
            );
            this.BedsoreAssess_list.badColumnGroup = JSON.parse(
              res.data[0].badColumnGroup
            );
            this.BedsoreAssess_list.pocketSize = JSON.parse(res.data[0].pocketSize);
            this.BedsoreAssess_list.aggregateScore = JSON.parse(
              res.data[0].aggregateScore
            );
            console.log(this.BedsoreAssess_list);
          }

        } else {
          this.$Notice.error({
            title: this.$t("global.reminder"),
            desc: this.$t("global.loadFail"),
          });
          return
        }
      } catch (err) {
        console.log(err);
        this.$Notice.error({
          title: this.$t("global.reminder"),
          desc: this.$t("global.loadFail"),
        });
        return

      }

      this.year = parseInt(oldInfo.happenedDate.substring(0, 4));
      let m = oldInfo.happenedDate.substring(5, 7);
      let d = oldInfo.happenedDate.substring(8, 10);
      let totalDay = new Date(this.year, m, 0).getDate();
      let newD = parseInt(d) + 14;
      if (newD > totalDay) {
        let boolM = parseInt(m) + 1;
        if (boolM > 12) {
          boolM = 1;
          this.year += 1;
        }
        let boolD = newD - parseInt(totalDay);
        boolM = boolM < 10 ? "0" + boolM : boolM;
        boolD = boolD < 10 ? "0" + boolD : boolD;
        this.BedsoreAssess_list.assessmentDate[0].month = boolM;
        this.BedsoreAssess_list.assessmentDate[0].day = boolD;
      } else {
        m = parseInt(m)
        newD = parseInt(newD);
        m = m < 10 ? "0" + m : m;
        newD = newD < 10 ? "0" + newD : newD;
        this.BedsoreAssess_list.assessmentDate[0].month = m
        this.BedsoreAssess_list.assessmentDate[0].day = newD
      }

      this.autoDate(0, 1);
      this.autoDate(1, 2);
      this.autoDate(2, 3);
      this.autoDate(3, 4);
      this.autoDate(4, 5);
    },
    // 日期
    autoDate(Sindex, Eindex) {
      let oldInfo1 = JSON.parse(localStorage.getItem("oldInfo"));
      // let y = oldInfo1.happenedDate.substring(0,4);
      let m = this.BedsoreAssess_list.assessmentDate[Sindex].month;
      let d = this.BedsoreAssess_list.assessmentDate[Sindex].day;

      let totalDay = new Date(this.year, m, 0).getDate();

      let newD = parseInt(d) + 14;

      if (newD > totalDay) {
        let boolM = parseInt(m) + 1;
        if (boolM > 12) {
          boolM = 1;
          this.year += 1;
        }
        let boolD = newD - parseInt(totalDay);
        boolM = boolM < 10 ? "0" + boolM : boolM;
        boolD = boolD < 10 ? "0" + boolD : boolD;
        this.BedsoreAssess_list.assessmentDate[Eindex].month = boolM;
        this.BedsoreAssess_list.assessmentDate[Eindex].day = boolD;

      } else {
        m = parseInt(m)
        newD = parseInt(newD);
        m = m < 10 ? "0" + m : m;
        newD = newD < 10 ? "0" + newD : newD;
        this.BedsoreAssess_list.assessmentDate[Eindex].month = m;
        this.BedsoreAssess_list.assessmentDate[Eindex].day = newD;

      }

      console.log(this.year + "-" + this.BedsoreAssess_list.assessmentDate[Eindex].month + "-" + this.BedsoreAssess_list.assessmentDate[Eindex].day);

    }

  },

  computed: {

  },

  async created() {
    let oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    this.oldId = oldInfo.oldId;
    this.onSelectBedsoreList();

  },
};
</script>

<style lang="less" scoped>
#bedsore-assess {
  font-size: 0.14rem
    /* 14/102 */
  ;
  text-align: left;

  .assess-header {
    display: flex;
    justify-content: space-between;
    line-height: 0.29rem
      /* 30/102 */
    ;
    font-size: 0.16rem
      /* 16/102 */
    ;

    label:last-child input {
      text-align: right;
      width: 0.49rem
        /* 50/102 */
      ;
    }

    input {
      border: 0;
      outline: none;
      width: 0.78rem
        /* 80/102 */
      ;
    }
  }

  // .assess-header end

  .head-bg {
    line-height: 0.29rem
      /* 30/102 */
    ;
  }
}

//  #bedsore-assess end
.table-padding td,
.table-padding th {
  padding: 0.05rem;
}

.td-unified-center {
  vertical-align: top;
}
</style><style>
.table-padding .ivu-input {
  padding-left: 0;
  padding-right: 0;
}

.specialR .ivu-input {
  text-align: right;
  /* line-height: ; */
}

.specialL .ivu-input {
  text-align: left;
}

.span-none-padding>.ivu-select-selection>div>span {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.span-none-padding>.ivu-select-selection>div>i {
  display: none !important;
}

.hemorrhoids-td-padding {
  padding-left: 0.02rem !important;
}
</style>
