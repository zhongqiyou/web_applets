<template>
  <div class="login">
    <div class="login-cn">
      <div class="logoandtext">
        <img src="../assets/images/login.png" alt />
        <i>Careluxl</i>
      </div>
      <Select v-model="seleModel" style="width:100px" @on-change="changeLang">
        <Option v-for="item in seleData" :value="item.value" :key="item.value">{{$t(item.label) }}</Option>
      </Select>
    </div>
    <div class="login-main">
      <div class="main-title">{{$t('login.itemName')}}</div>
      <div class="main-form">
        <label>
          <img src="../assets/images/profile.png" alt />
          <input
            type="text"
            :placeholder="$t('login.workNumL')"
            v-model="loginInfo.workNum"
            @blur="blurInput"
          />
        </label>
        <label>
          <img src="../assets/images/user.png" alt />
          <!-- <input type="text" :placeholder="$t('login.accountName')" v-model="loginInfo.userName" /> -->
          <input disabled v-model="loginInfo.userName" />
        </label>
        <label>
          <img src="../assets/images/password.png" alt />
          <input type="password" :placeholder="$t('login.password')" v-model="loginInfo.password" />
        </label>
        <label>
          <img src="../assets/images/change.png" alt />
          <!-- <i-select
            v-model="loginInfo.nursingId"
            style="width: calc(100% - 0.54rem);"
            placeholder="choose your hospital"
            size="large"
            @on-open-change="onClose"
          >
            <i-option v-for="(item,index) in seleUser" :key="index" :value="item.id">{{item.name}}</i-option>
          </i-select>-->

          <!-- <input disabled v-model="seleUser[loginInfo.nursingId-1].name" /> -->
          <input disabled v-model="loginInfo.nursingName" />
        </label>
        <div class="main-button">
          <button @click="handleExit">{{$t('login.dropOut')}}</button>
          <button class="enter" @click="handleSubmit">{{$t('login.loginT')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendLogin } from "../network/Sinyu";
import { getNursingHome, getUserInfo } from "../network/kongHX";
import { Form } from "view-design";
import { jsonp } from "vue";
export default {
  data() {
    return {
      seleData: [
        {
          value: "en",
          label: "app.english"
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
      seleModel: sessionStorage.getItem("language") || "ja",
      seleUser: [],
      loginInfo: {
        workNum: "",
        userName: "",
        password: "",
        nursingId: 0,
        nursingName: ""
      }
    };
  },
  created() {
    localStorage.clear();
    sessionStorage.clear();
    this.getList();
  },
  methods: {
    async blurInput() {
      try {
        const res = await getUserInfo({
          workNum: this.loginInfo.workNum
        });
        if (res.code === 0) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].workNum == this.loginInfo.workNum) {
              this.loginInfo.userName = res.data[i].userName;
              this.loginInfo.nursingId = parseInt(res.data[i].nursingId);
            }
          }
          this.loginInfo.nursingName = this.seleUser[
            this.loginInfo.nursingId - 1
          ].name;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getList() {
      try {
        const res = await getNursingHome();
        if (res.code === 0) {
          this.seleUser = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    changeLang() {
      console.log(this.seleModel);
      this.$i18n.locale = this.seleModel;
      sessionStorage.setItem("language", this.seleModel);
    },
    onClose() {
      return;
    },
    handleExit() {
      //  点击Exit 退出
      console.log("退出");
    },
    async handleSubmit() {
      //   点击Enter 确认登录
      try {
        if (
          this.loginInfo.workNum &&
          this.loginInfo.userName &&
          this.loginInfo.password
        ) {
          const res = await sendLogin(this.loginInfo);
          if (res.code === 0) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            sessionStorage.setItem("language", this.seleModel || "zh");
            localStorage.setItem("unitId", -1);
            this.$Notice.success({
              title: this.$t("global.reminder"),
              desc: this.$t("login.loginS"),
              duration: 1.5
            });
            // let indexObj = {path: "/index", name: "首页", tabName: "routerTab.index", leftNav: true, needLogin: false};
            // sessionStorage.setItem("historyRouter",JSON.stringify(indexObj));
            setTimeout(res => {
              this.$router.push("/index");
            }, 10);
          } else {
            this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: res.data
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="less">
.login {
  width: 100vw;
  height: 100vh;
  background: url("../assets/images/bg.png");
  background-size: cover;

  .login-cn {
    padding: 0.36rem /* 37/102 */ 0.22rem /* 22/102 */ 0;
    display: flex;
    justify-content: space-between;
    .logoandtext{
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
        width: 1rem;
        height: 0.8rem;
      }
      i{
        font-weight: bold;
      }
    }
  }

  // .login-cn end

  .login-main {
    margin: 0 auto;
    width: 4.41rem /* 450/102 */;

    .main-title {
      font-size: 0.49rem /* 50/102 */;
      color: #fff;
      margin-bottom: 0.29rem /* 30/102 */;
    }

    .main-form {
      padding: 0.44rem /* 45/102 */;
      padding-right: 0.69rem /* 70/102 */;
      background: #fff;
      border-radius: 0.1rem /* 10/102 */;

      label {
        text-align: left;
        display: flex;
        align-items: center;
        margin-bottom: 0.2rem /* 20/102 */;
        font-size: 0.14rem;

        img {
          width: 0.29rem /* 30/102 */;
          height: 0.29rem /* 30/102 */;
          margin-right: 0.25rem /* 25/102 */;
        }

        input {
          width: 100%;
          line-height: 0.39rem /* 40/102 */;
          font-size: 0.18rem /* 18/102 */;
          padding: 0 0.1rem /* 10/102 */;
          box-sizing: border-box;
          border: 0;
          outline: none;
          border-bottom: 1px solid #333;
        }

        .ivu-select-selection {
          border: 0;
          border-bottom: 1px solid #333 !important;
        }

        .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
          color: #666;
        }
      }
    }

    // .main-form end

    .main-button {
      text-align: center;
      display: flex;
      justify-content: space-between;

      button {
        border: 0;
        font-size: 0.18rem /* 18/102 */;
        // margin-right: 1.37rem /* 140/102 */;
        background: #ee8a15;
        color: #fff;
        border-radius: 0.05rem /* 5/102 */;
        padding: 0.05rem /* 5/102 */ 0.15rem /* 15/102 */;

        &:last-child {
          background: #4fbf18;
          margin: 0;
        }
      }
    }
  }

  // .login-main end
}

// .login end
</style><style lang="less">
.login {
  .ivu-select-large .ivu-select-item {
    font-size: 0.18rem !important
      /* 18/102 */
    ;
  }

  .ivu-select-large.ivu-select-single
    .ivu-select-selection
    .ivu-select-placeholder,
  .ivu-select-large.ivu-select-single
    .ivu-select-selection
    .ivu-select-selected-value {
    font-size: 0.18rem /* 18/102 */;
  }

  .login {
    width: 100vw;
    height: 100vh;
    background: url("../assets/images/bg.png");
    background-size: cover;

    .login-cn {
      padding: 0.36rem /* 37/102 */ 0.22rem /* 22/102 */;
      display: flex;
      justify-content: flex-end;
    }

    // .login-cn end

    .login-main {
      margin: 0.29rem /* 30/102 */ auto 0;
      width: 4.41rem /* 450/102 */;

      .main-title {
        font-size: 0.49rem /* 50/102 */;
        color: #fff;
        margin-bottom: 0.29rem /* 30/102 */;
      }

      .main-form {
        padding: 0.44rem /* 45/102 */;
        padding-right: 0.69rem /* 70/102 */;
        background: #fff;
        border-radius: 0.1rem /* 10/102 */;

        label {
          text-align: left;
          display: flex;
          align-items: center;
          margin-bottom: 0.2rem /* 20/102 */;

          img {
            width: 0.29rem /* 30/102 */;
            height: 0.29rem /* 30/102 */;
            margin-right: 0.25rem /* 25/102 */;
          }

          input {
            width: 100%;
            line-height: 0.39rem /* 40/102 */;
            font-size: 0.18rem /* 18/102 */;
            padding: 0 0.1rem /* 10/102 */;
            box-sizing: border-box;
            border: 0;
            outline: none;
            border-bottom: 1px solid #333;
          }

          .ivu-select-selection {
            border: 0;
            border-bottom: 1px solid #333 !important;
          }

          .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
            color: #666;
          }
        }
      }

      // .main-form end

      .main-button {
        text-align: center;
        display: flex;
        justify-content: space-between;

        button {
          border: 0;
          font-size: 0.18rem /* 18/102 */;
          // margin-right: 1.37rem /* 140/102 */;
          background: #ee8a15;
          color: #fff;
          border-radius: 0.05rem /* 5/102 */;
          padding: 0.05rem /* 5/102 */ 0.15rem /* 15/102 */;

          &:last-child {
            background: #4fbf18;
            margin: 0;
          }
        }
      }
    }

    // .login-main end
  }
}

// .login end
</style>
