<template>
  <div class="new">
    <h1 class="trip-title">{{$t("evaluate.excretion.criticism1")}}</h1>
    <table  v-if="tabIndex == 3"  class="table new-table table-padding" cellspacing="0"
      cellpadding="0" border="1" style="border:1px solid #C4E8BF;">
      <tr>
        <td class="head-bg" style="min-width: 1.2rem;">{{$t("evaluate.excretion.criticism2")}}</td>
        <td colspan="15" style="text-align: left">
          <RadioGroup v-model="old_excretion.excretionType" size="large">
            <Radio label="0" @mouseup.native="onExcretionType('excretionType' , '0')">{{$t("evaluate.excretion.criticism3")}}</Radio>
            <Radio label="1" @mouseup.native="onExcretionType('excretionType' , '1')">{{$t("evaluate.excretion.criticism4")}}</Radio>
            <Radio label="2" @mouseup.native="onExcretionType('excretionType' , '2')">{{$t("evaluate.excretion.criticism5")}}</Radio>
            <Radio label="3" @mouseup.native="onExcretionType('excretionType' , '3')">{{$t("evaluate.excretion.criticism6")}}</Radio>
            <Radio label="4" @mouseup.native="onExcretionType('excretionType' , '4')">{{$t("evaluate.excretion.criticism7")}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("evaluate.excretion.criticism8")}}</td>
        <td colspan="7">
          <RadioGroup v-model="old_excretion.diaperType" size="large">
            <Radio label="0" @mouseup.native="onExcretionType('diaperType' , '0')">{{$t("evaluate.excretion.criticism9")}}</Radio>
            <Radio label="1" @mouseup.native="onExcretionType('diaperType' , '1')">{{$t("evaluate.excretion.criticism10")}}</Radio>
            <Radio label="2" @mouseup.native="onExcretionType('diaperType' , '2')">{{$t("evaluate.excretion.criticism11")}}</Radio>
            <Radio label="3" @mouseup.native="onExcretionType('diaperType' , '3')">{{$t("evaluate.excretion.criticism12")}}</Radio>
          </RadioGroup>
        </td>
        <td colspan="8">
          {{$t("evaluate.excretion.criticism13")}}：
              <Input
              type="textarea"
              autosize
              v-model="old_excretion.patType"
              class="new-width-input"
              style="width: 60%;"
            />
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">{{$t("evaluate.excretion.criticism14")}}</td>
        <td colspan="15">
          <RadioGroup  v-model="old_excretion.intestinesGrain" size="large">
            <Radio label="0" @mouseup.native="onExcretionType('intestinesGrain' , '0')">{{$t("evaluate.excretion.criticism15")}}</Radio>
            <Radio label="1" @mouseup.native="onExcretionType('intestinesGrain' , '1')">{{$t("evaluate.excretion.criticism16")}}</Radio>
            <Radio label="2" @mouseup.native="onExcretionType('intestinesGrain' , '2')">{{$t("evaluate.excretion.criticism17")}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="2" colspan="3">{{$t("evaluate.excretion.criticism18")}}</td>
        <td class="textCenter">0</td>
        <td class="textCenter">2</td>
        <td class="textCenter">4</td>
        <td class="textCenter">6</td>
        <td class="textCenter">8</td>
        <td class="textCenter">10</td>
        <td class="textCenter">12</td>
        <td class="textCenter">14</td>
        <td class="textCenter">16</td>
        <td class="textCenter">18</td>
        <td class="textCenter">20</td>
        <td class="textCenter">22</td>
        <td class="textCenter">24</td>
      </tr>
      <tr>
        <td>
          <Input
              type="textarea"
              autosize
              v-model="old_excretion.urineType.content1"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
          <Input
              type="textarea"
              autosize
                v-model="old_excretion.urineType.content2"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
          <Input
              type="textarea"
              autosize
                v-model="old_excretion.urineType.content3"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
          <Input
              type="textarea"
              autosize
                v-model="old_excretion.urineType.content4"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
          <Input
              type="textarea"
              autosize
                v-model="old_excretion.urineType.content5"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
          <Input
              type="textarea"
              autosize
                v-model="old_excretion.urineType.content6"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
          <Input
              type="textarea"
              autosize
                v-model="old_excretion.urineType.content7"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
          <Input
              type="textarea"
              autosize
                v-model="old_excretion.urineType.content8"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
          <Input
              type="textarea"
              autosize
                v-model="old_excretion.urineType.content9"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
          <Input
              type="textarea"
              autosize
                v-model="old_excretion.urineType.content10"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
          <Input
              type="textarea"
              autosize
                v-model="old_excretion.urineType.content11"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
          <Input
              type="textarea"
              autosize
                v-model="old_excretion.urineType.content12"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
          <Input
              type="textarea"
              autosize
                v-model="old_excretion.urineType.content13"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
      </tr>
      <tr>
        <td colspan="3" class="head-bg">{{$t("evaluate.excretion.criticism19")}}</td>
        <td colspan="15">
          <RadioGroup v-model="old_excretion.excretion" size="large">
            <Radio label="0" @mouseup.native="onExcretionType('excretion' , '0')">{{$t("evaluate.excretion.criticism20")}}</Radio>
            <Radio label="1" @mouseup.native="onExcretionType('excretion' , '1')">{{$t("evaluate.excretion.criticism21")}}</Radio>
            <Radio label="2" @mouseup.native="onExcretionType('excretion' , '2')">{{$t("evaluate.excretion.criticism22")}}</Radio>
            <Radio label="3" @mouseup.native="onExcretionType('excretion' , '3')">{{$t("evaluate.excretion.criticism23")}}</Radio>
            <Radio label="4" @mouseup.native="onExcretionType('excretion' , '4')">{{$t("evaluate.excretion.criticism24")}}</Radio>
          </RadioGroup>
        </td>
      </tr>

      <tr>
        <td class="head-bg"></td>
        <td class="head-bg" colspan="3">{{$t("evaluate.excretion.criticism25")}}</td>
        <td class="head-bg" colspan="11">{{$t("evaluate.excretion.criticism26")}}</td>
        <td class="head-bg">{{$t("evaluate.excretion.criticism27")}}</td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("evaluate.excretion.criticism28")}}</td>
        <td class="head-bg stroke">{{$t("evaluate.excretion.criticism29")}}</td>
        <td class="head-bg stroke">{{$t("evaluate.excretion.criticism30")}}</td>
        <td class="head-bg stroke">{{$t("evaluate.excretion.criticism31")}}</td>
        <td class="head-bg stroke">{{$t("evaluate.excretion.criticism32")}}</td>
        <td class="head-bg stroke">{{$t("evaluate.excretion.criticism33")}}</td>
        <td class="head-bg stroke">{{$t("evaluate.excretion.criticism34")}}</td>
        <td class="head-bg stroke">{{$t("evaluate.excretion.criticism35")}}</td>
        <td class="head-bg stroke">{{$t("evaluate.excretion.criticism36")}}</td>
        <td class="head-bg stroke">{{$t("evaluate.excretion.criticism37")}}</td>
        <td class="head-bg stroke">{{$t("evaluate.excretion.criticism38")}}</td>
        <td class="head-bg stroke">{{$t("evaluate.excretion.criticism39")}}</td>
        <td class="head-bg stroke">{{$t("evaluate.excretion.criticism40")}}</td>
        <td class="head-bg stroke">{{$t("evaluate.excretion.criticism41")}}</td>
        <td class="head-bg stroke">{{$t("evaluate.excretion.criticism42")}}</td>
        <td rowspan="3">
           <Input
              type="textarea"
             :autosize="{minRows: 5}" 
              v-model="old_excretion.specialSubject"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("evaluate.excretion.criticism43")}}</td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.currentStatus.content1"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
                v-model="old_excretion.currentStatus.content2"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
                v-model="old_excretion.currentStatus.content3"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
                v-model="old_excretion.currentStatus.content4"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
                v-model="old_excretion.currentStatus.content5"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
                v-model="old_excretion.currentStatus.content6"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
                v-model="old_excretion.currentStatus.content7"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
                v-model="old_excretion.currentStatus.content8"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
                v-model="old_excretion.currentStatus.content9"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
                v-model="old_excretion.currentStatus.content10"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
                v-model="old_excretion.currentStatus.content11"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
                v-model="old_excretion.currentStatus.content12"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
                v-model="old_excretion.currentStatus.content13"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.currentStatus.content14"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("evaluate.excretion.criticism44")}}</td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.surface.content1"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.surface.content2"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.surface.content3"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.surface.content4"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.surface.content5"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.surface.content6"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.surface.content7"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.surface.content8"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.surface.content9"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.surface.content10"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.surface.content11"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.surface.content12"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.surface.content13"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
        <td>
           <Input
              type="textarea"
              autosize
              v-model="old_excretion.surface.content14"
              class="new-width-input special"
              style="width: 100%;"
          />
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="5">{{$t("evaluate.excretion.criticism45")}}</td>
        <td colspan="11">
          <RadioGroup v-model="old_excretion.constipation.radio" size="large">
            <Radio label="0"  @mouseup.native="onConstipation('0')">{{$t("evaluate.excretion.criticism46")}}</Radio>
            <Radio label="1"  @mouseup.native="onConstipation('1')">{{$t("evaluate.excretion.criticism47")}}</Radio>
          </RadioGroup>
          ( <Input
              type="textarea"
              autosize
              v-model="old_excretion.constipation.content"
              class="new-width-input special"
              style="width: 30%;"
          /> )
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="5">{{$t("evaluate.excretion.criticism48")}}</td>
        <td colspan="11">
          <RadioGroup v-model="old_excretion.medicine.radio" size="large">
            <Radio label="0" @mouseup.native="onMedicine('0')">{{$t("evaluate.excretion.criticism49")}}</Radio>
            <Radio label="1" @mouseup.native="onMedicine('1')">{{$t("evaluate.excretion.criticism50")}}</Radio>
          </RadioGroup>
            ( <Input
              type="textarea"
              autosize
              v-model="old_excretion.medicine.content"
              class="new-width-input special"
              style="width: 30%;"
          /> )
        </td>
      </tr>
    </table>
     <div class="table-submit">
      <button @click="onInsert">
        <i class="iconfont icon-baocun"></i>
        {{$t('global.submit')}}
      </button>
    </div>
  </div>
</template>

<script>
import {
 selectExcretion , 
 insertExcretion ,
 updateExcretion
} from "../network/every";
import Vue from "vue";
export default {
  data() {
    return {
       oldId:"" ,
      // 排泄
      old_excretion:{
        id:"" ,
        oldManId:"" ,
        excretionType:"" ,
        diaperType:"" ,
        intestinesGrain:"" ,
        urineType:{} ,
        excretion:"" ,
        currentStatus:{} ,
        surface:{} ,
        constipation:{radio:"" , content:""} ,
        medicine:{radio:"" , content:""} 
      }
    }
  } , 
  methods:{
   // 排泄s
    onInsert(){
      this.onUIExcretion();
    } ,
    // 排泄获取数据
   async onSelectExcretion(){
      let result = await selectExcretion({
        oldManId : this.oldId
      })
         if(result.data === null ){return}
          this.old_excretion = result.data;
          this.old_excretion.constipation =  JSON.parse(result.data.constipation);
          this.old_excretion.currentStatus =  JSON.parse(result.data.currentStatus);
          this.old_excretion.medicine =  JSON.parse(result.data.medicine);
          this.old_excretion.surface =  JSON.parse(result.data.surface);
          this.old_excretion.urineType =  JSON.parse(result.data.urineType);
   } ,
    // 排泄（插入/更新）
   async onUIExcretion(){
       this.old_excretion.oldManId = this.oldId;
           let copy = {}
          for (let i in this.old_excretion) {
                Vue.set(copy , i , this.old_excretion[i]);
          }
          copy.constipation =  JSON.stringify(this.old_excretion.constipation);
          copy.currentStatus =  JSON.stringify(this.old_excretion.currentStatus);
          copy.medicine =  JSON.stringify(this.old_excretion.medicine);
          copy.surface =  JSON.stringify(this.old_excretion.surface);
          copy.urineType =  JSON.stringify(this.old_excretion.urineType);

          // let res = await insertExcretion(copy);
          // console.log(res);

            if (this.old_excretion.id == "") {
              let res = await insertExcretion(copy);
              console.log(res.data);
              if (res.code == 0) {
                this.$Notice.success({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.operationSuccess"),
                });
              } else {
                this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.operationFail"),
                });
              }
            } else {
              let result = await updateExcretion(copy);
               console.log(result.data);
              if (result.code == 0) {
                this.$Notice.success({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.operationSuccess"),
                });
              } else {
                this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.operationFail"),
                });
              }
            }
            this.onSelectExcretion()
    } ,
   

     onExcretionType(type , index) {
      if(this.old_excretion[type] == index){
         setTimeout(()=>{
         this.old_excretion[type] = "";
        },10)
      }
     } ,
     onConstipation(index) {
        if(this.old_excretion.constipation.radio == index){
          setTimeout(()=>{
           this.old_excretion.constipation.radio = "";
          },10)
        }
     } ,
      onMedicine(index) {
        if(this.old_excretion.medicine.radio == index){
          setTimeout(()=>{
           this.old_excretion.medicine.radio = "";
          },10)
        }
     } ,
    //排泄e

   } ,
  async created(){
     let oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
     this.oldId = oldInfo.oldId;
     this.onSelectExcretion()
   }
}

</script>

<style lang="less" scoped>
.new {
  text-align: left;
  .head-bg {
    font-size: 0.14rem;
  }
  .table {
    label {
      margin-right: 0.1rem /* 10/102 */;
      input {
        margin-right: 0.03rem /* 3/102 */;
      }
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    border-color: var(--border-color);
    margin-bottom: 0.29rem /* 30/102 */;
    font-size: 0.14rem /* 14/102 */;
    line-height: 0.29rem /* 30/102 */;
    background: #fff;
    td {
      position: relative;
    }
    .stroke {
      width: 0.6rem;
      line-height: 0.2rem;
      padding: 0.05rem;
    }
    .textCenter {
      text-align: center;
    }
  } // table end
} //  #drain-trip end
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>