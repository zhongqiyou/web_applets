<template>
<div id="facilities-plan" class="FacilitiesPlan">
  <div class="trip-title">{{$t('FacilitiesPlan.title')}}</div>
  <div style="display:flex;justify-content:space-between;align-items: center;">
    <!-- 筛选条件 -->
    <div class="selectBox">
      <div class="year">
        <DatePicker size="large" type="year" :placeholder="$t('global.sele')" style="100%" v-model="occurrenceYear" @on-change="handldDateChange"></DatePicker>
      </div>
      <div class="occurrenceDay">
        <Select v-model="occurrenceDay" style="width: 100%" @on-change="handleDayChange" size="large">
          <Option v-for="item in occurrenceDayList" :value="item.value" :key="item.value">{{item.value}}</Option>
        </Select>
      </div>
    </div>
    <div style="text-align: right;">
      <article class="flex" style="display: flex; justify-content: flex-end">
        {{$t("FacilitiesPlan1.Production")}}:<DatePicker class="calendarFont" :value="planInfo.createDate" :editable="false" format="yyyy-MM-dd" type="date" size="large" :placeholder="$t('global.sele')" style="width: 1.5rem;" @on-change="planInfo.createDate =$event;type = 'submit'" @focus="this.blur()"></DatePicker>
      </article>
      <div class="plan-header">
        <!-- {{$t('FacilitiesPlan.Section')}}
          <input type="text" v-model="planInfo.succeed" />
          {{$t('FacilitiesPlan.Has')}}-->
        <i-select style="width:1rem;text-align: center;" size="large" v-model="planTime" :placeholder="$t('global.sele')">
          <i-option :value="1">{{$t("FacilitiesPlan.firstTime")}}</i-option>
          <i-option :value="2">{{$t("FacilitiesPlan.tntroduction")}}</i-option>
          <i-option :value="3">{{$t("FacilitiesPlan.continuation")}}</i-option>
        </i-select>
        <i-select style="width:1rem;margin-left:0.2rem;text-align: center;" size="large" v-model="applyStatus" :placeholder="$t('global.sele')">
          <i-option :value="1">{{$t("FacilitiesPlan.certified")}}</i-option>
          <i-option :value="2">{{$t("FacilitiesPlan.applying")}}</i-option>
        </i-select>
      </div>
    </div>
  </div>
  <table class="plan-main new-table" border="1" style="border:1px solid  #C4E8BF">
    <tr>
      <td class="head-bg">{{$t('FacilitiesPlan.Username')}}</td>
      <td style="line-height:0.2rem">
        <div class="flex" style="justify-content: space-between; align-items: flex-start">
          {{planInfo.userName}}
          <p style="margin-left: .1rem;">{{$t('global.honorName')}}</p>
        </div>
      </td>
      <!-- <td class="head-bg">{{$t('FacilitiesPlan.place')}}</td>
        <td>
          <input type="text" v-model="planInfo.birthplace" />
        </td>-->
      <td class="head-bg">{{$t('FacilitiesPlan.Date')}}</td>
      <td style="font-size:0.14rem" class="date">{{planInfo.birthday}}</td>
      <td class="head-bg">{{$t('FacilitiesPlan.Address')}}</td>
      <td colspan="3" style="word-break: break-all;line-height:0.2rem">{{planInfo.address}}</td>
    </tr>
    <tr>
      <td class="head-bg" colspan="3">{{$t('FacilitiesPlan.Section')}}</td>
      <td colspan="6">
        <Input v-model="planInfo.createName" type="textarea" :autosize="{minRows: 2}" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="9">
        {{$t('FacilitiesPlan.Formulate')}}
        <!-- <input
            type="text"
            v-model="planInfo."
            style="width: 1.5rem; color: #fff;"
          />-->
        <Input style="width: 2rem; color: #fff; text-align: left;" v-model="planInfo.insurancePlan" type="textarea" autosize />
        {{$t('FacilitiesPlan.Nursing')}}
        <!-- <input
            type="text"
            v-model="planInfo.healthPlace"
            style="width:3rem; color: #fff;"
          />-->
        <Input style="width: 3rem; color: #fff; text-align: left;" v-model="planInfo.healthPlace" type="textarea" autosize />
      </td>
    </tr>
    <tr>
      <td style="white-space:nowrap;" class="head-bg" colspan="2">{{$t('FacilitiesPlan.Establishment')}}<span class='required'>*</span></td>
      <td class="date">
        <DatePicker class="calendarFont" :value="planInfo.servicePlan2" :editable="false" format="yyyy-MM-dd" type="date" size="large" :placeholder="$t('global.sele')" style="width: 100%" @on-change="planInfo.servicePlan2 =$event" @focus="this.blur()"></DatePicker>
      </td>
      <td class="head-bg" style="white-space:nowrap;" colspan="2">{{$t('FacilitiesPlan.EstablishmentTwo')}}<span class='required'>*</span></td>
      <td colspan="4" class="date">
        <DatePicker class="calendarFont" :value="planInfo.servicePlan1" :editable="false" format="yyyy-MM-dd" type="date" size="large" :placeholder="$t('global.sele')" style="width: 100%" @on-change="planInfo.servicePlan1 =$event" @focus="this.blur()"></DatePicker>
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('FacilitiesPlan.Identification')}}<span class='required'>*</span></td>
      <td colspan="2" class="date">
        <DatePicker class="calendarFont" :value="planInfo.confirmDate" :editable="false" format="yyyy-MM-dd" type="date" size="large" :placeholder="$t('global.sele')" style="width: 100%" @on-change="planInfo.confirmDate =$event" @focus="this.blur()"></DatePicker>
      </td>
      <td class="head-bg" style="white-space:nowrap">{{$t('FacilitiesPlan.Valid')}}<span class='required'>*</span></td>
      <td colspan="5" class="date">
        <DatePicker class="calendarFont" type="daterange" :editable="false" size="large" placement="bottom-end" :placeholder="$t('global.sele')" style="width: 100%" :value="confirmValidity" @on-change="confirmValidity =$event"></DatePicker>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="2">{{$t('FacilitiesPlan.Reasonable')}}</td>
      <td colspan="7">
        <RadioGroup v-model="planInfo.nursingStatus">
          <Radio label="1" @mouseup.native="handleRadioGroup('planInfo.nursingStatus',1)">{{$t('FacilitiesPlan.Need')}}1</Radio>
          <Radio label="2" @mouseup.native="handleRadioGroup('planInfo.nursingStatus',2)">{{$t('FacilitiesPlan.Need')}}2</Radio>
          <Radio label="3" @mouseup.native="handleRadioGroup('planInfo.nursingStatus',3)">{{$t('FacilitiesPlan.Need')}}3</Radio>
          <Radio label="4" @mouseup.native="handleRadioGroup('planInfo.nursingStatus',4)">{{$t('FacilitiesPlan.Need')}}4</Radio>
          <Radio label="5" @mouseup.native="handleRadioGroup('planInfo.nursingStatus',5)">{{$t('FacilitiesPlan.Need')}}5</Radio>
          <Radio label="6" @mouseup.native="handleRadioGroup('planInfo.nursingStatus',6)">{{$t('evaluate.foodMedicine.other')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
  </table>

  <table class="plan-table new-table" border="1" style="border:1px solid #C4E8BF">
    <!-- 利用者及家属的看护意向 -->
    <tr v-for="(item,index) in planInfo.nursingDifferentiate" :key="'ssji'+index">
      <td class="head-bg twoLine" v-if="index===0" :rowspan="planInfo.nursingDifferentiate.length+1">{{$t('FacilitiesPlan.Use')}}</td>
      <td colspan="7">
        <Input type="textarea" autosize v-model="planInfo.nursingDifferentiate[index]" @on-blur="deleteItem(index,1)" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" v-if="!planInfo.nursingDifferentiate.length">{{$t('FacilitiesPlan.Use')}}</td>
      <td colspan="7">
        <Input type="textarea" autosize v-model="newItem1" @on-blur="pushList(1)" />
      </td>
    </tr>
    <!-- 护理认定审查会的意见书及服务种类的指定 -->
    <tr v-for="(item,index) in planInfo.meaningServiceType" :key="'ser'+index">
      <td class="head-bg twoLine" v-if="index===0" :rowspan="planInfo.meaningServiceType.length+1">{{$t('FacilitiesPlan.Designation')}}</td>
      <td colspan="7">
        <Input type="textarea" :autosize="{minRows: 2}" v-model="planInfo.meaningServiceType[index]" @on-blur="deleteItem(index,2)" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" v-if="!planInfo.meaningServiceType.length">{{$t('FacilitiesPlan.Designation')}}</td>
      <td colspan="7">
        <Input type="textarea" autosize v-model="newItem2" @on-blur="pushList(2)" />
      </td>
    </tr>
    <!-- 综合援助的方针 -->
    <tr v-for="(item,index) in planInfo.aidPolicy" :key="'jiqowdqw'+index">
      <td class="head-bg" v-if="index===0" :rowspan="planInfo.aidPolicy.length+1">{{$t('FacilitiesPlan.Comprehensive')}}</td>
      <td colspan="7">
        <Input type="textarea" autosize v-model="planInfo.aidPolicy[index]" @on-blur="deleteItem(index,3)" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" v-if="!planInfo.aidPolicy.length">{{$t('FacilitiesPlan.Comprehensive')}}</td>
      <td colspan="7">
        <Input type="textarea" autosize v-model="newItem3" @on-blur="pushList(3)" />
      </td>
    </tr>
  </table>

  <div class="plan-info">
    <p>{{$t('FacilitiesPlan.When')}}</p>
    <p>{{$t('FacilitiesPlan.agree')}}</p>
  </div>

  <table class="plan-footer new-table" border="1" style="border:1px solid #C4E8BF">
    <tr class="lastTr">
      <td class="head-bg">{{$t('FacilitiesPlan.Notes')}}<span class='required'>*</span></td>
      <td class="date">
        <DatePicker class="calendarFont" :value="planInfo.declareDate" :editable="false" format="yyyy-MM-dd" type="date" size="large" :placeholder="$t('global.sele')" style="width: 100%" @on-change="planInfo.declareDate = $event" @focus="this.blur()"></DatePicker>
      </td>
      <td style="width:1.5rem;border: none;"></td>
      <td class="head-bg">{{$t('FacilitiesPlan.Personal')}}</td>
      <td>
        <Input type="textarea" autosize v-model="planInfo.selfSignature" />
      </td>
      <td class="head-bg">{{$t('FacilitiesPlan.Family')}}</td>
      <td>
        <Input type="textarea" autosize v-model="planInfo.familySignature" />
      </td>
      <td class="head-bg">{{$t('FacilitiesPlan.Explainer')}}</td>
      <td>
        <Input type="textarea" autosize v-model="planInfo.expositorExplain" />
      </td>
    </tr>
  </table>
  <div class="table-submit">
    <!--<button @click="handleSave">
        <i class="iconfont icon-baocun"></i> {{$t('global.preservation')}}
      </button>-->
    <button @click="handleSubmit">
      <i class="iconfont icon-submit"></i>
      {{$t('global.submit')}}
    </button>
  </div>
</div>
</template>

<script>
import {
  getPlanByOld,
  sendServicePlan,
  changeServicePlan,
  getBaseInfo,
  getDateYear
} from "../network/Sinyu";
import {
  format
} from "../assets/utils/Tools";
export default {
  data() {
    return {
      oldInfo: {},
      planTime: "",
      applyStatus: "",
      confirmValidity: [],
      newItem1: "",
      newItem2: "",
      newItem3: "",
      planInfo: {
        succeed: "",
        userName: "",
        birthplace: "",
        birthday: "",
        address: "",
        createName: "",
        healthPlace: "",
        servicePlan1: "",
        servicePlan2: "",
        confirmDate: "",
        confirmValidity1: "",
        confirmValidity2: "", //认定有效期时间2
        nursingStatus: "",
        selfSignature: "",
        declareDate: "",
        familySignature: "",
        expositorExplain: "",
        nursingDifferentiate: [],
        meaningServiceType: [],
        aidPolicy: []
      },
      type: "submit",
      dblclickNum: "",
      occurrenceYear: format(new Date(), 'YYYY'),
      occurrenceDay: '',
      occurrenceDayList: [],
    };
  },
  created() {
    this.oldInfo = JSON.parse(localStorage.getItem("oldInfo"));

    //      网络请求
    const value = {
      oldManId: this.oldInfo.oldId,
      year: format(new Date(), 'YYYY'),
      type: 7
    }
    this._getDateYear(value);
    this.getOldInfo();
  },
  methods: {
    handldDateChange(e) { //  切换年份
      this.occurrenceYear = e
      const value = {
        oldManId: this.oldInfo.oldId,
        year: this.occurrenceYear,
        type: 7
      }
      this._getDateYear(value);
    },
    handleDayChange(e) {
      this._getServicePlan({
        oldManId: this.oldInfo.oldId,
        createDate: e
      });
    },
    //删除旧item行
    deleteItem(index, type) {
      if (type === 1) {
        if (this.planInfo.nursingDifferentiate[index] == "") {
          this.planInfo.nursingDifferentiate.splice(index, 1);
        }
      } else if (type === 2) {
        if (this.planInfo.meaningServiceType[index] == "") {
          this.planInfo.meaningServiceType.splice(index, 1);
        }
      } else if (type === 3) {
        if (this.planInfo.aidPolicy == "") {
          this.planInfo.aidPolicy.splice(index, 1);
        }
      }
    },
    //添加新item行
    pushList(type) {
      if (type === 1) {
        if (this.newItem1) {
          this.planInfo.nursingDifferentiate.push(this.newItem1);
          this.newItem1 = "";
        }
      } else if (type === 2) {
        if (this.newItem2) {
          this.planInfo.meaningServiceType.push(this.newItem2);
          this.newItem2 = "";
        }
      } else if (type === 3) {
        if (this.newItem3) {
          this.planInfo.aidPolicy.push(this.newItem3);
          this.newItem3 = "";
        }
      }
    },
    //获取老人基本信息
    async getOldInfo() {
      try {
        const res = await getBaseInfo({
          id: this.oldInfo.oldId
        });
        if (res.code === 0) {
          this.planInfo.userName = res.data.name;
          this.planInfo.birthday = res.data.birthday;
          this.planInfo.address = res.data.dom;
          this.old = res.data
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
    handleSave() {
      //  点击保存
    },
    //  处理选择单选框
    handleRadioGroup(type, value) {
      const arr = type.split(".");
      if (this[arr[0]][arr[1]] == value) {
        setTimeout(() => {
          this[arr[0]][arr[1]] = '';
        }, 10)
      }
    },
    handleSubmit() {
      //  点击提交
      const data = Object.assign({}, this.planInfo, {
        birthday: this.planInfo.birthday,
        confirmDate: this.planInfo.confirmDate,
        oldManId: this.oldInfo.oldId,
        id: this.type === 'change' ? this.planInfo.id : '',

        applyStatus: parseInt(this.applyStatus),
        planTime: parseInt(this.planTime),
        confirmValidity1: this.confirmValidity[0],
        createDate: this.planInfo.createDate,
        confirmValidity2: this.confirmValidity[1],

        declareDate: this.planInfo.declareDate,

        servicePlan1: this.planInfo.servicePlan1,

        servicePlan2: this.planInfo.servicePlan2,

        nursingDifferentiate: JSON.stringify(
          this.planInfo.nursingDifferentiate
        ),
        meaningServiceType: JSON.stringify(this.planInfo.meaningServiceType),
        aidPolicy: JSON.stringify(this.planInfo.aidPolicy)
      });
      if (
        this.planInfo.servicePlan1 &&
        this.planInfo.servicePlan2 &&
        this.planInfo.confirmDate &&
        this.confirmValidity &&
        this.planInfo.declareDate
      ) {
        this.$Modal.confirm({
          title: this.$t("global.reminder"),
          content: this.$t("global.submitInfo"),
          okText: this.$t("global.sure"),
          cancelText: this.$t("global.cancel"),
          onOk: async () => {
            if (this.type === "submit") {
              sendServicePlan(data)
                .then(res => {
                  if (res.code === 0) {
                    this._getServicePlan({
                      oldManId: this.oldInfo.oldId,
                      createDate: this.planInfo.createDate
                    });
                    this.$Notice.success({
                      title: this.$t("global.successfully"),
                      duration: 2
                    });
                  } else if (res.code == 415) {
                    this.$Notice.error({
                      title: res.msg,
                      duration: 2
                    });
                  } else {
                    this.$Notice.error({
                      title: this.$t("global.failed"),
                      duration: 2
                    });
                  }
                })
                .catch(err => {
                  this.$Notice.error({
                    title: this.$t("global.failed"),
                    duration: 2
                  });
                });
            } else {
              try {
                const res = await changeServicePlan(data);
                if (res.code === 0) {
                  this.$Notice.success({
                    title: this.$t("global.successfully"),
                    duration: 2
                  });
                } else if (res.code == 415) {
                  this.$Notice.error({
                    title: res.msg,
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
              }
            }
          }
        });
      } else {
        this.$Notice.error({
          title: this.$t("global.failed"),
          duration: 2
        });
      }
    },
    _getServicePlan(data) {
      getPlanByOld(data).then(res => {
        if (res.code === 0 && res.data.length) {
          this.planTime = res.data[0].planTime;
          this.applyStatus = res.data[0].applyStatus;
          this.planInfo = res.data[res.data.length - 1];
          this.planInfo.userName = this.planInfo.userName || this.old.name;
          this.planInfo.birthday = this.planInfo.birthday || this.old.birthday;
          this.planInfo.address = this.planInfo.address || this.old.dom;
          this.planInfo.aidPolicy = JSON.parse(
            res.data[res.data.length - 1].aidPolicy
          ) || [];
          this.planInfo.meaningServiceType = JSON.parse(
            res.data[res.data.length - 1].meaningServiceType
          ) || [];
          this.planInfo.nursingDifferentiate = JSON.parse(
            res.data[res.data.length - 1].nursingDifferentiate
          ) || [];
          this.planInfo.confirmDate = res.data[0].confirmDate;
          let arr = [
            res.data[0].confirmValidity1,
            res.data[0].confirmValidity2
          ];
          this.confirmValidity = arr;
          this.planInfo.createDate = res.data[0].createDate;
          this.planInfo.declareDate = res.data[0].declareDate;
          this.planInfo.servicePlan1 = res.data[0].servicePlan1;
          this.planInfo.servicePlan2 = res.data[0].servicePlan2;
          this.type = "change";
        } else {
          this.type = "submit";
        }
      });
    },
    _getDateYear(data) {
      getDateYear(data).then(res => {
        if (res.code === 0) {
          if (res.data.length > 0) {
            let arr = []
            for (let v in res.data) {
              arr.push({
                value: res.data[v].date,
                label: res.data[v].date
              })
            }
            this.occurrenceDayList = arr
            this.occurrenceDay = arr[0].value
            if (this.occurrenceDay) {
              this._getServicePlan({
                oldManId: this.oldInfo.oldId,
                createDate: this.occurrenceDay
              });
            }
          } else {
            this.occurrenceDayList = []
            this.occurrenceDay = ''
            this.planInfo.createDate = format()
          }
        }
      }).catch(err => {
        console.warn(err)
      })
    }
  }
};
</script>

<style lang="less">
.greenBg textarea.ivu-input {
  background: var(--table-bg);
  color: #ffffff;
}

.lastTr {
  position: relative;

  .date {
    width: 1.5rem;
    position: absolute;
    z-index: 600;
  }
}

.FacilitiesPlan textarea {
  font-size: 0.14rem;
}
</style><style lang="less" scoped>
#facilities-plan {
  font-size: 0.14rem
    /* 14/102 */
  ;
  text-align: left;
  padding-bottom: 0.29rem
    /* 30/102 */
  ;

  input {
    border: 0;
    outline: none;
  }

  .plan-title {
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

  // .plan-title end

  .plan-header {
    text-align: right;
    margin: 0.1rem 0
      /* 10/102 */
    ;

    input {
      text-align: left;
      width: 0.88rem
        /* 90/102 */
      ;
    }
  }

  // .plan-header end

  .plan-main {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    background: #fff;
    border-color: var(--border-color);
    border-radius: 5px;
    overflow: hidden;

    input {
      width: 0.93rem
        /* 95/102 */
      ;
      padding: 0 0.05rem
        /* 5/102 */
      ;
    }

    .date {
      white-space: nowrap;
      font-size: 12px;
    }

    .date input {
      width: 0.44rem
        /* 45/102 */
      ;
      text-align: right;
    }

    td {
      padding: 0.03rem
        /* 3/102 */
      ;
      line-height: 0.39rem
        /* 40/102 */
      ;
    }

    .ivu-radio-wrapper {
      margin-right: 0.29rem
        /* 30/102 */
      ;
      font-size: 0.14rem;
    }
  }

  // .plan-main end

  .plan-table {
    width: 100%;
    margin-top: 0.2rem
      /* 20/102 */
    ;
    text-align: center;
    background: #fff;
    border-color: var(--border-color);
    border-radius: 5px;
    overflow: hidden;

    td:last-child {
      width: 70%;
    }

    td {
      padding: 0.03rem
        /* 3/102 */
      ;
      line-height: 0.39rem
        /* 40/102 */
      ;
    }
  }

  .plan-info {
    line-height: 0.39rem
      /* 40/102 */
    ;
    color: #000;
    padding: 0.2rem
      /* 20/102 */
      0;
    font-size: 0.16rem
      /* 16/102 */
    ;
  }

  // .plan-info end

  .plan-footer {
    width: 100%;
    white-space: nowrap;
    line-height: 0.39rem
      /* 40/102 */
    ;
    border-collapse: collapse;
    border-color: var(--border-color);
    background: #fff;
    border-radius: 5px;
    overflow: hidden;

    .date {
      font-size: 12px;
    }

    .date input {
      width: 0.44rem
        /* 45/102 */
      ;
      text-align: right;
    }

    input {
      width: 0.78rem
        /* 80/102 */
      ;
      padding: 0 0.05rem
        /* 5/102 */
      ;
    }

    td {
      padding: 0.03rem
        /* 3/102 */
      ;
      line-height: 0.39rem
        /* 40/102 */
      ;
    }
  }

  .head {
    background: var(--table-bg);
    text-align: center;
    color: #fff;
  }

  .twoLine {
    line-height: 0.2rem;
  }
}

// #facilities-plan end
</style>
