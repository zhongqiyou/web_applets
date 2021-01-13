<template>
<div class="serve-plan">
  <div class="trip-title">{{$t("ServePlan.title")}}</div>
  <div class="plan-header">
    <label>
      {{$t("ServePlan.Username")}}:
      <input type="text" style="width: 2rem;" disabled v-model="oldInfo.name" />
    </label>
    <label>
      {{$t("ServePlan.Age")}}:
      <input type="text" maxlength="3" disabled v-model="oldInfo.age" />
    </label>
    <label>
      {{$t("ServePlan.Production")}}:
      <input type="text" maxlength="4" style="width: .5rem;" disabled v-model="date[0]" />
      {{$t('global.year')}}
      <input maxlength="2" disabled style="width: .5rem;" v-model="date[1]" type="text" />
      {{$t('global.month')}}
      <input maxlength="2" disabled style="width: .5rem;" v-model="date[2]" type="text" />
      {{$t('global.day')}}
    </label>
  </div>
  <div style="overflow-x:scroll;overflow-y:auto!important;position: relative">
    <table class="table new-table" border="1" style="overflow: auto">
      <thead>
        <tr>
          <td class="head-bg position">{{$t("ServePlan.Time")}}</td>
          <td v-for="(item, index) in timeChange" :key="index">{{item}}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in weekChange" :key="index">
          <td class="position">
            {{$t(item.name)}}
          </td>
          <td v-for="(itemC, indexC) in timeChange" :key="indexC">
            <!--<Input type="textarea" v-if="projectList.length != 0" v-model="projectList[index * timeChange.length + indexC].content" autosize />  
              <Select v-if="projectList.length != 0" v-model="projectList[index * timeChange.length + indexC].content" style="width:1.5rem;" @on-change="handleSelePro(index,indexC)" :placeholder="$t('global.sele')">
                <Option v-for="item in afterList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>-->
            <select @change="handleSelePro(index,indexC)" multiple class="form-control" v-model="projectList[index * timeChange.length + indexC].content" style="width:1.5rem;">
              <option v-for="item in afterList" :value="item.value" :key="item.label">{{ item.label }}</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ul class="plan-list">
    <li v-for="(item) in dataList" :key="item.value">{{item.label}}</li>
    <li v-for="(item,index) in addList" :key="item.value">
      {{item.value}}
      <i class="iconfont icon-guanbi" @click.prevent="handleDelect(index)"></i>
    </li>
    <li @click="isModal = true">{{$t("ServePlan.Add")}}</li>
  </ul>
  <Modal v-model="isModal" width="360">
    <p slot="header" style="text-align:center">
      <span>{{$t("ServePlan.Add")}}</span>
    </p>
    <div style="text-align:center">
      <input type="text" style="width: 100%;text-align:center;border: 0;outline: none;" v-model="seleName" />
    </div>
    <div slot="footer">
      <Button size="large" long @click="handleAddSele">{{$t("global.sure")}}</Button>
    </div>
  </Modal>
  <div class="table-submit">
    <!--<button @click="handleSave">
        <i class="iconfont icon-baocun"></i>
        {{$t('global.preservation')}}
      </button>-->
    <button @click="handleSubmit">
      <i class="iconfont icon-submit"></i>
      {{$t('global.submit')}}
    </button>
  </div>
</div>
</template>

<script>
import axios from "axios";
import {
  debounce,
  format
} from "../assets/utils/Tools";
import {
  getWeekPlan,
  delWeekPlan,
  sendWeekPlan
} from "../network/Sinyu";
export default {
  data() {
    return {
      oldInfo: {},
      isModal: false,
      saveTable: [],
      projectList: [],
      date: [],
      dataList: [{
          value: '1',
          label: this.$t("ServePlan.sele1")
        },
        {
          value: "2",
          label: this.$t("ServePlan.sele2")
        },
        {
          value: "3",
          label: this.$t("ServePlan.sele3")
        },
        {
          value: "4",
          label: this.$t("ServePlan.sele4")
        },
        {
          value: this.$t("ServePlan.sele5"),
          label: this.$t("ServePlan.sele5")
        },
        {
          value: this.$t("ServePlan.sele6"),
          label: this.$t("ServePlan.sele6")
        },
        {
          value: this.$t("ServePlan.sele7"),
          label: this.$t("ServePlan.sele7")
        },
        {
          value: this.$t("ServePlan.sele8"),
          label: this.$t("ServePlan.sele8")
        },
      ],
      addList: [],
      seleName: '',
      timeChange: [
        "6:00",
        "7:00",
        "8:00",
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "00:00",
        "1:00",
        "2:00",
        "3:00",
        "4:00",
        "5:00"
      ],
      weekChange: [{
          id: '星期一',
          name: "ServePlan.Monday"
        },
        {
          id: "星期二",
          name: "ServePlan.Tuesday"
        },
        {
          id: "星期三",
          name: "ServePlan.Wednesday"
        },
        {
          id: '星期四',
          name: "ServePlan.Thursday"
        },
        {
          id: "星期五",
          name: "ServePlan.Friday"
        },
        {
          id: "星期六",
          name: "ServePlan.Saturday"
        },
        {
          id: "星期日",
          name: "ServePlan.Sunday"
        },
        {
          id: "主要日常活动",
          name: "ServePlan.Main"
        }
      ],
      afterList: []
    };
  },
  created() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 24; j++) {
        let obj = {
          content: []
        };
        this.projectList.push(obj);
      }
    }
    this.oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    this.date = format(this.time).split("-");
    this._getServePlan();
    this.afterList = this.dataList;
  },
  methods: {
    handleSelePro(index, indexC) { ///   处理选择项目
      if (index == 0) {
        for (let i = 0; i < this.weekChange.length - 1; i++) {
          this.projectList[indexC + 24 * i].content = this.projectList[indexC].content
        }
      }
    },
    handleDelect(index) {
      this.addList.splice(index, 1);
    },
    handleAddSele() { ///    确认添加选项
      if (this.seleName) {
        this.addList.push({
          value: this.seleName,
          label: this.seleName
        });
        this.afterList = this.dataList.concat(this.addList);
        this.isModal = false;
        this.seleName = "";
      }
    },
    handleSubmit() {
      // 点击提交
      let data = [];
      //   提交数据处理
      for (let i = 0; i < 192; i++) {
        let obj = {
          content: JSON.stringify(this.projectList[i].content),
          createDate: `${this.date[0]}-${this.date[1]}-${this.date[2]}`,
          id: this.projectList[i].id || '',
          oldAge: this.oldInfo.age,
          oldId: this.oldInfo.oldId,
          oldName: this.oldInfo.name,
          time: this.timeChange[i % this.timeChange.length],
          week: this.weekChange[Math.floor(i / 24)].id
        };
        data.push(obj);
      }
      console.log(data)
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("ServePlan.uploads"),
        okText: this.$t('global.sure'),
        cancelText: this.$t('global.cancel'),
        onOk: async () => {
          ///    提交项目
          try {
            const res = await sendWeekPlan(data);
            if (res.code === 0) {
              this._getServePlan()
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
          } catch (err) {
            console.log(err);
          }
        }
      });
    },
    handleSave() {
      //  点击了保存
    },
    //         网络请求         //
    async _getServePlan() {
      ///    获取周计划表var nowTemp = new Date();//当前时间
      const now = new Date();
      const nowTime = now.getTime();
      const day = now.getDay();
      const oneDayTime = 24 * 60 * 60 * 1000;
      const MondayTime = nowTime - (day - 1) * oneDayTime; //显示周一
      const SundayTime = nowTime + (7 - day) * oneDayTime; //显示周日
      try {
        var queryId = this.$route.query.oldId;
        console.log("获取参数id", queryId);
        var time1 = this.$route.query.time1;
        console.log("获取参数时间1", time1);
        var time2 = this.$route.query.time2;
        console.log("获取参数时间2", time2)
        var data = {};
        if (queryId && time1 && time2) {
          data = {
            startTime: time1,
            endTime: time2,
            id: queryId ///  老人id
          };
          localStorage.setItem("admin", 'yes');
          localStorage.setItem("currentUrl", this.$route.path);
        } else {
          data = {
            startTime: format(MondayTime),
            endTime: format(SundayTime),
            id: this.oldInfo.oldId ///  老人id
          };
        }

        const res = await getWeekPlan(data);
        if (res.code === 0) {
          this.projectList = res.data;
          if (this.projectList.length > 0) {
            this.projectList.forEach((res, index) => {
              this.projectList[index].content = JSON.parse(res.content)
            })
          }
          let arr = []
          for (let value in this.projectList) {
            this.projectList[value].content.forEach(res => {
              arr.push(res)
            })
          }
          let obj = []
          for (let i in this.dataList) {
            obj.push(this.dataList[i].value)
          }
          Array.from(new Set(arr)).forEach(res => {
            const value = obj.indexOf(res) != -1
            if (!value) {
              this.addList.push({
                value: res,
                label: res
              });
            }
          })
          this.afterList = this.dataList.concat(this.addList);
        } else {
          this.projectList = []
          for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 24; j++) {
              let obj = {
                content: []
              };
              this.projectList.push(obj);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
td {
  position: relative;
}
</style><style lang="less">
.serve-plan {
  text-align: left;

  select {
    border: 0;
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
    }

    input {
      border: 0;
      outline: none;
      width: 0.78rem
        /* 80/102 */
      ;
    }
  }

  option {
    line-height: .30rem !important
      /* 35/102 */
    ;
    height: .3rem
      /* 40/102 */
    ;
  }

  table {
    text-align: center;
    border-collapse: collapse;
    border-color: var(--border-color);
    font-size: 0.14rem
      /* 14/102 */
    ;
    background: #fff;

    thead {
      line-height: 0.29rem
        /* 30/102 */
      ;
      background: var(--table-bg);
      color: #fff;
    }

    tbody td {
      position: static;
      padding: 0.05rem
        /* 5/102 */
      ;

      &:first-child {
        white-space: nowrap;
        background: var(--table-bg);
        color: #fff;
      }

      textarea {
        width: 0.78rem
          /* 80/102 */
        ;
        border: 0;
        outline: none;
        resize: none;
      }
    }
  }

  // table end
  .plan-list {
    display: flex;
    flex-wrap: wrap;
    font-size: .16rem
      /* 16/102 */
    ;
    padding: .2rem
      /* 20/102 */
      0 0;

    li {
      margin-right: .2rem
        /* 20/102 */
      ;
      margin-bottom: .2rem;
      border: 1px solid var(--border-color);
      padding: .05rem
        /* 5/102 */
        .1rem
        /* 10/102 */
      ;
      border-radius: .05rem
        /* 5/102 */
      ;
      position: relative;
      padding-right: .2rem
        /* 20/102 */
      ;
      background: var(--table-bg);
      color: #fff;

      i {
        position: absolute;
        font-size: 0.14rem
          /* 14/102 */
        ;
        right: 0.03rem
          /* 3/102 */
        ;
        top: -5%;
      }
    }
  }
}

// #serve-plan end
</style>
