<template>
  <div class="sheet">
    <div class="trip-title">{{$t("afterRecord.title")}}</div>
    <div class="make" style="margin:0.1rem 0;font-size:0.12rem;">
      <div>ID: {{oldId}}</div>
      <div>
        <span>{{$t("afterRecord.Username")}}:</span>
        <input type="text" class="makeInput" v-model="oldName" disabled style="width: 2rem;" />
      </div>
      <div>
      </div>
    </div>

    <div style="display:flex;">
    <!-- <div>
        <table class="table sheetTable new-table after-table" border="1px" cellspacing="1" cellpadding="0">
               <tr class="title-h">
                    <th style="min-width:1.5rem;font-size:0.18rem;">
                    <span style="width:0.4rem;">{{$t("afterRecord.Time")}}</span>
                    </th>
               </tr>
               <tr v-for="(item , index) in yTitle" :key="index" class="title-h">
                  <td style="height:0.5rem;" class="sheetContent head-bg" :class="'after-back' + index">{{$t(item)}}</td>
               </tr>
               
        </table>
    </div> -->
    <div style="width: 100%; overflow-x: auto; overflow-y: hidden;">
      <table class="table sheetTable new-table after-table" style="overflow:auto" border="1px" cellspacing="1" cellpadding="0">
        <tr  class="content-h">
          <th style="min-width:1.5rem;font-size:0.18rem;" class="position">
            <span style="width:0.4rem;">{{$t("afterRecord.Time")}}</span>
          </th>
          <th
            v-for="(item, index) in xTitle"
            :key="index"
            style="min-width:1.5rem;font-size:0.18rem;"
          >{{item}}</th>
        </tr>
        <tr v-for="(item, index) in yTitle" :key="index" class="content-h">
          <td class="sheetContent head-bg position" :class="'after-back' + index">{{$t(item)}}</td>
          <td ref="tddom"   v-for="(itemC, indexC) in xTitle" :key="indexC">
            {{models.length != 0 ? models[index * xTitle.length + indexC].content : ""}}
          </td>
        </tr>
      </table>
    </div>
   </div>
   

  </div>
</template>
<script>
import { selectHistory, innserHistory } from "../network/every";
export default {
  data() {
    return {
      oldId:"" ,
      year: "",
      month: "",
      day: "",
      oldAge: "",
      oldName: "",
      xTitle: [
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
      ],
      yTitle: [
        "afterRecord.Daily",
        "afterRecord.Implement",
        "afterRecord.Focus",
        "afterRecord.Nursing",
        "afterRecord.Care",
         "FacilitiesPlan3.Physician",
        "afterRecord.Physical",
       
        "afterRecord.Nutritionist",
        "afterRecord.Nursing1",
        "afterRecord.Pharmacist",
      ],
      models: [],
      handle: [
        "" ,
        "ServePlan.sele1",
        "ServePlan.sele2",
        "ServePlan.sele3",
        "ServePlan.sele4",
      ],
    };
  },

  methods: {
    // 获取数据
    async onSelect() {
      let date = new Date();
      this.year = date.getFullYear();
      this.month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      this.day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
      this.oldId = oldInfo.oldId;

       try{
                  let res = await selectHistory({
                id: oldInfo.oldId,
                time: `${this.year}-${this.month}-${this.day}`
              });
              if (res.data == null) return;

              //  渲染数据
              let arr = [];
              for (let i = 0; i < this.models.length; i++) {
                if (i < 24) {
                  if(res.data[i].content == null || res.data[i].content == "[]"){
                      res.data[i].content = '[""]';
                  }
                  
                  let index = JSON.parse(res.data[i].content)
                  let newArr = index.map((value , index)=>{
                     console.log(value);
                      if(value){
                          if(value == 1 || value == 2 || value == 3 || value == 4){
                              return `<p style="text-align:left;border:1px solid #c4e8bf;margin:1px 0;font-size:0.18rem;">${index+1}、${this.$t(this.handle[value])}</p>`;
                          }else if(value == "ServePlan.sele5" || value == "ServePlan.sele6" || value == "ServePlan.sele7" || value == "ServePlan.sele7"){
                              return `<p style="text-align:left;border:1px solid #c4e8bf;margin:1px 0;font-size:0.18rem;">${index+1}、${this.$t(value)}</p>`;
                          }else{
                              return `<p style="text-align:left;border:1px solid #c4e8bf;;margin:1px 0;font-size:0.18rem;">${index+1}、${value}</p>`;
                          }
                        }
                         
                        });
                    arr.push(newArr.join("")) 
                    this.models[i].content = arr[i]
                    this.$refs.tddom[i].innerHTML = arr[i]
                }else if(i < 48){
                  if(res.data[i].content == null || res.data[i].content == "[]"){
                      res.data[i].content = '[""]';
                    }
                  let index = JSON.parse(res.data[i].content)
                  let newArr = index.map((value , index)=>{
                      if(value){
                         return `<p style="text-align:left;border:1px solid #c4e8bf;margin:1px 0;min-height:0.159rem;font-size:0.18rem;">${index+1}、${value}</p>`;
                      }else{
                        //  return `<p style="text-align:left;border:1px solid #c4e8bf;margin:1px 0;min-height:0.159rem;font-size:0.18rem;">${index+1}、${value}</p>`;
                      }
                          
                        })
                    arr.push(newArr.join("")) 
                    this.models[i].content = arr[i]
                    this.$refs.tddom[i].innerHTML = arr[i]
                } else if(i < 72){
                  
                  let index = res.data[i].content.split(",");
                  let newArr = index.map((value , index)=>{
                        if(value){
                              return `<p style="text-align:left;border:1px solid #c4e8bf;margin:1px 0;min-height:0.159rem;font-size:0.18rem;">${index+1}、${value}</p>`;
                        }else{
                              // return `<p style="text-align:left;border:1px solid #c4e8bf;margin:1px 0;min-height:0.159rem;font-size:0.18rem;">${value}</p>`;
                        }

                        })
                    arr.push(newArr.join("")) 
                    this.models[i].content = arr[i]
                    this.$refs.tddom[i].innerHTML = arr[i]


                }else{
                    if(res.data[i].content == null || res.data[i].content == "[]"){
                      res.data[i].content = '[""]';
                      }
                    let index = JSON.parse(res.data[i].content);
                    let newArr = index.map((value , index)=>{
                      if(value){
                          return `<p style="text-align:left;border:1px solid #c4e8bf;margin:1px 0;min-height:0.18rem;font-size:0.18rem;">${value}</p>`;
                      }else{
                          // return `<p style="text-align:left;border:1px solid #c4e8bf;margin:1px 0;min-height:0.18rem;font-size:0.18rem;">${value}</p>`;
                      }
                          
                        })
                    arr[i] = newArr.join("")
                    this.models[i].content = newArr[i];
                    this.$refs.tddom[i].innerHTML = arr[i];
                }
              }
       }catch(err){
           this.$Notice.error({
                        title: this.$t("global.reminder"),
                        desc:  this.$t("global.loadFail"),
                      });
       }

      
        //   let contentH = document.querySelectorAll(".content-h");
        //   let titleH = document.querySelectorAll(".title-h");
        //   let size = document.querySelector("html").style.fontSize.slice(0 , -2);


           
        // for(let i = 0; i < contentH.length; i++){
        //        titleH[i].style.height = contentH[i].offsetHeight/size + "rem"
        //        contentH[i].style.height = contentH[i].offsetHeight/size + "rem"
        //     }
      
        

        // window.onresize = () => {
        //         let size = document.querySelector("html").style.fontSize.slice(0 , -2);
        //           for(let i = 0; i < contentH.length; i++){
        //             titleH[i].style.height = contentH[i].offsetHeight/size + "rem"
        //             contentH[i].style.height = contentH[i].offsetHeight/size + "rem"
        //           }
        //     }

     
    },
    
  },
  async created() {

    // 测试数据获取（从首页面板获取数据，渲染老人姓名，年龄，制作日）
    let oldList = JSON.parse(localStorage.getItem("oldInfo"));
    console.log(oldList);
    this.oldName = oldList.name;
    this.oldAge = oldList.age;

    let time_arr = oldList.checkinDate.split("-");

  
    let date = new Date();
    this.year = date.getFullYear();
    this.month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    this.day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 24; j++) {
        let obj = {
          content: "",
        };
        this.models.push(obj);
      }
    }


    this.onSelect();

  },

};
</script>

<style scoped>
.after-back3{
  background: rgba(253, 233, 217, 1);
}
.after-back4{
  background: rgba(255, 255, 0, 1);
}
.after-back6{
  background: rgba(146, 208, 80, 1);
}
.after-back5{
  background: rgba(0, 176, 240, 1);
}
.after-back7{
  background: rgba(226, 107, 10, 1);
}
.after-back8{
  background: rgba(177, 160, 199, 1);
}
.after-back9{
  background: rgba(255, 255, 255, 1);
}
.after-table td ,
.after-table th ,
.after-table tr{
  color: #000000 !important;
}

</style>
<style>
.sheet {
  padding: 0 25px 0 15px;
}
.sheetTitle {
  text-align: left;
  font-size: 0.18rem /* 18/102 */;
  line-height: 0.55rem /* 56/102 */;
  padding: 0 0.26rem /* 27/102 */;
  background: linear-gradient(90deg, #63af1e, #63af1e, #fff);
  color: #fff;
  margin: 0.25rem /* 25/102 */ 0;
}
.preservation {
  color: #74d1b4;
}
.make {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 20rpx;
}
.makeInput {
  width: 50px;
  border: none;
  outline: medium;
}
.sheetTable {
  font-size: 14px;
  width: 100%;
}
.sheetTable::-webkit-scrollbar {
  display: none;
}
.sheetTable > tr > th {
  padding: 0.2rem 0;
  min-width: 0.9rem;
  background: var(--table-bg);
  font-size: 0.14rem;
  color: #ffffff !important;
  text-align: center;
}
.sheetTable > tr > th > span {
  display: inline-block;
  width: 40px;
  text-align: center;
}
.sheetTable > tr > td > textarea {
  /* height: 1rem; */
  border: none;
  outline: medium;
}

</style>