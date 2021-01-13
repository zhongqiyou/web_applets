<template>
  <div class="old-profile">
    <!-- 天气 -->
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

      <div class="bottom_identity">
        <p class="tit">{{$t('onDuty.staff')}}</p>
        <div class="item" v-for="(item,index) in array.length" :key="item">
          <span class="item_text">{{$t(array[index].name)}}</span>
          <p class="item_text">{{array[index].num}}人</p>
        </div>
      </div>
    </aside>

    <section class="profile-main">
      <ul class="main-list">
        <li class="list-item" v-for="(item,index) in userList" :key="index">
          <div class="item-code" v-bind:class="{'bgColour': !item.isOnline }">
            <h3>{{$t('onDuty.service')}}:{{item.code}}</h3>
            <p>{{$t('index.card.entryTime')}}:{{item.hiredate}}</p>
          </div>
          <div class="item-info">
            <div class="info-title">
              <img v-if="item.portrait" :src="baseUrl + item.portrait" alt />
              <img v-else src="../assets/images/avatar.png" alt />
              <p>
                {{item.userName}}
                <span>{{item.age}}{{$t('JixuVoteMeeting.years')}}</span>
              </p>
            </div>
            <div class="info-status">
              <article>
                <img src="../assets/images/attendance1.png" alt />
                <p>{{$t('index.card.department')}}:</p>
                <div>{{item.department}}</div>
              </article>
              <article>
                <img src="../assets/images/attendance2.png" alt />
                <span>{{$t('index.card.occupation')}}:</span>
                {{$t(array[item.level-1].name)}}
              </article>
            </div>
          </div>
        </li>
      </ul>

      <div v-if="userList.length > 0" class="noticePage">
        <Page :total="total" :page-size="12" @on-change="handlePage" />
      </div>
    </section>
  </div>
</template>

<script>
import { getOldmanLis, getNoticeList } from "../network/Sinyu";
import {
  notificationCallback,
  getAttendance,
  listAdminUser
} from "../network/kongHX";
import Vue from "vue";
import VueResource from "vue-resource";
import VueJsonp from "vue-jsonp";
Vue.use(VueJsonp).use(VueResource);
export default {
  data() {
    return {
      page: 1,
      total: null,
      userList: [],
      district: "",
      city: "",
      tmp: "",
      cond_txt: "",
      cond_code: 100,
      date_time: "",
      days: "",
      array: [
        {
          id: 1,
          name: "positionArray.chaperone",
          num: 0
        },
        {
          id: 2,
          name: "positionArray.nurse",
          num: 0
        },
        {
          id: 3,
          name: "positionArray.doctor",
          num: 0
        },
        {
          id: 4,
          name: "positionArray.division",
          num: 0
        },
        {
          id: 5,
          name: "positionArray.dietitian",
          num: 0
        },
        {
          id: 6,
          name: "positionArray.adviser",
          num: 0
        },
        {
          id: 7,
          name: "positionArray.professional",
          num: 0
        },
        {
          id: 8,
          name: "positionArray.rehabilitation",
          num: 0
        }
      ],
      showNews: false,
      newsDetails: "",
      total: 0,
      user: {},
      baseUrl: ""
    };
  },
  created() {
    this.getCurrentDate();
    this.getPostion();
    //    网络请求
    this._getOlamanLis();
    this.baseUrl = localStorage.getItem("baseUrl");
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("userInfo"));
    this.getUserList();
  },
  methods: {
    //  获取出勤人员
    async getUserList() {
      try {
        const res = await getAttendance({
          nursingId: this.user.nursingId
        });
        if (res.code === 0) {
          for (let i = 0; i < this.array.length; i++) {
            for (let j = 0; j < res.data.length; j++) {
              if (this.array[i].id == res.data[j].level) {
                this.array[i].num = res.data[j].num;
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
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
              console.log("城市", data.body.HeWeather6[0]);
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
      this.date_time =
        year + "-" + month + "-" + day ;
      console.log(this.date_time);
      console.log(this.days);
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
          limit: 12,
          nursingId: info.nursingId,
          page: this.page
        };
        const res = await listAdminUser(data);
        if (res.code === 0) {
          this.total = res.count;
          this.userList = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async read(id) {
      try {
        const res = await notificationCallback({ id: id });
        if (res.code === 0) {
        }
      } catch (err) {
        console.log(err);
      }
    },
    //关闭通知弹框
    offNews() {
      this.showNews = false;
    },
    lookDetails(item) {
      this.showNews = true;
      this.newsDetails = item;
    }
  }
};
</script>

<style lang="less" scoped>
.old-profile {
  font-size: 0.16rem /* 16/102 */;
  text-align: left;
  display: flex;
  justify-content: space-between;
  padding: 0.25rem /* 25/102 */ 0;
  background: #f5f5f5;

  .profile-aside {
    width: 2rem /* 174/102 */;
    margin-right: 0.29rem /* 30/102 */;

    .aside-sky {
      width: 100%;
      border-radius: 0.03rem /* 3/102 */;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      padding: 0.23rem /* 23/102 */;
      font-size: 0.16rem /* 12/102 */;
      line-height: 0.22rem /* 22/102 */;
      // color: #707070;
      font-weight: bold;
      margin-bottom: 0.1rem /* 10/102 */;
      background: #fff;
      background: var(--tr-bg);

      .sky-title {
        font-size: 0.16rem /* 16/102 */;
        color: #333;
        margin: 0 0 0.11rem /* 11/102 */;
        font-weight: 700;
      }

      // .sky-title end

      .sky-img {
        display: flex;
        align-items: center;
        margin: 0.15rem 0 /* 15/102 */ 0;

        .img-info {
          margin-left: 0.1rem /* 10/102 */;
          text-align: left;

          p {
            font-weight: 700;
          }
        }
      }
      .leftImg img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .dayDeta {
        text-align: center;
        line-height: 0.5rem;
      }

      // .sky-img end
    }

    // .aside-sky end
    .bottom_identity {
      width: 100%;
      .tit {
        background: #fff;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
        font-weight: bold;
      }
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

      .item:nth-child(3) {
        background: linear-gradient(48deg, #fcebb9, #fcebb9, #fff);
      }

      .item:nth-child(4) {
        background: linear-gradient(48deg, #cdddfd, #cdddfd, #fff);
      }

      .item:nth-child(5) {
        background: linear-gradient(48deg, #cdf3e4, #cdf3e4, #fff);
      }

      .item:nth-child(6) {
        background: linear-gradient(48deg, #ffe0c7, #ffe0c7, #fff);
      }

      .item:nth-child(7) {
        background: linear-gradient(48deg, #decfea, #decfea, #fff);
      }

      .item:nth-child(8) {
        background: linear-gradient(48deg, #cdddfd, #cdddfd, #fff);
      }
    }
  }

  // .profile-aside end

  .profile-main {
    flex: 1;
    padding-right: 0.17rem;
    .main-list {
      display: flex;
      flex-wrap: wrap;

      .list-item {
        width: 24%;
        margin-right: 1%;
        font-size: 0.12rem /* 12/102 */;
        color: #707070;
        margin-bottom: 0.2rem /* 20/102 */;

        &:nth-child(4n) {
          margin-right: 0;
        }

        .item-code {
          padding: 0.1rem /* 15/102 */;
          background: #d9f7be;

          h3 {
            font-size: 0.14rem /* 16/102 */;
            font-weight: 700;
            color: #333;
            margin-bottom: 0.05rem /* 5/102 */;
          }
        }

        .item-info {
          padding: 0.1rem /* 11/102 */ 0.15rem /* 15/102 */;
          color: #333;
          background: #fff;

          .info-title {
            display: flex;
            align-items: center;
            position: relative;

            img {
              width: 0.6rem /* 61/102 */;
              height: 0.6rem /* 61/102 */;
              // border-radius: 0.1rem;
              margin-right: 0.12rem /* 12/102 */;
            }

            p {
              font-size: 0.16rem /* 20/102 */;
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

            article {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              width: 100%;
              margin-right: 1.5%;
              margin-bottom: 0.05rem /* 5/102 */;
              font-size: 0.14rem;
              font-weight: 400;
              color: #707070;
              line-height: 0.12rem;
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
        .bgColour {
          background: #eee;
        }
      }

      // .list-item end
    }
    // .main-list end
  }

  // .profile-main end
  .main-page {
    text-align: center;
    margin-bottom: 0.2rem /* 20/102 */;
  }
}

// .old-profile end
.noticePage {
  text-align: center;
  margin-top: 10px;
}
</style>