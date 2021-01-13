<template>
<div class="bath-exchange">
  <div class="trip-title">{{$t("BathExchange.title")}}</div>
  <div class="exchange-header">
    <label>
      {{$t("ServePlan.Production")}}:
      <input type="text" maxlength="4" style="width: .4rem;" disabled v-model="date[0]" />
      {{$t('global.year')}}
      <input maxlength="2" disabled style="width: .2rem;" v-model="date[1]" type="text" />
      {{$t('global.month')}}
    </label>
    <!-- <div class="header-census">
      <p>予定欗1入浴</p>
      <p>2入浴</p>
      </div>-->
  </div>
  <div style="overflow-x:scroll;white-space:nowrap">
    <table class="plan-table new-table" border="1" style="border:1px solid #c4e8bf;">
      <thead>
        <tr>
          <td rowspan="2">{{$t("global.name")}}</td>
          <td rowspan="2">{{date[1]}}{{$t("global.month")}}</td>
          <td v-for="(item,index) in dayNum" :key="item" :class="sundayList[index] !==null ?'job':''">{{item}}</td>
        </tr>
        <tr>
          <td v-for="(item,index) in weekList" :key="item+index" :class="sundayList[index] !==null ?'job':''">{{item}}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,itemI) in itemList" :key="itemI+item.oldManid">
          <template v-if="item.length">
            <td>{{itemI}}</td>
            <td>
              <div v-for="(objItem,objI) in item" :key="itemI+objI">{{objItem.type}}</div>
            </td>
            <td v-for="(dayItem,index) in dayNum" :class="sundayList[index] !==null ?'job':''" :key="dayItem+index">
              <div :class="objItem.content[index+1] == '3'?'red':''" v-for="(objItem,objI) in item" :key="itemI+objI" @click="handleContent(itemI,objI,index+1)">{{type[objItem.content[index+1]]}}</div>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 底部按钮 -->
  <div class="table-submit">
    <button @click="handleSubmit()">
      <i class="iconfont icon-submit"></i>
      {{$t('global.submit')}}
    </button>
  </div>
</div>
</template>

<script>
import {
  format
} from "../assets/utils/Tools";
import {
  getExchangeList,
  sendExchangeData
} from '../network/Sinyu';
import qs from 'qs'
export default {
  data() {
    return {
      date: [],
      dayNum: 0, //当月天数
      weekList: [],
      sundayList: [],
      itemList: [],
      type: ['', '○', '済', '済', '●']
    };
  },
  mounted() {
    this._getExchangeList()
    this.date = format(Date.now()).split("-");
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date(year, month, 0).getDate();
    this.dayNum = day;
    let aItem = "";
    for (var i = 1; i <= day; i++) {
      const day = year + "/" + month + "/" + i;
      switch (new Date(day).getDay()) {
        case 0:
          aItem = this.$t('BathExchange.sun');
          this.sundayList.push(i);
          break;
        case 1:
          aItem = this.$t('BathExchange.month');
          this.sundayList.push(null);
          break;
        case 2:
          aItem = this.$t('BathExchange.fire');
          this.sundayList.push(null);
          break;
        case 3:
          aItem = this.$t('BathExchange.water');
          this.sundayList.push(null);
          break;
        case 4:
          aItem = this.$t('BathExchange.wood');
          this.sundayList.push(null);
          break;
        case 5:
          aItem = this.$t('BathExchange.gold');
          this.sundayList.push(null);
          break;
        case 6:
          aItem = this.$t('BathExchange.soil');
          this.sundayList.push(null);
          break;
      }
      this.weekList.push(aItem);
    }
  },
  methods: {
    handleContent(itemI, objI, index) {
      if (this.itemList[itemI][objI].content[index] == '0') {
        this.$set(this.itemList[itemI][objI].content, index, '3')
      } else if (this.itemList[itemI][objI].content[index] == '3') {
        this.$set(this.itemList[itemI][objI].content, index, '0')
      }
    },
    handleSubmit() {
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("ServePlan.uploads"),
        okText: this.$t('global.sure'),
        cancelText: this.$t('global.cancel'),
        onOk: () => {
          ///    提交项目
          const config = {
            headers: {
              Accept: "application/json;charset=UTF-8",
              "Content-Type": "application/json"
            }
          };
          let tbBathChanges = []
          for (let v in this.itemList) {
            for (let vName in this.itemList[v]) {
              // let json = JSON.stringify(this.itemList[v][vName].content)
              // this.itemList[v][vName].content = JSON.stringify(json.toString()).substring(1, JSON.stringify(json.toString()).length - 1);
              this.itemList[v][vName].content = JSON.stringify(this.itemList[v][vName].content)
              tbBathChanges.push(this.itemList[v][vName])
            }
          }
          sendExchangeData(tbBathChanges, config).then(res => {
            if (res.code === 0) {
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
            this._getExchangeList()
          }).catch(err => {
            this.$Notice.error({
              title: this.$t("global.failed"),
              duration: 2
            });
            this._getExchangeList()
          })
        }
      });
    },
    _getExchangeList() {
      const unitId = localStorage.getItem('unitId')
      const data = {
        unitId,
        date: format(Date.now(), 'YYYY-MM')
      }
      getExchangeList(data).then(res => {
        if (res.code === 0) {
          this.itemList = res.data
          for (let v in this.itemList) {
            for (let vName in this.itemList[v]) {
              this.itemList[v][vName].content = JSON.parse(this.itemList[v][vName].content)
            }
          }
        }
      }).catch(err => {

      })
    }
  }
};
</script>

<style lang="less">
.bath-exchange {
  .exchange-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.16rem
      /* 16/102 */
    ;
    margin-bottom: 0.1rem
      /* 10/102 */
    ;

    input {
      border: 0;
      outline: none;
      width: 0.78rem
        /* 80/102 */
      ;
    }

    .header-census {
      text-align: right;
    }
  }

  // .exchange-header end

  table {
    width: 100%;
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

      td {
        padding: 0.05rem;
      }
    }

    .job {
      background: #f2dcdb;
      color: #000;
    }

    tbody td {
      position: relative;
      padding: 0.05rem
        /* 5/102 */
      ;
      padding: 0;

      div {
        border-bottom: 1px dashed var(--table-bg);
        padding: 0.05rem;
        height: .31rem
          /* 32/102 */
        ;

        &.red {
          color: #f00;
        }
      }

      div:last-child {
        border-bottom: 0;
      }

      &:first-child {
        white-space: nowrap;
        background: var(--table-bg);
        color: #fff;
        padding: 0.05rem;
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
}

// .bath-exchange end
</style>
