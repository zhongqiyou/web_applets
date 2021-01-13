<template>
  <div id="entry-table">
    <div class="trip-title">{{$t("EntryTable.title")}}</div>
    <div class="screen-l" v-if="false">
      <i-select :model.sync="seleModel" style="width:1.26rem;" size="large">
        <i-option v-for="(item,index) in seleData" :key="index" :value="item.value">{{ item.label }}</i-option>
      </i-select>
      <div class="screen-search">
        <button>搜索</button>
      </div>
    </div>
    <table class="table-info">
      <thead>
        <tr>
          <th>{{$t("EntryTable.entry1")}}</th>
          <th>{{$t("EntryTable.entry2")}}</th>
          <th>{{$t("EntryTable.again")}}</th>
          <!-- <th>房间号</th> -->
          <th>{{$t("EntryTable.entry4")}}</th>
          <th>ID</th>
          <th>{{$t("EntryTable.entry6")}}</th>
          <th>{{$t("EntryTable.entry7")}}</th>
          <th>{{$t("EntryTable.entry8")}}</th>
          <th>{{$t("EntryTable.entry9")}}</th>
          <th>{{$t("EntryTable.entry10")}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listData" :key="index" :class="getColour(item.isLive,item.sex)">
          <th
            @click="item.isLive ? notAllowed() : goTo('/oldManMsg?new=true&bedId=' + item.bedsId)"
          >{{item.isLive ? '' : $t("EntryTable.entry1")}}</th>
          <th
            @click="showModal(item.bedsId, item.oldManId,item.isLive)"
          >{{item.isLive ? $t("EntryTable.entry2") : ''}}</th>
          <!-- <th>{{item.bedCode}}</th> -->
          <th
            @click="item.isLive ? notAllowed() : showModal2(item.bedsId)"
          >{{item.isLive ? '' : $t("EntryTable.entry27")}}</th>
          <th>{{item.bedCode}}</th>
          <th>{{item.oldManId}}</th>
          <th>{{item.name}}</th>
          <th>{{item.birthday}}</th>
          <th>{{item.postalCode}}</th>
          <th>{{item.dom}}</th>
          <th>{{item.phonePike}}</th>
        </tr>
      </tbody>
    </table>

    <Modal v-model="isModal" width="50%" @on-ok="bedsCheckout">
      <div class="modal-main">
        <div class="main-title">
          <p>{{$t("EntryTable.entry11")}}</p>
          <span>{{nowDay}}</span>
        </div>
        <div class="main-form">
          <label>
            <input type="checkbox" />
            {{$t("EntryTable.entry12")}}
          </label>
          <div class="form-list">
            <label>
              <input type="checkbox" />
              {{$t("EntryTable.entry13")}}
            </label>
            <label>
              <input type="checkbox" />
              {{$t("EntryTable.entry14")}}
            </label>
          </div>
          <div class="form-list">
            <label>
              <input type="checkbox" />
              {{$t("EntryTable.entry15")}}
            </label>
            <label>
              <input type="checkbox" />
              {{$t("EntryTable.entry16")}}
            </label>
            <label>
              <input type="checkbox" />
              {{$t("EntryTable.entry17")}}
            </label>
          </div>
          <label>
            <input type="checkbox" />
            {{$t("EntryTable.entry18")}}
          </label>
          <label>
            <input type="checkbox" />
            {{$t("EntryTable.entry19")}}
          </label>
        </div>
      </div>
    </Modal>

    <Modal v-model="isModal2" :title="$t('EntryTable.entry28')" width="30%" @on-ok="againLive()">
      <Input v-model="againOldId" />
      <!-- <p>{{$t("EntryTable.entry26")}}</p> -->
    </Modal>

    <div class="table-detail">
      <div class="detail-list">
        <div class="list-item">
          <div></div>
          {{$t("EntryTable.entry22")}}
        </div>
        <div class="list-item">
          <div></div>
          {{$t("EntryTable.entry23")}}
        </div>
        <div class="list-item">
          <div></div>
          {{$t("EntryTable.entry24")}}
        </div>
      </div>
      <div class="detail-info">{{$t("EntryTable.entry25")}}</div>
    </div>
  </div>
</template>

<script>
import leo from "../network/leo";
import { reCheckIn } from "../network/kongHX";
export default {
  data() {
    return {
      isModal: false,
      isModal2: false,
      seleModel: 0,
      seleData: [
        { value: 1, label: "单元1" },
        { value: 2, label: "单元2" }
      ],
      listData: [],
      nowDay: "", //今天xxxx-xx-xx
      againOldId: "",
      againBedsId: "",
      page: 1
    };
  },
  methods: {
    //申请重新入所
    async againLive() {
      try {
        const res = await reCheckIn({
          nursingId: JSON.parse(localStorage.getItem("userInfo")).nursingId,
          bedsId: this.againBedsId,
          oldId: this.againOldId
        });
        if (res.code === 0) {
          this.$Notice.success({
            title: this.$t("global.operationSuccess")
          });
          this.page = 1;
          this.listData = [],
          this.getEntrantsList();
        } else if (res.code === 411) {
          this.$Notice.error({
            title: this.$t("EntryTable.entry29"),
            desc: res.data
          });
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
    //获取今天日期yyyy-MM-dd
    getTime(length) {
      var date = new Date();
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var day = date.getDate();
      this.dayRow = day;
      if (mon < 10) {
        mon = "0" + mon;
      }
      if (day < 10) {
        day = "0" + day;
      }
      this.nowDay = year + "-" + mon + "-" + day;
    },
    getColour(live, sex) {
      if (live) {
        if (sex === 1) {
          //1男，2女
          return "man";
        } else {
          return "woman";
        }
      } else {
        return "white";
      }
    },
    //禁止入住
    notAllowed() {
      return;
    },
    //重新入驻
    showModal2(bedsId) {
      this.isModal2 = true;
      this.againBedsId = bedsId;
    },
    showModal(bedsId, oldManId, isLive) {
      if (!isLive) {
        //没人住不可退所操作
        return;
      }
      this.isModal = true;
      this.bedsId = bedsId;
      this.oldManId = oldManId;
    },
    //获取列表
    getEntrantsList() {
      let nursingId = JSON.parse(localStorage.getItem("userInfo")).nursingId;
      let data = {
        unitId: localStorage.getItem("unitId"),
        nursingId: nursingId,
        limit: 50,
        page: this.page
      };
      leo.getEntrantsList(data).then(res => {
        if (res.code == 0) {
          this.total = res.count;
          this.listData = this.listData.concat(res.data);
          if (this.listData.length < res.count) {
            this.page = this.page + 1;
            this.getEntrantsList();
          } else {
            // console.log("床位加载完成");
          }
        }
      });
    },
    bedsCheckout() {
      let nursingId = JSON.parse(localStorage.getItem("userInfo")).nursingId;
      let data = {
        bedsId: this.bedsId,
        oldId: this.oldManId,
        nursingId: nursingId
      };
      console.log(data);

      leo.bedsCheckout(data).then(res => {
        if (res.code == 0) {
          this.$Modal.success({
            title: this.$t("global.reminder"),
            content: this.$t("global.operationSuccess")
          });
          this.page = 1;
          this.listData = [],
          this.getEntrantsList();
        } else {
          this.$Modal.error({
            title: this.$t("global.reminder"),
            content: this.$t("global.operationFail")
          });
        }
      });
    }
  },
  mounted() {
    // this.unitId = this.$route.query.unitId;
    this.getEntrantsList();
    this.getTime();
  }
};
</script>

<style lang="less">
#entry-table {
  background: #fff;
  padding: 0.2rem /* 20/102 */;
  text-align: left;
  margin-top: 0.2rem /* 20/102 */;

  .table-info {
    width: 100%;
    font-size: 0.14rem /* 14/102 */;
    padding: 0.1rem;
    border-radius: 5px;
    overflow: hidden;
    thead {
      border-bottom: 1px solid #f0f0f0;
      tr {
        line-height: 0.4rem;
      }
    }
    td,
    th {
      text-align: center;
    }
    tbody {
      tr {
        width: 100%;
        th:nth-child(1),
        th:nth-child(2) {
          line-height: 0.49rem;
        }
      }
      tr {
        padding: 0.1rem 0;
        border-bottom: 1px solid #f0f0f0;
        &.man {
          background: #eefce2;
        }
        &.woman {
          background: #fcecea;
        }
        &.white {
          background: #ececec;
        }
        &:last-child {
          border-bottom: 0;
        }
      }
      th:nth-child(6) {
        width: 1rem;
        word-break: break-all;
      }
      th:nth-child(9) {
        width: 1.7rem;
        word-break: break-all;
        text-align: left;
      }
    }
  } // .table-info

  .table-detail {
    padding: 0.24rem /* 24/102 */ 0.31rem /* 32/102 */;
    font-size: 0.16rem /* 16/102 */;
    .detail-list {
      display: flex;
      margin-bottom: 0.1rem /* 10/102 */;
      .list-item {
        margin-right: 0.1rem /* 10/102 */;
        color: #000;
        display: flex;
        align-items: center;
        div {
          display: inline-block;
          width: 0.22rem /* 22/102 */;
          height: 0.22rem /* 22/102 */;
          border-radius: 50%;
          background: #eefce2;
          margin-right: 0.04rem /* 4/102 */;
        }
        &:nth-child(2) div {
          background: #fcecea;
        }
        &:nth-child(3) div {
          background: #ececec;
        }
      }
    } // .detail-list end

    .detail-info {
      color: #707070;
    }
  } // .table-detail end
} // #entry-table end
.ivu-modal-close .ivu-icon-ios-close {
  top: 0.06rem /* 6/102 */;
}
.modal-main {
  .main-title {
    display: flex;
    justify-content: space-between;
    font-size: 0.16rem /* 16/102 */;
    color: #000;
    span {
      color: #707070;
      margin-right: 0.34rem /* 35/102 */;
    }
  }

  .main-form {
    margin: 0.15rem /* 15/102 */ 0 0;
    border: 1px solid #e8eaec;
    padding: 0.12rem /* 12/102 */ 0.29rem /* 30/102 */;
    line-height: 0.39rem /* 40/102 */;
    label {
      margin-right: 0.29rem /* 30/102 */;
      input {
        margin-right: 0.03rem /* 3/102 */;
      }
    }
  }
} // .modal-main end
.screen-l {
  display: flex;
  align-items: center;
  margin-bottom: 0.1rem;
  .ivu-select-selection {
    border-color: #ededed;
  }
  .screen-search {
    display: flex;
    margin-left: 0.1rem /* 20/102 */;
    button {
      width: 0.55rem /* 87/102 */;
      line-height: 38px;
      letter-spacing: 0.02rem /* 2/102 */;
      font-size: 0.14rem /* 15/102 */;
      border: 0;
      background: #5b90fa;
      color: #fff;
    }
    input {
      height: 0.39rem /* 40/102 */;
      line-height: 0.39rem /* 40/102 */;
      border: 1px solid #ededed;
      padding: 0.09rem /* 9/102 */;
      border-radius: 0.03rem /* 3/102 */;
    }
  }
}
</style>