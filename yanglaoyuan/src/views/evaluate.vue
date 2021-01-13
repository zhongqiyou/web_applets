<template>
<div class="sheet">
  <div class="clear">
    <div class="header-row-two" :class="tabIndex == index ? 'active' : ''" v-for="(item, index) in tabList" :key="index" @click="changeTab(index)">{{$t(item)}}</div>
  </div>
  <div class="trip-title">{{$t(tabList[tabIndex])}}</div>
  <div class="deta_header">
    <!-- 月次功能 -->
    <div class="selectBox" v-show="tabIndex == 0">
      <div class="year">
        <DatePicker class="calendarFont" type="year"  :placeholder="$t('global.choose')" style="100% 100%" :value="occurrenceYear" format="yyyy"  :editable="false" @on-change="onGetYear"></DatePicker>
      </div>
      <div class="occurrenceDay">
        <Select v-model="occurrenceDay" @on-change="onWith" style="width: 100%">
          <Option v-for="item in occurrenceDayList" :value="item.value" :key="item.value" format="yyyy-MM-dd">{{ item.value}}</Option>
        </Select>
      </div>
    </div>

    <!-- <div class="modifyDay"  >
      作成日：<DatePicker class="calendarFont" style="100% 100%" v-model="modifyDay"></DatePicker>
    </div> -->

  </div>
  <!-- 基本信息&同意 start -->
  <table v-show="tabIndex == 0 || tabBlock[0] == 0" class="table new-table table-padding" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;overflow:auto;">
    <tr>
      <td colspan="1" class="head-bg" style="white-space:nowrap;">{{$t('evaluate.essentialInfo.passport')}}</td>
      <td colspan="1" class="text_size" style="white-space: nowrap;text-align:center;width:1.6rem;">
        <Col span="12" style="width:100%;">
        <DatePicker class="new-width-input-date calendarFont" type="date" :editable="false" :value="old_info.infoDate" format="yyyy-MM-dd" :placeholder="$t('global.choose')" style="width:100%;position:relative;" @on-change="old_info.infoDate = $event"></DatePicker>
        </Col>
      </td>
      <td colspan="1" class="head-bg" style="white-space:nowrap;">{{$t('evaluate.essentialInfo.nurse')}}</td>
      <td colspan="1" style="width:1.1rem;">
        <Input type="textarea" autosize class="new-width-input " v-model="old_info.infoPassport" />
      </td>
      <td colspan="1" class="head-bg" style="white-space:nowrap;">{{$t('serviceMetting.consultant')}}</td>
      <td colspan="1" style="width:1.1rem;">
        <Input type="textarea" autosize class="new-width-input " v-model="old_info.infoNurse" style="width: 100%;" />
      </td>
      <td colspan="1" class="head-bg" style="white-space:nowrap;">{{$t('evaluate.essentialInfo.consultant')}}</td>
      <td colspan="2" style="width:1rem;">
        <Input type="textarea" autosize class="new-width-input " v-model="old_info.infoConsult" style="width: 100%;padding:none;" />
      </td>
      <td colspan="1" class="head-bg">ｹｱﾏﾈ</td>
      <td colspan="2" style="width:1rem;">
        <Input type="textarea" autosize class="new-width-input " v-model="old_info.infoJp" style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg" style="white-space:nowrap;">{{$t('evaluate.essentialInfo.filmName')}}</td>
      <td colspan="4">
        {{nikeName}}
      </td>
      <td colspan="3" class="head-bg">{{$t('evaluate.essentialInfo.dateOfBirth')}}</td>
      <td colspan="3" class="head-bg">{{$t('evaluate.new.Use_s')}}</td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg">{{$t('global.name')}}</td>
      <td colspan="4">
        {{oldName}}
      </td>
      <td colspan="3" style="text-align:center;">
        <div class="flex">
          <div style="width:1.2rem;">{{oldDate}}</div>
          (
          {{oldAge}} 
          ){{$t("JixuVoteMeeting.years")}}
        </div>
      </td>
      <td colspan="3" style="text-align:center;">
        {{checkinDate}}
      </td>
    </tr>
    <tr>
      <td colspan="1" class="head-bg">{{$t('evaluate.essentialInfo.gender')}}</td>
      <td colspan="2" class="head-bg">{{$t('evaluate.essentialInfo.nursing')}}</td>
      <td colspan="2" class="head-bg">{{$t('evaluate.essentialInfo.identification')}}</td>
      <td colspan="2" class="head-bg">{{$t('evaluate.essentialInfo.effective')}}</td>
      <td colspan="1" class="head-bg">{{$t('evaluate.essentialInfo.independence')}}</td>
      <td colspan="1" class="head-bg">{{$t('evaluate.essentialInfo.understanding')}}</td>
      <td colspan="1" class="head-bg">{{$t('evaluate.essentialInfo.height')}}</td>
      <td colspan="1" class="head-bg">{{$t('evaluate.essentialInfo.weight')}}</td>
      <td colspan="1" class="head-bg">BMI </td>
    </tr>
    <tr>
      <td colspan="1" style="text-align:center;">
        <!-- <Input type="textarea" autosize class="" v-model="this.oldSex" /> -->
        {{$t(oldSex)}}
      </td>
      <td colspan="2" style="text-align:center;white-space:nowrap;">
        <!-- <Input type="textarea" autosize class="" v-model="old_info.infoNursingLevel" /> -->
         {{level_arr[level-1]}}
      </td>
      <td colspan="2" style="text-align:center">
      
        <Col span="12" style="width:100%;">
        <DatePicker class="new-width-input-date calendarFont" type="date" :editable="false" :value="old_info.infoConfirmDate" :placeholder="$t('global.choose')" style="width:100%;position:relative;" @on-change="old_info.infoConfirmDate = $event"></DatePicker>
        </Col>
      </td>
      <td colspan="2" tyle="text-align:center">
        <div style="white-space: nowrap;">
        
          <Col span="12" style="width:100%;">
          <DatePicker class="new-width-input-date calendarFont" type="date" :editable="false" :value="old_info.infoValidityB" :placeholder="$t('global.choose')" style="width:1.5rem;position:relative;" @on-change="old_info.infoValidityB = $event"></DatePicker>
          </Col>
        </div>
        <div style="text-align:center;">～</div>
        <div style="white-space: nowrap;">
         
          <Col span="12" style="width:100%;">
          <DatePicker class="new-width-input-date calendarFont" type="date" :editable="false" :value="old_info.infoValidityE" :placeholder="$t('global.choose')" style="width:1.5rem;position:relative;" @on-change="old_info.infoValidityE = $event"></DatePicker>
          </Col>
        </div>
      </td>
      <td colspan="1">
        <Input type="textarea" autosize class="new-width-input " v-model="old_info.infoSelfReliance" />
      </td>
      <td colspan="1">
        <Input type="textarea" autosize class="" v-model="old_info.infoPerception" />
      </td>
      <td colspan="1" style="white-space: nowrap;">
        <Input type="textarea" autosize v-model="old_info.infoStature" class=" new-width-input" maxlength="6" style="width:0.5rem" />cm
      </td>
      <td colspan="1" style="white-space: nowrap;">
        <Input type="textarea" autosize v-model="old_info.infoWeight" class=" new-width-input" maxlength="6" style="width:0.5rem" />kg
      </td>
      <td colspan="1" style="text-align:center;">
        <!-- <Input
            type="textarea"
            autosize
            class=""
            style="width:0.32rem"
            v-model="old_info.infoBmi"
          /> -->
        {{autoBMI}}
      </td>
    </tr>
  </table>
  <table v-show="tabIndex == 0 || tabBlock[0] == 0" class="table new-table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
    <tr>
      <td class="head-bg" rowspan="2" style="width: 0.5rem;">{{$t('evaluate.essentialInfo.agree')}}</td>
      <td class="head-bg">{{$t('evaluate.essentialInfo.me')}}</td>
      <td colspan="10">
        <Input type="textarea" autosize class="new-width-input" v-model="old_info.confirmSelf" style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.essentialInfo.family')}}</td>
      <td colspan="10">
        <Input type="textarea" autosize v-model="old_info.confirmFamily" class="new-width-input" style="width: 100%;" />
      </td>
    </tr>
  </table>
  <!-- 基本信息&同意 end -->

  <!-- 食事&服药 start -->
  <table v-show="tabIndex == 1 || tabBlock[1] == 1" class="table new-table new-table-padding" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
    <tr>
      <th rowspan="22" class="head-bg" style="width: 0.5rem;">{{$t('evaluate.foodMedicine.eating')}}</th>
      <th colspan="3" class="head-bg">{{$t('evaluate.foodMedicine.food')}}</th>
      <th class="head-bg">{{$t('evaluate.foodMedicine.stapleFood')}}</th>
      <th colspan="1" class="head-bg">{{$t('evaluate.foodMedicine.dessert')}}</th>
      <th colspan="1" class="head-bg">{{$t('evaluate.foodMedicine.moisture')}}</th>
      <th colspan="2" class="head-bg">{{$t('evaluate.foodMedicine.injectFood')}}</th>
    </tr>
    <tr>
      <td colspan="2">{{$t('evaluate.foodMedicine.rice')}}</td>
      <td colspan="1">{{$t('evaluate.foodMedicine.bread')}}</td>
      <td colspan="1">{{$t('evaluate.bathingChanging.bear')}}</td>
      <td colspan="1">{{$t('evaluate.bathingChanging.bear')}}</td>
      <td colspan="1">{{$t('evaluate.bathingChanging.waterBear')}}</td>
      <td colspan="1">{{$t('evaluate.foodMedicine.content')}}</td>
      <td colspan="1">{{$t('evaluate.foodMedicine.soup')}}</td>
    </tr>
    <tr>
      <td colspan="2">
        <CheckboxGroup v-model="old_eat.eatRice" class="fontS">
          <Checkbox label="0">{{$t('evaluate.foodMedicine.riceT')}}</Checkbox>
          <Checkbox label="1">{{$t('evaluate.foodMedicine.small')}}</Checkbox>
          <Checkbox label="2">{{$t('evaluate.foodMedicine.medium')}}</Checkbox>
          <Checkbox label="3">{{$t('evaluate.foodMedicine.large')}}</Checkbox>
          <Checkbox label="4">{{$t('evaluate.foodMedicine.porridge')}}</Checkbox>
          <Checkbox label="5">{{$t('evaluate.foodMedicine.blender')}}</Checkbox>
          <Checkbox label="6">{{$t('evaluate.foodMedicine.riceBall')}}</Checkbox>
          <Checkbox label="7">{{$t('evaluate.foodMedicine.other')}}</Checkbox>
        </CheckboxGroup>
      </td>
      <td colspan="1">
        <CheckboxGroup v-model="old_eat.eatBread" class="fontS">
          <Checkbox label="0" style="white-space: nowrap;">{{$t('evaluate.foodMedicine.eaten')}}</Checkbox>
          <Checkbox label="1">{{$t('evaluate.foodMedicine.notEat')}}</Checkbox>
          <Checkbox label="2">{{$t('evaluate.foodMedicine.porridgeBread')}}</Checkbox>
          <Checkbox label="3">{{$t('evaluate.foodMedicine.other')}}</Checkbox>
        </CheckboxGroup>
      </td>
      <td colspan="1">
        <CheckboxGroup v-model="old_eat.eatViceForm" class="fontS">
          <Checkbox label="0">{{$t('evaluate.foodMedicine.asIs')}}</Checkbox>
          <Checkbox label="1">{{$t('evaluate.foodMedicine.chunk')}}</Checkbox>
          <Checkbox label="2">{{$t('evaluate.foodMedicine.rough')}}</Checkbox>
          <Checkbox label="3">{{$t('evaluate.foodMedicine.fine')}}</Checkbox>
          <Checkbox label="4">{{$t('evaluate.foodMedicine.mixing')}}</Checkbox>
          <Checkbox label="5">{{$t('evaluate.foodMedicine.stirring')}}</Checkbox>
          <Checkbox label="6">{{$t('evaluate.foodMedicine.other')}}</Checkbox>
        </CheckboxGroup>
      </td>
      <td colspan="1">
        <CheckboxGroup v-model="old_eat.eatDessertForm" class="fontS">
          <Checkbox label="0">{{$t('evaluate.foodMedicine.asIs')}}</Checkbox>
          <Checkbox label="1">{{$t('evaluate.foodMedicine.chunk')}}</Checkbox>
          <Checkbox label="2">{{$t('evaluate.foodMedicine.yam')}}</Checkbox>
          <Checkbox label="3">{{$t('evaluate.foodMedicine.turkey')}}</Checkbox>
          <Checkbox label="4">{{$t('evaluate.foodMedicine.other')}}</Checkbox>
        </CheckboxGroup>
      </td>
      <td colspan="1">
        <CheckboxGroup v-model="old_eat.eatWater" class="fontS">
          <Checkbox label="0">{{$t('evaluate.new.Trolley')}}</Checkbox>
          <Checkbox label="1">{{$t('evaluate.new.Tromi')}}</Checkbox>
          <Checkbox label="2">{{$t('evaluate.foodMedicine.weaken')}}</Checkbox>
          <Checkbox label="3">{{$t('evaluate.foodMedicine.moderate')}}</Checkbox>
          <Checkbox label="4">{{$t('evaluate.foodMedicine.strengthen')}}</Checkbox>
          <Checkbox label="5">{{$t('evaluate.foodMedicine.other')}}</Checkbox>
        </CheckboxGroup>
      </td>
      <td colspan="1">
    <tr>
      <td>{{$t('evaluate.foodMedicine.towards')}}</td>
      <td>
        <Input type="textarea" autosize class="new-width-input new-min-width-input " v-model="old_eat.eatInjectContent.contentT" style="width: 0.3rem;" />
      </td>
    </tr>
    <tr>
      <td>{{$t('evaluate.foodMedicine.day')}}</td>
      <td>
        <Input type="textarea" autosize class="new-width-input new-min-width-input " v-model="old_eat.eatInjectContent.contentD" style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td>{{$t('evaluate.foodMedicine.xi')}}</td>
      <td>
        <Input type="textarea" autosize class="new-width-input new-min-width-input " v-model="old_eat.eatInjectContent.contentE" style="width: 100%;" />
      </td>
    </tr>
    </td>
    <td>
      <tr>
        <td>
          <Input type="textarea" autosize class="new-width-input new-min-width-input " v-model="old_eat.eatSoup.contentT" style="width: 0.5rem;" />
        </td>
      </tr>
      <tr>
        <td>
          <Input type="textarea" autosize class="new-width-input new-min-width-input " v-model="old_eat.eatSoup.contentD" style="width: 100%;" />
        </td>
      </tr>
      <tr>
        <td>
          <Input type="textarea" autosize class="new-width-input new-min-width-input " v-model="old_eat.eatSoup.contentE" style="width: 100%;" />
        </td>
      </tr>
    </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="2">{{$t('evaluate.foodMedicine.injectionTime')}}</td>
      <td colspan="6" style="white-space: nowrap;">
        {{$t('evaluate.foodMedicine.towards')}}[
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatInjectTime[0].dateS" class="new-width-input " style="width: 6%;" />:
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatInjectTime[0].dateE" class="new-width-input " style="width: 6%;" />
        <span class="space">]</span>
        {{$t('evaluate.foodMedicine.day')}}[
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatInjectTime[1].dateS" class="new-width-input " style="width: 6%;" />:
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatInjectTime[1].dateE" class="new-width-input " style="width: 6%;" />
        <span class="space">]</span>
        {{$t('evaluate.foodMedicine.xi')}}[
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatInjectTime[2].dateS" class="new-width-input " style="width: 6%;" />:
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatInjectTime[2].dateE" class="new-width-input " style="width: 6%;" />
        <span class="space">]</span>
        {{$t('evaluate.foodMedicine.dessert')}}[
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatInjectTime[3].dateS" class="new-width-input " style="width: 6%;" />:
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatInjectTime[3].dateE" class="new-width-input " style="width: 6%;" />]
        [
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatInjectTime[4].dateS" class="new-width-input " style="width: 6%;" />:
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatInjectTime[4].dateE" class="new-width-input " style="width: 6%;" />]

      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg">{{$t('evaluate.new.Food_time')}}</td>
      <td colspan="6" style="white-space: nowrap;">
        {{$t('evaluate.foodMedicine.towards')}}[
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatEatTime[0].dateS" class="new-width-input " style="width: 6%;" />:
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatEatTime[0].dateE" class="new-width-input " style="width: 6%;" />
        <span class="space">]</span>
        {{$t('evaluate.foodMedicine.day')}}[
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatEatTime[1].dateS" class="new-width-input " style="width: 6%;" />:
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatEatTime[1].dateE" class="new-width-input " style="width: 6%;" />
        <span class="space">]</span>
        {{$t('evaluate.foodMedicine.xi')}}[
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatEatTime[2].dateS" class="new-width-input " style="width: 6%;" />:
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatEatTime[2].dateE" class="new-width-input " style="width: 6%;" />
        <span class="space">]</span>
        {{$t('evaluate.foodMedicine.dessert')}}[
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatEatTime[3].dateS" class="new-width-input " style="width: 6%;" />:
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatEatTime[3].dateE" class="new-width-input " style="width: 6%;" />]
        [
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatEatTime[4].dateS" class="new-width-input " style="width: 6%;" />:
        <Input type="textarea" autosize maxlength="2" v-model="old_eat.eatEatTime[4].dateE" class="new-width-input " style="width: 6%;" />]

      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg">{{$t('evaluate.foodMedicine.eat')}}</td>
      <td colspan="6">

        <RadioGroup v-model="old_eat.eatEat">
          <!-- <label><input type="radio" value="0" @click="onEatEatNull" v-model="old_eat.eatEat" class="radio-middle"/>{{$t('evaluate.foodMedicine.reliance')}}</label>
            <label  class="label-margin-left"><input type="radio" value="1" @click="onEatEatNull" v-model="old_eat.eatEat" class="radio-middle"/>{{$t('evaluate.foodMedicine.guard')}}</label>
            <label  class="label-margin-left"><input type="radio" value="2" @click="onEatEatNull" v-model="old_eat.eatEat" class="radio-middle"/>{{$t('evaluate.foodMedicine.partial')}}</label>
            <label  class="label-margin-left"><input type="radio" value="3" @click="onEatEatNull" v-model="old_eat.eatEat" class="radio-middle"/>{{$t('evaluate.foodMedicine.allAssistance')}}</label>
            <label  class="label-margin-left"><input type="radio" value="4" @click="onEatEatNull" v-model="old_eat.eatEat" class="radio-middle"/>{{$t('evaluate.foodMedicine.implemented')}}</label> -->
          <Radio label="0" @mouseup.native="onEatEatNull('0')">{{$t('evaluate.foodMedicine.reliance')}}</Radio>
          <Radio label="1" @mouseup.native="onEatEatNull('1')">{{$t('evaluate.foodMedicine.guard')}}</Radio>
          <Radio label="2" @mouseup.native="onEatEatNull('2')">{{$t('evaluate.foodMedicine.partial')}}</Radio>
          <Radio label="3" @mouseup.native="onEatEatNull('3')">{{$t('evaluate.foodMedicine.allAssistance')}}</Radio>
          <Radio label="4" @mouseup.native="onEatEatNull('4')">{{$t('evaluate.foodMedicine.implemented')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td colspan="1" class="head-bg"></td>
      <td colspan="1" class="head-bg">{{$t('evaluate.foodMedicine.readyWork')}}</td>
      <td colspan="6" class="head-bg">{{$t('evaluate.foodMedicine.preparationFood')}}</td>
    </tr>
    <tr>
      <td colspan="1" class="head-bg">{{$t('evaluate.foodMedicine.stroke')}}</td>

      <td colspan="1" class="head-bg">
        <!-- <Input
            type="textarea"
            autosize
            v-model="old_eat.eatProcess.content1"
            class="new-width-input "
            style="width: 100%;"
          /> -->
        {{$t('evaluate.new.xingc1')}}
      </td>
      <td colspan="1" class="head-bg">
        {{$t('evaluate.new.xingc2')}}
        <!-- <Input
            type="textarea"
            autosize
            v-model="old_eat.eatProcess.content2"
            class="new-width-input "
            style="width: 100%;"
          /> -->
      </td>
      <td colspan="1" class="head-bg">
        {{$t('evaluate.new.xingc3')}}
        <!-- <Input
            type="textarea"
            autosize
            v-model="old_eat.eatProcess.content3"
            class="new-width-input "
            style="width: 100%;"
          /> -->
      </td>
      <td colspan="1" class="head-bg">
        {{$t('evaluate.new.xingc4')}}
        <!-- <Input
            type="textarea"
            autosize
            v-model="old_eat.eatProcess.content4"
            class="new-width-input "
            style="width: 100%;"
          /> -->
      </td>
      <td colspan="1" class="head-bg">
        {{$t('evaluate.new.xingc5')}}
        <!-- <Input
            type="textarea"
            autosize
            v-model="old_eat.eatProcess.content5"
            class="new-width-input "
            style="width: 100%;"
          /> -->
      </td>
      <td colspan="1" class="head-bg">
        {{$t('evaluate.new.xingc6')}}
        <!-- <Input
            type="textarea"
            autosize
            v-model="old_eat.eatProcess.content6"
            class="new-width-input "
            style="width: 100%;"
          /> -->
      </td>
      <td colspan="1" class="head-bg">
        {{$t('evaluate.new.xingc7')}}
        <!-- <Input
            type="textarea"
            autosize
            v-model="old_eat.eatProcess.content7"
            class="new-width-input "
            style="width: 100%;"
          /> -->
      </td>
    </tr>
    <tr>
      <td colspan="1" class="head-bg">{{$t('evaluate.foodMedicine.statusQuo')}}</td>
      <td colspan="1">
        <Input type="textarea" autosize v-model="old_eat.eatSituation.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="1">
        <Input type="textarea" autosize v-model="old_eat.eatSituation.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="1">
        <Input type="textarea" autosize v-model="old_eat.eatSituation.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="1">
        <Input type="textarea" autosize v-model="old_eat.eatSituation.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="1">
        <Input type="textarea" autosize v-model="old_eat.eatSituation.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="1">
        <Input type="textarea" autosize v-model="old_eat.eatSituation.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="1">
        <Input type="textarea" autosize v-model="old_eat.eatSituation.content7" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td colspan="1" class="head-bg">{{$t('evaluate.foodMedicine.prospect')}}</td>
      <td colspan="1">
        <Input type="textarea" autosize v-model="old_eat.eatExpect.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="1">
        <Input type="textarea" autosize v-model="old_eat.eatExpect.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="1">
        <Input type="textarea" autosize v-model="old_eat.eatExpect.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="1">
        <Input type="textarea" autosize v-model="old_eat.eatExpect.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="1">
        <Input type="textarea" autosize v-model="old_eat.eatExpect.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="1">
        <Input type="textarea" autosize v-model="old_eat.eatExpect.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="1">
        <Input type="textarea" autosize v-model="old_eat.eatExpect.content7" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg">{{$t('evaluate.foodMedicine.mealTime')}}</td>
      <td colspan="4">
        <RadioGroup v-model="old_eat.eatTimeFixed">
          <Radio label="0" @mouseup.native="oneatTimeFixedNull('0')">{{$t('evaluate.mobileTrauma.none')}}</Radio>
          <Radio label="1" @mouseup.native="oneatTimeFixedNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          <Radio label="2" @mouseup.native="oneatTimeFixedNull('2')">{{$t('evaluate.mobileTrauma.goodBad')}}</Radio>
        </RadioGroup>
      </td>
      <td colspan="2" class="head-bg">{{$t('evaluate.foodMedicine.subject')}}</td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg" rowspan="1">{{$t('evaluate.foodMedicine.swallowing')}}</td>
      <td colspan="4" rowspan="1">
        <RadioGroup v-model="old_eat.eatSwallow">
          <Radio label="0" @mouseup.native="oneatSwallowNull('0')">{{$t('evaluate.foodMedicine.good')}}</Radio>
          <Radio label="1" @mouseup.native="oneatSwallowNull('1')">{{$t('evaluate.new.Mujo')}}</Radio>
          <Radio label="2" @mouseup.native="oneatSwallowNull('2')">{{$t('evaluate.foodMedicine.takeOrally')}}</Radio>
        </RadioGroup>
      </td>
      <td colspan="2" rowspan="10">
        <i-input type="textarea" :autosize="{minRows: 20}" v-model="old_eat.eatSpecialSubject"  :placeholder="$t('evaluate.foodMedicine.enter')"></i-input>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg" rowspan="1">{{$t('evaluate.foodMedicine.eatingUtensils')}}</td>
      <td colspan="4" rowspan="1">
        <CheckboxGroup v-model="old_eat.eatEatTool">
          <Checkbox label="0">{{$t('evaluate.new.Chopsticks')}}</Checkbox>
          <Checkbox label="1">{{$t('evaluate.new.Spoon')}}</Checkbox>
          <Checkbox label="2">{{$t('evaluate.new.Folk')}}</Checkbox>
        </CheckboxGroup>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg" rowspan="1">{{$t('evaluate.foodMedicine.appliances')}}</td>
      <td colspan="4" rowspan="1">
        <RadioGroup v-model="old_eat.eatWaterTool.bool">
          <Radio label="0" @mouseup.native="oneatWaterToolNull('0')">{{$t('evaluate.foodMedicine.cups')}}</Radio>
          [<Input type="textarea" autosize class="new-width-input " style="width: 30%;" v-model="old_eat.eatWaterTool.content" />]
          <Radio label="1" @mouseup.native="oneatWaterToolNull('1')">{{$t('evaluate.foodMedicine.straw')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg" rowspan="1">{{$t('evaluate.foodMedicine.restrictions')}}</td>
      <td colspan="4" rowspan="1">
        <RadioGroup v-model="old_eat.eatEatLimit.bool">
          <Radio label="0" @mouseup.native="oneatEatLimitlNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
          <Radio label="1" @mouseup.native="oneatEatLimitlNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          [<Input type="textarea" autosize class="new-width-input " style="width: 30%;" v-model="old_eat.eatEatLimit.content" />]
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg" rowspan="1">{{$t('evaluate.new.Water_l')}}</td>
      <td colspan="4" rowspan="1">
        <RadioGroup v-model="old_eat.eatWaterLimit.bool">
          <Radio label="0" @mouseup.native="oneatWaterLimitNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
          <Radio label="1" @mouseup.native="oneatWaterLimitNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          [<Input type="textarea" autosize class="new-width-input " style="width: 30%;" v-model="old_eat.eatWaterLimit.content" />]
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg" rowspan="1">{{$t('evaluate.foodMedicine.salt')}}</td>

      <td colspan="4" rowspan="1">
        <RadioGroup v-model="old_eat.eatSaltLimit.bool">
          <Radio label="0" @mouseup.native="oneatSaltLimitNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
          <Radio label="1" @mouseup.native="oneatSaltLimitNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          [<Input type="textarea" autosize class="new-width-input " style="width: 30%;" v-model="old_eat.eatSaltLimit.content" />]
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg" rowspan="1">{{$t('evaluate.foodMedicine.sugar')}}</td>
      <td colspan="4" rowspan="1">
        <RadioGroup v-model="old_eat.eatSugarLimit.bool">
          <Radio label="0" @mouseup.native="oneatSugarLimitNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
          <Radio label="1" @mouseup.native="oneatSugarLimitNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          [<Input type="textarea" autosize class="new-width-input " style="width: 30%;" v-model="old_eat.eatSugarLimit.content" />]
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg" rowspan="1">{{$t('evaluate.foodMedicine.foodSupply')}}</td>
      <td colspan="4" rowspan="1">
        <RadioGroup v-model="old_eat.eatStapleOffer.bool">
          <Radio label="0" @mouseup.native="oneatStapleOfferNull('0')">{{$t('evaluate.foodMedicine.many')}}</Radio>
          <Radio label="1" @mouseup.native="oneatStapleOfferNull('1')">{{$t('evaluate.foodMedicine.ordinary')}}</Radio>
          <Radio label="2" @mouseup.native="oneatStapleOfferNull('2')">
            [<Input type="textarea" autosize class="new-width-input " style="width: 30%;" v-model="old_eat.eatStapleOffer.content" />]
            {{$t('evaluate.foodMedicine.cut')}}
          </Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg" rowspan="1">{{$t('evaluate.foodMedicine.stapleSupply')}}</td>
      <td colspan="4" rowspan="1">
        <RadioGroup v-model="old_eat.eatViceOffer.bool">
          <Radio label="0" @mouseup.native="oneatViceOfferNull('0')">{{$t('evaluate.foodMedicine.many')}}</Radio>
          <Radio label="1" @mouseup.native="oneatViceOfferNull('1')">{{$t('evaluate.foodMedicine.ordinary')}}</Radio>
          <Radio label="2" @mouseup.native="oneatViceOfferNull('2')">
            [<Input type="textarea" autosize class="new-width-input " style="width: 30%;" v-model="old_eat.eatViceOffer.content" />]
            {{$t('evaluate.foodMedicine.cut')}}
          </Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg" rowspan="1">{{$t('evaluate.bathingChanging.temperatureWater')}}</td>
      <td colspan="4" rowspan="1">
        <RadioGroup v-model="old_eat.eatWaterTemperature">
          <Radio label="0" @mouseup.native="oneatWaterTemperatureNull('0')">{{$t('evaluate.foodMedicine.heat')}}</Radio>
          <Radio label="1" @mouseup.native="oneatWaterTemperatureNull('1')">{{$t('evaluate.foodMedicine.temperature')}}</Radio>
          <Radio label="2" @mouseup.native="oneatWaterTemperatureNull('2')">{{$t('evaluate.foodMedicine.cold')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg">{{$t('evaluate.foodMedicine.waterIntake')}}</td>
      <td colspan="6" rowspan="1">
        {{$t('evaluate.foodMedicine.towards')}}[
        <Input type="textarea" autosize v-model="old_eat.eatWaterUptake[0]" class="new-width-input " style="width: 10%;" maxlength="4" />
        <span class="space"> ml]</span>
        {{$t('evaluate.foodMedicine.day')}}[
        <Input type="textarea" autosize v-model="old_eat.eatWaterUptake[1]" class="new-width-input " style="width: 10%;" maxlength="4" />
        <span class="space"> ml]</span>
        {{$t('evaluate.foodMedicine.xi')}}[
        <Input type="textarea" autosize v-model="old_eat.eatWaterUptake[2]" class="new-width-input " style="width: 10%;" maxlength="4" />
        <span class="space"> ml]</span>
        {{$t('evaluate.bathingChanging.snacks')}}[
        <Input type="textarea" autosize v-model="old_eat.eatWaterUptake[3]" class="new-width-input " style="width: 10%;" maxlength="4" />
        <span class="space"> ml]</span>
      </td>
    </tr>
  </table>
  <table v-show="tabIndex == 1 || tabBlock[1] == 1" class="table new-table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
    <tr>
      <td rowspan="3" class="head-bg" style="width: 0.5rem;">{{$t('evaluate.foodMedicine.medicine')}}</td>
      <td colspan="2" class="head-bg">{{$t('evaluate.foodMedicine.medicine')}}</td>
      <td colspan="4" style="white-space:nowrap;">
        <RadioGroup v-model="old_eat.medicineTake">
          <Radio label="0" @mouseup.native="onmedicineTakeNull('0')">{{$t('evaluate.foodMedicine.reliance')}}</Radio>
          <Radio label="1" @mouseup.native="onmedicineTakeNull('1')">{{$t('evaluate.foodMedicine.guard')}}</Radio>
          <Radio label="2" @mouseup.native="onmedicineTakeNull('2')">{{$t('evaluate.foodMedicine.partial')}}</Radio>
          <Radio label="3" @mouseup.native="onmedicineTakeNull('3')">{{$t('evaluate.foodMedicine.allAssistance')}}</Radio>
          <Radio label="4" @mouseup.native="onmedicineTakeNull('4')">{{$t('evaluate.foodMedicine.implemented')}}</Radio>
        </RadioGroup>
      </td>
      <td colspan="2">{{$t('evaluate.bathingChanging.specialNotes')}}</td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg">{{$t('evaluate.foodMedicine.confirmationSure')}}</td>
      <td colspan="4">
        <RadioGroup v-model="old_eat.medicineConfirm">
          <Radio label="0" @mouseup.native="onmedicineConfirmNull('0')">{{$t('evaluate.new.Hand_o_d_c')}}</Radio>
          <Radio label="1" @mouseup.native="onmedicineConfirmNull('1')">{{$t('evaluate.foodMedicine.putMouth')}}</Radio>
          <Radio label="2" @mouseup.native="onmedicineConfirmNull('2')">{{$t('evaluate.foodMedicine.injection')}}</Radio>
          <Radio label="3" @mouseup.native="onmedicineConfirmNull('3')">{{$t('evaluate.foodMedicine.dont')}}</Radio>
        </RadioGroup>
      </td>
      <td rowspan="2">
        <i-input type="textarea" :autosize="{minRows: 3}" v-model="old_eat.medicineSpeSub"  :placeholder="$t('evaluate.foodMedicine.enter')"></i-input>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="head-bg">{{$t('evaluate.foodMedicine.managementSelf')}}</td>
      <td colspan="4">
        <RadioGroup v-model="old_eat.medicineSelfAdmin">
          <Radio label="0" @mouseup.native="onmedicineSelfAdminNull('0')">{{$t('evaluate.new.Manage_a')}}</Radio>
          <Radio label="1" @mouseup.native="onmedicineSelfAdminNull('1')">{{$t('evaluate.foodMedicine.tablespoon')}}</Radio>
          <Radio label="2" @mouseup.native="onmedicineSelfAdminNull('2')">{{$t('evaluate.foodMedicine.fork')}}</Radio>
          <Radio label="3" @mouseup.native="onmedicineSelfAdminNull('3')">{{$t('evaluate.new.management_one')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
  </table>
  <!-- 食事&服药 end -->
  <div class="move">
    <!-- 移动&褥瘡危険因子の評価 start -->
    <table v-show="tabIndex == 2 || tabBlock[2] == 2" class="table new-table new-table-padding" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
      <tr>
        <td class="head-bg" rowspan="14" style="width: 0.5rem;">{{$t('evaluate.mobileTrauma.mobile')}}</td>
        <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.appliancesUse')}}</td>
        <td colspan="9">
          <RadioGroup v-model="old_move.moveTool.bool">
            <Radio label="0" @mouseup.native="onmoveToolNull('0')">{{$t('evaluate.mobileTrauma.helpBar')}}</Radio>
            <Radio label="1" @mouseup.native="onmoveToolNull('1')">{{$t('evaluate.foodMedicine.other')}}</Radio>
            [<Input type="textarea" autosize v-model="old_move.moveTool.content" class="new-width-input " style="width: 30%;" />]
          </RadioGroup>
        </td>
        <td colspan="10" class="head-bg">{{$t('evaluate.foodMedicine.subject')}}</td>
      </tr>
      <tr>
        <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.transformation')}}</td>
        <td colspan="9">
          <RadioGroup v-model="old_move.moveTransform.bool">
            <Radio label="0" @mouseup.native="onmoveTransformNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onmoveTransformNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
            [<Input type="textarea" autosize v-model="old_move.moveTransform.content" class="new-width-input " style="width: 20%;" />
            {{$t('evaluate.mobileTrauma.everyTime')}}]
          </RadioGroup>
        </td>
        <td colspan="10" rowspan="4">
          <i-input type="textarea" :autosize="{minRows: 8}"   class="" v-model="old_move.moveSpeSubA" :placeholder="$t('evaluate.foodMedicine.enter')"></i-input>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.inductionPad')}}</td>
        <td colspan="9">
          <RadioGroup v-model="old_move.moveReaction">
            <Radio label="0" @mouseup.native="onmoveReactionNull('0')">{{$t('evaluate.mobileTrauma.standUp')}}</Radio>
            <Radio label="1" @mouseup.native="onmoveReactionNull('1')">{{$t('evaluate.mobileTrauma.getUP')}}</Radio>
            <Radio label="2" @mouseup.native="onmoveReactionNull('2')">{{$t('evaluate.mobileTrauma.unused')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.methodMoving')}}</td>
        <td colspan="9">
          <RadioGroup v-model="old_move.moveMeans">
            <Radio label="0" @mouseup.native="onmoveMeansNull('0')">{{$t('evaluate.mobileTrauma.walk')}}</Radio>
            <Radio label="1" @mouseup.native="onmoveMeansNull('1')">{{$t('evaluate.mobileTrauma.wheelchairSelf')}}</Radio>
            <Radio label="2" @mouseup.native="onmoveMeansNull('2')">{{$t('evaluate.mobileTrauma.wheelchairAssisted')}}</Radio>
            <Radio label="3" @mouseup.native="onmoveMeansNull('3')">{{$t('evaluate.new.Reclining_w')}}</Radio>
            <Radio label="4" @mouseup.native="onmoveMeansNull('4')">{{$t('evaluate.mobileTrauma.stretcher')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.assistantMobile')}}</td>
        <td colspan="9">
          <RadioGroup v-model="old_move.moveAssist">
            <Radio label="0" @mouseup.native="onmoveAssistNull('0')">{{$t('evaluate.new.wu')}}</Radio>
            <Radio label="1" @mouseup.native="onmoveAssistNull('1')">{{$t('evaluate.mobileTrauma.crutch')}}</Radio>
            <Radio label="2" @mouseup.native="onmoveAssistNull('2')">{{$t('evaluate.mobileTrauma.caneMulti')}}</Radio>
            <Radio label="3" @mouseup.native="onmoveAssistNull('3')">{{$t('evaluate.mobileTrauma.chairReclining')}}</Radio>
            <Radio label="4" @mouseup.native="onmoveAssistNull('4')">{{$t('evaluate.mobileTrauma.walkersF')}}</Radio>
            <Radio label="5" @mouseup.native="onmoveAssistNull('5')">{{$t('evaluate.mobileTrauma.walkingU')}}</Radio>
            <Radio label="6" @mouseup.native="onmoveAssistNull('6')">{{$t('evaluate.mobileTrauma.walkerForearm')}}</Radio>
            <Radio label="7" @mouseup.native="onmoveAssistNull('7')">{{$t('evaluate.mobileTrauma.wheelchair')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td rowspan="2" colspan="1" class="head-bg"></td>
        <td colspan="9" class="head-bg">{{$t('evaluate.mobileTrauma.actionsBasic')}}</td>
        <td colspan="2" class="head-bg">{{$t('evaluate.mobileTrauma.transfer')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.mobile')}}</td>
        <td colspan="9" class="head-bg">{{$t('evaluate.mobileTrauma.goBedAction')}}</td>
   
      </tr>
      <tr>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.overTurn')}}</td>
        <td colspan="4" class="head-bg">{{$t('evaluate.mobileTrauma.getUP')}}</td>
        <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.standUp')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.standingHold')}}</td>
        <td colspan="2" class="head-bg">{{$t('evaluate.mobileTrauma.transfer')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.mobile')}}</td>
        <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.restBed')}}</td>
        <td colspan="6" class="head-bg">{{$t('evaluate.mobileTrauma.beddingOrganize')}}</td>
      </tr>
      <tr>
        <td colspan="1" class="head-bg">{{$t('evaluate.foodMedicine.statusQuo')}}</td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveSituation.content1" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="4">
          <Input type="textarea" autosize v-model="old_move.moveSituation.content2" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="3">
          <Input type="textarea" autosize v-model="old_move.moveSituation.content3" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveSituation.content4" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="2">
          <Input type="textarea" autosize v-model="old_move.moveSituation.content5" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveSituation.content6" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="3">
          <Input type="textarea" autosize v-model="old_move.moveSituation.content7" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="6">
          <Input type="textarea" autosize v-model="old_move.moveSituation.content8" class="new-width-input " style="width: 100%;" />
        </td>

      </tr>
      <tr>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.segmentation')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.sidewaysTurn')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.walkT')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.wakeUp')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.yourPalms')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.sittingStable')}}</td>

        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.feetBack')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.forwardLean')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.gravity')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.aids')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.new.untuk_berubah')}}</td>

        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.sitting')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.new.Operation_o')}}</td>

        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.lieDown')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.feetLift')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.postureAdjust')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.quiltLift')}}</td>
        <td colspan="5" class="head-bg">{{$t('evaluate.mobileTrauma.quiltCover')}}</td>
      </tr>
      <tr>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.assessmentAction')}}</td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content1" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content2" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content3" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content4" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content5" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content6" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content7" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content8" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content9" class="new-width-input " style="width: 100%;" />
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content10" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content11" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content12" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content13" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content14" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content15" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content16" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="5">
          <Input type="textarea" autosize v-model="old_move.moveAssess.content17" class="new-width-input " style="width: 100%;" />
        </td>

      </tr>
      <tr>
        <td colspan="1" class="head-bg">{{$t('evaluate.foodMedicine.prospect')}}</td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content1" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content2" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content3" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content4" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content5" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content6" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content7" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content8" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content9" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content10" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content11" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content12" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content13" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content14" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content15" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="1">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content16" class="new-width-input " style="width: 100%;" />
        </td>
        <td colspan="5">
          <Input type="textarea" autosize v-model="old_move.moveExpect.content17" class="new-width-input " style="width: 100%;" />
        </td>
      </tr>
      <tr>
        <td colspan="6" class="head-bg">{{$t('evaluate.foodMedicine.subject')}}</td>
         <td colspan="16">
          <i-input type="textarea" :autosize="{minRows: 5}"   v-model="old_move.moveSpeSubB"  :placeholder="$t('evaluate.foodMedicine.enter')"></i-input>
        </td>

      </tr>
      <tr>
        <td colspan="6" class="head-bg">{{$t('evaluate.mobileTrauma.mobility')}}（TUG）</td>
        <td colspan="9">
          <Input type="textarea" autosize class="new-width-input " v-model="old_move.moveAbility" style="width: 20%;" maxlength="5" />
          {{$t('evaluate.new.second')}}
        </td>
        <td colspan="7" class="head-bg">{{$t('evaluate.mobileTrauma.mattersSpecial')}}</td>
      </tr>
      <tr>
        <td colspan="6" class="head-bg">{{$t('evaluate.mobileTrauma.groundWalking')}}</td>
        <td colspan="9">
          <RadioGroup v-model="old_move.moveHorizon">
            <Radio label="0" @mouseup.native="onmoveHorizonNull('0')">{{$t('evaluate.foodMedicine.reliance')}}</Radio>
            <Radio label="1" @mouseup.native="onmoveHorizonNull('1')">{{$t('evaluate.foodMedicine.guard')}}</Radio>
            <Radio label="2" @mouseup.native="onmoveHorizonNull('2')">{{$t('evaluate.foodMedicine.partial')}}</Radio>
            <Radio label="3" @mouseup.native="onmoveHorizonNull('3')">{{$t('evaluate.foodMedicine.allAssistance')}}</Radio>
            <Radio label="4" @mouseup.native="onmoveHorizonNull('4')">{{$t('evaluate.foodMedicine.implemented')}}</Radio>
          </RadioGroup>
        </td>
        <td rowspan="2" colspan="7">
          <i-input type="textarea" :autosize="{minRows: 3}"   class="" v-model="old_move.moveSpeSubC" :placeholder="$t('evaluate.foodMedicine.enter')"></i-input>
        </td>
      </tr>
      <tr>
        <td colspan="7" class="head-bg">{{$t('evaluate.mobileTrauma.stairsClimbing')}}</td>
        <td colspan="9">
          <RadioGroup v-model="old_move.moveClimbStairs">
            <Radio label="0" @mouseup.native="onmoveClimbStairsNull('0')">{{$t('evaluate.foodMedicine.reliance')}}</Radio>
            <Radio label="1" @mouseup.native="onmoveClimbStairsNull('1')">{{$t('evaluate.foodMedicine.guard')}}</Radio>
            <Radio label="2" @mouseup.native="onmoveClimbStairsNull('2')">{{$t('evaluate.foodMedicine.partial')}}</Radio>
            <Radio label="3" @mouseup.native="onmoveClimbStairsNull('3')">{{$t('evaluate.foodMedicine.allAssistance')}}</Radio>
            <Radio label="4" @mouseup.native="onmoveClimbStairsNull('4')">{{$t('evaluate.foodMedicine.implemented')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
    </table>

    <table v-show="tabIndex == 2 || tabBlock[2] == 2" class="table new-table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;overflow:auto;">
      <tr>
        <td class="head-bg" rowspan="16" style="width: .5rem;">{{$t('evaluate.new.Evaluation_title')}}</td>
        <td class="head-bg" colspan="3">{{$t('evaluate.bathingChanging.ulcer')}}</td>
        <td colspan="3">
          <RadioGroup v-model="old_move.bedsoreFactor">
            <Radio label="0" @mouseup.native="onbedsoreFactorNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreFactorNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">{{$t('evaluate.mobileTrauma.bedsoresOr')}}</td>
        <td>
          <RadioGroup v-model="old_move.bedsoreExist">
            <Radio label="0" @mouseup.native="onbedsoreExistNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreExistNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          </RadioGroup>
        </td>
        <td class="head-bg">{{$t('evaluate.mobileTrauma.bedsore')}}</td>
        <td class="dateW" style="white-space: nowrap;">
          <Col span="12">
          <DatePicker class="new-width-input-date calendarFont" type="date" :editable="false" :value="old_move.bedsoreDate" :placeholder="$t('global.choose')" style="width:1.5rem;" @on-change="old_move.bedsoreDate = $event"></DatePicker>
          </Col>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">{{$t('evaluate.mobileTrauma.now')}}</td>
        <td colspan="3">

          <div style="display:flex;align-items:baseline;">
          <RadioGroup v-model="old_move.bedsoreNow.bool" style="white-space:nowrap;">
            <Radio label="0" @mouseup.native="onbedsoreNowNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreNowNull('1')">{{$t('CarePlan.CarePlan13')}}</Radio>
          </RadioGroup>

           【<CheckboxGroup v-model="old_move.bedsoreNow.bool2">
            <Checkbox label="0">{{$t('CarePlan.CarePlan13_1')}}</Checkbox>
            <Checkbox label="1">{{$t('CarePlan.CarePlan13_2')}}</Checkbox>
            <Checkbox label="2">{{$t('CarePlan.CarePlan13_3')}}</Checkbox>
            <Checkbox label="3">{{$t('CarePlan.CarePlan13_4')}}</Checkbox>
            <Checkbox label="4">{{$t('CarePlan.CarePlan13_5')}}</Checkbox>
            <Checkbox label="5">{{$t('CarePlan.CarePlan13_6')}}</Checkbox>
             (<Input type="textarea" autosize v-model="old_move.bedsoreNow.content" class="new-width-input " style="width: 20%;" />)】
          </CheckboxGroup>
          </div>

           
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">{{$t('evaluate.mobileTrauma.past')}}</td>
        <td colspan="3">
          <div style="display:flex;align-items:baseline;">
          <RadioGroup v-model="old_move.bedsorePast.bool" style="white-space:nowrap;">
            <Radio label="0" @mouseup.native="onbedsorePastNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsorePastNull('1')">{{$t('CarePlan.CarePlan13')}}</Radio>
          </RadioGroup>

          【<CheckboxGroup v-model="old_move.bedsorePast.bool2" >
            <Checkbox label="0" >{{$t('CarePlan.CarePlan13_1')}}</Checkbox>
            <Checkbox label="1" >{{$t('CarePlan.CarePlan13_2')}}</Checkbox>
            <Checkbox label="2">{{$t('CarePlan.CarePlan13_3')}}</Checkbox>
            <Checkbox label="3">{{$t('CarePlan.CarePlan13_4')}}</Checkbox>
            <Checkbox label="4">{{$t('CarePlan.CarePlan13_5')}}</Checkbox>
            <Checkbox label="5">{{$t('CarePlan.CarePlan13_6')}}</Checkbox>
            (<Input type="textarea" autosize v-model="old_move.bedsorePast.content" class="new-width-input " style="width: 20%;" />)】
          </CheckboxGroup>
          </div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">{{$t('evaluate.mobileTrauma.independenceDaily')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreStatus">
            <Radio label="0" @mouseup.native="onbedsoreStatusNull('0')">J1</Radio>
            <Radio label="1" @mouseup.native="onbedsoreStatusNull('1')">J2</Radio>
            <Radio label="2" @mouseup.native="onbedsoreStatusNull('2')">A1</Radio>
            <Radio label="3" @mouseup.native="onbedsoreStatusNull('3')">A2</Radio>
            <Radio label="4" @mouseup.native="onbedsoreStatusNull('4')">B1</Radio>
            <Radio label="5" @mouseup.native="onbedsoreStatusNull('5')">B2</Radio>
            <Radio label="6" @mouseup.native="onbedsoreStatusNull('6')">C1</Radio>
            <Radio label="7" @mouseup.native="onbedsoreStatusNull('7')">C2</Radio>
          </RadioGroup>
        </td>
        <td class="head-bg" style="width: 1.5rem;">{{$t('evaluate.mobileTrauma.response')}}</td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="4" style="max-width: 1rem;">{{$t('evaluate.bathingChanging.situation')}}</td>
        <td class="head-bg" colspan="2">{{$t('evaluate.mobileTrauma.bathing')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreBathe">
            <Radio label="0" @mouseup.native="onbedsoreBatheNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreBatheNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
        <td rowspan="11">
          <p>{{$t('evaluate.mobileTrauma.carePlan')}}</p>
          <h3 style="margin: .8rem 0 .1rem;">{{$t('evaluate.mobileTrauma.decubitusPlan')}}</h3>

          <RadioGroup v-model="old_move.bedsorePolicy">
            <Radio label="0" @mouseup.native="onbedsorePolicyNull('0')">{{$t('evaluate.new.you')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsorePolicyNull('1')">{{$t('evaluate.new.wu')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t('evaluate.bathingChanging.intakeFood')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreAdi">
            <Radio label="0" @mouseup.native="onbedsoreAdiNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreAdiNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
            <Radio label="2" @mouseup.native="onbedsoreAdiNull('2')"> {{$t("evaluate.mobileTrauma.targetOut")}}(※1)</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="2">{{$t('evaluate.mobileTrauma.dressing')}}</td>
        <td class="head-bg">{{$t('evaluate.bathingChanging.jacket')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreUpper">
            <Radio label="0" @mouseup.native="onbedsoreUpperNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreUpperNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t('evaluate.bathingChanging.garment')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreUnder">
            <Radio label="0" @mouseup.native="onbedsoreUnderNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreUnderNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="4">{{$t('evaluate.mobileTrauma.actionsBasic')}}</td>
        <td class="head-bg" colspan="2">{{$t('evaluate.mobileTrauma.overTurn')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreTurn">
            <Radio label="0" @mouseup.native="onbedsoreTurnNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreTurnNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t('evaluate.mobileTrauma.keepSitting')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreKeep">
            <Radio label="0" @mouseup.native="onbedsoreKeepNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreKeepNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t('evaluate.bathingChanging.sitDown')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreSit">
            <Radio label="0" @mouseup.native="onbedsoreSitNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreSitNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t('evaluate.mobileTrauma.keepStanding')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreStand">
            <Radio label="0" @mouseup.native="onbedsoreStandNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreStandNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td rowspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.excretionSit')}}</td>
        <td class="head-bg" colspan="2">{{$t('evaluate.mobileTrauma.incontinenceUrinary')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreUracratia">
            <Radio label="0" @mouseup.native="onbedsoreUracratiaNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreUracratiaNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
            <Radio label="2" @mouseup.native="onbedsoreUracratiaNull('2')">{{$t('evaluate.mobileTrauma.targetOut')}}(※2)</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t('evaluate.mobileTrauma.incontinence')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreEncopresis">
            <Radio label="0" @mouseup.native="onbedsoreEncopresisNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreEncopresisNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
            <Radio label="2" @mouseup.native="onbedsoreEncopresisNull('2')">{{$t('evaluate.mobileTrauma.targetOut')}}(※3)</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t('evaluate.bathingChanging.conduit')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreCatheter">
            <Radio label="0" @mouseup.native="onbedsoreCathetersNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreCathetersNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          </RadioGroup>
        </td>
      </tr>

      <!-- 要求 （减了一行“名誉状态”，加了两栏）start -->
      <tr>
        <td class="head-bg" colspan="2">{{$t('evaluate.new.Cultivation_state')}}</td>
        <td class="" style="text-align:center;" colspan="2">BMI（ <Input v-model="old_info.infoBmi" type="textarea" disabled autosize class="new-width-input " style="width: 50%;" /> ）</td>
        <td colspan="6">
          <RadioGroup v-model="old_move.bedsoreHonor">
            <Radio label="0" @mouseup.native="onbedsoreHonorNull('0')">{{$t('evaluate.new.High_risk')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreHonorNull('1')">{{$t('evaluate.new.Medium_risk')}}</Radio>
            <Radio label="2" @mouseup.native="onbedsoreHonorNull('2')">{{$t('evaluate.new.Low_risk')}}</Radio>
          </RadioGroup>
        </td>
      </tr>

      <tr>
        <td class="head-bg" colspan="4">{{$t('evaluate.new.months3')}}</td>
        <td colspan="6">
          <RadioGroup v-model="old_move.bedsoreHistory">
            <Radio label="0" @mouseup.native="onbedsoreHistoryNull('0')">{{$t('evaluate.new.No')}}</Radio>
            <Radio label="1" @mouseup.native="onbedsoreHistoryNull('1')">{{$t('evaluate.new.Yes')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <!-- 要求 （减了一行“名誉状态”，加了两栏）end -->
    </table>

    <div class="tip_text" v-show="tabIndex == 2 || tabBlock[2] == 2">
      <span>※１．{{$t('evaluate.mobileTrauma.nutrition')}}</span>
      <span>※2．{{$t('evaluate.mobileTrauma.nutrition2')}}</span>
      <span>※3．{{$t('evaluate.mobileTrauma.nutrition3')}}</span>
    </div>
  </div>
  <!-- 移动&褥瘡危険因子の評価 end -->

  <!-- 入浴＆更衣 start -->
  <table v-show="tabIndex == 4 || tabBlock[4] == 4" class="table new-table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
    <tr>
      <td class="head-bg" rowspan="13" style="width: .5rem;">{{$t('evaluate.mobileTrauma.bathing')}}</td>
      <td class="head-bg" colspan="5">{{$t('evaluate.bathingChanging.helpCleaning')}}</td>
      <td class="head-bg" colspan="2">{{$t('evaluate.bathingChanging.temperature')}}</td>
      <td class="head-bg" colspan="2">{{$t('evaluate.bathingChanging.helpers')}}</td>
      <td class="head-bg" colspan="2">{{$t('evaluate.bathingChanging.bathType')}}</td>
    </tr>
    <tr class="block">
      <td colspan="5">
        <article style="width:100%;">
          <CheckboxGroup v-model="old_bathe.bathePlace" style="display:flex;">
            <p>
                <Checkbox label="0">{{$t('evaluate.bathingChanging.hair')}}</Checkbox>
                <Checkbox label="3">{{$t('evaluate.bathingChanging.shoulder')}}</Checkbox>
                <Checkbox label="6">{{$t('evaluate.bathingChanging.knee')}}</Checkbox>
                <Checkbox label="8">{{$t('evaluate.bathingChanging.kneeBelow')}}</Checkbox>
                <Checkbox label="10">{{$t('evaluate.bathingChanging.sole')}}</Checkbox>
                <Checkbox label="12">{{$t('evaluate.bathingChanging.back')}}</Checkbox>
            </p>
            <p>
               <Checkbox label="1">{{$t('evaluate.bathingChanging.arm')}}</Checkbox>
               <Checkbox label="4">{{$t('evaluate.bathingChanging.hips')}}</Checkbox>
               <Checkbox label="7">{{$t('evaluate.bathingChanging.thigh')}}</Checkbox>
               <Checkbox label="9">{{$t('evaluate.bathingChanging.neck')}}</Checkbox>
               <Checkbox label="11">{{$t('evaluate.bathingChanging.instep')}}</Checkbox>
              <Checkbox label="13">{{$t('evaluate.bathingChanging.hand')}}</Checkbox>
            </p>
            <p>
               <Checkbox label="2">{{$t('evaluate.bathingChanging.face')}}</Checkbox>
               <Checkbox label="5" style="">{{$t('evaluate.bathingChanging.affairs')}}</Checkbox>
            </p>
          </CheckboxGroup>
        </article>
      </td>
      <td colspan="2">
        <RadioGroup v-model="old_bathe.batheTemperature">
          <Radio label="0" @mouseup.native="onbatheTemperatureNull('0')">{{$t('evaluate.bathingChanging.heatQua')}}</Radio>
          <Radio label="1" @mouseup.native="onbatheTemperatureNull('1')">{{$t('evaluate.bathingChanging.ordinary')}}</Radio>
          <Radio label="2" @mouseup.native="onbatheTemperatureNull('2')">{{$t('evaluate.bathingChanging.microtherm')}}</Radio>
        </RadioGroup>
      </td>
      <td colspan="2">
        <RadioGroup v-model="old_bathe.batheAssistor">
          <Radio label="0" @mouseup.native="onbatheAssistorNull('0')">{{$t('evaluate.bathingChanging.male')}}</Radio>
          <Radio label="1" @mouseup.native="onbatheAssistorNull('1')">{{$t('evaluate.bathingChanging.woman')}}</Radio>
          <Radio label="2" @mouseup.native="onbatheAssistorNull('2')">{{$t('evaluate.bathingChanging.arbitrarily')}}</Radio>
        </RadioGroup>
      </td>
      <td colspan="2">
        <RadioGroup v-model="old_bathe.batheBath">
          <Radio label="0" @mouseup.native="onbatheBathNull('0')">{{$t('evaluate.bathingChanging.bathroom')}}</Radio>
          <Radio label="1" @mouseup.native="onbatheBathNull('1')">{{$t('evaluate.bathingChanging.bathEssence')}}</Radio>
          <Radio label="2" @mouseup.native="onbatheBathNull('2')">{{$t('evaluate.bathingChanging.bathSpecial')}}</Radio>
          <Radio label="3" @mouseup.native="onbatheBathNull('3')">{{$t('evaluate.bathingChanging.bath')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.bathing')}}</td>
      <td colspan="8">
        <RadioGroup v-model="old_bathe.batheEnter">
          <Radio label="0" @mouseup.native="onbatheEnterNull('0')">{{$t('evaluate.foodMedicine.reliance')}}</Radio>
          <Radio label="1" @mouseup.native="onbatheEnterNull('1')">{{$t('evaluate.foodMedicine.guard')}}</Radio>
          <Radio label="2" @mouseup.native="onbatheEnterNull('2')">{{$t('evaluate.foodMedicine.partial')}}</Radio>
          <Radio label="3" @mouseup.native="onbatheEnterNull('3')">{{$t('evaluate.foodMedicine.allAssistance')}}</Radio>
          <Radio label="4" @mouseup.native="onbatheEnterNull('4')">{{$t('evaluate.foodMedicine.implemented')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td colspan="8" class="head-bg">{{$t('evaluate.bathingChanging.detailBath')}}</td>
      <td colspan="3" class="head-bg">{{$t('evaluate.foodMedicine.subject')}}</td>
    </tr>
    <tr>
      <td class="head-bg"></td>
      <td class="head-bg" colspan="4">{{$t('evaluate.bathingChanging.washBody')}}</td>
      <td class="head-bg" colspan="3">{{$t('evaluate.bathingChanging.shampooHair')}}</td>
      <td rowspan="4" colspan="3">
        <i-input type="textarea" :autosize="{minRows: 15}"    v-model="old_bathe.batheSpeSubA" :placeholder="$t('evaluate.foodMedicine.enter')"></i-input>
      </td>
    </tr>
    <tr>
      <td class="head-bg ">{{$t('evaluate.foodMedicine.stroke')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.bodyWater')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.towelPutSoap')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.washBody')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.washSoap')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.shampooUp')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.scalpWhole')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.shampoo')}}</td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.statusQuo')}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationA.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationA.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationA.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationA.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationA.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationA.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationA.content7" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.prospect')}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectA.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectA.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectA.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectA.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectA.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectA.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectA.content7" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg"></td>
      <td class="head-bg" colspan="3">{{$t('evaluate.bathingChanging.bathEnter')}}</td>
      <td class="head-bg">{{$t('evaluate.bathingChanging.retentionSeat')}} <br/> {{$t('evaluate.bathingChanging.retentionSeat2')}}</td>
      <td class="head-bg" colspan="2">{{$t('evaluate.bathingChanging.bathCome')}}</td>
      <td class="head-bg" colspan="3">{{$t('evaluate.bathingChanging.bathingAction')}}</td>
      <td rowspan="4">
        <i-input type="textarea" :autosize="{minRows: 15}"   v-model="old_bathe.batheSpeSubB" :placeholder="$t('evaluate.foodMedicine.enter')"></i-input>
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.stroke')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.getOutBathtub')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.bathStep')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.inBathtub')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.bathStable')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.getOutBathtub')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('WashTime.bathOut')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.dry')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.wipeBody')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.new.Dry_o')}}</td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.statusQuo')}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationB.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationB.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationB.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationB.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationB.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationB.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationB.content7" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheSituationB.content8" class="new-width-input " style="width: 100%;" />
      </td>
      <td rowspan="2">
        <Input type="textarea" autosize v-model="old_bathe.batheSituationB.content9" class="new-width-input" style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.prospect')}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectB.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectB.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectB.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectB.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectB.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectB.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectB.content7" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.batheExpectB.content8" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="3">{{$t('evaluate.bathingChanging.specialNotes')}}</td>
      <td colspan="8">
        <Input type="textarea" autosize v-model="old_bathe.batheSpeSubC" class="new-width-input" style="width: 100%;" />
      </td>
    </tr>
  </table>

  <table v-show="tabIndex == 4 || tabBlock[4] == 4" class="table new-table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
    <tr>
      <td rowspan="25" class="head-bg" style="width: 0.5rem;">{{$t('evaluate.mobileTrauma.dressing')}}</td>
      <td class="head-bg" colspan="3">{{$t('evaluate.mobileTrauma.dressingTime')}}</td>
      <td colspan="10">
          {{$t('evaluate.foodMedicine.towards')}}[
          <Input type="textarea" autosize v-model="old_bathe.dressedTime[0]" class="new-width-input " style="width: 15%;" maxlength="5" />
          <span class="space">]</span>
          {{$t('evaluate.foodMedicine.day')}}[
          <Input type="textarea" autosize v-model="old_bathe.dressedTime[1]" class="new-width-input " style="width: 15%;" maxlength="5" />
          <span class="space">]</span>
          {{$t('evaluate.foodMedicine.xi')}}[
          <Input type="textarea" autosize v-model="old_bathe.dressedTime[2]" class="new-width-input " style="width: 15%;" maxlength="5" />
          <span class="space">]</span>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="3">{{$t('evaluate.bathingChanging.clothesDaytime')}}</td>
      <td colspan="10">
        <RadioGroup v-model="old_bathe.dressedDaytime">
          <Radio label="0" @mouseup.native="ondressedDaytimeNull('0')">{{$t('evaluate.bathingChanging.clothesShift')}}</Radio>
          <Radio label="1" @mouseup.native="ondressedDaytimeNull('1')">{{$t('evaluate.bathingChanging.clothesSleeping')}}</Radio>
          <Radio label="2" @mouseup.native="ondressedDaytimeNull('2')">{{$t('evaluate.foodMedicine.other')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="3">{{$t('evaluate.bathingChanging.clothesNight')}}</td>
      <td colspan="10">
        <RadioGroup v-model="old_bathe.dressedNight">
          <Radio label="0" @mouseup.native="ondressedNightNull('0')">{{$t('evaluate.bathingChanging.pajamas')}}</Radio>
          <Radio label="1" @mouseup.native="ondressedNightNull('1')">{{$t('evaluate.bathingChanging.theDaySame')}}</Radio>
          <Radio label="2" @mouseup.native="ondressedNightNull('2')">{{$t('evaluate.foodMedicine.other')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="3">{{$t('evaluate.bathingChanging.specialTopics')}}</td>
      <td colspan="10">
        <label>
          <Input type="textarea" autosize class="new-width-input" v-model="old_bathe.dressedSpeSubA" style="width: 100%;" />
        </label>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="3">{{$t('evaluate.mobileTrauma.dressing')}}</td>
      <td colspan="10">
        <RadioGroup v-model="old_bathe.dressedProcess">
          <Radio label="0" @mouseup.native="ondressedProcessNull('0')">{{$t('evaluate.foodMedicine.reliance')}}</Radio>
          <Radio label="1" @mouseup.native="ondressedProcessNull('1')">{{$t('evaluate.foodMedicine.guard')}}</Radio>
          <Radio label="2" @mouseup.native="ondressedProcessNull('2')">{{$t('evaluate.foodMedicine.partial')}}</Radio>
          <Radio label="3" @mouseup.native="ondressedProcessNull('3')">{{$t('evaluate.foodMedicine.allAssistance')}}</Radio>
          <Radio label="4" @mouseup.native="ondressedProcessNull('4')">{{$t('evaluate.foodMedicine.implemented')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="13">{{$t('evaluate.bathingChanging.actionChanging')}}</td>
    </tr>
    <tr>
      <td class="head-bg"></td>
      <td class="head-bg">{{$t('evaluate.bathingChanging.ready')}}</td>
      <td class="head-bg" colspan="4">{{$t('evaluate.new.Bite')}}</td>
      <td class="head-bg" colspan="7">{{$t('evaluate.new.Jacket2')}}</td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.stroke')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.clothesPrepare')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.clothesTake')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.headThrough')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.handThroughSleeve')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.trimming')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.clothesTake')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.throughAHand')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.clothesBackTurn')}}</td>
      <td class="head-bg evaluate-text-left" colspan="2">{{$t('evaluate.bathingChanging.otherHandPass')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.button')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.zipperTighten')}}</td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.statusQuo')}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationA.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationA.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationA.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationA.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationA.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationA.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationA.content7" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationA.content8" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="2">
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationA.content9" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationA.content10" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationA.content11" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.prospect')}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectA.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectA.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectA.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectA.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectA.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectA.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectA.content7" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectA.content8" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="2">
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectA.content9" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectA.content10" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectA.content11" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="13">{{$t('evaluate.bathingChanging.actionChanging')}}</td>
    </tr>
    <tr>
      <td class="head-bg"></td>
      <td class="head-bg" colspan="4">{{$t('evaluate.bathingChanging.garment')}}</td>
      <td class="head-bg" colspan="4">{{$t('evaluate.bathingChanging.wearSocks')}}</td>
      <td class="head-bg" colspan="4">{{$t('evaluate.bathingChanging.wearShoes')}}</td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.stroke')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.legsThrough')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.pullUp')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.trimming')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.frontClose')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.takeSocks')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.putToes')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.new.Put_heels')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.pullUp')}}</td>
      <td class="head-bg evaluate-text-left" colspan="2">{{$t('evaluate.bathingChanging.putToes')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.new.Put_a_heel')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.trimming')}}</td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.statusQuo')}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationB.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationB.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationB.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationB.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationB.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationB.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationB.content7" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationB.content8" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="2">
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationB.content9" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationB.content10" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationB.content11" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.prospect')}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectB.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectB.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectB.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectB.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectB.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectB.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectB.content7" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectB.content8" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="2">
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectB.content9" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectB.content10" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectB.content11" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="13">{{$t('evaluate.bathingChanging.offChanging')}}</td>
    </tr>
    <tr>
      <td class="head-bg"></td>
      <td class="head-bg" colspan="3">{{$t('evaluate.new.Bite')}}</td>
      <td class="head-bg" colspan="5">{{$t('evaluate.new.Jacket')}}</td>
      <td class="head-bg" colspan="4">{{$t('evaluate.bathingChanging.garment')}}</td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.stroke')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.pullHeadOut')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.pullHandOut')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.downClothes')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.unbutton')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.unzip')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.handDraw')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.clothesYourBack')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.pullOutHand')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.toUntie')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.waistToknee')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.pullOutOneFoot')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.downClothes')}}</td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.statusQuo')}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationC.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationC.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationC.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationC.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationC.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationC.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationC.content7" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationC.content8" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationC.content9" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationC.content10" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationC.content11" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationC.content12" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.prospect')}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectC.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectC.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectC.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectC.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectC.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectC.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectC.content7" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectC.content8" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectC.content9" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectC.content10" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectC.content11" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectC.content12" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="7">{{$t('evaluate.bathingChanging.offChanging')}}</td>
      <td class="head-bg" colspan="6">{{$t('evaluate.bathingChanging.topicSpecial')}}</td>
    </tr>
    <tr>
      <td class="head-bg"></td>
      <td class="head-bg" colspan="3">{{$t('evaluate.new.Take_o')}}</td>
      <td class="head-bg" colspan="3">{{$t('evaluate.new.Take_off')}}</td>
      <td rowspan="4" colspan="6">
        <i-input type="textarea" :autosize="{minRows: 10}"   class="" v-model="old_bathe.dressedSpeSubB" :placeholder="$t('evaluate.foodMedicine.enter')"></i-input>
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.stroke')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.ankleDown')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.pullHeel')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.pullToes')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.removeBeltLaces')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.pullOutHeel')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.downShoes')}}</td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.statusQuo')}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationD.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationD.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationD.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationD.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationD.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationD.content6" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.prospect')}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectD.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectD.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectD.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectD.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectD.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectD.content6" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
  </table>

  <table v-show="tabIndex == 4 || tabBlock[4] == 4" class="table new-table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
    <tr>
      <td class="head-bg" rowspan="10" style="width: 0.4rem;">{{$t('evaluate.new.Oral_c')}}</td>
      <td class="head-bg" colspan="3">{{$t('evaluate.bathingChanging.oralCare')}}</td>
      <td colspan="10">
        <RadioGroup v-model="old_bathe.dressedOralCavity">
          <Radio label="0" @mouseup.native="ondressedOralCavityNull('0')">{{$t('evaluate.foodMedicine.reliance')}}</Radio>
          <Radio label="1" @mouseup.native="ondressedOralCavityNull('1')">{{$t('evaluate.foodMedicine.guard')}}</Radio>
          <Radio label="2" @mouseup.native="ondressedOralCavityNull('2')">{{$t('evaluate.foodMedicine.partial')}}</Radio>
          <Radio label="3" @mouseup.native="ondressedOralCavityNull('3')">{{$t('evaluate.foodMedicine.allAssistance')}}</Radio>
          <Radio label="4" @mouseup.native="ondressedOralCavityNull('4')">{{$t('evaluate.foodMedicine.implemented')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="3">{{$t('evaluate.bathingChanging.surgery')}}</td>
      <td colspan="10">
        <RadioGroup v-model="old_bathe.dressedTidyUp">
          <Radio label="0" @mouseup.native="ondressedTidyUpNull('0')">{{$t('evaluate.foodMedicine.reliance')}}</Radio>
          <Radio label="1" @mouseup.native="ondressedTidyUpNull('1')">{{$t('evaluate.foodMedicine.guard')}}</Radio>
          <Radio label="2" @mouseup.native="ondressedTidyUpNull('2')">{{$t('evaluate.foodMedicine.partial')}}</Radio>
          <Radio label="3" @mouseup.native="ondressedTidyUpNull('3')">{{$t('evaluate.foodMedicine.allAssistance')}}</Radio>
          <Radio label="4" @mouseup.native="ondressedTidyUpNull('4')">{{$t('evaluate.foodMedicine.implemented')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td colspan="13" class="head-bg">{{$t('evaluate.bathingChanging.fineOralCare')}}</td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.stroke')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.toothbrushChange')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.toothpasteApply')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.brushTeeth')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.tapTurn')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.waterCup')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.gargle')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.mouthWipe')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.washFace')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.wipeFace')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.combHair')}}</td>
      <td class="head-bg evaluate-text-left">{{$t('evaluate.bathingChanging.shave')}}</td>
      <!-- 字段新增   爪を切る start -->
      <td class="head-bg evaluate-text-left">{{$t('evaluate.new.Nail')}}</td>
      <!-- 字段新增   爪を切る end -->
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.statusQuo')}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationE.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationE.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationE.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationE.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationE.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationE.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationE.content7" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationE.content8" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationE.content9" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationE.content10" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationE.content11" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedSituationE.content12" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.foodMedicine.prospect')}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectE.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectE.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectE.content3 " class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectE.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectE.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectE.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectE.content7" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectE.content8" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectE.content9" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectE.content10" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectE.content11" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_bathe.dressedExpectE.content12" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.mobileTrauma.oralCareTime')}}</td>
      <td class="head-bg" colspan="4">{{$t('evaluate.mobileTrauma.appliancesUse')}}</td>
      <td class="head-bg" colspan="5">{{$t('evaluate.bathingChanging.falseTeeth')}}</td>

    </tr>
    <tr class="block">
      <td colspan="4">
        <article style="width:100%;">
          <CheckboxGroup v-model="old_bathe.dressedOcTime" style="display:flex;">
          <p>
              <Checkbox label="0">{{$t('evaluate.bathingChanging.gettingUpAfter')}}</Checkbox>
              <Checkbox label="2">{{$t('evaluate.bathingChanging.breakfastAfter')}}</Checkbox>
              <Checkbox label="4">{{$t('evaluate.bathingChanging.lunchAfter')}}</Checkbox>
              <Checkbox label="6">{{$t('evaluate.foodMedicine.other')}}</Checkbox>
          </p>
         
          <p>
           <Checkbox label="1">{{$t('evaluate.bathingChanging.breakBefore')}}</Checkbox>
           <Checkbox label="3">{{$t('evaluate.bathingChanging.dinnerAfter')}}</Checkbox>
           <Checkbox label="5">{{$t('evaluate.bathingChanging.snackAfter')}}</Checkbox>
          </p>
         
          </CheckboxGroup>
        </article>
      </td>
      <td colspan="4">
        <article style="width:100%;">
          <CheckboxGroup v-model="old_bathe.dressedUseTool.bool">
            
            <div style="display:flex;">
              <p style="white-space:nowrap;">
                 <Checkbox label="0">{{$t('evaluate.bathingChanging.toothbrush')}}</Checkbox>
                 <Checkbox label="3">{{$t('evaluate.bathingChanging.brushSponge')}}</Checkbox>
              </p>
              <p style="white-space:nowrap;">
                <Checkbox label="1">{{$t('evaluate.bathingChanging.glass')}}</Checkbox>
                <Checkbox label="4">{{$t('evaluate.bathingChanging.brushLingual')}}</Checkbox>
              </p>

              <p style="white-space:nowrap;">
                <Checkbox label="2">{{$t('evaluate.bathingChanging.gauze')}}</Checkbox>
              </p>
            </div>
            <div style="display:flex;">
            <Checkbox label="5">{{$t('evaluate.bathingChanging.cleanerDenture')}}</Checkbox>
            [
            <!-- 括号 -->
            <Input type="textarea" autosize v-model="old_bathe.dressedUseTool.content" style="width: 1rem; " class=" new-width-input" />
            ]
            </div>
            <Checkbox label="6">{{$t('evaluate.foodMedicine.other')}}</Checkbox>
          </CheckboxGroup>
        </article>
      </td>
      <td colspan="5">
        <RadioGroup v-model="old_bathe.dressedFalseTooth">
          <Radio label="0" @mouseup.native="ondressedFalseToothNull('0')">{{$t('evaluate.bathingChanging.denturesAll')}}</Radio>
          <Radio label="1" @mouseup.native="ondressedFalseToothNull('1')">{{$t('evaluate.bathingChanging.dentureLocal')}}</Radio>
          <Radio label="2" @mouseup.native="ondressedFalseToothNull('2')">{{$t('evaluate.mobileTrauma.none')}}</Radio>
        </RadioGroup>
      </td>

    </tr>
    <tr>
      <td colspan="4" class="head-bg">{{$t('evaluate.bathingChanging.washFaceTime')}}</td>
      <td colspan="4" class="head-bg">{{$t('evaluate.bathingChanging.makeUp')}}</td>
      <td class="head-bg" colspan="5">{{$t('evaluate.new.inverted_down')}}</td>
    </tr>
    <tr class="block">
      <td colspan="4">
        <article style="width:100%;">
          <CheckboxGroup v-model="old_bathe.dressedFaceTime" style="display:flex;flex-wrap:wrap;">
             <p>
              <Checkbox label="0">{{$t('evaluate.bathingChanging.gettingUpAfter')}}</Checkbox>
              <Checkbox label="2">{{$t('evaluate.bathingChanging.breakfastAfter')}}</Checkbox>
              <Checkbox label="4">{{$t('evaluate.bathingChanging.lunchAfter')}}</Checkbox>
              <Checkbox label="6">{{$t('evaluate.foodMedicine.other')}}</Checkbox>
             </p>

             <p>
              <Checkbox label="1">{{$t('evaluate.bathingChanging.breakBefore')}}</Checkbox>
              <Checkbox label="3">{{$t('evaluate.bathingChanging.dinnerAfter')}}</Checkbox>
              <Checkbox label="5">{{$t('evaluate.bathingChanging.snackAfter')}}</Checkbox>
             </p>
          </CheckboxGroup>

        </article>
      </td>
      <td colspan="4">
        <RadioGroup v-model="old_bathe.dressedMakeUp">
          <Radio label="0" @mouseup.native="ondressedMakeUpNull('0')">{{$t('evaluate.new.Do')}}</Radio>
          <Radio label="1" @mouseup.native="ondressedMakeUpNull('1')">{{$t('evaluate.new.Not')}}</Radio>
          <Radio label="2" @mouseup.native="ondressedMakeUpNull('2')">{{$t('evaluate.bathingChanging.someTime')}}</Radio>
        </RadioGroup>
      </td>
      <td rowspan="1" colspan="5">
        <i-input type="textarea"  :autosize="{minRows: 4}" class="" v-model="old_bathe.dressedSpeSubC" :placeholder="$t('evaluate.foodMedicine.enter')"></i-input>
      </td>
    </tr>
    <tr class="block">
      <td colspan="4" class="head-bg">{{$t('evaluate.bathingChanging.topicSpecial')}}</td>
      <td rowspan="1" colspan="10">
        <i-input type="textarea"   :autosize="{minRows: 5}"   v-model="old_bathe.dressedSpeSubE" :placeholder="$t('evaluate.foodMedicine.enter')" ></i-input>
      </td>
    </tr>
  </table>

  <table v-show="tabIndex == 4 || tabBlock[4] == 4" class="table new-table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
    <tr>
      <td rowspan="2" class="head-bg" style="width: 0.5rem;">{{$t('evaluate.new.Rising')}}</td>
      <td class="head-bg">{{$t('evaluate.bathingChanging.wakeUpTime')}}</td>
      <td class="head-bg">{{$t('evaluate.bathingChanging.getUpMethod')}}</td>
    </tr>
    <tr>
      <td>
        <div class="cell">
          {{$t('evaluate.bathingChanging.standardTime')}}

          [
          <Input type="textarea" autosize v-model="old_bathe.dressedWakeUpTime" style="width: 1.5rem; " class=" new-width-input"  />
          ]{{$t('global.time')}}

        </div>
      </td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_bathe.dressedWakeUpWay">
            <Radio label="0" @mouseup.native="ondressedWakeUpWayNull('0')">{{$t('evaluate.bathingChanging.natural')}}</Radio>
            <Radio label="1" @mouseup.native="ondressedWakeUpWayNull('1')">{{$t('evaluate.bathingChanging.alarmClock')}}</Radio>
            <Radio label="2" @mouseup.native="ondressedWakeUpWayNull('2')">{{$t('evaluate.foodMedicine.other')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
  </table>
  <table v-show="tabIndex == 4 || tabBlock[4] == 4" class="table new-table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
    <tr>
      <td rowspan="2" class="head-bg" style="width: 0.5rem;">{{$t('evaluate.new.Bedtime')}}</td>
      <td class="head-bg">{{$t('evaluate.bathingChanging.sackTime')}}</td>
      <td class="head-bg">{{$t('evaluate.bathingChanging.sackMethod')}}</td>
      <td class="head-bg">{{$t('evaluate.bathingChanging.sleepState')}}</td>
      <td class="head-bg">{{$t('evaluate.bathingChanging.electric')}}</td>
      <td class="head-bg">{{$t('evaluate.bathingChanging.itemsPrepared')}}</td>
      <td class="head-bg">{{$t('evaluate.foodMedicine.subject')}}</td>
    </tr>
    <tr>
      <td>
        <div class="cell">
          <p>{{$t('evaluate.bathingChanging.standardTime')}}</p>
          <p style="white-space:nowrap;">
            [
            <Input type="textarea" autosize v-model="old_bathe.dressedSleepTime" class="" style="width: 0.8rem;" />
            ]{{$t('global.time')}}
          </p>
        </div>
      </td>
      <td>
        <div class="cell">
           <CheckboxGroup v-model="old_bathe.dressedSleepWay.bool">
           <Checkbox label="0">{{$t('evaluate.bathingChanging.natural')}}</Checkbox>
            <br />
            <Checkbox label="1">{{$t('evaluate.bathingChanging.sleepMedication')}}</Checkbox>
            <br />
            <p>
              [
              <Input type="textarea" autosize v-model="old_bathe.dressedSleepWay.content1" style="width: 0.8rem;" class="" />]
            </p>
            <p style="white-space: nowrap">
              [
              <Input type="textarea" autosize v-model="old_bathe.dressedSleepWay.content2" style="width: 0.8rem;" class="" />]
            </p>
            <p>
              [
              <Input type="textarea" autosize v-model="old_bathe.dressedSleepWay.content3" style="width: 0.8rem;" class="" />]
            </p>
            <Checkbox label="2">{{$t('evaluate.foodMedicine.other')}}</Checkbox>
            <br />
          </CheckboxGroup>
        </div>
      </td>
      <td>
        <div class="cell">
           <CheckboxGroup v-model="old_bathe.dressedSleepStatus.bool">
          <Checkbox label="0">{{$t('evaluate.bathingChanging.sleepGood')}}</Checkbox>
            <br />
           <Checkbox label="1">{{$t('evaluate.bathingChanging.someTimesNotS')}}</Checkbox>
            <br />
          <Checkbox label="2">{{$t('evaluate.bathingChanging.notSleep')}}</Checkbox>
            <br />
            <p style="white-space:nowrap;">
             <Checkbox label="3">{{$t('evaluate.bathingChanging.snore')}}</Checkbox>
              [<Input type="textarea" autosize v-model="old_bathe.dressedSleepStatus.content1" style="width: 0.8rem;" class="" />]
            </p>
            <div style="white-space: nowrap;">
              <Checkbox label="4">{{$t('evaluate.bathingChanging.dreamtalk')}}</Checkbox>
              [<Input type="textarea" autosize v-model="old_bathe.dressedSleepStatus.content2" style="width: 0.8rem;" class="" />]
            </div>
          </CheckboxGroup>
        </div>
      </td>
      <td>
        <div class="cell">
             <CheckboxGroup v-model="old_bathe.dressedLamp">
              <Checkbox label="0">{{$t('evaluate.bathingChanging.closedAll')}}</Checkbox>
            <br />
               <Checkbox label="1" style="white-space:nowrap;">{{$t('evaluate.bathingChanging.bulbSmall')}}</Checkbox>
            <br />
              <Checkbox label="2">{{$t('evaluate.bathingChanging.openAll')}}</Checkbox>
          </CheckboxGroup>
        </div>
      </td>
      <td>
        <div class="cell">
            <CheckboxGroup v-model="old_bathe.dressedThings.bool">
            <div style="white-space: nowrap;">
            <Checkbox label="0">{{$t('evaluate.bathingChanging.drinks')}}</Checkbox>
              [<Input type="textarea" autosize v-model="old_bathe.dressedThings.content" style="width: 0.8rem;" class="" />]
            </div>
            <Checkbox label="1">{{$t('evaluate.new.Sweets')}}</Checkbox>
            <br />
             <Checkbox label="2">{{$t('evaluate.bathingChanging.clock')}}</Checkbox>
            <br />
            <Checkbox label="3">{{$t('evaluate.foodMedicine.other')}}</Checkbox>
            <br />
           </CheckboxGroup>
        </div>
      </td>
      <td>
        <div class="cell">
          <i-input type="textarea" :autosize="{minRows: 5}"   class="" v-model="old_bathe.dressedSpeSubD" :placeholder="$t('evaluate.foodMedicine.enter')"></i-input>
        </div>
      </td>
    </tr>
  </table>
  <!-- 入浴＆更衣 end -->

  <!-- 身心机能 start -->
  <table v-show="tabIndex == 5 || tabBlock[5] == 5" class="table new-table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
    <tr>
      <td class="head-bg" rowspan="32" style="width: 0.5rem;">{{$t('evaluate.psychosomaticFunction.psychosomatic')}}</td>
      <td class="head-bg" colspan="4" style="width: 189px;">{{$t('evaluate.psychosomaticFunction.vision')}}</td>
      <td colspan="1">
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyEyesight">
            <Radio label="0" @mouseup.native="onphysiologyEyesightNull('0')">{{$t('evaluate.new.Life_is_disabled')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyEyesightNull('1')">{{$t('evaluate.new.Amblyopia')}}</Radio>
            <Radio label="2" @mouseup.native="onphysiologyEyesightNull('2')">{{$t('evaluate.new.Blind')}}</Radio>
          </RadioGroup>
        </div>
      </td>
      <td class="head-bg" style="width: 2.4rem;">{{$t('evaluate.foodMedicine.subject')}}</td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.hearing')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyHearing">
            <Radio label="0" @mouseup.native="onphysiologyHearingNull('0')">{{$t('evaluate.psychosomaticFunction.noImpact')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyHearingNull('1')">{{$t('evaluate.psychosomaticFunction.deafALittle')}}</Radio>
            <Radio label="2" @mouseup.native="onphysiologyHearingNull('2')">{{$t('evaluate.psychosomaticFunction.deaf')}}</Radio>
          </RadioGroup>
        </div>
      </td>
      <td rowspan="34" style="vertical-align: top;">
        <div class="cell">
          <p class="flex">
            {{$t('evaluate.psychosomaticFunction.glucoseBlood')}}
            <RadioGroup v-model="old_physiology.physiologySpeSub.bool" style="margin-left: 0.2rem;">
              <Radio label="0" @mouseup.native="onphysiologySpeSubNull('0')">{{$t('evaluate.new.you')}}</Radio>
              <Radio label="1" @mouseup.native="onphysiologySpeSubNull('1')">{{$t('evaluate.new.wu')}}</Radio>
            </RadioGroup>
          </p>
          <p style="white-space:nowrap;">
            {{$t('evaluate.psychosomaticFunction.monthlyWeeklyDaily')}}
            <Input type="textarea" autosize v-model="old_physiology.physiologySpeSub.content" style="width: 0.9rem;" class=" new-width-input" />
            {{$t('evaluate.psychosomaticFunction.determination')}}
          </p>
        </div>

         <i-input   v-model="old_physiology.physiologySpeSub.topic"  style="margin-top:0.1rem;" type="textarea" :autosize="{minRows: 50}"  :placeholder="$t('evaluate.foodMedicine.enter')"></i-input>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.dysarthria')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyAphasia">
            <Radio label="0" @mouseup.native="onphysiologyAphasiabNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyAphasiabNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.comprehension')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyComprehension">
            <Radio label="0" @mouseup.native="onphysiologyComprehensionNull('0')">{{$t('evaluate.psychosomaticFunction.haveAccess')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyComprehensionNull('1')">{{$t('evaluate.psychosomaticFunction.littleDifficult')}}</Radio>
            <Radio label="2" @mouseup.native="onphysiologyComprehensionNull('2')">{{$t('evaluate.psychosomaticFunction.simpleContent')}}</Radio>
            <Radio label="3" @mouseup.native="onphysiologyComprehensionNull('3')">{{$t('evaluate.psychosomaticFunction.incomprehensible')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.interpersonal')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyRelationship">
            <Radio label="0" @mouseup.native="onphysiologyRelationshipNull('0')">{{$t('evaluate.psychosomaticFunction.noProblem')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyRelationshipNull('1')">{{$t('evaluate.psychosomaticFunction.littleProblem')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.character')}}</td>
      <td>
        <div class="cell">
          <Input type="textarea" autosize v-model="old_physiology.physiologyCharacter" class="new-width-input" style="width: 100%;" />
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.disorders')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyAction">
            <Radio label="0" @mouseup.native="onphysiologyActionNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyActionNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.obstacles')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyEstimate">
            <Radio label="0" @mouseup.native="onphysiologyEstimateNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyEstimateNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.memory')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyMemory">
            <Radio label="0" @mouseup.native="onphysiologyMemoryNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyMemoryNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.dysfunction')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologySports">
            <Radio label="0" @mouseup.native="onphysiologySportsNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologySportsNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.sensory')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyFeeling">
            <Radio label="0" @mouseup.native="onphysiologyFeelingNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyFeelingNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.brainHigher')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyBrain">
            <Radio label="0" @mouseup.native="onphysiologyBrainNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyBrainNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>

    <!-- 新增字段 栄養障害 start -->

    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.new.Nutrition_disorders')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyNutrition">
            <Radio label="0" @mouseup.native="onphysiologyNutritionNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyNutritionNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <!-- 新增字段 栄養障害 end -->

    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.pain')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyPain.bool">
            <Radio label="0" @mouseup.native="onphysiologyPainNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyPainNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
            <span style="margin-left: 0.2rem;">{{$t('evaluate.psychosomaticFunction.position')}}</span>
            [
            <Input type="textarea" autosize v-model="old_physiology.physiologyPain.content" style="width: 1rem; " class=" new-width-input" />]
          </RadioGroup>
        </div>
      </td>
    </tr>

    <!-- 新增字段 麻痺 start -->

    <tr style="display:none;">
      <!-- <td class="head-bg" colspan="4">{{$t('evaluate.new.paralisi')}}</td>
        <td>
          <div class="cell">
            <RadioGroup v-model="old_physiology.physiologyParalysis.bool" >
                <Radio  label="0" @mouseup.native="onphysiologyParalysisNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
                <Radio  label="1" @mouseup.native="onphysiologyParalysisNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
              <span style="margin-left: 0.2rem;">{{$t('evaluate.psychosomaticFunction.position')}}</span>
              [
              <Input
               type="textarea"
                autosize
                style="width: 0.9rem; "
                class=" new-width-input"
                v-model="old_physiology.physiologyParalysis.content"
              />]
            </RadioGroup>
          </div>
        </td> -->
    </tr>

    <!-- 新增字段 麻痺 end -->

    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.shrinkRefuse')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyRShrink.bool">
            <Radio label="0" @mouseup.native="onphysiologyRShrinkNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyRShrinkNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
            <span style="margin-left: 0.2rem;">{{$t('evaluate.psychosomaticFunction.position')}}</span>
            [
            <Input type="textarea" autosize v-model="old_physiology.physiologyRShrink.content" style="width:1rem;" class="new-width-input" />]
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.metalBody')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyMetal.bool">
            <Radio label="0" @mouseup.native="onphysiologyMetalNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyMetalNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
            <span style="margin-left: 0.2rem;">{{$t('evaluate.psychosomaticFunction.position')}}</span>
           [
            <Input type="textarea" autosize class="new-width-input" v-model="old_physiology.physiologyMetal.content" style="width:1rem;"  />]
          </RadioGroup>
           
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.allergyFood')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyIrritabilityF.bool">
            <Radio label="0" @mouseup.native="onphysiologyIrritabilityFNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyIrritabilityFNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
            <span style="margin-left: 0.2rem;">
              [
              <Input type="textarea" autosize v-model="old_physiology.physiologyIrritabilityF.content" style="width:1rem; " class="new-width-input" />]
            </span>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.allergyDrug')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyIrritabilityM.bool">
            <Radio label="0" @mouseup.native="onphysiologyIrritabilityMNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyIrritabilityMNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
            <span style="margin-left: 0.2rem;">
              [<Input type="textarea" autosize v-model="old_physiology.physiologyIrritabilityM.content" style="width:1rem;" class=" new-width-input" />]
            </span>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.infection')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyInfectious.bool">
            <Radio label="0" @mouseup.native="onphysiologyInfectiousNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyInfectiousNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
            <span style="margin-left: 0.2rem;">
              [
              <Input type="textarea" autosize v-model="old_physiology.physiologyInfectious.content" style="width:1rem;" class=" new-width-input" />]
            </span>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.medicineNoted')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyMedicine.radio">
            <Radio label="0" @mouseup.native="onphysiologyMedicineNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyMedicineNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          </RadioGroup>
          <CheckboxGroup v-model="old_physiology.physiologyMedicine.check" style="display:inline;">
            [
            <Checkbox label="0">{{$t('evaluate.psychosomaticFunction.anticoagulant')}}</Checkbox>
            <Checkbox label="1">{{$t('evaluate.psychosomaticFunction.hypoglycemic')}}</Checkbox>
            <Checkbox label="2">{{$t('evaluate.psychosomaticFunction.loweringBlood')}}</Checkbox>
            <Checkbox label="3">{{$t('evaluate.psychosomaticFunction.potassium')}}</Checkbox>
            <Checkbox label="4">{{$t('evaluate.psychosomaticFunction.antipsychotics')}}</Checkbox>
            <Checkbox label="5">{{$t('evaluate.psychosomaticFunction.sleepingPill')}}</Checkbox>]
          </CheckboxGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">HDS-R</td>
      <td>
        <div class="cell flex">
          <Input v-model="old_physiology.physiologyHdsNumber" type="textarea" autosize style="width: 0.8rem;" class=" new-width-input" />
          {{$t('evaluate.psychosomaticFunction.point')}}

          <Col span="12">
          <DatePicker class="new-width-input-date calendarFont" type="date" :editable="false" :value="old_physiology.physiologyHdsR" :placeholder="$t('global.choose')" style="width:1.5rem;position:relative;" @on-change="old_physiology.physiologyHdsR = $event"></DatePicker>
          </Col>)
        </div>
      </td>
    </tr>
    <!-- 新增字段 認知機能低下 start -->
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.new.Cognitive_f_d')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyLowCognitive">
            <Radio label="0" @mouseup.native="onphysiologyLowCognitiveNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyLowCognitiveNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <!-- 新增字段 認知機能低下 end -->

    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.diagnosis')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyCognitive">
            <Radio label="0" @mouseup.native="onphysiologyCognitiveNull('0')">{{$t('evaluate.psychosomaticFunction.disease')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyCognitiveNull('1')">{{$t('evaluate.psychosomaticFunction.cerebrovascular')}}</Radio>
            <Radio label="2" @mouseup.native="onphysiologyCognitiveNull('2')">{{$t('evaluate.psychosomaticFunction.frontotemporal')}}</Radio>
            <Radio label="3" @mouseup.native="onphysiologyCognitiveNull('3')">{{$t('evaluate.psychosomaticFunction.smallSize')}}</Radio>
            <Radio label="4" @mouseup.native="onphysiologyCognitiveNull('4')">{{$t('evaluate.psychosomaticFunction.unidentified')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.symptom')}}</td>
      <td class="head-bg" colspan="1">{{$t('evaluate.psychosomaticFunction.status')}}</td>
    </tr>
    <tr>
      <td class="head-bg" colspan="2" rowspan="3">{{$t('evaluate.psychosomaticFunction.symptoms')}}</td>
      <td class="head-bg" colspan="2">{{$t('evaluate.psychosomaticFunction.disordersMemory')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyCoreMemory">
            <Radio label="0" @mouseup.native="onphysiologyCoreMemoryNull('0')">{{$t('evaluate.psychosomaticFunction.rememberName')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyCoreMemoryNull('1')">{{$t('evaluate.psychosomaticFunction.rememberEating')}}</Radio>
            <Radio label="2" @mouseup.native="onphysiologyCoreMemoryNull('2')">{{$t('evaluate.psychosomaticFunction.overAgainSay')}}</Radio>
            <Radio label="3" @mouseup.native="onphysiologyCoreMemoryNull('3')">{{$t('evaluate.psychosomaticFunction.overAndOver')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="2">{{$t('evaluate.psychosomaticFunction.insight')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyCoreSense">
            <Radio label="0" @mouseup.native="onphysiologyCoreSenseNull('0')">{{$t('evaluate.psychosomaticFunction.knowDate')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyCoreSenseNull('1')">{{$t('evaluate.psychosomaticFunction.knowLocation')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="2">{{$t('evaluate.psychosomaticFunction.disobedience')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyCoreIncapacitate">
            <Radio label="0" @mouseup.native="onphysiologyCoreIncapacitateNull('0')">{{$t('evaluate.psychosomaticFunction.trashToilets')}}</Radio>
            <Radio label="1" @mouseup.native="onphysiologyCoreIncapacitateNull('1')">{{$t('evaluate.psychosomaticFunction.dressProperly')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="2" rowspan="4">BPSD</td>
      <td class="head-bg" colspan="2">{{$t('evaluate.psychosomaticFunction.linger')}}</td>
      <td>
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyBpsdWander">
            <Radio label="0" @mouseup.native="onphysiologyBpsdWanderNull('0')">{{$t('evaluate.psychosomaticFunction.aroundTurn')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="2">{{$t('evaluate.psychosomaticFunction.hallucination')}}</td>
      <td>
        <div class="cell">
          <CheckboxGroup v-model="old_physiology.physiologyBpsdIllusion">
            <Checkbox label="0">{{$t('evaluate.psychosomaticFunction.seeSomething')}}</Checkbox>
            <Checkbox label="1">{{$t('evaluate.psychosomaticFunction.hearSomething')}}</Checkbox>
          </CheckboxGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="2">{{$t('evaluate.psychosomaticFunction.violence')}}</td>
      <td>
        <div class="cell">
          <CheckboxGroup v-model="old_physiology.physiologyBpsdViolence">
            <Checkbox label="0">{{$t('evaluate.psychosomaticFunction.angry')}}</Checkbox>
            <Checkbox label="1">{{$t('evaluate.psychosomaticFunction.excited')}}</Checkbox>
            <Checkbox label="2">{{$t('evaluate.psychosomaticFunction.loud')}}</Checkbox>
          </CheckboxGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="2">{{$t('evaluate.psychosomaticFunction.unclean')}}</td>
      <td>
        <div class="cell">
          <CheckboxGroup v-model="old_physiology.physiologyBpsdDirty">
            <Checkbox label="0">{{$t('evaluate.psychosomaticFunction.outsideToilet')}}</Checkbox>
            <Checkbox label="1">{{$t('evaluate.psychosomaticFunction.stoolTouch')}}</Checkbox>
          </CheckboxGroup>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.foodMedicine.other')}}</td>
      <td colspan="1">
        <div class="cell">
          <Input v-model="old_physiology.physiologyOther" type="textarea" autosize :row="4" />
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.medical')}}</td>
      <td colspan="1">
        <div class="cell">
          <RadioGroup v-model="old_physiology.physiologyCaseHistoryN">
            <Radio label="0" @mouseup.native="onphysiologyCaseHistoryNNull('0')">{{$t('evaluate.psychosomaticFunction.seeTable')}}</Radio>
          </RadioGroup>
        </div>
      </td>
      <td rowspan="2" colspan="1">
        <div class="cell">
          <p>4：{{$t('evaluate.psychosomaticFunction.choice4')}}</p>
          <p>3：{{$t('evaluate.psychosomaticFunction.choice3')}}</p>
          <p>2：{{$t('evaluate.psychosomaticFunction.choice2')}}</p>
          <p>1：{{$t('evaluate.psychosomaticFunction.choice1')}}</p>
          <p>0：{{$t('evaluate.psychosomaticFunction.choice0')}}</p>
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="4">{{$t('evaluate.psychosomaticFunction.history')}}</td>
      <td colspan="1">
        <div class="cell" style="white-space:nowrap;">
          <RadioGroup v-model="old_physiology.physiologyCaseHistory">
            <Radio label="0" @mouseup.native="onphysiologyCaseHistoryNull('0')">{{$t('evaluate.psychosomaticFunction.seeTable')}}</Radio>
          </RadioGroup>
        </div>
      </td>
    </tr>
  </table>
  <!-- 身心机能 end -->

  <!-- 环境因子の作业汇总表 start -->

  <table v-show="tabIndex == 6 || tabBlock[6] == 6" class="table new-table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
    <tr>
      <td rowspan="8" class="head-bg" style="width: 0.5rem;">{{$t('evaluate.ambient.factor')}}</td>
      <td class="head-bg"></td>
      <td class="head-bg">{{$t('evaluate.ambient.topic')}}</td>
      <td class="head-bg" colspan="2">{{$t('evaluate.psychosomaticFunction.status')}}</td>
      <td class="head-bg">{{$t('evaluate.ambient.layoutRoom')}}</td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.essentialInfo.family')}}</td>
      <td class="head-bg">
       <CheckboxGroup v-model="old_divisor.divisorTopic.topic1">
          <Checkbox label="0" style="margin-left:0.05rem;">{{$t('evaluate.new.nbsp')}}</Checkbox>
       </CheckboxGroup>
      </td>
      <td colspan="2">
        <RadioGroup v-model="old_divisor.divisorFamily.bool">
          <Radio label="0" @mouseup.native="ondivisorFamilyNull('0')">{{$t('evaluate.ambient.liveAlone')}}</Radio>
          <Radio label="1" @mouseup.native="ondivisorFamilyNull('1')">{{$t('evaluate.ambient.couple')}}</Radio>
          <Radio label="2" @mouseup.native="ondivisorFamilyNull('2')">{{$t('evaluate.foodMedicine.other')}}</Radio>
          (<Input type="textarea" autosize v-model="old_divisor.divisorFamily.content" class="new-width-input " style="width: 25%;" />)
        </RadioGroup>
      </td>
      <td rowspan="3">
        <!-- 拖拽start -->
        <div id="capture">

          <div class="drag-header">

            <div class="drag-div1" :class="{'move-opacity' : !drag_list[0].bool}" @click="drag_list[0].bool = !drag_list[0].bool">
              <p style="font-size:0.08rem;white-space:nowrap;">{{$t('evaluate.new.Bed')}}</p>
              <img :src="imgSrc1" style="width:0.25rem;height:0.25rem;">
            </div>

            <div class="drag-div2" :class="{'move-opacity' : !drag_list[1].bool}" @click="drag_list[1].bool = !drag_list[1].bool">
              <p style="font-size:0.08rem;">{{$t('evaluate.new.Desk')}}</p>
              <img :src="imgSrc2" style="width:0.20rem;height:0.25rem;">
            </div>

            <div class="drag-div3" :class="{'move-opacity' : !drag_list[2].bool}" @click="drag_list[2].bool = !drag_list[2].bool">
              <p style="font-size:0.08rem;white-space:nowrap;">{{$t('evaluate.new.Car')}}</p>
              <img :src="imgSrc3" style="border:none;width:0.30rem;height:0.25rem;">
            </div>

            <div class="drag-div4" :class="{'move-opacity' : !drag_list[3].bool}" @click="drag_list[3].bool = !drag_list[3].bool">
              <p style="font-size:0.08rem;white-space:nowrap;">{{$t('evaluate.new.TV')}}</p>
              <img :src="imgSrc4" style="width:0.02rem;height:0.25rem;">
            </div>
            <div style="display:none;" class="drag-div5" :class="{'move-opacity' : !drag_list[4].bool}" @click="drag_list[4].bool = !drag_list[4].bool">

            </div>
            <div style="display:none;" class="drag-div6" :class="{'move-opacity' : !drag_list[5].bool}" @click="drag_list[5].bool = !drag_list[5].bool">

            </div>
          </div>
          <div class="drag-content">
            <div :class="{'move-none' : drag_list[0].bool}" ref="div1" id="drag-div1" draggable="true"></div>
            <div :class="{'move-none' : drag_list[1].bool}" ref="div2" id="drag-div2" draggable="true"></div>
            <div :class="{'move-none' : drag_list[2].bool}" ref="div3" id="drag-div3" draggable="true"></div>
            <div :class="{'move-none' : drag_list[3].bool}" ref="div4" id="drag-div4" draggable="true"></div>
            <div style="display:none;" :class="{'move-none' : drag_list[4].bool}" ref="div5" id="drag-div5" draggable="true"></div>
            <div style="display:none;" :class="{'move-none' : drag_list[5].bool}" ref="div6" id="drag-div6" draggable="true"></div>
          </div>

        </div>
        <!-- 拖拽end -->

      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.ambient.welfare')}}</td>
      <td class="head-bg">
        <CheckboxGroup v-model="old_divisor.divisorTopic.topic2">
          <Checkbox label="0" style="margin-left:0.05rem;">{{$t('evaluate.new.nbsp')}}</Checkbox>
       </CheckboxGroup>
      </td>
      <td>
        <CheckboxGroup v-model="old_divisor.divisorEquipment" style="display:flex;">
          <p style="white-space:nowrap;">
            <Checkbox label="0">{{$t('evaluate.ambient.stick')}}</Checkbox>
            <br/>
            <Checkbox label="4">{{$t('evaluate.ambient.handrail')}}</Checkbox>
            <br/>
            <Checkbox label="7">{{$t('evaluate.ambient.hill')}}</Checkbox>
          </p>

          <p style="white-space:nowrap;">
            <Checkbox label="1">{{$t('evaluate.new.Armor')}}</Checkbox>
            <br/>
            <Checkbox label="5">{{$t('evaluate.ambient.bed')}}</Checkbox>
          </p>

          <p style="white-space:nowrap;">
          <Checkbox label="2">{{$t('evaluate.ambient.orthosis')}}</Checkbox>
          <Checkbox label="3">{{$t('evaluate.ambient.walkerAid')}}</Checkbox>
          <br/>
          <Checkbox label="6">{{$t('evaluate.ambient.portableToilet')}}</Checkbox>
          </p>
        </CheckboxGroup>
      </td>
      <td class="block">
        <p class="">{{$t('evaluate.ambient.adjustment')}}</p>
        <RadioGroup v-model="old_divisor.divisorEquipmentAdjust" class="">
          <Radio label="0" @mouseup.native="ondivisorEquipmentAdjustNull('0')">{{$t('evaluate.ambient.adjusted')}}</Radio>
          <Radio label="1" @mouseup.native="ondivisorEquipmentAdjustNull('1')">{{$t('evaluate.ambient.unadjusted')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.ambient.carer')}}</td>
      <td class="head-bg">
          <CheckboxGroup v-model="old_divisor.divisorTopic.topic3">
          <Checkbox label="0" style="margin-left:0.05rem;">{{$t('evaluate.new.nbsp')}}</Checkbox>
       </CheckboxGroup>
      </td>
      <td>
        <RadioGroup v-model="old_divisor.divisorNurse">
          <Radio label="0" @mouseup.native="ondivisorNurseNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
          <Radio label="1" @mouseup.native="ondivisorNurseNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
        </RadioGroup>
      </td>
      <td rowspan="2" class="block">
        <p class="">{{$t('evaluate.ambient.adjustment')}}</p>
        <RadioGroup v-model="old_divisor.divisorNurseAdjust" class="">
          <Radio label="0" @mouseup.native="ondivisorNurseAdjustNull('0')">{{$t('evaluate.ambient.adjusted')}}</Radio>
          <Radio label="1" @mouseup.native="ondivisorNurseAdjustNull('1')">{{$t('evaluate.ambient.unadjusted')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.ambient.assistance')}}</td>
      <td class="head-bg">
           <CheckboxGroup v-model="old_divisor.divisorTopic.topic4">
          <Checkbox label="0" style="margin-left:0.05rem;">{{$t('evaluate.new.nbsp')}}</Checkbox>
       </CheckboxGroup>
      </td>
      <td>
        <RadioGroup v-model="old_divisor.divisorNurseAssist">
          <Radio label="0" @mouseup.native="ondivisorNurseAssistNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
          <Radio label="1" @mouseup.native="ondivisorNurseAssistNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
        </RadioGroup>
      </td>
      <td class="head-bg">{{$t('evaluate.foodMedicine.subject')}}</td>
    </tr>
    <tr class="block">
      <td class="head-bg">{{$t('evaluate.ambient.living')}}</td>
      <td class="head-bg">
       <CheckboxGroup v-model="old_divisor.divisorTopic.topic5">
          <Checkbox label="0" style="margin-left:0.05rem;">{{$t('evaluate.new.nbsp')}}</Checkbox>
       </CheckboxGroup>
      </td>
      <td style="font-size:14px;">
        <!-- 重构 start   -->
        <CheckboxGroup v-model="old_divisor.divisorDwelling.bool">
          <!-- 新增字段 一戸建 start -->
          <Checkbox label="0">{{$t('evaluate.new.Ichinohe_Ken')}}</Checkbox>
          <!-- 新增字段 一戸建 end -->
          <div style="display:flex;align-items:center;">
            <Checkbox label="1">{{$t('evaluate.ambient.detached')}}</Checkbox>(
            <Input type="textarea" autosize v-model="old_divisor.divisorDwelling.content1" class="new-width-input " style="width:25%;" />
            {{$t('evaluate.ambient.floor')}} )
          </div>
        
             <Checkbox label="2">{{$t('evaluate.ambient.stairs')}}</Checkbox>
             <Checkbox label="3">{{$t('evaluate.ambient.elevator')}}</Checkbox>
  
          
          <div style="display:flex;align-items:center;">
            <Checkbox label="4">{{$t('evaluate.ambient.handrail')}}</Checkbox>
            ( {{$t('evaluate.ambient.clothingLocation')}}:
            <Input type="textarea" autosize v-model="old_divisor.divisorDwelling.content2" class="new-width-input " style="width:25%;" />)
          </div>


         <div style="display:flex;"> 
           <p>
              {{$t('evaluate.ambient.board')}}
              <br>
              {{$t('evaluate.ambient.closestool')}}
          </p>
          <p>
             (
             <br/>
             (
          </p>

          <p>
            <Checkbox label="5">{{$t('evaluate.ambient.desk')}}</Checkbox>
            <Checkbox label="7">{{$t('evaluate.ambient.western')}}</Checkbox>
          </p>

          <div>
             <p><Checkbox label="6">{{$t('evaluate.new.Table')}} ● {{$t('evaluate.ambient.chair')}}</Checkbox> 
              <p style="display:flex;">
               <Checkbox label="8">{{$t('evaluate.ambient.japanese')}}</Checkbox>
               <Checkbox label="9">{{$t('evaluate.ambient.handToilet')}}</Checkbox>
             </p>
          </div>
          <p>
              )
              <br/>
              )
          </p>
         </div>
    
        </CheckboxGroup>

        <!-- 重构 end   -->
      </td>
      <td>
        <p class="">{{$t('evaluate.ambient.adjustment')}}</p>
        <RadioGroup v-model="old_divisor.divisorDwellingAdjust" class="">
          <Radio label="0" @mouseup.native="ondivisorDwellingAdjustNull('0')">{{$t('evaluate.ambient.adjusted')}}</Radio>
          <Radio label="1" @mouseup.native="ondivisorDwellingAdjustNull('1')">{{$t('evaluate.ambient.renovation')}}</Radio>
          <Radio label="2" @mouseup.native="ondivisorDwellingAdjustNull('2')">{{$t('evaluate.ambient.unadjusted')}}</Radio>
        </RadioGroup>
      </td>
      <td rowspan="3">
        <i-input type="textarea" :autosize="{minRows: 8}"   class="" v-model="old_divisor.divisorRoomLayoutB" :placeholder="$t('evaluate.foodMedicine.enter')"></i-input>
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.ambient.volume')}}</td>
      <td class="head-bg">
          <CheckboxGroup v-model="old_divisor.divisorTopic.topic6">
          <Checkbox label="0" style="margin-left:0.05rem;">{{$t('evaluate.new.nbsp')}}</Checkbox>
       </CheckboxGroup>
      </td>
      <td colspan="2">
        <RadioGroup v-model="old_divisor.divisorTraffic">
          <Radio label="0" @mouseup.native="ondivisorTrafficNull('0')">{{$t('evaluate.new.Many')}}</Radio>
          <Radio label="1" @mouseup.native="ondivisorTrafficNull('1')">{{$t('evaluate.new.Few')}}</Radio>
        </RadioGroup>
      </td>
    </tr>
    <tr>
      <td class="head-bg">{{$t('evaluate.ambient.social')}}</td>
      <td class="head-bg">
        <CheckboxGroup v-model="old_divisor.divisorTopic.topic7">
          <Checkbox label="0" style="margin-left:0.05rem;">{{$t('evaluate.new.nbsp')}}</Checkbox>
        </CheckboxGroup>
      </td>
      <td colspan="2">
        <Input type="textarea" autosize v-model="old_divisor.divisorSocial" class="new-width-input" style="width: 100%;" />
      </td>
    </tr>
  </table>

  <table v-show="tabIndex == 6 || tabBlock[6] == 6" class="table new-table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
    <tr>
      <td class="head-bg" rowspan="8" style="width: 0.5rem">{{$t('evaluate.new.Summary')}}</td>
      <td class="head-bg">{{$t('evaluate.foodMedicine.prospect')}}</td>
      <td colspan="3">
        <div class="cell">
          <Input type="textarea" autosize v-model="old_divisor.summarySense" class="new-width-input" style="width: 100%;" />
        </div>
      </td>
    </tr>
    <tr>
      <td class="head-bg" rowspan="3" style="width: 1.5rem;">{{$t('evaluate.topics.title3')}}</td>
      <td>
        <div class="cell">
          <Input type="textarea" autosize v-model="old_divisor.summaryProblemsA" class="new-width-input" style="width: 100%;" />
        </div>
      </td>
      <td rowspan="3" class="head-bg">
        {{$t('evaluate.ambient.priority')}}
      </td>
      <td>
        <div class="cell">
          <Input type="textarea" autosize v-model="old_divisor.summaryPriorityA" class="new-width-input" style="width: 100%;" />
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div class="cell">
          <Input type="textarea" autosize v-model="old_divisor.summaryProblemsB" class="new-width-input" style="width: 100%;" />
        </div>
      </td>

       <td>
        <div class="cell">
          <Input type="textarea" autosize v-model="old_divisor.summaryPriorityB" class="new-width-input" style="width: 100%;" />
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div class="cell">
          <Input type="textarea" autosize v-model="old_divisor.summaryProblemsC" class="new-width-input" style="width: 100%;" />
        </div>
      </td>

       <td>
        <div class="cell">
          <Input type="textarea" autosize v-model="old_divisor.summaryPriorityC" class="new-width-input" style="width: 100%;" />
        </div>
      </td>
    </tr>
    
    <tr>
      <td class="head-bg">{{$t('evaluate.ambient.risk')}}</td>
      
      <td colspan="3">
        <div class="cell">
          <CheckboxGroup v-model="old_divisor.summaryRisk" style="display:flex;">
             
            <p>
              <Checkbox label="0">{{$t('evaluate.topics.title6')}}</Checkbox>
              <br/>
              <Checkbox label="3">{{$t('evaluate.topics.title9')}}</Checkbox>
              <br/>
              <Checkbox label="5">{{$t('evaluate.topics.title11')}}</Checkbox>
              <br/>
              <Checkbox label="7">{{$t('evaluate.topics.title13')}}</Checkbox>
              <br/>
              <Checkbox label="8">{{$t('evaluate.topics.title14')}}</Checkbox>
            </p>

            <p>
              <Checkbox label="1">{{$t('evaluate.topics.title7')}}</Checkbox>
              <br/>
              <Checkbox label="4">{{$t('evaluate.topics.title10')}}</Checkbox>
              <br/>
              <Checkbox label="6">{{$t('evaluate.topics.title12')}}</Checkbox>
            </p>
    
            <p>
               <Checkbox label="2">{{$t('evaluate.topics.title8')}}</Checkbox>
            </p>
          </CheckboxGroup>
        </div>
      </td>
       
    </tr>
  </table>
  <!-- 环境因子の作业汇总表 end -->

  <!-- 新增排泄 start -->
  <table v-show="tabIndex == 3 || tabBlock[3] == 3" class="table new-table table-padding" cellspacing="0" cellpadding="0" border="1" style="border:1px solid #C4E8BF;">
    <tr>
      <td class="head-bg" colspan="3">{{$t("evaluate.excretion.criticism2")}}</td>
      <td colspan="15" style="text-align: left;">
            <CheckboxGroup v-model="old_excretion.excretionType" style="display:flex; justify-content: space-between; width:70%;">
            <Checkbox label="0">{{$t('evaluate.excretion.criticism3')}}</Checkbox>
            <Checkbox label="1">{{$t('evaluate.excretion.criticism4')}}</Checkbox>
            <Checkbox label="2">{{$t('evaluate.excretion.criticism5')}}</Checkbox>
            <Checkbox label="3">{{$t('evaluate.excretion.criticism6')}}</Checkbox>
            <Checkbox label="4">{{$t('evaluate.excretion.criticism7')}}</Checkbox>
          </CheckboxGroup>
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="3">{{$t("evaluate.excretion.criticism8")}}</td>
      <td colspan="6" style="white-space:nowrap;">
          <CheckboxGroup v-model="old_excretion.diaperType">
            <Checkbox label="0">{{$t('evaluate.excretion.criticism9')}}</Checkbox>
            <Checkbox label="1">{{$t('evaluate.excretion.criticism10')}}</Checkbox>
            <Checkbox label="2">{{$t('evaluate.excretion.criticism11')}}</Checkbox>
            <Checkbox label="3">{{$t('evaluate.excretion.criticism12')}}</Checkbox>
          </CheckboxGroup>
      </td>
      <td colspan="9">
        {{$t("evaluate.excretion.criticism13")}}：
        <Input type="textarea" autosize v-model="old_excretion.patType" class="new-width-input" style="width: 60%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="3">{{$t("evaluate.excretion.criticism14")}}</td>
      <td colspan="15">
        <RadioGroup v-model="old_excretion.intestinesGrain" size="large">
          <Radio label="0" @mouseup.native="onExcretionType('intestinesGrain' , '0')">{{$t("evaluate.excretion.criticism15")}}</Radio>
          <Radio label="1" @mouseup.native="onExcretionType('intestinesGrain' , '1')">{{$t("evaluate.excretion.criticism16")}}  {{$t("evaluate.excretion.criticism17")}}</Radio>
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
      <td class="textCenter" colspan="3">24</td>
    </tr>
    <tr>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.urineType.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.urineType.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.urineType.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.urineType.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.urineType.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.urineType.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.urineType.content7" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.urineType.content8" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.urineType.content9" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.urineType.content10" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.urineType.content11" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.urineType.content12" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="3">
        <Input type="textarea" autosize v-model="old_excretion.urineType.content13" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td colspan="3" class="head-bg">{{$t("evaluate.excretion.criticism19")}}</td>
      <td colspan="15">

        <RadioGroup v-model="old_excretion.excretion" size="large" style="display:flex; justify-content: space-between;width:75%;">
          <Radio label="0" @mouseup.native="onExcretionType('excretion' , '0')">{{$t("evaluate.excretion.criticism20")}}</Radio>
          <Radio label="1" @mouseup.native="onExcretionType('excretion' , '1')">{{$t("evaluate.excretion.criticism21")}}</Radio>
          <Radio label="2" @mouseup.native="onExcretionType('excretion' , '2')">{{$t("evaluate.excretion.criticism22")}}</Radio>
          <Radio label="3" @mouseup.native="onExcretionType('excretion' , '3')">{{$t("evaluate.excretion.criticism23")}}</Radio>
          <Radio label="4" @mouseup.native="onExcretionType('excretion' , '4')">{{$t("evaluate.excretion.criticism24")}}</Radio>
        </RadioGroup>
      </td>
    </tr>

    <tr>
      <td class="head-bg" colspan="3"></td>
      <td class="head-bg" colspan="3">{{$t("evaluate.excretion.criticism25")}}</td>
      <td class="head-bg" colspan="12">{{$t("evaluate.excretion.criticism26")}}</td>
    </tr>
    <tr>
      <td class="head-bg" colspan="2" style="white-space:nowrap;">{{$t("evaluate.excretion.criticism28")}}</td>
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
      <td class="head-bg stroke" colspan="3">{{$t("evaluate.excretion.criticism42")}}</td>
    </tr>
    <tr>
      <td class="head-bg" colspan="2">{{$t("evaluate.excretion.criticism43")}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.currentStatus.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.currentStatus.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.currentStatus.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.currentStatus.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.currentStatus.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.currentStatus.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.currentStatus.content7" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.currentStatus.content8" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.currentStatus.content9" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.currentStatus.content10" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.currentStatus.content11" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.currentStatus.content12" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.currentStatus.content13" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="3">
        <Input type="textarea" autosize v-model="old_excretion.currentStatus.content14" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="2">{{$t("evaluate.excretion.criticism44")}}</td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.surface.content1" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.surface.content2" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.surface.content3" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.surface.content4" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.surface.content5" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.surface.content6" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.surface.content7" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.surface.content8" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.surface.content9" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.surface.content10" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.surface.content11" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.surface.content12" class="new-width-input " style="width: 100%;" />
      </td>
      <td>
        <Input type="textarea" autosize v-model="old_excretion.surface.content13" class="new-width-input " style="width: 100%;" />
      </td>
      <td colspan="3">
        <Input type="textarea" autosize v-model="old_excretion.surface.content14" class="new-width-input " style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="5">{{$t("evaluate.excretion.criticism27")}}</td>
      <td colspan="13">
        <Input type="textarea" :autosize="{minRows: 5}"   v-model="old_excretion.specialSubject" :placeholder="$t('evaluate.foodMedicine.enter')" class="new-width-input" style="width: 100%;" />
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="5">{{$t("evaluate.excretion.criticism45")}}</td>
      <td colspan="13">
        <RadioGroup v-model="old_excretion.constipation.radio" size="large">
          <Radio label="0" @mouseup.native="onConstipation('0')">{{$t("evaluate.excretion.criticism46")}}</Radio>
          <Radio label="1" @mouseup.native="onConstipation('1')">{{$t("evaluate.excretion.criticism47")}}</Radio>
        </RadioGroup>
        ( <Input type="textarea" autosize v-model="old_excretion.constipation.content" class="new-width-input " style="width: 65%;" /> )
      </td>
    </tr>
    <tr>
      <td class="head-bg" colspan="5">{{$t("evaluate.excretion.criticism48")}}</td>
      <td colspan="13">
        <RadioGroup v-model="old_excretion.medicine.radio" size="large">
          <Radio label="0" @mouseup.native="onMedicine('0')">{{$t("evaluate.excretion.criticism49")}}</Radio>
          <Radio label="1" @mouseup.native="onMedicine('1')">{{$t("evaluate.excretion.criticism50")}}</Radio>
        </RadioGroup>
        ( <Input type="textarea" autosize v-model="old_excretion.medicine.content" class="new-width-input " style="width: 65%;" /> )
      </td>
    </tr>
  </table>
  <!-- 新增排泄 end -->

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
  selectInofList,
  insertInfoSave,
  updateInfo,
  selectEatList,
  selectEatListAll,
  insertEatSave,
  updateEat,
  selectMoveList,
  selectMoveListAll,
  insertMoveSave,
  updateMove,
  selectBatheList,
  selectBatheListAll,
  innsetBatheSave,
  updateBathe,
  selectPhysiologyList,
  selectPhysiologyListAll,
  innsetPhysiologySave,
  updatePhysiology,
  selectDivisorList,
  selectDivisorListAll,
  innsetDivisorSave,
  updateDivisor,
  selectExcretion,
  insertExcretion,
  updateExcretion ,
  getDateById ,
  selectExcretionList ,
  selectInofQuery
} from "../network/every";
import {
  sendUploadBase,
  getBaseInfo
} from "../network/Sinyu";
import qs from "qs";
import Vue from "vue";
import html2canvas from "html2canvas";
import {
  imgTo,
  format
} from "../assets/utils/Tools";
import {
  BASE_URL
} from "../network/http";

export default {
  data() {
    return {
      tabBlock:[0 , 1 , 2 , 3  , 4 , 5 , 6] ,
      oldName: "", //公共姓名
      oldAge: "", //公共年龄
      oldDate: "", //公共出生日期
      oldSex: "", //公共性别
      nikeName:"" ,//片假名
      checkinDate:"" ,//入所日
      level:"" ,//护理度
      level_arr:[
        this.$t("oldManMsg.Information.support") + "-1" , 
        this.$t("oldManMsg.Information.support") + "-2" ,
        this.$t("oldManMsg.Information.support2") + "-1" ,
        this.$t("oldManMsg.Information.support2") + "-2" ,
        this.$t("oldManMsg.Information.support2") + "-3" ,
        this.$t("oldManMsg.Information.support2") + "-4" ,
        this.$t("oldManMsg.Information.support2") + "-5" ,
        this.$t("oldManMsg.Information.support3") ,
        this.$t("oldManMsg.Information.support4") 
      ] , 
      imgSrc1: null,
      imgSrc2: null,
      imgSrc3: null,
      imgSrc4: null,
      self_man: null,
      self_woman: null,
      cancelIndex: 0,
      oldId: "",
      tabList: [
        "evaluate.tabList.essentialInfoTab",
        "evaluate.tabList.foodMedicineTab",
        'evaluate.tabList.mobileTrauma',
        "evaluate.excretion.criticism1",
        "evaluate.tabList.bathingChangingTab",
        "evaluate.tabList.psychosomaticTab",
        "evaluate.tabList.ambientTab",
      ],
      tabIndex: 0,
      // 基本信息+同意(data)
      old_info: {
        confirmFamily: "",
        confirmSelf: "",
        id: "",
        infoBeganDay: "",
        infoBirthday: {
          date: "",
          age: ""
        },
        infoBmi: "",
        infoConfirmDate: "",
        infoConsult: "",
        infoDate: "",
        infoGender: "",
        infoJp: "",
        infoKatakana: "",
        infoName: "",
        infoNurse: "",
        infoNursingLevel: "",
        infoPassport: "",
        infoPerception: "",
        infoSelfReliance: "",
        infoStature: "",
        infoValidityB: "",
        infoValidityE: "",
        infoWeight: "",
        oldManId: 3
      },
      // 食事+服药(data)
      old_eat: {
        assessmentInfoId: 0,
        eatBread: [],
        eatDessertForm: [],
        eatEat: "",
        eatEatLimit: {
          bool: "",
          content: ""
        },
        eatEatTime: [{
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }],
        eatEatTool: [],
        eatExpect: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: ""
        },
        eatInjectContent: {
          contentT: "",
          contentD: "",
          contentE: ""
        },
        eatInjectTime: [{
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }],
        eatProcess: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: ""
        },
        eatRice: [],
        eatSaltLimit: {
          bool: "",
          content: ""
        },
        eatSituation: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: ""
        },
        eatSoup: {
          contentT: "",
          contentD: "",
          contentE: ""
        },
        eatSpecialSubject: "",
        eatStapleOffer: {
          bool: "",
          content: ""
        },
        eatSugarLimit: {
          bool: "",
          content: ""
        },
        eatSwallow: "",
        eatTimeFixed: "",
        eatViceForm: [],
        eatViceOffer: {
          bool: "",
          content: ""
        },
        eatWater: [],
        eatWaterLimit: {
          bool: "",
          content: ""
        },
        eatWaterTemperature: "",
        eatWaterTool: {
          bool: "",
          content: ""
        },
        eatWaterUptake: ["", "", "", ""],
        id: "",
        medicineConfirm: "",
        medicineSelfAdmin: "",
        medicineSpeSub: "",
        medicineTake: "",
        oldManId: 3,
      },
      old_eat_id:"食事id" ,
      // 初始化数据
      copy_old_eat: {
        assessmentInfoId: 0,
        eatBread: [],
        eatDessertForm: [],
        eatEat: "",
        eatEatLimit: {
          bool: "",
          content: ""
        },
        eatEatTime: [{
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }],
        eatEatTool: [],
        eatExpect: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: ""
        },
        eatInjectContent: {
          contentT: "",
          contentD: "",
          contentE: ""
        },
        eatInjectTime: [{
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }, {
          dateS: "",
          dateE: ""
        }],
        eatProcess: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: ""
        },
        eatRice: [],
        eatSaltLimit: {
          bool: "",
          content: ""
        },
        eatSituation: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: ""
        },
        eatSoup: {
          contentT: "",
          contentD: "",
          contentE: ""
        },
        eatSpecialSubject: "",
        eatStapleOffer: {
          bool: "",
          content: ""
        },
        eatSugarLimit: {
          bool: "",
          content: ""
        },
        eatSwallow: "",
        eatTimeFixed: "",
        eatViceForm: [],
        eatViceOffer: {
          bool: "",
          content: ""
        },
        eatWater: [],
        eatWaterLimit: {
          bool: "",
          content: ""
        },
        eatWaterTemperature: "",
        eatWaterTool: {
          bool: "",
          content: ""
        },
        eatWaterUptake: ["", "", "", ""],
        id: "",
        medicineConfirm: "",
        medicineSelfAdmin: "",
        medicineSpeSub: "",
        medicineTake: "",
        oldManId: 3,
      },
      //移动&褥瘡危険因子の評価(data)   
      old_move: {
        assessmentInfoId: 0,
        bedsoreAdi: "",
        bedsoreBathe: "",
        bedsoreBmi: "",
        bedsoreCatheter: "",
        bedsoreDate: "",
        bedsoreEncopresis: "",
        bedsoreExist: "",
        bedsoreFactor: "",
        bedsoreHistory: "",
        bedsoreHonor: "",
        bedsoreKeep: "",
        bedsoreNow: {
          bool: "",
          content: "",
          bool2: []
        },
        bedsorePast: {
          bool: "",
          content: "" ,
          bool2: []
        },
        bedsorePolicy: "",
        bedsoreSit: "",
        bedsoreStand: "",
        bedsoreStatus: "",
        bedsoreTurn: "",
        bedsoreUnder: "",
        bedsoreUpper: "",
        bedsoreUracratia: "",
        id: "",
        moveAbility: "",
        moveAssess: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: "",
          content13: "",
          content14: "",
          content15: "",
          content16: "",
          content17: ""
        },
        moveAssist: "",
        moveClimbStairs: "",
        moveExpect: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: "",
          content13: "",
          content14: "",
          content15: "",
          content16: "",
          content17: ""
        },
        moveHorizon: "",
        moveMeans: "",
        moveReaction: "",
        moveSituation: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: ""
        },
        moveSpeSubA: "",
        moveSpeSubB: "",
        moveSpeSubC: "",
        moveTool: {
          bool: "",
          content: ""
        },
        moveTransform: {
          bool: "",
          content: ""
        },
        oldManId: 3,
      },
      old_move_id:"移动id" ,
      // 初始化数据
      copy_old_move: {
        assessmentInfoId: 0,
        bedsoreAdi: "",
        bedsoreBathe: "",
        bedsoreBmi: "",
        bedsoreCatheter: "",
        bedsoreDate: "",
        bedsoreEncopresis: "",
        bedsoreExist: "",
        bedsoreFactor: "",
        bedsoreHistory: "",
        bedsoreHonor: "",
        bedsoreKeep: "",
        bedsoreNow: {
          bool: "",
          content: ""
        },
        bedsorePast: {
          bool: "",
          content: ""
        },
        bedsorePolicy: "",
        bedsoreSit: "",
        bedsoreStand: "",
        bedsoreStatus: "",
        bedsoreTurn: "",
        bedsoreUnder: "",
        bedsoreUpper: "",
        bedsoreUracratia: "",
        id: "",
        moveAbility: "",
        moveAssess: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: "",
          content13: "",
          content14: "",
          content15: "",
          content16: "",
          content17: ""
        },
        moveAssist: "",
        moveClimbStairs: "",
        moveExpect: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: "",
          content13: "",
          content14: "",
          content15: "",
          content16: "",
          content17: ""
        },
        moveHorizon: "",
        moveMeans: "",
        moveReaction: "",
        moveSituation: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: ""
        },
        moveSpeSubA: "",
        moveSpeSubB: "",
        moveSpeSubC: "",
        moveTool: {
          bool: "",
          content: ""
        },
        moveTransform: {
          bool: "",
          content: ""
        },
        oldManId: 3,
      },
      // 入浴+更衣(data)
      old_bathe: {
        assessmentInfoId: 0,
        batheAssistor: "",
        batheBath: "",
        batheEnter: "",
        batheExpectA: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: ""
        },
        batheExpectB: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: ""
        },
        bathePlace: [],
        batheSituationA: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: ""
        },
        batheSituationB: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: ""
        },
        batheSpeSubA: "",
        batheSpeSubB: "",
        batheSpeSubC: "",
        batheTemperature: "",
        dressedDaytime: "",
        dressedExpectA: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: ""
        },
        dressedExpectB: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: ""
        },
        dressedExpectC: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: ""
        },
        dressedExpectD: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: ""
        },
        dressedExpectE: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: ""
        },
        dressedFaceTime: [],
        dressedFalseTooth: "",
        dressedLamp: [],
        dressedMakeUp: "",
        dressedNight: "",
        dressedOcTime: [],
        dressedOralCavity: "",
        dressedProcess: "",
        dressedSituationA: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: ""
        },
        dressedSituationB: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: ""
        },
        dressedSituationC: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: ""
        },
        dressedSituationD: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: ""
        },
        dressedSituationE: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: ""
        },
        dressedSleepStatus: {
          bool: [],
          content1: "",
          content2: ""
        },
        dressedSleepTime: "",
        dressedSleepWay: {
          bool: [],
          content1: "",
          content2: "",
          content3: ""
        },
        dressedSpeSubA: "",
        dressedSpeSubB: "",
        dressedSpeSubC: "",
        dressedSpeSubD: "",
        dressedSpeSubE: "",
        dressedThings: {
          bool: [],
          content: ""
        },
        dressedTidyUp: "",
        dressedTime: ["", "", ""],
        dressedUseTool: {
          bool: [],
          content: ""
        },
        dressedWakeUpTime: "",
        dressedWakeUpWay: "",
        id: "",
        oldManId: 3,
      },
      old_bathe_id:"入浴id" ,
      // 初始化数据
      copy_old_bathe: {
        assessmentInfoId: 0,
        batheAssistor: "",
        batheBath: "",
        batheEnter: "",
        batheExpectA: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: ""
        },
        batheExpectB: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: ""
        },
        bathePlace: [],
        batheSituationA: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: ""
        },
        batheSituationB: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: ""
        },
        batheSpeSubA: "",
        batheSpeSubB: "",
        batheSpeSubC: "",
        batheTemperature: "",
        dressedDaytime: "",
        dressedExpectA: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: ""
        },
        dressedExpectB: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: ""
        },
        dressedExpectC: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: ""
        },
        dressedExpectD: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: ""
        },
        dressedExpectE: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: ""
        },
        dressedFaceTime: [],
        dressedFalseTooth: "",
        dressedLamp: [],
        dressedMakeUp: "",
        dressedNight: "",
        dressedOcTime: [],
        dressedOralCavity: "",
        dressedProcess: "",
        dressedSituationA: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: ""
        },
        dressedSituationB: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: ""
        },
        dressedSituationC: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: ""
        },
        dressedSituationD: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: ""
        },
        dressedSituationE: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: ""
        },
        dressedSleepStatus: {
          bool: "",
          content1: "",
          content2: ""
        },
        dressedSleepTime: "",
        dressedSleepWay: {
          bool: "",
          content1: "",
          content2: "",
          content3: ""
        },
        dressedSpeSubA: "",
        dressedSpeSubB: "",
        dressedSpeSubC: "",
        dressedSpeSubD: "",
        dressedSpeSubE: "",
        dressedThings: {
          bool: "",
          content: ""
        },
        dressedTidyUp: "",
        dressedTime: ["", "", ""],
        dressedUseTool: {
          bool: [],
          content: ""
        },
        dressedWakeUpTime: "",
        dressedWakeUpWay: "",
        id: "",
        oldManId: 3,
      },
      // 心身机能
      old_physiology: {
        assessmentInfoId: 0,
        id: "",
        oldManId: 1,
        physiologyAction: "",
        physiologyAphasia: "",
        physiologyBpsdDirty: [],
        physiologyBpsdIllusion: [],
        physiologyBpsdViolence: [],
        physiologyBpsdWander: "",
        physiologyBrain: "",
        physiologyCaseHistory: "",
        physiologyCaseHistoryN: "",
        physiologyCharacter: "",
        physiologyCognitive: "",
        physiologyComprehension: "",
        physiologyCoreIncapacitate: "",
        physiologyCoreMemory: "",
        physiologyCoreSense: "",
        physiologyEstimate: "",
        physiologyEyesight: "",
        physiologyFeeling: "",
        physiologyHdsNumber: "",
        physiologyHdsR: "",
        physiologyHearing: "",
        physiologyInfectious: {
          bool: "",
          content: ""
        },
        physiologyIrritabilityF: {
          bool: "",
          content: ""
        },
        physiologyIrritabilityM: {
          bool: "",
          content: ""
        },
        physiologyLowCognitive: "",
        physiologyMedicine: {
          radio: "",
          check: []
        },
        physiologyMemory: "",
        physiologyMetal: {
          bool: "",
          content: ""
        },
        physiologyNutrition: "",
        physiologyOther: "",
        physiologyPain: {
          bool: "",
          content: ""
        },
        physiologyParalysis: {
          bool: "",
          content: ""
        },
        physiologyRShrink: {
          bool: "",
          content: ""
        },
        physiologyRelationship: "",
        physiologySituation: "",
        physiologySpeSub: {
          bool: "",
          content: "" , 
          topic:""
        },
        physiologySports: "",

      },
      old_physiology_id:"心身id" ,
      // 初始化数据
      copy_old_physiology: {
        assessmentInfoId: 0,
        id: "",
        oldManId: 1,
        physiologyAction: "",
        physiologyAphasia: "",
        physiologyBpsdDirty: [],
        physiologyBpsdIllusion: [],
        physiologyBpsdViolence: [],
        physiologyBpsdWander: "",
        physiologyBrain: "",
        physiologyCaseHistory: "",
        physiologyCaseHistoryN: "",
        physiologyCharacter: "",
        physiologyCognitive: "",
        physiologyComprehension: "",
        physiologyCoreIncapacitate: "",
        physiologyCoreMemory: "",
        physiologyCoreSense: "",
        physiologyEstimate: "",
        physiologyEyesight: "",
        physiologyFeeling: "",
        physiologyHdsNumber: "",
        physiologyHdsR: "",
        physiologyHearing: "",
        physiologyInfectious: {
          bool: "",
          content: ""
        },
        physiologyIrritabilityF: {
          bool: "",
          content: ""
        },
        physiologyIrritabilityM: {
          bool: "",
          content: ""
        },
        physiologyLowCognitive: "",
        physiologyMedicine: {
          radio: "",
          check: []
        },
        physiologyMemory: "",
        physiologyMetal: {
          bool: "",
          content: ""
        },
        physiologyNutrition: "",
        physiologyOther: "",
        physiologyPain: {
          bool: "",
          content: ""
        },
        physiologyParalysis: {
          bool: "",
          content: ""
        },
        physiologyRShrink: {
          bool: "",
          content: ""
        },
        physiologyRelationship: "",
        physiologySituation: "",
        physiologySpeSub: {
          bool: "",
          content: "" ,
          topic:""
        },
        physiologySports: "",

      },
      // 环境因子+作业汇总表
      old_divisor: {
        divisorTopic:{
          topic1:[] , 
          topic2:[] , 
          topic3:[] , 
          topic4:[] , 
          topic5:[] , 
          topic6:[] , 
          topic7:[] 
        } ,
        assessmentInfoId: 0,
        divisorDwelling: {
          bool: [],
          content1: "",
          content2: ""
        },
        divisorDwellingAdjust: "",
        divisorEquipment: [],
        divisorEquipmentAdjust: "",
        divisorFamily: {
          bool: "",
          content: ""
        },
        divisorNurse: "",
        divisorNurseAdjust: "",
        divisorNurseAssist: "",
        divisorRoomLayoutA: "",
        divisorRoomLayoutB: "",
        divisorSocial: "",
        divisorTraffic: "",
        id: "",
        oldManId: 1,
        summaryPriorityA: "",
        summaryPriorityB: "",
        summaryPriorityC: "",
        summaryProblemsA: "",
        summaryProblemsB: "",
        summaryProblemsC: "",
        summaryProblemsD: "",
        summaryRisk: [],
        summarySense: ""

      },
      old_divisor_id:"环境id" ,
      // 初始化数据
      copy_old_divisor: {
         divisorTopic:{
          topic1:[] , 
          topic2:[] , 
          topic3:[] , 
          topic4:[] , 
          topic5:[] , 
          topic6:[] , 
          topic7:[] 
        } ,
        assessmentInfoId: 0,
        divisorDwelling: {
          bool: [],
          content1: "",
          content2: ""
        },
        divisorDwellingAdjust: "",
        divisorEquipment: [],
        divisorEquipmentAdjust: "",
        divisorFamily: {
          bool: "",
          content: ""
        },
        divisorNurse: "",
        divisorNurseAdjust: "",
        divisorNurseAssist: "",
        divisorRoomLayoutA: "",
        divisorRoomLayoutB: "",
        divisorSocial: "",
        divisorTraffic: "",
        id: "",
        oldManId: 1,
        summaryPriorityA: "",
        summaryPriorityB: "",
        summaryPriorityC: "",
        summaryProblemsA: "",
        summaryProblemsB: "",
        summaryProblemsC: "",
        summaryProblemsD: "",
        summaryRisk: [],
        summarySense: ""

      },

      // 排泄
      old_excretion: {
        constipation: {
          radio: "",
          content: ""
        },
        currentStatus: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: "",
          content13: "",
          content14: ""
        },
        diaperType: [],
        excretion: "",
        excretionType: [],
        id: "",
        intestinesGrain: "",
        medicine: {
          radio: "",
          content: ""
        },
        oldManId: 1,
        patType: "",
        specialSubject: "",
        surface: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: "",
          content13: "",
          content14: ""
        },
        urineType: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: "",
          content13: "",
          content14: ""
        },
      },
      old_excretion_id:"排泄id" ,
      // 初始化数据
      copy_old_excretion: {
        constipation: {
          radio: "",
          content: ""
        },
        currentStatus: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: "",
          content13: "",
          content14: ""
        },
        diaperType: [],
        excretion: "",
        excretionType: [],
        id: "",
        intestinesGrain: "",
        medicine: {
          radio: "",
          content: ""
        },
        oldManId: 1,
        patType: "",
        specialSubject: "",
        surface: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: "",
          content13: "",
          content14: ""
        },
        urineType: {
          content1: "",
          content2: "",
          content3: "",
          content4: "",
          content5: "",
          content6: "",
          content7: "",
          content8: "",
          content9: "",
          content10: "",
          content11: "",
          content12: "",
          content13: "",
          content14: ""
        },
      },
      // 拖拽
      drag_flag: [null, null, null, null, null, null],
      drag_list: [{
          bool: true,
          x: 0,
          y: 0,
        },
        {
          bool: true,
          x: 0,
          y: 0,
        },
        {
          bool: true,
          x: 0,
          y: 0,
        },
        {
          bool: true,
          x: 0,
          y: 0,
        },
        {
          bool: true,
          x: 0,
          y: 0,
        },
        {
          bool: true,
          x: 0,
          y: 0,
        },
        ""

      ],
      // 初始化数据
      copy_drag_list: [{
          bool: true,
          x: 0,
          y: 0,
        },
        {
          bool: true,
          x: 0,
          y: 0,
        },
        {
          bool: true,
          x: 0,
          y: 0,
        },
        {
          bool: true,
          x: 0,
          y: 0,
        },
        {
          bool: true,
          x: 0,
          y: 0,
        },
        {
          bool: true,
          x: 0,
          y: 0,
        },
        ""

      ],
      drag_cur: [{
          x: "",
          y: ""
        },
        {
          x: "",
          y: ""
        },
        {
          x: "",
          y: ""
        },
        {
          x: "",
          y: ""
        },
        {
          x: "",
          y: ""
        },
        {
          x: "",
          y: ""
        }
      ],
      drag_dx: [null, null, null, null, null, null],
      drag_dy: [null, null, null, null, null, null],
      drag_nx: [null, null, null, null, null, null],
      drag_ny: [null, null, null, null, null, null],
      rem_bool: true,
      // 月次功能
      occurrenceYear: format(new Date(), "YYYY") ,
      occurrenceDay: '',
      occurrenceDayList: [],
      modifyDay: '',

      //  关联
      assessmentInfoId: "" 
    };
  },
  methods: {
    // 单选双击取消
    // --------------
    onTimeCancel() {
      this.cancelIndex += 1;
      let timmer = setTimeout(res => {
        this.cancelIndex = 1;
        clearTimeout(timmer);
      }, 300);

      if (this.cancelIndex <= 2) {
        return false;
      } else {
        return true;
      }
    },
    //---------------

    onmoveToolNull(index) {
      if (this.old_move.moveTool.bool == index) {
        setTimeout(() => {
          this.old_move.moveTool.bool = "";
        }, 10)
      }
    },
    onmoveTransformNull(index) {
      if (this.old_move.moveTransform.bool == index) {
        setTimeout(() => {
          this.old_move.moveTransform.bool = "";
        }, 10)
      }
    },
    onmoveReactionNull(index) {
      if (this.old_move.moveReaction == index) {
        setTimeout(() => {
          this.old_move.moveReaction = "";
        }, 10)
      }
    },
    onmoveMeansNull(index) {
      if (this.old_move.moveMeans == index) {
        setTimeout(() => {
          this.old_move.moveMeans = "";
        }, 10)
      }
    },
    onmoveAssistNull(index) {
      if (this.old_move.moveAssist == index) {
        setTimeout(() => {
          this.old_move.moveAssist = "";
        }, 10)
      }
    },
    onmoveHorizonNull(index) {
      if (this.old_move.moveHorizon == index) {
        setTimeout(() => {
          this.old_move.moveHorizon = "";
        }, 10)
      }
    },
    onmoveClimbStairsNull(index) {
      if (this.old_move.moveClimbStairs == index) {
        setTimeout(() => {
          this.old_move.moveClimbStairs = "";
        }, 10)
      }
    },
    onbedsoreFactorNull(index) {
      if (this.old_move.bedsoreFactor == index) {
        setTimeout(() => {
          this.old_move.bedsoreFactor = "";
        }, 10)
      }
    },
    onbedsoreExistNull(index) {
      if (this.old_move.bedsoreExist == index) {
        setTimeout(() => {
          this.old_move.bedsoreExist = "";
        }, 10)
      }
    },
    onbedsoreNowNull(index) {
      if (this.old_move.bedsoreNow.bool == index) {
        setTimeout(() => {
          this.old_move.bedsoreNow.bool = "";
        }, 10)
      }
    },
   
    onbedsorePastNull(index) {
      if (this.old_move.bedsorePast.bool == index) {
        setTimeout(() => {
          this.old_move.bedsorePast.bool = "";
        }, 10)
      }
    },
   
    onbedsoreStatusNull(index) {
      if (this.old_move.bedsoreStatus == index) {
        setTimeout(() => {
          this.old_move.bedsoreStatus = "";
        }, 10)
      }
    },
    onbedsoreBatheNull(index) {
      if (this.old_move.bedsoreBathe == index) {
        setTimeout(() => {
          this.old_move.bedsoreBathe = "";
        }, 10)
      }
    },
    onbedsorePolicyNull(index) {
      if (this.old_move.bedsorePolicy == index) {
        setTimeout(() => {
          this.old_move.bedsorePolicy = "";
        }, 10)
      }
    },
    onbedsoreAdiNull(index) {
      if (this.old_move.bedsoreAdi == index) {
        setTimeout(() => {
          this.old_move.bedsoreAdi = "";
        }, 10)
      }
    },
    onbedsoreUpperNull(index) {
      if (this.old_move.bedsoreUpper == index) {
        setTimeout(() => {
          this.old_move.bedsoreUpper = "";
        }, 10)
      }
    },
    onbedsoreUnderNull(index) {
      if (this.old_move.bedsoreUnder == index) {
        setTimeout(() => {
          this.old_move.bedsoreUnder = "";
        }, 10)
      }
    },
    onbedsoreTurnNull(index) {
      if (this.old_move.bedsoreTurn == index) {
        setTimeout(() => {
          this.old_move.bedsoreTurn = "";
        }, 10)
      }
    },
    onbedsoreKeepNull(index) {
      if (this.old_move.bedsoreKeep == index) {
        setTimeout(() => {
          this.old_move.bedsoreKeep = "";
        }, 10)
      }
    },
    onbedsoreSitNull(index) {
      if (this.old_move.bedsoreSit == index) {
        setTimeout(() => {
          this.old_move.bedsoreSit = "";
        }, 10)
      }
    },
    onbedsoreStandNull(index) {
      if (this.old_move.bedsoreStand == index) {
        setTimeout(() => {
          this.old_move.bedsoreStand = "";
        }, 10)
      }
    },
    onbedsoreUracratiaNull(index) {
      if (this.old_move.bedsoreUracratia == index) {
        setTimeout(() => {
          this.old_move.bedsoreUracratia = "";
        }, 10)
      }
    },
    onbedsoreEncopresisNull(index) {
      if (this.old_move.bedsoreEncopresis == index) {
        setTimeout(() => {
          this.old_move.bedsoreEncopresis = "";
        }, 10)
      }
    },
    onbedsoreCathetersNull(index) {
      if (this.old_move.bedsoreCatheter == index) {
        setTimeout(() => {
          this.old_move.bedsoreCatheter = "";
        }, 10)
      }
    },
    onbedsoreHonorNull(index) {
      if (this.old_move.bedsoreHonor == index) {
        setTimeout(() => {
          this.old_move.bedsoreHonor = "";
        }, 10)
      }
    },
    onbedsoreHistoryNull(index) {
      if (this.old_move.bedsoreHistory == index) {
        setTimeout(() => {
          this.old_move.bedsoreHistory = "";
        }, 10)
      }
    },

    onEatEatNull(index) {
      if (this.old_eat.eatEat == index) {
        setTimeout(() => {
          this.old_eat.eatEat = "";
        }, 10)
      }
    },
    oneatTimeFixedNull(index) {
      if (this.old_eat.eatTimeFixed == index) {
        setTimeout(() => {
          this.old_eat.eatTimeFixed = "";
        }, 10)
      }
    },
    oneatSwallowNull(index) {
      if (this.old_eat.eatSwallow == index) {
        setTimeout(() => {
          this.old_eat.eatSwallow = "";
        }, 10)
      }
    },
    oneatEatToolNull(index) {
      if (this.old_eat.eatEatTool == index) {
        setTimeout(() => {
          this.old_eat.eatEatTool = "";
        }, 10)
      }
    },
    oneatWaterToolNull(index) {
      if (this.old_eat.eatWaterTool.bool == index) {
        setTimeout(() => {
          this.old_eat.eatWaterTool.bool = "";
        }, 10)
      }
    },
    oneatEatLimitlNull(index) {
      if (this.old_eat.eatEatLimit.bool == index) {
        setTimeout(() => {
          this.old_eat.eatEatLimit.bool = "";
        }, 10)
      }
    },
    oneatWaterLimitNull(index) {
      if (this.old_eat.eatWaterLimit.bool == index) {
        setTimeout(() => {
          this.old_eat.eatWaterLimit.bool = "";
        }, 10)
      }
    },
    oneatSaltLimitNull(index) {
      if (this.old_eat.eatSaltLimit.bool == index) {
        setTimeout(() => {
          this.old_eat.eatSaltLimit.bool = "";
        }, 10)
      }
    },
    oneatSugarLimitNull(index) {
      if (this.old_eat.eatSugarLimit.bool == index) {
        setTimeout(() => {
          this.old_eat.eatSugarLimit.bool = "";
        }, 10)
      }
    },
    oneatStapleOfferNull(index) {
      if (this.old_eat.eatStapleOffer.bool == index) {
        setTimeout(() => {
          this.old_eat.eatStapleOffer.bool = "";
        }, 10)
      }
    },
    oneatViceOfferNull(index) {
      if (this.old_eat.eatViceOffer.bool == index) {
        setTimeout(() => {
          this.old_eat.eatViceOffer.bool = "";
        }, 10)
      }
    },
    oneatWaterTemperatureNull(index) {
      if (this.old_eat.eatWaterTemperature == index) {
        setTimeout(() => {
          this.old_eat.eatWaterTemperature = "";
        }, 10)
      }
    },
    onmedicineTakeNull(index) {
      if (this.old_eat.medicineTake == index) {
        setTimeout(() => {
          this.old_eat.medicineTake = "";
        }, 10)
      }
    },
    onmedicineConfirmNull(index) {
      if (this.old_eat.medicineConfirm == index) {
        setTimeout(() => {
          this.old_eat.medicineConfirm = "";
        }, 10)
      }
    },
    onmedicineSelfAdminNull(index) {
      if (this.old_eat.medicineSelfAdmin == index) {
        setTimeout(() => {
          this.old_eat.medicineSelfAdmin = "";
        }, 10)
      }
    },
    onbatheTemperatureNull(index) {
      if (this.old_bathe.batheTemperature == index) {
        setTimeout(() => {
          this.old_bathe.batheTemperature = "";
        }, 10)
      }
    },
    onbatheAssistorNull(index) {
      if (this.old_bathe.batheAssistor == index) {
        setTimeout(() => {
          this.old_bathe.batheAssistor = "";
        }, 10)
      }
    },
    onbatheBathNull(index) {
      if (this.old_bathe.batheBath == index) {
        setTimeout(() => {
          this.old_bathe.batheBath = "";
        }, 10)
      }
    },
    onbatheEnterNull(index) {
      if (this.old_bathe.batheEnter == index) {
        setTimeout(() => {
          this.old_bathe.batheEnter = "";
        }, 10)
      }
    },
    ondressedDaytimeNull(index) {
      if (this.old_bathe.dressedDaytime == index) {
        setTimeout(() => {
          this.old_bathe.dressedDaytime = "";
        }, 10)
      }
    },
    ondressedNightNull(index) {
      if (this.old_bathe.dressedNight == index) {
        setTimeout(() => {
          this.old_bathe.dressedNight = "";
        }, 10)
      }
    },
    ondressedProcessNull(index) {
      if (this.old_bathe.dressedProcess == index) {
        setTimeout(() => {
          this.old_bathe.dressedProcess = "";
        }, 10)
      }
    },
    ondressedOralCavityNull(index) {
      if (this.old_bathe.dressedOralCavity == index) {
        setTimeout(() => {
          this.old_bathe.dressedOralCavity = "";
        }, 10)
      }
    },
    ondressedTidyUpNull(index) {
      if (this.old_bathe.dressedTidyUp == index) {
        setTimeout(() => {
          this.old_bathe.dressedTidyUp = "";
        }, 10)
      }
    },
    ondressedFalseToothNull(index) {
      if (this.old_bathe.dressedFalseTooth == index) {
        setTimeout(() => {
          this.old_bathe.dressedFalseTooth = "";
        }, 10)
      }
    },
    ondressedFaceTimeNull(index) {
      if (this.old_bathe.dressedFaceTime == index) {
        setTimeout(() => {
          this.old_bathe.dressedFaceTime = "";
        }, 10)
      }
    },
    ondressedMakeUpNull(index) {
      if (this.old_bathe.dressedMakeUp == index) {
        setTimeout(() => {
          this.old_bathe.dressedMakeUp = "";
        }, 10)
      }
    },
    ondressedWakeUpWayNull(index) {
      if (this.old_bathe.dressedWakeUpWay == index) {
        setTimeout(() => {
          this.old_bathe.dressedWakeUpWay = "";
        }, 10)
      }
    },
    ondressedSleepWayNull(index) {
      if (this.old_bathe.dressedSleepWay.bool == index) {
        setTimeout(() => {
          this.old_bathe.dressedSleepWay.bool = "";
        }, 10)
      }
    },
    ondressedSleepStatusNull(index) {
      if (this.old_bathe.dressedSleepStatus.bool == index) {
        setTimeout(() => {
          this.old_bathe.dressedSleepStatus.bool = "";
        }, 10)
      }
    },
    ondressedLampNull(index) {
      if (this.old_bathe.dressedLamp == index) {
        setTimeout(() => {
          this.old_bathe.dressedLamp = "";
        }, 10)
      }
    },
    ondressedThingsNull(index) {
      if (this.old_bathe.dressedThings.bool == index) {
        setTimeout(() => {
          this.old_bathe.dressedThings.bool = "";
        }, 10)
      }
    },
    onphysiologyEyesightNull(index) {
      if (this.old_physiology.physiologyEyesight == index) {
        setTimeout(() => {
          this.old_physiology.physiologyEyesight = "";
        }, 10)
      }
    },
    onphysiologyHearingNull(index) {
      if (this.old_physiology.physiologyHearing == index) {
        setTimeout(() => {
          this.old_physiology.physiologyHearing = "";
        }, 10)
      }
    },
    onphysiologySpeSubNull(index) {
      if (this.old_physiology.physiologySpeSub.bool == index) {
        setTimeout(() => {
          this.old_physiology.physiologySpeSub.bool = "";
        }, 10)
      }
    },
    onphysiologyAphasiabNull(index) {
      if (this.old_physiology.physiologyAphasia == index) {
        setTimeout(() => {
          this.old_physiology.physiologyAphasia = "";
        }, 10)
      }
    },
    onphysiologyComprehensionNull(index) {
      if (this.old_physiology.physiologyComprehension == index) {
        setTimeout(() => {
          this.old_physiology.physiologyComprehension = "";
        }, 10)
      }
    },
    onphysiologyRelationshipNull(index) {
      if (this.old_physiology.physiologyRelationship == index) {
        setTimeout(() => {
          this.old_physiology.physiologyRelationship = "";
        }, 10)
      }
    },
    onphysiologyActionNull(index) {
      if (this.old_physiology.physiologyAction == index) {
        setTimeout(() => {
          this.old_physiology.physiologyAction = "";
        }, 10)
      }
    },
    onphysiologyEstimateNull(index) {
      if (this.old_physiology.physiologyEstimate == index) {
        setTimeout(() => {
          this.old_physiology.physiologyEstimate = "";
        }, 10)
      }
    },
    onphysiologyMemoryNull(index) {
      if (this.old_physiology.physiologyMemory == index) {
        setTimeout(() => {
          this.old_physiology.physiologyMemory = "";
        }, 10)
      }
    },
    onphysiologySportsNull(index) {
      if (this.old_physiology.physiologySports == index) {
        setTimeout(() => {
          this.old_physiology.physiologySports = "";
        }, 10)
      }
    },
    onphysiologyFeelingNull(index) {
      if (this.old_physiology.physiologyFeeling == index) {
        setTimeout(() => {
          this.old_physiology.physiologyFeeling = "";
        }, 10)
      }
    },
    onphysiologyBrainNull(index) {
      if (this.old_physiology.physiologyBrain == index) {
        setTimeout(() => {
          this.old_physiology.physiologyBrain = "";
        }, 10)
      }
    },
    onphysiologyNutritionNull(index) {
      if (this.old_physiology.physiologyNutrition == index) {
        setTimeout(() => {
          this.old_physiology.physiologyNutrition = "";
        }, 10)
      }
    },
    onphysiologyPainNull(index) {
      if (this.old_physiology.physiologyPain.bool == index) {
        setTimeout(() => {
          this.old_physiology.physiologyPain.bool = "";
        }, 10)
      }
    },
    onphysiologyParalysisNull(index) {
      if (this.old_physiology.physiologyParalysis.bool == index) {
        setTimeout(() => {
          this.old_physiology.physiologyParalysis.bool = "";
        }, 10)
      }
    },
    onphysiologyRShrinkNull(index) {
      if (this.old_physiology.physiologyRShrink.bool == index) {
        setTimeout(() => {
          this.old_physiology.physiologyRShrink.bool = "";
        }, 10)
      }
    },
    onphysiologyMetalNull(index) {
      if (this.old_physiology.physiologyMetal.bool == index) {
        setTimeout(() => {
          this.old_physiology.physiologyMetal.bool = "";
        }, 10)
      }
    },
    onphysiologyIrritabilityFNull(index) {
      if (this.old_physiology.physiologyIrritabilityF.bool == index) {
        setTimeout(() => {
          this.old_physiology.physiologyIrritabilityF.bool = "";
        }, 10)
      }
    },
    onphysiologyIrritabilityMNull(index) {
      if (this.old_physiology.physiologyIrritabilityM.bool == index) {
        setTimeout(() => {
          this.old_physiology.physiologyIrritabilityM.bool = "";
        }, 10)
      }
    },
    onphysiologyInfectiousNull(index) {
      if (this.old_physiology.physiologyInfectious.bool == index) {
        setTimeout(() => {
          this.old_physiology.physiologyInfectious.bool = "";
        }, 10)
      }
    },
    onphysiologyMedicineNull(index) {
      if (this.old_physiology.physiologyMedicine.radio == index) {
        setTimeout(() => {
          this.old_physiology.physiologyMedicine.radio = "";
        }, 10)
      }
    },
    onphysiologyLowCognitiveNull(index) {
      if (this.old_physiology.physiologyLowCognitive == index) {
        setTimeout(() => {
          this.old_physiology.physiologyLowCognitive = "";
        }, 10)
      }
    },
    onphysiologyCognitiveNull(index) {
      if (this.old_physiology.physiologyCognitive == index) {
        setTimeout(() => {
          this.old_physiology.physiologyCognitive = "";
        }, 10)
      }
    },
    onphysiologyCognitiveNull(index) {
      if (this.old_physiology.physiologyCognitive == index) {
        setTimeout(() => {
          this.old_physiology.physiologyCognitive = "";
        }, 10)
      }
    },
    onphysiologyCoreMemoryNull(index) {
      if (this.old_physiology.physiologyCoreMemory == index) {
        setTimeout(() => {
          this.old_physiology.physiologyCoreMemory = "";
        }, 10)
      }
    },
    onphysiologyCoreSenseNull(index) {
      if (this.old_physiology.physiologyCoreSense == index) {
        setTimeout(() => {
          this.old_physiology.physiologyCoreSense = "";
        }, 10)
      }
    },
    onphysiologyCoreIncapacitateNull(index) {
      if (this.old_physiology.physiologyCoreIncapacitate == index) {
        setTimeout(() => {
          this.old_physiology.physiologyCoreIncapacitate = "";
        }, 10)
      }
    },
    onphysiologyBpsdWanderNull(index) {
      if (this.old_physiology.physiologyBpsdWander == index) {
        setTimeout(() => {
          this.old_physiology.physiologyBpsdWander = "";
        }, 10)
      }
    },
    onphysiologyCaseHistoryNNull(index) {
      if (this.old_physiology.physiologyCaseHistoryN == index) {
        setTimeout(() => {
          this.old_physiology.physiologyCaseHistoryN = "";
        }, 10)
      }
    },
    onphysiologyCaseHistoryNull(index) {
      if (this.old_physiology.physiologyCaseHistory == index) {
        setTimeout(() => {
          this.old_physiology.physiologyCaseHistory = "";
        }, 10)
      }
    },
    ondivisorFamilyNull(index) {
      if (this.old_divisor.divisorFamily.bool == index) {
        setTimeout(() => {
          this.old_divisor.divisorFamily.bool = "";
        }, 10)
      }
    },
    ondivisorEquipmentAdjustNull(index) {
      if (this.old_divisor.divisorEquipmentAdjust == index) {
        setTimeout(() => {
          this.old_divisor.divisorEquipmentAdjust = "";
        }, 10)
      }
    },
    ondivisorNurseNull(index) {
      if (this.old_divisor.divisorNurse == index) {
        setTimeout(() => {
          this.old_divisor.divisorNurse = "";
        }, 10)
      }
    },
    ondivisorNurseAdjustNull(index) {
      if (this.old_divisor.divisorNurseAdjust == index) {
        setTimeout(() => {
          this.old_divisor.divisorNurseAdjust = "";
        }, 10)
      }
    },
    ondivisorNurseAssistNull(index) {
      if (this.old_divisor.divisorNurseAssist == index) {
        setTimeout(() => {
          this.old_divisor.divisorNurseAssist = "";
        }, 10)
      }
    },
    ondivisorDwellingAdjustNull(index) {
      if (this.old_divisor.divisorDwellingAdjust == index) {
        setTimeout(() => {
          this.old_divisor.divisorDwellingAdjust = "";
        }, 10)
      }
    },
    ondivisorTrafficNull(index) {
      if (this.old_divisor.divisorTraffic == index) {
        setTimeout(() => {
          this.old_divisor.divisorTraffic = "";
        }, 10)
      }
    },
  

     changeTab(index) {
      if(!this.assessmentInfoId){
         this.$Notice.error({
            title: this.$t("global.operationFail"),
            desc: this.$t("evaluate.new.Basic_jy")
         });
        return;
      } 
      
      this.tabIndex = index;
      if (this.tabIndex == 0) {
        // 基本信息+同意(获取数据)
        this.onGetSelectInofList();
      } else if (this.tabIndex == 1) {
        // 食事+服药(获取数据)
        this.onGetSelectEatListAll();
      } else if (this.tabIndex == 2) {
        //移动+褥瘡危険因子の評価(获取数据)
        this.onGetSelectMoveAll();
      } else if (this.tabIndex == 4) {
        // 入浴+更衣(获取数据)
        this.onGetSelectBatheAll();
      } else if (this.tabIndex == 5) {
        // 心身机能(获取数据)
        this.onGetSelectPhysiologyListAll();
      } else if (this.tabIndex == 6) {
        // 环境因子+汇总(获取数据)
        this.onGetSelectDivisorListAll();
      } else if (this.tabIndex == 3) {
        // 排泄
        this.onSelectExcretion();
      }

    },
    async onInsert() {
      if (this.tabIndex == 0) {
        // 基本信息+同意(插入/更新数据)
        this.onSelectInofList();
      } else if (this.tabIndex == 1) {
        // 食事+服药(插入/更新数据)
        this.onSelectEatListAll();
      } else if (this.tabIndex == 2) {
        //移动+褥瘡危険因子の評価(插入/更新数据)
        this.onSelectMoveAll();
      } else if (this.tabIndex == 4) {
        // 入浴+更衣(插入/更新数据)
        this.onSelectBatheAll();
      } else if (this.tabIndex == 5) {
        // 心身机能
        this.onSelectPhysiologyListAll();
      } else if (this.tabIndex == 6) {
        // 环境因子+作业汇总表
        this.onSelectDivisorListAll();
      } else if (this.tabIndex == 3) {
        // 排泄
        this.onUIExcretion();
      }
    },

    onUpdate() {},
    // 基本信息+同意(start)
    async onGetSelectInofList() {
    
      try{
      let res = await selectInofQuery({
        oldManId: this.oldId,
        infoDate:this.occurrenceDay
      });
      if(res.code == 0 || res.code == 416){
          if (res.data) {
              this.old_info.id = res.data.id;
              this.old_info = res.data;
              this.old_info.infoBirthday = JSON.parse(res.data.infoBirthday);
              this.assessmentInfoId = res.data.id;
              this.occurrenceDay = res.data.infoDate;
              if (this.tabIndex == 1) {
                    // 食事+服药(获取数据)
                    this.onGetSelectEatListAll();
                  } else if (this.tabIndex == 2) {
                    //移动+褥瘡危険因子の評価(获取数据)
                    this.onGetSelectMoveAll();
                  } else if (this.tabIndex == 4) {
                    // 入浴+更衣(获取数据)
                    this.onGetSelectBatheAll();
                  } else if (this.tabIndex == 5) {
                    // 心身机能(获取数据)
                    this.onGetSelectPhysiologyListAll();
                  } else if (this.tabIndex == 6) {
                    // 环境因子+汇总(获取数据)
                    this.onGetSelectDivisorListAll();
                  } else if (this.tabIndex == 3) {
                    this.onSelectExcretion();
                  }

            }
      }else{
         this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t('evaluate.tabList.essentialInfoTab') + this.$t("global.loadFail"),
                });
         }
      }catch(err){
        console.log("基本情報 • 意向" + err);
        this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t('evaluate.tabList.essentialInfoTab') + this.$t("global.loadFail"),
                });
      }
      
   
    },
    async onSelectInofList() {
      this.old_info.infoGender = this.gender;
      this.old_info.infoName = this.oldName;
      this.old_info.infoKatakana =  this.nikeName;
      this.old_info.infoBeganDay = this.checkinDate;
      this.old_info.infoNursingLevel =  this.level;
      this.old_info.infoBirthday = JSON.stringify({
        date: this.oldDate,
        age: this.oldAge
      });   
    if(this.old_info.infoDate == ""){
          this.$Notice.error({
            title: this.$t("global.operationFail"),
            desc:  this.$t("evaluate.new.Choose_j")
          });
       return
    }

      // let timeBirthday = `${this.old_info.infoBirthday[0]}-${this.old_info.infoBirthday[1]}-${this.old_info.infoBirthday[2]}`;
      // let timeConfirmDate = `${this.old_info.infoConfirmDate[0]}-${this.old_info.infoConfirmDate[1]}-${this.old_info.infoConfirmDate[2]}`;

      // let timeValidityB = `${this.old_info.infoValidityB[0]}-${this.old_info.infoValidityB[1]}-${this.old_info.infoValidityB[2]}`;
      // let timeValidityE = `${this.old_info.infoValidityE[0]}-${this.old_info.infoValidityE[1]}-${this.old_info.infoValidityE[2]}`;

      this.old_info.oldManId = this.oldId;
        if(this.old_info.infoDate == this.occurrenceDay){
           try{
             let result = await updateInfo(this.old_info);
              if (result.code == 0) {
                this.$Notice.success({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.operationSuccess"),
                });
            } else if (result.code == 415) {
              this.$Notice.error({
                title: this.$t("global.operationFail"),
                desc: this.$t("global.claim")
              });
                return
            } else {
                this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.failed"),
                });
              }
              this.onGetSelectInofList();
           }catch(err){
               console.log(err);
               this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.failed"),
                });
           }
             

        }else if(this.old_info.infoDate != this.occurrenceDay){
          this.old_info.id = "";
           try{
           let res = await insertInfoSave(this.old_info);
                 if (res.code == 0) {
                  this.$Notice.success({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.operationSuccess"),
                  });
                }else if (res.code == 415) {
                  this.$Notice.error({
                    title: this.$t("global.operationFail"),
                    desc: this.$t("global.claim")
                  });
                    return
                 } else {
                  this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.failed"),
                  });
                }
                this.selectGetDateById();
          }catch(err){
            console.log(err);
            this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.failed"),
                  });
          }
        
      }

    },
    // 老人公共信息
    async oSharenOldInfo() {

      let res = await getBaseInfo({
        id: this.oldId
      });
      this.oldName = res.data.name;
      this.oldAge = res.data.age;
      this.oldDate = res.data.birthday;
      this.nikeName = res.data.nikeName;
      this.checkinDate = res.data.checkinDate;
      this.level = res.data.level;
      this.gender = res.data.sex;

      if (res.data.sex == 2) {
        this.oldSex = "oldManMsg.Information.female";
      } else if (res.data.sex == 1) {
        this.oldSex = "oldManMsg.Information.male";
      }


    },
    // 食事+服药(start)
    async onGetSelectEatListAll() {  
      try{
    let res = await selectEatList({
          oldManId: this.oldId,
          assessmentInfoId: this.assessmentInfoId
        });
        if(res.code == 0 || res.code == 416){
            if (res.data.length > 0) {
              this.old_eat = res.data[0];
              // // 数据处理（转回原来状态）
              this.old_eat.eatBread =  JSON.parse(res.data[0].eatBread);
              this.old_eat.eatRice =  JSON.parse(res.data[0].eatRice);
              this.old_eat.eatViceForm =  JSON.parse(res.data[0].eatViceForm);
              this.old_eat.eatWater =  JSON.parse(res.data[0].eatWater);
              this.old_eat.eatDessertForm =  JSON.parse(res.data[0].eatDessertForm);
              this.old_eat.eatEatLimit = JSON.parse(res.data[0].eatEatLimit);
              this.old_eat.eatEatTime = JSON.parse(res.data[0].eatEatTime);
              this.old_eat.eatExpect = JSON.parse(res.data[0].eatExpect);
              this.old_eat.eatInjectContent = JSON.parse(
                res.data[0].eatInjectContent
              );
              this.old_eat.eatInjectTime = JSON.parse(res.data[0].eatInjectTime);
              this.old_eat.eatProcess = JSON.parse(res.data[0].eatProcess);
              this.old_eat.eatSaltLimit = JSON.parse(res.data[0].eatSaltLimit);
              this.old_eat.eatSituation = JSON.parse(res.data[0].eatSituation);
              this.old_eat.eatSoup = JSON.parse(res.data[0].eatSoup);
              this.old_eat.eatStapleOffer = JSON.parse(res.data[0].eatStapleOffer);
              this.old_eat.eatSugarLimit = JSON.parse(res.data[0].eatSugarLimit);
              this.old_eat.eatViceOffer = JSON.parse(res.data[0].eatViceOffer);
              this.old_eat.eatWaterLimit = JSON.parse(res.data[0].eatWaterLimit);
              this.old_eat.eatWaterTool = JSON.parse(res.data[0].eatWaterTool);
              this.old_eat.eatWaterUptake = JSON.parse(res.data[0].eatWaterUptake);
              this.old_eat.eatEat = res.data[0].eatEat;
              this.old_eat.eatTimeFixed = res.data[0].eatTimeFixed;
              this.old_eat.eatSwallow = res.data[0].eatSwallow;
              this.old_eat.eatEatTool =  JSON.parse(res.data[0].eatEatTool);
              this.old_eat.eatWaterTemperature = res.data[0].eatWaterTemperature;
              this.old_eat.medicineTake = res.data[0].medicineTake;
              this.old_eat.medicineConfirm = res.data[0].medicineConfirm;
              this.old_eat.medicineSelfAdmin = res.data[0].medicineSelfAdmin;
              this.old_eat.medicineSpeSub = res.data[0].medicineSpeSub;
              this.old_eat.eatSpecialSubject = res.data[0].eatSpecialSubject;
            }else{
              // let copy = {};
              // for(let i in this.copy_old_eat){
              //   Vue.set(copy , i , this.copy_old_eat[i])
              // }
              // this.old_eat = copy;
              this.old_eat_id = "";
        }
        }else{
            this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t('evaluate.tabList.foodMedicineTab') + this.$t("global.loadFail"),
                  });
        }
      }catch(err){
            console.log("食事 • 服薬" + err);
            this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t('evaluate.tabList.foodMedicineTab') + this.$t("global.loadFail"),
                  });
      }
      
    
    

    },
    async onSelectEatListAll() {
     
      this.old_eat.oldManId = this.oldId;
      for (let i in this.old_eat) {
        Vue.set(this.copy_old_eat, i, this.old_eat[i]);
      }

      console.log(this.copy_old_eat ,  this.old_eat);
      // 数据处理（转字符串）
      this.copy_old_eat.eatBread  =  this.copy_old_eat.eatBread.sort((a , b)=>{
                 return a - b;
      });
      this.copy_old_eat.eatRice  = this.copy_old_eat.eatRice.sort((a , b)=>{
                 return a - b;
      });
      this.copy_old_eat.eatViceForm =  this.copy_old_eat.eatViceForm.sort((a , b)=>{
                 return a - b;
      });
      this.copy_old_eat.eatDessertForm = this.copy_old_eat.eatDessertForm.sort((a , b)=>{
                 return a - b;
      });
      this.copy_old_eat.eatWater =  this.copy_old_eat.eatWater.sort((a , b)=>{
                 return a - b;
      });
      this.copy_old_eat.eatEatTool = this.copy_old_eat.eatEatTool.sort((a , b)=>{
                 return a - b;
      });

      this.copy_old_eat.eatBread =  JSON.stringify(this.old_eat.eatBread);
      this.copy_old_eat.eatRice =  JSON.stringify(this.old_eat.eatRice);
      this.copy_old_eat.eatViceForm =  JSON.stringify(this.old_eat.eatViceForm);
      this.copy_old_eat.eatWater =  JSON.stringify(this.old_eat.eatWater);
      this.copy_old_eat.eatDessertForm =  JSON.stringify(this.old_eat.eatDessertForm);
      this.copy_old_eat.eatEatLimit = JSON.stringify(this.old_eat.eatEatLimit);
      this.copy_old_eat.eatEatTime = JSON.stringify(this.old_eat.eatEatTime);
      this.copy_old_eat.eatExpect = JSON.stringify(this.old_eat.eatExpect);
      this.copy_old_eat.eatInjectContent = JSON.stringify(
        this.old_eat.eatInjectContent
      );
      this.copy_old_eat.eatInjectTime = JSON.stringify(
        this.old_eat.eatInjectTime
      );
      this.copy_old_eat.eatProcess = JSON.stringify(this.old_eat.eatProcess);
      this.copy_old_eat.eatSaltLimit = JSON.stringify(
        this.old_eat.eatSaltLimit
      );
      this.copy_old_eat.eatSituation = JSON.stringify(
        this.old_eat.eatSituation
      );
      this.copy_old_eat.eatSoup = JSON.stringify(this.old_eat.eatSoup);
      this.copy_old_eat.eatStapleOffer = JSON.stringify(
        this.old_eat.eatStapleOffer
      );
      this.copy_old_eat.eatSugarLimit = JSON.stringify(
        this.old_eat.eatSugarLimit
      );
      this.copy_old_eat.eatViceOffer = JSON.stringify(
        this.old_eat.eatViceOffer
      );
      this.copy_old_eat.eatWaterLimit = JSON.stringify(
        this.old_eat.eatWaterLimit
      );
      this.copy_old_eat.eatWaterTool = JSON.stringify(
        this.old_eat.eatWaterTool
      );
      this.copy_old_eat.eatWaterUptake =  JSON.stringify(this.old_eat.eatWaterUptake);
      this.copy_old_eat.assessmentInfoId = this.assessmentInfoId;
      this.copy_old_eat.eatEatTool =  JSON.stringify(this.old_eat.eatEatTool);

      if (this.old_eat_id == "") {
        this.copy_old_eat.id = "";
        this.old_eat_id = "食事id";

       try{
        let res = await insertEatSave(this.copy_old_eat);
            if (res.code == 0) {
                  this.$Notice.success({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.operationSuccess"),
                  });
            }else if (res.code == 415) {
                      this.$Notice.error({
                        title: this.$t("global.operationFail"),
                        desc: this.$t("global.claim")
                      });
                        return
            }else {
                  this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.failed"),
                  });
            }
                this.onGetSelectEatListAll();
       }catch(err){
              console.log(err);
              this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.failed"),
                  });
       }
       

      } else {
           
        try{
          let result = await updateEat(this.copy_old_eat);
              if (result.code == 0) {
                this.$Notice.success({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.operationSuccess"),
                });
              } else if (result.code === 415) {
                this.$Notice.error({
                  title: this.$t("global.operationFail"),
                  desc: this.$t("global.claim")
                });
              } else {
                this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.failed"),
                });
              }
              this.onGetSelectEatListAll();
        }catch(err){
              console.log(err);
              this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.failed"),
                });       
        }
       
      }

    },

    //移动+褥瘡危険因子の評価
    async onGetSelectMoveAll() {
    
     try{
      let res = await selectMoveList({
          oldManId: this.oldId,
          assessmentInfoId: this.assessmentInfoId
        });
        if(res.code == 0 || res.code == 416){
            if (res.data.length > 0) {
              this.old_move = res.data[0];
              this.old_move.bedsoreNow = JSON.parse(res.data[0].bedsoreNow);
              this.old_move.bedsorePast = JSON.parse(res.data[0].bedsorePast);
              this.old_move.moveAssess = JSON.parse(res.data[0].moveAssess);
              this.old_move.moveExpect = JSON.parse(res.data[0].moveExpect);
              this.old_move.moveSituation = JSON.parse(res.data[0].moveSituation);
              this.old_move.moveTool = JSON.parse(res.data[0].moveTool);
              this.old_move.moveTransform = JSON.parse(res.data[0].moveTransform);
            }else{
              // let copy = {};
              // for(let i in this.copy_old_move){
              //   Vue.set(copy , i , this.copy_old_move[i])
              // }
              // this.old_move =  copy;
              this.old_move_id = "";
            }
        }else{
            this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t('evaluate.tabList.mobileTrauma') + this.$t("global.loadFail"),
                  });
        }
     }catch(err){
            console.log("移動 • 褥瘡危険因子の評価" + err);
            this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t('evaluate.tabList.mobileTrauma') + this.$t("global.loadFail"),
                  });
     }
    
  
    
    },
    async onSelectMoveAll() {
  
      this.whether = this.old_move.bedsoreExist;
       this.old_move.bedsoreBmi = this.old_info.infoBmi;
      this.old_move.oldManId = this.oldId;
      let objMove = {};
      for (let i in this.old_move) {
        Vue.set(objMove, i, this.old_move[i]);
      }

      this.old_move.bedsoreNow.bool2 = this.old_move.bedsoreNow.bool2.sort((a , b)=>{
                  return a - b;
      });
     
       this.old_move.bedsorePast.bool2 = this.old_move.bedsorePast.bool2.sort((a , b)=>{
                  return a - b;
      });
 console.log(this.old_move.bedsoreNow , this.old_move.bedsorePast);
      objMove.bedsoreNow = JSON.stringify(this.old_move.bedsoreNow);
      objMove.bedsorePast = JSON.stringify(this.old_move.bedsorePast);
      objMove.moveAssess = JSON.stringify(this.old_move.moveAssess);
      objMove.moveExpect = JSON.stringify(this.old_move.moveExpect);
      objMove.moveSituation = JSON.stringify(this.old_move.moveSituation);
      objMove.moveTool = JSON.stringify(this.old_move.moveTool);
      objMove.moveTransform = JSON.stringify(this.old_move.moveTransform);
      objMove.assessmentInfoId = this.assessmentInfoId;
     
    

      if (this.old_move_id == "") {
        objMove.id = "";
        this.old_move_id = "移动id";

        try{
       let res = await insertMoveSave(objMove);
          if (res.code == 0) {
            this.$Notice.success({
              title: this.$t("global.reminder"),
              desc: this.$t("global.operationSuccess"),
            });
          }else if (res.code == 415) {
                this.$Notice.error({
                  title: this.$t("global.operationFail"),
                  desc: this.$t("global.claim")
                });
                  return
          }  else {
            this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: this.$t("global.failed"),
            });
          }
          this.onGetSelectMoveAll();
        }catch(err){
         console.log(err);
         this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: this.$t("global.failed"),
            });
        }
      

      } else {
       
        try{
          let result = await updateMove(objMove);
          if (result.code == 0) {
            this.$Notice.success({
              title: this.$t("global.reminder"),
              desc: this.$t("global.operationSuccess"),
            });
          } else if (result.code === 415) {
            this.$Notice.error({
              title: this.$t("global.operationFail"),
              desc: this.$t("global.claim")
            });
          } else {
            this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: this.$t("global.failed"),
            });
          }
          this.onGetSelectMoveAll();

        }catch(err){
          console.log(err);
          this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: this.$t("global.failed"),
            });
        }
       

      }
    },
    // 入浴+更衣
    async onGetSelectBatheAll() {
      
      try{
        let res = await selectBatheList({
              oldManId: this.oldId,
              assessmentInfoId: this.assessmentInfoId
          });
        if(res.code == 0 || res.code == 416){
          if (res.data.length > 0) {
                this.old_bathe = res.data[0];
                this.old_bathe.batheExpectA = JSON.parse(res.data[0].batheExpectA);
                this.old_bathe.batheExpectB = JSON.parse(res.data[0].batheExpectB);
                this.old_bathe.bathePlace =  JSON.parse(res.data[0].bathePlace);
                this.old_bathe.batheSituationA = JSON.parse(
                  res.data[0].batheSituationA
                );
                this.old_bathe.batheSituationB = JSON.parse(
                  res.data[0].batheSituationB
                );
                this.old_bathe.dressedExpectA = JSON.parse(res.data[0].dressedExpectA);
                this.old_bathe.dressedExpectB = JSON.parse(res.data[0].dressedExpectB);
                this.old_bathe.dressedExpectC = JSON.parse(res.data[0].dressedExpectC);
                this.old_bathe.dressedExpectD = JSON.parse(res.data[0].dressedExpectD);
                this.old_bathe.dressedExpectE = JSON.parse(res.data[0].dressedExpectE);
                this.old_bathe.dressedOcTime =  JSON.parse(res.data[0].dressedOcTime);
                this.old_bathe.dressedLamp =   JSON.parse(res.data[0].dressedLamp);
                this.old_bathe.dressedSituationA = JSON.parse(
                  res.data[0].dressedSituationA
                );
                this.old_bathe.dressedSituationB = JSON.parse(
                  res.data[0].dressedSituationB
                );
                this.old_bathe.dressedSituationC = JSON.parse(
                  res.data[0].dressedSituationC
                );
                this.old_bathe.dressedSituationD = JSON.parse(
                  res.data[0].dressedSituationD
                );
                this.old_bathe.dressedSituationE = JSON.parse(
                  res.data[0].dressedSituationE
                );
                this.old_bathe.dressedSleepStatus = JSON.parse(
                  res.data[0].dressedSleepStatus
                );
                this.old_bathe.dressedSleepWay = JSON.parse(
                  res.data[0].dressedSleepWay
                );
                this.old_bathe.dressedThings = JSON.parse(res.data[0].dressedThings);
                this.old_bathe.dressedTime =  JSON.parse(res.data[0].dressedTime);
                this.old_bathe.dressedFaceTime =  JSON.parse(res.data[0].dressedFaceTime);
                this.old_bathe.dressedUseTool = JSON.parse(
                  res.data[0].dressedUseTool
                );
              }else{
                // let copy = {};
                // for(let i in this.copy_old_bathe){
                //   Vue.set(copy , i , this.copy_old_bathe[i])
                // }
                // this.old_bathe = copy;
                this.old_bathe_id = "";
              }
        }else{
          this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t('evaluate.tabList.bathingChangingTab') + this.$t("global.loadFail"),
                  });
         }
        }catch(err){
          console.log("入浴 • 更衣 • 口腔ケ ア整容 • 起床 • 就寝" + err);
          this.$Notice.error({
                      title: this.$t("global.reminder"),
                      desc: this.$t('evaluate.tabList.bathingChangingTab') + this.$t("global.loadFail"),
                    });
        }
    
    
   
    },
    async onSelectBatheAll() {
      this.old_bathe.oldManId = this.oldId;
      let objBathe = {};
      for (let i in this.old_bathe) {
        Vue.set(objBathe, i, this.old_bathe[i]);
      }
      this.old_bathe.bathePlace = this.old_bathe.bathePlace.sort((a , b)=>{
                  return a - b;
      });
      this.old_bathe.dressedOcTime = this.old_bathe.dressedOcTime.sort((a , b)=>{
                  return a - b;
      });
      this.old_bathe.dressedUseTool.bool = this.old_bathe.dressedUseTool.bool.sort((a , b)=>{
                   return a - b;
      });
      this.old_bathe.dressedFaceTime = this.old_bathe.dressedFaceTime.sort((a , b)=>{
                   return a - b;
      });
      this.old_bathe.dressedSleepWay.bool = this.old_bathe.dressedSleepWay.bool.sort((a , b)=>{
                   return a - b;
      });
      this.old_bathe.dressedSleepStatus.bool = this.old_bathe.dressedSleepStatus.bool.sort((a , b)=>{
                   return a - b;
      });
      this.old_bathe.dressedLamp = this.old_bathe.dressedLamp.sort((a , b)=>{
                   return a - b;
      });
      this.old_bathe.dressedThings.bool =  this.old_bathe.dressedThings.bool.sort((a , b)=>{
                   return a - b;
      });



      objBathe.dressedLamp =  JSON.stringify(this.old_bathe.dressedLamp);
      objBathe.batheExpectA = JSON.stringify(this.old_bathe.batheExpectA);
      objBathe.batheExpectB = JSON.stringify(this.old_bathe.batheExpectB);
      objBathe.bathePlace =  JSON.stringify(this.old_bathe.bathePlace);
      objBathe.batheSituationA = JSON.stringify(this.old_bathe.batheSituationA);
      objBathe.batheSituationB = JSON.stringify(this.old_bathe.batheSituationB);
      objBathe.dressedExpectA = JSON.stringify(this.old_bathe.dressedExpectA);
      objBathe.dressedExpectB = JSON.stringify(this.old_bathe.dressedExpectB);
      objBathe.dressedExpectC = JSON.stringify(this.old_bathe.dressedExpectC);
      objBathe.dressedExpectD = JSON.stringify(this.old_bathe.dressedExpectD);
      objBathe.dressedExpectE = JSON.stringify(this.old_bathe.dressedExpectE);
      objBathe.dressedOcTime =  JSON.stringify(this.old_bathe.dressedOcTime);
      objBathe.dressedSituationA = JSON.stringify(
        this.old_bathe.dressedSituationA
      );
      objBathe.dressedSituationB = JSON.stringify(
        this.old_bathe.dressedSituationB
      );
      objBathe.dressedSituationC = JSON.stringify(
        this.old_bathe.dressedSituationC
      );
      objBathe.dressedSituationD = JSON.stringify(
        this.old_bathe.dressedSituationD
      );
      objBathe.dressedSituationE = JSON.stringify(
        this.old_bathe.dressedSituationE
      );
      objBathe.dressedSleepStatus = JSON.stringify(
        this.old_bathe.dressedSleepStatus
      );
      objBathe.dressedSleepWay = JSON.stringify(this.old_bathe.dressedSleepWay);
      objBathe.dressedThings = JSON.stringify(this.old_bathe.dressedThings);
      objBathe.dressedTime =  JSON.stringify(this.old_bathe.dressedTime);
      objBathe.dressedFaceTime =  JSON.stringify(this.old_bathe.dressedFaceTime);
      objBathe.dressedUseTool = JSON.stringify(
        this.old_bathe.dressedUseTool
      );
      objBathe.assessmentInfoId = this.assessmentInfoId;
      
      if (this.old_bathe_id == "") {
        objBathe.id = "";
        this.old_bathe_id = "入浴id"

        try{
        let res = await innsetBatheSave(objBathe);
              if (res.code == 0) {
                this.$Notice.success({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.operationSuccess"),
                });
              }else if (res.code == 415) {
                    this.$Notice.error({
                      title: this.$t("global.operationFail"),
                      desc: this.$t("global.claim")
                    });
                      return
              }  else {
                this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.failed"),
                });
              }
              this.onGetSelectBatheAll();

        }catch(err){
          console.log(err);
          this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.failed"),
                });
        }
      
      } else {

        try{
         let result = await updateBathe(objBathe);
                if (result.code == 0) {
                  this.$Notice.success({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.operationSuccess"),
                  });
                } else if (result.code === 415) {
                  this.$Notice.error({
                    title: this.$t("global.operationFail"),
                    desc: this.$t("global.claim")
                  });
                } else {
                  this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.failed"),
                  });
                }
                this.onGetSelectBatheAll();
        }catch(err){
            console.log(err);
            this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.failed"),
                  });
        }
       


      }
      
    },
    // 心身机能
    async onGetSelectPhysiologyListAll() {
       
      try{
        let res = await selectPhysiologyList({
              oldManId: this.oldId,
              assessmentInfoId: this.assessmentInfoId
            });
        if(res.code == 0 || res.code == 416){
        if (res.data.length) {
                this.old_physiology = res.data[0];
                this.old_physiology.physiologyBpsdDirty = res.data[0].physiologyBpsdDirty.split(
                  ","
                );
                this.old_physiology.physiologyBpsdIllusion = res.data[0].physiologyBpsdIllusion.split(
                  ","
                );
                this.old_physiology.physiologyBpsdViolence = res.data[0].physiologyBpsdViolence.split(
                  ","
                );
                this.old_physiology.physiologyInfectious = JSON.parse(
                  res.data[0].physiologyInfectious
                );
                this.old_physiology.physiologyIrritabilityF = JSON.parse(
                  res.data[0].physiologyIrritabilityF
                );
                this.old_physiology.physiologyIrritabilityM = JSON.parse(
                  res.data[0].physiologyIrritabilityM
                );
              
                this.old_physiology.physiologyMedicine = JSON.parse(
                  res.data[0].physiologyMedicine
                );
                this.old_physiology.physiologyMetal = JSON.parse(
                  res.data[0].physiologyMetal
                );
                this.old_physiology.physiologyPain = JSON.parse(
                  res.data[0].physiologyPain
                );
                this.old_physiology.physiologyParalysis = JSON.parse(
                  res.data[0].physiologyParalysis
                );
                this.old_physiology.physiologyRShrink = JSON.parse(
                  res.data[0].physiologyRShrink
                );
                this.old_physiology.physiologySpeSub = JSON.parse(
                  res.data[0].physiologySpeSub
                );
              }else{
                // let copy = {};
                // for(let i in this.copy_old_physiology){
                //   Vue.set(copy , i , this.copy_old_physiology[i])
                // }
                //  this.old_physiology = copy;
                this.old_physiology_id = "";
              }
        }else{
          this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t('evaluate.tabList.psychosomaticTab') + this.$t("global.loadFail"),
                  });
        }
      }catch(err){
        console.log("心身機能" + err);
         this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t('evaluate.tabList.psychosomaticTab') + this.$t("global.loadFail"),
                  });
      } 
   
     
    
    },
    async onSelectPhysiologyListAll() {
      this.old_physiology.oldManId = this.oldId;
      let objPhysiology = {};
      for (let i in this.old_physiology) {
        Vue.set(objPhysiology, i, this.old_physiology[i]);
      }
       this.old_physiology.physiologyMedicine.check =  this.old_physiology.physiologyMedicine.check.sort((a , b)=>{
                return a - b;
       })
       this.old_physiology.physiologyBpsdIllusion = this.old_physiology.physiologyBpsdIllusion.sort((a , b)=>{
                return a - b;
       })
       this.old_physiology.physiologyBpsdViolence = this.old_physiology.physiologyBpsdViolence.sort((a , b)=>{
                return a - b;
       });
       this.old_physiology.physiologyBpsdDirty = this.old_physiology.physiologyBpsdDirty.sort((a , b)=>{
                return a - b;
       });

       
        
      objPhysiology.physiologyBpsdDirty = this.old_physiology.physiologyBpsdDirty.join();
      objPhysiology.physiologyBpsdIllusion = this.old_physiology.physiologyBpsdIllusion.join();
      objPhysiology.physiologyBpsdViolence = this.old_physiology.physiologyBpsdViolence.join();
      objPhysiology.physiologyInfectious = JSON.stringify(
        this.old_physiology.physiologyInfectious
      );
      objPhysiology.physiologyIrritabilityF = JSON.stringify(
        this.old_physiology.physiologyIrritabilityF
      );
      objPhysiology.physiologyIrritabilityM = JSON.stringify(
        this.old_physiology.physiologyIrritabilityM
      );
      objPhysiology.physiologyMedicine = JSON.stringify(
        this.old_physiology.physiologyMedicine
      );
      objPhysiology.physiologyMetal = JSON.stringify(
        this.old_physiology.physiologyMetal
      );
      objPhysiology.physiologyPain = JSON.stringify(
        this.old_physiology.physiologyPain
      );
      objPhysiology.physiologyParalysis = JSON.stringify(
        this.old_physiology.physiologyParalysis
      );
      objPhysiology.physiologyRShrink = JSON.stringify(
        this.old_physiology.physiologyRShrink
      );
      objPhysiology.physiologySpeSub = JSON.stringify(
        this.old_physiology.physiologySpeSub
      );
      objPhysiology.assessmentInfoId = this.assessmentInfoId;

      if (this.old_physiology_id == "") {
        objPhysiology.id = "";
        this.old_physiology_id = "心身id";

        try{
           let res = await innsetPhysiologySave(objPhysiology);
              if (res.code == 0) {
                this.$Notice.success({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.operationSuccess"),
                });
              }else if (res.code == 415) {
                    this.$Notice.error({
                      title: this.$t("global.operationFail"),
                      desc: this.$t("global.claim")
                    });
                      return
               }  else {
                this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.failed"),
                });
              }
              this.onGetSelectPhysiologyListAll();
        }catch(err){
            console.log(err);
            this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.failed"),
                });
        }
       


      } else {

        try{
        let result = await updatePhysiology(objPhysiology);
            if (result.code == 0) {
              this.$Notice.success({
                title: this.$t("global.reminder"),
                desc: this.$t("global.operationSuccess"),
              });
            } else if (result.code === 415) {
              this.$Notice.error({
                title: this.$t("global.operationFail"),
                desc: this.$t("global.claim")
              });
            } else {
              this.$Notice.error({
                title: this.$t("global.reminder"),
                desc: this.$t("global.failed"),
              });
            }
            this.onGetSelectPhysiologyListAll();
        }catch(err){
             console.log(err);
             this.$Notice.error({
                title: this.$t("global.reminder"),
                desc: this.$t("global.failed"),
              });
        }
       

      }
    },
    // 环境因子+汇总
    async onGetSelectDivisorListAll() {

      try{
      let res = await selectDivisorList({
          oldManId: this.oldId,
          assessmentInfoId: this.assessmentInfoId
        });

        if(res.code == 0 || res.code == 416){
        if (res.data.length > 0) {
                this.old_divisor = res.data[0];
                this.old_divisor.divisorEquipment = res.data[0].divisorEquipment.split(
                  ","
                );
                this.old_divisor.divisorFamily = JSON.parse(res.data[0].divisorFamily);
                this.old_divisor.summaryRisk = res.data[0].summaryRisk.split(",");
                this.old_divisor.divisorDwelling = JSON.parse(
                  res.data[0].divisorDwelling
                );
                this.old_divisor.divisorTopic = JSON.parse(
                  res.data[0].divisorTopic
                );
                this.old_divisor.divisorRoomLayoutA = JSON.parse(res.data[0].divisorRoomLayoutA);
                this.drag_list = this.old_divisor.divisorRoomLayoutA;
              }else{
              // let copy = {};
              //   for(let i in this.copy_old_divisor){
              //     Vue.set(copy , i , this.copy_old_divisor[i])
              //   }
              //  this.old_divisor = copy;

              //  let copy2 = [];
              //   for(let i = 0; i < this.copy_drag_list.length; i++){
              //      Vue.set(copy2 , i ,  this.copy_drag_list[i])
              //   }
              //   this.drag_list = copy2;
              this.old_divisor_id = "";
              }
        }else{
          this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t('evaluate.tabList.ambientTab') + this.$t("global.loadFail"),
                  });
        }
      }catch(err){
        console.log("環境因子 • 課題整理総括" + err);
          this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t('evaluate.tabList.ambientTab') + this.$t("global.loadFail"),
                  });
      }

    
     

      let dom = document.querySelector(".drag-content");

      let html = document.querySelector("html");
      let font = window.getComputedStyle(html).fontSize;
      let size = font.slice(0, -2);

      this.$refs.div1.style.left = this.drag_list[0].x;
      this.$refs.div1.style.top = this.drag_list[0].y;
      this.$refs.div2.style.left = this.drag_list[1].x;
      this.$refs.div2.style.top = this.drag_list[1].y;
      this.$refs.div3.style.left = this.drag_list[2].x;
      this.$refs.div3.style.top = this.drag_list[2].y;
      this.$refs.div4.style.left = this.drag_list[3].x;
      this.$refs.div4.style.top = this.drag_list[3].y;
      this.$refs.div5.style.left = this.drag_list[4].x;
      this.$refs.div5.style.top = this.drag_list[4].y;
      this.$refs.div6.style.left = this.drag_list[5].x;
      this.$refs.div6.style.top = this.drag_list[5].y;



      this.$refs.div1.style.background = `url(${this.imgSrc1})`;
      this.$refs.div1.style.backgroundSize = `100% 100%`;
      this.$refs.div1.style.backgroundRepeat = `no-repeat`;
      this.$refs.div1.style.backgroundPosition = `center`;

      this.$refs.div2.style.background = `url(${this.imgSrc2})`;
      this.$refs.div2.style.backgroundSize = `100% 100%`;
      this.$refs.div2.style.backgroundRepeat = `no-repeat`;
      this.$refs.div2.style.backgroundPosition = `center`;

      this.$refs.div3.style.background = `url(${this.imgSrc3})`;
      this.$refs.div3.style.backgroundSize = `100% 100%`;
      this.$refs.div3.style.backgroundRepeat = `no-repeat`;
      this.$refs.div3.style.backgroundPosition = `center`;

      this.$refs.div4.style.background = `url(${this.imgSrc4})`;
      this.$refs.div4.style.backgroundSize = `100% 100%`;
      this.$refs.div4.style.backgroundRepeat = `no-repeat`;
      this.$refs.div4.style.backgroundPosition = `center`;

      this.$refs.div5.style.background = `url(${this.self_woman})`;
      this.$refs.div5.style.backgroundSize = `100% 100%`;
      this.$refs.div5.style.backgroundRepeat = `no-repeat`;
      this.$refs.div5.style.backgroundPosition = `center`;

      this.$refs.div6.style.background = `url(${this.imgSrc3})`;
      this.$refs.div6.style.backgroundSize = `100% 100%`;
      this.$refs.div6.style.backgroundRepeat = `no-repeat`;
      this.$refs.div6.style.backgroundPosition = `center`;

      this.$refs.div1.addEventListener('mousedown', (e) => {
        this.down(e, 0);
      }, false);
      this.$refs.div1.addEventListener('mousemove', (e) => {
        this.move(e, 0, 1.5, 1.3);
      }, false);
      this.$refs.div1.addEventListener('mouseup', (e) => {
        this.end(e, 0);
      }, false);
      this.$refs.div2.addEventListener('mousedown', (e) => {
        this.down(e, 1);
      }, false);
      this.$refs.div2.addEventListener('mousemove', (e) => {
        this.move(e, 1, 1.7, 1.5);
      }, false);
      this.$refs.div2.addEventListener('mouseup', (e) => {
        this.end(e, 1);
      }, false);
      this.$refs.div3.addEventListener('mousedown', (e) => {
        this.down(e, 2);
      }, false);
      this.$refs.div3.addEventListener('mousemove', (e) => {
        this.move(e, 2, 1.6, 1.7);
      }, false);
      this.$refs.div3.addEventListener('mouseup', (e) => {
        this.end(e, 2);
      }, false);
      this.$refs.div4.addEventListener('mousedown', (e) => {
        this.down(e, 3);
      }, false);
      this.$refs.div4.addEventListener('mousemove', (e) => {
        this.move(e, 3, 1.97, 1.6);
      }, false);
      this.$refs.div4.addEventListener('mouseup', (e) => {
        this.end(e, 3);
      }, false);
      this.$refs.div5.addEventListener('mousedown', (e) => {
        this.down(e, 4);
      }, false);
      this.$refs.div5.addEventListener('mousemove', (e) => {
        this.move(e, 4, 1.49, 1.84);
      }, false);
      this.$refs.div5.addEventListener('mouseup', (e) => {
        this.end(e, 4);
      }, false);
      this.$refs.div6.addEventListener('mousedown', (e) => {
        this.down(e, 5);
      }, false);
      this.$refs.div6.addEventListener('mousemove', (e) => {
        this.move(e, 5, 1.84, 1.49);
      }, false);
      this.$refs.div6.addEventListener('mouseup', (e) => {
        this.end(e, 5);
      }, false);

      this.$refs.div1.addEventListener('touchstart', (e) => {
        this.down(e, 0);
      }, false);
      this.$refs.div1.addEventListener('touchmove', (e) => {
        this.move(e, 0, 1.5, 1.3);
      }, {
        passive: false
      });
      this.$refs.div1.addEventListener('touchend', (e) => {
        this.end(e, 0);
      }, false);

      this.$refs.div2.addEventListener('touchstart', (e) => {
        this.down(e, 1);
      }, false);
      this.$refs.div2.addEventListener('touchmove', (e) => {
        this.move(e, 1, 1.7, 1.5);
      }, {
        passive: false
      });
      this.$refs.div2.addEventListener('touchend', (e) => {
        this.end(e, 1);
      }, false);

      this.$refs.div3.addEventListener('touchstart', (e) => {
        this.down(e, 2);
      }, false);
      this.$refs.div3.addEventListener('touchmove', (e) => {
        this.move(e, 2, 1.6, 1.7);
      }, {
        passive: false
      });
      this.$refs.div3.addEventListener('touchend', (e) => {
        this.end(e, 2);
      }, false);

      this.$refs.div4.addEventListener('touchstart', (e) => {
        this.down(e, 3);
      }, false);
      this.$refs.div4.addEventListener('touchmove', (e) => {
        this.move(e, 3, 1.97, 1.6);
      }, {
        passive: false
      });
      this.$refs.div4.addEventListener('touchend', (e) => {
        this.end(e, 3);
      }, false);

      this.$refs.div5.addEventListener('touchstart', (e) => {
        this.down(e, 4);
      }, false);
      this.$refs.div5.addEventListener('touchmove', (e) => {
        this.move(e, 4, 1.49, 1.84);
      }, {
        passive: false
      });
      this.$refs.div5.addEventListener('touchend', (e) => {
        this.end(e, 4);
      }, false);

      this.$refs.div6.addEventListener('touchstart', (e) => {
        this.down(e, 5);
      }, false);
      this.$refs.div6.addEventListener('touchmove', (e) => {
        this.move(e, 5, 1.84, 1.49);
      }, {
        passive: false
      });
      this.$refs.div6.addEventListener('touchend', (e) => {
        this.end(e, 5);
      }, false);
    

    },
    async onSelectDivisorListAll() {
      let div = document.querySelector("#capture");
      let h = div.offsetHeight;
      let w = div.offsetWidth;
      new html2canvas(document.querySelector("#capture"), {
        useCORS: true,
        allowTaint: true,
        scale: window.devicePixelRatio, //提高清晰度
        width: w,
        height: h
      }).then(async canvas => {
        const data = {
          base64: canvas.toDataURL()
        };
        const config = {
          headers: {
            Accept: "application/json;charset=UTF-8",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        };
        try {
          const res = await sendUploadBase(qs.stringify(data), config);
          if (res.code === 0) {
            this.drag_list[6] = res.data.httpUrl
          }
        } catch (err) {
          console.log(err);
        }
      });

      this.$Modal.confirm({
        title: this.$t("global.reminder"),
        content: this.$t("ServePlan.uploads"),
        okText: this.$t('global.sure'),
        cancelText: this.$t('global.cancel'),
        onOk: async () => {

          let html = document.querySelector("html");
          let font = window.getComputedStyle(html).fontSize;
          let size = font.slice(0, -2);

          this.old_divisor.oldManId = this.oldId;


          let rem0x = this.drag_list[0].x + '';
          let rem0y = this.drag_list[0].y + '';
          let rem1x = this.drag_list[1].x + '';
          let rem1y = this.drag_list[1].y + '';
          let rem2x = this.drag_list[2].x + '';
          let rem2y = this.drag_list[2].y + '';
          let rem3x = this.drag_list[3].x + '';
          let rem3y = this.drag_list[3].y + '';
          let rem4x = this.drag_list[4].x + '';
          let rem4y = this.drag_list[4].y + '';
          let rem5x = this.drag_list[5].x + '';
          let rem5y = this.drag_list[5].y + '';
          let bool_rem0x = rem0x.slice(-3);
          let bool_rem0y = rem0y.slice(-3);
          let bool_rem1x = rem1x.slice(-3);
          let bool_rem1y = rem1y.slice(-3);
          let bool_rem2x = rem2x.slice(-3);
          let bool_rem2y = rem2y.slice(-3);
          let bool_rem3x = rem3x.slice(-3);
          let bool_rem3y = rem3y.slice(-3);
          let bool_rem4x = rem4x.slice(-3);
          let bool_rem4y = rem4y.slice(-3);
          let bool_rem5x = rem5x.slice(-3);
          let bool_rem5y = rem5y.slice(-3);

          if (bool_rem0x == 'rem' || bool_rem0x == 'rem') {
            this.drag_list[0].x = this.drag_list[0].x;
            this.drag_list[0].y = this.drag_list[0].y;
          } else {
            this.drag_list[0].x = (this.drag_list[0].x / size).toFixed(5) + "rem";
            this.drag_list[0].y = (this.drag_list[0].y / size).toFixed(5) + "rem";
          }

          if (bool_rem1x == 'rem' || bool_rem1x == 'rem') {
            this.drag_list[1].x = this.drag_list[1].x;
            this.drag_list[1].y = this.drag_list[1].y;
          } else {
            this.drag_list[1].x = (this.drag_list[1].x / size).toFixed(5) + "rem";
            this.drag_list[1].y = (this.drag_list[1].y / size).toFixed(5) + "rem";
          }

          if (bool_rem2x == 'rem' || bool_rem2x == 'rem') {
            this.drag_list[2].x = this.drag_list[2].x;
            this.drag_list[2].y = this.drag_list[2].y;
          } else {
            this.drag_list[2].x = (this.drag_list[2].x / size).toFixed(5) + "rem";
            this.drag_list[2].y = (this.drag_list[2].y / size).toFixed(5) + "rem";
          }

          if (bool_rem3x == 'rem' || bool_rem3x == 'rem') {
            this.drag_list[3].x = this.drag_list[3].x;
            this.drag_list[3].y = this.drag_list[3].y;
          } else {
            this.drag_list[3].x = (this.drag_list[3].x / size).toFixed(5) + "rem";
            this.drag_list[3].y = (this.drag_list[3].y / size).toFixed(5) + "rem";
          }

          if (bool_rem5x == 'rem' || bool_rem5x == 'rem') {
            this.drag_list[5].x = this.drag_list[5].x;
            this.drag_list[5].y = this.drag_list[5].y;
          } else {
            this.drag_list[5].x = (this.drag_list[5].x / size).toFixed(5) + "rem";
            this.drag_list[5].y = (this.drag_list[5].y / size).toFixed(5) + "rem";
          }

          this.old_divisor.divisorRoomLayoutA = JSON.stringify(this.drag_list);


          let objDivisor = {};
          for (let i in this.old_divisor) {
            Vue.set(objDivisor, i, this.old_divisor[i]);
          }

          this.old_divisor.divisorEquipment = this.old_divisor.divisorEquipment.sort((a , b)=>{
              return a - b; 
          });
          this.old_divisor.divisorDwelling.bool = this.old_divisor.divisorDwelling.bool.sort((a , b)=>{
              return a - b;
          })
          this.old_divisor.summaryRisk = this.old_divisor.summaryRisk.sort((a , b)=>{
              return a - b;
          })

          

          objDivisor.divisorDwelling = JSON.stringify(
            this.old_divisor.divisorDwelling
          );
          objDivisor.divisorEquipment = this.old_divisor.divisorEquipment.join();
          objDivisor.divisorFamily = JSON.stringify(this.old_divisor.divisorFamily);
          objDivisor.summaryRisk = this.old_divisor.summaryRisk.join();
          objDivisor.assessmentInfoId = this.assessmentInfoId;
          objDivisor.divisorTopic = JSON.stringify(
            this.old_divisor.divisorTopic
          );
          // objDivisor.divisorRoomLayoutA = JSON.stringify(this.drag_list);

          if (this.old_divisor_id == "") {
            this.old_divisor_id = "环境id";
            objDivisor.id = "";

            try{
                let res = await innsetDivisorSave(objDivisor);
                if (res.code == 0) {
                  this.$Notice.success({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.operationSuccess"),
                  });
                }else if (res.code == 415) {
                  this.$Notice.error({
                    title: this.$t("global.operationFail"),
                    desc: this.$t("global.claim")
                  });
                    return
                }  else {
                  this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.failed"),
                  });
                }
                this.onGetSelectDivisorListAll();
            }catch(err){
             console.log(err);
             this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.failed"),
                  });
            }
         

          } else {
 
            try{
              let result = await updateDivisor(objDivisor);
              if (result.code == 0) {
                this.$Notice.success({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.operationSuccess"),
                });
              } else if (result.code === 415) {
                this.$Notice.error({
                  title: this.$t("global.operationFail"),
                  desc: this.$t("global.claim")
                });
              } else {
                this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.failed"),
                });
              }
              this.onGetSelectDivisorListAll();
            }catch(err){
              console.log(err);
              this.$Notice.error({
                  title: this.$t("global.reminder"),
                  desc: this.$t("global.failed"),
                });
            }
           

          }
        }
      });
    },
    // 排泄获取数据
    async onSelectExcretion() {

      try{
          let result = await selectExcretionList({
              oldManId: this.oldId ,
              assessmentInfoId:this.assessmentInfoId 
            })

          if(result.code == 0 || result.code == 416){
                if (result.data.length > 0) {
                this.old_excretion = result.data[0];
                this.old_excretion.constipation = JSON.parse(result.data[0].constipation);
                this.old_excretion.currentStatus = JSON.parse(result.data[0].currentStatus);
                this.old_excretion.medicine = JSON.parse(result.data[0].medicine);
                this.old_excretion.surface = JSON.parse(result.data[0].surface);
                this.old_excretion.urineType = JSON.parse(result.data[0].urineType);
                this.old_excretion.excretionType = result.data[0].excretionType.split(",");
                this.old_excretion.diaperType =  result.data[0].diaperType.split(",");
              }else{
                // let copy = {};
                // for(let i in this.copy_old_excretion){
                //   Vue.set(copy , i , this.copy_old_excretion[i])
                // }
                // this.old_excretion = copy;
                this.old_excretion_id = "";
              }
          }else{
            this.$Notice.error({
                        title: this.$t("global.reminder"),
                        desc: this.$t('evaluate.excretion.criticism1') + this.$t("global.loadFail"),
                      });
          }
      }catch(err){
          console.log("排泄" + err);
          this.$Notice.error({
                        title: this.$t("global.reminder"),
                        desc: this.$t('evaluate.excretion.criticism1') + this.$t("global.loadFail"),
                      });
      }
    

    
   

    },
    // 排泄（插入/更新）
    async onUIExcretion() {
      this.old_excretion.oldManId = this.oldId;
      let copy = {}
      for (let i in this.old_excretion) {
        Vue.set(copy, i, this.old_excretion[i]);
      }
      this.old_excretion.excretionType = this.old_excretion.excretionType.sort((a , b)=>{
              return a - b;
       });
       this.old_excretion.diaperType =  this.old_excretion.diaperType.sort((a , b)=>{
              return a - b;
       });

      copy.constipation = JSON.stringify(this.old_excretion.constipation);
      copy.currentStatus = JSON.stringify(this.old_excretion.currentStatus);
      copy.medicine = JSON.stringify(this.old_excretion.medicine);
      copy.surface = JSON.stringify(this.old_excretion.surface);
      copy.urineType = JSON.stringify(this.old_excretion.urineType);
      copy.assessmentInfoId = this.assessmentInfoId; 
      copy.excretionType = this.old_excretion.excretionType.join();
      copy.diaperType = this.old_excretion.diaperType.join();

      if (this.old_excretion_id == "") {
        this.old_excretion_id = "排泄id";
        copy.id = "";
        
        try{
          let res = await insertExcretion(copy);
                if (res.code == 0) {
                  this.$Notice.success({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.operationSuccess"),
                  });
                }else if (res.code == 415) {
                      this.$Notice.error({
                        title: this.$t("global.operationFail"),
                        desc: this.$t("global.claim")
                  });
                return
                 } else {
                  this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.failed"),
                  });
                }
        }catch(err){
                console.log(err);
                this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.failed"),
                  });
        }
     

      } else {
        
        try{
         let result = await updateExcretion(copy);
          if (result.code == 0) {
            this.$Notice.success({
              title: this.$t("global.reminder"),
              desc: this.$t("global.operationSuccess"),
            });
          } else if (result.code === 415) {
            this.$Notice.error({
              title: this.$t("global.operationFail"),
              desc: this.$t("global.claim")
            });
          } else {
            this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: this.$t("global.failed"),
            });
          }
        }catch(err){
          console.log(err);
           this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: this.$t("global.failed"),
            });
        }
      
      }

      this.onSelectExcretion();
    },

    onExcretionType(type, index) {
      if (this.old_excretion[type] == index) {
        setTimeout(() => {
          this.old_excretion[type] = "";
        }, 10)
      }
    },
    onConstipation(index) {
      if (this.old_excretion.constipation.radio == index) {
        setTimeout(() => {
          this.old_excretion.constipation.radio = "";
        }, 10)
      }
    },
    onMedicine(index) {
      if (this.old_excretion.medicine.radio == index) {
        setTimeout(() => {
          this.old_excretion.medicine.radio = "";
        }, 10)
      }
    },
    //排泄e

    // 拖拽funS
    down(evt, index) {
      let dom = document.querySelectorAll(".drag-content>div");
      var event = evt || window.event;
      event.preventDefault();
      this.drag_flag[index] = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.drag_cur[index].x = touch.clientX;
      this.drag_cur[index].y = touch.clientY;
      this.drag_dx[index] = dom[index].offsetLeft;
      this.drag_dy[index] = dom[index].offsetTop;

    },
    move(evt, index, timesX, timesY) {
      var event = evt || window.event;
      event.preventDefault();
      let html = document.querySelector("html");
      let font = window.getComputedStyle(html).fontSize;
      let size = font.slice(0, -2);
      let dom = document.querySelectorAll(".drag-content>div");

      if (this.drag_flag[index]) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.drag_nx[index] = touch.clientX - this.drag_cur[index].x;
        this.drag_ny[index] = touch.clientY - this.drag_cur[index].y;

        this.drag_list[index].x = this.drag_dx[index] + this.drag_nx[index];
        this.drag_list[index].y = this.drag_dy[index] + this.drag_ny[index];
        if (this.drag_list[index].x <= 0) this.drag_list[index].x = 0;
        if (this.drag_list[index].x >= size * timesX) this.drag_list[index].x = parseFloat(size) * timesX;
        if (this.drag_list[index].y <= 0) this.drag_list[index].y = 0
        if (this.drag_list[index].y >= size * timesY) this.drag_list[index].y = parseFloat(size) * timesY;
        dom[index].style.left = this.drag_list[index].x + "px";
        dom[index].style.top = this.drag_list[index].y + "px";

      }

    },
    end(evt, index) {
      var event = evt || window.event;
      event.preventDefault();
      this.drag_flag[index] = false;

    },
    // 拖拽funE
   
   //  月次功能
    onWith(e){
        if(this.occurrenceDay){
          this.old_info.infoDate = e;
          // 获取连表查询id
          this.onGetSelectInofList();
        }
      
    } ,

    onGetYear(e){
        this.occurrenceYear = e;
        this.selectGetDateById();
    } ,

    async selectGetDateById(){

    try{
      let res = await getDateById({
        oldManId:this.oldId , 
        type:3 ,
        year:this.occurrenceYear
      });
        if(res.code == 0){
          this.occurrenceDayList =  res.data.map((item , index)=>{
              return {value:item.date}   
          });
          if(this.occurrenceDayList.length > 0){
            this.occurrenceDay =  this.occurrenceDayList[0].value;  
            this.old_info.infoDate = this.occurrenceDayList[0].value; 
            if(this.tabIndex == 0){
              this.onGetSelectInofList();
            }
          }else{
            setTimeout(()=>{
            this.old_info.infoDate = format(new Date(), "YYYY-MM-DD");
            } , 10)
            this.occurrenceDay = "";
            this.assessmentInfoId = "";
          }
        } else {
            this.$Notice.error({
              title: this.$t("global.loadFail"),
              desc: res.data
            });
          }
    }catch(err){
        console.log(err);
        this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc:  this.$t("global.loadFail"),
                });
    }
    


    } ,

   

  },
  async created() {},
  computed: {
    // 基本信息 自动计算BMI
    autoBMI() {
      if (this.old_info.infoStature && this.old_info.infoWeight) {
        let m = (parseFloat(this.old_info.infoStature) / 100);
     
        this.old_info.infoBmi = parseFloat(this.old_info.infoWeight) /(m * m);
        this.old_info.infoBmi = this.old_info.infoBmi.toFixed(1);
        return this.old_info.infoBmi;
      } else {
        return "";
      }
    }
  },
  async mounted() {



    let that = this;
    this.$nextTick(function () {

    imgTo(BASE_URL + "pic/20200901/1598930114224.png").then(res => {
      this.imgSrc1 = res;
    });
    imgTo(BASE_URL + "pic/20200901/1598930139650.png").then(res => {
      this.imgSrc2 = res;
    });

    imgTo(BASE_URL + "pic/20200901/1598930155994.png").then(res => {
      this.imgSrc3 = res;
    });

    imgTo(BASE_URL + "pic/20200901/1598930172592.png").then(res => {
      this.imgSrc4 = res;
    });
    imgTo(BASE_URL + "pic/20200811/1597125495137.png").then(res => {
      this.self_man = res;
    });

    imgTo(BASE_URL + "pic/20200815/1597471892528.png").then(res => {
      this.self_woman = res;
    });
   
      
   setTimeout(()=>{
      let oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
      this.oldId = oldInfo.oldId;
      this.old_info.infoDate = format(new Date(), "YYYY-MM-DD");
   
  
     Promise.all([this.selectGetDateById() , 
                 this.oSharenOldInfo() ,
                 this.onGetSelectEatListAll() , 
                 this.onGetSelectMoveAll() ,
                 this.onGetSelectBatheAll() ,
                 this.onGetSelectPhysiologyListAll(),
                 this.onGetSelectDivisorListAll(),
                 this.onSelectExcretion()
        ]).then((res)=>{
            this.tabBlock = [];
        }).catch(err =>{
            this.tabBlock = [];
            console.log("error:" + err);
        })

    } , 10)
    })
    
  }
};
</script>

<style lang="less" scoped>
// 拖拽样式
.drag-header {
  width: 2rem;
  height: auto;
  border-bottom: 1px solid #cccccc;
  margin: 0 auto;
  display: flex;
  padding: 0.1rem 0 0.05rem 0;
  justify-content: space-around;
  align-items: center;
}

.drag-header>div>img {
  width: 80%;
  height: 80%;
}

.drag-div1,
.drag-div2,
.drag-div3,
.drag-div4 {
  width: 0.4rem;
  // height: 0.29rem;
  opacity: 0.3;
  text-align: center;
}

.drag-div4 {
  // width: 0.02rem;
  // height: 0.29rem;
  // opacity: 0.3;
  // background: #666666;
}

.drag-div5 {
  width: 0.35rem;
  height: 0.02rem;
  opacity: 0.3;
  background: #666666;
}

.drag-div6 {
  width: 0.02rem;
  height: 0.35rem;
  opacity: 0.3;
  background: #666666;
}

#drag-div1 {
  position: absolute;
  width: 0.5rem;
  height: 0.7rem;
}

#drag-div2 {
  position: absolute;
  width: 0.3rem;
  height: 0.5rem;
}

#drag-div3 {
  position: absolute;
  width: 0.4rem;
  height: 0.3rem;
}

#drag-div4 {
  position: absolute;
  width: 0.03rem;
  height: 0.4rem;
}

#drag-div5 {
  position: absolute;
  width: 0.5rem;
  height: 0.15rem;
  // border: 1px solid red;
  z-index: 9999;

}

#drag-div5>div {
  width: 0.5rem;
  height: 0.02rem;
  background: #666666;
  margin-top: 0.065rem;
}

#drag-div6 {
  position: absolute;
  width: 0.15rem;
  height: 0.5rem;
  // border: 1px solid red;

}

#drag-div6>div {
  width: 0.02rem;
  height: 0.5rem;
  background: #666666;
  margin-left: 0.065rem;
}

.drag-content {
  position: relative;
  width: 2rem;
  height: 2rem;
  margin: 0 auto;
  touch-action: none;
  border: 1px solid #cccccc;
}

.move-none {
  display: none !important;
}

.move-opacity {
  opacity: 1 !important;
}

.textCenter {
  text-align: center;
}

.new {
  text-align: left;

  .head-bg {
    font-size: 0.14rem;
  }

  .table {
    label {
      margin-right: 0.1rem
        /* 10/102 */
      ;

      input {
        margin-right: 0.03rem
          /* 3/102 */
        ;
      }
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-color: var(--border-color);
    margin-bottom: 0.29rem
      /* 30/102 */
    ;
    font-size: 0.14rem
      /* 14/102 */
    ;
    line-height: 0.29rem
      /* 30/102 */
    ;
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
  }

  // table end
}

//  #drain-trip end
.disabled {
  pointer-events: none;
  opacity: 0.5;
}

.new-td-center {
  width: 100%;
  text-align: center;
}

.radio-middle {
  vertical-align: middle;
}

.label-margin-left {
  margin-left: 0.1rem;
}

.space {
  margin-right: 0.2rem;
}

.header-row-two {
  /* width: 2rem;
  height: 0.38rem; */
  line-height: 0.38rem;
  text-align: center;
  font-size: 0.15rem;
  font-weight: bold;
  color: #333333;
  border-radius: 0.04rem;
  // background: #d9f7be;
  background: #ececec;
  margin-right: 0.3rem;
  margin-bottom: 0.15rem;
  float: left;
  padding: 0 0.2rem;
}

.clear::after {
  content: "";
  display: block;
  clear: left;
}

.active {
  background: #028174;
  color: #ffffff;
}

.new-table-padding td {
  padding: 0.1rem 0.1rem !important;
}
</style><style>
.new-width-input>input {
  max-width: 10rem !important;
  font-size: 0.14rem !important;
}

.new-min-width-input>input {
  min-width: 0.4rem;
}

.new-width-input-date>.ivu-date-picker-rel>.ivu-input-wrapper>input {
  text-align: center;
  font-size: 0.14rem;
}
</style><style lang="less">
.sheet {
  touch-action: none;

  .special .ivu-input {
    text-align: center;

  }

  .text_align .ivu-input {
    text-align: center;
  }

  .dateY_width {
    width: 0.6rem;
  }

  .dateM_width {
    width: 0.4rem;
  }

  .table-padding td {
    padding: 0.05rem;
  }

  .fontS .ivu-checkbox-wrapper {
    font-size: 0.11rem;
  }

  .dateD_width .ivu-input {}
}

.sheet {
  padding: 0 25px 0 15px;
}

.table {
  font-size: 0.14rem
    /* 14/102 */
  ;
  text-align: left;

  .cell {
    text-align: left;

    .flex {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }

  input {
    border: 0;
    outline: none;
    // max-width: 0.59rem /* 60/102 */;
  }

  label {
    // margin: 0 0.1rem;

    input {
      margin: 0 0.05rem;
    }
  }

  textarea {
    border: 0;
    resize: none;
    width: 100%;
    font-size: 0.14rem;
  }

  article {
    display: inline-block;
    width: 49%;
  }

  .block label {
    display: block;
  }
}

.tip_text span {
  margin: 0 0.2rem
    /* 20/102 */
  ;
}

.date {
  padding: 0.1rem 0 !important;

  input {
    width: 0.31rem
      /* 32/102 */
    ;
    text-align: right;
  }
}

.sheetTable {
  font-size: 14px;
  width: 100%;
  margin-bottom: 0.26rem;
}

.sheetTable td {
  padding: 0.13rem 0;
}

.sheetTitle {
  text-align: left;
  font-size: 0.18rem
    /* 18/102 */
  ;
  line-height: 0.55rem
    /* 56/102 */
  ;
  padding: 0 0.26rem
    /* 27/102 */
  ;
  background: linear-gradient(90deg, #63af1e, #63af1e, #fff);
  color: #fff;
  margin: 0.25rem
    /* 25/102 */
    0;
}

.bd {
  border: 0;
  outline: none;
  max-width: 0.29rem !important
    /* 60/102 */
  ;
}

.wd {
  width: 0.3rem;
}

.autograph {
  width: 100%;
  margin-bottom: 0.26rem;
}

.autograph td {
  height: 0.5rem;
  line-height: 0.5rem;
}

.agree {
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid #000;
  text-align: left;
}

.food {
  font-size: 14px;
  width: 100%;
  margin-bottom: 0.26rem;
}

.food>tr>td {
  height: 0.37rem;
}

.food>tr>th {
  height: 0.37rem;
}

.demend {
  width: 0.9rem;
  height: 0.7rem;
}

.food-input {
  width: auto;
}

.move {
  width: 100%;
  /* overflow-y:scroll; */
}
.evaluate-text-left{
   text-align: left;
}

</style>
