<template>
  <div class="old-profile">
    <aside class="profile-aside">
      <div class="aside-sky">
        <!-- <h3 class="sky-title">{{$t('index.weather')}}</h3>
        <div class="sky-info">
          {{$t(days)}}
          <br />
          {{date_time}}
        </div>
        <div class="sky-img">
          <img :src="'https://cdn.heweather.com/cond_icon/' + cond_code + '.png'" />
          <div class="img-info">
            <p>{{tmp}}°</p>
            {{cond_txt}}
          </div>
        </div>
        <div class="sky-position">{{city}} > {{district}}</div>-->
        <div class="week">{{$t(days)}}</div>
        <div class="leftImg">
          <img src="../assets/images/login.png" alt />
        </div>
        <div class="dayDeta">{{date_time}}</div>
      </div>

      <div class="aside-grade">
        <div class="grade-title">{{$t('OldProfile.classification')}}</div>
        <ul class="grade-list">
          <li v-for="(item,index) in gradeList" :key="index">
            <h3>{{item.name}}</h3>
            <span>{{item.num}}人</span>
          </li>
        </ul>
      </div>
    </aside>

    <section class="profile-main">
      <div class="main-screen">
        <div class="screen-l">
          <i-select
            v-model="seleModel"
            style="width:1.26rem;"
            size="large"
            @on-change="changeCondition"
          >
            <i-option
              v-for="(item,index) in seleData"
              :key="index"
              :value="item.value"
            >{{ item.label}}</i-option>
          </i-select>
          <div class="screen-search">
            <input
              v-show="seleModel != '所有资料'&&seleModel != '入驻时间' && seleModel != '注意事项' && seleModel != '入所' && seleModel != '退所'"
              type="search"
              v-model="seleTxte"
              v-bind:disabled="disabled"
            />
            <DatePicker
              class="calendarFont"
              v-show="seleModel === '入驻时间'"
              :value="seleTxte"
              format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
              style="width: 2.3rem;"
              size="large"
              @on-change="seleTxte=$event"
            ></DatePicker>
            <button
              style="font-size: 0.16rem"
              v-show="seleModel != '所有资料' && seleModel != '注意事项' && seleModel != '入所' && seleModel != '退所'"
              @click="condittionScree"
            >搜索</button>
          </div>
        </div>
        <!-- <div class="screen-handle">
          <img src="../assets/images/add.png" @click="goTo('/oldManMsg?new=true')" />
          <img src="../assets/images/add.png" />
          <img src="../assets/images/category.png" />
          <img src="../assets/images/dingdan.png" />
        </div>-->
      </div>

      <ul class="main-list">
        <li
          class="list-item"
          v-for="(item,index) in oldList"
          :key="index"
          @click="checkIsCheckIn()?goTo('/singalDetail',item):'';"
        >
          <div class="item-code">
            <div class="bedNum">
              <h3>{{$t('index.oldMan.bedNumber')}}:{{item.bedNumber}}</h3>
              <i
                class="oneBg"
                :class="{ twoBg: item.level > 2 ,three:item.level>7}"
              >{{showLevel(item.level)}}</i>
            </div>
            <p>ID:{{item.oldId}}</p>
            <p>{{$t('singalDetail.entryTime')}}:{{item.checkinDate}}</p>
          </div>
          <div class="item-info">
            <div class="info-title">
              <img :src="item.photoId" alt />
              <p>
                {{item.name}}
                <span>{{item.age}}{{$t('VoteMeeting.years')}}</span>
              </p>
            </div>
            <div class="info-status">
              <article>
                <img src="../assets/images/tingzhen.png" alt />
                {{item.bloodPressure ? item.bloodPressure : $t('index.oldMan.nullData') }}
                {{item.bloodPressure ? 'mmHg' :'' }}
              </article>
              <article>
                <img src="../assets/images/wendu.png" alt />
                {{item.temperature ? item.temperature: $t('index.oldMan.nullData')}}
                {{item.temperature ? '℃': '' }}
              </article>
              <article>
                <img src="../assets/images/xinlv.png" alt />
                {{item.heartRate ? item.heartRate : $t('index.oldMan.nullData') }}
                {{item.heartRate ? '次/分' : ''}}
              </article>
              <article>
                <img src="../assets/images/food.png" alt />
                {{foodGrade(item.food)}}
              </article>
            </div>
          </div>
        </li>
      </ul>
      <div class="main-page">
        <Page :total="total" :page-size="6" @on-change="handlePage" />
      </div>
    </section>
  </div>
</template>

<script>
import { getOldmanLis } from "../network/Sinyu";
import { getOldManLevel } from "../network/kongHX";
import Vue from "vue";
import VueResource from "vue-resource";
import VueJsonp from "vue-jsonp";
export default {
  data() {
    return {
      days: "",
      district: "",
      date_time: "",
      tmp: "",
      cond_txt: "",
      city: "",
      cond_code: 100,
      seleData: [
        {
          value: "所有资料",
          label: this.$t("OldProfile.all")
        },
        {
          value: "床位编号",
          label: this.$t("OldProfile.bedNumber")
        },
        {
          value: "入驻时间",
          label: this.$t("OldProfile.entryDay")
        },
        {
          value: "护理等级",
          label: this.$t("OldProfile.careLevel")
        },
        {
          value: "年龄",
          label: this.$t("OldProfile.age")
        },
        {
          value: "老人姓名",
          label: this.$t("OldProfile.oldName")
        },
        {
          value: "日文注音",
          label: this.$t("OldProfile.ponetic")
        },
        {
          value: "老人编号",
          label: this.$t("OldProfile.oldId")
        },
        {
          value: "入所",
          label: this.$t("OldProfile.entrance")
        },
        {
          value: "退所",
          label: this.$t("OldProfile.leaving")
        },
        {
          value: "注意事项",
          label: this.$t("OldProfile.precautions")
        }
      ],
      seleModel: "所有资料",
      seleTxte: "",
      ageCondition: "",
      bedsIdCondition: "",
      checkInTimeCondition: "",
      idCondition: "",
      levelCondition: "",
      isAttention: "",
      isCheckIn: 1,
      oldName: "",
      nikeName: "",
      disabled: false,
      page: 1,
      total: 0,
      oldList: [],
      gradeList: [
        {
          id: 8,
          name: this.$t("oldManMsg.Information.support3")
        },
        {
          id: 9,
          name: this.$t("oldManMsg.Information.support4")
        },
        {
          id: 1,
          name: this.$t("oldManMsg.Information.support") + "-1",
          num: 0
        },
        {
          id: 2,
          name: this.$t("oldManMsg.Information.support") + "-2",
          num: 0
        },
        {
          id: 3,
          name: this.$t("oldManMsg.Information.support2") + "-1",
          num: 0
        },
        {
          id: 4,
          name: this.$t("oldManMsg.Information.support2") + "-2",
          num: 0
        },
        {
          id: 5,
          name: this.$t("oldManMsg.Information.support2") + "-3",
          num: 0
        },
        {
          id: 6,
          name: this.$t("oldManMsg.Information.support2") + "-4",
          num: 0
        },
        {
          id: 7,
          name: this.$t("oldManMsg.Information.support2") + "-5",
          num: 0
        }
      ],
    };
  },
  created() {
    this._getOlamanLis();
    this.getCurrentDate();
    // this.getPostion();
  },
  methods: {
    //展示护理等级背景色
    showLevel(num){
      if(num>2){
        if(num>7){
          return num-7;
        }else{
          return num-2;
        }
      }else{
        return num;
      }
    },
    //判断是否是入住老人
    checkIsCheckIn() {
      if (this.isCheckIn) {
        return true;
      } else {
        this.$Notice.error({
          title: this.$t("global.reminder"),
          desc: '该老人已退所！'
        });
        return false;
      }
    },
    //返回食物等级
    foodGrade(num) {
      if (num == null) {
        return this.$t("index.oldMan.nullData");
      } else if (num == 1) {
        return this.$t("oldManMsg.Information.normal");
      } else if (num == 2) {
        return this.$t("oldManMsg.Information.chopped");
      } else if (num == 3) {
        return this.$t("oldManMsg.Information.soft");
      } else if (num == 4) {
        return this.$t("oldManMsg.Information.straw");
      } else if (num == 5) {
        return this.$t("oldManMsg.Information.jelly");
      }
    },
    //获取筛选条件
    condittionScree() {
      console.log("筛选条件", this.seleModel);
      if (this.seleModel === "所有资料") {
        this.ageCondition = "";
        this.bedsIdCondition = "";
        this.checkInTimeCondition = "";
        this.idCondition = "";
        this.levelCondition = "";
        this.isAttention = "";
        this.isCheckIn = 1;
        this.oldName = "";
        this.nikeName = "";
      } else if (this.seleModel === "档案编号") {
        this.idCondition = this.seleTxte;
        this.levelCondition = "";
        this.ageCondition = "";
        this.bedsIdCondition = "";
        this.checkInTimeCondition = "";
        this.isAttention = "";
        this.isCheckIn = 1;
        this.oldName = "";
        this.nikeName = "";
      } else if (this.seleModel === "床位编号") {
        this.bedsIdCondition = this.seleTxte;
        this.ageCondition = "";
        this.checkInTimeCondition = "";
        this.idCondition = "";
        this.levelCondition = "";
        this.isAttention = "";
        this.isCheckIn = 1;
        this.oldName = "";
        this.nikeName = "";
      } else if (this.seleModel === "入驻时间") {
        this.checkInTimeCondition = this.seleTxte;
        this.ageCondition = "";
        this.bedsIdCondition = "";
        this.idCondition = "";
        this.levelCondition = "";
        this.isAttention = "";
        this.isCheckIn = 1;
        this.oldName = "";
        this.nikeName = "";
      } else if (this.seleModel === "护理等级") {
        this.levelCondition = this.seleTxte;
        this.ageCondition = "";
        this.bedsIdCondition = "";
        this.checkInTimeCondition = "";
        this.idCondition = "";
        this.isAttention = "";
        this.isCheckIn = 1;
        this.oldName = "";
        this.nikeName = "";
      } else if (this.seleModel === "年龄") {
        this.ageCondition = this.seleTxte;
        this.bedsIdCondition = "";
        this.checkInTimeCondition = "";
        this.idCondition = "";
        this.levelCondition = "";
        this.isAttention = "";
        this.isCheckIn = 1;
        this.oldName = "";
        this.nikeName = "";
      } else if (this.seleModel === "老人姓名") {
        this.ageCondition = "";
        this.bedsIdCondition = "";
        this.checkInTimeCondition = "";
        this.idCondition = "";
        this.levelCondition = "";
        this.isAttention = "";
        this.isCheckIn = 1;
        this.oldName = this.seleTxte;
        this.nikeName = "";
      } else if (this.seleModel === "日文注音") {
        this.ageCondition = "";
        this.bedsIdCondition = "";
        this.checkInTimeCondition = "";
        this.idCondition = "";
        this.levelCondition = "";
        this.isAttention = "";
        this.isCheckIn = 1;
        this.oldName = "";
        this.nikeName = this.seleTxte;
      } else if (this.seleModel === "老人编号") {
        this.ageCondition = "";
        this.bedsIdCondition = "";
        this.checkInTimeCondition = "";
        this.idCondition = "";
        this.levelCondition = "";
        this.isAttention = "";
        this.isCheckIn = 1;
        this.oldName = "";
        this.nikeName = this.seleTxte;
      }
      this._getOlamanLis();
    },
    //切换筛选条件
    changeCondition(e) {
      this.seleModel = e;
      console.log("切换", this.seleModel);
      if (this.seleModel === "所有资料") {
        this.disabled = true;
        this.ageCondition = "";
        this.bedsIdCondition = "";
        this.checkInTimeCondition = "";
        this.idCondition = "";
        this.levelCondition = "";
        this.isAttention = "";
        this.isCheckIn = 1;
        this.oldName = "";
        this.nikeName = "";
        this._getOlamanLis();
      } else if (this.seleModel === "入所") {
        this.ageCondition = "";
        this.bedsIdCondition = "";
        this.checkInTimeCondition = "";
        this.idCondition = "";
        this.levelCondition = "";
        this.isAttention = "";
        this.isCheckIn = 1;
        this.oldName = "";
        this.nikeName = "";
        this._getOlamanLis();
      } else if (this.seleModel === "退所") {
        this.ageCondition = "";
        this.bedsIdCondition = "";
        this.checkInTimeCondition = "";
        this.idCondition = "";
        this.levelCondition = "";
        this.isAttention = "";
        this.isCheckIn = 0;
        this.oldName = "";
        this.nikeName = "";
        this._getOlamanLis();
      } else if (this.seleModel === "注意事项") {
        this.ageCondition = "";
        this.bedsIdCondition = "";
        this.checkInTimeCondition = "";
        this.idCondition = "";
        this.levelCondition = "";
        this.isAttention = 1;
        this.isCheckIn = 1;
        this.oldName = "";
        this.nikeName = "";
        this._getOlamanLis();
      } else {
        this.disabled = false;
      }
    },
    //获取介护等级人数列表
    async getGradeList() {
      //重置等级列表
      for (let j = 0; j < this.gradeList.length; j++) {
        this.gradeList[j].num = 0;
      }

      try {
        const info = JSON.parse(localStorage.getItem("userInfo"));
        const data = {
          nursingId: info.nursingId,
          bedsId: this.bedsIdCondition,
          age: this.ageCondition,
          checkInTime: this.checkInTimeCondition,
          id: this.idCondition,
          isAttention: this.isAttention,
          isCheckIn: this.isCheckIn,
          level: this.levelCondition,
          nikeName: this.nikeName,
          oldName: this.oldName,
          unitId: ""
        };

        const res = await getOldManLevel(data);
        if (res.code === 0) {
          if (res.data.length) {
            for (let i = 0; i < this.gradeList.length; i++) {
              for (let j = 0; j < res.data.length; j++) {
                if (this.gradeList[i].id == res.data[j].level) {
                  this.gradeList[i].num = res.data[j].mun;
                }
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取time信息
    getCurrentDate() {
      var myDate = new Date();
      var year = myDate.getFullYear(); //年
      var month = myDate.getMonth() + 1; //月
      var day = myDate.getDate(); //日
      var days = myDate.getDay();
      var hours = myDate.getHours(); //时，
      var minutes = myDate.getMinutes(); //分

      switch (days) {
        case 1:
          days = "index.week.monday";
          break;
        case 2:
          days = "index.week.tuesday";
          break;
        case 3:
          days = "index.week.wednesday";
          break;
        case 4:
          days = "index.week.thursday";
          break;
        case 5:
          days = "index.week.friday";
          break;
        case 6:
          days = "index.week.saturday";
          break;
        case 0:
          days = "index.week.sunday";
          break;
      }
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      this.days = days;
      this.date_time = year + "-" + month + "-" + day;
      console.log(this.date_time);
      console.log(this.days);
    },
    //    获取地理位置信息
    getPostion() {
      let _this = this;
      var data = {
        key: "WDTBZ-EOPRG-5ONQY-IDVMO-NXIIK-C4B7A" //这个key就是你申请的密钥
      };
      var url = "https://apis.map.qq.com/ws/location/v1/ip"; //这个就是地理位置信息的接口
      data.output = "jsonp";
      this.$jsonp(url, data)
        .then(res => {
          // console.log('获取当前城市成功',res)
          //  获取天气信息
          this.$http
            .get("https://free-api.heweather.net/s6/weather/now", {
              params: {
                location: res.result.ad_info.district,
                key: "f7fc56b0498b472da6e2376aedf7d040",
                lang: sessionStorage.getItem("language")
              }
            })
            .then(data => {
              this.tmp = data.body.HeWeather6[0].now.tmp;
              this.cond_txt = data.body.HeWeather6[0].now.cond_txt;
              this.cond_code = data.body.HeWeather6[0].now.cond_code;
              this.district = data.body.HeWeather6[0].basic.location;
              this.city = data.body.HeWeather6[0].basic.parent_city;
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    handlePage(e) {
      ///   点击分页
      this.page = e;
      this._getOlamanLis();
    },
    ///            网络请求
    async _getOlamanLis() {
      try {
        const info = JSON.parse(localStorage.getItem("userInfo"));
        const data = {
          limit: 6,
          nursingId: info.nursingId,
          page: this.page,
          age: this.ageCondition,
          bedsId: this.bedsIdCondition,
          checkInTime: this.checkInTimeCondition,
          id: this.idCondition,
          level: this.levelCondition,
          isAttention: this.isAttention,
          isCheckIn: this.isCheckIn,
          oldName: this.oldName,
          nikeName: this.nikeName
        };
        const res = await getOldmanLis(data);
        if (res.code === 0) {
          this.total = res.count;
          this.oldList = res.data;
          this.getGradeList();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.old-profile {
  /* 16/102 */
  text-align: left;
  display: flex;
  justify-content: space-between;
  padding: 0.25rem /* 25/102 */ 0;
  .profile-aside {
    width: 1.71rem /* 174/102 */;
    margin-right: 0.29rem /* 30/102 */;

    .aside-sky {
      width: 100%;
      border-radius: 0.03rem /* 3/102 */;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      padding: 0.23rem /* 23/102 */;
      font-size: 0.16rem /* 12/102 */;
      font-weight: bold;
      line-height: 0.22rem /* 22/102 */;
      // color: #707070;
      margin-bottom: 0.1rem /* 10/102 */;
      background: #fff;
      background: var(--tr-bg);
      .sky-title {
        font-size: 0.16rem /* 16/102 */;
        color: #333;
        margin: 0 0 0.11rem /* 11/102 */;
        font-weight: 700;
      } // .sky-title end

      .sky-img {
        display: flex;
        align-items: center;
        margin: 0.15rem /* 15/102 */ 0;
        .img-info {
          margin-left: 0.1rem /* 10/102 */;
          text-align: left;
          p {
            font-weight: 700;
          }
        }
      } // .sky-img end
      .leftImg img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .dayDeta {
        text-align: center;
        line-height: 0.5rem;
      }
    } // .aside-sky end

    .aside-grade {
      border-radius: 0.03rem /* 3/102 */;
      background: #fff;
      font-size: 0.12rem /* 12/102 */;
      color: #333;
      .grade-title {
        padding: 0.18rem /* 18/102 */ 0.25rem /* 25/102 */;
        font-size: 0.15rem /* 16/102 */;
        font-weight: 700;
      }

      .grade-list {
        line-height: 0.39rem /* 40/102 */;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.24rem /* 24/102 */;
          // background: #d3eef9;
          background: #fabe8d;
        }
        li:first-child,
        li:nth-child(2) {
          background: #cbcafc;
        }
        li:nth-child(3),
        li:nth-child(4) {
          background: #d3eef9;
        }
      }
    } // .aside-grade end
  } // .profile-aside end

  .profile-main {
    flex: 1;
    .main-screen {
      padding: 0.22rem /* 22/102 */;
      background: #fff;
      margin-bottom: 0.1rem /* 10/102 */;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.15rem /* 15/102 */;
      .screen-l {
        display: flex;
        align-items: center;
        .ivu-select-selection {
          border-color: #ededed;
        }
      }
      .screen-search {
        display: flex;
        align-items: center;
        margin-left: 0.2rem /* 20/102 */;
        input {
          width: 2.3rem;
          height: 40px;
          // height: 0.39rem /* 40/102 */;
          // line-height: 0.39rem /* 40/102 */;
          border: 1px solid #ededed;
          padding: 0.09rem /* 9/102 */;
          border-radius: 0.03rem /* 3/102 */;
        }
        button {
          width: 0.85rem /* 87/102 */;
          height: 40px;
          // line-height: 0.39rem /* 40/102 */;
          letter-spacing: 0.02rem /* 2/102 */;
          font-size: 0.15rem /* 15/102 */;
          border: 0;
          background: #5b90fa;
          color: #fff;
        }
      } // .screen-search end

      .screen-handle {
        img {
          width: 0.27rem /* 28/102 */;
          height: 0.27rem /* 28/102 */;
          margin-left: 0.1rem /* 10/102 */;
        }
      }
    } // .main-screen end

    .main-list {
      display: flex;
      flex-wrap: wrap;
      .list-item {
        width: 32%;
        margin-right: 2%;
        font-size: 0.12rem /* 12/102 */;
        color: #707070;
        margin-bottom: 0.2rem /* 20/102 */;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .item-code {
          padding: 0.15rem /* 15/102 */;
          background: #d9f7be;
          .bedNum {
            display: flex;
            justify-content: space-between;
            i {
              font-style: normal;
              color: #333;
              padding: 0.05rem /* 5/102 */;
              font-size: 0.15rem /* 15/102 */;
              background: #fcebb9;
              font-weight: 700;
            }
            .oneBg {
              background: #d3eef9;
            }
            .twoBg {
              background: #fabe8d;
            }
            .three{
              background: #cbcafc;
            }
          }
          h3 {
            font-size: 0.16rem /* 16/102 */;
            font-weight: 700;
            color: #333;
            margin-bottom: 0.05rem /* 5/102 */;
          }
        }
        .item-info {
          padding: 0.11rem /* 11/102 */ 0.15rem /* 15/102 */;
          color: #333;
          background: #fff;
          .info-title {
            display: flex;
            align-items: center;
            position: relative;
            img {
              width: 0.6rem /* 61/102 */;
              height: 0.6rem /* 61/102 */;
              margin-right: 0.12rem /* 12/102 */;
            }
            p {
              font-size: 0.2rem /* 20/102 */;
              font-weight: 700;
              span {
                display: block;
                font-size: 0.16rem /* 16/102 */;
                color: #707070;
                font-weight: 400;
              }
            }
          }

          .info-status {
            margin-top: 0.12rem /* 12/102 */;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            article {
              display: flex;
              align-items: center;
              width: 49%;
              margin-right: 1.5%;
              margin-bottom: 0.05rem /* 5/102 */;
              &:nth-child(2n) {
                margin-right: 0;
              }
              img {
                margin-right: 0.05rem /* 5/102 */;
              }
            }
            img {
              width: 0.24rem /* 24/102 */;
              height: 0.24rem /* 24/102 */;
            }
          }
        }
      } // .list-item end
    } // .main-list end
  } // .profile-main end
} // .old-profile end
.main-page {
  text-align: center;
}
</style>
