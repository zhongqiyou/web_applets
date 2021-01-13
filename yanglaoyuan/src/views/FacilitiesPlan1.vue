<template>
<div class="plan-one">
  <div class="trip-title">{{$t("FacilitiesPlan1.title")}}</div>
  <!-- 筛选条件 -->
  <div class="selectBox">
    <div class="year">
      <DatePicker type="year" size="large" :placeholder="$t('global.sele')" style="100%" v-model="occurrenceYear" @on-change="handldDateChange"></DatePicker>
    </div>
    <div class="occurrenceDay">
      <Select v-model="occurrenceDay" style="width: 100%" @on-change="handleDayChange" size="large">
        <Option v-for="item in occurrenceDayList" :value="item.value" :key="item.value">{{item.value}}</Option>
      </Select>
    </div>
  </div>
  <div class="plan-header">
    <label>
      {{$t("FacilitiesPlan1.Username")}}:{{oldInfo.name}} {{$t('global.honorName')}}
    </label>
    <label class="flex" style="display: flex; justify-content: flex-end">
      {{$t("FacilitiesPlan1.Production")}}:<DatePicker class="calendarFont" :value="planInfo.date" :editable="false" format="yyyy-MM-dd" type="date" size="large" :placeholder="$t('global.sele')" style="width: 1.5rem;" @on-change="handleClickDate"></DatePicker>
    </label>
  </div>
  <div style="overflow-x:scroll;overflow-y:auto!important">
    <table class="plan-table new-table" border="1" style="overflow: auto">
      <thead>
        <tr>
          <td rowspan="2">{{$t("FacilitiesPlan1.Issues")}}<span class='required'>*</span></td>
          <td colspan="5">{{$t("FacilitiesPlan1.Aid")}}<span class='required'>*</span></td>
          <td colspan="4">{{$t("FacilitiesPlan1.Content")}}<span class='required'>*</span></td>
        </tr>
        <tr>
          <td>{{$t("FacilitiesPlan1.goals")}}<span class='required'>*</span></td>
          <td style="min-width: 2.4rem;">{{$t("FacilitiesPlan1.Period")}}<span class='required'>*</span></td>
          <td>{{$t('repair.goal')}}<span class='required'>*</span></td>
          <td style="min-width: 2.4rem;">{{$t("FacilitiesPlan1.Period")}}<span class='required'>*</span></td>
          <td style="white-space: nowrap;">{{$t("FacilitiesPlan1.way_title")}}</td>
          <!--<td>{{$t('repair.Try')}}</td>
            <td>{{$t("FacilitiesPlan1.Period")}}</td>
            <td>{{$t('repair.Dying')}}</td>
            <td>{{$t("FacilitiesPlan1.Period")}}</td> -->
          <td>
            <div style="width: 4rem;">{{$t("FacilitiesPlan1.Service")}}<span class='required'>*</span></div>
          </td>
          <td>{{$t("FacilitiesPlan1.Principal")}}<span class='required'>*</span></td>
          <td>{{$t("FacilitiesPlan1.Frequency")}}<span class='required'>*</span></td>
          <td style="min-width: 2.4rem;">{{$t("FacilitiesPlan1.Period")}}<span class='required'>*</span></td>
        </tr>
      </thead>
      <tbody>
        <!-- 已有课题 -->
        <template v-for="(item,itemIndex) in infoList">
          <tr v-for="(term,index) in item.shortTermGoal" :key="index+item.subject+item.tryLive">
            <template v-if="index === 0">
              <td rowspan="2" class="alignLeft">
                <div>#{{itemIndex+1}}</div>
                <Input autosize type="textarea" v-model="item.subjectRequirement" />
              </td>
              <td rowspan="2" class="alignLeft"> <Input autosize type="textarea" v-model="infoList[itemIndex].longTermGoal" /></td>
              <td rowspan="2">
                <DatePicker class="calendarFont" type="daterange" :editable="false" size="large" placement="bottom-end" :placeholder="$t('global.sele')" style="width: 100%" :value="item.longPeriod" @on-change="item.longPeriod =$event" />
              </td>
            </template>

            <td class="alignLeft">
              <Input autosize type="textarea" v-model="item.shortTermGoal[index]" />
            </td>
            <td>
              <DatePicker class="calendarFont" type="daterange" :editable="false" size="large" placement="bottom-end" :placeholder="$t('global.sele')" style="width: 100%" :value="item.shortPeriod[index]" @on-change="item.shortPeriod[termIndex] =$event" />
              </td>
            <template v-if="index === 0">
              <td rowspan="2" class="alignLeft">
                <ul style="line-height: .3rem;">
                  <li :class="item.type1?'red':''" @click="goTo('/monitorRegular');handleJumpAim(item,'long')"><span v-show="item.type1">✔</span>{{$t("monitorRegular.method1")}}</li>
                  <li :class="item.type2?'red':''" @click="goTo('/monitorRegular');handleJumpAim(item,'short')"><span v-show="item.type2">✔</span>{{$t("monitorRegular.method2")}}</li>
                  <li :class="item.type3?'red':''" @click="goTo('/monitorRegular');handleJumpAim(item,'try')"><span v-show="item.type3">✔</span>{{$t("monitorRegular.method3")}}</li>
                  <li :class="item.type4?'red':''" @click="goTo('/monitorRegular');handleJumpAim(item,'dying')"><span v-show="item.type4">✔</span>{{$t("monitorRegular.method4")}}</li>
                </ul>
              </td>
            </template>
            <!--<template v-if="index === 0">
                <td :rowspan="item.shortTermGoal.length">{{item.tryLive}}</td>
                <td :rowspan="item.shortTermGoal.length">{{item.tryLivePeriod}}</td>

                <td :rowspan="item.shortTermGoal.length">{{item.approaching}}</td>
                <td :rowspan="item.shortTermGoal.length">{{item.approachingPeriod}}</td>
              </template> -->
            <td class="alignLeft" style="vertical-align: top;"><Input type="textarea" autosize v-model="item.serviceContent[index]" /></td>
            <template v-if="index === 0">
              <td :rowspan="item.shortTermGoal.length" class="alignLeft" style="vertical-align: top;">
                <Input autosize type="textarea" v-model="item.principal" />
              </td>
              <td :rowspan="item.shortTermGoal.length" style="vertical-align: top;">
                <Input autosize type="textarea" v-model="item.frequencies" />
              </td>
              <td :rowspan="item.shortTermGoal.length" style="vertical-align: top;">
                <Input autosize type="textarea" v-model="item.aidPeriod" />
              </td>
            </template>
          </tr>
        </template>
        <!-- 新增课题 -->
        <tr v-for="(item,index) in inputInfo.shortTermGoal" :key="index">
          <template v-if="index === 0">
            <td :rowspan="inputInfo.shortTermGoal.length"><Input type="textarea" autosize v-model="inputInfo.subjectRequirement" /></td>
            <td :rowspan="inputInfo.shortTermGoal.length"><Input type="textarea" autosize v-model="inputInfo.longTermGoal" /></td>
            <td :rowspan="inputInfo.shortTermGoal.length">
              <DatePicker class="calendarFont" type="daterange" :editable="false" size="large" placement="bottom" :placeholder="$t('global.sele')" style="width: 100%" :value="inputInfo.longPeriod" @on-change="inputInfo.longPeriod =$event" />
            </td>
          </template>

          <td><Input type="textarea" autosize v-model="inputInfo.shortTermGoal[index]" /></td>
          <td colspan="2">
            <DatePicker class="calendarFont" type="daterange" :editable="false" size="large" placement="bottom" :placeholder="$t('global.sele')" style="width: 100%" :value="inputInfo.shortPeriod[index]" @on-change="inputInfo.shortPeriod[index] =$event" />
          </td>

          <!-- <template v-if="index === 0">
              <td :rowspan="inputInfo.shortTermGoal.length"><Input type="textarea" autosize v-model="inputInfo.tryLive" /></td>
              <td :rowspan="inputInfo.shortTermGoal.length"><input type="text" v-model="inputInfo.tryLivePeriod" ></td>

              <td :rowspan="inputInfo.shortTermGoal.length"><Input type="textarea" v-model="inputInfo.approaching" autosize /></td>
              <td :rowspan="inputInfo.shortTermGoal.length"><input type="text" v-model="inputInfo.approachingPeriod" ></td>
            </template> -->

          <td  style="vertical-align: top;"><Input type="textarea" autosize v-model="inputInfo.serviceContent[index]" /></td>

          <template v-if="index === 0">
            <td :rowspan="inputInfo.shortTermGoal.length" style="vertical-align: top;"><Input type="textarea" autosize v-model="inputInfo.principal" /></td>
            <td :rowspan="inputInfo.shortTermGoal.length" style="vertical-align: top;"><Input type="textarea" autosize v-model="inputInfo.frequencies" /></td>
            <td :rowspan="inputInfo.shortTermGoal.length" style="vertical-align: top;">
              <!-- <DatePicker class="calendarFont" type="daterange" :editable="false" size="large" placement="bottom" :placeholder="$t('global.sele')" style="width: 100%" :value="inputInfo.aidPeriod" @on-change="inputInfo.aidPeriod =$event" /> -->
              <Input type="textarea" autosize v-model="inputInfo.aidPeriod" />
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="table-submit">
    <!--<button @click="handleSave">
        <i class="iconfont icon-baocun"></i> {{$t('global.preservation')}}
      </button>-->
    <button @click="handleSubmit">
      <i class="iconfont icon-submit"></i> {{$t('global.submit')}}
    </button>
  </div>
</div>
</template>

<script>
// ?test=${item.longTermGoal}&test2=${item.serviceContent}&serviceContentId=${item.id}
import func from "../network/leo";
import {
  sendPlanContent,
  getFacilitiesData,
  getDateYear,
  changePlanContent 
} from "../network/Sinyu";
import {
  format
} from '../assets/utils/Tools';
export default {
  data() {
    return {
      birthplace: '',
      oldInfo: {},
      admin: {},
      infoList: [],
      date: {
        year: '',
        month: '',
        day: ''
      },
      planInfo: {
        date: ''
      },
      inputInfo: {
        shortTermGoal: [1, 2],
        shortPeriod: [],
        serviceContent: []
      },
      occurrenceYear: format(new Date(), 'YYYY'),
      occurrenceDay: '',
      occurrenceDayList: [],
      type: ''
    };
  },
  created() {
    this.oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    this.admin = JSON.parse(localStorage.getItem('userInfo'))
    this.planInfo.date = format()
    const value = {
      oldManId: this.oldInfo.oldId,
      year: format(new Date(), 'YYYY'),
      type: 8
    }
   
      this._getDateYear(value);
    
    
  },
  methods: {
    handldDateChange(e) { //  切换年份
      this.occurrenceYear = e
      const value = {
        oldManId: this.oldInfo.oldId,
        year: this.occurrenceYear,
        type: 8
      }
      this._getDateYear(value);
    },
    handleDayChange(e) { ///   点击切换了日期
      this.getData({
        oldManId: this.oldInfo.oldId,
        date: e
      });
    },
    handleClickDate(e) { //  点击了选择日期
      this.planInfo.date = e;
      this.type = 'submit'
    },
    handleSave() { //  点击了保存

    },
    handleSubmit() { // 点击了提交
      if (this.type == 'submit' && this.planInfo.date != this.occurrenceDay) {
        //切换了新的日期（原有项目更新监控方式）
        const data = JSON.parse(this.rawData)
        data.forEach(res => {
          res.id = ''
          res.createDate = this.planInfo.date
          res.type1 = 0
          res.type2 = 0
          res.type3 = 0
          res.type4 = 0
          res.buildDate = `{"year":"${this.planInfo.date.split('-')[0]}","month":"${this.planInfo.date.split('-')[1]}","day":"${this.planInfo.date.split('-')[2]}"}`
          sendPlanContent(res).then(res => {
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
          }).catch(err => {
            console.warn(err)
          })
        })
        return;
      }
      let shortTermGoal = {}
      let shortPeriod = {}
      let serviceContent = {}
      let code = 'a'.charCodeAt()
      let code1 = 'a'.charCodeAt()
      let code2 = 'a'.charCodeAt()
      
      for (let v of this.inputInfo.shortTermGoal) {
        shortTermGoal[String.fromCharCode(code++)] = v
      }
      for (let v of this.inputInfo.shortPeriod) {
        shortPeriod[String.fromCharCode(code1++)] = v
      }
      for (let v of this.inputInfo.serviceContent) {
        serviceContent[String.fromCharCode(code2++)] = v
      }
      const date = new Date();
      const year = date.getFullYear();
      const mon = date.getMonth() + 1;
      let statusList = []
      for (let i = 0; i < 2; i++) {
        let arri = []
        for (let j = 0; j < 1; j++) {
          let arrj = [];
          for (let x = 0; x < 3; x++) {
            let arrx = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
            arrj.push(arrx);
          }
          arri.push(arrj);
        }
        statusList.push(arri);
      }
      const data = Object.assign({}, this.inputInfo, {
        shortTermGoal: JSON.stringify(shortTermGoal),
        shortPeriod: JSON.stringify(shortPeriod),
        longPeriod: JSON.stringify(this.inputInfo.longPeriod),
        aidPeriod: JSON.stringify(this.inputInfo.aidPeriod),
        serviceContent: JSON.stringify(serviceContent),
        buildDate: `{"year":"${this.planInfo.date.split('-')[0]}","month":"${this.planInfo.date.split('-')[1]}","day":"${this.planInfo.date.split('-')[2]}"}`,
        createDate: this.planInfo.date,
        birthplace: this.birthplace,
        oldManId: this.oldInfo.oldId,
        oldManName: this.oldInfo.name,
        operatorId: this.admin.adminId,
        statusList: JSON.stringify(statusList)
      })
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("global.submitInfo"),
        okText: this.$t('global.sure'),
        cancelText: this.$t('global.cancel'),
        onOk: () => {
          //修改课题
          this.infoList.forEach(res => {
            let shortTermGoal = {}
            let shortPeriod = {}
            let serviceContent = {}
            let code = 'a'.charCodeAt()
            let code1 = 'a'.charCodeAt()
            let code2 = 'a'.charCodeAt()
            for (let v of res.shortTermGoal) {
              shortTermGoal[String.fromCharCode(code++)] = v
            }
            for (let v of res.shortPeriod) {
              shortPeriod[String.fromCharCode(code1++)] = v
            }
            for (let v of res.serviceContent) {
              serviceContent[String.fromCharCode(code2++)] = v
            }
            const data = Object.assign({}, res, {
              checkItem: JSON.stringify(res.checkItem),
              longPeriod: JSON.stringify(res.longPeriod),
              buildDate: `{"year":"${this.planInfo.date.split('-')[0]}","month":"${this.planInfo.date.split('-')[1]}","day":"${this.planInfo.date.split('-')[2]}"}`,
              shortTermGoal: JSON.stringify(shortTermGoal),
              shortPeriod: JSON.stringify(shortPeriod),
              serviceContent: JSON.stringify(serviceContent),
              statusList: JSON.stringify(res.statusList)
            })
            changePlanContent(data).then(res => {
              if (res.code === 0) {
                this.$Notice.success({
                  title: this.$t("global.successfully"),
                  duration: 2
                });
                this.getData({
                  oldManId: this.oldInfo.oldId,
                  date: this.planInfo.date
                })
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
            }).catch(err => {
              this.$Notice.error({
                title: this.$t("global.failed"),
                duration: 2
              });
            })
          })

          //新增课题
          if (data.frequencies && data.principal && this.inputInfo.serviceContent.length > 1 && this.inputInfo.shortPeriod.length > 1) {
            sendPlanContent(data).then(res => {
              if (res.code === 0) {
                this.getData({
                  oldManId: this.oldInfo.oldId,
                  date: this.planInfo.date
                })
                this.inputInfo = {
                  aidPeriod: '',
                  serviceContent: [],
                  shortPeriod: [],
                  shortTermGoal: [1, 2]
                };
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
            }).catch(err => {
              this.$Notice.error({
                title: this.$t("global.failed"),
                duration: 2
              });
              console.log(err)
            })
          } 
          
        }
      })
    },
    handleJumpAim(item, type) {
      //   点击跳转,数据存入缓存
      const data = Object.assign(item, {
        type
      });
      sessionStorage.setItem("monitorType", JSON.stringify(data));
    },
    async getData(data) {
      try {
        const res = await func.getFacilitiesData(data);
        if (res.code === 0 && res.data.length > 0) {
          this.rawData = JSON.stringify(res.data)
          if (res.data.length == 1 && res.data[res.data.length - 1].shortPeriod == null) {
            return;
          }
          this.infoList = res.data;
          this.infoList.forEach((res, index) => {
            this.planInfo.date = Object.values(JSON.parse(res.buildDate)).join('-')
            res.subject = res.subjectRequirement
            res.serviceContent = res.serviceContent ? Object.values(JSON.parse(res.serviceContent)) : [null, null]
            res.shortTermGoal = res.shortTermGoal ? Object.values(JSON.parse(res.shortTermGoal)) : [null, null]
            res.longPeriod = JSON.parse(res.longPeriod)
            this.birthplace = res.birthplace
            res.shortPeriod = Object.values(JSON.parse(res.shortPeriod))
            res.checkItem = JSON.parse(res.checkItem)
            res.statusList = JSON.parse(res.statusList)
          });
          // console.log('已有需求',this.infoList);
        }
      } catch (err) {
        console.warn(err)
      }
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
              this.getData({
                oldManId: this.oldInfo.oldId,
                date: this.occurrenceDay
              });
            }
          } else {
            this.occurrenceDayList = []
            this.occurrenceDay = ''
          }
        }
      }).catch(err => {
        console.warn(err)
      })
    }
  }
};
</script>

<style lang="less" scoped>
.plan-one {
  text-align: left;
  font-size: 0.14rem
    /* 14/102 */
  ;

  .ivu-input-wrapper {
    min-width: 1.47rem
      /* 150/102 */
    ;

    textarea.ivu-input {
      border: 0;
      resize: none;
    }
  }

  .plan-header {
    display: flex;
    justify-content: space-between;
    line-height: 0.39rem
      /* 40/102 */
    ;
    font-size: 0.16rem
      /* 16/102 */
    ;

    label:last-child input {
      text-align: right;
      width: 0.39rem
        /* 40/102 */
      ;
    }

    input {
      border: 0;
      outline: none;
      width: 0.98rem
        /* 100/102 */
      ;
    }
  }

  // .plan-header end

  .plan-table {
    width: 100%;
    text-align: center;
    line-height: 0.49rem
      /* 50/102 */
    ;
    border-collapse: collapse;
    border-color: var(--border-color);
    background: #fff;
    border-radius: 5px;
    overflow: hidden;

    li {
      white-space: nowrap;
    }

    .num {
      position: absolute;
      top: 0;
      left: 0;
    }

    thead {
      background: var(--table-bg);
      color: #fff;
    }

    td:first-child {
      width: 1.27rem
        /* 130/102 */
      ;
      padding: 0.03rem
        /* 3/102 */
      ;
      position: relative;
    }

    td {
      padding: 0 0.05rem;
      white-space: normal;
    }

    tbody td {
      line-height: .20rem
        /* 30/20 */
      ;
      position: relative;
    }

    input {
      border: 0;
      outline: none;
      text-align: center;
    }

    /deep/.ivu-input[disabled],
    /deep/fieldset[disabled] .ivu-input {
      background-color: #fff !important;
      border: 0 !important;
    }
  }

}

// .plan-one end
.red {
  color: #f00;
}
</style>
