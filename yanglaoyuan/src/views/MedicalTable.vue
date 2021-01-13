<template>
<div class="medicalTable">
  <div>
    <div class="Injuries">
      <span v-for="(item , index) in menu" :key="index" @click="onMenuChange(index)" :class="tabIndex == index ? 'btn-select' : ''">{{$t(item)}}</span>
    </div>
    <table v-show="tabIndex == 0 || tabBlock == 0" class="table" cellspacing="0" cellpadding="0" border="1" width="100%" style="overflow:auto;">
      <thead>
        <td class="head-bg" style="width:40%;">{{$t('medicalTable.titles.injuryName')}}<span class="required">*</span></td>
        <td class="head-bg time">{{$t('medicalTable.titles.start')}} <span class="required">*</span></td>
        <td class="head-bg time">{{$t('medicalTable.titles.termination')}} <span class="required">*</span></td>
        <td class="head-bg">{{$t('medicalTable.titles.return')}} <span class="required">*</span></td>
      </thead>
      <tr v-for="(value , index) in Calendar_list" :key="index" style="white-space:nowrap;">
        <td>
          <Input type="textarea" autosize v-model="Calendar_list[index].get_Calendar_name" class="new-width-input line-height" />
        </td>
        <td>
          <div>
            <Col span="12" style="width:100%;">
            <DatePicker class="new-width-input-date calendarFont" type="date" :editable="false" :value="Calendar_list[index].get_Calendar_dateS" :placeholder="$t('global.choose')" style="width:100%;position:relative;" @on-change="Calendar_list[index].get_Calendar_dateS = $event"></DatePicker>
            </Col>
          </div>
        </td>
        <td>
          <div>
            <Col span="12" style="width:100%;">
            <DatePicker class="new-width-input-date calendarFont" type="date" :editable="false" :value="Calendar_list[index].get_Calendar_dateE" :placeholder="$t('global.choose')" style="width:100%;position:relative;" @on-change="Calendar_list[index].get_Calendar_dateE = $event"></DatePicker>
            </Col>
          </div>
        </td>
        <td>
          <Select v-model="Calendar_list[index].get_Calendar_return" style="width:100%; position:relative" :placeholder="$t('global.choose')" size="large">
            <Option v-for="(item,ind) in seleType" :key="ind" :value="item.id">{{$t(item.name)}}</Option>
          </Select>
        </td>
      </tr>
    </table>

    <table v-show="tabIndex == 1 || tabBlock == 0" class="table" cellspacing="0" cellpadding="0" border="1" width="100%" style="overflow:auto;">
      <thead>
        <td class="head-bg">{{$t('medicalTable.titles.otherDepartments')}}<span class="required">*</span></td>
        <td class="head-bg">{{$t('medicalTable.titles.destination')}}<span class="required">*</span></td>
        <td class="head-bg">{{$t('medicalTable.titles.content')}}<span class="required">*</span></td>
      </thead>
      <tr v-for="(value , index) in Injuries_list" :key="index">
        <td>
          <div>
            <Col span="12" style="width:100%;">
            <DatePicker class="new-width-input-date calendarFont" type="date" :editable="false" :value="Injuries_list[index].get_Injuries_date" :placeholder="$t('global.choose')" style="width:100%;position:relative;" @on-change="Injuries_list[index].get_Injuries_date = $event"></DatePicker>
            </Col>
          </div>
        </td>
        <td>
          <Input type="textarea" autosize v-model="Injuries_list[index].get_Injuries_addr" class="new-width-input  line-height" style="width:100%" />
        </td>
        <td>
          <Input type="textarea" autosize class="new-width-input  line-height" v-model="Injuries_list[index].get_Injuries_content" />
        </td>
      </tr>
    </table>
  </div>
  <div class="table-submit">
    <button @click="onSend">
      <i class="iconfont icon-baocun"></i>
      {{$t('medicalTable.bulletBox.New')}}{{$t('global.submit')}}
    </button>
    <button @click="onUpdate">
      <i class="iconfont icon-submit"></i>
      {{$t('medicalTable.bulletBox.Correction')}}{{$t('global.submit')}}
    </button>
  </div>
</div>
</template>

<script>
import {
  getDisease,
  innerDisease,
  updateDisease,
  selectWholeDisease,
  getCaseHistory,
  innerCaseHistory,
  updateCaseHistory,
  selectWholeHistory
} from "../network/every";

export default {
  data() {
    return {
      tabBlock: 0,
      // 导航
      menu: ["medicalTable.tabs.injuryName", "medicalTable.tabs.medicalRecord"],
      tabIndex: 0,
      oldId: "",
      // （病历名）
      Calendar_list: [{
        get_Calendar_name: "",
        get_Calendar_return: ""
      }],
      // （病历表）
      Injuries_list: [{
        get_Injuries_addr: "",
        get_Injuries_content: ""
      }],
      // 回程列表
      seleType: [{
          id: "1",
          name: "MedicalTable.healing"
        },
        {
          id: "2",
          name: "MedicalTable.death"
        },
        {
          id: "3",
          name: "MedicalTable.abort"
        }
      ]
    };
  },
  computed: {
    // // 病历名
    // boolNull() {
    //   if (
    //     this.Calendar_list[0].get_Calendar_name != "" &&
    //     this.Calendar_list[0].get_Calendar_return != ""
    //   ) {
    //     return true;
    //   } else {
    //     this.$Notice.error({
    //       title: this.$t("global.operationFail"),
    //       desc: this.$t("CarePlan.CarePlan120")
    //     });
    //     return false;
    //   }
    // },
    // // 受诊病历
    // boolNull2() {
    //   if (
    //     this.Injuries_list[0].get_Injuries_addr != "" &&
    //     this.Injuries_list[0].get_Injuries_content != ""
    //   ) {
    //     return true;
    //   } else {
    //     this.$Notice.error({
    //       title: this.$t("global.operationFail"),
    //       desc: this.$t("CarePlan.CarePlan120")
    //     });
    //     return false;
    //   }
    // }
  },
  methods: {
    // 切换表格
    onMenuChange(index) {
      this.tabIndex = index;
    },

    //病历名验证
    verifyB(index) {
      if (
        !this.Calendar_list[index].get_Calendar_name ||
        !this.Calendar_list[index].get_Calendar_return ||
        !this.Calendar_list[index].get_Calendar_dateS ||
        !this.Calendar_list[index].get_Calendar_dateE
      ) {
        this.$Notice.error({
          title: this.$t("global.operationFail"),
          desc: this.$t("CarePlan.CarePlan120")
        });
        return false
      }
    },

    //受诊病历验证
    verifyS(index) {
      if (
        !this.Injuries_list[index].get_Injuries_addr ||
        !this.Injuries_list[index].get_Injuries_content ||
        !this.Injuries_list[index].get_Injuries_date
      ) {
        this.$Notice.error({
          title: this.$t("global.operationFail"),
          desc: this.$t("CarePlan.CarePlan120")
        });
        return false;
      }
    },

    // 提交表格
    async onSend() {
      if (this.tabIndex == 0) {
        if (this.verifyB(0) == false) return
        // 病历名

        try {
          let res = await innerDisease({
            diseaseName: `${this.Calendar_list[0].get_Calendar_name}`, //伤病名(string)
            endDate: this.Calendar_list[0].get_Calendar_dateE, //终止日期(string)
            oldManId: this.oldId, //老人id(int)
            startDate: this.Calendar_list[0].get_Calendar_dateS, //开始日期
            status: this.Calendar_list[0].get_Calendar_return //回程(string)
          });

          if (res.code == 0) {
            this.$Notice.success({
              title: this.$t("global.reminder"),
              desc: this.$t("global.savedSuccess")
            });
            this.onObjPush();
          } else {
            this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: this.$t("global.failed")
            });
          }
        } catch (err) {
          console.log(err);
          this.$Notice.error({
            title: this.$t("global.reminder"),
            desc: this.$t("global.failed"),
          });
        }

      }

      if (this.tabIndex == 1) {
        if (this.verifyS(0) == false) return;
        // 受诊病历
        try {
          let result = await innerCaseHistory({
            consultDate: this.Injuries_list[0].get_Injuries_date, //咨询日期(string)
            content: this.Injuries_list[0].get_Injuries_content, //原因和实际内容(string)
            destination: this.Injuries_list[0].get_Injuries_addr, //咨询目的地(string)
            oldManId: this.oldId //老人id(int)
          });

          if (result.code == 0) {
            this.$Notice.success({
              title: this.$t("global.reminder"),
              desc: this.$t("global.savedSuccess")
            });
            this.onObjPush();
          } else {
            this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: this.$t("global.failed")
            });
          }
        } catch (err) {
          console.log(err);
          this.$Notice.error({
            title: this.$t("global.reminder"),
            desc: this.$t("global.failed"),
          });
        }

      }

    },
    // 更新表格
    async onUpdate() {
      if (this.tabIndex == 0) {
        // 病历名

        // 判断所有更新数据不能为空
        for (let j = 1; j < this.Calendar_list.length; j++) {
          if (this.verifyB(j) == false) return
        }

        for (let i = 0; i < this.Calendar_list.length; i++) {
          if (i >= 1) {
            try {
              let res = await updateDisease({
                diseaseName: `${this.Calendar_list[i].get_Calendar_name}`, //伤病名(string)
                endDate: `${this.Calendar_list[i].get_Calendar_dateE}`, //终止日期(string)
                id: this.Calendar_list[i].id,
                oldManId: this.oldId, //老人id(int)
                startDate: `${this.Calendar_list[i].get_Calendar_dateS}`, //开始日期
                status: this.Calendar_list[i].get_Calendar_return, //回程(string)
                userId: 0
              });

              if (res.code == 0) {
                this.$Notice.success({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.operationSuccess")
                });
              } else {
                this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.failed")
                });
              }
            } catch (err) {
              console.log(err);
              this.$Notice.error({
                title: this.$t("global.reminder"),
                desc: this.$t("global.failed"),
              });
            }

          }
        }
      }

      if (this.tabIndex == 1) {
        // 受诊病历

        // 判断所有更新数据不能为空
        for (let j = 1; j < this.Injuries_list.length; j++) {
          if (this.verifyS(j) == false) return
        }

        for (let j = 0; j < this.Injuries_list.length; j++) {
          if (j >= 1) {
            try {
              let result = await updateCaseHistory({
                consultDate: this.Injuries_list[j].get_Injuries_date, //咨询日期(string)
                content: this.Injuries_list[j].get_Injuries_content, //原因和实际内容(string)
                destination: this.Injuries_list[j].get_Injuries_addr, //咨询目的地(string)
                id: this.Injuries_list[j].id,
                oldManId: this.oldId //老人id(int)
              });

              if (result.code == 0) {
                this.$Notice.success({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.operationSuccess")
                });
              } else {
                this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.failed")
                });
              }
            } catch (err) {
              console.log(err);
              this.$Notice.error({
                title: this.$t("global.reminder"),
                desc: this.$t("global.failed")
              });
            }

          }
        }
      }

    },

    // 添加行填写
    async onObjPush() {
      if (this.tabIndex == 0) {

        // （伤病名表）
        this.Calendar_list.unshift({
          get_Calendar_name: this.Calendar_list[0].get_Calendar_name,
          get_Calendar_dateS: this.Calendar_list[0].get_Calendar_dateS,
          get_Calendar_dateE: this.Calendar_list[0].get_Calendar_dateE,
          get_Calendar_return: this.Calendar_list[0].get_Calendar_return
        });
        this.Calendar_list[0].get_Calendar_name = "";
        this.Calendar_list[0].get_Calendar_dateS = null;
        this.Calendar_list[0].get_Calendar_dateE = null;
        this.Calendar_list[0].get_Calendar_return = "";
      }
      let res = await selectWholeDisease({
        id: this.oldId, //老人id(string)
        limit: 0, //每页数(int)
        page: 0 //当前页(int)
      });
      this.Calendar_list[1].id = res.data[0].id;

      if (this.tabIndex == 1) {

        // (病历表)
        this.Injuries_list.unshift({
          get_Injuries_date: this.Injuries_list[0].get_Injuries_date,
          get_Injuries_addr: this.Injuries_list[0].get_Injuries_addr,
          get_Injuries_content: this.Injuries_list[0].get_Injuries_content
        });
        this.Injuries_list[0].get_Injuries_date = "";
        this.Injuries_list[0].get_Injuries_addr = "";
        this.Injuries_list[0].get_Injuries_content = "";
        console.log(this.Injuries_list);
        let result = await selectWholeHistory({
          id: this.oldId, //老人id(string)
          limit: 0, //每页数(int)
          page: 0 //当前页(int)
        });
        this.Injuries_list[1].id = result.data[0].id;

      }

    },

    // 初始化请求表数据
    async getResLoad() {
      // （伤病名表）
      try {
        let res = await selectWholeDisease({
          id: this.oldId, //老人id(string)
          limit: 0, //每页数(int)
          page: 0 //当前页(int)
        });
        if (res.code == 0 || res.code == 400) {
          if (res.data != null) {
            for (let i = 0; i < res.data.length; i++) {
              this.Calendar_list.push({
                id: res.data[i].id,
                get_Calendar_name: res.data[i].diseaseName,
                get_Calendar_dateS: res.data[i].startDate,
                get_Calendar_dateE: res.data[i].endDate,
                get_Calendar_return: res.data[i].status
              });
            }
          }
        } else {
          this.$Notice.error({
            title: this.$t("global.reminder"),
            desc: this.$t("medicalTable.tabs.injuryName") + this.$t("global.loadFail"),
          });
        }
      } catch (err) {
        console.log("傷病名" + err);
        this.$Notice.error({
          title: this.$t("global.reminder"),
          desc: this.$t("medicalTable.tabs.injuryName") + this.$t("global.loadFail"),
        });
      }

      // (受诊病历表)
      try {
        let result = await selectWholeHistory({
          id: this.oldId, //老人id(string)
          limit: 0, //每页数(int)
          page: 0 //当前页(int)
        });
        if (result.code == 0 || result.code == 400) {
          if (result.data != null) {
            for (let j = 0; j < result.data.length; j++) {
              this.Injuries_list.push({
                id: result.data[j].id,
                get_Injuries_date: result.data[j].consultDate,
                get_Injuries_addr: result.data[j].destination,
                get_Injuries_content: result.data[j].content
              });
            }
          }
        } else {
          this.$Notice.error({
            title: this.$t("global.reminder"),
            desc: this.$t("medicalTable.tabs.medicalRecord") + this.$t("global.loadFail"),
          });
        }
      } catch (err) {
        console.log("受診履歴" + err);
        this.$Notice.error({
          title: this.$t("global.reminder"),
          desc: this.$t("medicalTable.tabs.medicalRecord") + this.$t("global.loadFail"),
        });
      }

    }
  },
  created() {

  },
  mounted() {
    let _this = this;
    let oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    this.oldId = oldInfo.oldId;
    Promise.all([this.getResLoad()]).then(res => {
      _this.tabBlock = -1;
      console.log(res);
    }).catch(err => {
      _this.tabBlock = -1;
      console.log("请求错误" + err);
    })

  }
};
</script>

<style scoped>
.table {
  font-size: 0.14rem;
}

.Injuries {
  text-align: left;
  position: relative;
}

.Injuries span {
  display: inline-block;
  min-width: 80px;
  padding: 0 10px;
  box-sizing: border-box;
  height: 30px;
  border-radius: 5px;
  background: #ececec;
  font-size: 15px;
  margin: 10px 10px 10px 0;
  text-align: center;
  line-height: 30px;
}

.btn-select {
  color: #ffffff;
  background: #028174 !important;
  font-weight: 600;
}

.makeInput {
  width: 0.4rem;
  border: 0;
  outline: none;
  text-align: right;
  margin-right: 2px;
}

.makeInput.mini {
  width: 0.3rem;
}

.input-length {
  width: 100%;
  text-align: center;
}

.input-length2 {
  width: 100%;
  text-align: center;
}

.input-length3 {
  width: 300px;
  text-align: center;
}

.add-btn {
  position: absolute;
  right: 0;
  top: 10px;
}

.time {
  width: 1.9rem;
}

td textarea {
  width: 100% !important
    /* 80/102 */
  ;
  height: 100%;
  outline: none;
  resize: none;
  border: none;
}
</style><style lang="less">
.medicalTable {
  .special .ivu-input {
    text-align: center;
  }

  .line-height .ivu-input {
    line-height: 1.8;
  }

  .new-width-input-date>.ivu-date-picker-rel>.ivu-input-wrapper>input {
    text-align: center;
    font-size: 0.14rem;
  }
}
</style>
