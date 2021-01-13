<template>
<div class="plan-two" v-show="tableList.length">
  <div class="trip-title">{{$t("FacilitiesPlan2.title")}}</div>
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
      {{$t("FacilitiesPlan2.Username")}}：{{oldInfo.name}} {{$t('global.honorName')}}
    </label>
    <label class="flex" style="display: flex; justify-content: flex-end">
      {{$t("FacilitiesPlan1.Production")}}:
      <DatePicker class="calendarFont" :value="planInfo.date" :editable="false" format="yyyy-MM-dd" type="date" size="large" :placeholder="$t('global.sele')" style="width: 1.5rem;" @on-change="handleClickDate" @focus="this.blur()"></DatePicker>
    </label>
  </div>

  <div style="overflow-x:scroll;white-space:nowrap">
    <table class="plan-table new-table" border="1" style="border:1px solid #c4e8bf;overflow-x:scroll;white-space:nowrap">
      <thead>
        <tr>
          <td rowspan="2">{{$t("FacilitiesPlan2.Issues")}}<span class='required'>*</span></td>
          <td colspan="4">{{$t("FacilitiesPlan2.Aid")}}<span class='required'>*</span></td>
          <td colspan="5">{{$t("FacilitiesPlan2.Content")}}<span class='required'>*</span></td>
        </tr>
        <tr>
          <td style="min-width: 1rem;">{{$t("FacilitiesPlan2.goals")}}<span class='required'>*</span></td>
          <td style="min-width: 2.4rem;">{{$t("FacilitiesPlan2.Period")}}<span class='required'>*</span></td>
          <td style="min-width: 1rem;">{{$t('repair.goal')}}<span class='required'>*</span></td>
          <td style="min-width: 2.4rem;">{{$t("FacilitiesPlan2.Period")}}<span class='required'>*</span></td>
          <td colspan="3" @click="seleServe = true">{{$t("FacilitiesPlan2.Service")}}<span class='required'>*</span></td>
          <td>{{$t("FacilitiesPlan2.Check")}}</td>
          <td>{{$t("FacilitiesPlan2.Special")}}</td>
        </tr>
      </thead>
      <!--<Modal v-model="isAddAim" title="添加短期目标" @on-ok="handleAddAim()" @on-cancel="isAddAim = false" width="250px" >
          <Select v-model="seleTable" style="width:100%;margin-bottom: .1rem;">
            <Option v-for="item in seleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="profession" style="width:100%;margin-bottom: .1rem;">
            <Option v-for="item in professionList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
          </Select>
          <Input v-model="aimName" placeholder="请输入目标名字" style="margin-bottom: .1rem" />
          <Input v-model="aimTime" placeholder="请输入目标期间" />
        </Modal> -->
      <Modal v-model="seleServe" width="360">
        <p slot="header" style="text-align:center">
          <span>{{$t("global.handleSele")}}</span>
        </p>
        <div style="text-align:center">
          <Button type="primary" long style="margin-bottom: .1rem" @click="handleSeleNode('添加服务内容')">{{$t("FacilitiesPlan2.addServe")}}</Button>
          <Button type="primary" long @click="handleSeleNode('修改服务内容职业')">{{$t("FacilitiesPlan2.changeServe")}}</Button>
        </div>
        <div slot="footer"></div>
      </Modal>
      <Modal v-model="isAddServe" :title="$t('global.handleSele')" @on-ok="handleAddSubmit()" @on-cancel="onClose" :ok-text="$t('global.sure')" :cancel-text="$t('global.cancel')" width="250px">
        <Select v-model="seleTable" style="width:100%;margin-bottom: .1rem;" :placeholder="$t('global.sele')">
          <Option v-for="item in seleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="termInfo" style="width:100%;margin-bottom: .1rem;" :placeholder="$t('global.sele')">
          <Option v-for="item in termList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="profession" style="width:100%" :placeholder="$t('global.sele')">
          <Option v-for="item in professionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Modal>
      <tbody v-for="(item,tabIndex) in tableList" :key="item+tabIndex">
        <template v-for="(termItem,termIndex) in item.checkItem">
          <template v-for="(serveItem,serveIndex) in termItem">
            <tr v-for="(oItem, index) in serveItem.oList" :key="'o'+index+tabIndex+serveIndex+termIndex+oItem">
              <template v-if="termIndex ===0 && serveIndex === 0 && index ===0">
                <td :rowspan="item.allLength" class="alignLeft">
                  <div>#{{tabIndex+1}}</div>
                  <Input autosize type="textarea" v-model="item.subjectRequirement" />
                </td>
                <td :rowspan="item.allLength" class="alignLeft">
                  <Input type="textarea" autosize v-model="item.longTermGoal" />
                </td>
                <td :rowspan="item.allLength">
                  <DatePicker class="calendarFont" type="daterange" :editable="false" size="large" placement="bottom-end" :placeholder="$t('global.sele')" style="width: 100%" :value="item.longPeriod" @on-change="item.longPeriod =$event" />
                </td>
              </template>
              <template v-if="serveIndex === 0 && index === 0">
                <td :rowspan="item.index[termIndex]" class="alignLeft">
                  <Input type="textarea" autosize v-model="item.shortTermGoal[termIndex]" />
                </td>
                <td :rowspan="item.index[termIndex]">
                  <DatePicker class="calendarFont" type="daterange" :editable="false" size="large" placement="bottom-end" :placeholder="$t('global.sele')" style="width: 100%" :value="item.shortPeriod[termIndex]" @on-change="item.shortPeriod[termIndex] =$event" />
                </td>
                <td :rowspan="item.index[termIndex]" style="min-width: 4rem;vertical-align: top;" class="alignLeft">
                  <Input type="textarea" autosize style="min-width: 1rem;" v-model="item.serviceContent[termIndex]" />
                </td>
              </template>
              <td :class="oItem.profession" :rowspan="serveItem.oList.length" v-if="index === 0" @click="handleOTE('oList',tabIndex,oItem.profession,termIndex,serveIndex)">
                <div>O</div>
              </td>
              <td :class="oItem.profession" class="alignLeft">
                <Input type="textarea" autosize style="min-width: 1.5rem;" v-model="oItem.title" />
              </td>
              <td style="text-align: left;" :class="oItem.profession">
                <RadioGroup v-model="oItem.testing">
                  <Radio label="1" @mouseup.native="handleRadioGroup('oList',tabIndex,oItem.profession,termIndex,serveIndex,index,'1')">{{$t("FacilitiesPlan2.Yes")}}</Radio>
                  <Radio label="2" @mouseup.native="handleRadioGroup('oList',tabIndex,oItem.profession,termIndex,serveIndex,index,'2')">{{$t("FacilitiesPlan2.No")}}</Radio>
                </RadioGroup>
              </td>
              <td class="alignLeft">
                <Input type="textarea" autosize style="min-width: 1.5rem;" v-model="oItem.special" />
              </td>
            </tr>
            <tr v-for="(tItem, index) in serveItem.tList" :key="'t'+index+tabIndex+serveIndex+termIndex+tItem">
              <td :class="tItem.profession" v-if="index === 0" :rowspan="serveItem.tList.length" @click="handleOTE('tList',tabIndex,tItem.profession,termIndex,serveIndex)">T</td>
              <td :class="tItem.profession" class="alignLeft">
                <Input type="textarea" autosize v-model="tItem.title" />
              </td>
              <td style="text-align: left;" :class="tItem.profession">
                <RadioGroup v-model="tItem.testing">
                  <Radio label="1" @mouseup.native="handleRadioGroup('tList',tabIndex,tItem.profession,termIndex,serveIndex,index,'1')">{{$t("FacilitiesPlan2.tYes")}}</Radio>
                  <Radio label="2" @mouseup.native="handleRadioGroup('tList',tabIndex,tItem.profession,termIndex,serveIndex,index,'2')">{{$t("FacilitiesPlan2.tNo")}}</Radio>
                </RadioGroup>
              </td>
              <td class="alignLeft">
                <Input type="textarea" autosize v-model="tItem.special" />
              </td>
            </tr>
            <tr v-for="(eItem, index) in serveItem.eList" :key="'e'+index+tabIndex+serveIndex+termIndex+eItem">
              <td :class="eItem.profession" v-if="index === 0" :rowspan="serveItem.eList.length" @click="handleOTE('eList',tabIndex,eItem.profession,termIndex,serveIndex)">E</td>
              <td :class="eItem.profession" class="alignLeft">
                <Input type="textarea" autosize v-model="eItem.title" />
              </td>
              <td style="text-align:left;" :class="eItem.profession">
                <RadioGroup v-model="eItem.testing">
                  <Radio label="1" @mouseup.native="handleRadioGroup('eList',tabIndex,eItem.profession,termIndex,serveIndex,index,'1')">{{$t("FacilitiesPlan2.tYes")}}</Radio>
                  <Radio label="2" @mouseup.native="handleRadioGroup('eList',tabIndex,eItem.profession,termIndex,serveIndex,index,'2')">{{$t("FacilitiesPlan2.tNo")}}</Radio>
                </RadioGroup>
              </td>
              <td class="alignLeft">
                <Input type="textarea" autosize v-model="eItem.special" />
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
  <ul class="plan-footer">
    <li>{{$t("FacilitiesPlan2.Physician")}}</li>
    <li>{{$t("FacilitiesPlan2.Care")}}</li>
    <li>{{$t("FacilitiesPlan2.Introduction")}}</li>
    <li>{{$t('FacilitiesPlan2.pemulihan')}}</li>
    <li>{{$t('FacilitiesPlan2.Physician1')}}</li>
  </ul>
  <div class="table-submit">
    <!--<button @click="handleSave">
        <i class="iconfont icon-baocun"></i>
        {{$t('global.preservation')}}
      </button> -->
    <button @click="handleSubmit">
      <i class="iconfont icon-submit"></i>
      {{$t('global.submit')}}
    </button>
  </div>
</div>
</template>

<script>
let profession = '';
import {
  format,
  debounce
} from "../assets/utils/Tools";
import func from "../network/leo";
import {
  changePlanContent,
  changePlanItem,
  sendPlanItem,
  getItemList,
  getFacilitiesData,
  sendPlanContent,
  getDateYear
} from "../network/Sinyu";
export default {
  data() {
    return {
      oldInfo: {},
      userInfo: {},
      serviceContentId: null,
      info: {
        oldManName: "",
        birthplace: ""
      },
      planInfo: {},
      seleServe: false,
      isAddServe: false,
      seleList: [],
      loop: null,
      seleTable: null,
      termList: [],
      termInfo: '',
      professionList: [{
          value: "doctor",
          label: this.$t("FacilitiesPlan2.Physician")
        },
        {
          value: "nurse",
          label: this.$t("FacilitiesPlan2.Care")
        },
        {
          value: "intro",
          label: this.$t("FacilitiesPlan2.Introduction")
        },
        {
          value: "recovery",
          label: this.$t("FacilitiesPlan2.pemulihan")
        },
        {
          value: "doctor1",
          label: this.$t("FacilitiesPlan2.Physician1")
        }
      ],
      profession: "",
      tableList: [],
      dblclickNum: 0,
      dblclickote: 0,
      dayNum: 0, //当月天数
      statusList: [],
      isAddAim: false,
      aimName: '',
      aimTime: '',
      occurrenceYear: format(new Date(), 'YYYY'),
      occurrenceDay: '',
      occurrenceDayList: [],
      type: ''
    };
  },
  created() {
    this.oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.info.oldManName = this.oldInfo.name;
    switch (this.userInfo.level) {
      case 2:
        profession = 'doctor';
        break;
      case 1:
        profession = 'nurse';
        break;
      case 0:
        profession = 'intro';
        break;
      case 7:
        profession = 'recovery';
        break;
      case 4:
        profession = 'doctor1';
        break;
    }
    this.profession = profession
  },
  mounted() {
    this.$nextTick(() => {
      const value = {
        oldManId: this.oldInfo.oldId,
        year: format(new Date(), 'YYYY'),
        type: 9
      }
      this._getDateYear(value);
    });
  },
  methods: {
    handldDateChange(e) { //  切换年份
      this.occurrenceYear = e
      const value = {
        oldManId: this.oldInfo.oldId,
        year: this.occurrenceYear,
        type: 9
      }
      this._getDateYear(value);
    },
    handleDayChange(e) { ///   点击切换了日期
      this.seleList = []
      this.termList = []
      let data = {}
      if (this.$route.query.oldId) {
        data = {
          oldManId: this.$route.query.oldId,
          date: this.occurrenceDay
        }
      } else {
        data = {
          oldManId: this.oldInfo.oldId,
          date: this.occurrenceDay
        }
      }
      this._getServePlan(data);
    },
    handleClickDate(e) { //  点击了选择日期
      this.planInfo.date = e;
      this.type = 'submit'
    },
    handleOTE(type, index, worker, termIndex, serveIndex) {
      this.dblclickote++;
      let timeoutflag = true;
      if (timeoutflag != null) {
        setTimeout(() => {
          if (this.dblclickote == 1) {
            this.addCut(type, index, worker, termIndex, serveIndex)
          }
          if (this.dblclickote == 2) {
            this.addRow(type, index, worker, termIndex, serveIndex)
          }
          this.dblclickote = 0;
        }, 300);
      }
    },
    addRow(type, index, worker, termIndex, serveIndex) { // 增加OTE
      let obj = {
        title: "",
        content: "",
        testing: "",
        special: "",
        profession: worker
      };
      this.tableList[index].checkItem[termIndex][serveIndex][type].push(obj)
      this.tableList[index].allLength += 1;
      this.tableList[index].index[termIndex] += 1;

      ///    增加对应的statusList
      this.tableList[index].statusList[termIndex][serveIndex].push(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])
    },
    addCut(type, index, worker, termIndex, serveIndex) { //   删除OTE
      if (this.tableList[index].checkItem[termIndex][serveIndex][type].length > 1) {
        this.tableList[index].checkItem[termIndex][serveIndex][type].pop()
        this.tableList[index].allLength -= 1;
        this.tableList[index].index[termIndex] -= 1;
        ///    删除对应的statusList
        this.tableList[index].statusList[termIndex][serveIndex].pop()
      }
    },
    handleRadioGroup(type, index, worker, termIndex, serveIndex, wayIndex, way) {
      ///   处理选择单选框
      if (this.tableList[index].checkItem[termIndex][serveIndex][type][wayIndex].testing == way) {
        setTimeout(() => {
          this.tableList[index].checkItem[termIndex][serveIndex][type][wayIndex].testing = '';
        }, 10)
      }
    },
    handleSeleNode(type) {
      this.loop = type;
      this.seleServe = false;
      this.isAddServe = true;
    },
    AddOTE() { // 添加OTE
      this.tableList[this.seleTable - 1].checkItem[this.termInfo - 1].push({
        oList: [{
          title: "",
          content: "",
          testing: "",
          special: "",
          profession: this.profession
        }],
        tList: [{
          title: "",
          content: "",
          testing: "",
          special: "",
          profession: this.profession
        }],
        eList: [{
          title: "",
          content: "",
          testing: "",
          special: "",
          profession: this.profession
        }]
      });
      this.tableList[this.seleTable - 1].statusList[this.termInfo - 1].push([
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
      ])
      this.tableList[this.seleTable - 1].allLength += 3;
      this.tableList[this.seleTable - 1].index[this.termInfo - 1] += 3
    },
    handleAddSubmit() {
      //  添加服务内容点击确认
      if (this.loop == '修改服务内容职业') {
        const arr = Object.values(
          this.tableList[this.seleTable - 1].checkItem[this.termInfo - 1][0]
        );
        arr.forEach(res => {
          res.forEach(result => {
            result.profession = this.profession;
          });
        });
      } else {
        this.AddOTE()
      }
    },
    handleAddAim() {},
    onClose() {
      //    添加服务内容店家取消
      this.isAddServe = false;
    },
    handleSubmit() {
      //       处理提交
      if (this.type == 'submit' && this.planInfo.date != this.occurrenceDay) {
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
            console.warn(err)
          })
        })
        return;
      }
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("global.save"),
        okText: this.$t('global.sure'),
        cancelText: this.$t('global.cancel'),
        onOk: () => {
          ///    提交项目
          this.tableList.forEach(res => {
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
        }
      });
    },
    handleSave() {
      //  处理保存
    },
    ///          网络请求           ///
    _getServePlan(data) {
      func.getFacilitiesData(data).then(res => {
          if (res.code === 0) {
            if (res.code === 0 && res.data.length > 0) {
              this.rawData = JSON.stringify(res.data)
              this.tableList = res.data;
              this.info.birthplace = res.data[0].birthplace
              this.tableList.forEach((res, index) => {
                this.planInfo.date = Object.values(JSON.parse(res.buildDate)).join('-')
                res.serviceContent = Object.values(JSON.parse(res.serviceContent))
                res.shortPeriod = Object.values(JSON.parse(res.shortPeriod))
                res.shortTermGoal = Object.values(JSON.parse(res.shortTermGoal))
                res.longPeriod = JSON.parse(res.longPeriod)
                res.checkItem = JSON.parse(res.checkItem)
                res.statusList = JSON.parse(res.statusList)
                if (!res.checkItem && res.checkItem === null) {
                  res.allLength = 6
                  res.checkItem = []
                  for (let i in res.shortTermGoal) {
                    res.index = [3, 3]
                    res.checkItem.push([
                      //   服务内容
                      {
                        oList: [{
                          title: "",
                          // content: "",
                          testing: "",
                          special: "",
                          profession
                        }],
                        tList: [{
                          title: "",
                          // content: "",
                          testing: "",
                          special: "",
                          profession
                        }],
                        eList: [{
                          title: "",
                          // content: "",
                          testing: "",
                          special: "",
                          profession
                        }]
                      }
                    ])
                  }
                } else {
                  res.index = []
                  res.allLength = 0
                  res.checkItem.forEach((result, resIndex) => {
                    let data = 0
                    result.forEach(inres => {
                      data += inres.eList.length + inres.oList.length + inres.tList.length
                    })
                    res.index.push(data)
                  })
                  for (let value of res.index) {
                    res.allLength += value
                  }
                }
              })
            } else {
              this.$Notice.error({
                title: this.$t("FacilitiesPlan2.demandAdd"),
                duration: 2
              });
            }
            this.tableList.forEach((res, index) => {
              this.seleList.push({
                value: index + 1,
                label: `#${index + 1}`
              });
            })
            this.tableList[0].shortTermGoal.forEach((result, index) => {
              this.termList.push({
                value: index + 1,
                label: `${this.$t("repair.goal")}${index + 1}`
              });
            })
          }
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    getCalendar() {
      var date = new Date();
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var aItem = "";
      //获取当月天数
      var d = new Date(year, mon, 0).getDate();
      this.dayNum = d;
      var s = "";
      for (var i = 0; i < d; i++) {
        if (i < d - 1) {
          s = s + '-1' + ",";
        } else {
          s = s + '-1';
        }
      }
      return s.split(",");
    },
    conversionStr(arr) {
      return arr.join(",");
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
              let data = {}
              if (this.$route.query.oldId) {
                data = {
                  oldManId: this.$route.query.oldId,
                  date: this.occurrenceDay
                }
              } else {
                data = {
                  oldManId: this.oldInfo.oldId,
                  date: this.occurrenceDay
                }
              }
              this._getServePlan(data);
            }
          } else {
            this.occurrenceDayList = []
            this.occurrenceDay = ''
            this.$Notice.error({
              title: this.$t("FacilitiesPlan2.demandAdd"),
              duration: 2
            });
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
.plan-two {
  text-align: left;
  font-size: 0.14rem
    /* 14/102 */
  ;

  .plan-header {
    display: flex;
    justify-content: space-between;
    line-height: 0.39rem
      /* 40/102 */
    ;
    font-size: 0.16rem
      /* 16/102 */
    ;
    margin-bottom: .1rem
      /* 10/102 */
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
    line-height: 0.39rem
      /* 40/102 */
    ;
    border-collapse: collapse;
    border-color: var(--border-color);
    border-radius: 5px;
    overflow: hidden;

    .num {
      position: absolute;
      top: 0;
      left: 0;
    }

    thead {
      background: var(--table-bg);
      color: #fff;
    }

    thead tr:first-child td:first-child {
      width: 15%;
    }

    thead tr:first-child td:last-child {
      width: 50%;
    }

    td:first-child {
      width: 1.08rem
        /* 110/102 */
      ;
      padding: 0.03rem
        /* 3/102 */
      ;
    }

    tbody td:nth-child(2) {
      width: 0.29rem
        /* 30/102 */
         !important;
    }

    td {
      padding: 0.03rem
        /* 3/102 */
      ;
      position: relative;

      label {
        display: block;
        text-align: left;
        line-height: 1.5;

        &:first-child {
          margin-right: 0.1rem
            /* 10/102 */
          ;
        }
      }
    }

    textarea {
      resize: none;
      border: 0;
      width: 100%;
      min-width: 1rem;
      height: 100%;
      outline: none;
      padding: 0 0.05rem
        /* 5/102 */
      ;
    }

    input {
      outline: none;
      border: 0;
    }
  }

  // .plan-table end

  .plan-footer {
    margin-top: 0.1rem
      /* 10/102 */
    ;
    display: flex;
    justify-content: flex-end;

    li {
      padding-left: 0.25rem
        /* 25/102 */
      ;
      margin: 0 0.15rem
        /* 15/102 */
      ;
      position: relative;
      line-height: 0.25rem
        /* 25/102 */
      ;

      &::before {
        width: 0.2rem
          /* 20/102 */
        ;
        height: 0.2rem
          /* 20/102 */
        ;
        border-radius: 50%;
        display: block;
        content: "";
        background: #4f81bd;
        position: absolute;
        left: 0;
        top: 0;
      }

      &:nth-child(2)::before {
        background: #ffff00;
      }

      &:nth-child(3)::before {
        background: #ffccff;
      }

      &:nth-child(4)::before {
        background: #9bbb59;
      }

      &:nth-child(5)::before {
        background: #fabf8f;
      }
    }
  }

  // .plan-footer end

  .doctor {
    background: #4f81bd;
  }

  .nurse {
    background: #ffff00;
  }

  .intro {
    background: #ffccff;
  }

  .recovery {
    background: #9bbb59;
  }

  .doctor1 {
    background: #fabf8f;
  }

  .short-term {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .term-list {
      border-bottom: 1px solid var(--table-bg);
      flex: 1;

      &:last-child {
        border-bottom: 0;
      }
    }
  }
}

// .plan-two end
</style><style lang="less">
textarea.ivu-input {
  background-color: transparent !important;
  text-align: center;
}

.alignLeft textarea.ivu-input {
  text-align: left !important;
}
</style>
