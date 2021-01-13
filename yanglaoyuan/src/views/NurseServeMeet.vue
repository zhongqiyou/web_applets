<template>
  <div class="serve-meet">
    <div class="trip-title">{{ $t("nurseServe.title") }}</div>

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
              >{{ item.date }}</Option
            >
          </Select>
        </div>
      </div>
    </div>

    <table class="table new-table" width="100%">
      <tr>
        <td class="head-bg">{{ $t("nurseServe.table.username") }}</td>
        <td>
          {{ oldInfo.name }}{{ $t(oldInfo.name ? "global.honorific" : "") }}
        </td>
        <td class="head-bg" colspan="2">
          {{ $t("nurseServe.table.facilityName") }}
        </td>
        <td colspan="2">
          <Input type="textarea" :autosize="true" v-model="data.chargeName" />
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{ $t("nurseServe.table.holdingDay") }}</td>
        <td>
          <DatePicker
            class="calendarFont"
            :editable="false"
            :value="data.beginDate"
            format="yyyy-MM-dd HH:mm"
            size="large"
            type="datetime"
            :placeholder="$t('global.choose')"
            style="width: 100%"
            @on-change="changDay($event)"
            @focus="this.blur()"
          ></DatePicker>
        </td>
        <td class="head-bg">{{ $t("nurseServe.table.meetingPlace") }}</td>
        <td>
          <Input type="textarea" :autosize="true" v-model="data.place" />
        </td>
        <td class="head-bg">{{ $t("serviceMetting.held") }}</td>
        <td>
          <Input
            type="textarea"
            :autosize="{ minRows: 1 }"
            v-model="data.num"
            style="width: 1rem;"
          />
          {{ $t("serviceMetting.Time1") }}
        </td>
      </tr>
    </table>

    <table
      class="table new-table"
      style="margin-top: 0.2rem;"
      cellspacing="0"
      cellpadding="0"
      border="1"
      width="100%"
    >
      <tr>
        <td class="head-bg" rowspan="4" colspan="1" style="width: 1.2rem;">
          {{ $t("nurseServe.table.MeetingAttendees") }}
        </td>
        <td class="head-bg" rowspan="4" colspan="1">
          {{ $t("nurseServe.table.family") }}
        </td>
        <td rowspan="4" colspan="1">
          <div class="cell">
            <Input
              type="textarea"
              :autosize="{ minRows: 4 }"
              v-model="data.attendeesFamily"
            />
          </div>
        </td>
        <td class="head-bg" rowspan="4" colspan="1">
          {{ $t("nurseServe.table.chengshanyuan") }}
        </td>
        <td class="head-bg" colspan="2">
          {{ $t("nurseServe.table.postName") }}
        </td>
        <td class="head-bg" colspan="2">
          {{ $t("nurseServe.table.postName") }}
        </td>
        <td class="head-bg" colspan="2">
          {{ $t("nurseServe.table.postName") }}
        </td>
      </tr>
      <tr>
        <td class="Profession">Dr</td>
        <td>
          <Input
            type="textarea"
            :autosize="true"
            v-model="data.attendeesStaff[0]"
          />
        </td>
        <td class="Profession">Ns</td>
        <td>
          <Input
            type="textarea"
            :autosize="true"
            v-model="data.attendeesStaff[1]"
          />
        </td>
        <td class="Profession">Cw</td>
        <td>
          <Input
            type="textarea"
            :autosize="true"
            v-model="data.attendeesStaff[2]"
          />
        </td>
      </tr>
      <tr>
        <td class="Profession">Sw</td>
        <td>
          <Input
            type="textarea"
            :autosize="true"
            v-model="data.attendeesStaff[3]"
          />
        </td>
        <td class="Profession">Dt</td>
        <td>
          <Input
            type="textarea"
            :autosize="true"
            v-model="data.attendeesStaff[4]"
          />
        </td>
        <td class="Profession">Pt</td>
        <td>
          <Input
            type="textarea"
            :autosize="true"
            v-model="data.attendeesStaff[5]"
          />
        </td>
      </tr>
      <tr>
        <td class="Profession">Ot</td>
        <td>
          <Input
            type="textarea"
            :autosize="true"
            v-model="data.attendeesStaff[6]"
          />
        </td>
        <td class="Profession">St</td>
        <td>
          <Input
            type="textarea"
            :autosize="true"
            v-model="data.attendeesStaff[7]"
          />
        </td>
        <td class="Profession">Cm</td>
        <td>
          <Input
            type="textarea"
            :autosize="true"
            v-model="data.attendeesStaff[8]"
          />
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="1">
          {{ $t("nurseServe.table.researchedProjects") }}
        </td>
        <td colspan="9">
          <div class="cell" style="text-align:left">
            <CheckboxGroup v-model="data.project">
              <Checkbox label="1">{{ $t("nurseServe.table.based") }}</Checkbox>
              <Checkbox label="2">{{
                $t("nurseServe.table.original")
              }}</Checkbox
              ><br />
              <Checkbox label="3">{{ $t("nurseServe.table.other") }}</Checkbox>
              (
              <Input
                class="inputMe"
                style="width:2rem;"
                v-model="data.projectContent"
                type="textarea"
                :autosize="{ minRows: 1 }"
              />)
            </CheckboxGroup>
          </div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="1">
          {{ $t("nurseServe.table.content") }}
        </td>
        <td colspan="9">
          <div class="cell">
            <Input
              type="textarea"
              :autosize="{ minRows: 2 }"
              v-model="data.content"
            />
          </div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="1">
          {{ $t("nurseServe.table.futureDirection") }}
        </td>
        <td colspan="9">
          <div class="cell" style="text-align: left;">
            <Input
              type="textarea"
              :autosize="{ minRows: 2 }"
              v-model="data.conclusionFuture"
            />
          </div>
        </td>
      </tr>
    </table>

    <table
      class="table new-table"
      style="margin-top: 0.2rem;"
      cellspacing="0"
      cellpadding="0"
      border="1"
      width="100%"
    >
      <tr>
        <td class="head-bg" rowspan="5" style="width: 1.2rem;">
          {{ $t("nurseServe.table.monitoringMethod") }}
        </td>
        <td
          colspan="5"
          style="text-align: left;position: relative;"
          class="cell"
        >
          {{ $t("nurseServe.table.duringImplementation") }}：
          <DatePicker
            class="calendarFont"
            type="daterange"
            placement="bottom-end"
            :placeholder="$t('global.choose')"
            style="width: 2.5rem"
            size="large"
            :editable="false"
            format="yyyy-MM-dd"
            :value="implementTime"
            @on-change="implementTime = $event"
            @focus="this.blur()"
          ></DatePicker>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="cell">
          {{ $t("nurseServe.table.NurseCountColumn") }}
        </td>
        <td colspan="2" class="cell">
          {{ $t("nurseServe.table.NursingSupport") }}
        </td>
      </tr>
      <tr>
        <td class="cell">{{ $t("nurseServe.table.implementationStatus") }}</td>
        <td class="cell">{{ $t("nurseServe.table.familySatisfaction") }}</td>
        <td class="cell">{{ $t("nurseServe.table.newSubject") }}</td>
        <td class="cell">{{ $t("nurseServe.table.goalAchievement") }}</td>
        <td class="cell">{{ $t("nurseServe.table.futurePolicy") }}</td>
      </tr>
      <tr style="text-align: left">
        <td>
          <RadioGroup v-model="data.executionStatus">
            <Radio
              @mouseup.native="handleRadioGroup('executionStatus', '1')"
              label="1"
              >{{ $t("nurseServe.table.executeAsPlanned") }}</Radio
            >
            <br />
            <Radio
              @mouseup.native="handleRadioGroup('executionStatus', '2')"
              label="2"
              >{{ $t("nurseServe.table.BasicallyAsPlanned") }}</Radio
            >
            <Radio
              @mouseup.native="handleRadioGroup('executionStatus', '3')"
              label="3"
              >{{ $t("nurseServe.table.NotImplemented") }}</Radio
            >
            <Radio
              @mouseup.native="handleRadioGroup('executionStatus', '4')"
              label="4"
              >{{ $t("nurseServe.table.NotPerformed") }}</Radio
            >
          </RadioGroup>
        </td>
        <td>
          <RadioGroup v-model="data.satisfaction">
            <Radio
              @mouseup.native="handleRadioGroup('satisfaction', '1')"
              label="1"
              >{{ $t("nurseServe.table.satisfaction") }}</Radio
            >
            <br />
            <Radio
              @mouseup.native="handleRadioGroup('satisfaction', '2')"
              label="2"
              >{{ $t("nurseServe.table.basicallySatisfied") }}</Radio
            >
            <Radio
              @mouseup.native="handleRadioGroup('satisfaction', '3')"
              label="3"
              >{{ $t("nurseServe.table.littleSatisfied") }}</Radio
            >
            <Radio
              @mouseup.native="handleRadioGroup('satisfaction', '4')"
              label="4"
              >{{ $t("nurseServe.table.dissatisfied") }}</Radio
            >
          </RadioGroup>
        </td>
        <td>
          <RadioGroup v-model="data.subject">
            <Radio
              @mouseup.native="handleRadioGroup('subject', '1')"
              label="1"
              >{{ $t("nurseServe.table.have") }}</Radio
            >
            <br />
            <Radio
              @mouseup.native="handleRadioGroup('subject', '2')"
              label="2"
              >{{ $t("nurseServe.table.nothingSpecial") }}</Radio
            >
          </RadioGroup>
          <br />
          <div class="detailed">
            {{ $t("nurseServe.table.details") }}：
            <Input
              type="textarea"
              :autosize="{ minRows: 1 }"
              v-model="data.subjectContent"
            />
          </div>
        </td>
        <td>
          <RadioGroup v-model="data.goal">
            <Radio @mouseup.native="handleRadioGroup('goal', '1')" label="1">{{
              $t("nurseServe.table.alreadyReached")
            }}</Radio>
            <br />
            <Radio @mouseup.native="handleRadioGroup('goal', '2')" label="2">{{
              $t("nurseServe.table.basicallyReached")
            }}</Radio>
            <Radio @mouseup.native="handleRadioGroup('goal', '3')" label="3">{{
              $t("nurseServe.table.unacommpolished")
            }}</Radio>
          </RadioGroup>
        </td>
        <td>
          <RadioGroup v-model="data.policy">
            <Radio
              @mouseup.native="handleRadioGroup('policy', '1')"
              label="1"
              >{{ $t("nurseServe.table.carryOn") }}</Radio
            >
            <br />
            <Radio
              @mouseup.native="handleRadioGroup('policy', '2')"
              label="2"
              >{{ $t("nurseServe.table.change") }}</Radio
            >
            <Radio
              @mouseup.native="handleRadioGroup('policy', '3')"
              label="3"
              >{{ $t("nurseServe.table.AbortTermination") }}</Radio
            >
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td
          colspan="5"
          class="cell"
          style="text-align: right; overflow: hidden;"
        >
          <div class="cell" style="display: flex; align-items: center;">
            {{ $t("nurseServe.table.careName") }}：
            <Input
              class="name"
              type="textarea"
              :autosize="{ minRows: 1 }"
              v-model="data.careName"
            />
            {{ $t("nurseServe.table.careName2") }}：
            <Input
              class="name"
              type="textarea"
              :autosize="{ minRows: 1 }"
              v-model="data.name"
            />
          </div>
        </td>
      </tr>
    </table>

    <table
      class="table table-footer new-table"
      style="margin-top: 0.2rem;overflow: visible;"
      cellspacing="0"
      cellpadding="0"
      border="1"
      width="100%"
    >
      <tr>
        <td class="head-bg" colspan="1" style="width: 1.2rem;">
          {{ $t("nurseServe.table.familyExplanation") }}
        </td>
        <td colspan="3">
          <div class="dateBox">
            <DatePicker
              :editable="false"
              class="calendarFont"
              :value="data.explanation"
              format="yyyy-MM-dd"
              type="date"
              :placeholder="$t('global.sele')"
              style="width: 100%"
              @on-change="data.explanation = $event"
              @focus="this.blur()"
            ></DatePicker>
          </div>
        </td>
        <td class="head-bg" colspan="1" style="width: 1rem;">
          {{ $t("nurseServe.table.personalSignature") }}
        </td>
        <td colspan="2">
          <div class="cell">
            <Input
              type="textarea"
              :autosize="{ minRows: 1 }"
              v-model="data.signatureSelf"
            />
          </div>
        </td>
        <td class="head-bg" colspan="1" style="width: 1rem;">
          {{ $t("nurseServe.table.familySignature") }}
        </td>
        <td colspan="2">
          <div class="cell">
            <Input
              type="textarea"
              :autosize="{ minRows: 1 }"
              v-model="data.signatureFamily"
            />
          </div>
        </td>
        <td class="head-bg" colspan="1" style="width: 1.2rem;">
          {{ $t("nurseServe.table.signature") }}
        </td>
        <td colspan="2">
          <div class="cell">
            <Input
              type="textarea"
              :autosize="{ minRows: 1 }"
              v-model="data.signatureSpecifier"
            />
          </div>
        </td>
      </tr>
    </table>

    <div class="tip_text">
      ※Dr.{{ $t("serviceMetting.Doctors") }}、Ns.{{
        $t("serviceMetting.nurse")
      }}、Cw.{{ $t("serviceMetting.consultant") }}、Sw.{{
        $t("serviceMetting.Nutrition")
      }}、Dt.{{ $t("serviceMetting.Physiotherapist") }}、Pt.{{
        $t("serviceMetting.Occupational")
      }}、Ot.{{ $t("FacilitiesPlan3.therapist") }}、St.{{
        $t("serviceMetting.Speech")
      }}、Cm.{{ $t("serviceMetting.Nursing") }}
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
import { getDateById } from "../network/kongHX";
import { format } from "../assets/utils/Tools";
export default {
  data() {
    return {
      data: {
        attendeesFamily: "", //会议出席人（家属）
        attendeesStaff: ["", "", "", "", "", "", "", "", ""], //会议出席人（员工），多个员工用英文逗号拼接起来
        beginDate: "", //召开日,格式：yyyy-MM-dd
        careName: "", //护理姓名
        chargeName: "", //负责人名称
        conclusionFuture: "", //结论未来方向
        content: "", //研究内容
        executionStatus: "", //执行状况
        explanation: "", //家人的解释
        goal: "", //目标达成度
        id: "",
        name: "", //姓名(看护姓名后面一个)
        num: "", //召开次数
        ownerId: 0, //使用者id
        ownerName: "", //使用者名称
        place: "", //召开场所
        policy: "", //之后的方针
        project: [], //研究过的项目
        projectContent: "", //当project字段为3时的内容
        recordId: 0,
        satisfaction: "", //本人、家属满意度
        signatureFamily: "", //家族签名
        signatureSelf: "", //本人签名
        signatureSpecifier: "", //说明者签名
        subject: "", //新课题
        periodStart: "", //实施期间开始时间
        periodEnd: "", //实施期间结束时间
        subjectContent: "" //新课题内容
      },
      implementTime: [], //实施期间
      topYear: "",
      topMonth: "",
      topDay: "",
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
          type: 21
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
    //实施期间
    getimplTime(e) {
      console.log(e);
    },
    //处理选择单选框(取消选择)
    handleRadioGroup(type, value) {
      if (this.data[type] == value) {
        setTimeout(() => {
          this.data[type] = "";
        }, 10);
      }
    },
    getData() {
      func
        .getMeetingCare({
          id: this.oldInfo.oldId,
          createDate: this.data.createTime
        })
        .then(res => {
          if (res.data) {
            this.data = res.data;
            // 目标达成度
            this.data.goal = res.data.goa
              ? res.data.goal.toString()
              : res.data.goa;
            //执行状况
            this.data.executionStatus = res.data.executionStatus
              ? res.data.executionStatus.toString()
              : res.data.executionStatus;
            //召开次数
            this.data.num = res.data.num
              ? res.data.num.toString()
              : res.data.num;
            //之后的方针
            this.data.policy = res.data.policy
              ? res.data.policy.toString()
              : res.data.policy;
            //新课题
            this.data.subject = res.data.subject
              ? res.data.subject.toString()
              : res.data.subject;
            //本人、家属满意度
            this.data.satisfaction = res.data.satisfaction
              ? res.data.satisfaction.toString()
              : res.data.satisfaction;
            //实施期间
            this.implementTime = [res.data.periodStart, res.data.periodEnd];
            //会议出席人（员工）
            this.data.attendeesStaff = JSON.parse(res.data.attendeesStaff);
            //研究过的项目
            this.data.project = JSON.parse(res.data.project);
            console.log("获取到", this.data);
          }
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
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
          // 出席会议的员工
          this.data.attendeesStaff = JSON.stringify(this.data.attendeesStaff);
          // 目标达成度
          this.data.goal = parseInt(this.data.goal);
          //执行状况
          this.data.executionStatus = parseInt(this.data.executionStatus);
          //召开次数
          this.data.num = parseInt(this.data.num);
          //之后的方针
          this.data.policy = parseInt(this.data.policy);
          //新课题
          this.data.subject = parseInt(this.data.subject);
          //本人、家属满意度
          this.data.satisfaction = parseInt(this.data.satisfaction);
          //实施期间
          this.data.periodStart = this.implementTime[0];
          this.data.periodEnd = this.implementTime[1];
          this.data.project = JSON.stringify(this.data.project);
          // console.log("请求数据", this.data);

          //判断之前有没有这个日期
          getDateById({
            oldManId: this.oldInfo.oldId,
            type: 21,
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
                console.log("没有这个日期");
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
      func
        .subMeetingCare(this.data)
        .then(res => {
          if (res.code === 0) {
            this.$Notice.success({
              title: this.$t("global.operationSuccess")
            });
            this.getDetaList();
          } else if (res.data) {
            this.$Notice.error({
              title: this.$t("global.operationFail"),
              desc: this.$t("global,claim")
            });
          } else {
            this.$Notice.error({
              title: this.$t("global.operationFail")
            });
          }
          console.log(res, "res");
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    //获取今天日期yyyy-MM-dd
    getTime() {
      var date = new Date();
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var day = date.getDate();
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
<style>
</style>

<style lang="less">
.serve-meet {
  .table {
    td {
      font-size: 0.14rem;
      .detailed {
        width: 100%;
        font-size: 0.14rem;
        display: flex;
        align-items: center;
        .ivu-input-wrapper {
          width: 1rem;
        }
      }
      .dateBox {
        position: relative;
      }
    }
    .cell {
      input {
        border: 0;
        outline: none;
        width: 100%;
        padding: 0 0.1rem;
      }
      textarea {
        border: 0;
        outline: none;
        width: 100%;
        padding: 0 0.1rem;
      }
    }
    .flex {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      white-space: nowrap;
    }
    .date {
      width: 0.5rem !important;
      text-align: right;
    }
    .name {
      width: 2rem !important;
    }
  }
  .table-footer {
    .date {
      width: 0.5rem !important;
      text-align: right;
    }
    .input {
      width: 0.8rem;
    }
  }
}
</style>
<style lang="less">
.serve-meet {
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
