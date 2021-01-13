<template>
  <div class="singal_detail">
    <div class="left_modal">
      <!-- 老人信息名片 -->
      <div class="man_msg">
        <ul class="main-list">
          <li class="list-item">
            <div class="item-code">
              <h3>
                {{$t('index.oldMan.bedNumber')}}:{{params.bedNumber}}
                <i
                  class="oneBg"
                   :class="{ twoBg: params.level > 2 ,three:params.level>7}"
                >{{showLevel(params.level)}}</i>
              </h3>
              <p>{{$t('singalDetail.entryTime')}}:{{params.checkinDate}}</p>
            </div>
            <div class="item-info">
              <div class="info-title">
                <img :src="params.photoId" alt />
                <p>
                  {{params.name}}
                  <span>{{params.age}} {{$t('VoteMeeting.years')}}</span>
                  <span v-if="checkinType == 1">{{$t("oldManMsg.Information.entrance1")}}</span>
                  <span v-else>{{$t("oldManMsg.Information.entrance2")}}</span>
                </p>
              </div>
              <div class="info-status">
                <article>
                  <img src="../assets/images/tingzhen.png" alt />
                  <div>
                    <p>
                      {{params.bloodPressure ? params.bloodPressure : $t("global.noData")}}
                      {{params.bloodPressure ? 'mmHg' :'' }}
                    </p>
                    <p class="time">{{params.bloodPressureTime}}</p>
                  </div>
                </article>
                <article>
                  <img src="../assets/images/wendu.png" alt />
                  <div>
                    <p>
                      {{params.temperature ? params.temperature : $t("global.noData")}}
                      {{params.temperature ? ' ℃' :'' }}
                    </p>
                    <p class="time">{{params.temperatureTime}}</p>
                  </div>
                </article>
                <article>
                  <img src="../assets/images/xinlv.png" alt />
                  <div>
                    <p>
                      {{params.heartRate ? params.heartRate : $t("global.noData")}}
                      {{params.heartRate ? '次/分' :'' }}
                    </p>
                    <p class="time">{{params.heartRateTime}}</p>
                  </div>
                </article>
                <article>
                  <img src="../assets/images/food.png" alt />
                  <div>
                    <p>{{foodGrade(params.food)}}</p>
                    <p class="time">{{params.foodTime}}</p>
                  </div>
                </article>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 用户职位列表 -->
      <!-- <div class="bottom_identity">
        <div class="item" v-for="(item,index) in levelCate" :key="item">
          <span class="item_text">{{$t(array[index])}}</span>
          <img v-show="index === userInfo.level-1" src="../assets/images/checkmark.png" alt />
        </div>
      </div>-->
    </div>
    <div class="right_modal">
      <div class="header">
        <div
          class="item"
          :class="{'force-font-size':isHeadTables}"
          v-for="(item, index) in headTables"
          :key="index"
          :style="{'backgroundColor': item.color}"
          @click="goTo(item.path)"
        >
          <!-- <img src="../assets/images/icon_user.png" alt=""> -->
          <img :src="getImgUrl(item.iconName)" alt />
          <div class="header_name">{{$t(item.name)}}</div>
        </div>
      </div>
      <div class="footer">
        <div
          class="item"
          v-for="(item, index) in footTables"
          :key="index"
          :style="{'backgroundColor': item.color}"
          @click="judgmentItem(item) ? goTo(item.path) : ''"
        >{{$t(item.name)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBaseInfo } from "../network/Sinyu";
import { selectPlanAll } from "../network/every";
import { get } from "../network/http";
import { getOldmanLis,getFacilitiesData } from "../network/Sinyu";
export default {
  data() {
    return {
      isheadTables: true,
      params: {},
      userInfo: {},
      checkinType: "",
      headTables: [
        {
          color: "#52C41A",
          iconName: "icon_1",
          name: "singalDetail.residents",
          path: "/EntryTable"
        },
        {
          color: "#5B8FF9",
          iconName: "icon_2",
          name: "singalDetail.files",
          path: "/oldManMsg"
        },
        {
          color: "#FF9845",
          iconName: "icon_3",
          name: "singalDetail.assessment",
          path: "/evaluate"
        },
        {
          color: "#5AD8A6",
          iconName: "icon_4",
          name: "singalDetail.case",
          path: "/MedicalTable"
        },
        {
          color: "#F6BD16",
          iconName: "icon_5",
          name: "singalDetail.minutes",
          path: "/VoteMeeting"
        },
        {
          color: "#E86452",
          iconName: "icon_6",
          name: "singalDetail.continueJudgment",
          path: "/JixuVoteMeeting"
        },
        {
          color: "#5D7092",
          iconName: "icon_1",
          name: "singalDetail.facilityServicePlan",
          path: "/FacilitiesPlan"
        },
        {
          color: "#945FB9",
          iconName: "icon_7",
          name: "singalDetail.facilityPlanOne",
          path: "/FacilitiesPlan1"
        },
        {
          color: "#30BF78",
          iconName: "icon_8",
          name: "singalDetail.servicePlan",
          path: "/FacilitiesPlan2"
        },
        {
          color: "#5B8FF9",
          iconName: "icon_9",
          name: "singalDetail.scheduleExcretion",
          path: "/DrainTrip"
        }
      ],
      footTables: [
        {
          color: "#FFE0C7",
          path: "/FoodTime",
          name: "singalDetail.scheduleEating"
        },
        {
          color: "#CDF3E4",
          path: "/WashTime",
          name: "singalDetail.scheduleBath"
        },
        {
          color: "#CED4DE",
          path: "/ConingTrip",
          name: "singalDetail.scheduleFacelift"
        },
        {
          color: "#FCEBB9",
          path: "/changeClothes",
          name: "singalDetail.scheduleDressing"
        },
        {
          color: "#F8D0CB",
          path: "/ServePlan",
          name: "singalDetail.oneWeek"
        },
        {
          color: "#D3EEF9",
          path: "/dailySchedule",
          name: "singalDetail.daily"
        },
        {
          color: "#DECFEA",
          path: "/worksheet",
          name: "singalDetail.hourSchedule"
        },
        {
          color: "#FFE0C7",
          path: "/CarePlan",
          name: "singalDetail.mobileTrauma"
        },
        {
          color: "#CDF3E4",
          path: "/BedsoreAssess",
          name: "singalDetail.bedsores"
        },
        {
          color: "#BBDEDE",
          path: "/serviceMetting",
          name: "singalDetail.directorService"
        },
        {
          color: "#FFE0ED",
          path: "/NurseServe",
          name: "singalDetail.meeting"
        },
        {
          color: "#f8d0cb",
          path: "/meal",
          name: "singalDetail.meal"
        },
        {
          color: "#DECFEA",
          path: "/excretion",
          name: "singalDetail.drain"
        },
        {
          color: "#CDDDFD",
          path: "/afterRecord",
          name: "singalDetail.recordAfter"
        },
        {
          color: "#CED4DE",
          path: "/Record",
          name: "singalDetail.after"
        },
        {
          color: "#CDF3E4",
          path: "/FacilitiesPlan3",
          name: "singalDetail.facilityPlan"
        },
        {
          color: "#FFE0ED",
          path: "/monitorItem",
          name: "singalDetail.monitorWay"
        },
        {
          color: "#f8d0cb",
          path: "/BathExchange",
          name: "singalDetail.BathExchange"
        },
        // {
        //   color: "#FCEBB9",
        //   path: "/facilities",
        //   name: "singalDetail.facilities"
        // }
      ],
      array: [
        "positionArray.chaperone",
        "positionArray.nurse",
        "positionArray.doctor",
        "positionArray.division",
        "positionArray.dietitian",
        "positionArray.adviser",
        "positionArray.professional",
        "positionArray.rehabilitation"
      ],
      bedsoreStatus: "0",
      contentPlan:false
    };
  },
  created() {
    this.params = JSON.parse(localStorage.getItem("oldInfo"));
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getType();
    this.getPlan();
    this.getPlan1();
  },
  computed: {
    isHeadTables() {
      let language = sessionStorage.getItem("language");
      if (language == "en" || language == "id") {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    // window.addEventListener('pageshow', this.pageShow);
    this.getOldMan();
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
    //获取老人信息
    async getOldMan() {
      try {
        const res = await getOldmanLis({
          id: this.params.oldId,
          limit: 10,
          page: 1,
          nursingId: this.params.nursingId,
          isCheckIn: 1,
        });
        if (res.code === 0) {
          for(let i = 0;i<res.data.length;i++){
            if(this.params.oldId == res.data[i]){
              this.params = res.data[i];
              break;
            }
          }
          // localStorage.setItem("oldInfo", JSON.stringify(res.data[0]));
        }
      } catch (err) {
        console.log(err);
      }
    },
    //判断是否有填写计划书2-1
    judgmentPlan(item){
      if (item.path === "/FacilitiesPlan2") {
        if (this.contentPlan) {
          return true;
        } else {
          this.$Notice.error({
            title: this.$t("global.reminder"),
            desc: '記入してください施設サービス計画書(2)-1'
          });
          return false;
        }
      } else {
        return true;
      }
    },
    //判断是否有压滄
    judgmentItem(item) {
      if (item.path === "/BedsoreAssess") {
        if (this.bedsoreStatus === "1") {
          return true;
        } else {
          this.$Notice.error({
            title: this.$t("global.reminder"),
            desc: this.$t("singalDetail.prerecord")
          });
          return false;
        }
      } else {
        return true;
      }
    },
    async getPlan1(data) {
      try {
        const res = await getFacilitiesData({
          oldManId: this.params.oldId,
          date:""
        });
        if (res.code === 0 && res.data.length > 0) {
          this.contentPlan = true;
        }else{
          this.contentPlan = false;
        }
      } catch (err) {
        
      }
    },
    foodGrade(num) {
      if (num == null) {
        return this.$t("global.noData");
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
    getImgUrl(iconName) {
      return require("../assets/images/" + iconName + ".png");
    },
    async getType() {
      try {
        const res = await getBaseInfo({
          id: this.params.oldId
        });
        if (res.code === 0) {
          this.checkinType = res.data.checkInType;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getPlan() {
      try {
        const res = await selectPlanAll({
          oldManId: this.params.oldId
        });
        if (res.code === 0) {
          if(res.data.length > 0){
            this.bedsoreStatus = res.data[0].bedsoreStatus
                ? res.data[0].bedsoreStatus
                : 0;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.force-font-size {
  font-size: 0.12rem !important;
}

.singal_detail {
  display: flex;
  justify-content: flex-start;
  background: #f5f5f5;

  .left_modal {
    width: 2rem;

    .main-list {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0.15rem;

      .list-item {
        width: 100%;
        font-size: 0.12rem /* 12/102 */;
        color: #707070;

        &:nth-child(3n) {
          margin-right: 0;
        }

        .item-code {
          padding: 0.15rem /* 15/102 */;
          background: #d9f7be;
          text-align: left;

          h3 {
            font-size: 0.16rem /* 16/102 */;
            font-weight: 700;
            color: #333;
            margin-bottom: 0.05rem /* 5/102 */;
            text-align: left;
            position: relative;

            i {
              position: absolute;
              right: 0;
              top: 0;
              font-style: normal;
              color: #333;
              padding: 0 0.05rem /* 5/102 */;
              font-size: 0.15rem /* 15/102 */;
              background: #fcebb9;
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
              word-break: break-all;
              white-space: pre-wrap;
              font-size: 0.2rem /* 20/102 */;
              font-weight: 700;
              text-align: left;

              span {
                display: block;
                font-size: 0.13rem /* 16/102 */;
                color: #707070;
                font-weight: 400;
                text-align: left;
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
              width: 100%;
              margin-right: 1.5%;
              margin-bottom: 0.07rem /* 5/102 */;
              align-items: flex-start;

              &:nth-child(2n) {
                margin-right: 0;
              }

              img {
                margin-right: 0.05rem /* 5/102 */;
              }

              p {
                text-align: left;
                color: #333333;
                font-weight: bold;
              }

              .time {
                color: #707070;
                font-size: 0.12rem;
                font-weight: initial;
              }
            }

            img {
              width: 0.24rem /* 24/102 */;
              height: 0.24rem /* 24/102 */;
            }
          }
        }
      }

      // .list-item end
    }

    // .main-list end

    .bottom_identity {
      width: 100%;

      .item {
        width: 100%;
        height: 0.38rem;
        padding: 0 0.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: linear-gradient(48deg, #ffe0ed, #ffe0ed, #fff);

        .item_text {
          color: #333333;
          font-size: 0.12rem;
          font-weight: bold;
        }

        img {
          width: 0.17rem;
          height: auto;
        }
      }

      .item:nth-child(2) {
        background: linear-gradient(48deg, #fcebb9, #fcebb9, #fff);
      }

      .item:nth-child(3) {
        background: linear-gradient(48deg, #cdddfd, #cdddfd, #fff);
      }

      .item:nth-child(4) {
        background: linear-gradient(48deg, #cdf3e4, #cdf3e4, #fff);
      }

      .item:nth-child(5) {
        background: linear-gradient(48deg, #ffe0c7, #ffe0c7, #fff);
      }

      .item:nth-child(6) {
        background: linear-gradient(48deg, #decfea, #decfea, #fff);
      }

      .item:nth-child(7) {
        background: linear-gradient(48deg, #cdddfd, #cdddfd, #fff);
      }
    }
  }

  .right_modal {
    width: calc(100% - 2rem);
    padding-left: 0.15rem;
    box-sizing: border-box;

    .header {
      width: 100%;
      background: #ffffff;
      border-radius: 0.04rem;
      padding: 0 0.05rem 0.1rem;
      display: flex;
      justify-content: center;
      // justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;

      .item {
        width: calc(22% - 0.2rem);
        height: 0.64rem;
        border-radius: 0.04rem;
        color: #ffffff;
        font-size: 0.12rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 0.1rem;
        margin: 0.1rem 0.02rem 0;

        img {
          width: 0.22rem;
          height: auto;
          // margin-right: 0.1rem;
        }

        .header_name {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: pre-wrap;
        }
      }
    }

    .footer {
      width: 100%;
      padding-bottom: 0.15rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 0.15rem;

      .item {
        width: calc(25% - 0.1125rem);
        height: 0.87rem;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: pre-wrap;
        color: #333333;
        font-size: 0.15rem;
        font-weight: bold;
        margin-bottom: 0.15rem;
        margin-right: 0.15rem;
        border-radius: 0.04rem;
      }

      .item:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>
