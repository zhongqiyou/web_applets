<template>
<div class="sheet">
  <div class="trip-title">{{ title }}</div>
  <div style="text-align: right; font-size: .16rem;margin-bottom: .1rem;">
    {{ $t("monitorRegular.firstDate") }}:{{
        info.date.year +
          " 年 " +
          info.date.month +
          " 月 " +
          info.date.day +
          " 日"
      }}
  </div>
  <table class="table monitorTable new-table" border="1px" cellspacing="1" cellpadding="0">
    <tr>
      <td colspan="2" class="head-bg" style="max-width: 1.5rem;">
        {{ $t("monitorRegular.solved") }}
      </td>
      <td colspan="2" style="max-width: 2rem;" class="alignLeft">
        {{ formData.subjectRequirement }}
      </td>
      <td colspan="2" class="head-bg">{{ $t("monitorRegular.username") }}</td>
      <td colspan="2" class="alignLeft">
        {{ formData.oldManName }}{{ $t("global.mr") }}
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{ $t("monitorRegular.goals") }}</td>
      <td colspan="2" class="alignLeft">{{ formData.longTermGoal }}</td>
      <td class="head-bg">{{ $t("monitorRegular.formulator") }}</td>
      <td class="alignLeft" style="min-width: 1rem;white-space: pre-wrap;">
        {{ formData.principal }}
      </td>
      <td style="white-space:nowrap;" class="head-bg">
        {{ $t("monitorRegular.recipe") }}
      </td>
      <td colspan="2" class="alignLeft" style="min-width:2rem;vertical-align:top;">
        {{ formData.aidPeriod}}
      </td>
    </tr>
  </table>

  <template v-if="formData.type == 'try'">
    <table class="table sheetTable new-table" border="1px" cellspacing="1" cellpadding="0" style="1px solid #63af1e;">
      <tbody v-for="(item, index) in formData.serviceContent" :key="item + index">
        <tr>
          <td class="head-bg" colspan="1">{{ $t("monitorRegular.goal") }}</td>
          <td colspan="4" class="head-bg">
            {{ $t("monitorRegular.period") }}
          </td>
        </tr>
        <tr>
          <td colspan="1">
            {{ formData.shortTermGoal[index] }}
            <!--  <Input type="textarea" autosize v-model="" /> -->
          </td>
          <td colspan="4" class="alignLeft">
            <div>
              {{ $t("FacilitiesPlan1.Period") }}:{{
                  formData.shortPeriod[index]
                }}
            </div>
            <Input disabled type="textarea" autosize v-model="formData.serviceContent[index]" />
          </td>
        </tr>
        <tr>
          <!-- <td
            colspan="5"
            style="text-align:left"
          >{{index+1}}{{$t('monitorRegular.per')}}：{{index+1}}{{$t('monitorRegular.execution')}}</td> -->
          <td colspan="5" style="text-align:left">
            <div class="flex">
              {{ index + 1 }}{{ $t("monitorRegular.per") }}：{{
                  $t("nurseServe.table.duringImplementation")
                }}
              <DatePicker style="max-width: 2.5rem;" class="calendarFont" type="daterange" :editable="false" placement="bottom-end" :placeholder="$t('global.sele')" :value="infoList[index].executionPeriod" @on-change="infoList[index].executionPeriod = $event"></DatePicker>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <div class="credit">
              <div>{{ $t("monitorRegular.nurse") }}</div>
              <div>{{ $t("monitorRegular.expert") }}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>{{ $t("monitorRegular.implementation") }}</td>
          <td>{{ $t("monitorRegular.satisfaction_title") }}</td>
          <td>{{ $t("monitorRegular.new") }}</td>
          <td>{{ $t("monitorRegular.achievement") }}</td>
          <td>{{ $t("monitorRegular.policy") }}</td>
        </tr>
        <tr>
          <td class="daLeft">
            <RadioGroup class="cell" v-model="infoList[index].executionStatus">
              <Radio @mouseup.native="
                    handleRadioGroup(`infoList.executionStatus`, index, '1')
                  " label="1">{{ $t("monitorRegular.planned") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup(`infoList.executionStatus`, index, '2')
                  " label="2">{{ $t("monitorRegular.basically") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup(`infoList.executionStatus`, index, '3')
                  " label="3">{{ $t("monitorRegular.implemented") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup(`infoList.executionStatus`, index, '4')
                  " label="4">{{ $t("monitorRegular.performed") }}</Radio>
            </RadioGroup>
          </td>
          <td class="daLeft">
            <RadioGroup class="cell" v-model="infoList[index].satisfaction">
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.satisfaction', index, '1')
                  " label="1">{{ $t("monitorRegular.satisfaction") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.satisfaction', index, '2')
                  " label="2">{{ $t("monitorRegular.satisfiedBas") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.satisfaction', index, '3')
                  " label="3">{{ $t("monitorRegular.dissatisfiedALit") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.satisfaction', index, '4')
                  " label="4">{{ $t("monitorRegular.dissatisfied") }}</Radio>
            </RadioGroup>
          </td>
          <td class="daLeft">
            <RadioGroup class="cell" v-model="infoList[index].newProject">
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.newProject', index, '1')
                  " label="1">{{ $t("monitorRegular.have") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.newProject', index, '2')
                  " label="2">{{ $t("monitorRegular.special") }}</Radio>
            </RadioGroup>
            <br />
            {{ $t("nurseServe.table.details") }}:<Input type="textarea" autosize v-model="infoList[index].newProjectDetail" />
          </td>
          <td class="daLeft">
            <RadioGroup class="cell" v-model="infoList[index].goalReach">
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.goalReach', index, '1')
                  " label="1">{{ $t("monitorRegular.reached") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.goalReach', index, '2')
                  " label="2">{{ $t("monitorRegular.reachedBas") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.goalReach', index, '3')
                  " label="3">{{ $t("monitorRegular.unacommpolished") }}</Radio>
            </RadioGroup>
          </td>
          <td class="daLeft">
            <!-- <RadioGroup class="cell" v-model="infoList[index].laterPolicy">
                <Radio
                  @mouseup.native="
                    handleRadioGroup('infoList.laterPolicy', index, '1')
                  "
                  label="1"
                  >{{ $t("monitorRegular.carryOn") }}</Radio
                >
                <Radio
                  @mouseup.native="
                    handleRadioGroup('infoList.laterPolicy', index, '2')
                  "
                  label="2"
                  >{{ $t("monitorRegular.change") }}</Radio
                >
                <Radio
                  @mouseup.native="
                    handleRadioGroup('infoList.laterPolicy', index, '3')
                  "
                  label="3"
                  >{{ $t("monitorRegular.terminated") }}</Radio
                >
              </RadioGroup> -->
            <CheckboxGroup v-model="infoList[index].laterPolicy">
              <Checkbox label="1">{{
                  $t("monitorRegular.carryOn")
                }}</Checkbox>
              <Checkbox label="2">{{ $t("monitorRegular.change") }}</Checkbox>
              <Checkbox label="3">{{
                  $t("monitorRegular.terminated")
                }}</Checkbox>
            </CheckboxGroup>
          </td>
        </tr>
        <tr>
          <td colspan="5" style="text-align:left;">
            {{ $t("monitorRegular.evaluation") }}
            <textarea v-model="infoList[index].evaluate"></textarea>
            <div style="width:100%;text-align:center;">
              <span>{{ $t("monitorRegular.careName") }}：</span>
              <input type="text" class="bd" v-model="infoList[index].nurseSignature" />
              <span>{{ $t("monitorRegular.nurseName") }}：</span>
              <input type="text" class="bd" v-model="infoList[index].nursingSignature" />
            </div>
          </td>
        </tr>
      </tbody>
      <tr>
        <td colspan="5" style="text-align:left">
          {{ $t("monitorRegular.sumUp") }}
          <textarea v-model="info.summary"></textarea>
          <div class="summary">{{ $t("monitorRegular.based") }}</div>
        </td>
      </tr>
    </table>
  </template>
  <template v-else>
    <table class="table sheetTable new-table" border="1px" cellspacing="1" cellpadding="0" style="1px solid #63af1e;">
      <tr>
        <td class="head-bg" colspan="1">{{ $t("monitorRegular.goal") }}</td>
        <td colspan="4" class="head-bg">{{ $t("monitorRegular.period") }}</td>
      </tr>
      <tr v-for="(item, index) in formData.serviceContent" :key="index">
        <td colspan="1">
          {{ formData.shortTermGoal[index] }}
          <!--  <Input type="textarea" autosize v-model="" /> -->
        </td>
        <td colspan="4" class="alignLeft">
          <div>
            {{ $t("FacilitiesPlan1.Period") }}:{{
                formData.shortPeriod[index]
              }}
          </div>
          <Input disabled type="textarea" autosize v-model="formData.serviceContent[index]" />
        </td>
      </tr>

      <tbody v-for="(item, index) in infoList" :key="item + index">
        <tr>
          <!-- <td
            colspan="5"
            style="text-align:left"
          >{{index+1}}{{$t('monitorRegular.per')}}：{{index+1}}{{$t('monitorRegular.execution')}}</td> -->
          <td colspan="5" style="text-align:left">
            <div class="flex">
              {{ index + 1 }}{{ $t("monitorRegular.per") }}：{{
                  $t("nurseServe.table.duringImplementation")
                }}
              <div class="flex" style="flex: 1; justify-content: space-between; position: relative;">
                <DatePicker style="min-width: 2.5rem;" class="calendarFont" type="daterange" :editable="false" placement="bottom-end" :placeholder="$t('global.sele')" :value="infoList[index].executionPeriod" @on-change="infoList[index].executionPeriod = $event"></DatePicker>
                <article class="flex" v-if="formData.type == 'short'">
                  {{ $t("monitorRegular.select") }}：
                  <RadioGroup class="cell" v-model="infoList[index].executionOptions">
                    <Radio @mouseup.native="
                          handleRadioGroup(
                            'infoList.executionOptions',
                            index,
                            '1'
                          )
                        " label="1">{{ $t("evaluate.new.you") }}</Radio>
                    <Radio @mouseup.native="
                          handleRadioGroup(
                            'infoList.executionOptions',
                            index,
                            '2'
                          )
                        " label="2">{{ $t("evaluate.new.wu") }}</Radio>
                  </RadioGroup>
                </article>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <div class="credit">
              <div>{{ $t("monitorRegular.nurse") }}</div>
              <div>{{ $t("monitorRegular.expert") }}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>{{ $t("monitorRegular.implementation") }}</td>
          <td>{{ $t("monitorRegular.satisfaction_title") }}</td>
          <td>{{ $t("monitorRegular.new") }}</td>
          <td>{{ $t("monitorRegular.achievement") }}</td>
          <td>{{ $t("monitorRegular.policy") }}</td>
        </tr>
        <tr>
          <td class="daLeft">
            <RadioGroup class="cell" v-model="infoList[index].executionStatus">
              <Radio @mouseup.native="
                    handleRadioGroup(`infoList.executionStatus`, index, '1')
                  " label="1">{{ $t("monitorRegular.planned") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup(`infoList.executionStatus`, index, '2')
                  " label="2">{{ $t("monitorRegular.basically") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup(`infoList.executionStatus`, index, '3')
                  " label="3">{{ $t("monitorRegular.implemented") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup(`infoList.executionStatus`, index, '4')
                  " label="4">{{ $t("monitorRegular.performed") }}</Radio>
            </RadioGroup>
          </td>
          <td class="daLeft">
            <RadioGroup class="cell" v-model="infoList[index].satisfaction">
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.satisfaction', index, '1')
                  " label="1">{{ $t("monitorRegular.satisfaction") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.satisfaction', index, '2')
                  " label="2">{{ $t("monitorRegular.satisfiedBas") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.satisfaction', index, '3')
                  " label="3">{{ $t("monitorRegular.dissatisfiedALit") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.satisfaction', index, '4')
                  " label="4">{{ $t("monitorRegular.dissatisfied") }}</Radio>
            </RadioGroup>
          </td>
          <td class="daLeft">
            <RadioGroup class="cell" v-model="infoList[index].newProject">
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.newProject', index, '1')
                  " label="1">{{ $t("monitorRegular.have") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.newProject', index, '2')
                  " label="2">{{ $t("monitorRegular.special") }}</Radio>
            </RadioGroup>
            <br />
            {{ $t("nurseServe.table.details") }}:<Input type="textarea" autosize v-model="infoList[index].newProjectDetail" />
          </td>
          <td class="daLeft">
            <RadioGroup class="cell" v-model="infoList[index].goalReach">
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.goalReach', index, '1')
                  " label="1">{{ $t("monitorRegular.reached") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.goalReach', index, '2')
                  " label="2">{{ $t("monitorRegular.reachedBas") }}</Radio>
              <Radio @mouseup.native="
                    handleRadioGroup('infoList.goalReach', index, '3')
                  " label="3">{{ $t("monitorRegular.unacommpolished") }}</Radio>
            </RadioGroup>
          </td>
          <td class="daLeft">
            <!-- <RadioGroup class="cell" v-model="infoList[index].laterPolicy">
                <Radio
                  @mouseup.native="
                    handleRadioGroup('infoList.laterPolicy', index, '1')
                  "
                  label="1"
                  >{{ $t("monitorRegular.carryOn") }}</Radio
                >
                <Radio
                  @mouseup.native="
                    handleRadioGroup('infoList.laterPolicy', index, '2')
                  "
                  label="2"
                  >{{ $t("monitorRegular.change") }}</Radio
                >
                <Radio
                  @mouseup.native="
                    handleRadioGroup('infoList.laterPolicy', index, '3')
                  "
                  label="3"
                  >{{ $t("monitorRegular.terminated") }}</Radio
                >
              </RadioGroup> -->
            <CheckboxGroup v-model="infoList[index].laterPolicy">
              <Checkbox label="1">{{
                  $t("monitorRegular.carryOn")
                }}</Checkbox>
              <Checkbox label="2">{{ $t("monitorRegular.change") }}</Checkbox>
              <Checkbox label="3">{{
                  $t("monitorRegular.terminated")
                }}</Checkbox>
            </CheckboxGroup>
          </td>
        </tr>
        <tr>
          <td colspan="5" style="text-align:left;">
            {{ $t("monitorRegular.evaluation") }}
            <textarea v-model="infoList[index].evaluate"></textarea>
            <div style="width:100%;text-align:center;">
              <span>{{ $t("monitorRegular.careName") }}：</span>
              <input type="text" class="bd" v-model="infoList[index].nurseSignature" />
              <span>{{ $t("monitorRegular.nurseName") }}：</span>
              <input type="text" class="bd" v-model="infoList[index].nursingSignature" />
            </div>
          </td>
        </tr>
      </tbody>
      <tr>
        <td colspan="5" style="text-align:left">
          {{ $t("monitorRegular.sumUp") }}
          <textarea v-model="info.summary"></textarea>
          <div class="summary">{{ $t("monitorRegular.based") }}</div>
        </td>
      </tr>
    </table>
  </template>
  <div class="table-submit">
    <!-- <button @click="handleSave">
        <i class="iconfont icon-baocun"></i>
        {{$t('global.preservation')}}
      </button> -->
    <button @click="handleSubmit">
      <i class="iconfont icon-submit"></i>
      {{ $t("global.submit") }}
    </button>
  </div>
</div>
</template>

<script>
import func from "../network/leo";
import {
  getExecutionCycles,
  sendExecutionCycle,
  changeExecutionCycle
} from "../network/Sinyu";
import {
  format,
  isSort
} from "../assets/utils/Tools";
import {
  Tree
} from "view-design";
let type = 1;
export default {
  data() {
    return {
      title: "",
      formData: {},
      info: {},
      leng: [3, 6, 2, 5],
      infoList: [],
      oldInfo: {},
      dblclickNum: 0
    };
  },
  created() {
    const formData = JSON.parse(sessionStorage.getItem("monitorType"));
    this.formData = formData;
    let data = {};
    if (formData.type === "long") {
      this.title = this.$t("monitorRegular.method1");
      data = {
        serviceContentId: formData.id,
        type: 1
      };
      type = 1;
    }
    if (formData.type === "short") {
      this.title = this.$t("monitorRegular.method2");
      data = {
        serviceContentId: formData.id,
        type: 2
      };
      type = 2;
    }
    if (formData.type === "try") {
      this.title = this.$t("monitorRegular.method3");
      data = {
        serviceContentId: formData.id,
        type: 3
      };
      type = 3;
    }
    if (formData.type === "dying") {
      this.title = this.$t("monitorRegular.method4");
      data = {
        serviceContentId: formData.id,
        type: 4
      };
      type = 4;
    }
    this.oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    this.info.date = eval("(" + formData.buildDate + ")");
    for (let i = 0; i < this.leng[type - 1]; i++) {
      this.infoList.push({});
    }
    this._getExecutionCycles(data);
  },
  methods: {
    handleSave() {},
    handleRadioGroup(type, index, value) {
      ///   处理选择单选框
      const arr = type.split(".");
      if (this[arr[0]][index][arr[1]] == value) {
        setTimeout(() => {
          this[arr[0]][index][arr[1]] = "";
        }, 10);
      }
    },
    handleSubmit() {
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("ServePlan.uploads"),
        okText: this.$t("global.sure"),
        cancelText: this.$t("global.cancel"),
        onOk: async () => {
          this.infoList.forEach((res, index) => {
            if (res.id) {
              changeExecutionCycle({
                serviceContentId: this.formData.id,
                executionStatus: res.executionStatus,
                satisfaction: res.satisfaction,
                newProjectDetail: res.newProjectDetail,
                numberSign: res.numberSign || index + 1,
                executionPeriod: JSON.stringify(res.executionPeriod),
                executionOptions: res.executionOptions,
                id: res.id,
                newProject: res.newProject,
                goalReach: res.goalReach,
                laterPolicy: JSON.stringify(res.laterPolicy),
                nurseSignature: res.nurseSignature,
                nursingSignature: res.nursingSignature,
                evaluate: res.evaluate,
                summary: this.info.summary,
                type
              }).then(res => {
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
              });
            } else {
              sendExecutionCycle({
                serviceContentId: this.formData.id,
                executionStatus: res.executionStatus,
                satisfaction: res.satisfaction,
                newProject: res.newProject,
                newProjectDetail: res.newProjectDetail,
                numberSign: res.numberSign || index + 1,
                executionPeriod: JSON.stringify(res.executionPeriod),
                executionOptions: res.executionOptions,
                goalReach: res.goalReach,
                laterPolicy: JSON.stringify(res.laterPolicy),
                nurseSignature: res.nurseSignature,
                nursingSignature: res.nursingSignature,
                evaluate: res.evaluate,
                summary: this.info.summary,
                type
              }).then(res => {
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
              });
            }
          });
        }
      });
    },
    _getExecutionCycles(data) {
      getExecutionCycles(data).then(res => {
        if (res.code === 0 && res.data.length > 0) {
          this.infoList = res.data;
          this.infoList.forEach(res => {
            res.executionPeriod = res.executionPeriod ?
              JSON.parse(res.executionPeriod) :
              res.executionPeriod;
            res.laterPolicy = res.laterPolicy ?
              JSON.parse(res.laterPolicy) :
              res.laterPolicy;
          });
          this.infoList = isSort(true, this.infoList, 'numberSign')
          this.info.summary = res.data[0].summary;
        }
      });
    }
  }
};
</script>

<style>
.bd {
  border: none;
  outline: medium;
}

textarea {
  border: 0;
  resize: none;
  outline: none;
  width: 100%;

  height: 1.45rem;
}

.sheet {
  padding: 0 0.25rem 0 0.15rem;
}

.sheetTitle {
  text-align: left;
  font-size: 0.18rem
    /* 18/102 */
  ;
  line-height: 0.55rem
    /* 56/102 */
  ;
  padding: 0 0.26rem
    /* 27/102 */
  ;
  background: linear-gradient(90deg, #63af1e, #63af1e, #fff);
  color: #fff;
  margin: 0.25rem
    /* 25/102 */
    0;
}

.monitorTable {
  font-size: 0.14rem;
  width: 100%;
  margin-bottom: 0.25rem;
}

.monitorTable tr {
  height: 0.5rem;
}

.sheetTable {
  font-size: 0.14rem;
  width: 100%;
}

.sheetTable tr {
  height: 0.4rem;
}

.years {
  width: 0.31rem;
  text-align: right;
}

.marquee {
  zoom: 150%;
  vertical-align: text-bottom;
}

.daLeft {
  text-align: left;
}

.credit {
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: #237804;
}

.summary {
  width: 100%;
  text-align: center;
  color: #ccc;
}

.ivu-input[disabled],
fieldset[disabled] .ivu-input {
  background-color: #fff !important;
  border: 0 !important;
}
</style>
