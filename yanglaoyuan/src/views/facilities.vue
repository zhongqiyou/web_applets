<template>
  <div class="facilities">
    <div class="trip-title">{{$t('facilities.title')}}</div>
    <table class="table new-table" width="100%">
      <thead>
        <td class="head-bg">No.</td>
        <td class="head-bg">{{$t("facilities.Ticket")}}</td>
        <td class="head-bg">{{$t("facilities.paper")}}</td>
        <td class="head-bg">{{$t("facilities.records")}}</td>
        <td class="head-bg">{{$t("facilities.audit")}}</td>
        <td class="head-bg">{{$t("facilities.Remarks")}}</td>
        <td class="head-bg">{{$t("facilities.Recorder")}}</td>
      </thead>
      <tr v-for="(item, index) in facilitieList" :key="index">
        <td>{{index+1}}</td>
        <td>{{item.name}}</td>
        <td class="bigText">{{item.pdf?'O':'X'}}</td>
        <td class="bigText">{{item.pc?'O':'X'}}</td>
        <td class="bigText">{{item.audit?'O':'X'}}</td>
        <td v-if="item.remarksTD>0 && index!=25" :rowspan="item.remarksTD">{{item.remarksTD>0?item.remarks:""}}</td>
        <td v-if="item.remarksTD>0 && index==25" :rowspan="item.remarksTD">{{showRecorder(item.recorder)}}</td>
        <td>{{showRecorder(item.recorder)}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getFacilityList } from "../network/Sinyu";
export default {
  data() {
    return {
      oldInfo: {},
      facilitieList: [
        {
          name: this.$t("facilities.tableName1"),
          pdf: false,
          pc: true,
          audit: false,
          remarks: "",
          remarksTD: 1,
          recorder: [5,1]
        },
        {
          name: this.$t("facilities.tableName2"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [5,1]
        },
        {
          name: this.$t("facilities.tableName3"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [5,1]
        },
        {
          name: this.$t("facilities.tableName4"),
          pdf: false,
          pc: true,
          audit: false,
          remarks: "",
          remarksTD: 1,
          recorder: [2,1]
        },
        {
          name: this.$t("facilities.tableName5"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [2,7,1,0,4,5,6] 
        },
        {
          name: this.$t("facilities.tableName6"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [2,7,1,0,4,5,6]
        },
        {
          name: this.$t("facilities.tableName7"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [6]
        },
        {
          name: this.$t("facilities.tableName8"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [6]
        },
        {
          name: this.$t("facilities.tableName9"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [2,7,1,0,4]
        },
        {
          name: this.$t("facilities.tableName10"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [0,1,7]
        },
        {
          name: this.$t("facilities.tableName11"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [0,1,7]
        },
        {
          name: this.$t("facilities.tableName12"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [0,1,7]
        },
        {
          name: this.$t("facilities.tableName13"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [0,1,7]
        },
        {
          name: this.$t("facilities.tableName14"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [0,1,7]
        },
        {
          name: this.$t("facilities.tableName15"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [2,7,1,0,4] 
        },
        {
          name: this.$t("facilities.tableName16"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [2,7,1,0,4]
        },
        {
          name: this.$t("facilities.tableName17"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [1,0]
        },
        {
          name: this.$t("facilities.tableName18"),
          pdf: true,
          pc: true,
          audit: true,
          remarks: this.$t("facilities.remarks1"),
          remarksTD: 1,
          recorder: [1]
        },
        {
          name: this.$t("facilities.tableName19"),
          pdf: true,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [1]
        },
        {
          name: this.$t("facilities.tableName20"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: this.$t("facilities.remarks2"),
          remarksTD: 2,
          recorder: [2,7,1,0,4,5,6]
        },
        {
          name: this.$t("facilities.tableName21"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 0,
          recorder: [2,7,1,0,4,5,6]
        },
        {
          name: this.$t("facilities.tableName22"),
          pdf: false,
          pc: true,
          audit: false,
          remarks: "",
          remarksTD: 1,
          recorder: [1,0]
        },
        {
          name: this.$t("facilities.tableName23"),
          pdf: false,
          pc: true,
          audit: false,
          remarks: "",
          remarksTD: 1,
          recorder: [1,0]
        },
        {
          name: this.$t("facilities.tableName24"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [2,7,1,0,4,5,6]
        },
        {
          name: this.$t("facilities.tableName25"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 1,
          recorder: [1,0]
        },
        {
          name: this.$t("facilities.tableName26"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "看護、介護、リハ、栄養士",
          remarksTD: 1,
          recorder: [2,7,1,0,4] 
        },
        {
          name: this.$t("facilities.tableName27"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: this.$t("facilities.remarks3"),
          remarksTD: 4,
          recorder: [1,0,7,4]
        },
        {
          name: this.$t("facilities.tableName28"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 0,
          recorder: [1,0,7,4]
        },
        {
          name: this.$t("facilities.tableName29"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 0,
          recorder: [1,0,7,4]
        },
        {
          name: this.$t("facilities.tableName30"),
          pdf: false,
          pc: true,
          audit: true,
          remarks: "",
          remarksTD: 0,
          recorder: [1,0,7,4]
        }
      ],
    };
  },
  created() {
    // this.oldInfo = JSON.parse(localStorage.getItem('oldInfo'))
    // this._getFacilityList()
  },
  methods: {
    showRecorder(idArr) {
      var nameArr = [
        {
          id: 0,
          name: this.$t("positionArray.chaperone")
        },
        {
          id: 1,
          name: this.$t("positionArray.nurse")
        },
        {
          id: 2,
          name: this.$t("positionArray.doctor")
        },
        {
          id: 3,
          name: this.$t("positionArray.division")
        },
        {
          id: 4,
          name: this.$t("positionArray.dietitian")
        },
        {
          id: 5,
          name: this.$t("positionArray.adviser")
        },
        {
          id: 6,
          name: this.$t("positionArray.professional")
        },
        {
          id: 7,
          name: this.$t("positionArray.rehabilitation")
        }
      ];
      var showArr = [];
      var showStr = "";
      for (let i = 0; i < nameArr.length; i++) {
        for (let j = 0; j < idArr.length; j++) {
          if (nameArr[i].id === idArr[j]) {
            showArr.push(nameArr[i].name);
            break;
          }
        }
      }
      for(let i=0;i<showArr.length;i++){
        if(i===0){
          showStr = showArr[0];
        }else{
          showStr = showStr + '、' + showArr[i];
        }
      }
      return showStr;
    },
    _getFacilityList() {
      const data = {
        oldManId: this.oldInfo.oldId
      };
      getFacilityList(data)
        .then(res => {
          if (res.code === 0) {
            this.facilitieList = res.data;
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="less" scoped>
.facilities {
  table td {
    font-size: 0.14rem;
    white-space: pre-wrap;
  }
  .bigText {
    font-size: 0.15rem;
  }
}
</style>
