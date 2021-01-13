<template>
<div class="plan-two" v-show="tableList.length">
  <div class="trip-title">{{$t("FacilitiesPlan3.title")}}</div>

  <div class="plan-header">
    <label>
      {{$t("FacilitiesPlan2.Username")}}：{{oldInfo.name}} {{$t('global.honorName')}}
    </label>
    <label>
      {{$t("FacilitiesPlan2.Production")}}:
      {{date.year}}
      {{$t('global.year')}}
      {{date.month}}
      {{$t('global.month')}}
      {{date.day}}
      {{$t('global.day')}}
    </label>
  </div>

  <div style="overflow-x:scroll;white-space:nowrap">
    <table class="plan-table new-table" border="1" style="border:1px solid #c4e8bf;overflow-x:scroll;white-space:nowrap">
      <thead>
        <tr>
          <td rowspan="2">{{$t("FacilitiesPlan2.Issues")}}<span class='required'>*</span></td>
          <td colspan="4">{{$t("FacilitiesPlan2.Aid")}}<span class='required'>*</span></td>
          <td colspan="5">{{$t("FacilitiesPlan2.Content")}}<span class='required'>*</span></td>
          <td v-for="(item,index) in dayNum" :key="index">{{index+1}}</td>
        </tr>
        <tr>
          <td style="min-width: 1rem;">{{$t("FacilitiesPlan2.goals")}}<span class='required'>*</span></td>
          <td style="min-width: 2.4rem;">{{$t("FacilitiesPlan2.Period")}}<span class='required'>*</span></td>
          <td style="min-width: 1rem;">{{$t('repair.goal')}}<span class='required'>*</span></td>
          <td style="min-width: 2.4rem;">{{$t("FacilitiesPlan2.Period")}}<span class='required'>*</span></td>
          <td colspan="3">{{$t("FacilitiesPlan2.Service")}}<span class='required'>*</span></td>
          <td>{{$t("FacilitiesPlan2.Check")}}</td>
          <td>{{$t("FacilitiesPlan2.Special")}}</td>
          <td v-for="(item,index) in weekList" :key="index">{{item}}</td>
        </tr>
      </thead>
      <tbody v-for="(item,tabIndex) in tableList" :key="item+tabIndex">
        <template v-for="(termItem,termIndex) in item.checkItem">
          <template v-for="(serveItem,serveIndex) in termItem">
            <tr v-for="(oItem, index) in serveItem.oList" :key="'o'+index+tabIndex+serveIndex+termIndex+oItem">
              <template v-if="termIndex ===0 && serveIndex === 0 && index ===0">
                <td :rowspan="item.allLength" class="alignLeft">
                  <div>#{{tabIndex+1}}</div>
                  <Input type="textarea" autosize v-model="item.subjectRequirement" />
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
              <td :class="oItem.profession" :rowspan="serveItem.oList.length" v-if="index === 0">
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
              <!-- O的状态列表 -->
              <td v-for="(itemStatus1,indexStatus1) in dayNum" :key="indexStatus1" @click="showPop(tabIndex,termIndex,serveIndex,index,indexStatus1,0)" style="width:0.5rem">
                {{item.statusList[termIndex][serveIndex][index][indexStatus1]}}
              </td>
            </tr>
            <tr v-for="(tItem, index) in serveItem.tList" :key="'t'+index+tabIndex+serveIndex+termIndex+tItem">
              <td :class="tItem.profession" v-if="index === 0" :rowspan="serveItem.tList.length">T</td>
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
              <!-- T的状态列表 -->
              <td v-for="(itemStatus2,indexStatus2) in dayNum" :key="indexStatus2" @click="showPop(tabIndex,termIndex,serveIndex,index+serveItem.oList.length,indexStatus2,1)" style="width:0.5rem">
                {{item.statusList[termIndex][serveIndex][index+serveItem.oList.length][indexStatus2]}}
              </td>
            </tr>
            <tr v-for="(eItem, index) in serveItem.eList" :key="'e'+index+tabIndex+serveIndex+termIndex+eItem">
              <td :class="eItem.profession" v-if="index === 0" :rowspan="serveItem.eList.length">E</td>
              <td :class="eItem.profession" class="alignLeft">
                <Input type="textarea" autosize v-model="eItem.title" />
              </td>
              <td style="text-align: left;" :class="eItem.profession">
                <RadioGroup v-model="eItem.testing">
                  <Radio label="1" @mouseup.native="handleRadioGroup('eList',tabIndex,eItem.profession,termIndex,serveIndex,index,'1')">{{$t("FacilitiesPlan2.tYes")}}</Radio>
                  <Radio label="2" @mouseup.native="handleRadioGroup('eList',tabIndex,eItem.profession,termIndex,serveIndex,index,'2')">{{$t("FacilitiesPlan2.tNo")}}</Radio>
                </RadioGroup>
              </td>
              <td class="alignLeft">
                <Input type="textarea" autosize v-model="eItem.special" />
              </td>
              <!-- E的状态列表 -->
              <td v-for="(itemStatus3,indexStatus3) in dayNum" :key="indexStatus3" @click="showPop(tabIndex,termIndex,serveIndex,index+serveItem.oList.length+serveItem.tList.length,indexStatus3,2)" style="width:0.5rem">
                {{item.statusList[termIndex][serveIndex][index+serveItem.oList.length+serveItem.tList.length][indexStatus3]}}
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
  <div class="plan-footer">
    <p>● {{$t("FacilitiesPlan3.completed")}}</p>
    <p>◎ {{$t("FacilitiesPlan3.immature")}}</p>
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
  getDateYear
} from "../network/Sinyu";
export default {
  data() {
    return {
      oldInfo: {},
      userInfo: {},
      serviceContentId: null,
      date: {},
      info: {
        oldManName: "",
        birthplace: "",
      },
      termList: [],
      termInfo: '',
      tableList: [],
      dblclickNum: 1,
      weekList: [],
      dayNum: 0, //当月天数
      dayList: [],
      selectList: [{
          value: 0,
          title: this.$t("FacilitiesPlan3.immature")
        },
        {
          value: 1,
          title: this.$t("FacilitiesPlan3.completed")
        }
      ],
      selectValue: -1,
      statusList: [],
      aimName: '',
      aimTime: '',
    };
  },
  created() {
    this.oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.info.oldManName = this.oldInfo.name;

    this.getCalendar();
    const value = {
      oldManId: this.oldInfo.oldId,
      year: format(new Date(), 'YYYY'),
      type: 9
    }
    this._getDateYear(value)
  },
  methods: {
    onClose() {
      //    添加服务内容店家取消
      this.isAddServe = false;
    },
    handleSubmit() {
      //       处理提交
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
              statusList: JSON.stringify(res.statusList),
              longPeriod: JSON.stringify(res.longPeriod),
              serviceContent: JSON.stringify(serviceContent),
              shortTermGoal: JSON.stringify(shortTermGoal),
              shortPeriod: JSON.stringify(shortPeriod)
            })
            changePlanContent(data).then(res => {
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
              this.$Notice.error({
                title: this.$t("global.failed"),
                duration: 2
              });
            })
          })
        }
      });
    },
    handleRadioGroup(type, index, worker, termIndex, serveIndex, wayIndex, way) {
      ///   处理选择单选框
      if (this.tableList[index].checkItem[termIndex][serveIndex][type][wayIndex].testing == way) {
        setTimeout(() => {
          this.tableList[index].checkItem[termIndex][serveIndex][type][wayIndex].testing = '';
        }, 10)
      }
    },
    handleSave() {
      //  处理保存
    },
    ///          网络请求           ///
    _getServePlan(data) {
      func.getFacilitiesData(data).then(res => {
          if (res.code === 0) {
            if (res.code === 0 && typeof res.data === 'object') {
              this.tableList = res.data;
              this.info.birthplace = res.data[0].birthplace
              this.tableList.forEach((res, index) => {
                this.date = JSON.parse(res.buildDate)
                res.longPeriod = JSON.parse(res.longPeriod)
                res.shortPeriod = Object.values(JSON.parse(res.shortPeriod))
                res.shortTermGoal = Object.values(JSON.parse(res.shortTermGoal))
                res.serviceContent = Object.values(JSON.parse(res.serviceContent))
                res.checkItem = JSON.parse(res.checkItem)
                if (res.statusList && new Date().getDate() !== 1) {
                  res.statusList = JSON.parse(res.statusList)
                } else {
                  let newArr = []
                  res.checkItem.forEach((result, index) => {
                    newArr.push([])
                    result.forEach((res, ix) => {
                      newArr[index].push([])
                      const leng = res.oList.length + res.tList.length + res.eList.length
                      for (let i = 0; i < leng; i++) {
                        newArr[index][ix].push(new Array(this.weekList.length).fill(''))
                      }
                    })
                  })
                  res.checkItem = newArr
                }

                res.index = []
                res.allLength = 0
                if (res.checkItem) {
                  res.checkItem.forEach((result, resIndex) => {
                    let data = 0
                    result.forEach((inres, index) => {
                      data += inres.eList.length + inres.oList.length + inres.tList.length
                    })
                    res.index.push(data)
                  })
                }
                for (let value of res.index) {
                  res.allLength += value
                }

              })
            } else {
              this.$Notice.error({
                title: this.$t("FacilitiesPlan2.demandAdd"),
                duration: 2
              });
            }
          }
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    //生成本月星期列表
    getCalendar() {
      var date = new Date();
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var aItem = "";
      //获取当月天数
      // var d = new Date(year, mon, 0).getDate();
      this.dayNum = new Date(year, mon, 0).getDate();
      for (var i = 1; i <= new Date(year, mon, 0).getDate(); i++) {
        this.dayList.push('');
        var day = year + "/" + mon + "/" + i;
        var a = new Date(day).getDay();
        if (a == 0) {
          aItem = "日";
        } else if (a == 1) {
          aItem = "月";
        } else if (a == 2) {
          aItem = "火";
        } else if (a == 3) {
          aItem = "水";
        } else if (a == 4) {
          aItem = "木";
        } else if (a == 5) {
          aItem = "金";
        } else if (a == 6) {
          aItem = "土";
        }
        this.weekList.push(aItem);
      }
    },
    //显示弹框
    showPop(tabIndex, termIndex, serveIndex, index, typeIndex, type) {
      if (this.tableList[tabIndex].statusList[termIndex][serveIndex][index][typeIndex]) {
        if (this.tableList[tabIndex].statusList[termIndex][serveIndex][index][typeIndex] == '●') {
          this.$set(this.tableList[tabIndex].statusList[termIndex][serveIndex][index], [typeIndex], '◎')
          return;
        }
        if (this.tableList[tabIndex].statusList[termIndex][serveIndex][index][typeIndex] == '◎') {
          this.$set(this.tableList[tabIndex].statusList[termIndex][serveIndex][index], [typeIndex], '')
          return;
        }
      } else {
        this.$set(this.tableList[tabIndex].statusList[termIndex][serveIndex][index], [typeIndex], '●')
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
              this._getServePlan({
                oldManId: this.oldInfo.oldId,
                date: this.occurrenceDay
              });
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

    p {
      margin: 0 0.15rem
        /* 15/102 */
      ;
    }

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
// 遮罩层
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

// 对话框
.popupBox {
  width: 20%;
  position: fixed;
  top: 3rem;
  left: 40%;
  margin: auto;
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
  text-align: center;
}
</style><style lang="less">
textarea.ivu-input {
  background-color: transparent !important;
  text-align: center;
}
</style>
