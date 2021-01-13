<template>
  <div class="sheet worksheet">
    <div class="trip-title">{{ $t("worksheet.title") }}</div>
    <div class="make">
      <div>
        <span>{{ $t("worksheet.username") }}：</span>{{ oldManName
        }}{{ $t("global.honorific") }}
      </div>
      <!-- <div>
        <span>{{$t('worksheet.age')}}</span>
        <input type="text" class="makeInput" disabled v-model="oldManAge" style="width: 2rem;" />
      </div> -->
      <div>
        <span>{{ $t("worksheet.date") }}:</span>
        <!-- <input type="text" class="makeInput" disabled v-model="year" />- -->
        <!-- <input type="text" class="makeInput" disabled v-model="month" />- -->
        <!-- <input type="text" class="makeInput" disabled v-model="day" /> -->
        {{ year + "-" + month + "-" + day }}
      </div>
    </div>

    <div style="width: 100%;overflow-x: scroll;overflow-y: auto !important;">
      <table
        class="table sheetTable new-table"
        border="1px"
        cellspacing="1"
        cellpadding="0"
      >
        <tr>
          <th class="position">{{ $t("worksheet.Time") }}</th>
          <th v-for="(item, index) in xTitle" :key="index">{{ item }}</th>
        </tr>
        <tr v-for="(item, index) in yTitle" :key="index">
          <td
            class="head-bg position"
            style="min-width:1.2rem;white-space:pre-line;word-wrap: break-word;word-break: break-all;"
          >
            {{ $t(item) }}
          </td>
          <td
            v-for="(itemC, indexC) in xTitle"
            :key="indexC"
            class="alignLeft"
            style="white-space:pre-line;word-wrap: break-word;word-break: break-all;"
          >
            <Input
              v-if="models.length != 0 && index * xTitle.length + indexC > 23"
              v-model="models[index * xTitle.length + indexC].content"
              type="textarea"
              :autosize="{ minRows: 2 }"
            />
            <span
              v-if="models.length != 0 && index * xTitle.length + indexC <= 23"
              >{{ models[index * xTitle.length + indexC].content }}</span
            >
          </td>
        </tr>
      </table>
    </div>
    <div class="table-submit">
      <!-- <button>
        <i class="iconfont icon-baocun"></i> {{$t('global.preservation')}}
      </button> -->
      <button @click="submit">
        <i class="iconfont icon-submit"></i> {{ $t("global.submit") }}
      </button>
    </div>
  </div>
</template>

<script>
import func from "../network/leo.js";
import { format } from "../assets/utils/Tools";
import Vue from "vue";
export default {
  data() {
    return {
      oldInfo: {},
      oldManName: "111",
      oldManAge: "11",
      year: "",
      month: "",
      day: "",
      xTitle: [
        "06:00",
        "07:00",
        "08:00",
        "09:00",
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
        "24:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00"
      ],
      yTitle: [
        "worksheet.Daily",
        "worksheet.Intention",
        "worksheet.Something",
        "worksheet.Someting"
      ],
      models: [],
      submitStatus: false,
      updateStatus: false
    };
  },
  created() {
    const oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    const time = format(Date.now());
    this.year = time.split("-")[0];
    this.month = time.split("-")[1];
    this.day = time.split("-")[2];
    this.oldInfo = oldInfo;
    this.oldManName = oldInfo.name;
    this.oldManAge = oldInfo.age;
  },
  methods: {
    getData() {
      // let date = new Date();
      // let time =
      //   date.getFullYear() +
      //   "-" +
      //   (date.getMonth() + 1 < 10
      //     ? "0" + (date.getMonth() + 1)
      //     : date.getMonth() + 1) +
      //   "-" +
      //   (date.getDay() < 10 ? "0" + date.getDay() : date.getDay());
      let data = {
        id: this.oldInfo.oldId,
        time: format(Date.now())
      };
      func
        .getHourSchedule(data)
        .then(res => {
          if (res.data != null) {
            for (let i in res.data) {
              if (i < 24) {
                let content = JSON.parse(res.data[i].content);
                content.forEach((data, index) => {
                  if (data == "1") content[index] = this.$t("ServePlan.sele1");
                  if (data == "2") content[index] = this.$t("ServePlan.sele2");
                  if (data == "3") content[index] = this.$t("ServePlan.sele3");
                  if (data == "4") content[index] = this.$t("ServePlan.sele4");
                  if (data == "5") content[index] = this.$t("ServePlan.sele5");
                  if (data == "6") content[index] = this.$t("ServePlan.sele6");
                  if (data == "7") content[index] = this.$t("ServePlan.sele7");
                  if (data == "8") content[index] = this.$t("ServePlan.sele8");
                });
                // console.log(content);
                res.data[i].content = content.join("\n");
              }
              Vue.set(this.models, i, res.data[i]);
            }
            this.updateStatus = true;
          }
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    submit() {
      if (this.submitStatus) {
        return;
      }
      this.submitStatus = true;
      let recordDate =
        this.year +
        "-" +
        (this.month.length < 2 ? "0" + this.month : this.month) +
        "-" +
        (this.day.length < 2 ? "0" + this.day : this.day);

      if (this.oldManName == "") {
        this.$Notice.error({
          title: this.$t("worksheet.format"),
          desc: this.$t("worksheet.fillName")
        });
        this.submitStatus = false;
        return;
      }

      // if (this.oldManAge == "") {
      //   this.$Notice.error({
      //     title: this.$t('worksheet.format'),
      //     desc: this.$t('worksheet.fillAge'),
      //   });
      //   this.submitStatus = false;
      //   return;
      // }

      if (recordDate != recordDate.match(/\d{4}-\d{2}-\d{2}/gi)) {
        this.$Notice.error({
          title: this.$t("worksheet.format"),
          desc: this.$t("medicalTable.bulletBox.format")
        });
        this.submitStatus = false;
        return;
      }

      let data = [];
      for (let i = 0; i < this.models.length; i++) {
        let obj = {};
        let requestType = 0;
        if (i < 24) {
          requestType = 1;
        } else if (i < 48) {
          requestType = 2;
        } else if (i < 72) {
          requestType = 3;
        } else if (i < 96) {
          requestType = 4;
        }
        if (this.updateStatus) {
          obj = {
            age: this.oldManAge,
            content: this.models[i].content,
            oldId: this.oldInfo.oldId,
            oldName: this.oldManName,
            recordDate: recordDate,
            time: this.xTitle[i % this.xTitle.length],
            type: requestType,
            id: this.models[i].id
          };
        } else {
          obj = {
            age: this.oldManAge,
            content: this.models[i].content,
            oldId: this.oldInfo.oldId,
            oldName: this.oldManName,
            recordDate: recordDate,
            time: this.xTitle[i % this.xTitle.length],
            type: requestType
          };
        }
        data.push(obj);
      }

      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("global.save"),
        onOk: () => {
          for (let i in data) {
            if (i <= 23) {
              let content = data[i].content;
              content = content.replace(/\n/g, ",");
              content = content.split(",");
              content.forEach((data, index) => {
                if (data == this.$t("ServePlan.sele1")) content[index] = "1";
                if (data == this.$t("ServePlan.sele2")) content[index] = "2";
                if (data == this.$t("ServePlan.sele3")) content[index] = "3";
                if (data == this.$t("ServePlan.sele4")) content[index] = "4";
                if (data == this.$t("ServePlan.sele5")) content[index] = "5";
                if (data == this.$t("ServePlan.sele6")) content[index] = "6";
                if (data == this.$t("ServePlan.sele7")) content[index] = "7";
                if (data == this.$t("ServePlan.sele8")) content[index] = "8";
              });
              data[i].content = JSON.stringify(content);
            }
          }
          // console.log("提交", data);
          func
            .subHourSchedule(data)
            .then(res => {
              if (res.code == 0) {
                this.$Notice.success({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.operationSuccess")
                });
              }
              this.submitStatus = false;
            })
            .catch(err => {
              this.submitStatus = false;
            });
        },
        onCancel: () => {
          this.submitStatus = false;
        }
      });
    }
  },
  mounted() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 24; j++) {
        let obj = {
          content: ""
        };
        this.models.push(obj);
      }
    }
    this.getData();
  }
};
</script>

<style>
.sheet {
  padding: 0 0.25rem 0 0.15rem;
}

.sheetTitle {
  text-align: left;
  font-size: 0.18rem /* 18/102 */;
  line-height: 0.55rem /* 56/102 */;
  padding: 0 0.26rem /* 27/102 */;
  background: linear-gradient(90deg, #63af1e, #63af1e, #fff);
  color: #fff;
  margin: 0.25rem /* 25/102 */ 0;
}

.make {
  display: flex;
  justify-content: space-between;
  font-size: 0.14rem;
  padding-bottom: 0.2rem;
}

.makeInput {
  width: 0.5rem;
  border: none;
  outline: medium;
  padding-left: 0.1rem;
}

.sheetTable {
  font-size: 0.12rem;
  width: 100%;
  overflow: scroll;
}

.sheetTable > tr > th {
  padding: 0.2rem 0;
  min-width: 0.9rem;
  /* background: #63af1e; */
  background: var(--table-bg);
  font-size: 0.14rem;
  color: #ffffff !important;
  text-align: center;
}

.sheetTable > tr > th > span {
  display: inline-block;
  width: 0.4rem;
  text-align: center;
}

.sheetTable > tr > td > textarea {
  border: none;
  outline: medium;
  resize: none;
  font-size: 0.14rem;
}

.worksheet textarea {
  font-size: 0.14rem;
}
</style>
