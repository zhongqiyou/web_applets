<template>
  <div class="old-profile">
    <aside class="profile-aside">
      <!-- 天气 -->
      <div class="aside-sky" v-bind:style="{ height: skyHeight + 'px' }">
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
        <div class="week">{{ $t(days) }}</div>
        <div class="leftImg">
          <img src="../assets/images/login.png" alt />
        </div>
        <div class="dayDeta">{{ date_time }}</div>
      </div>

      <div class="aside-tab">
        <div class="screen">
          <i-select
            style="width:100%;"
            size="large"
            @on-change="changeUnit"
            v-model="unitId"
            :placeholder="$t('global.choose')"
          >
            <i-option
              v-for="(item, index) in seleUnit"
              :key="index"
              :value="item.id"
              >{{ item.name }}</i-option
            >
          </i-select>
        </div>
        <div class="tabUrlList">
          <div
            class="tabUrlItem"
            v-for="(item, index) in htmlList"
            :key="index"
            @click="goUnitVue(item.url)"
          >
            {{ $t(item.name) }}
          </div>
        </div>
      </div>

      <!-- 职位列表 -->
      <!-- <div class="bottom_identity">
      <div class="item" v-for="(item,index) in levelCate" :key="item">
        <span class="item_text">{{$t(array[index])}}</span>
        <img v-show="index+1 === employeeInfo.level" src="../assets/images/checkmark.png" alt />
      </div>
      </div>-->
      <div class="aside-grade">
        <div class="grade-title">{{ $t("OldProfile.classification") }}</div>
        <ul class="grade-list">
          <li v-for="(item, index) in gradeList" :key="index">
            <h3>{{ item.name }}</h3>
            <span>{{ item.num }}人</span>
          </li>
        </ul>
      </div>
    </aside>

    <section class="profile-main">
      <div class="main-screen" ref="element">
        <!-- 登陆者名片 -->
        <div class="personal-data">
          <div class="personal-img">
            <img class="user_header" :src="newAvtar" alt />
          </div>
          <div>
            <div class="personal-name">
              <span>{{ employeeInfo.userName }}</span>
              <span class="personal-age"
                >{{ employeeInfo.age }}{{ $t("JixuVoteMeeting.years") }}</span
              >
            </div>
            <div class="personal-time">
              {{ $t("index.card.entryTime") }}：{{ employeeInfo.hiredate }}
            </div>
            <div class="personal-time" style="margin-top: 0.02rem;">
              <div>
                {{ $t("index.belong") }}：{{ employeeInfo.nursingName }}
              </div>
              <!-- <p>{{employeeInfo.nursingName}}</p> -->
            </div>
            <div class="personal-occupation">
              <div class="occupation">
                <div>
                  <div>{{ $t("index.card.occupation") }}</div>
                  <div class="chaperone">
                    {{ $t(array[employeeInfo.level]) }}
                  </div>
                </div>
                <div>
                  <div>{{ $t("index.card.department") }}</div>
                  <div class="chaperone">{{ employeeInfo.department }}</div>
                </div>
              </div>

              <div class="department">
                <Upload
                  :action="action"
                  type="drag"
                  :show-upload-list="false"
                  :on-success="handleUpload"
                  :format="['jpg', 'jpeg', 'png', 'gif']"
                >
                  <div class="modify-psd">{{ $t("index.card.avatar") }}</div>
                </Upload>
                <div class="modify-psd" @click="changPasswdClick">
                  {{ $t("index.card.password") }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 出席人数 -->
        <div class="attendance" @click="goTo('/onDuty')">
          <div class="attendance-title">{{ $t("index.card.attendance") }}</div>
          <ul class="attendance-ul">
            <li>
              <div class="team">
                <div>
                  <img src="../assets/images/CT@2x.png" alt />
                  <div>{{ $t(array[1]) }}</div>
                </div>
                <div class="number-people">{{ teamList[0].digital }}人</div>
              </div>
              <div class="team">
                <div>
                  <img src="../assets/images/ys.png" alt />
                  <div>{{ $t(array[5]) }}</div>
                </div>
                <div class="number-people">{{ teamList[4].digital }}人</div>
              </div>
            </li>
            <li>
              <div class="team">
                <div>
                  <img src="../assets/images/dn.png" alt />
                  <div>{{ $t(array[2]) }}</div>
                </div>
                <div class="number-people">{{ teamList[1].digital }}人</div>
              </div>
              <div class="team">
                <div>
                  <img src="../assets/images/zy.png" alt />
                  <div>{{ $t(array[6]) }}</div>
                </div>
                <div class="number-people">{{ teamList[5].digital }}人</div>
              </div>
            </li>
            <li>
              <div class="team">
                <div>
                  <img src="../assets/images/ystd.png" alt />
                  <div>{{ $t(array[3]) }}</div>
                </div>
                <div class="number-people">{{ teamList[2].digital }}人</div>
              </div>
              <div class="team">
                <div>
                  <img src="../assets/images/erji.png" alt />
                  <div>{{ $t(array[7]) }}</div>
                </div>
                <div class="number-people">{{ teamList[6].digital }}人</div>
              </div>
            </li>
            <li>
              <div class="team">
                <div>
                  <img src="../assets/images/wl.png" alt />
                  <div>{{ $t(array[4]) }}</div>
                </div>
                <div class="number-people">{{ teamList[3].digital }}人</div>
              </div>
              <div class="team">
                <div>
                  <img src="../assets/images/ckt.png" alt />
                  <div>{{ $t(array[8]) }}</div>
                </div>
                <div class="number-people">{{ teamList[7].digital }}人</div>
              </div>
            </li>
          </ul>
        </div>
        <!-- <div class="screen-l">
          <i-select :model.sync="seleModel" style="width:1.26rem;" size="large">
            <i-option v-for="(item,index) in seleData" :key="index" :value="item.value">{{ item.label }}</i-option>
          </i-select>
          <div class="screen-search">
            <input type="search" placeholder="请输入" />
            <button>搜索</button>
          </div>
        </div>
        <div class="screen-handle">
          <img src="../assets/images/add.png" />
          <img src="../assets/images/category.png" />
          <img src="../assets/images/dingdan.png" />
        </div>-->
      </div>
      <!-- 老人列表 -->
      <ul class="main-list">
        <li
          class="list-item"
          v-for="(item, index) in oldList"
          :key="index"
          @click="goTo('/singalDetail', item)"
        >
          <div class="item-code">
            <div class="bedNum">
              <h3>{{ $t("index.oldMan.bedNumber") }}:{{ item.bedNumber }}</h3>
              <i class="oneBg" :class="{ twoBg: item.level > 2 ,three:item.level>7}">
              {{showLevel(item.level)}}
              </i>
            </div>
            <p>ID:{{ item.oldId }}</p>
            <p>{{ $t("singalDetail.entryTime") }}:{{ item.checkinDate }}</p>
          </div>
          <div class="item-info">
            <div class="info-title">
              <img :src="item.photoId" alt />
              <p>
                {{ item.name }}
                <span>{{ item.age }}{{ $t("VoteMeeting.years") }}</span>
              </p>
            </div>
            <div class="info-status">
              <article>
                <img src="../assets/images/tingzhen.png" alt />
                {{
                  item.bloodPressure
                    ? item.bloodPressure
                    : $t("index.oldMan.nullData")
                }}
                {{ item.bloodPressure ? "mmHg" : "" }}
              </article>
              <article>
                <img src="../assets/images/wendu.png" alt />
                {{
                  item.temperature
                    ? item.temperature
                    : $t("index.oldMan.nullData")
                }}
                {{ item.temperature ? "℃" : "" }}
              </article>
              <article>
                <img src="../assets/images/xinlv.png" alt />
                {{
                  item.heartRate ? item.heartRate : $t("index.oldMan.nullData")
                }}
                {{ item.heartRate ? "次/分" : "" }}
              </article>
              <article>
                <img src="../assets/images/food.png" alt />
                {{ foodGrade(item.food) }}
              </article>
            </div>
          </div>
        </li>
      </ul>
      <div class="main-page" v-if="oldList.length">
        <Page :total="total" :page-size="6" @on-change="handlePage" />
      </div>
      <!-- 通知栏 -->
      <ul class="main-notice">
        <div class="notice-title">{{ $t("index.notice.announcement") }}</div>
        <li>
          <div class="notice-time">{{ $t("index.notice.time") }}</div>
          <div class="notice-content">{{ $t("index.notice.content") }}</div>
          <div class="notice-name">{{ $t("index.notice.announcer") }}</div>
        </li>
        <li
          v-if="noticeList.length > 0"
          v-for="(item, index) in noticeList"
          :key="index"
          @click="lookDetails(item)"
        >
          <div class="notice-time">{{ item.recordTime.substring(0, 10) }}</div>
          <div class="notice-content">{{ item.content }}</div>
          <div class="notice-name">{{ item.pubName }}</div>
        </li>
        <div v-if="noticeList.length > 0" class="noticePage">
          <Page
            :total="noticeTotal"
            :page-size="2"
            @on-change="handleNoticePage"
          />
        </div>
        <div v-else class="noticePage">
          <p>{{ $t("index.notice.noNottice") }}</p>
        </div>
      </ul>
    </section>

    <!-- 遮罩层 -->
    <div class="mask" v-show="showNews || showPassword" @click="offNews"></div>
    <div class="news newFixed" v-show="showNews">
      <div>{{ $t("index.notice.title") }}</div>
      <div class="newCon" style="text-indent: 2em;">
        <div class="newScroll">{{ newsDetails.content }}</div>
        <div class="newFoot">
          <p>{{ newsDetails.pubName }}</p>
          <p>{{ newsDetails.recordTime }}</p>
        </div>
      </div>
      <div class="readBtn">
        <div @click="read()">{{ $t("global.confirm") }}</div>
      </div>
    </div>
    <!-- 修改密码 -->
    <div class="news" v-show="showPassword">
      <div>{{ $t("index.card.password") }}</div>
      <Form
        class="newCon"
        ref="formCustom"
        :model="formCustom"
        :rules="ruleCustom"
        :label-width="150"
      >
        <FormItem :label="$t('index.card.password1')" prop="oldPasswd">
          <Input type="password" v-model="formCustom.oldPasswd" />
        </FormItem>
        <FormItem :label="$t('index.card.password2')" prop="passwd">
          <Input type="password" v-model="formCustom.passwd" />
        </FormItem>
        <FormItem :label="$t('index.card.password3')" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwdCheck" />
        </FormItem>
        <div style="text-align: right">
          <Button type="primary" @click="handleSubmit(formCustom)">{{
            $t("global.confirm")
          }}</Button>
          <Button @click="handleReset()" style="margin-left: 8px">{{
            $t("global.cancel")
          }}</Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { getOldmanLis, getNoticeList } from "../network/Sinyu";
import {
  notificationCallback,
  getAttendance,
  changePassword,
  changePortrait,
  getUnitByNursingId,
  listOldManByUnitId,
  getOldManLevel,
  unreadNotice
} from "../network/kongHX";
import App from "../App.vue";
import router from "../router";
import Vue from "vue";
import VueResource from "vue-resource";
import VueJsonp from "vue-jsonp";
Vue.use(VueJsonp).use(VueResource);
export default {
  inject: ["reload"],
  data() {
    const validateOld = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("index.card.password4")));
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("index.card.password5")));
      } else {
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("index.card.password6")));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error(this.$t("index.card.password7")));
      } else {
        callback();
      }
    };
    return {
      seleUnit: [],
      htmlList: [
        {
          name: "singalDetail.residents",
          url: "/EntryTable"
        },
        {
          name: "singalDetail.daily",
          url: "/dailySchedule"
        },
        {
          name: "singalDetail.meal",
          url: "/meal"
        },
        {
          name: "singalDetail.drain",
          url: "/excretion"
        },
        {
          name: "singalDetail.BathExchange",
          url: "/BathExchange"
        }
      ],
      seleData: [
        {
          value: "name",
          label: "名字"
        },
        {
          value: "age",
          label: "年龄"
        },
        {
          value: "code",
          label: "床位"
        }
      ],
      seleModel: "",
      page: 1,
      total: null,
      noticePage: 1,
      noticeTotal: 0,
      oldList: [],
      employeeInfo: {},
      noticeList: [],
      district: "",
      city: "",
      tmp: "",
      cond_txt: "",
      cond_code: 100,
      date_time: "",
      days: "",
      array: [
        "positionArray.admin",
        "positionArray.chaperone",
        "positionArray.nurse",
        "positionArray.doctor",
        "positionArray.division",
        "positionArray.dietitian",
        "positionArray.adviser",
        "positionArray.professional",
        "positionArray.rehabilitation"
      ],
      gradeList: [
        {
          id: 8,
          name: this.$t("oldManMsg.Information.support3"),
          num: 0
        },
        {
          id: 9,
          name: this.$t("oldManMsg.Information.support4"),
          num: 0
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
      showNews: false,
      newsDetails: {},
      teamList: [
        {
          id: 1,
          digital: 0
        },
        {
          id: 2,
          digital: 0
        },
        {
          id: 3,
          digital: 0
        },
        {
          id: 4,
          digital: 0
        },
        {
          id: 5,
          digital: 0
        },
        {
          id: 6,
          digital: 0
        },
        {
          id: 7,
          digital: 0
        },
        {
          id: 8,
          digital: 0
        }
      ],
      action: localStorage.getItem("baseUrl") + "/app/upload/uploadFile",
      newAvtar: "",
      showUpload: true,
      showPassword: false,
      formCustom: {
        oldPasswd: "",
        passwd: "",
        passwdCheck: ""
      },
      ruleCustom: {
        oldPasswd: [
          {
            validator: validateOld,
            trigger: "blur"
          }
        ],
        passwd: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        passwdCheck: [
          {
            validator: validatePassCheck,
            trigger: "blur"
          }
        ]
      },
      unitId: -1,
      skyHeight: 0
    };
  },
  created() {
    this.getCurrentDate();
    this._getNoticeList();
    //    网络请求
    // let arr = JSON.parse(sessionStorage.getItem("historyRouter"));
    // console.log("所有表格顺序", arr);
    this.employeeInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  mounted() {
    this.reload();
    this.$set(this, "newAvtar", this.employeeInfo.portrait);
    // console.log("看看人员", this.employeeInfo);
    this.getUserList();
    // this.getPostion();
    this.getUnitList();
    //获取名片高度赋给天气
    setTimeout(res => {
      this.$set(this, "skyHeight", this.$refs.element.offsetHeight);
    }, 0);
    this.$set(this, "unitId", JSON.parse(localStorage.getItem("unitId")));
    if (this.unitId === -1 || this.unitId == null) {
      this._getOlamanLis(); //获取机构老人列表
    } else {
      this.getUnitOldManList(); //获取单元老人列表
    }
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
    changeUnit(e) {
      this.oldList = [];
      localStorage.setItem("unitId", e);
      this.page = 1;
      this.getUnitOldManList();
    },
    //获取单元所有老人
    async getUnitOldManList() {
      try {
        const res = await listOldManByUnitId({
          nursingId: this.employeeInfo.nursingId,
          limit: 6,
          page: this.page,
          unitId: localStorage.getItem("unitId")
        });
        if (res.code === 0) {
          this.total = res.count;
          this.oldList = res.data;
          this.getGradeList(2); //1是获取机构全部老人2是获取单元老人
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
    //获取介护等级人数列表
    async getGradeList(type) {
      //重置等级列表
      for (let j = 0; j < this.gradeList.length; j++) {
        this.gradeList[j].num = 0;
      }

      var aID = ""; //单元id
      if (type === 2) {
        aID = localStorage.getItem("unitId");
      }
      try {
        const info = JSON.parse(localStorage.getItem("userInfo"));
        const data = {
          nursingId: info.nursingId,
          unitId: aID,
          isCheckIn: 1,
          age: "",
          bedsId: "",
          checkInTime: "",
          id: "",
          isAttention: "",
          level: "",
          nikeName: "",
          oldName: ""
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
    goUnitVue(url, payload = "") {
      if (this.unitId == -1) {
        this.$Notice.error({
          title: "请选择单位名称"
        });
        return;
      }
      Vue.prototype.goTo(url);
    },
    //获取单位列表
    async getUnitList() {
      try {
        const res = await getUnitByNursingId({
          nursingId: this.employeeInfo.nursingId
        });
        if (res.code === 0) {
          this.seleUnit = res.data;
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
    async handleSubmit(name) {
      if (name.passwd != name.passwdCheck) {
        return;
      }
      try {
        const res = await changePassword({
          adminId: this.employeeInfo.adminId,
          newPassword: name.passwd,
          oldPassword: name.oldPasswd
        });
        if (res.code === 0) {
          this.showPassword = false;
          this.$Notice.success({
            title: this.$t("global.operationSuccess")
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    handleReset() {
      this.showPassword = false;
    },
    //  获取出勤人员
    async getUserList() {
      try {
        const res = await getAttendance({
          nursingId: this.employeeInfo.nursingId
        });
        if (res.code === 0) {
          for (let i = 0; i < this.teamList.length; i++) {
            for (let j = 0; j < res.data.length; j++) {
              if (this.teamList[i].id == res.data[j].level) {
                this.teamList[i].digital = res.data[j].num;
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
      _this
        .$jsonp(url, data)
        .then(res => {
          console.log("获取当前城市成功", res);
          var lat = res.result.location.lat;
          var lng = res.result.location.lng;
          var latAngLng = lat + "," + lng; //经纬度
          //  获取天气信息
          _this.$http
            .get("https://free-api.heweather.net/s6/weather/now", {
              params: {
                // location: res.result.ad_info.district,
                key: "f7fc56b0498b472da6e2376aedf7d040",
                lang: sessionStorage.getItem("language"),
                location: latAngLng
              }
            })
            .then(data => {
              console.log("tmp", data.body.HeWeather6[0]);
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
        // year + "-" + month + "-" + day + "" + " " + hours + ":" + minutes;
        year + "-" + month + "-" + day + "" + " ";
      console.log(this.date_time);
      console.log(this.days);
    },
    handlePage(e) {
      ///   点击分页
      this.page = e;
      if (this.unitId === -1 || this.unitId == null) {
        this._getOlamanLis(); //获取机构老人列表
      } else {
        this.getUnitOldManList(); //获取单元老人列表
      }
    },
    ///            网络请求
    async _getOlamanLis() {
      try {
        const info = JSON.parse(localStorage.getItem("userInfo"));
        const data = {
          limit: 6,
          nursingId: info.nursingId,
          page: this.page,
          age: "",
          bedsId: "",
          checkInTime: "",
          id: "",
          isAttention: "",
          isCheckIn: 1,
          level: "",
          nikeName: "",
          oldName: ""
        };
        const res = await getOldmanLis(data);
        if (res.code === 0) {
          this.total = res.count;
          this.oldList = res.data;
          this.getGradeList(1); //1是获取机构全部老人2是获取单元老人
        }
      } catch (err) {
        console.log(err);
      }
    },
    //获取通知列表
    async _getNoticeList() {
      try {
        const data = {
          limit: 2,
          page: this.noticePage,
          userId: JSON.parse(localStorage.getItem("userInfo")).adminId
        };
        const res = await getNoticeList(data);
        if (res.code === 0) {
          this.noticeTotal = res.count;
          this.noticeList = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    //关闭通知
    read() {
      this.showNews = false;
    },
    //通知分页
    handleNoticePage(e) {
      this.noticePage = e;
      this._getNoticeList();
    },
    //关闭弹框
    offNews() {
      this.showPassword = false;
    },
    //查看通知详情
    lookDetails(item) {
      this.showNews = true;
      this.newsDetails = item;
    },
    //上传图片成功（修改）
    handleUpload(file) {
      this.showUpload = false;
      // console.log("上传图片", file);
      // console.log("上传图片", file.data.httpUrl);
      this.newAvtar = file.data.httpUrl;
      this.upAvtar(file.data.fileAPUrl);
    },
    //修改头像请求
    async upAvtar(url) {
      try {
        const res = await changePortrait({
          adminId: this.employeeInfo.adminId,
          path: url
        });
        if (res.code === 0) {
          this.$Notice.success({
            title: this.$t("global.operationSuccess")
          });
          let userObj = JSON.parse(localStorage.getItem("userInfo"));
          userObj.portrait = this.newAvtar;
          localStorage.setItem("userInfo", JSON.stringify(userObj));
          location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },
    changPasswdClick() {
      this.showPassword = true;
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
      font-weight: bold;
      line-height: 0.22rem /* 22/102 */;
      // color: #707070;
      margin-bottom: 0.1rem /* 10/102 */;
      // background: #fff;
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

    .aside-tab {
      padding: 0.1rem 0;
      font-size: 0.14rem;

      .screen {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;

        .ivu-select-single .ivu-select-selection {
          height: 100%;
        }

        .screen-search {
          width: 0.5rem;
          text-align: center;
          height: 38px;
          line-height: 38px;
          margin-left: 0.1rem;
          background: #daf5c0;
          border-radius: 5px;
        }
      }

      .tabUrlList {
        margin-top: 0.1rem;

        .tabUrlItem {
          width: 100%;
          height: 0.35rem;
          text-align: center;
          line-height: 0.35rem;
          background: #daf5c0;
          margin-top: 0.1rem;
          border-radius: 5px;
        }
      }
    }

    // .aside-sky end
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
  }

  // .profile-aside end

  .profile-main {
    flex: 1;
    padding-right: 0.17rem;

    .main-screen {
      //   padding: 0.22rem /* 22/102 */;
      // background: #fff;
      //   margin-bottom: 0.1rem /* 10/102 */;
      display: flex;
      //   align-items: center;
      //   justify-content: space-between;
      margin-bottom: 0.15rem /* 15/102 */;
      justify-content: space-between;

      // height: 2.5rem;
      .personal-data {
        width: 38%;
        background: #fff;
        display: flex;
        padding: 0.16rem 0.19rem 0.35rem 0.15rem;
        border-radius: 0.04rem;
        background: var(--tr-bg);

        .personal-img {
          margin-right: 0.13rem;

          .user_header {
            width: 0.24rem;
            height: 0.24rem;
            object-fit: cover;
            // display: inline-block;
            // position: relative;

            // &:after {
            //   content: "";
            //   display: inline-block;
            //   position: absolute;
            //   z-index: 2;
            //   top: 0;
            //   left: 0;
            //   width: 100%;
            //   height: 0.24rem;
            //   background: url("../assets/images/image.png") no-repeat;
            //   background-size: 100%;
            //   background-color: #fff;
            // }
          }
        }

        .personal-name {
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);

          .personal-age {
            // font-size: 0.12rem;
            font-family: PingFang SC;
            // font-weight: 400;

            color: rgba(112, 112, 112, 1);
            margin-left: 0.08rem;
          }
        }

        .personal-time {
          // font-size: 0.12rem;
          // font-family: PingFang SC;
          // font-weight: 400;
          color: rgba(112, 112, 112, 1);
          // text-overflow: ellipsis;
          // overflow: hidden;
          // white-space: nowrap;
          display: flex;

          p {
            width: 1.1rem;
          }
        }

        .personal-occupation {
          margin-top: 0.26rem;

          .occupation {
            display: flex;
            justify-content: space-between;
            margin-right: 0.21rem;
            // font-size: 0.12rem;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(112, 112, 112, 1);

            .chaperone {
              // font-size: 0.24rem;
              font-family: PingFang SC;
              // font-weight: 400;
              color: rgba(51, 51, 51, 1);
            }
          }

          .department {
            display: flex;
            justify-content: space-between;
            font-size: 0.12rem;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(112, 112, 112, 1);

            .chaperone {
              font-size: 0.24rem;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            }

            .modify-psd {
              width: 0.8rem;
              height: 0.48rem;
              // background: rgba(82, 196, 26, 1);
              // background: #028174;
              background: #19c5af;
              line-height: 0.24rem;
              text-align: center;
              font-size: 0.14rem;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              margin-top: 0.23rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }

      .attendance {
        border-radius: 0.04rem;
        background: #fff;
        width: 60%;
        padding: 0.24rem 0.21rem 0.17rem 0.22rem;
        background: var(--tr-bg);

        .attendance-title {
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: bold;
          line-height: 22px;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 0.17rem;
        }

        .attendance-ul {
          li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.17rem;

            .team {
              width: 48%;
              display: flex;
              justify-content: space-between;
              align-items: center;

              div {
                display: flex;
                align-items: center;

                img {
                  width: 0.24rem;
                  height: 0.24rem;
                  margin-right: 0.1rem;
                }
              }

              .number-people {
                min-width: 0.4rem;
                font-size: 0.14rem;
                font-family: PingFang SC;
                font-weight: bold;
                line-height: 20px;
                color: rgba(112, 112, 112, 1);
              }
            }
          }
        }
      }

      //   .screen-l {
      //     display: flex;
      //     align-items: center;
      //     .ivu-select-selection {
      //       border-color: #ededed;
      //     }
      //   }
      //   .screen-search {
      //     display: flex;
      //     margin-left: 0.2rem /* 20/102 */;
      //     input {
      //       height: 0.39rem /* 40/102 */;
      //       line-height: 0.39rem /* 40/102 */;
      //       border: 1px solid #ededed;
      //       padding: 0.09rem /* 9/102 */;
      //       border-radius: 0.03rem /* 3/102 */;
      //     }
      //     button {
      //       width: 0.85rem /* 87/102 */;
      //       line-height: 0.39rem /* 40/102 */;
      //       letter-spacing: 0.02rem /* 2/102 */;
      //       font-size: 0.15rem /* 15/102 */;
      //       border: 0;
      //       background: #5b90fa;
      //       color: #fff;
      //     }
      //   } // .screen-search end

      //   .screen-handle {
      //     img {
      //       width: 0.27rem /* 28/102 */;
      //       height: 0.27rem /* 28/102 */;
      //       margin-left: 0.1rem /* 10/102 */;
      //     }
      //   }
    }

    // .main-screen end

    .main-list {
      display: flex;
      flex-wrap: wrap;

      .list-item {
        width: 32%;
        margin-right: 2%;
        font-size: 0.16rem /* 12/102 */;
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
              font-size: 0.2rem /* 15/102 */;
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
              width: 1.3rem;
              word-break: break-all;
              white-space: pre-wrap;
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
            font-size: 0.12rem;
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
      }

      // .list-item end
    }

    // .main-list end
    .main-notice {
      background: #fff;
      padding: 0.14rem 0.31rem 0.22rem 0.35rem;

      .notice-title {
        font-size: 0.16rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        padding-bottom: 0.14rem;
        border-bottom: 0.01rem solid #f5f5f5;
      }

      li {
        display: flex;
        justify-content: space-between;
        padding: 0.19rem 0;
        border-bottom: 0.01rem solid #f5f5f5;

        &:first-child {
          font-size: 0.14rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          text-align: center;
        }

        .notice-time {
          width: 1rem;
          text-align: center;
        }

        .notice-content {
          width: 4rem;
          text-align: center;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .notice-name {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1rem;
        }
      }
    }

    //main-notice
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

/* 遮罩层 */
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

/* 消息弹框 */
.news {
  width: 46%;
  position: fixed;
  top: 20%;
  left: 27%;
  background: #fff;
  z-index: 5;
  text-align: left;
  border-radius: 0.05rem;
  padding: 0.2rem 0.25rem;
  font-size: 0.16rem;
  color: #333;
  .readBtn {
    width: 100%;
    margin-top: 0.1rem;
  }
  .readBtn div {
    width: 3rem;
    line-height: 0.3rem;
    text-align: center;
    background: #2d8cf0;
    border-radius: 5px;
    margin: 0 auto;
  }
}

.newCon {
  border: 1px solid #ccc;
  border-radius: 0.04rem;
  padding: 0.12rem;
  color: #707070;
  margin-top: 0.1rem;

  .itemBox {
    display: flex;

    span {
      width: 30%;
      text-align: right;
    }

    img {
      width: 1rem;
      height: 1rem;
      object-fit: cover;
    }

    div {
      width: 1rem;
      height: 1rem;
    }
  }

  .passwditem {
    display: flex;
    align-items: center;
    margin-bottom: 0.15rem;

    p {
      width: 1rem;
      text-align: right;
      font-size: 0.12rem;
      margin-right: 0.1rem;
    }
  }
}

.newFixed {
  height: 4.25rem;
}

.newScroll {
  height: 2.3rem;
  overflow-y: auto;
}

.newFoot {
  text-align: right;
  margin-top: 0.2rem;
}
</style><style>
/* 去除上传文件按钮样式 */
.ivu-upload-drag {
  border: none !important;
  background: var(--tr-bg) !important;
  line-height: 75px !important;
}
</style>
