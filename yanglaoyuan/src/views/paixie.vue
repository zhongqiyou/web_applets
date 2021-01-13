<template>
  <div class="sheet">
    <div class="trip-title">排泄一拓入力表</div>
    <div class="timeTab">
      <Date-picker
        type="daterange"
        format="yyyy-MM-dd"
        @on-change="queryTime =$event"
        :value="queryTime"
        placement="bottom-end"
        placeholder="选择日期"
        style="width: 300px;"
        size="large"
      ></Date-picker>
      <i-button type="success" vertical @click="checkTime()" style="margin-left:20px;">查看</i-button>
    </div>
    <table
      class="sheetTable new-table"
      border="1px"
      cellspacing="1"
      cellpadding="0"
      style="border:1px solid #63af1e;"
    >
      <tr>
        <th>用户名</th>
        <th>方法</th>
        <th>种类</th>
        <th v-for="(item,index) in 24" :key="index">{{index<10 ?'0'+index+':00':index+':00'}}</th>
      </tr>
      <tr>
        <td class="head-bg">{{oldInfo.name}}</td>
        <td>
          <table class="diaper" border="1px" cellspacing="1" cellpadding="0">
            <tr>
              <td>
                <input placeholder="尿器" />
              </td>
              <td><input placeholder="尿布" /></td>
            </tr>
          </table>
        </td>
        <td class="head-bg">排尿</td>
        <td v-for="(item,index) in 24" :key="index">
          <table class="diaper" border="1px" cellspacing="1" cellpadding="0">
            <tr>
              <td v-for="(item,index) in 6" :key="index">
                <input placeholder="1" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{oldInfo.name}}</td>
        <td>
          <table class="diaper" border="1px" cellspacing="1" cellpadding="0">
            <tr>
              <td>
                <input placeholder="尿器" />
              </td>
              <td><input placeholder="尿布" /></td>
            </tr>
          </table>
        </td>
        <td class="head-bg">排便</td>
        <td v-for="(item,index) in 24" :key="index">
          <table class="diaper" border="1px" cellspacing="1" cellpadding="0">
            <tr>
              <td v-for="(item,index) in 6" :key="index" @click="showModal == true">
                <input placeholder="1" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <div class="annex">
      <table class="annexTab" border="1px solid #ccc">
        <thead>
          <tr>
            <td>序号</td>
            <td colspan="2">形状</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in annexList" :key="index">
            <td>{{index+1}}</td>
            <td class="annImgTd">
              <Upload
                action="http://47.115.137.147:9000/app/upload/uploadFile"
                type="drag"
                :format="['jpg','jpeg','png', 'gif']"
                :show-upload-list="false"
                :before-upload="handleUploadUpload()"
                :on-success="handleUploadSuccessModify()"
              >
                <img class="annImg" :src="item.imgUrl" />
              </Upload>
            </td>
            <td>
              <textarea v-model="item.description"></textarea>
            </td>
          </tr>
          <tr>
            <td>{{annexList.length+1}}</td>
            <td class="annImgTd">
              <Upload
                action="http://47.115.137.147:9000/app/upload/uploadFile"
                type="drag"
                :format="['jpg','jpeg','png', 'gif']"
                :show-upload-list="false"
                :on-success="handleUploadSuccess"
              >
                <Button v-show="showUpload" icon="ios-cloud-upload-outline">上传图片</Button>
                <img class="annImg" :src="annObj.imgUrl" alt />
              </Upload>
            </td>
            <td>
              <textarea v-model="annObj.shape" placeholder="添加形状描述"></textarea>
            </td>
          </tr>
          <tr>
            <td colspan="3">......</td>
          </tr>
        </tbody>
      </table>
      <div class="table-submit">
        <button @click="handleSave()">
          <i class="iconfont icon-baocun"></i> 保存表格
        </button>
        <button @click="handleSubmit()">
          <i class="iconfont icon-submit"></i> 提交表格
        </button>
        <!-- <button @click="enclosureSave()">
          <i class="iconfont icon-baocun"></i> 保存附件
        </button>
        <button @click="enclosureSubmit()">
          <i class="iconfont icon-submit"></i> 提交附件
        </button> -->
      </div>
    </div>
    <div class="popupBox">
       <Modal
        v-model="showModal"
        title="请选择排便情况"
        @on-ok="handleSure"
        @on-cancel="handleCancel">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
    </div>
  </div>
</template>
<script>
import {
  getAttachment,
  attachmentAdd,
  attachmentModify,
  getExcretionRecord,
  excretionRecordAdd,
  excretionRecordModify
} from "../network/kongHX";
import { get } from "../network/http";
export default {
  name: "",
  data() {
    return {
      annexList: [], //附件表格
      queryTime: "", //表格显示时间
      annObj: { imgUrl: "", fileAPUrl: "", shape: "" }, //附件
      showUpload: true, //允许上传图片
      oldInfo: {}, //老人信息
      startDate: "",
      endDate: "",
      trTable: [
        {
          toolType: "",
          excretionType: "",
          dayTime: [
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] },
            { hourList: [{}, {}, {}, {}, {}, {}] }
          ]
        }
      ],
      nowDay: "",//今天xxxx-xx-xx
      showModal: false,
    };
  },
  created() {
    this.oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    console.log("老人信息", this.oldInfo);
    this.getTime();
  },
  methods: {
    getList() {},
    getAnnex() {},
    handleSave() {},
    handleSubmit() {},

    getTime() {
      var date = new Date();
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      //获取当月天数
      var d = new Date(year, mon, 0).getDate();
      this.dayNum = d;
      var day = date.getDate(); //获取今天日期
      if (mon < 10) {
        mon = "0" + mon;
      }
      if (day < 10) {
        day = "0" + day;
      }
      this.nowDay = year + "-" + mon + "-" + day;
      this.getList();
      this.getAnnex(); //查看附件
    },
    async getAnnex() {
      try {
        const res = await getAttachment({
          id: this.oldInfo.oldId
        });
        console.log(res);
        if (res.code === 0) {
          this.annexList = res.data;
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 附件保存
    async enclosureSave() {
      try {
        const res = await attachmentModify({
          oldManId: this.oldInfo.oldId,
          id: ""
        });
        console.log(res);
        if (res.code === 0) {
          this.$Notice.error({
            title: "附件保存成功"
          });
          this.getList();
        } else {
          this.$Notice.error({
            title: "附件保存失败",
            desc: res.data
          });
          return false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    //附件提交
    async enclosureSubmit() {
      try {
        const res = await attachmentAdd({
          content: "",
          createDate: this.nowDay,
          description: this.annObj.shape,
          id: "",
          imgUrl: this.annObj.fileAPUrl
        });
        console.log(res);
        if (res.code === 0) {
          this.$Notice.error({
            title: "附件提交成功"
          });
          this.getList();
        } else {
          this.$Notice.error({
            title: "附件提交失败",
            desc: res.data
          });
          return false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    //点击查看
    checkTime() {
      console.log("选择时间", this.queryTime);
      this.startDate = this.queryTime[0];
      this.endDate = this.queryTime[1];
    },
    //上传图片成功（添加）
    handleUploadSuccess(response, file) {
      console.log("图片上传成功", response);
      this.showUpload = false;
      this.annObj.imgUrl = response.data.httpsUrl;
      this.annObj.fileAPUrl = response.data.fileAPUrl;
    },
    //上传图片成功（修改）
    handleUploadSuccessModify(response, file) {},
    //上传图片之前（修改）
    handleUploadUpload() {},
    //确定（弹框）
    handleSure(){
      
    }
  }
};
</script>
<style >
.sheetTable,.annexTab{
  font-size: 0.14rem !important;
}
.sheet {
  padding: 0 0.25rem 0 0.15rem;
}
.sheetTable {
  border: 1px solid #e7e7e7;
  font-size: 14px;
  width: 100%;
}
.sheetTable th {
  text-align: center;
  padding: 0.18rem 0;
  min-width: 0.9rem;
  background: #63af1e;
  font-size: 0.14rem;
  color: #ffffff !important;
  text-align: center;
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
.diaper {
  width: 100%;
  border: 1px solid #e7e7e7;
}
.diaper > tr > td {
  padding: 0.18rem 0;
}
/* 附件表 */
.annex {
  width: 100%;
  margin-top: 50px;
}
.annexTab {
  width: 50%;
  border: 0;
  background: #fff;
  border-radius: 4px;
}
.annexTab td {
  padding: 0.03px;
  height: 0.3rem;
  line-height: 0.3rem;
}
.annexTab thead {
  background: #f6bd16;
}
.annImgTd {
  width: 1rem;
  text-align: center;
}
.annImg {
  object-fit: cover;
  width: 100%;
  background: #5ad9a6;
  line-height: 0.3rem;
  border: none;
  padding: none;
}
.annexTab tbody tr:last-child {
  background: #5ad9a6;
}
.timeTab {
  height: 0.5rem;
  font-size: 12px !important;
}
td textarea {
  width: 80% !important;
  height: 100% /* 80/102 */;
  margin-top: 10px;
  outline: none;
  resize: none;
  border: none;
}
td input {
  width: 100%;
  border: none;
  text-align: center;
}
td input:focus {
  outline: medium;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
/* 去除上传文件按钮样式 */
.ivu-upload-drag {
  border: none;
}
</style>