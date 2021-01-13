<template>
<div class="record">
  <div class="trip-title">
    {{$t("Record.title")}}({{' '+thisYear+' '}}
    {{$t('global.year')}}{{' '+thisMonth}}
    {{$t('global.month')}} )
  </div>
  <!-- 查询 -->
  <div style="display:flex;justify-content:flex-start;">
    <DatePicker class="calendarFont" type="month" v-model="select_date" :placeholder="$t('global.choose')" :editable="false" :clearable="false" @on-change="onSelectDate"></DatePicker>
  </div>

  <div class="record-header">
    <label>
      {{$t('global.name')}}: ({{oldInfo.name}}{{$t('global.honorific')}}
      <span style="margin-left:0.3rem">{{oldInfo.age}}</span>
      {{$t('JixuVoteMeeting.years')}} )
    </label>
    <label>
      {{$t("Record.Degree")}}:
      {{getLevelText(oldInfo.level)}}
    </label>
    <label>
      {{$t("evaluate.essentialInfo.weight")}}: (
      <input type="number" disabled :value="oldInfo.infoWeight" />kg )
    </label>
  </div>
  <div style="overflow-x:scroll">
    <table cellspacing="0" cellpadding="0" border="1" width="100%" class="table new-table">
      <tr>
        <td class="head-bg" colspan="4">
          <div style="text-align:right">{{$t("Record.Daily")}}</div>
          <div style="text-align: left">{{$t("Record.Project")}}</div>
        </td>
        <td v-for="(item,index) in endTabal" :key="index">{{index+1<10?'0':''}}{{index+1}}</td>
      </tr>

      <!-- 呼吸1-5 -->
      <tr>
        <td rowspan="5" class="head-bg" colspan="2">{{$t("Record.Breathe")}}</td>
        <td class="head-bg" colspan="2">1</td>
        <td style="min-width:0.7rem" v-for="(item,index) in endTabal" :key="index">{{endTabal[index].breathingMorning}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">2</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].breathingMidday}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">3</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].breathingEvening}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">4</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].breathing4}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">5</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].breathing5}}</td>
      </tr>
      <!-- 脉拍1-5 -->
      <tr>
        <td rowspan="5" class="head-bg" colspan="2">{{$t("Record.Pulse")}}</td>
        <td class="head-bg" colspan="2">1</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].pulseMorning}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">2</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].pulseMidday}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">3</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].pulseEvening}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">4</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].pulse4}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">5</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].pulse5}}</td>
      </tr>
      <!-- 体温1-5 -->
      <tr>
        <td rowspan="5" class="head-bg" colspan="2">{{$t("Record.Heat")}}</td>
        <td class="head-bg" colspan="2">1</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].hotMorning}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">2</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].hotMidday}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">3</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].hotEvening}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">4</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].hot4}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">5</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].hot5}}</td>
      </tr>
      <!-- 血压 -->
      <tr>
        <td rowspan="2" class="head-bg" colspan="2">{{$t("Record.pressure")}}(mmHg)</td>
        <td class="head-bg" colspan="2">{{$t("Record.Shrink")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].bloodShrink}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t("Record.Diastole")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].bloodDiastolic}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t("Record.Oxygen")}}（SPO2%）</td>
        <td class="head-bg" colspan="2">{{$t("Record.Morning")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].oxygenSaturation}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t("Record.Blood")}}（mg/dl）</td>
        <td class="head-bg" colspan="2">{{$t("Record.Morning")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].bloodSugar}}</td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="10">{{$t("Record.Eating")}}</td>
        <td class="head-bg" rowspan="6">{{$t("Record.StapleL")}}</td>
        <td class="head-bg" rowspan="2">{{$t("Record.Morning")}}</td>
        <td class="head-bg">{{$t("Record.The")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].stapleFoodMorning}}</td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("Record.Vice")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].nonStapleFoodMorning}}</td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="2">{{$t("Record.Noon")}}</td>
        <td class="head-bg">{{$t("Record.The")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].stapleFoodMidday}}</td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("Record.Vice")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].nonStapleFoodMidday}}</td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="2">{{$t("Record.Afternoon")}}</td>
        <td class="head-bg">{{$t("Record.The")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].stapleFoodEvening}}</td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("Record.Vice")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].nonStapleFoodEvening}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">{{$t("Record.Meal")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].dietaryForm}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">{{$t("Record.Snack")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].snack}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">{{$t("Record.Water")}}(ml)</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].waterIntake>0?endTabal[index].waterIntake:''}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">{{$t("Record.Yes")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].isEat}}</td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="5">{{$t("Record.Excretion")}}</td>
        <td class="head-bg" rowspan="3">{{$t("Record.Defecation")}}</td>
        <td class="head-bg" colspan="2">{{$t("Record.Number")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].defecationCount>0?endTabal[index].defecationCount:''}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t("Record.amount")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].defecationAmount}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t("Record.Shape")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].defecationShape}}</td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="2">{{$t("Record.Urination")}}</td>
        <td class="head-bg" colspan="2">{{$t("Record.Number")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].urinationCount>0?endTabal[index].urinationCount:''}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t("Record.Urine")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].urinationAmount}}</td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="2">{{$t("Record.Clean")}}</td>
        <td class="head-bg" colspan="3">{{$t("Record.Bathing")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].cleanBath?'O':''}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">{{$t("Record.Change")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].cleanClothes?'O':''}}</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="4">{{$t("Record.Focus")}}</td>
        <td v-for="(item,index) in endTabal" :key="index">{{endTabal[index].focus}}</td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import {
  getRecord
} from "../network/kongHX";
export default {
  name: "foodList",
  data() {
    return {
      select_date: "", //查询数据日期
      startDate: "", //本月1号
      endDate: "", //本月最后一天
      thisYear: "", //今年xxxx
      thisMonth: "", //今月xx
      nowDay: "", //今天xxxx-xx-xx
      dayNum: 0, //当月天数
      coningTabal: [],
      endTabal: [],
      dayRow: 0, //本月今天日期
      oldInfo: {}, //老人信息
      gradeList: [{
          id: 1,
          name: this.$t("oldManMsg.Information.support") + "-1"
        },
        {
          id: 2,
          name: this.$t("oldManMsg.Information.support") + "-2"
        },
        {
          id: 3,
          name: this.$t("oldManMsg.Information.support2") + "-1"
        },
        {
          id: 4,
          name: this.$t("oldManMsg.Information.support2") + "-2"
        },
        {
          id: 5,
          name: this.$t("oldManMsg.Information.support2") + "-3"
        },
        {
          id: 6,
          name: this.$t("oldManMsg.Information.support2") + "-4"
        },
        {
          id: 7,
          name: this.$t("oldManMsg.Information.support2") + "-5"
        }
      ]
    };
  },
  created() {
    this.oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    this.getTime();
  },
  methods: {
    // 选择日期查询数据
    onSelectDate(e) {
      const date = e.split("-");
      const year = date[0]
      const month = date[1];
      var day = new Date(year, month, 0).getDate(); //获取指定日期的月总天数
      this.thisYear = year;
      this.thisMonth = month;
      this.startDate = `${year}-${month}-01`;
      this.endDate = `${year}-${month}-${day}`;

      this.init(year, month, day);

      this.getList()
    },
    //返回介护度
    getLevelText(num) {
      for (let i = 0; i < this.gradeList.length; i++) {
        if (num == this.gradeList[i].id) {
          return this.gradeList[i].name;
        }
      }
    },
    async getList() {
      const _this = this;
      this.endTabal.forEach((item, index) => {
        for (var key in item) {
          if (key != 'recordDate') {
            _this.endTabal[index][key] = "";
          }
        }
      });

      try {
        const res = await getRecord({
          id: this.oldInfo.oldId, // 老人id
          startTime: this.startDate,
          endTime: this.endDate
        });
        if (res.code === 0) {
          if (res.data != null) {
            for (var i = 0; i < res.data.length; i++) {
              for (var j = 0; j < this.endTabal.length; j++) {
                var a = res.data[i].recordDate.substr(8, 2);
                var b = this.endTabal[j].recordDate.substr(8, 2);
                if (a == b) {
                  // console.log("有哪几天", a);
                  this.endTabal[j].id = res.data[i].id;
                  this.endTabal[j].recordDate = res.data[i].recordDate;
                  this.endTabal[j].bloodDiastolic = res.data[i].bloodDiastolic;
                  this.endTabal[j].bloodShrink = res.data[i].bloodShrink;
                  this.endTabal[j].bloodSugar = res.data[i].bloodSugar;
                  this.endTabal[j].breathingEvening =
                    res.data[i].breathingEvening;
                  this.endTabal[j].breathing4 = res.data[i].breathing4;
                  this.endTabal[j].breathing5 = res.data[i].breathing5;
                  this.endTabal[j].breathingMidday =
                    res.data[i].breathingMidday;
                  this.endTabal[j].breathingMorning =
                    res.data[i].breathingMorning;
                  this.endTabal[j].cleanBath = res.data[i].cleanBath;
                  this.endTabal[j].cleanClothes = res.data[i].cleanClothes;
                  this.endTabal[j].defecationAmount =
                    res.data[i].defecationAmount;
                  this.endTabal[j].defecationCount =
                    res.data[i].defecationCount;
                  this.endTabal[j].defecationShape =
                    res.data[i].defecationShape;
                  this.endTabal[j].dietaryForm = res.data[i].dietaryForm;
                  this.endTabal[j].focus = res.data[i].focus;
                  this.endTabal[j].hotEvening = res.data[i].hotEvening;
                  this.endTabal[j].hot4 = res.data[i].hot4;
                  this.endTabal[j].hot5 = res.data[i].hot5;
                  this.endTabal[j].hotMidday = res.data[i].hotMidday;
                  this.endTabal[j].hotMorning = res.data[i].hotMorning;
                  this.endTabal[j].isEat = res.data[i].isEat;
                  this.endTabal[j].nonStapleFoodEvening =
                    res.data[i].nonStapleFoodEvening;
                  this.endTabal[j].nonStapleFoodMidday =
                    res.data[i].nonStapleFoodMidday;
                  this.endTabal[j].nonStapleFoodMorning =
                    res.data[i].nonStapleFoodMorning;
                  this.endTabal[j].oxygenSaturation =
                    res.data[i].oxygenSaturation;
                  this.endTabal[j].pulseEvening = res.data[i].pulseEvening;
                  this.endTabal[j].pulse4 = res.data[i].pulse4;
                  this.endTabal[j].pulse5 = res.data[i].pulse5;
                  this.endTabal[j].pulseMidday = res.data[i].pulseMidday;
                  this.endTabal[j].pulseMorning = res.data[i].pulseMorning;
                  this.endTabal[j].snack = res.data[i].snack;
                  this.endTabal[j].stapleFoodEvening =
                    res.data[i].stapleFoodEvening;
                  this.endTabal[j].stapleFoodMidday =
                    res.data[i].stapleFoodMidday;
                  this.endTabal[j].stapleFoodMorning =
                    res.data[i].stapleFoodMorning;
                  this.endTabal[j].urinationAmount =
                    res.data[i].urinationAmount;
                  this.endTabal[j].urinationCount = res.data[i].urinationCount;
                  this.endTabal[j].waterIntake = res.data[i].waterIntake;
                  // this.endTabal[j].weight = res.data[i].weight;
                  break;
                }
              }
            }
          } else if (res.data === null) {
            // this.handerAdd();
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
      var date = new Date();
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      //获取当月天数
      var d = new Date(year, mon, 0).getDate();
      this.dayNum = d;
      var day = date.getDate(); //获取今天日期
      this.dayRow = day;
      if (mon < 10) {
        mon = "0" + mon;
      }
      if (day < 10) {
        day = "0" + day;
      }
      this.thisYear = year;
      this.thisMonth = mon;
      this.startDate = year + "-" + mon + "-" + "01";
      this.endDate = year + "-" + mon + "-" + d;
      this.nowDay = year + "-" + mon + "-" + day;
      console.log("开始" + this.startDate + "结束" + this.endDate);

      //  初始化查询时间
      this.select_date = this.startDate;

      this.init(year, mon, d);

      this.getList();
    },
    // 初始化数据
    init(year, month, day) {
      this.coningTabal = [];
      this.endTabal = [];
      for (var i = 1; i <= day; i++) {
        var every = "";
        if (i < 10) {
          every = year + "-" + month + "-" + "0" + i;
        } else {
          every = year + "-" + month + "-" + i;
        }
        this.coningTabal.push(every);
      }
      console.log(this.coningTabal);
      // console.log(this.coningTabal);
      // 完善数组信息
      this.coningTabal.map((item, index) => {
        this.endTabal.push(
          Object.assign({}, {
            id: "", //记录id
            oldId: this.oldInfo.oldId, //老人id
            oldName: "", //老人名字
            recordDate: item, //记录时间
            level: "", //老人的护理程度
            recordId: "", //填表者id
            recordDate: item,
            bloodDiastolic: "", //血压舒张值
            bloodShrink: "", //血压收缩值
            bloodSugar: "", //血糖值
            breathingEvening: "", //呼吸3
            breathing4: "", //呼吸4
            breathing5: "", //呼吸5
            breathingMidday: "", //呼吸2
            breathingMorning: "", //呼吸1
            cleanBath: "", //清洁入浴
            cleanClothes: "", //清洁变更
            defecationAmount: "", //排便的量
            defecationCount: "", //排便次数
            defecationShape: "", //排便的形状
            dietaryForm: "", //膳食形式
            focus: "", //焦点
            hotEvening: "", //热3
            hot4: "", //热4
            hot5: "", //热5
            hotMidday: "", //热2
            hotMorning: "", //热2
            isEat: "", //是否有吃，1吃过，2没有吃
            nonStapleFoodEvening: "", //副食晚上摄入量
            nonStapleFoodMidday: "", //副食中午摄入量
            nonStapleFoodMorning: "", //副食早上摄入量
            oxygenSaturation: "", //氧饱和度
            pulseEvening: "", //脉冲晚上值
            pulse4: "", //脉冲晚上值
            pulse5: "", //脉冲晚上值
            pulseMidday: "", //脉冲中午值
            pulseMorning: "", //脉冲早上值
            snack: "", //小吃
            stapleFoodEvening: "", //主食晚上摄入量
            stapleFoodMidday: "", //主食中午摄入量
            stapleFoodMorning: "", //主食早上摄入量
            urinationAmount: "", //排尿的量
            urinationCount: "", //排尿的次数
            waterIntake: "", //水分摄入量
            weight: "" //体重（kg）
          })
        );
      });
    }
  }
};
</script>

<style lang="less">
.record {
  .table {
    font-size: 0.14rem;
  }

  .head-bg {
    font-size: 0.14rem;
  }

  .trip-title input {
    border: 0;
    outline: none;
    width: 0.39rem
      /* 40/102 */
    ;
    color: #fff;
    text-align: right;
    margin-right: 0.05rem
      /* 5/102 */
    ;
  }

  .record-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.16rem
      /* 16/102 */
    ;
    line-height: 0.39rem
      /* 40/102 */
    ;
    color: #000;

    input {
      border: 0;
      outline: none;
      width: 0.98rem
        /* 100/102 */
      ;
      color: #000;
      text-align: center;
      margin-right: 0.05rem
        /* 5/102 */
      ;
    }
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

table td {
  text-align: center;
}
</style>
