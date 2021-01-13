<template>
<div id="app" v-cloak>
  <template v-if="!isLogin">
    <router-view />
  </template>
  <template v-else>
    <div class="header_title flex between">
      <div class="header_l">{{ $t("global.title") }}</div>
      <div class="header_r flex">
        <div class="user flex">
          <img class="user_img" :src="userInfo.portrait" />
          <span class="user_name">{{ userInfo.roleName }}</span>
        </div>
        <div class="help">?</div>
        <div class="change_lang">
          <Select v-model="defaultLang" style="width:100px" @on-change="changeLang">
            <Option v-for="item in langList" :value="item.value" :key="item.value">{{ $t(item.label) }}</Option>
          </Select>
        </div>
        <div class="quit_login" @click="showModal">
          {{ $t("app.signOut") }}
        </div>
      </div>
    </div>
    <div class="body">
      <div class="left_nav" :style="showNav ? 'left: 0' : 'left: -15vw'">
        <Menu theme="light" style="width: 100%; height: 100%;">
          <MenuItem :name="index" v-for="(item, index) in leftNavList" :key="index">
          <div @click="recordRouter(item)">
            <router-link :to="item.path">{{
                  $t(item.tabName)
                }}</router-link>
          </div>
          </MenuItem>
        </Menu>
      </div>
      <div class="switch_nav"></div>
      <div class="right" :style="
            showNav ? 'left: 15vw; width: 85vw;' : 'left: 0; width: 100vw;'
          ">
        <div class="swicth_button" @click="siwtch_left_nav" :style="showNav ? 'left: 15vw' : 'left: 0vw'">
          <Icon type="ios-arrow-back" size="20" class="icon" v-if="showNav" />
          <Icon type="ios-arrow-forward" size="20" class="icon" v-else />
        </div>
        <div class="banner">
          <div class="banner_content">
            <div class="item" :class="bannerIndex == index ? 'active' : ''" v-for="(item, index) in historyRouter" :key="index" @click="switchRouter(item.path, index)">
              {{ $t(item.tabName) }}
              <Icon type="ios-close" class="icon" size="20" @click.stop="deleteRouter(index)" v-if="item.name !== '首页'" />
            </div>
          </div>
        </div>
        <div class="content">
          <router-view />
        </div>
      </div>
    </div>

    <!-- 遮罩层(消息通知) -->
    <div v-cloak class="mask" v-show="showNews"></div>
    <div v-cloak class="news newFixed" v-show="showNews">
      <div>{{ $t("index.notice.title") }}</div>
      <div class="newCon" style="text-indent: 2em;">
        <div class="newScroll">{{ newsDetails.content }}</div>
        <div class="newFoot">
          <p>{{ newsDetails.pubName }}</p>
          <p>{{ newsDetails.recordTime }}</p>
        </div>
      </div>
      <div class="readBtn">
        <div @click="read(newsDetails.id)">{{ $t("global.confirm") }}</div>
      </div>
    </div>

    <Modal v-model="modal2" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>{{ $t("app.signOut") }}</span>
      </p>
      <div style="text-align:center">
        <p>{{ $t("app.SignSure") }}</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="quitLogin">{{
            $t("app.sure")
          }}</Button>
      </div>
    </Modal>
  </template>
</div>
</template>

<script>
import {
  sendLogin
} from "../src/network/Sinyu";
import route from "./router/index.js";
import {
  unreadNotice,
  notificationCallback
} from "../src/network/kongHX";
import Vue from "vue";
let _this;
export default {
  provide() {
    return {
      reload: () => {
        this.$nextTick(() => {
          if (localStorage.getItem("userInfo"))
            Vue.set(
              this,
              "userInfo",
              JSON.parse(localStorage.getItem("userInfo"))
            );
        });
      }
    };
  },
  data() {
    return {
      isLogin: false,
      leftNavList: [],
      userInfo: {
        portrait: "",
        roleName: ""
      },
      showNav: true,
      historyRouter: [],
      bannerIndex: 0,
      langList: [{
          value: "en",
          label: "app.english"
        },
        {
          value: "zh",
          label: "app.chinese"
        },
        {
          value: "ja",
          label: "app.japanese"
        },
        {
          value: "id",
          label: "app.indonesian"
        }
      ],
      defaultLang: sessionStorage.getItem("language") || "ja",
      modal2: false,
      showNews: false,
      newsDetails: {}
    };
  },
  methods: {
    creat_this(item) {
      _this = this;
    },
    siwtch_left_nav() {
      this.showNav = !this.showNav;
    },
    //跳转到相应页面
    recordRouter(item) {
      let status = false;
      status = _this.historyRouter.some((obj, index) => {
        if (item.path == obj.path) {
          // 路由已存在
          _this.bannerIndex = index;
          sessionStorage.setItem("bannerIndex", _this.bannerIndex);
          return true;
        }
      });

      if (status) return;

      let index = _this.historyRouter.length;
      Vue.set(_this.historyRouter, index, item);
      _this.bannerIndex = index++;
      // console.log(_this.historyRouter);

      sessionStorage.setItem(
        "historyRouter",
        JSON.stringify(_this.historyRouter)
      );
      sessionStorage.setItem("bannerIndex", _this.bannerIndex);
    },
    switchRouter(url, index) {
      // console.log('切换',this.historyRouter);
      // console.log('当前',this.historyRouter[index]);
      if (index == this.bannerIndex) {
        return;
      }
      this.bannerIndex = index;
      sessionStorage.setItem("bannerIndex", this.bannerIndex);
      //跳转到首页或者老人档案管理页面时，需要关闭"褥疮对策评价表"导航
      if (
        this.historyRouter[index].path == "/index" ||
        this.historyRouter[index].path == "/OldProfile"
      ) {
        for (let i = 0; i < this.historyRouter.length; i++) {
          if (this.historyRouter[i].path == "/BedsoreAssess") {
            this.deleteRouter(i);
            return;
          }
        }
      }
      this.$router.push({
        path: url
      });
    },
    //获取未读通知
    async getUnreadNotice() {
      try {
        const data = {
          limit: 1,
          page: 1,
          userId: JSON.parse(localStorage.getItem("userInfo")).adminId
        };
        const res = await unreadNotice(data);
        if (res.code === 0) {
          if (res.data.length) {
            this.lookDetails(res.data[0]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    //查看通知详情
    lookDetails(item) {
      this.showNews = true;
      this.newsDetails = item;
    },
    //读取通知
    async read(id) {
      try {
        const res = await notificationCallback({
          id: id
        });
        if (res.code === 0) {
          this.showNews = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    //删除导航
    deleteRouter(index) {
      this.historyRouter.splice(index, 1);
      // console.log(this.historyRouter, 'this.historyRouter');
      // console.log(index, 'index');
      // console.log(this.bannerIndex, 'this.bannerIndex');

      if (index === this.bannerIndex - 1) {
        // 删除的是当前tab页的前一个
        this.bannerIndex = index;
        // console.log('1');
      } else if (index === this.bannerIndex) {
        // 删除的是当前tab页
        if (index == 0) {
          // 当前页为第一页
          this.bannerIndex = 0;
          this.$router.push(this.historyRouter[this.bannerIndex].path);
        } else {
          this.bannerIndex = index - 1;
          this.$router.push(this.historyRouter[this.bannerIndex].path);
        }
        // console.log('2');
      } else if (index < this.bannerIndex - 1) {
        // 删除的是当前页面前面的tab页
        this.bannerIndex -= 1;
        // console.log('3');
      }

      sessionStorage.setItem(
        "historyRouter",
        JSON.stringify(this.historyRouter)
      );
      sessionStorage.setItem("bannerIndex", this.bannerIndex);
    },
    // 切换语言
    changeLang() {
      console.log(this.defaultLang);
      this.$i18n.locale = this.defaultLang;
      sessionStorage.setItem("language", this.defaultLang);
      location.reload();
    },
    // 退出登录弹窗
    showModal() {
      this.modal2 = !this.modal2;
    },
    quitLogin() {
      let _that = this;
      this.modal2 = false;
      this.isLogin = false;
      setTimeout(res => {
        this.$router.push("/login");
        localStorage.clear();
        sessionStorage.clear();
      }, 600);
    }
  },
  created() {},
  mounted() {
    // 赋值this
    this.creat_this();
    let router = route.options.routes;
    let index = 0;
    for (let i in router) {
      if (router[i].leftNav) {
        // console.log(router[i]);
        Vue.set(this.leftNavList, index, router[i]);
        index++;
      }
    }
    // console.log(this.leftNavList);

    if (localStorage.getItem("userInfo"))
      Vue.set(this, "userInfo", JSON.parse(localStorage.getItem("userInfo")));
    this.historyRouter =
      JSON.parse(sessionStorage.getItem("historyRouter")) || [];
    this.bannerIndex = sessionStorage.getItem("bannerIndex") * 1 || 0;
    // console.log(this.historyRouter);
    // console.log(this.bannerIndex);
  },
  beforeUpdate() {
    var that = this;
    const token = localStorage.getItem("token");
    if (token) {
      that.isLogin = true;
      // that.getUnreadNotice();
      // that.timeer = setInterval(function(){
      //   that.getUnreadNotice();
      // },5*60*1000)
    } else {
      that.isLogin = false;
      // clearInterval(that.timeer);
    }
  }
};
</script>

<style lang="less">
@import url("./assets/css/iconfont.css");

* {
  -ms-overflow-scrolling: touch;
  -o-overflow-scrolling: touch;
  -moz-overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
}

/*禁止长按选择文字事件*/
// * {
// 	-webkit-touch-callout: none;
// 	-webkit-user-select: none;
// 	-khtml-user-select: none;
// 	-moz-user-select: none;
// 	-ms-user-select: none;
// 	user-select: none;
// }
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
textarea,
p,
blockquote,
th,
td,
hr,
button,
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  margin: 0;
  padding: 0;
  font-family: 'SourceHanSans-Normal';
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

audio,
canvas,
video {
  display: inline-block;
  *display: inline;
  *zoom: 1;
}

fieldset,
img {
  border: 0;
}

address,
caption,
cite,
code,
dfn,
em,
strong,
th,
var {
  font-style: normal;
  font-weight: normal;
}

ol,
ul {
  list-style: none;
}

caption,
th {
  text-align: left;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}

q:before,
q:after {
  content: "";
}

abbr,
acronym {
  border: 0;
  font-variant: normal;
}

sup {
  vertical-align: text-top;
}

sub {
  vertical-align: text-bottom;
}

input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  background: transparent;
}

input,
textarea,
select {
  *font-size: 100%;
}

/*滚动条的宽度*/

::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

a {
  color: #000;
}

body {
  margin: 0;
  --table-bg: #92de8b;
  --border-color: #e7e7e7;
  --tr-bg: #d9f7be;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #000;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.header_title {
  width: 100%;
  height: 0.44rem;
  background: #028174;
  color: #ffffff;
  padding: 0 0.25rem;
  box-sizing: border-box;
  font-size: 0.2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  .header_l {
    height: 100%;
    display: flex;
    align-items: center;
    color: #ffffff;
    font-size: 0.16rem;
  }

  .header_r {
    color: #ffffff;
    font-size: 0.14rem;
  }

  .user {
    margin-right: 0.3rem;

    .user_img {
      width: 0.24rem;
      height: 0.24rem;
      object-fit: cover;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.1rem;
    }
  }

  .help {
    width: 0.18rem;
    height: 0.18rem;
    line-height: 0.18rem;
    text-align: center;
    color: #333333;
    font-size: 0.14rem;
    font-weight: bold;
    border-radius: 50%;
    background: #ffffff;
    overflow: hidden;
    margin-right: 0.15rem;
  }

  .quit_login {
    margin-left: 0.15rem;
  }
}

.flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.between {
  justify-content: space-between;
}

.body {
  width: 100%;
  height: calc(100vh - 0.44rem);
  display: flex;
  justify-items: flex-start;
  position: relative;
  margin-top: 0.44rem;

  .left_nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 15vw;
    height: 100%;
    border-right: 0.01rem solid #e7e7e7;
    font-size: 0.16rem;
    overflow: auto;
    z-index: 9;
    transition: all 0.35s;

    .item {
      width: 100%;
      padding: 0.1rem 0;

      a {
        text-decoration: none;
      }
    }
  }

  .switch_nav {
    position: absolute;
  }

  .right {
    position: absolute;
    top: 0;
    left: 15vw;
    width: 85vw;
    height: 100%;
    box-sizing: border-box;
    background: #f5f5f5;
    overflow: auto;
    transition: all 0.35s;

    .banner {
      background: #ffffff;
      width: 100vw;
      height: 0.35rem;
      margin-bottom: 0.12rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;

      .banner_content {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        white-space: nowrap;

        .item {
          height: 0.35rem;
          line-height: 0.35rem;
          text-align: center;
          color: #333333;
          background: #ffffff;
          font-size: 0.14rem;
          position: relative;
          padding: 0 0.2rem;

          .icon {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
          }
        }

        .active {
          color: #ffffff;
          // background: #52c41a;
          background: #028174;
        }
      }
    }

    .content {
      width: 100vw;
      // height: calc(100% - 0.47rem);
      padding: 0 0.1rem 0.1rem 0.25rem;
      box-sizing: border-box;
    }
  }

  .swicth_button {
    width: 0.15rem;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0 auto;
    background: #ffffff;
    position: fixed;
    overflow: hidden;
    margin-bottom: 0.1rem;
    z-index: 99;
    top: 50%;
    transform: translateY(-50%);
    left: 15vw;
    text-align: center;
    color: #ccc;
    font-size: 0.2rem;
    transition: all 0.35s;

    // font-weight: bold;
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }

  .swicth_button::before {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    margin: 0 auto;
    border-left: 0.13rem solid transparent;
    border-top: 0.12rem solid #f5f5f5;
  }

  .swicth_button::after {
    content: "";
    position: absolute;
    width: 0;
    margin: 0 auto;
    border-left: 0.13rem solid transparent;
    border-bottom: 0.12rem solid #f5f5f5;
    right: 0;
    top: 0.68rem;
  }
}

.alignLeft {
  text-align: left !important;
}

.head-bg {
  // min-width: 0.9rem;
  // background: #63af1e;
  background: #92de8b;
  font-size: 0.18rem;
  color: #ffffff !important;
  text-align: center;
}

.time-table {
  // overflow: hidden;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  // touch-action: pan-y;
  border-radius: 5px;
  border: solid #e7e7e7;
  border-width: 1px 0px 0px 1px;
  box-sizing: border-box;
}

.table {
  background: #ffffff;
  border: solid #e7e7e7;
  border-width: 1px 0px 0px 1px;
  overflow: hidden;
  border-radius: 5px;

  td {
    border: solid #e7e7e7;
    border-width: 0px 1px 1px 0px;
    padding: 0.1rem;
  }

  .ivu-input {
    // border: 0 !important;
    display: block;
  }

  .cell {
    font-size: 0.14rem;
    color: #333;
  }

  .flex {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    white-space: nowrap;
  }

  .short {
    width: 1rem;

    input {
      text-align: right;
      font-size: 0.14rem;
      min-width: 100%;
      display: block;
    }
  }
}

.tip_text {
  padding: 0.15rem 0 0.15rem 0.1rem;
  color: #707070;
  font-size: 0.14rem;
  text-align: left;
}

textarea {
  resize: none;
}

.ivu-table th.ivu-head-bg {
  background: #63af1e !important;
  color: #ffffff !important;
}

.trip-title {
  font-size: 0.15rem
    /* 18/102 */
  ;
  line-height: 0.4rem
    /* 56/102 */
  ;
  padding: 0 0.26rem
    /* 27/102 */
  ;
  // background: linear-gradient(90deg, #63af1e,#63af1e,#fff);
  // background: rgb(184, 226, 142);
  background: #0ab68b;
  // color: #fff;
  // color: rgb(53, 55, 44);
  color: #fff;
  font-weight: 600;
  margin: 0.25rem
    /* 25/102 */
    0;
  margin: 0.1rem 0 0.2rem;
  text-align: center;
  border-radius: 5px;
}

// .trip-title end

.ivu-table-wrapper {
  border-radius: 5px;
  overflow: hidden;
}

.table-submit {
  display: flex;
  justify-content: flex-end;
  padding: 0.2rem
    /* 20/102 */
    0;

  button {
    display: flex;
    align-content: center;
    margin-left: 0.29rem
      /* 30/102 */
    ;
    font-size: 0.16rem
      /* 16/102 */
    ;
    padding: 0 0.2rem
      /* 20/102 */
    ;
    border: 1px solid var(--border-color);
    border-radius: 0.1rem
      /* 10/102 */
    ;
    outline: none;
    background: #fff;
    line-height: 0.49rem
      /* 50/102 */
    ;
    background: #2db7f5;
    color: #fff;

    &:last-child {
      // background: #19be6b;
      background: #19be6b;
    }

    i {
      margin-right: 0.05rem
        /* 5/102 */
      ;
      font-size: 0.22rem
        /* 22/102 */
      ;
    }
  }
}

// 表格双向样式
.border-left {
  border-left: 1px solid #2c3e50;
}

.border-right {
  border-right: 1px solid #2c3e50;
}

.float-left {
  float: left;
}

.new-head-bg {
  background-color: #ffffff;
  color: #000000 !important;
}

.position {
  position: sticky !important;
  height: auto !important;
  z-index: 4 !important;
  left: 0 !important;
}

.position1 {
  min-width: 0.3rem !important;
  position: sticky !important;
  height: auto !important;
  z-index: 4 !important;
  left: 0 !important;
}

.position2 {
  position: sticky !important;
  height: auto !important;
  z-index: 4 !important;
  left: 0.32rem !important;
}

.position3 {
  position: sticky !important;
  height: auto !important;
  z-index: 4 !important;
  left: 0.64rem !important;
}

.position4 {
  position: sticky !important;
  height: auto !important;
  z-index: 4 !important;
  left: 0.96rem !important;
}

.new-table,
.new-table tr,
.new-table th,
.new-table td {
  // border: 1px solid #63af1e;
  border: 1px solid #c4e8bf;
  border-radius: 3px;
}

.new-table {
  border-spacing: 2px !important;
  border-collapse: separate !important;
  background: #fff;
}

.remove-color {
  background: #ffffff !important;
  color: rgb(53, 55, 44) !important;
}

.ivu-input-type-textarea textarea {
  resize: none;
  border: none;
}

// textarea.ivu-input{
//   font-size: 0.15rem !important;
// }

//日历字体大小
.calendarFont {
  font-size: 12px;
}

.ivu-input {
  color: #000 !important;
}

// 表格筛选发生日
.deta_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.1rem;
  font-size: 0.14rem;
  // background: green;
}

.selectBox {
  width: 3.1rem;
  box-sizing: border-box;
  border-radius: 5px;
}

.selectBox div {
  width: 1.5rem;
}

.header_right {
  display: flex;
  align-items: center;
}

.occurrenceDay {
  margin-left: 0.1rem;
}

.modifyDay,
.selectBox {
  display: flex;
  align-items: center;
}

.year {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.occurrenceDay {
  display: flex;
  align-items: center;
}

//输入框添加边框
textarea.ivu-input,
textarea.ivu-input {
  border: 1px solid #dcdee2;
}

//输入框禁止背景色
.ivu-input[disabled] {
  background: #fff !important;
}
//必填框标识
.required {
  color: red;
  margin-left: 1px;
}
</style><style lang="less" scoped>
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
}
</style>
