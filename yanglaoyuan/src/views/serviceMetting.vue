<template>
<div class="serviceMetting">
  <div class="trip-title">{{ $t("serviceMetting.title") }}</div>

  <div class="deta_header">
    <!-- 筛选条件 -->
    <div class="selectBox">
      <div class="year">
        <DatePicker class="calendarFont" type="year" style="100% 100%" format="yyyy" v-model="occurrenceYear" @on-change="changYear($event)"></DatePicker>
      </div>
      <div class="occurrenceDay">
        <Select v-model="occurrenceDay" style="width: 100%" @on-change="changTable($event)">
          <Option v-for="item in occurrenceDayList" :value="item.date" :key="item.date">{{ item.date }}</Option>
        </Select>
      </div>
    </div>
  </div>

  <table class="table new-table" cellspacing="0" cellpadding="0" border="1" width="100%">
    <tr>
      <td class="head-bg" colspan="1" style="width: 1.2rem;">
        {{ $t("serviceMetting.username") }}
      </td>
      <td>
        <!-- <Input type="textarea" :autosize="true" v-model="data.ownerName" /> -->
        {{ oldInfo.name }}{{ $t(oldInfo.name ? "global.honorific" : "") }}
      </td>
      <td class="head-bg">{{ $t("serviceMetting.name") }}</td>
      <td>
        <Input type="textarea" :autosize="true" v-model="data.chargeName" />
      </td>
      <td class="head-bg" colspan="1" style="min-width:1rem">
        {{ $t("serviceMetting.specialist") }}
      </td>
      <td>
        <div class="cell">
          <Input type="textarea" :autosize="true" v-model="data.specialMember" />
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{ $t("serviceMetting.time") }}</td>
      <td>
        <div class="cell flex">
          <DatePicker class="calendarFont" :editable="false" :value="data.beginDate" format="yyyy-MM-dd HH:mm" size="large" type="datetime" style="width: 100%" @on-change="changDay($event)" @focus="this.blur()"></DatePicker>
        </div>
      </td>
      <td class="head-bg">{{ $t("serviceMetting.Venue") }}</td>
      <td>
        <Input type="textarea" :autosize="true" v-model="data.place" />
      </td>
      <td class="head-bg">{{ $t("serviceMetting.held") }}</td>
      <td>
        <div class="cell flex">
          <Input type="textarea" :autosize="{ minRows: 1 }" v-model="data.num" style="width: 1rem;" />
          {{ $t("serviceMetting.Time1") }}
        </div>
      </td>
    </tr>
  </table>

  <table class="table new-table" style="margin-top: 0.2rem;font-size: 0.14rem;" cellspacing="0" cellpadding="0" border="1" width="100%">
    <tr>
      <td class="head-bg" rowspan="4" colspan="1" style="width: 1.2rem;">
        {{ $t("serviceMetting.Meeting") }}
      </td>
      <td class="head-bg" rowspan="4" colspan="1">
        {{ $t("serviceMetting.Family") }}
      </td>
      <td rowspan="4" colspan="1">
        <Input type="textarea" :autosize="{ minRows: 8 }" v-model="data.attendeesFamily" />
      </td>
      <td class="head-bg" rowspan="4" colspan="1">
        {{ $t("serviceMetting.Mountain") }}
      </td>
      <td class="head-bg" colspan="2">{{ $t("serviceMetting.Position") }}</td>
      <td class="head-bg" colspan="2">{{ $t("serviceMetting.Position") }}</td>
      <td class="head-bg" colspan="2">{{ $t("serviceMetting.Position") }}</td>
    </tr>
    <!-- <tr v-for="(item, index) in 3" :key="index">
        <td colspan="2" v-for="(itemC, indexC) in 3" :key="indexC">
          <div class="cell">
            <input v-model="staffList[index * 3 + indexC]" />
          </div>
        </td>
      </tr>-->
    <tr>
      <td class="Profession">Dr</td>
      <td>
        <Input class="minWidth" type="textarea" :autosize="true" v-model="data.attendeesStaff[0]" />
      </td>
      <td class="Profession">Ns</td>
      <td>
        <Input class="minWidth" type="textarea" :autosize="true" v-model="data.attendeesStaff[1]" />
      </td>
      <td class="Profession">Cw</td>
      <td>
        <Input class="minWidth" type="textarea" :autosize="true" v-model="data.attendeesStaff[2]" />
      </td>
    </tr>
    <tr>
      <td class="Profession">Sw</td>
      <td>
        <Input class="minWidth" type="textarea" :autosize="true" v-model="data.attendeesStaff[3]" />
      </td>
      <td class="Profession">Dt</td>
      <td>
        <Input class="minWidth" type="textarea" :autosize="true" v-model="data.attendeesStaff[4]" />
      </td>
      <td class="Profession">Pt</td>
      <td>
        <Input class="minWidth" type="textarea" :autosize="true" v-model="data.attendeesStaff[5]" />
      </td>
    </tr>
    <tr>
      <td class="Profession">Ot</td>
      <td>
        <Input class="minWidth" type="textarea" :autosize="true" v-model="data.attendeesStaff[6]" />
      </td>
      <td class="Profession">St</td>
      <td>
        <Input class="minWidth" type="textarea" :autosize="true" v-model="data.attendeesStaff[7]" />
      </td>
      <td class="Profession">Cm</td>
      <td>
        <Input class="minWidth" type="textarea" :autosize="true" v-model="data.attendeesStaff[8]" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="1">
        {{ $t("serviceMetting.Researched") }}
      </td>
      <td colspan="9">
        <div class="cell" style="text-align: left;">
          <CheckboxGroup v-model="data.project">
            <Checkbox label="1">{{ $t("serviceMetting.Based1") }}</Checkbox>
            <Checkbox label="2">{{ $t("serviceMetting.Based2") }}</Checkbox><br />
            <Checkbox label="3">{{ $t("serviceMetting.Based3") }}</Checkbox>
            (<Input class="inputMe" style="width:2rem;margin-top: 0.12rem;" v-model="data.projectContent" type="textarea" :autosize="{ minRows: 1 }" />)<br />
            <Checkbox label="4">{{ $t("serviceMetting.collect") }}</Checkbox>
            （{{ $t("serviceMetting.Occupation") }}：
            <Input class="inputMe" style="width:2rem;margin-top: 0.12rem;" v-model="data.projectContent4" type="textarea" :autosize="{ minRows: 1 }" />)
          </CheckboxGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="1">{{ $t("serviceMetting.Research") }}</td>
      <td colspan="9">
        <Input type="textarea" :autosize="true" v-model="data.content" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="1">
        {{ $t("serviceMetting.Conclusion") }}
      </td>
      <td colspan="4">
        <div class="cell" style="text-align: left;">
          <CheckboxGroup v-model="data.conclusion">
            <Checkbox label="1">{{
                $t("serviceMetting.Implement1")
              }}</Checkbox>
            <Checkbox label="2">{{
                $t("serviceMetting.Implement2")
              }}</Checkbox>
          </CheckboxGroup>
          <Input class="inputMe" v-model="data.conclusionSelf" type="textarea" :autosize="{ minRows: 1 }" />
        </div>
      </td>
      <td colspan="5">
        <div class="cell" style="text-align: left; padding-left: 0.25rem;">
          {{ $t("serviceMetting.Description1") }}
          <CheckboxGroup v-model="data.conclusion">
            <Checkbox style="margin-right:0.2rem" label="3">{{
                $t("serviceMetting.Description2")
              }}</Checkbox>
            <Checkbox label="4">{{
                $t("serviceMetting.Description3")
              }}</Checkbox>
            <br />
            <Checkbox style="margin-right:0.2rem" label="5">{{
                $t("serviceMetting.Description4")
              }}</Checkbox>
            <Checkbox label="6">{{
                $t("serviceMetting.Description5")
              }}</Checkbox>
            <br />
            <Checkbox label="7">{{
                $t("serviceMetting.Description6")
              }}</Checkbox>
          </CheckboxGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="1">
        {{ $t("serviceMetting.Remaining") }}
      </td>
      <td colspan="9">
        <div class="cell flex">
          {{ $t("serviceMetting.meeting") }} <span class="required">*</span>
          <div style="position: relative;">
            <DatePicker class="calendarFont" :editable="false" :value="data.nextTime" format="yyyy-MM" type="month" placeholder="请选择" style="width: 2rem" @on-change="data.nextTime = $event" @focus="this.blur()"></DatePicker>
          </div>
          {{ $t("serviceMetting.Diskusi") }}
          <Input v-model="data.remainingCourses" type="textarea" :autosize="{ minRows: 1 }" />
        </div>
      </td>
    </tr>
  </table>

  <div class="tip_text">
    ※Dr. {{ $t("serviceMetting.Diskusi") }}、 Ns.{{
        $t("serviceMetting.nurse")
      }}、 Cw.{{ $t("serviceMetting.consultant") }}、 Sw.{{
        $t("serviceMetting.Nutrition")
      }}、 Dt.{{ $t("serviceMetting.Physiotherapist") }}、 Pt.{{
        $t("serviceMetting.Occupational")
      }}、 Ot.{{ $t("serviceMetting.Occupational") }}、 St.{{
        $t("serviceMetting.Speech")
      }}、 Cm.{{ $t("serviceMetting.Nursing") }}
  </div>

  <div class="table-submit">
    <!-- <button>
        <i class="iconfont icon-baocun"></i>
        {{$t('global.preservation')}}
      </button>-->
    <button @click="submit">
      <i class="iconfont icon-submit"></i>
      {{ $t("global.submit") }}
    </button>
  </div>
</div>
</template>

<script>
import func from "../network/leo";
import {
  jsonp
} from "vue";
import {
  getDateById
} from "../network/kongHX";
import {
  format
} from "../assets/utils/Tools";
export default {
  data() {
    return {
      data: {
        id: "",
        ownerId: 0,
        ownerName: "",
        conclusionSelf: "本人：", //结论里面的本人
        attendeesFamily: "", //会议出席人（家属）
        attendeesStaff: ["", "", "", "", "", "", "", "", ""], //会议出席人（员工），多个员工用英文逗号拼接起来
        beginDate: "", //召开日,格式：yyyy-MM-dd
        chargeName: "", //负责人名称
        conclusion: [], //结论
        content: "", //研究内容
        createTime: "", //创建时间
        nextTime: "", //下次召开时间
        num: null, //召开次数
        place: "", //召开场所
        project: [], //研究过的项目
        projectContent: "", //当project字段为3时的内容
        projectContent4: "", //当project字段为4时的内容
        recordId: 0,
        remainingCourses: "", //剩余课程
        specialMember: "" //专门员
      },
      nextTime: "",
      // staffList: ["", "", "", "", "", "", "", "", ""],
      oldInfo: {},
      occurrenceYear: format(new Date(), "YYYY"),
      occurrenceDay: "",
      occurrenceDayList: [],
      year: ""
    };
  },
  methods: {
    //获取生成日列表
    async getDetaList() {
      try {
        const res = await getDateById({
          oldManId: this.oldInfo.oldId,
          year: this.year,
          type: 20
        });
        if (res.code === 0) {
          if (res.data.length) {
            this.occurrenceDayList = res.data;
            this.occurrenceDay = res.data[0].date;
            this.data.createTime = res.data[0].date.substring(0, 10);
            this.getData();
          } else {
            this.occurrenceDayList = res.data;
            this.occurrenceDay = "";
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
    //切换召开日
    changDay(e) {
      if (e) {
        this.data.beginDate = e;
        this.data.createTime = this.data.beginDate.substring(0, 10);
        console.log("第一个", this.data.createTime);
      }
    },
    //根据生成日切换表格
    changTable(e) {
      if (e) {
        this.data.createTime = e;
        this.getData();
      }
    },
    //切换年份
    changYear(e) {
      this.year = e;
      this.occurrenceYear = e;
      this.getDetaList();
    },
    //处理选择单选框(取消选择)
    handleRadioGroup(type, value) {
      if (this.data[type] == value) {
        setTimeout(() => {
          this.data[type] = "";
        }, 10);
      }
    },
    //获取
    getData() {
      func
        .getServiceMeeting({
          id: this.oldInfo.oldId,
          createDate: this.data.createTime
        })
        .then(res => {
          if (res.data) {
            this.data = res.data;
            this.data.nextTime = this.data.nextTime.substring(
              0,
              this.data.nextTime.length - 2
            );
            this.data.conclusion = JSON.parse(res.data.conclusion);
            this.data.attendeesStaff = JSON.parse(res.data.attendeesStaff);
            this.data.project = JSON.parse(res.data.project);
          }
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    //提交
    submit() {
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("global.submitInfo"),
        okText: this.$t("global.sure"),
        cancelText: this.$t("global.cancel"),
        onOk: async () => {
          if (!this.data.beginDate) {
            this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: this.$t("serviceMetting.tipTime1")
            });
            return false;
          }
          if (!this.data.nextTime) {
            this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: this.$t("serviceMetting.tipTime2")
            });
            return false;
          }

          //判断之前有没有这个日期
          getDateById({
            oldManId: this.oldInfo.oldId,
            type: 20,
            year: this.data.createTime.substring(0, 4)
          }).then(res => {
            if (res.code == 0) {
              let result = true; //默认该生成日为添加
              if (res.data.length) {
                for (let i = 0; i < res.data.length; i++) {
                  if (this.data.createTime === res.data[i].date) {
                    //该生成日的年份里有该数据，修改该日期的
                    result = false;
                  }
                }
              } else {
                //该生成日的年份里没有数据，添加该日期的
                result = true;
              }
              //判断是修改还是添加
              console.log("createTime", this.data.createTime);
              if (result) {
                this.data.id = "";
                this.handerAddandEdit();
              } else {
                this.handerAddandEdit();
              }
            }
          });
        }
      });
    },
    handerAddandEdit() {
      var requestData = this.data;
      requestData.attendeesStaff = JSON.stringify(requestData.attendeesStaff);
      //下次预定日期
      requestData.nextTime = requestData.nextTime + "-01";
      //处理多选框
      requestData.conclusion = JSON.stringify(requestData.conclusion);
      //召开次数
      requestData.num = parseInt(requestData.num);
      //研究过的项目
      requestData.project = JSON.stringify(requestData.project);
      func
        .subServiceMeeting(requestData)
        .then(res => {
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
          console.log(res, "res");
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    getTime() {
      var date = new Date();
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var day = date.getDate(); //获取今天日期1.2.3...
      if (mon < 10) {
        mon = "0" + mon;
      }
      if (day < 10) {
        day = "0" + day;
      }
      this.data.createTime = year + "-" + mon + "-" + day;
      this.data.beginDate = year + "-" + mon + "-" + day + " 00:00";
    }
  },
  created() {
    this.oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    this.data.ownerId = this.oldInfo.oldId;
    this.data.ownerName = this.oldInfo.name;
    this.getTime();
    this.year = JSON.stringify(new Date().getFullYear());
  },
  mounted() {
    this.getDetaList();
  }
};
</script>

<style lang="less" scoped>
.serviceMetting {
  .head-bg {
    font-size: 0.14rem;
  }

  td {
    font-size: 0.14rem;
    white-space: pre-wrap;
  }

  input {
    border: 0;
    outline: none;
    width: 100%;
    padding: 0 0.1rem;
  }

  .short {
    width: 0.6rem !important;
    text-align: right;
  }

  .Profession {
    font-size: 0.14rem;
  }

  .minWidth {
    min-width: 1rem;
  }
}
</style><style lang="less">
.serviceMetting {
  textarea.ivu-input {
    font-size: 0.14rem !important;
  }

  .inputMe textarea.ivu-input {
    color: #333;
    font-size: 14px !important;
    text-align: left;
  }
}
</style>
