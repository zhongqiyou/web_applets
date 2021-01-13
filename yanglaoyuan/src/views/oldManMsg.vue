<template>
  <div class="old_man_msg">
    <div class="head_tab">
      <div
        class="item"
        :class="tabIndex == index ? 'active' : ''"
        v-for="(item, index) in tabList"
        :key="index"
        @click="changeTab(index)"
      >
        {{ $t(item) }}
      </div>
    </div>
    <div v-if="tabIndex == 0">
      <div class="trip-title">{{ $t("oldManMsg.Information.title") }}</div>
      <div class="flex title">
        <span>{{ $t("oldManMsg.Information.zcDate") }}:</span>
        <div style="width: 1.2rem;">{{ baseInfo.createTime.substring(0,10) }}</div>
      </div>
      <div class="flex title">
        <span>{{ $t("oldManMsg.Information.zcName") }}:</span>
        <div style="width: 1.2rem;">
          {{
            baseInfo.recordUser && lang == "ja"
              ? baseInfo.recordUser + $t("global.honorific")
              : baseInfo.recordUser
          }}
        </div>
      </div>
      <table
        class="table new-table"
        cellspacing="0"
        cellpadding="0"
        border="1"
        width="100%"
      >
        <tr>
          <td class="head-bg" colspan="2">ID：</td>
          <!-- <td style="font-size: 0.14rem;" colspan="4"><Input  type="textarea" v-model="baseInfo.id" class="dome" /></td> -->
          <td style="font-size: 0.14rem;" colspan="4">
            <Input :disabled="changeId" v-model="numbering" />
          </td>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.entrance") }}<span class="required">*</span>
          </td>
          <td colspan="3">
            <RadioGroup v-model="baseInfo.checkInType">
              <Radio label="1">{{
                $t("oldManMsg.Information.entrance1")
              }}</Radio>
              <Radio label="2">{{
                $t("oldManMsg.Information.entrance2")
              }}</Radio>
            </RadioGroup>
          </td>
          <td
            class="head-bg"
            style="white-space:nowrap;word-wrap:normal"
          >
            {{ $t("oldManMsg.Information.careful1") }}
          </td>
          <td>
            <RadioGroup v-model="baseInfo.attention">
              <Radio
                label="1"
                @mouseup.native="handleAttention('baseInfo.attention')"
                >{{ $t("oldManMsg.Information.careful") }}</Radio
              >
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.day") }}<span class="required">*</span>
          </td>
          <td colspan="4">
            <!-- <Input v-model="baseInfo.checkinDate" /> -->
            <div class="cell">
              <DatePicker
                :editable="false"
                class="calendarFont"
                :value="baseInfo.checkinDate"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="baseInfo.checkinDate = $event"
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.Withdrawal") }}
          </td>
          <td colspan="3">
            <div class="cell">
              <DatePicker
                :editable="false"
                class="calendarFont"
                :value="baseInfo.checkoutDate"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="baseInfo.checkoutDate = $event"
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
          <td class="head-bg" style="white-space:nowrap">{{ $t("oldManMsg.Information.Donate") }}<span class="required">*</span></td>
          <td>
            <div class="cell">
              <Select v-model="baseInfo.take" :placeholder="$t('global.sele')">
                <Option
                  v-for="item in takeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ $t(item.label) }}</Option
                >
              </Select>
            </div>
          </td>
        </tr>
        <tr>
          <td
            class="head-bg"
            colspan="2"
            style="white-space:pre-line;word-wrap: break-word;word-break: break-all;"
          >
            {{ $t("oldManMsg.Information.nulevel") }}<span class="required">*</span>
          </td>
          <td colspan="4">
            <i-select
              v-model="baseInfo.level"
              style="width:100%;"
              placeholder="please choose"
              size="large"
            >
              <i-option
                v-for="(item, index) in nursingLevelList"
                :key="index"
                :value="item.id"
                >{{ $t(item.value) }}</i-option
              >
            </i-select>
          </td>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.grade") }}<span class="required">*</span>
          </td>
          <td colspan="5">
            <i-select
              v-model="baseInfo.foodLevel"
              style="width:100%;"
              placeholder="please choose"
              size="large"
            >
              <i-option
                v-for="(item, index) in foodLevelList"
                :key="index"
                :value="item.id"
                >{{ $t(item.value) }}</i-option
              >
            </i-select>
          </td>
        </tr>

        <tr>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.Name1") }}
          </td>
          <td colspan="4">
            <div class="cell">
              <Input
                type="textarea"
                autosize
                v-model="baseInfo.nikeName"
                class="dome"
                style="min-width:100%;display: block;"
              />
            </div>
          </td>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.Date")
            }}<span class="required">*</span>
          </td>
          <td colspan="3">
            <div class>
              <!-- <Input type="textarea" autosize v-model="baseInfo.birthday" /> -->
              <div class="cell">
                <DatePicker
                  :editable="false"
                  class="calendarFont"
                  :value="baseInfo.birthday"
                  format="yyyy-MM-dd"
                  type="date"
                  :placeholder="$t('global.sele')"
                  style="width: 100%"
                  @on-change="
                    baseInfo.birthday = $event;
                    handleSeleBir();
                  "
                  @focus="this.blur()"
                ></DatePicker>
              </div>
            </div>
          </td>
          <td class="head-bg">{{ $t("oldManMsg.Information.age") }}</td>
          <td>
            <!-- <div class="cell">
            <Input v-model="baseInfo.age" />
          </div> -->
            {{ baseInfo.age }}
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.Name2")
            }}<span class="required">*</span>
          </td>
          <td colspan="4">
            <div class="cell">
              <Input
                type="textarea"
                autosize
                v-model="baseInfo.name"
                class="dome"
                style="min-width:100%;display: block;"
              />
            </div>
          </td>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.Residential") }}
          </td>
          <td colspan="3">
            <div class="cell">
              <Input
                type="textarea"
                autosize
                v-model="baseInfo.phoneCell"
                maxlength="15"
              />
            </div>
          </td>
          <td
            class="head-bg"
            style="white-space:pre-line;word-wrap: break-word;word-break: break-all;"
          >
            {{ $t("oldManMsg.Information.post") }}
          </td>
          <td>
            <div class="cell">
              <Input
                @on-change="getPostalCode($event)"
                type="textarea"
                autosize
                v-model="baseInfo.postalCode"
                maxlength="7"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" style="white-space:nowrap" colspan="2">
            {{ $t("oldManMsg.Information.gender") }}<span class="required">*</span>
          </td>
          <td style="white-space:nowrap" colspan="4">
            <div class="cell">
              <RadioGroup v-model="baseInfo.sex" @on-change="handleIfSex">
                <Radio label="1">{{ $t("oldManMsg.Information.male") }}</Radio>
                <Radio label="2">{{
                  $t("oldManMsg.Information.female")
                }}</Radio>
              </RadioGroup>
            </div>
          </td>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.Cell") }}
          </td>
          <td colspan="3">
            <div class="cell">
              <Input
                type="textarea"
                autosize
                v-model="baseInfo.phonePike"
                maxlength="15"
              />
            </div>
          </td>
          <td style="white-space: nowrap;" class="head-bg">
            {{ $t("oldManMsg.Information.residence") }}
          </td>
          <td>
            <div class="cell">
              <Input type="textarea" autosize v-model="baseInfo.dom" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.CPR") }}
          </td>
          <td colspan="4">
            <div class="cell">
              <Input type="textarea" autosize v-model="baseInfo.cpr" />
            </div>
          </td>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.Emergency2") }}
          </td>
          <td colspan="5">
            <div class="cell" style="display: flex;align-items: center;">
              ①
              <Input type="textarea" autosize v-model="baseInfo.hospital1" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.Emergency") }}
          </td>
          <td colspan="4">
            <div class="cell">
              <Input type="textarea" autosize v-model="baseInfo.rush" />
            </div>
          </td>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.Emergency3") }}
          </td>
          <td colspan="5">
            <div class="cell" style="display: flex;align-items: center;">
              ②
              <Input type="textarea" autosize v-model="baseInfo.hospital2" />
            </div>
          </td>
        </tr>

        <!--
          <tr>
            <td class="head-bg" colspan="2" rowspan="3">{{$t("oldManMsg.Information.Emergency4")}}1</td>
            <td class="head-bg" colspan="2">{{$t("oldManMsg.Information.Name2")}}</td>
            <td colspan="3">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.emergencyName1" />
              </div>
            </td>
            <td class="head-bg" colspan="1" rowspan="3">{{$t("oldManMsg.Information.relationship")}}</td>
            <td colspan="1">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.emergencyRelation1.d1" />
              </div>
            </td>
            <td class="head-bg" colspan="1" rowspan="3">{{$t("oldManMsg.Information.phone")}}</td>
            <td class="head-bg" colspan="1">{{$t("oldManMsg.Information.Residential")}}</td>
            <td colspan="2" rowspan="1">
              <div class="cell">
                <Input type="textarea" autosize maxlength="15" v-model="baseInfo.emergencyTel1" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="head-bg" colspan="2">{{$t("oldManMsg.Information.residence")}}</td>
            <td colspan="3">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.emergencyDom1" />
              </div>
            </td>
            <td colspan="1">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.emergencyRelation1.d2" />
              </div>
            </td>
            <td class="head-bg" colspan="1">{{$t("oldManMsg.Information.Cell")}}</td>
            <td colspan="2">
              <div class="cell">
                <Input maxlength="15" v-model="baseInfo.emergencyPhone1" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="head-bg" colspan="2">{{$t("oldManMsg.Information.work")}}</td>
            <td colspan="3">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.emergencyAddress1" />
              </div>
            </td>
            <td colspan="1">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.emergencyRelation1.d3" />
              </div>
            </td>
            <td class="head-bg" colspan="1">{{$t("oldManMsg.Information.unit")}}</td>
            <td colspan="2">
              <div class="cell">
                <Input type="textarea" autosize maxlength="15" v-model="baseInfo.emergencyOffice1" />
              </div>
            </td>
          </tr>

          <tr>
            <td class="head-bg" colspan="2" rowspan="3">{{$t("oldManMsg.Information.Emergency4")}}2</td>
            <td class="head-bg" colspan="2">{{$t("oldManMsg.Information.Name2")}}</td>
            <td colspan="3">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.emergencyName2" />
              </div>
            </td>
            <td class="head-bg" colspan="1" rowspan="3">{{$t("oldManMsg.Information.relationship")}}</td>
            <td colspan="1">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.emergencyRelation2.d1" />
              </div>
            </td>
            <td class="head-bg" colspan="1" rowspan="3">{{$t("oldManMsg.Information.phone")}}</td>
            <td class="head-bg" colspan="1">{{$t("oldManMsg.Information.Residential")}}</td>
            <td colspan="2" rowspan="1">
              <div class="cell">
                <Input type="textarea" autosize maxlength="15" v-model="baseInfo.emergencyTel2" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="head-bg" colspan="2">{{$t("oldManMsg.Information.residence")}}</td>
            <td colspan="3">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.emergencyDom2" />
              </div>
            </td>
            <td colspan="1">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.emergencyRelation2.d2" />
              </div>
            </td>
            <td class="head-bg" colspan="1">{{$t("oldManMsg.Information.Cell")}}</td>
            <td colspan="2">
              <div class="cell">
                <Input type="textarea" autosize maxlength="15" v-model="baseInfo.emergencyPhone2" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="head-bg" colspan="2">{{$t("oldManMsg.Information.work")}}</td>
            <td colspan="3">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.emergencyAddress2" />
              </div>
            </td>
            <td colspan="1">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.emergencyRelation2.d3" />
              </div>
            </td>
            <td class="head-bg" colspan="1">{{$t("oldManMsg.Information.unit")}}</td>
            <td colspan="2">
              <div class="cell">
                <Input type="textarea" autosize maxlength="15" v-model="baseInfo.emergencyOffice2" />
              </div>
            </td>
          </tr>
  -->
        <tr>
          <td class="head-bg" colspan="2" rowspan="2">
            {{ $t("oldManMsg.Information.Injury") }}
          </td>
          <td colspan="11">
            <div class="cell">
              <Input v-model="baseInfo.injury.d1" />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="11">
            <div class="cell">
              <Input v-model="baseInfo.injury.d2" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="7">
            {{ $t("oldManMsg.Information.Before") }}
          </td>
          <td class="head-bg" colspan="6" @click="handleAddHistory">
            {{ $t("oldManMsg.Information.Past") }}
          </td>
        </tr>
        <tr v-for="(item, index) in baseInfo.previousHistory1" :key="index">
          <td
            colspan="7"
            :rowspan="baseInfo.previousHistory1.length"
            v-if="index === 0"
          >
            <div class="cell alignLeft">
              <Input
                type="textarea"
                autosize
                :rows="4"
                v-model="baseInfo.experienceBefore1"
              />
            </div>
          </td>
          <td colspan="2" style="border-right: 0; min-width: 2.5rem;">
            <Input
              type="textarea"
              autosize
              :rows="4"
              v-model="baseInfo.previousHistory1[index][0]"
            />
          </td>
          <td colspan="4">
            <Input
              type="textarea"
              autosize
              :rows="4"
              v-model="baseInfo.previousHistory1[index][1]"
            />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="5">
            {{ $t("oldManMsg.Information.familyStructure") }}
          </td>
          <td class="head-bg" colspan="3">
            {{ $t("oldManMsg.Information.hobby") }}
          </td>
          <td class="head-bg" colspan="5">
            {{ $t("oldManMsg.Information.lifeHistory") }}
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <div class="cell">
              <img
                v-show="baseInfo.relationPic"
                style="width: 2.5rem"
                @click="isRelative = true"
                :src="baseUrl + baseInfo.relationPic"
              />
            </div>
            <div
              v-show="isRelative"
              class="cell-popup"
              @click="isRelative = false"
            >
              <div class="img">
                <img
                  v-show="baseInfo.relationPic"
                  :src="baseUrl + baseInfo.relationPic"
                />
              </div>
            </div>
          </td>
          <td colspan="3">
            <div class="cell">
              <Input
                type="textarea"
                autosize
                :rows="4"
                v-model="baseInfo.interests"
              />
            </div>
          </td>
          <td colspan="5">
            <div class="cell alignLeft">
              <Input
                type="textarea"
                autosize
                :rows="4"
                v-model="baseInfo.previousHistory2"
              />
            </div>
          </td>
        </tr>
        <!-- <tr>
            <td class="head-bg" colspan="2">{{$t("oldManMsg.Information.Infectious")}}</td>
            <td colspan="11">
              <RadioGroup v-model="baseInfo.infection">
                <Radio label="1">{{$t("oldManMsg.Information.HBS")}}</Radio>
                <Radio label="2">HCV</Radio>
                <Radio label="3">TPHA</Radio>
                <Radio label="4">TB</Radio>
              </RadioGroup>
            </td>
          </tr>
          <tr>
            <td class="head-bg" colspan="2">{{$t("oldManMsg.Information.allergen")}}</td>
            <td colspan="11">
              <RadioGroup v-model="baseInfo.allergic">
                <Radio label="1">{{$t("oldManMsg.Information.food")}}</Radio>
                <Radio label="2">{{$t("oldManMsg.Information.drug")}}</Radio>
                <Radio label="3">{{$t("oldManMsg.Information.other")}}</Radio>
              </RadioGroup>
            </td>
          </tr>
          <tr>
            <td class="head-bg" colspan="2" rowspan="2">{{$t("oldManMsg.Information.private")}}1</td>
            <td class="head-bg" colspan="2">{{$t("oldManMsg.Information.medical")}}</td>
            <td colspan="3">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.doctors1Conpany" />
              </div>
            </td>
            <td class="head-bg" colspan="1" rowspan="2">{{$t("oldManMsg.Information.Injury")}}</td>
            <td colspan="1" rowspan="2">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.doctors1Injury" />
              </div>
            </td>
            <td class="head-bg" colspan="1" rowspan="2">{{$t("oldManMsg.Information.phone")}}</td>
            <td colspan="3" rowspan="2">
              <div class="cell">
                <Input maxlength="15" v-model="baseInfo.doctors1Phone" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="head-bg" colspan="2">{{$t("oldManMsg.Information.Doctor")}}</td>
            <td colspan="3">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.doctors1Name" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="head-bg" colspan="2" rowspan="2">{{$t("oldManMsg.Information.private")}}2</td>
            <td class="head-bg" colspan="2">{{$t("oldManMsg.Information.medical")}}</td>
            <td colspan="3">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.doctors2Conpany" />
              </div>
            </td>
            <td class="head-bg" colspan="1" rowspan="2">{{$t("oldManMsg.Information.Injury")}}</td>
            <td colspan="1" rowspan="2">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.doctors2Injury" />
              </div>
            </td>
            <td class="head-bg" colspan="1" rowspan="2">{{$t("oldManMsg.Information.phone")}}</td>
            <td colspan="3" rowspan="2">
              <div class="cell">
                <Input maxlength="15" v-model="baseInfo.doctors2Phone" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="head-bg" colspan="2">{{$t("oldManMsg.Information.Doctor")}}</td>
            <td colspan="3">
              <div class="cell">
                <Input type="textarea" autosize v-model="baseInfo.doctors2Name" />
              </div>
            </td>
          </tr> -->
        <tr>
          <td class="head-bg" colspan="2" rowspan="2">
            {{ $t("oldManMsg.Information.Nursing0") }}
          </td>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.company") }}
          </td>
          <td colspan="5">
            <div class="cell">
              <Input
                type="textarea"
                autosize
                v-model="baseInfo.managerConpany"
              />
            </div>
          </td>
          <td class="head-bg" colspan="1" rowspan="2">
            {{ $t("oldManMsg.Information.phone") }}
          </td>
          <td colspan="3" rowspan="2">
            <div class="cell">
              <Input maxlength="15" v-model="baseInfo.managerPhone" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.principal") }}
          </td>
          <td colspan="5">
            <div class="cell">
              <Input type="textarea" autosize v-model="baseInfo.managerName" />
            </div>
          </td>
        </tr>
        <tr>
          <td
            class="head-bg"
            colspan="2"
            rowspan="4"
            style="white-space:pre-line;word-wrap: break-word;word-break: break-all;"
          >
            {{ $t("oldManMsg.Information.Nursing") }}
          </td>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.company") }}
          </td>
          <td colspan="5">
            <div class="cell">
              <Input
                type="textarea"
                autosize
                :rows="2"
                v-model="baseInfo.insurance1Company"
              />
            </div>
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Information.Frequency") }}
          </td>
          <td colspan="3">
            <div class="cell">
              <Input
                type="textarea"
                autosize
                :rows="2"
                v-model="baseInfo.insurance1Frequency"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.company") }}
          </td>
          <td colspan="5">
            <div class="cell">
              <Input
                type="textarea"
                autosize
                :rows="2"
                v-model="baseInfo.insurance2Company"
              />
            </div>
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Information.Frequency") }}
          </td>
          <td colspan="3">
            <div class="cell">
              <Input
                type="textarea"
                autosize
                :rows="2"
                v-model="baseInfo.insurance2Frequency"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.company") }}
          </td>
          <td colspan="5">
            <div class="cell">
              <Input
                type="textarea"
                autosize
                :rows="2"
                v-model="baseInfo.insurance3Company"
              />
            </div>
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Information.Frequency") }}
          </td>
          <td colspan="3">
            <div class="cell">
              <Input
                type="textarea"
                autosize
                :rows="2"
                v-model="baseInfo.insurance3Frequency"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.company") }}
          </td>
          <td colspan="5">
            <div class="cell">
              <Input
                type="textarea"
                autosize
                :rows="2"
                v-model="baseInfo.insurance4Company"
              />
            </div>
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Information.Frequency") }}
          </td>
          <td colspan="3">
            <div class="cell">
              <Input
                type="textarea"
                autosize
                :rows="2"
                v-model="baseInfo.insurance4Frequency"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.Information.liveL") }}
          </td>
          <td colspan="11">
            <div class="flex">
              <div class="cell">
                <!--<Input
                    type="textarea"
                    :rows="2"
                    v-model="baseInfo.situation"
                    placeholder="填写独居或者其他居住情况"
                  />-->
                <RadioGroup v-model="baseInfo.situation">
                  <Radio
                    label="1"
                    @mouseup.native="
                      handleRadioGroup('baseInfo.situation', '1')
                    "
                    >{{ $t("oldManMsg.Information.houseHold") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="
                      handleRadioGroup('baseInfo.situation', '2')
                    "
                  >
                    {{ $t("oldManMsg.Information.collective") }}(
                    <Input
                      style="width: 2rem"
                      v-model="baseInfo.collectiveHousing"
                      type="textarea"
                      autosize
                    />)
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td
            class="head-bg"
            colspan="2"
            style="white-space:pre-line;word-wrap: break-word;word-break: break-all;"
          >
            {{ $t("oldManMsg.Information.Assistance") }}
          </td>
          <td colspan="11">
            <div class="flex" style="text-align: left">
              <div class="cell break">
                <!-- <Input type="textarea" :rows="2" v-model="baseInfo.aid" placeholder="填写被援助的范式" /> -->
                <RadioGroup v-model="baseInfo.aid">
                  <Radio
                    label="1"
                    @mouseup.native="handleRadioGroup('baseInfo.aid', '1')"
                    >{{ $t("oldManMsg.Information.support_per") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleRadioGroup('baseInfo.aid', '2')"
                  >
                    {{ $t("oldManMsg.Information.volunteer") }}(
                    <Input
                      type="textarea"
                      autosize
                      style="width: .7rem"
                      v-model="baseInfo.volunteers"
                    />)
                  </Radio>
                  <Radio
                    label="3"
                    @mouseup.native="handleRadioGroup('baseInfo.aid', '3')"
                    >{{ $t("oldManMsg.Information.committee") }}</Radio
                  >
                  <Radio
                    label="4"
                    @mouseup.native="handleRadioGroup('baseInfo.aid', '4')"
                  >
                    {{ $t("oldManMsg.Information.autonomous") }}(
                    <Input
                      type="textarea"
                      autosize
                      style="width: .7rem"
                      v-model="baseInfo.autonomous"
                    />)
                  </Radio>
                  <Radio
                    label="5"
                    @mouseup.native="handleRadioGroup('baseInfo.aid', '5')"
                  >
                    {{ $t("global.other") }}(
                    <Input
                      type="textarea"
                      autosize
                      style="width: .7rem"
                      v-model="baseInfo.other"
                    />)
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </td>
        </tr>
      </table>

      <div class="chart-button">
        <button @click="handleAddRelev">
          {{ $t("oldManMsg.Information.addRelev") }}
        </button>
      </div>
      <Modal
        class="chart-relev"
        v-model="isAddRelev"
        :title="$t('oldManMsg.Information.inputCont')"
        @on-ok="handleSubmitRelev"
        width="300"
        @on-cancel="onClose"
        :ok-text="$t('global.sure')"
        :cancel-text="$t('global.cancel')"
      >
        <div class="relev-item">
          <label>
            <input type="radio" value="1" v-model="inputRelev.sex" />
            {{ $t("oldManMsg.Information.male") }}
          </label>
          <label>
            <input type="radio" value="2" v-model="inputRelev.sex" />
            {{ $t("oldManMsg.Information.female") }}
          </label>
        </div>
        <div class="relev-item">
          <label>
            <input type="radio" value="1" v-model="inputRelev.dying" />
            {{ $t("oldManMsg.Information.undead") }}
          </label>
          <label>
            <input type="radio" value="2" v-model="inputRelev.dying" />
            {{ $t("oldManMsg.Information.passedAway") }}
          </label>
        </div>
      </Modal>
      <div class="chart" v-show="chartData.id" id="capture">
        <tree-chart
          :json="chartData"
          @click-node="handleClickNode"
        ></tree-chart>
      </div>

      <Modal v-model="seleAdd" width="360">
        <p slot="header" style="text-align:center">
          <span>{{ $t("global.handleSele") }}</span>
        </p>
        <div style="text-align:center">
          <Button
            v-show="isSpouse !== 'spouse'"
            type="primary"
            long
            class="handle-button"
            @click="handleSeleNode('添加配偶')"
            >{{ $t("oldManMsg.Information.addRelev") }}</Button
          >
          <Button
            v-show="isSpouse !== 'spouse'"
            type="primary"
            long
            class="handle-button"
            @click="handleSeleNode('添加关系')"
            >{{ $t("oldManMsg.Information.addMate") }}</Button
          >
          <Button
            type="primary"
            long
            class="handle-button"
            @click="handleSeleNode('修改内容')"
            >{{ $t("oldManMsg.Information.changeCont") }}</Button
          >
          <Button
            v-show="isSpouse !== 'spouse'"
            type="primary"
            long
            class="handle-button"
            @click="handleSeleNode('删除内容')"
            >{{ $t("oldManMsg.Information.deleCont") }}</Button
          >
        </div>
        <div slot="footer"></div>
      </Modal>

      <div class="photos">
        <div class="item">
          <div
            class="placeholder_block"
            :style="{
              backgroundImage: 'url(' + baseUrl + baseInfo.picture + ')'
            }"
          ></div>
          <div class="lable">{{ $t("oldManMsg.Information.photo") }}</div>
          <Upload
            class="upload"
            :action="uploadAdd"
            :on-success="handleUploadPhoto"
            data-type="photos"
          >
            <Button icon="ios-cloud-upload-outline"></Button>
          </Upload>
        </div>
        <div class="item">
          <div
            class="placeholder_block"
            :style="{
              backgroundImage: 'url(' + baseUrl + baseInfo.photoId + ')'
            }"
          ></div>
          <div class="lable">{{ $t("oldManMsg.Information.ID") }}</div>
          <Upload
            class="upload"
            :action="uploadAdd"
            :on-success="handleUploadID"
            data-type="IDPhoto"
          >
            <Button icon="ios-cloud-upload-outline"></Button>
          </Upload>
        </div>
      </div>
    </div>
    <div v-else-if="tabIndex == 1" class="body_status">
      <div class="trip-title">{{ $t("oldManMsg.body.title") }}</div>
      <table
        class="table new-table"
        cellspacing="0"
        cellpadding="0"
        border="1"
        width="100%"
      >
        <tr>
          <td class="head-bg">{{ $t("oldManMsg.Information.Infectious") }}</td>
          <td colspan="2">
            <div class="flex">
              <div class="cell">{{ $t("oldManMsg.Information.HBS") }}</div>
              <RadioGroup v-model="bodyStatus.infection1">
                <Radio
                  label="1"
                  @mouseup.native="
                    handleRadioGroup('bodyStatus.infection1', '1')
                  "
                  >+</Radio
                >
                <Radio
                  label="2"
                  @mouseup.native="
                    handleRadioGroup('bodyStatus.infection1', '2')
                  "
                  >-</Radio
                >
              </RadioGroup>
            </div>
          </td>
          <td>
            <div class="flex">
              <div class="cell">HCV</div>
              <RadioGroup v-model="bodyStatus.infection2">
                <Radio
                  label="1"
                  @mouseup.native="
                    handleRadioGroup('bodyStatus.infection2', '1')
                  "
                  >+</Radio
                >
                <Radio
                  label="2"
                  @mouseup.native="
                    handleRadioGroup('bodyStatus.infection2', '2')
                  "
                  >-</Radio
                >
              </RadioGroup>
            </div>
          </td>
          <td colspan="2">
            <div class="flex">
              <div class="cell">TPHA</div>
              <RadioGroup v-model="bodyStatus.infection3">
                <Radio
                  label="1"
                  @mouseup.native="
                    handleRadioGroup('bodyStatus.infection3', '1')
                  "
                  >+</Radio
                >
                <Radio
                  label="2"
                  @mouseup.native="
                    handleRadioGroup('bodyStatus.infection3', '2')
                  "
                  >-</Radio
                >
              </RadioGroup>
            </div>
          </td>
          <td>
            <div class="flex">
              <div class="cell">TB</div>
              <RadioGroup v-model="bodyStatus.infection4">
                <Radio
                  label="1"
                  @mouseup.native="
                    handleRadioGroup('bodyStatus.infection4', '1')
                  "
                  >+</Radio
                >
                <Radio
                  label="2"
                  @mouseup.native="
                    handleRadioGroup('bodyStatus.infection4', '2')
                  "
                  >-</Radio
                >
              </RadioGroup>
            </div>
          </td>
          <td colspan="2">
            <div class="flex">
              <div class="cell">{{ $t("global.other") }}</div>
              <RadioGroup v-model="bodyStatus.infection5">
                <Radio
                  label="1"
                  @mouseup.native="
                    handleRadioGroup('bodyStatus.infection5', '1')
                  "
                  >+</Radio
                >
                <Radio
                  label="2"
                  @mouseup.native="
                    handleRadioGroup('bodyStatus.infection5', '2')
                  "
                  >-</Radio
                >
              </RadioGroup>
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg">{{ $t("oldManMsg.Information.allergen") }}</td>
          <td colspan="3">
            <div class="flex">
              <div class="cell">{{ $t("oldManMsg.Information.food") }}</div>
              <Input v-model="bodyStatus.allergic1" />
            </div>
          </td>
          <td colspan="3">
            <div class="flex">
              <div class="cell">{{ $t("oldManMsg.Information.drug") }}</div>
              <Input v-model="bodyStatus.allergic2" />
            </div>
          </td>
          <td colspan="2">
            <div class="flex">
              <div class="cell">{{ $t("oldManMsg.Information.other") }}</div>
              <Input v-model="bodyStatus.allergic3" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.body.Daily") }}</td>
          <td colspan="8">
            <div class="cell" style="text-align: left; padding: 0.05rem 0">
              <Checkbox-group
                v-model="bodyStatus.actionAbility"
                @click="handleRadioGroup"
              >
                <Checkbox label="1">{{ $t("oldManMsg.body.Walk") }}</Checkbox>
                <Checkbox label="2">{{ $t("oldManMsg.body.Staff") }}</Checkbox>
                <Checkbox label="3">{{ $t("oldManMsg.body.Walker") }}</Checkbox>
                <Checkbox label="4">{{ $t("oldManMsg.body.Sit") }}</Checkbox>
              </Checkbox-group>
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.body.cataract") }}
          </td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.cataract.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.cataract', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.cataract', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.cataract.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.body.sensitiveFood") }}
          </td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.foodAllergy.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.foodAllergy', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.foodAllergy', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.foodAllergy.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.body.sensitive") }}
          </td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.drugSensitive.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="
                      handleGroup('bodyStatus.drugSensitive', '1')
                    "
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="
                      handleGroup('bodyStatus.drugSensitive', '2')
                    "
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.drugSensitive.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.body.Cerebral") }}
          </td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.cerebralInfarction.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="
                      handleGroup('bodyStatus.cerebralInfarction', '1')
                    "
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="
                      handleGroup('bodyStatus.cerebralInfarction', '2')
                    "
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.cerebralInfarction.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.body.highBlood") }}
          </td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.hypertension.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="
                      handleGroup('bodyStatus.hypertension', '1')
                    "
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="
                      handleGroup('bodyStatus.hypertension', '2')
                    "
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.hypertension.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.body.lowBlood") }}
          </td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.lowBlood.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.lowBlood', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.lowBlood', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.lowBlood.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.body.boldness") }}
          </td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.cholesterol.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.cholesterol', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.cholesterol', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.cholesterol.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.body.cup") }}</td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.pipeInspection.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="
                      handleGroup('bodyStatus.pipeInspection', '1')
                    "
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="
                      handleGroup('bodyStatus.pipeInspection', '2')
                    "
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.pipeInspection.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.body.disease") }}
          </td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.parkinson.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.parkinson', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.parkinson', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.parkinson.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.body.beater") }}</td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.pacemaker.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.pacemaker', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.pacemaker', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.pacemaker.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.body.visual") }}</td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.visualImpairment.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="
                      handleGroup('bodyStatus.visualImpairment', '1')
                    "
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="
                      handleGroup('bodyStatus.visualImpairment', '2')
                    "
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.visualImpairment.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.body.power") }}</td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.hearingImpairment.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="
                      handleGroup('bodyStatus.hearingImpairment', '1')
                    "
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="
                      handleGroup('bodyStatus.hearingImpairment', '2')
                    "
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.hearingImpairment.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.body.language") }}
          </td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.languageBarrier.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="
                      handleGroup('bodyStatus.languageBarrier', '1')
                    "
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="
                      handleGroup('bodyStatus.languageBarrier', '2')
                    "
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.languageBarrier.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.body.heart") }}</td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.heart.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.heart', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.heart', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.heart.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.body.asthma") }}</td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.asthma.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.asthma', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.asthma', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.asthma.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.body.head") }}</td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.dizzy.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.dizzy', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.dizzy', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.dizzy.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.body.diabetes") }}
          </td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.diabetes.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.diabetes', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.diabetes', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.diabetes.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.body.pain") }}</td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.gout.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.gout', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.gout', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.gout.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.body.illness") }}
          </td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.mental_disorders.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="
                      handleGroup('bodyStatus.mental_disorders', '1')
                    "
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="
                      handleGroup('bodyStatus.mental_disorders', '2')
                    "
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.mental_disorders.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.body.dementia") }}
          </td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.alzheimer.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.alzheimer', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.alzheimer', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.alzheimer.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.body.lung") }}</td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.disease.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.disease', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.disease', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.disease.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.body.cancer") }}</td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.cancer.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.cancer', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.cancer', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.cancer.content" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.body.other") }}</td>
          <td colspan="8">
            <div class="flex">
              <div class="cell" style="text-align: left; padding: 0.05rem 0">
                <RadioGroup
                  v-model="bodyStatus.bodyOther.ishave"
                  @click="handleGroup"
                >
                  <Radio
                    label="1"
                    @mouseup.native="handleGroup('bodyStatus.bodyOther', '1')"
                    >{{ $t("evaluate.foodMedicine.have") }}</Radio
                  >
                  <Radio
                    label="2"
                    @mouseup.native="handleGroup('bodyStatus.bodyOther', '2')"
                    >{{ $t("evaluate.foodMedicine.no") }}</Radio
                  >
                </RadioGroup>
              </div>
              <Input v-model="bodyStatus.bodyOther.content" />
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div v-else-if="tabIndex == 2" class="insurance">
      <div class="trip-title">{{ $t("oldManMsg.Insurance.title") }}</div>
      <table
        class="table new-table"
        cellspacing="0"
        cellpadding="0"
        border="1"
        width="100%"
      >
        <tr>
          <td class="head-bg" colspan="6">
            {{ $t("oldManMsg.Insurance.informasi") }}
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1" style="width: 1.5rem;">
            {{ $t("oldManMsg.Insurance.Insurer") }}
          </td>
          <td colspan="2" style="width: 2.5rem;">
            <Input type="text" v-model="safe.name" />
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.number") }}
          </td>
          <td colspan="2">
            <Input type="text" v-model="safe.phone" />
          </td>
        </tr>
        <tr>
          <td
            class="head-bg"
            colspan="1"
            style="white-space:pre-line;word-wrap: break-word;word-break: break-all;"
          >
            {{ $t("oldManMsg.Insurance.Relationship") }}
          </td>
          <td colspan="2">
            <Input type="text" v-model="safe.relationship" />
          </td>
          <td
            class="head-bg"
            colspan="1"
            style="white-space:pre-line;word-wrap: break-word;word-break: break-all;"
          >
            {{ $t("oldManMsg.Insurance.Partial") }}
          </td>
          <td colspan="2">
            <Input type="text" v-model="safe.partRole" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Public") }}
          </td>
          <td colspan="2">
            <Input type="text" v-model="safe.expense" />
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Hand") }}
          </td>
          <td colspan="2">
            <Input type="text" v-model="safe.expenseMedical" />
          </td>
        </tr>
        <tr>
          <td
            class="head-bg"
            colspan="1"
            style="white-space:pre-line;word-wrap: break-word;word-break: break-all;"
          >
            {{ $t("oldManMsg.Insurance.Expiry") }}
          </td>
          <td colspan="2">
            <div class="cell">
              <DatePicker
                :editable="false"
                class="calendarFont"
                :value="safe.validity"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="safe.validity = $event"
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
          <td
            class="head-bg"
            colspan="1"
            style="white-space:pre-line;word-wrap: break-word;word-break: break-all;"
          >
            {{ $t("oldManMsg.Insurance.Validity") }}
          </td>
          <td colspan="2">
            <div class="cell">
              <DatePicker
                class="calendarFont"
                :editable="false"
                :value="safe.validityAffirm"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="safe.validityAffirm = $event"
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
        </tr>
      </table>

      <table
        class="table new-table"
        cellspacing="0"
        cellpadding="0"
        border="1"
        width="100%"
        style="margin-top: 0.2rem"
      >
        <tr>
          <td class="head-bg" colspan="6">
            {{ $t("oldManMsg.Insurance.The") }}
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1" style="width: 1.5rem;">
            {{ $t("oldManMsg.Insurance.number1") }}
          </td>
          <td colspan="2" style="width: 2.5rem;">
            <Input type="text" v-model="safe.cardNum" />
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Expiration") }}
          </td>
          <td colspan="2">
            <div class="cell">
              <DatePicker
                class="calendarFont"
                :editable="false"
                :value="safe.cardValidity"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="safe.cardValidity = $event"
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Name") }}
          </td>
          <td colspan="2">
            <Input type="text" v-model="safe.cardName" />
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Qualification") }}
          </td>
          <td colspan="2">
            <Input type="text" v-model="safe.cardAchieve" />
          </td>
        </tr>
      </table>

      <table
        class="table new-table"
        cellspacing="0"
        cellpadding="0"
        border="1"
        width="100%"
        style="margin-top: 0.2rem"
      >
        <tr>
          <td class="head-bg" colspan="6">
            {{ $t("oldManMsg.Insurance.Relief") }}
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1" style="width: 1.5rem;">
            {{ $t("oldManMsg.Insurance.Sponsor") }}
          </td>
          <td colspan="2" style="width: 2.5rem;">
            <Input type="text" v-model="safe.measuresName" />
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Delivery2") }}
          </td>
          <td colspan="2">
            <div class="cell">
              <DatePicker
                class="calendarFont"
                :editable="false"
                :value="safe.measuresDate"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="safe.measuresDate = $event"
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Validity1") }}
          </td>
          <td colspan="2">
            <div class="cell">
              <DatePicker
                class="calendarFont"
                :editable="false"
                :value="safe.measuresValidity"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="safe.measuresValidity = $event"
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.confirm") }}
          </td>
          <td colspan="2">
            <Input type="text" v-model="safe.measuresNum" />
          </td>
        </tr>
        <tr>
          <td
            class="head-bg"
            colspan="1"
            style="white-space:pre-line;word-wrap: break-word;word-break: break-all;"
          >
            {{ $t("oldManMsg.Insurance.reduction") }}
          </td>
          <td colspan="5">
            <Input type="text" v-model="safe.breaks" />
          </td>
        </tr>
      </table>

      <table
        class="table new-table"
        cellspacing="0"
        cellpadding="0"
        border="1"
        width="100%"
        style="margin-top: 0.2rem"
      >
        <tr>
          <td class="head-bg" colspan="6">
            {{ $t("oldManMsg.Insurance.Escort") }}
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1" style="width: 1.5rem;">
            {{ $t("oldManMsg.Insurance.insurance") }}
          </td>
          <td colspan="2" style="width: 2.5rem;">
            <Input type="text" v-model="safe.insuranceNum" />
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Nursing") }}
          </td>
          <td colspan="2">
            <Input type="text" v-model="safe.insurancePhone" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.care") }}
          </td>
          <td colspan="2">
            <Input type="text" v-model="safe.identified" />
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Delivery") }}
          </td>
          <td colspan="2">
            <div class="cell">
              <DatePicker
                class="calendarFont"
                :editable="false"
                :value="safe.deliveryDate"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="safe.deliveryDate = $event"
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Period") }}
          </td>
          <td colspan="5">
            <div class="cell">
              <DatePicker
                class="calendarFont"
                :editable="false"
                :value="safe.periodValidity"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="safe.periodValidity = $event"
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
        </tr>
      </table>

      <table
        class="table new-table"
        cellspacing="0"
        cellpadding="0"
        border="1"
        width="100%"
        style="margin-top: 0.2rem"
      >
        <tr>
          <td class="head-bg" colspan="6">
            {{ $t("oldManMsg.Insurance.general") }}
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1" style="width: 1.5rem;">
            {{ $t("oldManMsg.Insurance.Delivery1") }}
          </td>
          <td colspan="2" style="width: 2.5rem;">
            <div class="cell">
              <DatePicker
                class="calendarFont"
                :editable="false"
                :value="safe.advancedDelivery"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="safe.advancedDelivery = $event"
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.effective") }}
          </td>
          <td colspan="2">
            <div class="cell">
              <DatePicker
                class="calendarFont"
                :editable="false"
                :value="safe.advancedDate"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="safe.advancedDate = $event"
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Effective") }}
          </td>
          <td colspan="2">
            <div class="cell">
              <DatePicker
                class="calendarFont"
                :editable="false"
                :value="safe.advancedValidity"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="safe.advancedValidity = $event"
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.General") }}
          </td>
          <td colspan="2">
            <Input type="text" v-model="safe.advancedDistinguish" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Long") }}
          </td>
          <td colspan="5">
            <div class="cell">
              <DatePicker
                class="calendarFont"
                :editable="false"
                :value="safe.advancedStay"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="safe.advancedStay = $event"
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
        </tr>
      </table>

      <table
        class="table new-table"
        cellspacing="0"
        cellpadding="0"
        border="1"
        width="100%"
        style="margin-top: 0.2rem"
      >
        <tr>
          <td class="head-bg" colspan="6">
            {{ $t("oldManMsg.Insurance.Handbook") }}
          </td>
        </tr>
        <tr>
          <td class="head-bg">{{ $t("global.name") }}</td>
          <td colspan="5">
            <Input type="text" v-model="safe.mentalName" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1" style="width: 1.5rem;">
            {{ $t("oldManMsg.Insurance.grade") }}
          </td>
          <td colspan="2" style="width: 2.5rem;">
            <Input type="text" v-model="safe.mentalLevel" />
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Injury") }}
          </td>
          <td colspan="2">
            <Input type="text" v-model="safe.mentalInjury" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Delivery") }}
          </td>
          <td colspan="2">
            <div class="cell">
              <DatePicker
                class="calendarFont"
                :editable="false"
                :value="safe.mentalDate"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="safe.mentalDate = $event"
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.Handicap") }}
          </td>
          <td colspan="2">
            <Input type="text" v-model="safe.mentalHand" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.independent") }}
          </td>
          <td colspan="2">
            <Input type="text" v-model="safe.mentalDoctorName" />
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.degree") }}
          </td>
          <td colspan="2" style="width: 2.3rem;">
            <Input type="text" v-model="safe.mentalDegree" />
          </td>
        </tr>

        <tr>
          <td class="head-bg" colspan="6">
            {{ $t("oldManMsg.Insurance.Through") }}
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.first") }}
          </td>
          <td colspan="5">
            <Input type="text" v-model="safe.officeName" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">TEL</td>
          <td colspan="5">
            <Input type="text" v-model="safe.officeTel" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Insurance.location") }}
          </td>
          <td colspan="5">
            <Input type="text" v-model="safe.officeAddress" />
          </td>
        </tr>
      </table>
    </div>
    <div v-else-if="tabIndex == 3">
      <div class="trip-title">{{ $t("oldManMsg.urgent.title") }}</div>
      <div class="chart-button" style="margin-bottom: .25rem;">
        <button @click="handleAddContact">
          {{ $t("oldManMsg.urgent.addContent") }}
        </button>
      </div>
      <table
        class="table new-table"
        cellspacing="0"
        cellpadding="0"
        border="1"
        width="100%"
        v-for="(item, index) in contact"
        :key="index"
      >
        <tr>
          <td
            rowspan="8"
            class="head-bg"
            @click="handleDeleContact(index, 'contact')"
          >
            {{ $t("oldManMsg.urgent.Emergency") }}
          </td>
          <td class="head-bg">{{ $t("oldManMsg.Information.Name1") }}</td>
          <td>
            <div class="clee">
              <Input type="textarea" autosize v-model="item.nickName" />
            </div>
          </td>
          <td rowspan="4" class="head-bg">
            {{ $t("oldManMsg.urgent.phone") }}
          </td>
          <td class="head-bg">{{ $t("oldManMsg.urgent.code") }}</td>
          <td>
            <div class="clee">
              <Input
                type="textarea"
                @on-change="getContactCode($event, index, '1')"
                autosize
                maxlength="15"
                v-model="item.phoneDom"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg">{{ $t("oldManMsg.urgent.Name") }}</td>
          <td>
            <div class="clee">
              <Input type="textarea" autosize v-model="item.name" />
            </div>
          </td>
          <td class="head-bg">{{ $t("oldManMsg.urgent.Residential") }}</td>
          <td>
            <div class="clee">
              <Input type="textarea" autosize v-model="item.dom" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg">{{ $t("oldManMsg.urgent.gender") }}</td>
          <td>
            <RadioGroup v-model="item.sex">
              <Radio label="1">{{ $t("oldManMsg.Information.male") }}</Radio>
              <Radio label="2">{{ $t("oldManMsg.Information.female") }}</Radio>
            </RadioGroup>
          </td>
          <td class="head-bg">{{ $t("oldManMsg.urgent.Cell") }}</td>
          <td>
            <div class="clee">
              <Input
                type="textarea"
                autosize
                maxlength="15"
                v-model="item.contactPhone"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg">{{ $t("oldManMsg.urgent.houseKey") }}</td>
          <td>
            <div class="clee">
              <Input type="textarea" autosize v-model="item.houseKey" />
            </div>
          </td>
          <td class="head-bg">{{ $t("oldManMsg.urgent.telephone") }}</td>
          <td>
            <div class="clee">
              <Input
                type="textarea"
                autosize
                maxlength="15"
                v-model="item.contactPhoneOffice"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg">{{ $t("oldManMsg.urgent.age") }}</td>
          <td>
            <!-- <div class="clee">
            <input type="text" disabled v-model="item.age" />
          </div> -->
            {{ item.age }}
          </td>
          <td colspan="2" class="head-bg">{{ $t("oldManMsg.urgent.work") }}</td>
          <td>
            <div class="clee">
              <Input type="textarea" autosize v-model="item.address" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg">{{ $t("oldManMsg.urgent.Date") }}</td>
          <td>
            <div class="clee">
              <!-- <Input type="textarea" autosize v-model="item.birthday" /> -->
              <div class="cell">
                <DatePicker
                  :editable="false"
                  class="calendarFont"
                  :value="item.birthday"
                  format="yyyy-MM-dd"
                  type="date"
                  :placeholder="$t('global.sele')"
                  style="width: 100%"
                  @on-change="
                    item.birthday = $event;
                    handleDataSele(index, 'contact');
                  "
                  @focus="this.blur()"
                ></DatePicker>
              </div>
            </div>
          </td>
          <td colspan="2" class="head-bg">
            {{ $t("oldManMsg.urgent.carry") }}
          </td>
          <td>
            <div class="clee">
              <Input type="textarea" autosize v-model="item.take" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg">{{ $t("oldManMsg.urgent.relationship") }}</td>
          <td>
            <div class="clee">
              <Input type="textarea" autosize v-model="item.relationship" />
            </div>
          </td>
          <td colspan="2" class="head-bg">
            {{ $t("oldManMsg.urgent.remarks") }}
          </td>
          <td>
            <div class="clee">
              <Input type="textarea" autosize v-model="item.postNum" />
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div v-else-if="tabIndex == 4" class="insurance">
      <div class="trip-title">{{ $t("oldManMsg.cohabitation.title") }}</div>
      <div class="chart-button" style="margin-bottom: .25rem;">
        <button @click="handleAddCohabit">
          {{ $t("oldManMsg.cohabitation.addCohabit") }}
        </button>
      </div>
      <table
        class="table new-table"
        cellspacing="0"
        cellpadding="0"
        border="1"
        width="100%"
        v-for="(item, index) in cohabit"
        :key="index"
      >
        <tr>
          <td
            class="head-bg"
            rowspan="6"
            colspan="1"
            @click="handleDeleContact(index, 'cohabit')"
          >
            {{ $t("oldManMsg.cohabitation.Cohabitant") }}
          </td>
          <td class="head-bg">{{ $t("oldManMsg.Information.Name1") }}<span class='required'>*</span></td>
          <td colspan="5">
            <div class="clee">
              <Input type="textarea" autosize v-model="item.nikeName" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.cohabitation.Name") }}<span class='required'>*</span>
          </td>
          <td colspan="2">
            <Input type="textarea" autosize v-model="item.name" />
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.cohabitation.contact") }}
          </td>
          <td colspan="2">
            <Input type="textarea" autosize v-model="item.phone" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.cohabitation.Postal") }}
          </td>
          <td colspan="2">
            <input
              type="text"
              v-model="item.post"
              maxlength="7"
              @input="handleInputPost(index, 'cohabit')"
            />
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.cohabitation.residence") }}
          </td>
          <td colspan="2" class="fonts">
            <Input type="textarea" autosize v-model="item.dom" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.cohabitation.gender") }}
          </td>
          <td colspan="2">
            <RadioGroup v-model="item.sex">
              <Radio label="1">{{ $t("oldManMsg.Information.male") }}</Radio>
              <Radio label="2">{{ $t("oldManMsg.Information.female") }}</Radio>
            </RadioGroup>
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.cohabitation.relationship") }}
          </td>
          <td colspan="2">
            <Input type="textarea" autosize v-model="item.relation" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.cohabitation.age") }}
          </td>
          <td colspan="2">
            <!-- <input type="text" disabled v-model="item.age" /> -->
            {{ item.age }}
          </td>
          <td class="head-bg" colspan="1" rowspan="2">
            {{ $t("oldManMsg.cohabitation.Special") }}
          </td>
          <td colspan="2" rowspan="2">
            <Input type="textarea" autosize v-model="item.information" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.cohabitation.Date") }}<span class='required'>*</span>
          </td>
          <td colspan="2">
            <!-- <input type="text" v-model="item.birthday" /> -->
            <div class="cell">
              <DatePicker
                :editable="false"
                class="calendarFont"
                :value="item.birthday"
                format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('global.sele')"
                style="width: 100%"
                @on-change="
                  item.birthday = $event;
                  handleDataSele(index, 'cohabit');
                "
                @focus="this.blur()"
              ></DatePicker>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div v-else-if="tabIndex == 5" class="insurance">
      <div class="trip-title">{{ $t("oldManMsg.other.title") }}</div>
      <table
        class="table new-table"
        cellspacing="0"
        cellpadding="0"
        border="1"
        width="100%"
      >
        <tr>
          <td class="head-bg" rowspan="3" colspan="1">
            {{ $t("oldManMsg.other.private") }}1
          </td>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.other.Name") }}</td>
          <td colspan="2">
            <Input
              type="textarea"
              autosize
              v-model="otherInfo.doctors1Conpany"
            />
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.other.Medical") }}
          </td>
          <td colspan="2">
            <Input
              type="textarea"
              autosize
              v-model="otherInfo.doctors1Subjects"
            />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.other.Doctor") }}
          </td>
          <td colspan="2">
            <Input type="textarea" autosize v-model="otherInfo.doctors1Name" />
          </td>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.other.phone") }}</td>
          <td colspan="2">
            <Input maxlength="15" v-model="otherInfo.doctors1Phone" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Information.Injury") }}
          </td>
          <td colspan="5">
            <Input
              type="textarea"
              autosize
              v-model="otherInfo.doctors1Injury"
            />
          </td>
        </tr>
        <tr>
          <td class="head-bg" rowspan="3" colspan="1">
            {{ $t("oldManMsg.other.private") }}2
          </td>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.other.Name") }}</td>
          <td colspan="2">
            <Input
              type="textarea"
              autosize
              v-model="otherInfo.doctors2Conpany"
            />
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.other.Medical") }}
          </td>
          <td colspan="2">
            <Input
              type="textarea"
              autosize
              v-model="otherInfo.doctors2Subjects"
            />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.other.Doctor") }}
          </td>
          <td colspan="2">
            <Input type="textarea" autosize v-model="otherInfo.doctors2Name" />
          </td>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.other.phone") }}</td>
          <td colspan="2">
            <Input maxlength="15" v-model="otherInfo.doctors2Phone" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Information.Injury") }}
          </td>
          <td colspan="5">
            <Input
              type="textarea"
              autosize
              v-model="otherInfo.doctors2Injury"
            />
          </td>
        </tr>
        <tr>
          <td class="head-bg" rowspan="3" colspan="1">
            {{ $t("oldManMsg.other.private") }}3
          </td>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.other.Name") }}</td>
          <td colspan="2">
            <Input
              type="textarea"
              autosize
              v-model="otherInfo.doctors3Conpany"
            />
          </td>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.other.Medical") }}
          </td>
          <td colspan="2">
            <Input
              type="textarea"
              autosize
              v-model="otherInfo.doctors3Subjects"
            />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.other.Doctor") }}
          </td>
          <td colspan="2">
            <Input type="textarea" autosize v-model="otherInfo.doctors3Name" />
          </td>
          <td class="head-bg" colspan="1">{{ $t("oldManMsg.other.phone") }}</td>
          <td colspan="2">
            <Input maxlength="15" v-model="otherInfo.doctors3Phone" />
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.Information.Injury") }}
          </td>
          <td colspan="5">
            <Input
              type="textarea"
              autosize
              v-model="otherInfo.doctors3Injury"
            />
          </td>
        </tr>
      </table>

      <table
        class="table new-table"
        cellspacing="0"
        cellpadding="0"
        border="1"
        width="100%"
        style="margin-top: 0.3rem;"
      >
        <tr>
          <td class="head-bg" colspan="6" @click="handleAddOther">
            {{ $t("oldManMsg.other.Use") }}
          </td>
        </tr>
        <tr>
          <td class="head-bg" colspan="1">
            {{ $t("oldManMsg.other.Serial") }}
          </td>
          <td class="head-bg" colspan="3">
            {{ $t("oldManMsg.other.Transaction") }}
          </td>
          <td class="head-bg" colspan="2">
            {{ $t("oldManMsg.other.Degree") }}
          </td>
        </tr>
        <tr v-for="(item, index) in otherInfo.transactionName1" :key="index">
          <td class="head-bg" colspan="1">{{ index + 1 }}</td>
          <td colspan="3">
            <Input type="textarea" autosize v-model="item.transactionName" />
          </td>
          <td colspan="2">
            <Input type="textarea" autosize v-model="item.usingDegree" />
          </td>
        </tr>
      </table>
    </div>
    <div class="table-submit">
      <!-- <button @click="handleSave">
          <i class="iconfont icon-baocun"></i>
          {{$t('global.preservation')}}
        </button>-->
      <button @click="handleSubmit">
        <i class="iconfont icon-submit"></i>
        {{ $t("global.submit") }}
      </button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { BASE_URL } from "../network/http";
import TreeChart from "@/components/TreeChart.vue";
import html2canvas from "html2canvas";
import {
  sendBaseInfo,
  sendSafeInfo,
  sendContactInfo,
  sendCohabitInfo,
  getBaseInfo,
  getCohabitInfo,
  getContactInfo,
  getSafeInfo,
  sendFileUpload,
  sendUploadBase,
  updateBaseInfo
} from "../network/Sinyu";
import { getPossByPoss3, getOldmanId } from "../network/kongHX";
import { format, imgTo, debounce, getAge } from "../assets/utils/Tools";
import Vue from "vue";
let imgSrc1, imgSrc2, imgSrc3, imgSrc4, self_man, self_woman;
export default {
  components: {
    TreeChart
  },
  data() {
    return {
      isSpouse: "",
      tabList: [
        "oldManMsg.Information.title",
        "oldManMsg.body.title",
        "oldManMsg.Insurance.title",
        "oldManMsg.urgent.title",
        "oldManMsg.cohabitation.title",
        "oldManMsg.other.title"
      ],
      dblclickote: 0,
      takeList: [
        {
          value: 1,
          label: "oldManMsg.Information.Donate"
        },
        {
          value: 2,
          label: "oldManMsg.Information.escort"
        },
        {
          value: 3,
          label: "oldManMsg.Information.walk_alone"
        }
      ],
      baseUrl: null,
      bedsId: null,
      isRelative: false,
      tabIndex: 0,
      oldInfo: {},
      userInfo: {},
      isAddRelev: false,
      currentRelev: {},
      dblclickNum: 0,
      chartData: {
        name: ""
      },
      relevTitle: "添加关系",
      inputRelev: {
        sex: "1",
        dying: "1"
      },
      relevImg: null,
      baseInfo: {
        sex: "1",
        foodLevel: 1,
        level: 8,
        attention: "2",
        emergencyRelation1: {
          d1: "",
          d2: "",
          d3: ""
        },
        emergencyRelation2: {
          d1: "",
          d2: "",
          d3: ""
        },
        injury: {
          d1: "",
          d2: ""
        },
        previousHistory1: [["", ""]],
        situation: "",
        aid: "",
        picture: "",
        photoId: ""
      },
      bodyStatus: {},
      otherInfo: {
        transactionName1: [
          {
            transactionName: "",
            usingDegree: ""
          }
        ]
      },
      safe: {},
      contact: [{}],
      cohabit: [{}],
      uploadAdd: "",
      seleAdd: false,
      nursingLevelList: [
        {
          id: 8,
          value: this.$t("oldManMsg.Information.support3")
        },
        {
          id: 9,
          value: this.$t("oldManMsg.Information.support4")
        },
        {
          id: 1,
          value: this.$t("oldManMsg.Information.support") + "-1"
        },
        {
          id: 2,
          value: this.$t("oldManMsg.Information.support") + "-2"
        },
        {
          id: 3,
          value: this.$t("oldManMsg.Information.support2") + "-1"
        },
        {
          id: 4,
          value: this.$t("oldManMsg.Information.support2") + "-2"
        },
        {
          id: 5,
          value: this.$t("oldManMsg.Information.support2") + "-3"
        },
        {
          id: 6,
          value: this.$t("oldManMsg.Information.support2") + "-4"
        },
        {
          id: 7,
          value: this.$t("oldManMsg.Information.support2") + "-5"
        }
      ],
      foodLevelList: [
        {
          id: 1,
          value: this.$t("oldManMsg.Information.normal")
        },
        {
          id: 2,
          value: this.$t("oldManMsg.Information.chopped")
        },
        {
          id: 3,
          value: this.$t("oldManMsg.Information.soft")
        },
        {
          id: 4,
          value: this.$t("oldManMsg.Information.straw")
        },
        {
          id: 5,
          value: this.$t("oldManMsg.Information.jelly")
        }
      ],
      lang: "",
      numbering: "",
      changeId: false
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.baseUrl = BASE_URL;
    this.uploadAdd = BASE_URL + "app/upload/uploadFile";
    if (!this.$route.query.new) {
      this.changeId = true;
      this.oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
      this._getBaseInfo({
        id: this.oldInfo.oldId
      });
      this.numbering = this.oldInfo.oldId;
      this._getCohabitInfo();
      this._getContactInfo();
      this._getSafeInfo();
    } else {
      this.getNewOldmanId();
    }
    this.baseInfo.bedsId = this.$route.query.bedId;
    this.handleInputPost = debounce(this.handleInputPost);
    this.getPostalCode = debounce(this.getPostalCode);
    this.getContactCode = debounce(this.getContactCode, 1000);
    imgTo(BASE_URL + "pic/20200811/1597125593015.png").then(res => {
      imgSrc1 = res;
    });
    imgTo(BASE_URL + "pic/20200811/1597125609020.png").then(res => {
      imgSrc2 = res;
    });
    imgTo(BASE_URL + "pic/20200811/1597125622341.png").then(res => {
      imgSrc3 = res;
    });
    imgTo(BASE_URL + "pic/20200811/1597125634778.png").then(res => {
      imgSrc4 = res;
    });
    imgTo(BASE_URL + "pic/20200811/1597125495137.png").then(res => {
      self_man = res;
    });
    imgTo(BASE_URL + "pic/20200811/1597125575008.png").then(res => {
      self_woman = res;
    });
    this.handleImage();
    this.lang = sessionStorage.getItem("language");
  },
  methods: {
    //获取邮政编码
    getPostalCode(e) {
      // console.log("ppp", this.baseInfo.postalCode);
      if (this.baseInfo.postalCode.length >= 4) {
        this.getAddress();
      }
    },
    getContactCode(e, index, type) {
      ///  获取联络我们邮编
      let data;
      const way = type == "1" ? "phoneDom" : "postNum";
      const value = type == "1" ? "dom" : "address";
      switch (type) {
        case "1":
          data = {
            poss3: this.contact[index].phoneDom
          };
          break;
        case "2":
          data = {
            poss3: this.contact[index].postNum
          };
          break;
      }
      if (this.contact[index][way].length > 3) {
        getPossByPoss3(data)
          .then(res => {
            if (this.contact[index][way].length == 4) {
              Vue.set(this.contact[index], value, res.data[0].poss7);
            } else if (this.contact[index][way].length == 5) {
              Vue.set(
                this.contact[index],
                value,
                res.data[0].poss7 + res.data[0].poss8
              );
            } else if (this.contact[index][way].length > 5) {
              Vue.set(
                this.contact[index],
                value,
                res.data[0].poss7 + res.data[0].poss8 + res.data[0].poss9
              );
            }
          })
          .catch(err => {
            console.warn(err);
          });
      }
    },
    handleImage() {
      if (!this.baseInfo.photoId || !this.baseInfo.picture) {
        if (this.baseInfo.sex == "1") {
          this.baseInfo.photoId = "pic/20200907/1599448250476.png";
          this.baseInfo.picture = "pic/20200907/1599448250476.png";
        } else {
          this.baseInfo.photoId = "pic/20200907/1599448168027.png";
          this.baseInfo.picture = "pic/20200907/1599448168027.png";
        }
      }
    },
    handleIfSex(e) {
      ///  点击切换了性别
      if (e == "1") {
        this.baseInfo.photoId = "pic/20200907/1599448250476.png";
        this.baseInfo.picture = "pic/20200907/1599448250476.png";
      } else {
        this.baseInfo.photoId = "pic/20200907/1599448168027.png";
        this.baseInfo.picture = "pic/20200907/1599448168027.png";
      }
    },
    //通过邮政编码获取库中地址
    async getAddress() {
      try {
        const res = await getPossByPoss3({
          poss3: this.baseInfo.postalCode
        });
        console.log(res);
        if (res.code === 0) {
          if (res.data.length) {
            if (this.baseInfo.postalCode.length == 4) {
              Vue.set(this.baseInfo, "dom", res.data[0].poss7);
            } else if (this.baseInfo.postalCode.length == 5) {
              Vue.set(
                this.baseInfo,
                "dom",
                res.data[0].poss7 + res.data[0].poss8
              );
            } else if (this.baseInfo.postalCode.length > 5) {
              Vue.set(
                this.baseInfo,
                "dom",
                res.data[0].poss7 + res.data[0].poss8 + res.data[0].poss9
              );
            }
          } else {
            this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: this.$t("oldManMsg.Information.postal")
            });
            this.baseInfo.dom = "";
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    changeTab(index) {
      this.$forceUpdate();
      //   点击切换表格
      if (this.baseInfo.id) this.tabIndex = index;
    },
    handleAddRelev() {
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("oldManMsg.Information.diagram"),
        okText: this.$t("global.sure"),
        cancelText: this.$t("global.cancel"),
        onOk: async () => {
          let image_url;
          if (this.baseInfo.sex === "1") {
            image_url = self_man;
          } else {
            image_url = self_woman;
          }
          if (this.baseInfo.name) {
            this.chartData = {
              id: 1,
              name: this.baseInfo.name,
              image_url,
              children: []
            };
          } else {
            this.$Notice.error({
              title: this.$t("oldManMsg.Information.inputName"),
              duration: 2
            });
          }
        }
      });
    },
    handleAddOther() {
      //   点击添加介护保险利用
      this.dblclickote++;
      let timeoutflag = true;
      if (timeoutflag != null) {
        setTimeout(() => {
          if (
            this.dblclickote == 1 &&
            this.otherInfo.transactionName1.length > 1
          ) {
            this.otherInfo.transactionName1.pop();
          }
          if (this.dblclickote == 2) {
            this.otherInfo.transactionName1.push({
              transactionName: "",
              usingDegree: ""
            });
          }
          this.dblclickote = 0;
        }, 300);
      }
    },
    handleAddCohabit() {
      ///  点击添加同居人
      this.cohabit.push({
        age: "",
        birthday: "",
        dom: "",
        information: "",
        name: "",
        phone: "",
        post: "",
        relation: "",
        sex: "",
        oldId: this.baseInfo.id,
        recordId: this.userInfo.adminId,
        recordTime: format(Date.now())
      });
    },
    handleAddContact() {
      // 点击添加紧急联络
      this.contact.push({
        age: null,
        oldId: this.baseInfo.id,
        recordId: this.userInfo.adminId,
        recordTime: format(Date.now())
      });
    },
    handleDeleContact(index, type) {
      ///   点击删除紧急联络人
      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content:
          type === "contact"
            ? this.$t("oldManMsg.other.deleContact")
            : this.$t("oldManMsg.other.deleCohabit"),
        okText: this.$t("global.sure"),
        cancelText: this.$t("global.cancel"),
        onOk: async () => {
          this[type].splice(index, 1);
        }
      });
    },
    handleDataSele(index, type) {
      //   处理选择日期
      // const year = new Date().getFullYear()
      // const age = year - (this[type][index].birthday.split('-')[0]) * 1
      const age = getAge(this[type][index].birthday, format());
      this.$set(this[type][index], "age", age.year);
    },
    handleSeleBir() {
      //   处理选择日期
      const age = getAge(this.baseInfo.birthday, format());
      // const year = new Date().getFullYear()
      // const age = year - (this.baseInfo.birthday.split('-')[0]) * 1
      this.$set(this.baseInfo, "age", age.year);
    },
    handleInputPost(index, type) {
      // 处理输入邮编
      const data = {
        poss3: this[type][index].post
      };
      if (this[type][index].post) {
        getPossByPoss3(data)
          .then(res => {
            res.data.forEach(result => {
              if (result.poss3 == this[type][index].post) {
                Vue.set(
                  this[type][index],
                  "dom",
                  result.poss7 + result.poss8 + result.poss9
                );
              }
            });
          })
          .catch(err => {
            console.warn(err);
          });
      }
    },
    handleAddHistory() {
      //  点击添加既往史
      this.dblclickote++;
      let timeoutflag = true;
      if (timeoutflag != null) {
        setTimeout(() => {
          if (
            this.dblclickote == 1 &&
            this.baseInfo.previousHistory1.length > 1
          ) {
            this.baseInfo.previousHistory1.pop();
          }
          if (this.dblclickote == 2) {
            this.baseInfo.previousHistory1.push([]);
          }
          this.dblclickote = 0;
        }, 300);
      }
    },
    handleClickNode(e) {
      ///   点击处理关系
      e.name == "2" ? (this.isSpouse = "spouse") : (this.isSpouse = "");
      this.currentRelev = e;
      this.seleAdd = true;
    },
    handleSeleNode(type) {
      //  处理选择节点
      if (type == "删除内容") {
        this.currentRelev.children = undefined;
        this.currentRelev.name = undefined;
        this.seleAdd = false;
        return;
      }
      this.seleAdd = false;
      this.relevTitle = type;
      this.isAddRelev = true;
    },
    handleSubmitRelev() {
      let imgSrc;
      // if (this.inputRelev.sex == 1) {
      //   if (this.inputRelev.dying == 1)
      //     imgSrc = '1'
      //   if (this.inputRelev.dying == 2)
      //     imgSrc = imgTo("https://pic.downk.cc/item/5f09868414195aa5943af115.png");
      // } else {
      //   if (this.inputRelev.dying == 1)
      //     imgSrc = imgTo("https://pic.downk.cc/item/5f09868414195aa5943af117.png");
      //   if (this.inputRelev.dying == 2)
      //     imgSrc = imgTo("https://pic.downk.cc/item/5f09868414195aa5943af119.png");
      // }

      if (this.inputRelev.sex == 1) {
        if (this.inputRelev.dying == 1) {
          imgSrc = imgSrc1;
        }
        if (this.inputRelev.dying == 2) {
          imgSrc = imgSrc2;
        }
      } else {
        if (this.inputRelev.dying == 1) {
          imgSrc = imgSrc3;
        }
        if (this.inputRelev.dying == 2) {
          imgSrc = imgSrc4;
        }
      }
      if (this.relevTitle === "添加关系") {
        this.currentRelev.children.push({
          name: "1",
          image_url: imgSrc,
          children: []
        });
      } else if (this.relevTitle === "添加配偶") {
        this.$set(this.currentRelev, "mate", {
          name: "2",
          image_url: imgSrc
        });
      } else {
        this.currentRelev.image_url = imgSrc;
      }
    },
    onClose() {
      this.isAddRelev = false;
    },
    handleSave() {},
    handleSubmit() {
      //   点击提交
      switch (this.tabIndex + 1) {
        case 1:
          if (this.chartData.id) {
            new html2canvas(document.querySelector("#capture"), {
              useCORS: true,
              allowTaint: true
            }).then(async canvas => {
              const data = {
                base64: canvas.toDataURL()
              };
              const config = {
                headers: {
                  Accept: "application/json;charset=UTF-8",
                  "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8"
                }
              };
              try {
                const res = await sendUploadBase(qs.stringify(data), config);
                if (res.code === 0) {
                  this.relevImg = res.data;
                }
              } catch (err) {
                console.log(err);
              }
            });
          }
          if (!this.baseInfo.photoId || !this.baseInfo.picture) {
            if (this.baseInfo.sex == "1") {
              this.baseInfo.photoId = "pic/20200907/1599448250476.png";
              this.baseInfo.picture = "pic/20200907/1599448250476.png";
            } else {
              this.baseInfo.photoId = "pic/20200907/1599448168027.png";
              this.baseInfo.picture = "pic/20200907/1599448168027.png";
            }
          }
          this.$Modal.confirm({
            title: this.$t("global.reminder"),
            content: this.$t("global.save"),
            okText: this.$t("global.sure"),
            cancelText: this.$t("global.cancel"),
            onOk: async () => {
              if (
                /^(\d{4})-(\d{2})-(\d{2})$/.test(this.baseInfo.birthday) &&
                /^(\d{4})-(\d{2})-(\d{2})$/.test(this.baseInfo.checkinDate)
              ) {
                if (this.baseInfo.id) {
                  //修改老人基本资料
                  const data = Object.assign({}, this.baseInfo, {
                    name: this.baseInfo.name,
                    nursingId: this.userInfo.nursingId,
                    nursingName: this.userInfo.nursingName,
                    emergencyRelation1: JSON.stringify(
                      this.baseInfo.emergencyRelation1
                    ),
                    emergencyRelation2: JSON.stringify(
                      this.baseInfo.emergencyRelation2
                    ),
                    id: this.baseInfo.id,
                    relationPic: this.relevImg
                      ? "/" + this.relevImg.fileAPUrl
                      : this.baseInfo.relationPic,
                    previousHistory1: JSON.stringify(
                      this.baseInfo.previousHistory1
                    ),
                    familyStructure: JSON.stringify(this.chartData),
                    injury: JSON.stringify(this.baseInfo.injury)
                  });
                  try {
                    const res = await updateBaseInfo(data);
                    if (res.code === 0) {
                      // this.$router.go(-1);
                      this.$Notice.success({
                        title: this.$t("global.successfully"),
                        duration: 2
                      });
                      this._getBaseInfo({
                        id: res.data
                      });
                    } else {
                      this.$Notice.error({
                        title: this.$t("global.failed"),
                        duration: 2
                      });
                    }
                  } catch (err) {
                    this.$Notice.error({
                      title: this.$t("global.failed"),
                      duration: 2
                    });
                  }
                } else {
                  //新增老人
                  const data = Object.assign({}, this.baseInfo, {
                    name: this.baseInfo.name,
                    nursingId: this.userInfo.nursingId,
                    nursingName: this.userInfo.nursingName,
                    emergencyRelation1: JSON.stringify(
                      this.baseInfo.emergencyRelation1
                    ),
                    emergencyRelation2: JSON.stringify(
                      this.baseInfo.emergencyRelation2
                    ),
                    id: this.numbering,
                    relationPic: this.relevImg
                      ? "/" + this.relevImg.fileAPUrl
                      : this.baseInfo.relationPic,
                    previousHistory1: JSON.stringify(
                      this.baseInfo.previousHistory1
                    ),
                    familyStructure: JSON.stringify(this.chartData),
                    injury: JSON.stringify(this.baseInfo.injury)
                  });
                  try {
                    const res = await sendBaseInfo(data);
                    if (res.code === 0) {
                      // this.$router.go(-1);
                      this.$Notice.success({
                        title: this.$t("global.successfully"),
                        duration: 2
                      });
                      this._getBaseInfo({
                        id: res.data
                      });
                    }else if(res.code === 421){
                      //该老人ID已存在,无法添加
                      this.$Notice.error({
                        title: this.$t("oldManMsg.Information.repeat"),
                        duration: 2
                      });
                    }else {
                      this.$Notice.error({
                        title: this.$t("global.failed"),
                        duration: 2
                      });
                    }
                  } catch (err) {
                    this.$Notice.error({
                      title: this.$t("global.failed"),
                      duration: 2
                    });
                  }
                }
              } else {
                this.$Notice.error({
                  title: this.$t("global.failed")
                });
              }
            }
          });
          break;
        case 2:
          this.$Modal.confirm({
            title: this.$t("global.reminder"),
            content: this.$t("global.save"),
            okText: this.$t("global.sure"),
            cancelText: this.$t("global.cancel"),
            onOk: async () => {
              if (this.baseInfo.id) {
                //修改老人基本资料
                const data = Object.assign({}, this.bodyStatus, {
                  actionAbility: JSON.stringify(this.bodyStatus.actionAbility),
                  alzheimer: JSON.stringify(this.bodyStatus.alzheimer),
                  asthma: JSON.stringify(this.bodyStatus.asthma),
                  bodyOther: JSON.stringify(this.bodyStatus.bodyOther),
                  cancer: JSON.stringify(this.bodyStatus.cancer),
                  cataract: JSON.stringify(this.bodyStatus.cataract),
                  cerebralInfarction: JSON.stringify(
                    this.bodyStatus.cerebralInfarction
                  ),
                  cholesterol: JSON.stringify(this.bodyStatus.cholesterol),
                  diabetes: JSON.stringify(this.bodyStatus.diabetes),
                  disease: JSON.stringify(this.bodyStatus.disease),
                  dizzy: JSON.stringify(this.bodyStatus.dizzy),
                  drugSensitive: JSON.stringify(this.bodyStatus.drugSensitive),
                  foodAllergy: JSON.stringify(this.bodyStatus.foodAllergy),
                  gout: JSON.stringify(this.bodyStatus.gout),
                  hearingImpairment: JSON.stringify(
                    this.bodyStatus.hearingImpairment
                  ),
                  heart: JSON.stringify(this.bodyStatus.heart),
                  hypertension: JSON.stringify(this.bodyStatus.hypertension),
                  languageBarrier: JSON.stringify(
                    this.bodyStatus.languageBarrier
                  ),
                  lowBlood: JSON.stringify(this.bodyStatus.lowBlood),
                  mental_disorders: JSON.stringify(
                    this.bodyStatus.mental_disorders
                  ),
                  pacemaker: JSON.stringify(this.bodyStatus.pacemaker),
                  parkinson: JSON.stringify(this.bodyStatus.parkinson),
                  pipeInspection: JSON.stringify(
                    this.bodyStatus.pipeInspection
                  ),
                  visualImpairment: JSON.stringify(
                    this.bodyStatus.visualImpairment
                  ),
                  id: this.baseInfo.id,
                  name: this.baseInfo.name,
                  nursingId: this.userInfo.nursingId,
                  nursingName: this.userInfo.nursingName
                });
                try {
                  const res = await updateBaseInfo(data);
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
                } catch (err) {
                  this.$Notice.error({
                    title: this.$t("global.failed"),
                    duration: 2
                  });
                }
              } else {
                //新增老人
                const data = Object.assign({}, this.bodyStatus, {
                  actionAbility: JSON.stringify(this.bodyStatus.actionAbility),
                  alzheimer: JSON.stringify(this.bodyStatus.alzheimer),
                  asthma: JSON.stringify(this.bodyStatus.asthma),
                  bodyOther: JSON.stringify(this.bodyStatus.bodyOther),
                  cancer: JSON.stringify(this.bodyStatus.cancer),
                  cataract: JSON.stringify(this.bodyStatus.cataract),
                  cerebralInfarction: JSON.stringify(
                    this.bodyStatus.cerebralInfarction
                  ),
                  cholesterol: JSON.stringify(this.bodyStatus.cholesterol),
                  diabetes: JSON.stringify(this.bodyStatus.diabetes),
                  disease: JSON.stringify(this.bodyStatus.disease),
                  dizzy: JSON.stringify(this.bodyStatus.dizzy),
                  drugSensitive: JSON.stringify(this.bodyStatus.drugSensitive),
                  foodAllergy: JSON.stringify(this.bodyStatus.foodAllergy),
                  gout: JSON.stringify(this.bodyStatus.gout),
                  hearingImpairment: JSON.stringify(
                    this.bodyStatus.hearingImpairment
                  ),
                  heart: JSON.stringify(this.bodyStatus.heart),
                  hypertension: JSON.stringify(this.bodyStatus.hypertension),
                  languageBarrier: JSON.stringify(
                    this.bodyStatus.languageBarrier
                  ),
                  lowBlood: JSON.stringify(this.bodyStatus.lowBlood),
                  mental_disorders: JSON.stringify(
                    this.bodyStatus.mental_disorders
                  ),
                  pacemaker: JSON.stringify(this.bodyStatus.pacemaker),
                  parkinson: JSON.stringify(this.bodyStatus.parkinson),
                  pipeInspection: JSON.stringify(
                    this.bodyStatus.pipeInspection
                  ),
                  visualImpairment: JSON.stringify(
                    this.bodyStatus.visualImpairment
                  ),
                  id: this.numbering,
                  name: this.baseInfo.name,
                  nursingId: this.userInfo.nursingId,
                  nursingName: this.userInfo.nursingName
                });
                try {
                  const res = await sendBaseInfo(data);
                  if (res.code === 0) {
                    this.$Notice.success({
                      title: this.$t("oldManMsg.Information.repeat"),
                      duration: 2
                    });
                  }else if(res.code === 421){
                      //该老人ID已存在,无法添加
                      this.$Notice.error({
                        title: this.$t("global.failed"),
                        duration: 2
                      });
                    } else {
                    this.$Notice.error({
                      title: this.$t("global.failed"),
                      duration: 2
                    });
                  }
                } catch (err) {
                  this.$Notice.error({
                    title: this.$t("global.failed"),
                    duration: 2
                  });
                }
              }
            }
          });
          break;
        case 3:
          this.$Modal.confirm({
            title: this.$t("global.reminder"),
            content: this.$t("global.save"),
            okText: this.$t("global.sure"),
            cancelText: this.$t("global.cancel"),
            onOk: async () => {
              const data = Object.assign({}, this.safe, {
                oldId: this.baseInfo.id,
                id: this.safe.id,
                recordId: this.userInfo.adminId,
                recordTime: format(Date.now())
              });
              try {
                const res = await sendSafeInfo(data);
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
              } catch (err) {
                this.$Notice.error({
                  title: this.$t("global.failed"),
                  duration: 2
                });
              }
            }
          });
          break;
        case 4:
          this.contact.forEach(res => {
            res.oldId = this.baseInfo.id;
          });
          this.$Modal.confirm({
            title: this.$t("global.reminder"),
            content: this.$t("global.save"),
            okText: this.$t("global.sure"),
            cancelText: this.$t("global.cancel"),
            onOk: async () => {
              const data = this.contact;
              try {
                const res = await sendContactInfo(data);
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
              } catch (err) {
                this.$Notice.error({
                  title: this.$t("global.failed"),
                  duration: 2
                });
              }
            }
          });
          break;
        case 5:
          this.cohabit.forEach(res => {
            res.oldId = this.baseInfo.id;
          });
          this.$Modal.confirm({
            title: this.$t("global.reminder"),
            content: this.$t("global.save"),
            okText: this.$t("global.sure"),
            cancelText: this.$t("global.cancel"),
            onOk: async () => {
              const data = this.cohabit;
              try {
                const res = await sendCohabitInfo(data);
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
              } catch (err) {
                this.$Notice.error({
                  title: this.$t("global.failed"),
                  duration: 2
                });
              }
            }
          });
          break;
        case 6:
          this.$Modal.confirm({
            title: this.$t("global.reminder"),
            content: this.$t("global.save"),
            okText: this.$t("global.sure"),
            cancelText: this.$t("global.cancel"),
            onOk: async () => {
              if (this.baseInfo.id) {
                //修改老人基本资料
                try {
                  const data = Object.assign({}, this.otherInfo, {
                    id: this.baseInfo.id,
                    name: this.baseInfo.name,
                    nursingId: this.userInfo.nursingId,
                    nursingName: this.userInfo.nursingName,
                    transactionName1: JSON.stringify(
                      this.otherInfo.transactionName1
                    )
                  });
                  const res = await updateBaseInfo(data);
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
                } catch (err) {
                  this.$Notice.error({
                    title: this.$t("global.failed"),
                    duration: 2
                  });
                }
              } else {
                //新增老人
                try {
                  const data = Object.assign({}, this.otherInfo, {
                    id: this.numbering,
                    name: this.baseInfo.name,
                    nursingId: this.userInfo.nursingId,
                    nursingName: this.userInfo.nursingName,
                    transactionName1: JSON.stringify(
                      this.otherInfo.transactionName1
                    )
                  });
                  const res = await sendBaseInfo(data);
                  if (res.code === 0) {
                    this.$Notice.success({
                      title: this.$t("oldManMsg.Information.repeat"),
                      duration: 2
                    });
                  }else if(res.code === 421){
                      //该老人ID已存在,无法添加
                      this.$Notice.error({
                        title: this.$t("global.failed"),
                        duration: 2
                      });
                    } else {
                    this.$Notice.error({
                      title: this.$t("global.failed"),
                      duration: 2
                    });
                  }
                } catch (err) {
                  this.$Notice.error({
                    title: this.$t("global.failed"),
                    duration: 2
                  });
                }

              }
            }
          });
          break;
      }
    },
    handleUploadPhoto(e) {
      //   点击上传
      this.$set(this.baseInfo, "picture", e.data.fileAPUrl);
    },
    handleUploadID(e) {
      this.$set(this.baseInfo, "photoId", e.data.fileAPUrl);
    },
    handleRadioGroup(type, index) {
      ///   处理选择单选框
      const arr = type.split(".");
      if (this[arr[0]][arr[1]] == index) {
        setTimeout(() => {
          this[arr[0]][arr[1]] = "";
        }, 10);
      }
    },
    handleGroup(type, index) {
      ///   处理选择单选框
      const arr = type.split(".");
      if (this[arr[0]][arr[1]].ishave == index) {
        setTimeout(() => {
          this[arr[0]][arr[1]].ishave = "";
        }, 10);
      }
    },
    handleAttention(type) {
      const arr = type.split(".");
      if (this[arr[0]][arr[1]] == "1") {
        setTimeout(() => {
          this[arr[0]][arr[1]] = "2";
        }, 10);
      }
    },
    //        网络请求        //
    async getNewOldmanId() {
      try {
        const res = await getOldmanId({ nursingId: this.userInfo.nursingId });
        if (res.code === 0) {
          this.numbering = res.data;
        } else {
          this.$Notice.error({
            title: "获取老人id失败",
            duration: 2
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async _getBaseInfo(data) {
      try {
        const res = await getBaseInfo(data);
        if (res.code === 0 && res.data.id) {
          this.baseInfo = res.data;
          this.baseInfo.emergencyRelation1 = res.data.emergencyRelation1
            ? JSON.parse(res.data.emergencyRelation1)
            : {
                d1: "",
                d1: "",
                d3: ""
              };
          this.baseInfo.emergencyRelation2 = res.data.emergencyRelation2
            ? JSON.parse(res.data.emergencyRelation2)
            : {
                d1: "",
                d1: "",
                d3: ""
              };
          this.baseInfo.previousHistory1 = res.data.previousHistory1
            ? JSON.parse(res.data.previousHistory1)
            : [["", ""]];
          this.baseInfo.take = res.data.take ? parseInt(res.data.take) : "";
          this.baseInfo.foodLevel = res.data.foodLevel
            ? parseInt(res.data.foodLevel)
            : "";
          this.baseInfo.level = res.data.level ? parseInt(res.data.level) : "";
          this.baseInfo.sex = res.data.sex ? res.data.sex.toString() : "1";
          this.baseInfo.attention = res.data.attention
            ? res.data.attention.toString()
            : "1";
          this.baseInfo.checkInType = res.data.checkInType
            ? res.data.checkInType.toString()
            : "1";
          this.baseInfo.injury = res.data.injury
            ? JSON.parse(res.data.injury)
            : {
                d1: "",
                d1: ""
              };
          this.chartData = res.data.familyStructure
            ? JSON.parse(res.data.familyStructure)
            : {};
          const bodyStatus = {
            infection1: res.data.infection1
              ? res.data.infection1.toString()
              : "",
            infection2: res.data.infection2
              ? res.data.infection2.toString()
              : "",
            infection3: res.data.infection3
              ? res.data.infection3.toString()
              : "",
            infection4: res.data.infection4
              ? res.data.infection4.toString()
              : "",
            infection5: res.data.infection5
              ? res.data.infection5.toString()
              : "",
            allergic1: res.data.allergic1,
            allergic2: res.data.allergic2,
            allergic3: res.data.allergic3,
            // cataract2: res.data.cataract2.toString(),
            // cataract3: res.data.cataract3.toString(),
            // cataract4: res.data.cataract4.toString(),
            actionAbility: res.data.actionAbility
              ? JSON.parse(res.data.actionAbility)
              : [],
            cataract: res.data.cataract
              ? JSON.parse(res.data.cataract)
              : {
                  ishave: "",
                  content: ""
                },
            foodAllergy: res.data.foodAllergy
              ? JSON.parse(res.data.foodAllergy)
              : {
                  ishave: "",
                  content: ""
                },
            drugSensitive: res.data.drugSensitive
              ? JSON.parse(res.data.drugSensitive)
              : {
                  ishave: "",
                  content: ""
                },
            cerebralInfarction: res.data.cerebralInfarction
              ? JSON.parse(res.data.cerebralInfarction)
              : {
                  ishave: "",
                  content: ""
                },
            hypertension: res.data.hypertension
              ? JSON.parse(res.data.hypertension)
              : {
                  ishave: "",
                  content: ""
                },
            lowBlood: res.data.lowBlood
              ? JSON.parse(res.data.lowBlood)
              : {
                  ishave: "",
                  content: ""
                },
            cholesterol: res.data.cholesterol
              ? JSON.parse(res.data.cholesterol)
              : {
                  ishave: "",
                  content: ""
                },
            pipeInspection: res.data.pipeInspection
              ? JSON.parse(res.data.pipeInspection)
              : {
                  ishave: "",
                  content: ""
                },
            parkinson: res.data.parkinson
              ? JSON.parse(res.data.parkinson)
              : {
                  ishave: "",
                  content: ""
                },
            pacemaker: res.data.pacemaker
              ? JSON.parse(res.data.pacemaker)
              : {
                  ishave: "",
                  content: ""
                },
            visualImpairment: res.data.visualImpairment
              ? JSON.parse(res.data.visualImpairment)
              : {
                  ishave: "",
                  content: ""
                },
            hearingImpairment: res.data.hearingImpairment
              ? JSON.parse(res.data.hearingImpairment)
              : {
                  ishave: "",
                  content: ""
                },
            languageBarrier: res.data.languageBarrier
              ? JSON.parse(res.data.languageBarrier)
              : {
                  ishave: "",
                  content: ""
                },
            heart: res.data.heart
              ? JSON.parse(res.data.heart)
              : {
                  ishave: "",
                  content: ""
                },
            languageBarrier: res.data.languageBarrier
              ? JSON.parse(res.data.languageBarrier)
              : {
                  ishave: "",
                  content: ""
                },
            asthma: res.data.asthma
              ? JSON.parse(res.data.asthma)
              : {
                  ishave: "",
                  content: ""
                },
            dizzy: res.data.dizzy
              ? JSON.parse(res.data.dizzy)
              : {
                  ishave: "",
                  content: ""
                },
            diabetes: res.data.diabetes
              ? JSON.parse(res.data.diabetes)
              : {
                  ishave: "",
                  content: ""
                },
            gout: res.data.gout
              ? JSON.parse(res.data.gout)
              : {
                  ishave: "",
                  content: ""
                },
            mental_disorders: res.data.mental_disorders
              ? JSON.parse(res.data.mental_disorders)
              : {
                  ishave: "",
                  content: ""
                },
            alzheimer: res.data.alzheimer
              ? JSON.parse(res.data.alzheimer)
              : {
                  ishave: "",
                  content: ""
                },
            disease: res.data.disease
              ? JSON.parse(res.data.disease)
              : {
                  ishave: "",
                  content: ""
                },
            cancer: res.data.cancer
              ? JSON.parse(res.data.cancer)
              : {
                  ishave: "",
                  content: ""
                },
            bodyOther: res.data.bodyOther
              ? JSON.parse(res.data.bodyOther)
              : {
                  ishave: "",
                  content: ""
                }
          };
          this.bodyStatus = bodyStatus;

          let otherInfo = {
            doctors1Conpany: res.data.doctors1Conpany,
            doctors1Name: res.data.doctors1Name,
            doctors1Phone: res.data.doctors1Phone,
            doctors1Subjects: res.data.doctors1Subjects,
            doctors1Injury: res.data.doctors1Injury,
            doctors2Conpany: res.data.doctors2Conpany,
            doctors2Name: res.data.doctors2Name,
            doctors2Phone: res.data.doctors2Phone,
            doctors2Subjects: res.data.doctors2Subjects,
            doctors2Injury: res.data.doctors2Injury,
            doctors3Conpany: res.data.doctors3Conpany,
            doctors3Name: res.data.doctors3Name,
            doctors3Phone: res.data.doctors3Phone,
            doctors3Subjects: res.data.doctors3Subjects,
            doctors3Injury: res.data.doctors3Injury,
            transactionName1: res.data.transactionName1
              ? JSON.parse(res.data.transactionName1)
              : [{}]
          };
          this.otherInfo = otherInfo;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async _getCohabitInfo() {
      try {
        const res = await getCohabitInfo({
          id: this.oldInfo.oldId
        });
        if (res.code === 0 && res.data.length > 0) {
          this.cohabit = res.data;
        } else {
          this.cohabit = [
            {
              oldId: this.baseInfo.id,
              recordId: this.userInfo.adminId,
              recordTime: format(Date.now())
            }
          ];
        }
      } catch (err) {
        console.log(err);
      }
    },
    async _getContactInfo() {
      try {
        const res = await getContactInfo({
          id: this.oldInfo.oldId
        });
        if (res.code === 0 && res.data.length > 0) {
          this.contact = res.data;
        } else {
          this.contact = [
            {
              age: null,
              oldId: this.baseInfo.id,
              recordId: this.userInfo.adminId,
              recordTime: format(Date.now())
            },
            {
              age: null,
              oldId: this.baseInfo.id,
              recordId: this.userInfo.adminId,
              recordTime: format(Date.now())
            }
          ];
        }
      } catch (err) {
        console.log(err);
      }
    },
    async _getSafeInfo() {
      try {
        const res = await getSafeInfo({
          id: this.oldInfo.oldId
        });
        if (res.code === 0) {
          this.safe = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.table .ivu-input {
  text-align: left !important;
}

td {
  position: relative;
}

.table {
  overflow: auto;
}

.fonts {
  font-size: 0.15rem;
}
</style><style lang="less">
.head_tab {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  font-size: 0.14rem;

  .item {
    // width: 1.2rem;
    // height: 0.38rem;
    // display: block;
    line-height: 0.38rem;
    margin-bottom: 0.1rem;
    padding: 0 0.2rem;
    text-align: center;
    font-size: 0.15rem;
    font-weight: bold;
    color: #333333;
    border-radius: 0.04rem;
    background: #ececec;
    margin-right: 0.3rem;
  }

  .active {
    background: #028174;
    color: #ffffff;
  }
}

.title {
  text-align: left;
  margin-bottom: 0.1rem /* 10/102 */;
  font-size: 0.16rem /* 16/102 */;
  justify-content: flex-end;

  span {
    min-width: 1rem;
  }

  .ivu-input-wrapper {
    width: 20%;
  }
}

.photos {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 0;

  .item {
    margin: 0 0.3rem;
    position: relative;
    font-size: 0.16rem /* 16/102 */;

    .placeholder_block {
      width: 1.5rem;
      height: 2rem;
      background: #fafafa;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      margin-bottom: 0.15rem;
      border: 0.01rem solid #e7e7e7;
    }

    .upload {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;

      .ivu-upload {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.body_status {
  .head-bg {
    width: 1.5rem;
    text-align: left;
  }

  table td {
    text-align: left;
  }
}

.insurance {
  .head-bg {
    width: 1.5rem;
  }
}

.flex .cell {
  margin-right: 0.05rem /* 5/102 */;
  padding: 0.05rem /* 5/102 */ 0;
}

.ivu-radio-group-item {
  margin-right: 0.5rem;
}

.old_man_msg {
  .break {
    white-space: normal;
  }

  input[type="text"] {
    border: 0;
    outline: none;
    font-size: 0.14rem /* 14/102 */;
    width: 100%;
    // height: 0.29rem /* 30/102 */;
  }

  label {
    margin-right: 0.15rem /* 15/102 */;

    input[type="radio"] {
      margin: 0 0.05rem /* 5/102 */;
    }
  }

  textarea {
    resize: none;
    border: 0;
    font-size: 0.14rem;
  }

  .body_status {
    .ivu-input {
      padding: 0;
    }
  }
}

.chart-button {
  text-align: left;
  margin-top: 0.2rem /* 20/102 */;

  button {
    border: 0;
    background: var(--table-bg);
    font-size: 0.15rem /* 15/102 */;
    color: #fff;
    border-radius: 0.05rem /* 5/102 */;
    padding: 0.1rem /* 10/102 */ 0.25rem /* 25/102 */;
  }
}

.chart-relev .relev-item {
  padding: 0.05rem /* 5/102 */ 0;

  label {
    margin-right: 0.1rem /* 10/102 */;

    input {
      margin-right: 0.03rem /* 3/102 */;
    }
  }
}

.chart-relev input {
  border: 0;
  outline: none;
  line-height: 0.34rem /* 35/102 */;
}

#capture {
  padding: 0.2rem /* 20/102 */ 0;

  // overflow-x: scroll;
  .extend_handle {
    width: 0.29rem /* 30/102 */;
    height: 0.29rem /* 30/102 */;
    bottom: 0.17rem /* 17/102 */;
    display: none;
  }

  td {
    padding: 0 0 0.22rem 0;
  }

  .name {
    display: none !important;
  }
}

.chart table {
  width: 100%;
  font-size: 0.14rem /* 14/102 */;

  // .node {
  //   width: 7.5em;

  //   .name {
  //     height: auto !important;
  //   }
  // }

  // .hasMate {
  //   width: 13em;
  //   white-space: nowrap;
  //   overflow: hidden;
  // }
}

.cheshi {
  // width: 100%;
  line-height: 0.29rem;
  height: 0.29rem;
}

.dome {
  display: block !important;
}

.cell-popup {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);

  .img {
    margin: 0 auto;
    padding: 0.29rem;
    background: #fff;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);

    img {
      width: 100%;
    }
  }
}

.node .person .avat {
  border: none !important;
  background: none !important;
}

.handle-button {
  margin-bottom: 0.15rem /* 15/102 */;
  line-height: 0.39rem /* 40/102 */;
  height: 0.39rem /* 40/102 */;

  &:last-child {
    margin: 0;
  }
}
.required {
  color: red;
  margin-left: 1px;
}
</style>
