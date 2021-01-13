<template>
  <div id="vote-meeting">
    <div class="trip-title">{{$t('JixuVoteMeeting.title')}}</div>

    <div class="meeting-header">
      <div class="selectBox">
        <div class="year">
          <DatePicker
            class="calendarFont"
            type="year"
            :placeholder="$t('global.selectYear')"
            style="100%"
            format="yyyy"
            @on-change="changYear($event)"
            v-model="occurrenceYear"
          ></DatePicker>
        </div>
        <div class="occurrenceDay">
          <Select v-model="occurrenceDay" style="width: 100%" @on-change="changTable($event)">
            <Option
              v-for="item in occurrenceDayList"
              format="yyyy-MM-dd"
              :value="item.date"
              :key="item.date"
            >{{item.date}}</Option>
          </Select>
        </div>
      </div>
      <div>
        <div class="modifyDay">
          作成日：
          <DatePicker
            class="calendarFont"
            style="100% 100%;background: #fff;"
            v-model="modifyDay"
            format="yyyy-MM-dd"
            @on-change="changDay($event)"
          ></DatePicker>
        </div>
        <div style="text-align: right;">
          <label class="header-name">{{$t("VoteMeeting.Resident")}}：{{resident_name}}</label>
          <label class="header-age">{{age}} {{$t("VoteMeeting.years")}}</label>
        </div>
      </div>
    </div>
    <table class="meeting-table new-table table" border="1">
      <tr>
        <td class="head-bg">{{$t("VoteMeeting.Position")}}</td>
        <td colspan="4" class="center">{{$t("VoteMeeting.Policy")}}</td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("VoteMeeting.Doctors")}}</td>
        <td colspan="4">
          <Input v-model="physicianContent" type="textarea" :autosize="{minRows: 2}" />
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("VoteMeeting.assessment")}}</td>
        <td class="special">
          <CheckboxGroup v-model="physicianAssess" @on-change="changePhysicianName">
            <Checkbox label="1">{{$t('repair.Fall')}}</Checkbox>
            <Checkbox label="2">{{$t('repair.accidental')}}</Checkbox>
            <Checkbox label="3">{{$t('repair.Ingestion')}}</Checkbox>
            <Checkbox label="4">{{$t('repair.Leave')}}</Checkbox>
            <Checkbox label="5">{{$t('repair.Trouble')}}</Checkbox>
            <Checkbox label="6">{{$t('repair.ulcer')}}</Checkbox>
            <Checkbox label="7">{{$t('repair.Medicine')}}</Checkbox>
            <br />
            <Checkbox label="8">
              {{$t('repair.Other')}}(
              <Input
                class="other"
                v-model="physicianOther"
                type="textarea"
                :autosize="{minRows: 1 }"
              />)
            </Checkbox>
          </CheckboxGroup>
        </td>
        <td class="head-bg">{{$t("VoteMeeting.Principal1")}}</td>
        <td>
          <Input v-model="physicianName" type="textarea" />
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("VoteMeeting.Review")}}</td>
        <td colspan="4">
          <Input v-model="recheckContent" type="textarea" :autosize="{minRows: 2}" />
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("VoteMeeting.assessment")}}</td>
        <td class="special">
          <CheckboxGroup v-model="recheckAssess" @on-change="changeRecheckName">
            <Checkbox label="1">{{$t('repair.Fall')}}</Checkbox>
            <Checkbox label="2">{{$t('repair.accidental')}}</Checkbox>
            <Checkbox label="3">{{$t('repair.Ingestion')}}</Checkbox>
            <Checkbox label="4">{{$t('repair.Leave')}}</Checkbox>
            <Checkbox label="5">{{$t('repair.Trouble')}}</Checkbox>
            <Checkbox label="6">{{$t('repair.ulcer')}}</Checkbox>
            <Checkbox label="7">{{$t('repair.Medicine')}}</Checkbox>
            <br />
            <Checkbox label="8">
              {{$t('repair.Other')}}(
              <Input
                class="other"
                v-model="recheckOther"
                type="textarea"
                :autosize="{minRows: 1 }"
              />)
            </Checkbox>
          </CheckboxGroup>
        </td>
        <td class="head-bg">{{$t("VoteMeeting.Principal1")}}</td>
        <td>
          <Input v-model="recheckName" type="textarea" />
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("VoteMeeting.Nurse")}}</td>
        <td colspan="4">
          <Input v-model="careContent" type="textarea" :autosize="{minRows: 2}" />
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("VoteMeeting.assessment")}}</td>
        <td class="special">
          <CheckboxGroup v-model="careAssess" @on-change="changeCareName">
            <Checkbox label="1">{{$t('repair.Fall')}}</Checkbox>
            <Checkbox label="2">{{$t('repair.accidental')}}</Checkbox>
            <Checkbox label="3">{{$t('repair.Ingestion')}}</Checkbox>
            <Checkbox label="4">{{$t('repair.Leave')}}</Checkbox>
            <Checkbox label="5">{{$t('repair.Trouble')}}</Checkbox>
            <Checkbox label="6">{{$t('repair.ulcer')}}</Checkbox>
            <Checkbox label="7">{{$t('repair.Medicine')}}</Checkbox>
            <br />
            <Checkbox label="8">
              {{$t('repair.Other')}}(
              <Input class="other" v-model="careOther" type="textarea" :autosize="{minRows: 1 }" />)
            </Checkbox>
          </CheckboxGroup>
        </td>
        <td class="head-bg">{{$t("VoteMeeting.Principal1")}}</td>
        <td>
          <Input v-model="careName" type="textarea" />
        </td>
      </tr>
      <!--介护-->
      <tr>
        <td class="head-bg">{{$t("JixuVoteMeeting.Nursing")}}</td>
        <td colspan="4">
          <Input v-model="nurseContent" type="textarea" :autosize="{minRows: 2}" />
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("VoteMeeting.assessment")}}</td>
        <td class="special">
          <CheckboxGroup v-model="nurseAssess" @on-change="changeNurseName">
            <Checkbox label="1">{{$t('repair.Fall')}}</Checkbox>
            <Checkbox label="2">{{$t('repair.accidental')}}</Checkbox>
            <Checkbox label="3">{{$t('repair.Ingestion')}}</Checkbox>
            <Checkbox label="4">{{$t('repair.Leave')}}</Checkbox>
            <Checkbox label="5">{{$t('repair.Trouble')}}</Checkbox>
            <Checkbox label="6">{{$t('repair.ulcer')}}</Checkbox>
            <Checkbox label="7">{{$t('repair.Medicine')}}</Checkbox>
            <br />
            <Checkbox label="8">
              {{$t('repair.Other')}}(
              <Input class="other" v-model="nurseOther" type="textarea" :autosize="{minRows: 1 }" />)
            </Checkbox>
          </CheckboxGroup>
        </td>
        <td class="head-bg">{{$t("VoteMeeting.Principal1")}}</td>
        <td>
          <Input v-model="nurseName" type="textarea" />
        </td>
      </tr>

      <tr>
        <td class="head-bg">{{$t("VoteMeeting.Nutritionist")}}</td>
        <td colspan="4">
          <Input v-model="dieticianContent" type="textarea" :autosize="{minRows: 2}" />
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("VoteMeeting.assessment")}}</td>
        <td class="special">
          <CheckboxGroup v-model="dieticianAssess" @on-change="changeDieticianName">
            <Checkbox label="1">{{$t('repair.Fall')}}</Checkbox>
            <Checkbox label="2">{{$t('repair.accidental')}}</Checkbox>
            <Checkbox label="3">{{$t('repair.Ingestion')}}</Checkbox>
            <Checkbox label="4">{{$t('repair.Leave')}}</Checkbox>
            <Checkbox label="5">{{$t('repair.Trouble')}}</Checkbox>
            <Checkbox label="6">{{$t('repair.ulcer')}}</Checkbox>
            <Checkbox label="7">{{$t('repair.Medicine')}}</Checkbox>
            <br />
            <Checkbox label="8">
              {{$t('repair.Other')}}(
              <Input
                class="other"
                v-model="dieticianOther"
                type="textarea"
                :autosize="{minRows: 1 }"
              />)
            </Checkbox>
          </CheckboxGroup>
        </td>
        <td class="head-bg">{{$t("VoteMeeting.Principal1")}}</td>
        <td>
          <Input v-model="dieticianName" type="textarea" />
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("VoteMeeting.Talker")}}</td>
        <td colspan="4">
          <Input v-model="taikContent" type="textarea" :autosize="{minRows: 2}" />
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("VoteMeeting.assessment")}}</td>
        <td class="special">
          <CheckboxGroup v-model="taikAssess" @on-change="changeTaikAssess">
            <Checkbox label="1">{{$t('repair.Fall')}}</Checkbox>
            <Checkbox label="2">{{$t('repair.accidental')}}</Checkbox>
            <Checkbox label="3">{{$t('repair.Ingestion')}}</Checkbox>
            <Checkbox label="4">{{$t('repair.Leave')}}</Checkbox>
            <Checkbox label="5">{{$t('repair.Trouble')}}</Checkbox>
            <Checkbox label="6">{{$t('repair.ulcer')}}</Checkbox>
            <Checkbox label="7">{{$t('repair.Medicine')}}</Checkbox>
            <br />
            <Checkbox label="8">
              {{$t('repair.Other')}}(
              <Input class="other" v-model="taikOther" type="textarea" :autosize="{minRows: 1 }" />)
            </Checkbox>
          </CheckboxGroup>
        </td>
        <td class="head-bg">{{$t("VoteMeeting.Principal1")}}</td>
        <td>
          <Input v-model="taikName" type="textarea" />
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("VoteMeeting.Nutritionist2")}}</td>
        <td colspan="4">
          <Input v-model="careManagerOntent" type="textarea" :autosize="{minRows: 2}" />
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t("VoteMeeting.assessment")}}</td>
        <td class="special">
          <CheckboxGroup v-model="careManagerAssess" @on-change="changeCareManagerAssess">
            <Checkbox label="1">{{$t('repair.Fall')}}</Checkbox>
            <Checkbox label="2">{{$t('repair.accidental')}}</Checkbox>
            <Checkbox label="3">{{$t('repair.Ingestion')}}</Checkbox>
            <Checkbox label="4">{{$t('repair.Leave')}}</Checkbox>
            <Checkbox label="5">{{$t('repair.Trouble')}}</Checkbox>
            <Checkbox label="6">{{$t('repair.ulcer')}}</Checkbox>
            <Checkbox label="7">{{$t('repair.Medicine')}}</Checkbox>
            <br />
            <Checkbox label="8">
              {{$t('repair.Other')}}(
              <Input
                class="other"
                v-model="careManagerOther"
                type="textarea"
                :autosize="{minRows: 1 }"
              />)
            </Checkbox>
          </CheckboxGroup>
        </td>
        <td class="head-bg">{{$t("VoteMeeting.Principal1")}}</td>
        <td>
          <Input v-model="careManagerName" type="textarea" />
        </td>
      </tr>

      <tr>
        <td class="head-bg">判定結果</td>
        <td colspan="4" style="position:relative">
          <DatePicker
            :editable="false"
            class="calendarFont"
            :value="determineDate"
            format="yyyy-MM-dd"
            type="date"
            :placeholder="$t('global.sele')"
            style="width: 100%"
            @on-change="determineDate =$event"
            @focus="this.blur()"
          ></DatePicker>
        </td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="2">退所の調整</td>
        <td class="special" colspan="4">
          <CheckboxGroup v-model="back" @on-change="changeCareManagerAssess">
            <Checkbox label="1">{{$t('JixuVoteMeeting.request')}}</Checkbox>
            <Checkbox label="2">{{$t('JixuVoteMeeting.meeting')}}</Checkbox>
            <Checkbox label="3">{{$t('JixuVoteMeeting.leaving')}}</Checkbox>
            <Checkbox label="4">{{$t('JixuVoteMeeting.renovation')}}</Checkbox>
            <Checkbox label="5">{{$t('JixuVoteMeeting.instruction')}}</Checkbox>
            <Checkbox label="6">{{$t('JixuVoteMeeting.guidance')}}</Checkbox>
            <Checkbox label="7">{{$t('JixuVoteMeeting.welfare')}}</Checkbox>
            <br />
            <Checkbox label="8">
              {{$t('repair.Other')}}(
              <Input class="other" v-model="backContent" type="textarea" :autosize="{minRows: 1 }" />)
            </Checkbox>
          </CheckboxGroup>
        </td>
      </tr>
      <tr>
        <td class="special" colspan="4">
          <div>特記事項</div>
          <Input
            style="text-align: left;"
            v-model="item"
            type="textarea"
            :autosize="{minRows: 2 }"
          />
        </td>
      </tr>
      <tr>
        <td class="head-bg">入所の継続</td>
        <td class="special" colspan="4">
          <div>目標（ケアマネ）</div>
          <Input
            style="text-align: left;"
            v-model="targetContent"
            type="textarea"
            :autosize="{minRows: 2 }"
          />
        </td>
      </tr>

      <tr>
        <td class="head-bg">{{$t("VoteMeeting.Degree")}}</td>
        <td colspan="3" style="white-space: nowrap;">
          介護度
          <RadioGroup v-model="careLevel" style="margin-left:0.5rem">
            <Radio label="1" @mouseup.native="handleRadioGroup('careLevel','1')">1</Radio>
            <Radio label="2" @mouseup.native="handleRadioGroup('careLevel','2')">2</Radio>
            <Radio label="3" @mouseup.native="handleRadioGroup('careLevel','3')">3</Radio>
            <Radio label="4" @mouseup.native="handleRadioGroup('careLevel','4')">4</Radio>
            <Radio label="5" @mouseup.native="handleRadioGroup('careLevel','5')">5</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="2">{{$t('JixuVoteMeeting.Talker2')}}</td>
        <td class="head-bg">{{$t("VoteMeeting.Independence")}}</td>
        <td class="head-bg" colspan="3">{{$t("VoteMeeting.IndependenceTwo")}}</td>
      </tr>
      <tr>
        <td style="background: #fff;">
          <RadioGroup v-model="disabled">
            <Radio label="1" @mouseup.native="handleRadioGroup('disabled','1')">J1</Radio>
            <Radio label="2" @mouseup.native="handleRadioGroup('disabled','2')">J2</Radio>
            <Radio label="3" @mouseup.native="handleRadioGroup('disabled','3')">A1</Radio>
            <Radio label="4" @mouseup.native="handleRadioGroup('disabled','4')">A2</Radio>
            <Radio label="5" @mouseup.native="handleRadioGroup('disabled','5')">B1</Radio>
            <Radio label="6" @mouseup.native="handleRadioGroup('disabled','6')">B2</Radio>
            <Radio label="7" @mouseup.native="handleRadioGroup('disabled','7')">C1</Radio>
            <Radio label="8" @mouseup.native="handleRadioGroup('disabled','8')">C2</Radio>
          </RadioGroup>
        </td>
        <td colspan="3">
          <RadioGroup v-model="cognitive">
            <Radio label="1" @mouseup.native="handleRadioGroup('cognitive','1')">Ⅰ</Radio>
            <Radio label="2" @mouseup.native="handleRadioGroup('cognitive','2')">Ⅱa</Radio>
            <Radio label="3" @mouseup.native="handleRadioGroup('cognitive','3')">Ⅱb</Radio>
            <Radio label="4" @mouseup.native="handleRadioGroup('cognitive','4')">Ⅲa</Radio>
            <Radio label="5" @mouseup.native="handleRadioGroup('cognitive','5')">Ⅲb</Radio>
            <Radio label="6" @mouseup.native="handleRadioGroup('cognitive','6')">Ⅳ</Radio>
            <Radio label="7" @mouseup.native="handleRadioGroup('cognitive','7')">M</Radio>
          </RadioGroup>
        </td>
      </tr>
    </table>
    <div class="table-submit">
      <!--<button @click="handleSave">
        <i class="iconfont icon-baocun"></i> {{$t('global.preservation')}}
      </button>-->
      <button @click="handleSubmit">
        <i class="iconfont icon-submit"></i>
        {{$t('global.submit')}}
      </button>
    </div>
  </div>
</template>

<script>
import { sendVoteMeet, getVoteMeet } from "../network/Sinyu";
import { getDateById } from "../network/kongHX";
import { format } from "../assets/utils/Tools";
export default {
  data() {
    return {
      oldInfo: {},
      userInfo: {},
      date: [],
      id: "",
      resident_name: "",
      age: "",
      physicianContent: "",
      physicianAssess: [],
      physicianName: "",
      physicianOther: "",
      recheckContent: "",
      recheckAssess: [],
      recheckName: "",
      recheckOther: "",
      careContent: "",
      careAssess: [],
      careName: "",
      careOther: "",
      nurseContent: "",
      nurseAssess: [],
      nurseName: "",
      nurseOther: "",
      dieticianContent: "",
      dieticianAssess: [],
      dieticianName: "",
      dieticianOther: "",
      taikContent: "",
      taikAssess: [],
      taikName: "",
      taikOther: "",
      careManagerOntent: "",
      careManagerAssess: [],
      determineDate: "",
      backContent: "",
      item: "",
      back: [],
      targetContent: "",
      careManagerName: "",
      careManagerOther: "",
      determineReason: "",
      determineResult: "1",
      careLevel: "",
      disabled: "",
      cognitive: "",
      dblclickNum: "",
      occurrenceYear: format(new Date(), "YYYY"),
      occurrenceDay: "",
      occurrenceDayList: [],
      modifyDay: "",
      createDate: "",
      year: ""
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.date = format(this.time).split("-");
    this.oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    this.resident_name = this.oldInfo.name;
    this.age = this.oldInfo.age;

    this.year = JSON.stringify(new Date().getFullYear());
    this.getDetaList();
  },
  methods: {
    //获取生成日列表
    async getDetaList() {
      try {
        const res = await getDateById({
          oldManId: this.oldInfo.oldId,
          year: this.year,
          type: 6
        });
        if (res.code === 0) {
          if (res.data.length) {
            this.occurrenceDayList = res.data;
            this.occurrenceDay = res.data[0].date;
            this.modifyDay = res.data[0].date;
            this.createDate = res.data[0].date;
            this.month = res.data[0].date.substring(5, 7);
            this._getVoteMeet();
          } else {
            this.occurrenceDayList = res.data;
            this.modifyDay = format(new Date(), "YYYY-MM-DD");
            this.createDate = format(new Date(), "YYYY-MM-DD");
            this.occurrenceDay = "";
            this._getVoteMeet();
          }
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
    //根据生成日切换表格
    changTable(e) {
      if (e) {
        this.createDate = e;
        this.modifyDay = e;
        this.month = this.modifyDay.substring(5, 7);
        this._getVoteMeet();
      }
    },
    //修改生成日
    changDay(e) {
      if (e) {
        this.modifyDay = e;
        this.month = this.modifyDay.substring(5, 7);
        this.createDate = e;
        this._getVoteMeet();
      }
    },
    //切换年份
    changYear(e) {
      this.year = e;
      this.occurrenceYear = e;
      this.getDetaList();
    },
    // 医师负责人
    changePhysicianName() {
      if (this.physicianAssess.length) {
        this.physicianName = this.userInfo.userName;
      } else {
        this.physicianName = [];
      }
    },
    //复检负责人
    changeRecheckName() {
      if (this.recheckAssess.length) {
        this.recheckName = this.userInfo.userName;
      } else {
        this.recheckName = [];
      }
    },
    //看护负责人
    changeCareName() {
      if (this.careAssess.length) {
        this.careName = this.userInfo.userName;
      } else {
        this.careName = [];
      }
    },
    //看护负责人
    changeNurseName() {
      if (this.nurseAssess.length) {
        this.nurseName = this.userInfo.userName;
      } else {
        this.nurseName = [];
      }
    },
    //营养师负责人
    changeDieticianName() {
      if (this.dieticianAssess.length) {
        this.dieticianName = this.userInfo.userName;
      } else {
        this.dieticianName = [];
      }
    },
    //相谈员负责人
    changeTaikAssess() {
      if (this.taikAssess.length) {
        this.taikName = this.userInfo.userName;
      } else {
        this.taikName = [];
      }
    },
    //护理经理负责人
    changeCareManagerAssess() {
      if (this.careManagerAssess.length) {
        this.careManagerName = this.userInfo.userName;
      } else {
        this.careManagerName = [];
      }
    },
    handleSave() {},
    //处理选择单选框(取消选择)
    handleRadioGroup(type, value) {
      if (this[type] == value) {
        setTimeout(() => {
          this[type] = "";
        }, 10);
      }
    },
    handleSubmit() {
      let data = {
        oldManId: this.oldInfo.oldId,
        type: 6,
        year: this.createDate.substring(0, 4)
      };
      getDateById(data).then(res => {
        if (res.code == 0) {
          let result = true; //默认该生成日为添加
          if (res.data.length) {
            for (let i = 0; i < res.data.length; i++) {
              if (this.createDate === res.data[i].date) {
                //该生成日的年份里有该数据，修改该日期的
                result = false;
              }
            }
          } else {
            //该生成日的年份里没有数据，添加该日期的
            result = true;
          }
          //判断是修改还是添加
          if (result) {
            this.id = "";
            this.ebitOrAdd();
          } else {
            this.ebitOrAdd();
          }
        }
      });
    },
    ebitOrAdd() {
      try {
        const data = {
          age: this.age,
          careAssess: this.careAssess.join(","), //    看护的风险评估
          careContent: this.careContent, //   看护评级内容
          careId: this.userInfo.adminId, //   看护id
          careName: this.careName, //   看护名称
          careOther: this.careOther, //   看护的其他描述
          careLevel: parseInt(this.careLevel), //   护理程度
          careManagerAssess: this.careManagerAssess.join(","), //    护理经理的风险评估
          back: this.back.join(","), //    退所の調整
          targetContent: this.targetContent,
          determineDate: this.determineDate,
          backContent: this.backContent,
          item: this.item,
          careManagerId: this.userInfo.adminId, // 护理经理id
          careManagerName: this.careManagerName, //  护理经理名字
          careManagerOntent: this.careManagerOntent, //   护理经理评价内容
          careManagerOther: this.careManagerOther, //   护理经理的其他描述
          nurseAssess: this.nurseAssess.join(","), //    介护的风险评估
          nurseId: this.userInfo.adminId, // 介护id
          nurseName: this.nurseName, //  介护名字
          nurseContent: this.nurseContent, //   介护评价内容
          nurseOther: this.nurseOther, //   介护的其他描述
          cognitive: this.cognitive, //    认知症老人日常生活的独立度
          determineReason: this.determineReason, //  判定理由
          determineResult: parseInt(this.determineResult), //  判定结果
          dieticianAssess: this.dieticianAssess.join(","), //  营养师的风险评估
          dieticianContent: this.dieticianContent, //   营养师评价内容
          dieticianId: this.userInfo.adminId, // 营养师id
          dieticianName: this.dieticianName, //  营养师名字
          dieticianOther: this.dieticianOther, //  营养师的其他
          disabled: parseInt(this.disabled), //   残疾老人日常生活的独立度
          id: this.id, //   入所判定表，新增时不需要填写
          oldId: this.oldInfo.oldId,
          oldName: this.resident_name,
          physicianAssess: this.physicianAssess.join(","), //   医师的风险评估
          physicianContent: this.physicianContent, //     医师评级内容
          physicianId: this.userInfo.adminId, //医师id
          physicianName: this.physicianName, //   医师名称
          physicianOther: this.physicianOther, //   医师的其他描述
          recheckAssess: this.recheckAssess.join(","), //   复检的风险评估
          recheckContent: this.recheckContent, //   复检评级内容
          recheckId: this.userInfo.adminId, //    复检id
          recheckName: this.recheckName, //   复检名称
          recheckOther: this.recheckOther, //   复检名称
          // recordDate: `${this.date[0]}-${this.date[1]}-${this.date[2]}`,
          recordDate: this.createDate,
          taikAssess: this.taikAssess.join(","), //    相谈员的风险评估
          taikContent: this.taikContent, //    相谈员评价内容
          taikId: this.userInfo.adminId, //    相谈员id
          taikName: this.taikName, //    相谈员名字
          taikOther: this.taikOther, //    相谈员名字
          type: 2 //表的类型
        };
        this.$Modal.confirm({
          title: this.$t("global.reminder"),
          content: this.$t("global.submitInfo"),
          okText: this.$t("global.sure"),
          cancelText: this.$t("global.cancel"),
          onOk: async () => {
            const res = await sendVoteMeet(data);
            if (res.code === 0) {
              this.$Notice.success({
                title: this.$t("global.operationSuccess"),
                duration: 2
              });
              this.getDetaList();
            } else if (res.code === 415) {
              this.$Notice.error({
                title: this.$t("global.operationFail"),
                desc: this.$t("global.claim")
              });
            } else {
              this.$Notice.error({
                title: this.$t("global.operationFail"),
                duration: 2
              });
            }
          }
        });
      } catch (err) {
        this.$Notice.error({
          title: this.$t("global.operationFail"),
          duration: 2
        });
        console.log(err);
      }
    },
    //         网络请求        //
    async _getVoteMeet() {
      const data = {
        id: this.oldInfo.oldId,
        type: 2,
        date: this.createDate
      };
      const res = await getVoteMeet(data);
      if (res.code === 0 && res.data) {
        this.physicianContent = res.data.physicianContent;
        this.physicianAssess = res.data.physicianAssess.split(",");
        this.physicianName = res.data.physicianName;
        this.physicianOther = res.data.physicianOther;
        this.recheckContent = res.data.recheckContent;
        this.recheckAssess = res.data.recheckAssess.split(",");
        this.recheckName = res.data.recheckName;
        this.recheckOther = res.data.recheckOther;
        this.careContent = res.data.careContent;
        this.careAssess = res.data.careAssess.split(",");
        this.careName = res.data.careName;
        this.careOther = res.data.careOther;
        this.dieticianContent = res.data.dieticianContent;
        this.dieticianAssess = res.data.dieticianAssess.split(",");
        this.dieticianName = res.data.dieticianName;
        this.dieticianOther = res.data.dieticianOther;
        this.taikContent = res.data.taikContent;
        this.taikAssess = res.data.taikAssess.split(",");
        this.taikName = res.data.taikName;
        this.taikOther = res.data.taikOther;
        this.careManagerOntent = res.data.careManagerOntent;
        this.careManagerAssess = res.data.careManagerAssess.split(",");
        this.back = res.data.back ? res.data.back.split(",") : [];
        this.targetContent = res.data.targetContent;
        this.determineDate = res.data.determineDate;
        this.backContent = res.data.backContent;
        this.item = res.data.item;
        this.careManagerName = res.data.careManagerName;
        this.careManagerOther = res.data.careManagerOther;
        this.nurseContent = res.data.nurseContent;
        this.nurseAssess = res.data.nurseAssess.split(",");
        this.nurseName = res.data.nurseName;
        this.nurseOther = res.data.nurseOther;
        this.determineReason = res.data.determineReason;
        this.determineResult = res.data.determineResult
          ? res.data.determineResult.toString()
          : "";
        this.careLevel = res.data.careLevel
          ? res.data.careLevel.toString()
          : "";
        this.disabled = res.data.disabled ? res.data.disabled.toString() : "";
        this.cognitive = res.data.cognitive
          ? res.data.cognitive.toString()
          : "";
        (this.id = res.data.id),
          (this.date = (res.data.recordDate || "0000-00-00").split("-"));
      }
    }
  }
};
</script>

<style lang="less" scoped>
#vote-meeting {
  font-size: 0.14rem /* 14/102 */;
  text-align: left;

  .meeting-title {
    text-align: left;
    font-size: 0.18rem /* 18/102 */;
    line-height: 0.55rem /* 56/102 */;
    padding: 0 0.26rem /* 27/102 */;
    // background: linear-gradient(90deg, #63af1e, #63af1e, #fff);
    color: #fff;
    margin: 0.25rem /* 25/102 */ 0;
  }

  .meeting-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.1rem /* 10/102 */;

    input {
      width: 0.39rem /* 40/102 */;
      border: 0;
      outline: none;
      text-align: right;
    }

    .selectBox {
      width: 50%;
      padding: 0;
    }

    .header-age,
    .modifyDay {
      padding-left: 0.5rem;
    }
  }

  .meeting-table {
    width: 100%;
    text-align: center;
    background: #fff;
    line-height: 0.39rem /* 40/102 */;
    // border-color: var(--table-bg);
    border-color: #c4e8bf;
    border-radius: 5px;
    overflow: hidden;

    td {
      vertical-align: middle;

      &.head-bg {
        white-space: nowrap;
      }

      &.special {
        line-height: 0.2rem /* 20/102 */;
        text-align: left;
        white-space: normal;

        .other {
          width: 2rem;
          height: 100%;
          text-align: left;
        }
      }
    }

    label {
      margin-right: 0.34rem /* 35/102 */;

      input {
        margin-left: 0.05rem /* 5/102 */;
        margin-right: 0.03rem /* 3/102 */;
      }
    }

    input[type="text"] {
      width: 100%;
      border: 0;
      outline: none;
    }

    textarea {
      width: 100%;
      height: 0.69rem /* 70/102 */;
      resize: none;
      border: 0;
      outline: none;
      line-height: 0.2rem /* 20/102 */;
      color: #333;
    }

    .center {
      line-height: 0.39rem /* 40/102 */;
    }
  }

  // .meeting-table end
}

// vote-meeting end
</style>
