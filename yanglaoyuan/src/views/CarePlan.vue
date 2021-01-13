<template>
  <div class="care-plan">
    <h1 class="trip-title">{{$t("CarePlan.CarePlan1")}}</h1>

      <div class="deta_header">
      <!-- 月次功能 -->
      <div class="selectBox">
        <div class="year">
          <DatePicker class="calendarFont" type="year" placeholder="请选择年份" style="100% 100%" :value="occurrenceYear" format="yyyy"  :editable="false" @on-change="onGetYear"></DatePicker>
        </div>
        <div class="occurrenceDay">
          <Select v-model="occurrenceDay" @on-change="onWith" style="width: 100%">
            <Option v-for="item in occurrenceDayList" :value="item.value" :key="item.value" format="yyyy-MM-dd">{{ item.value}}</Option>
          </Select>
        </div>
      </div>

      <!-- <div class="modifyDay">
        作成日：<DatePicker class="calendarFont" style="100% 100%" v-model="modifyDay"></DatePicker>
      </div> -->

    </div>

    <table
      class="table new-table"
      border="1"
      style="border:1px solid #c4e8bf;overflow:auto;backgtound:#fffff;"
    >
      <tr>
        <td class="head-bg" style="width: 1.13rem;">{{$t("CarePlan.CarePlan2")}}</td>
        <td>
          <!-- <Input v-model="oldName" type="textarea" autosize class="new-width-input special" /> -->
          {{oldName}}   <span style="margin-left:0.2rem;">{{$t('CarePlan.CarePlan3')}}</span>
        </td>
        <td class="head-bg">{{$t("CarePlan.CarePlan10")}}</td>
        <td class="">
          <Input v-model="plan.careName" type="textarea" autosize class="new-width-input special newfont"/>
        </td>
        <td class="head-bg">{{$t("CarePlan.CarePlan6")}}</td>
        <td style="width: 1.3rem;">
          <Col span="12" style="width:100%;">
            <DatePicker
              class="new-width-input-date calendarFont"
              type="date"
              :editable="false"
              :value="plan.createDate"
              :placeholder="$t('global.choose')"
              style="width:100%;position:relative;"
              @on-change="plan.createDate = $event"
              format="yyyy-MM-dd"
            ></DatePicker>
          </Col>
        </td>
      </tr>
      <tr>
        <td class="head-bg" style="white-space:nowrap;">{{$t("CarePlan.CarePlan7")}}</td>
        <td>
          <!-- <Col span="12" style="width:100%;">
            <DatePicker
              class="new-width-input-date calendarFont"
              type="date"
              :editable="false"
              :value="plan.bigDate"
              :placeholder="$t('global.choose')"
              style="width:100%;position:relative;"
              @on-change="plan.bigDate = $event"
            ></DatePicker>
          </Col> -->
          {{oldDate}}
        </td>
        <td class="head-bg">{{$t("worksheet.age")}}</td>
        <td>
            <p style="text-align: left;">{{oldAge}}  {{$t("CarePlan.CarePlan9")}}</p>
           
        </td>
        <td class="head-bg">{{$t("oldManMsg.cohabitation.gender")}}</td>
        <td>
      
          <!-- <RadioGroup v-model="oldSex">
            <Radio label="1" disabled @mouseup.native="onGender('1')">{{$t("CarePlan.CarePlan4")}}</Radio>
            <Radio label="2" disabled @mouseup.native="onGender('2')">{{$t("CarePlan.CarePlan5")}}</Radio>
          </RadioGroup> -->
          {{$t(oldSex)}}
        </td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="2">{{$t("CarePlan.CarePlan11")}}</td>
        <td rowspan="2" colspan="4">
           <div style="display:flex;text-align:left;align-items:baseline;">
          <RadioGroup v-model="plan.bedsoreNow.bool" style="white-space:nowrap;">
            1.{{$t('evaluate.mobileTrauma.now')}}
            <Radio label="0" @mouseup.native="onBedsoreNow('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio
              label="1"
              @mouseup.native="onBedsoreNow('1')"
            >{{$t('CarePlan.CarePlan13')}}</Radio>
          </RadioGroup>

          <CheckboxGroup v-model="plan.bedsoreNow.bool2">
            【<Checkbox label="0">{{$t('CarePlan.CarePlan13_1')}}</Checkbox>
            <Checkbox label="1">{{$t('CarePlan.CarePlan13_2')}}</Checkbox>
            <Checkbox label="2">{{$t('CarePlan.CarePlan13_3')}}</Checkbox>
            <Checkbox label="3">{{$t('CarePlan.CarePlan13_4')}}</Checkbox>
            <Checkbox label="4">{{$t('CarePlan.CarePlan13_5')}}</Checkbox>
            <Checkbox label="5">{{$t('CarePlan.CarePlan13_6')}}</Checkbox>
             (<Input
              type="textarea"
              autosize
              v-model="plan.bedsoreNow.content"
              class="new-width-input special"
              style="width: 15%;"
            />)】
          </CheckboxGroup>
          </div>

          


        
         <div style="display:flex;text-align:left;align-items:baseline;">
          <RadioGroup v-model="plan.bedsorePass.bool" style="white-space:nowrap;">
            2.{{$t('evaluate.mobileTrauma.past')}}
            <Radio label="0" @mouseup.native="onBedsorePass('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
            <Radio
              label="1"
              @mouseup.native="onBedsorePass('1')"
            >{{$t('CarePlan.CarePlan13')}}</Radio>
          </RadioGroup>
      
           <CheckboxGroup v-model="plan.bedsorePass.bool2">
            【<Checkbox label="0">{{$t('CarePlan.CarePlan13_1')}}</Checkbox>
            <Checkbox label="1">{{$t('CarePlan.CarePlan13_2')}}</Checkbox>
            <Checkbox label="2">{{$t('CarePlan.CarePlan13_3')}}</Checkbox>
            <Checkbox label="3">{{$t('CarePlan.CarePlan13_4')}}</Checkbox>
            <Checkbox label="4">{{$t('CarePlan.CarePlan13_5')}}</Checkbox>
            <Checkbox label="5">{{$t('CarePlan.CarePlan13_6')}}</Checkbox>
             (<Input
              type="textarea"
              autosize
               v-model="plan.bedsorePass.content"
              class="new-width-input special"
              style="width: 15%;"
            />)】
          </CheckboxGroup>
          </div>
       
     
          
        </td>
        <td class="head-bg">{{$t('evaluate.mobileTrauma.bedsore')}}</td>
      </tr>
      <tr style="height: 0.5rem;">
        <!-- {{boolDate}} -->
        <td>
          <p v-if="boolDate">{{plan.happenedDate}}</p>
          <Col span="12" v-if="!boolDate" style="width:1.5rem;">
            <DatePicker
              class="new-width-input-date calendarFont"
              type="date"
              :editable="false"
              :value="plan.happenedDate"
               :placeholder="$t('global.choose')"
              style="width:100%;position:relative;"
              @on-change="changeHappenedDate($event)"
            ></DatePicker>
          </Col>
        </td>
      </tr>
    </table>

    <table
      class="plan-table new-table"
      border="1"
      style="border:1px solid #c4e8bf; background:#ffffff;"
    >
      <tr class="head">
        <td style="width: .2rem" rowspan="14">{{$t("CarePlan.CarePlan16")}}</td>
        <td colspan="3">{{$t("CarePlan.CarePlan17")}}</td>
        <td style="width: 5rem; background:#ffffff;color:#000000;">
          <RadioGroup v-model="plan.riskIndependent">
            <Radio label="0" @mouseup.native="onRiskIndependent('0')">J(1,2)</Radio>
            <Radio label="1" @mouseup.native="onRiskIndependent('1')">A(1,2)</Radio>
            <Radio label="2" @mouseup.native="onRiskIndependent('2')">B(1,2)</Radio>
            <Radio label="3" @mouseup.native="onRiskIndependent('3')">C(1,2)</Radio>
          </RadioGroup>
        </td>
        <td style="width: 1.5rem;">{{$t("CarePlan.CarePlan47")}}</td>
      </tr>
      <tr>
        <td rowspan="4" class="head">{{$t("CarePlan.CarePlan18")}}</td>
        <td colspan="2" class="head">{{$t("CarePlan.CarePlan19")}}</td>
        <td>
          <RadioGroup v-model="plan.riskBathe">
            <Radio label="0" @mouseup.native="onRiskBathe('0')">{{$t("CarePlan.CarePlan30")}}</Radio>
            <Radio label="1" @mouseup.native="onRiskBathe('1')">{{$t("CarePlan.CarePlan31")}}</Radio>
          </RadioGroup>
        </td>
        <td rowspan="13">
          {{$t("CarePlan.CarePlan48")}}
          <p>{{$t("CarePlan.CarePlan49")}}</p>
          <div>
            <RadioGroup v-model="plan.riskPlan">
              <Radio label="0" @mouseup.native="onRiskPlan('0')">{{$t("evaluate.new.you")}}</Radio>
              <Radio label="1" @mouseup.native="onRiskPlan('1')">{{$t("evaluate.new.wu")}}</Radio>
            </RadioGroup>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="head">{{$t("CarePlan.CarePlan20")}}</td>
        <td>
          <RadioGroup v-model="plan.riskFood">
            <Radio label="0" @mouseup.native="onRiskFood('0')">{{$t("CarePlan.CarePlan30")}}</Radio>
            <Radio label="1" @mouseup.native="onRiskFood('1')">{{$t("CarePlan.CarePlan31")}}</Radio>
            <Radio label="2" @mouseup.native="onRiskFood('2')">{{$t("CarePlan.CarePlan32")}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td rowspan="2" class="head">{{$t("CarePlan.CarePlan21")}}</td>
        <td class="head">{{$t("CarePlan.CarePlan22")}}</td>
        <td>
          <RadioGroup v-model="plan.riskJacket">
            <Radio label="0" @mouseup.native="onRiskJacket('0')">{{$t("CarePlan.CarePlan30")}}</Radio>
            <Radio label="1" @mouseup.native="onRiskJacket('1')">{{$t("CarePlan.CarePlan31")}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head">{{$t("CarePlan.CarePlan23")}}</td>
        <td>
          <RadioGroup v-model="plan.riskUnderwear">
            <Radio label="0" @mouseup.native="onRiskUnderwear('0')">{{$t("CarePlan.CarePlan30")}}</Radio>
            <Radio label="1" @mouseup.native="onRiskUnderwear('1')">{{$t("CarePlan.CarePlan31")}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td rowspan="4" class="head">{{$t("CarePlan.CarePlan24")}}</td>
        <td colspan="2" class="head">{{$t("CarePlan.CarePlan25")}}</td>
        <td>
          <RadioGroup v-model="plan.riskTumble">
            <Radio label="0" @mouseup.native="onRiskTumble('0')">{{$t("CarePlan.CarePlan30")}}</Radio>
            <Radio label="1" @mouseup.native="onRiskTumble('1')">{{$t("CarePlan.CarePlan31")}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="head">{{$t("CarePlan.CarePlan26")}}</td>
        <td>
          <RadioGroup v-model="plan.riskSit">
            <Radio label="0" @mouseup.native="onRiskSit('0')">{{$t("CarePlan.CarePlan30")}}</Radio>
            <Radio label="1" @mouseup.native="onRiskSit('1')">{{$t("CarePlan.CarePlan31")}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="head">{{$t("CarePlan.CarePlan27")}}</td>
        <td>
          <RadioGroup v-model="plan.riskSitCar">
            <Radio label="0" @mouseup.native="onRiskSitCar('0')">{{$t("CarePlan.CarePlan30")}}</Radio>
            <Radio label="1" @mouseup.native="onRiskSitCar('1')">{{$t("CarePlan.CarePlan31")}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="head">{{$t("CarePlan.CarePlan28")}}</td>
        <td>
          <RadioGroup v-model="plan.riskNormal">
            <Radio label="0" @mouseup.native="onRiskNormal('0')">{{$t("CarePlan.CarePlan30")}}</Radio>
            <Radio label="1" @mouseup.native="onRiskNormal('1')">{{$t("CarePlan.CarePlan31")}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td rowspan="3" class="head">{{$t("CarePlan.CarePlan29")}}</td>
        <td colspan="2" class="head">{{$t("CarePlan.CarePlan33")}}</td>
        <td>
          <RadioGroup v-model="plan.riskUroclepsia">
            <Radio label="0" @mouseup.native="onRiskUroclepsia('0')">{{$t("CarePlan.CarePlan35")}}</Radio>
            <Radio label="1" @mouseup.native="onRiskUroclepsia('1')">{{$t("CarePlan.CarePlan36")}}</Radio>
            <Radio label="2" @mouseup.native="onRiskUroclepsia('2')">{{$t("CarePlan.CarePlan37")}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="head">{{$t("CarePlan.CarePlan34")}}</td>
        <td>
          <RadioGroup v-model="plan.riskIncontinence">
            <Radio label="0" @mouseup.native="onRiskIncontinence('0')">{{$t("CarePlan.CarePlan35")}}</Radio>
            <Radio label="1" @mouseup.native="onRiskIncontinence('1')">{{$t("CarePlan.CarePlan36")}}</Radio>
            <Radio
              label="2"
              @mouseup.native="onRiskIncontinence('2')"
            >{{$t("CarePlan.CarePlan37_1")}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="head" style="white-space:nowrap;">{{$t("CarePlan.CarePlan38")}}</td>
        <td>
          <RadioGroup v-model="plan.riskBarronCatheter">
            <Radio
              label="0"
              @mouseup.native="onRiskBarronCatheter('0')"
            >{{$t("CarePlan.CarePlan35")}}</Radio>
            <Radio
              label="1"
              @mouseup.native="onRiskBarronCatheter('1')"
            >{{$t("CarePlan.CarePlan36")}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head">{{$t("CarePlan.CarePlan39")}}</td>
        <td colspan="2" class="head" style="background:#ffffff;color:#000000;">
          BMI (
          <Input  type="textarea" autosize v-model="plan.riskBmi" style="text-align:center;width:50%" /> )
        </td>
        <td>
          <RadioGroup v-model="plan.riskNutritionStatus">
            <Radio
              label="0"
              @mouseup.native="onRiskNutritionStatus('0')"
            >{{$t("CarePlan.CarePlan41")}}</Radio>
            <Radio
              label="1"
              @mouseup.native="onRiskNutritionStatus('1')"
            >{{$t("CarePlan.CarePlan42")}}</Radio>
            <Radio
              label="2"
              @mouseup.native="onRiskNutritionStatus('2')"
            >{{$t("CarePlan.CarePlan43")}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="head">{{$t("CarePlan.CarePlan44")}}</td>
        <td>
          <RadioGroup v-model="plan.riskPass">
            <Radio label="0" @mouseup.native="onRriskPass('0')">{{$t("CarePlan.CarePlan45")}}</Radio>
            <Radio label="1" @mouseup.native="onRriskPass('1')">{{$t("CarePlan.CarePlan46")}}</Radio>
          </RadioGroup>
        </td>
      </tr>
    </table>

    <p class="plan-info">{{$t("CarePlan.CarePlan51")}}</p>

    <table
      class="plan-table new-table"
      border="1"
      bordercolor="#d2d2d2"
      style="border:1px solid #c4e8bf;background:#ffffff;"
    >
      <thead class="head">
        <tr>
          <td colspan="2"></td>
          <td>{{$t("CarePlan.CarePlan52")}}</td>
          <td>{{$t("CarePlan.CarePlan53")}}</td>
          <td>{{$t("CarePlan.CarePlan54")}}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="25" style="width: .2rem;" class="head">{{$t("CarePlan.CarePlan55")}}</td>
          <td rowspan="6" style="width: .2rem;" class="head">OP</td>
          <td class="head">{{$t("CarePlan.CarePlan56")}}</td>
          <td>
            <CheckboxGroup v-model="plan.planSkin.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan57_1")}}</Checkbox>
              <Checkbox label="1">{{$t("CarePlan.CarePlan57_2")}}</Checkbox>
              <Checkbox label="2">{{$t("CarePlan.CarePlan57_3")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planSkin.radio">
              <Radio label="0" @mouseup.native="onPlanSkin('0')">{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio label="1" @mouseup.native="onPlanSkin('1')">{{$t("CarePlan.CarePlan58_2")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td class="head">{{$t("CarePlan.CarePlan59")}}</td>
          <td>
            <CheckboxGroup v-model="plan.planAdl.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan60")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planAdl.radio">
              <Radio label="0" @mouseup.native="onPlanAdl('0')">{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio label="1" @mouseup.native="onPlanAdl('1')">{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio label="2" @mouseup.native="onPlanAdl('2')">{{$t("CarePlan.CarePlan58_3")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td class="head">{{$t("CarePlan.CarePlan62")}}</td>
          <td>
            <CheckboxGroup v-model="plan.planDiet.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan63_1")}}</Checkbox>
              <Checkbox label="1">{{$t("CarePlan.CarePlan63_2")}}</Checkbox>
              <Checkbox label="2">{{$t("CarePlan.CarePlan63_3")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planDiet.radio">
              <Radio label="0" @mouseup.native="onPlanDiet('0')">{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio label="1" @mouseup.native="onPlanDiet('1')">{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio label="2" @mouseup.native="onPlanDiet('2')">{{$t("CarePlan.CarePlan87")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td class="head">{{$t("CarePlan.CarePlan64")}}</td>
          <td>
            <CheckboxGroup v-model="plan.planNutrition.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan66_1")}}</Checkbox>
              <Checkbox label="1">{{$t("CarePlan.CarePlan66_2")}}</Checkbox>
              <Checkbox label="2">{{$t("CarePlan.CarePlan66_3")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planNutrition.radio">
              <Radio
                label="0"
                @mouseup.native="onPlanNutrition('0')"
              >{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio
                label="1"
                @mouseup.native="onPlanNutrition('1')"
              >{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio label="2" @mouseup.native="onPlanNutrition('2')">{{$t("CarePlan.CarePlan87")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td class="head">{{$t("CarePlan.CarePlan67")}}</td>
          <td style="font-size:14px;">
            {{$t("CarePlan.CarePlan69_1")}}(
            <Input
              type="textarea"
              autosize
              v-model="plan.planImpact.centent1"
              class="new-width-input special"
              style="width:20%"
            />
            )
            {{$t("CarePlan.CarePlan69_2")}}(
            <Input
              type="textarea"
              autosize
              v-model="plan.planImpact.centent2"
              class="new-width-input special"
              style="width:20%"
            />)
          </td>
          <td>
            <RadioGroup v-model="plan.planImpact.radio">
              <Radio label="0" @mouseup.native="onPlanImpact('0')">{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio label="1" @mouseup.native="onPlanImpact('1')">{{$t("CarePlan.CarePlan118")}}</Radio>
            </RadioGroup>

          </td>
        </tr>
        <tr>
          <td class="head">{{$t("CarePlan.CarePlan71")}}</td>
          <td>
            <CheckboxGroup v-model="plan.planChange.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan72")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planChange.radio">
              <Radio label="0" @mouseup.native="onPlanChange('0')">{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio label="1" @mouseup.native="onPlanChange('1')">{{$t("CarePlan.CarePlan58_2")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td rowspan="17" class="head">TP</td>
          <td rowspan="5" class="head">{{$t("CarePlan.CarePlan74")}}</td>
          <td>
            <CheckboxGroup v-model="plan.planPressureA.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan75")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planPressureA.radio">
              <Radio
                label="0"
                @mouseup.native="onPlanPressureA('0')"
              >{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio
                label="1"
                @mouseup.native="onPlanPressureA('1')"
              >{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio
                label="2"
                @mouseup.native="onPlanPressureA('2')"
              >{{$t("CarePlan.CarePlan58_3")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td>
            <CheckboxGroup v-model="plan.planPressureB.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan77")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planPressureB.radio">
              <Radio
                label="0"
                @mouseup.native="onPlanPressureB('0')"
              >{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio
                label="1"
                @mouseup.native="onPlanPressureB('1')"
              >{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio
                label="2"
                @mouseup.native="onPlanPressureB('2')"
              >{{$t("CarePlan.CarePlan58_3")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td>
            <CheckboxGroup v-model="plan.planPressureC.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan78")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planPressureC.radio">
              <Radio
                label="0"
                @mouseup.native="onPlanPressureC('0')"
              >{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio
                label="1"
                @mouseup.native="onPlanPressureC('1')"
              >{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio
                label="2"
                @mouseup.native="onPlanPressureC('2')"
              >{{$t("CarePlan.CarePlan58_3")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td>
            <CheckboxGroup v-model="plan.planPressureD.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan79")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planPressureD.radio">
              <Radio
                label="0"
                @mouseup.native="onPlanPressureD('0')"
              >{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio
                label="1"
                @mouseup.native="onPlanPressureD('1')"
              >{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio
                label="2"
                @mouseup.native="onPlanPressureD('2')"
              >{{$t("CarePlan.CarePlan58_3")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td style="font-size:14px;">
            {{$t("CarePlan.CarePlan80")}}(
            <Input
              type="textarea"
              autosize
              v-model="plan.planPressureE"
              class="new-width-input special"
              style="width:30%"
            />)
          </td>
          <td></td>
        </tr>

        <tr>
          <td rowspan="4" class="head">{{$t("CarePlan.CarePlan81")}}</td>
          <td>
            <CheckboxGroup v-model="plan.planNursingA.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan82")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planNursingA.radio">
              <Radio label="0" @mouseup.native="onPlanNursingA('0')">{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio label="1" @mouseup.native="onPlanNursingA('1')">{{$t("CarePlan.CarePlan58_2")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td>
            <CheckboxGroup v-model="plan.planNursingB.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan83")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planNursingB.radio">
              <Radio label="0" @mouseup.native="onPlanNursingB('0')">{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio label="1" @mouseup.native="onPlanNursingB('1')">{{$t("CarePlan.CarePlan58_2")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td>
            <CheckboxGroup v-model="plan.planNursingC.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan84")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planNursingC.radio">
              <Radio label="0" @mouseup.native="onPlanNursingC('0')">{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio label="1" @mouseup.native="onPlanNursingC('1')">{{$t("CarePlan.CarePlan58_2")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td style="font-size:14px;">
            {{$t("CarePlan.CarePlan85")}}(
            <Input
              type="textarea"
              autosize
              v-model="plan.planNursingD"
              class="new-width-input special"
              style="width:30%"
            />)
          </td>
          <td></td>
        </tr>
        <tr>
          <td rowspan="6" class="head">{{$t("CarePlan.CarePlan87")}} <br/> {{$t("CarePlan.CarePlan88")}}</td>
          <td>
            <CheckboxGroup v-model="plan.planNutritionA.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan89")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planNutritionA.radio">
              <Radio
                label="0"
                @mouseup.native="onPlanNutritionA('0')"
              >{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio
                label="1"
                @mouseup.native="onPlanNutritionA('1')"
              >{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio
                label="2"
                @mouseup.native="onPlanNutritionA('2')"
              >{{$t("CarePlan.CarePlan58_3")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td>
            <CheckboxGroup v-model="plan.planNutritionB.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan91")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planNutritionB.radio">
              <Radio
                label="0"
                @mouseup.native="onPlanNutritionB('0')"
              >{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio
                label="1"
                @mouseup.native="onPlanNutritionB('1')"
              >{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio
                label="2"
                @mouseup.native="onPlanNutritionB('2')"
              >{{$t("CarePlan.CarePlan118")}}</Radio>
              <Radio
                label="3"
                @mouseup.native="onPlanNutritionB('3')"
              >{{$t("CarePlan.CarePlan58_3")}}</Radio>
              <Radio label="4" @mouseup.native="onPlanNutritionB('4')">{{$t("CarePlan.CarePlan87")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td style="font-size:14px;">
            {{$t("CarePlan.CarePlan93")}}
            <Input
              type="textarea"
              autosize
              v-model="plan.planNutritionC.content"
              class="new-width-input special"
              style="width:20%"
            />
          </td>
          <td>
            <RadioGroup v-model="plan.planNutritionC.radio">
              <Radio
                label="0"
                @mouseup.native="onPlanNutritionC('0')"
              >{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio
                label="1"
                @mouseup.native="onPlanNutritionC('1')"
              >{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio label="2" @mouseup.native="onPlanNutritionC('2')">{{$t("CarePlan.CarePlan87")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td>
            <div style="font-size:14px;">
              {{$t("CarePlan.CarePlan95_1")}}
              <CheckboxGroup v-model="plan.planNutritionD.check" style="display:inline-block;">
                (
                <Checkbox label="0">{{$t("CarePlan.CarePlan95_2")}}</Checkbox>
                <Checkbox label="1">{{$t("CarePlan.CarePlan95_3")}}</Checkbox>
                <Checkbox label="2">{{$t("CarePlan.CarePlan95_4")}}</Checkbox>)
              </CheckboxGroup>
            </div>
          </td>
          <td>
            <RadioGroup v-model="plan.planNutritionD.radio">
              <Radio
                label="0"
                @mouseup.native="onPlanNutritionD('0')"
              >{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio
                label="1"
                @mouseup.native="onPlanNutritionD('1')"
              >{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio
                label="2"
                @mouseup.native="onPlanNutritionD('2')"
              >{{$t("CarePlan.CarePlan58_3")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td>
            <div style="font-size:14px;">
              {{$t("CarePlan.CarePlan97_1")}}
              <CheckboxGroup v-model="plan.planNutritionE.check" style="display:inline-block;">
                (
                <Checkbox label="0">{{$t("CarePlan.CarePlan97_2")}}</Checkbox>
                <Checkbox label="1">{{$t("CarePlan.CarePlan97_3")}}</Checkbox>)
              </CheckboxGroup>
            </div>
          </td>
          <td>
            <RadioGroup v-model="plan.planNutritionE.radio">
              <Radio
                label="0"
                @mouseup.native="onPlanNutritionE('0')"
              >{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio
                label="1"
                @mouseup.native="onPlanNutritionE('1')"
              >{{$t("CarePlan.CarePlan58_2")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td style="font-size:14px;">
            {{$t("CarePlan.CarePlan99")}} (
            <Input
              type="textarea"
              autosize
              v-model="plan.planNutritionF"
              class="new-width-input special"
              style="width:30%"
            />)
          </td>
          <td></td>
        </tr>
        <tr>
          <td rowspan="2" class="head">{{$t("CarePlan.CarePlan100")}}</td>
          <td style="font-size:14px;">
            {{$t("CarePlan.CarePlan101")}}(
            <Input
              type="textarea"
              autosize
              v-model="plan.planImpactA.content"
              class="new-width-input special"
              style="width:30%"
            />)
          </td>
          <td>
            <RadioGroup v-model="plan.planImpactA.radio">
              <Radio label="0" @mouseup.native="onPlanImpactA('0')">{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio label="1" @mouseup.native="onPlanImpactA('1')">{{$t("CarePlan.CarePlan118")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td>
            <CheckboxGroup v-model="plan.planImpactB.check">
              <Checkbox label="0">{{$t("CarePlan.CarePlan103")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planImpactB.radio">
              <Radio label="0" @mouseup.native="onPlanImpactB('0')">{{$t("CarePlan.CarePlan58_2")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td rowspan="2" class="head">EP</td>
          <td rowspan="2" class="head">{{$t("CarePlan.CarePlan105")}}</td>
          <td>
            <CheckboxGroup v-model="plan.planGuideA.check">
              <Checkbox
                label="0"
              >{{$t("CarePlan.CarePlan106_1")}} · {{$t("CarePlan.CarePlan106_2")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planGuideA.radio">
              <Radio label="0" @mouseup.native="onPlanGuideA('0')">{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio label="1" @mouseup.native="onPlanGuideA('1')">{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio label="2" @mouseup.native="onPlanGuideA('2')">{{$t("CarePlan.CarePlan58_3")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td>
            <CheckboxGroup v-model="plan.planGuideB.check">
              2.
              <Checkbox label="0">{{$t("CarePlan.CarePlan108_1")}}</Checkbox>
              <Checkbox label="1">{{$t("CarePlan.CarePlan108_2")}}</Checkbox>
              <Checkbox label="2">{{$t("CarePlan.CarePlan108_3")}}</Checkbox>
            </CheckboxGroup>
          </td>
          <td>
            <RadioGroup v-model="plan.planGuideB.radio">
              <Radio label="0" @mouseup.native="onPlanGuideB('0')">{{$t("CarePlan.CarePlan58_1")}}</Radio>
              <Radio label="1" @mouseup.native="onPlanGuideB('1')">{{$t("CarePlan.CarePlan58_2")}}</Radio>
              <Radio label="2" @mouseup.native="onPlanGuideB('2')">{{$t("CarePlan.CarePlan58_3")}}</Radio>
            </RadioGroup>
          </td>
        </tr>
      </tbody>
    </table>
    <label class="plan-license">
      <CheckboxGroup v-model="plan.agreement">
        <Checkbox label="0">{{$t("CarePlan.CarePlan109")}}</Checkbox>
      </CheckboxGroup>
    </label>
    <table
      class="plan-footer new-table"
      border="1"
      style="border:1px solid #c4e8bf;overflow:auto;background:#ffffff;"
    >
      <tr>
        <td class="head-bg" style="white-space:nowrap;">{{$t("CarePlan.CarePlan112")}}</td>
        <td>
          <Col span="12" style="width:100%;">
            <DatePicker
              class="new-width-input-date calendarFont"
              type="date"
              :editable="false"
              :value="plan.descritionDate"
              :placeholder="$t('global.choose')"
              style="width:100%;position:relative;"
              @on-change="plan.descritionDate = $event"
            ></DatePicker>
          </Col>
        </td>
        <td class="head-bg" style="white-space:nowrap;">{{$t("CarePlan.CarePlan110")}}</td>
        <td>
          <Input type="textarea" autosize v-model="plan.signature" class="new-width-input special" />
        </td>
        <td class="head-bg" style="white-space:nowrap;">{{$t("CarePlan.CarePlan116")}}</td>
        <td>
          <Input
            type="textarea"
            autosize
            v-model="plan.familyFlag"
            class="new-width-input special"
          />
        </td>
        <td class="head-bg" style="white-space:nowrap;">{{$t("CarePlan.CarePlan111")}}</td>
        <td>
          <Input
            type="textarea"
            autosize
            v-model="plan.interpreterFlag"
            class="new-width-input special"
          />
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
import { selectPlan, insertPlan, updatePlan , getDateById ,getYear } from "../network/every";
import {getBaseInfo} from "../network/Sinyu";
import { format } from "../assets/utils/Tools";
import Vue from "vue";
export default {
  data() {
    return {
      boolDate:"" ,
      oldName:"" , //公共姓名
      oldAge:"" , //公共年龄
      oldDate:"" ,//公共出生日期
      oldSex:"" , //公共性别
      oldId: "",
      plan:{
            age: "",
            agreement: [],
            bedsoreNow: { bool: "" ,content: "" , bool2:[]},
            bedsorePass: { bool: "", content: "" , bool2:[]},
            bedsoreStatus: "",
            bigDate: "",
            careName: "",
            createDate:"" ,
            descritionDate: "",
            familyFlag: "",
            fullName: "",
            gender: "",
            happenedDate: "",
            id: "",
            interpreterFlag: "",
            oldManId: 3,
            planAdl:{ check: [], radio: "" },
            planChange: { check: [], radio: "" },
            planDiet:  { check: [], radio: "" },
            planGuideA: { check: [], radio: "" },
            planGuideB:{ check: [], radio: "" },
            planImpact:{centent1:"" , centent2:"" , radio:""} ,
            planImpactA:{ content: "", radio: "" },
            planImpactB: { check: [], radio: "" },
            planNursingA:  { check: [], radio: "" },
            planNursingB: { check: [], radio: "" },
            planNursingC:  { check: [], radio: "" },
            planNursingD: "",
            planNutrition: { check: [], radio: "" },
            planNutritionA: { check: [], radio: "" },
            planNutritionB:{ check: [], radio: "" },
            planNutritionC: { content: "", radio: "" },
            planNutritionD:{ check: [], radio: "" },
            planNutritionE:  { check: [], radio: "" },
            planNutritionF: "",
            planPressureA:  { check: [], radio: "" },
            planPressureB: { check: [], radio: "" },
            planPressureC:  { check: [], radio: "" },
            planPressureD: { check: [], radio: "" },
            planPressureE: "",
            planSkin:{ check: [], radio: "" },
            riskBarronCatheter: "",
            riskBathe: "",
            riskBmi: "",
            riskFood: "",
            riskIncontinence: "",
            riskIndependent: "",
            riskJacket: "",
            riskNormal: "",
            riskNutritionStatus: "",
            riskPass: "",
            riskPlan: "",
            riskSit: "",
            riskSitCar: "",
            riskTumble: "",
            riskUnderwear: "",
            riskUroclepsia: "",
            signature: "",
          } ,
       // 月次data
      occurrenceYear:format(new Date(), "YYYY") ,
      occurrenceDay:'',
      occurrenceDayList:[],
      modifyDay:''
  };
  },
 
  methods: {
    onInsert() {
      this.onAdd();
    },

    async onAdd() {
      this.plan.oldManId = this.oldId;

      if(this.plan.createDate == ""){
            this.$Notice.error({
            title: this.$t("global.operationFail"),
            desc: this.$t("CarePlan.CarePlan121")
          });
        return;
      }
     
      if (
        this.plan.bedsoreNow.bool == "1" ||
        this.plan.bedsorePass.bool == "1"
      ) {
        this.plan.bedsoreStatus = "1";
      } else {
        this.plan.bedsoreStatus = "0";
      }

      //修改缓存是否存在压疮状态（1有0无）
      let oldObj = JSON.parse(localStorage.getItem("oldInfo"));
      oldObj.bedsoreStatus = this.plan.bedsoreStatus;
      localStorage.setItem("oldInfo", JSON.stringify(oldObj));  

      

       if(this.plan.bedsoreStatus == "1"){
          if(!this.plan.happenedDate){
            this.$Notice.error({
              title: this.$t("global.reminder"),
              desc: this.$t("CarePlan.CarePlan119")
            });
             return
          }     
       }
      console.log(this.plan);
      // return
      let copy = {};
      for (let i in this.plan) {
        Vue.set(copy, i, this.plan[i]);
      }
      
      copy.age = this.oldAge;
      copy.gender =  this.gender;
      copy.bigDate = this.oldDate;
      copy.fullName = this.oldName;
      copy.bedsoreNow = JSON.stringify(this.plan.bedsoreNow);
      copy.bedsorePass = JSON.stringify(this.plan.bedsorePass);
      copy.planSkin = JSON.stringify(this.plan.planSkin);
      copy.planAdl = JSON.stringify(this.plan.planAdl);
      copy.planDiet = JSON.stringify(this.plan.planDiet);
      copy.planNutrition = JSON.stringify(this.plan.planNutrition);
      copy.planImpact = JSON.stringify(this.plan.planImpact);
      copy.planChange = JSON.stringify(this.plan.planChange);
      copy.planPressureA = JSON.stringify(this.plan.planPressureA);
      copy.planPressureB = JSON.stringify(this.plan.planPressureB);
      copy.planPressureC = JSON.stringify(this.plan.planPressureC);
      copy.planPressureD = JSON.stringify(this.plan.planPressureD);
      copy.planNursingA = JSON.stringify(this.plan.planNursingA);
      copy.planNursingB = JSON.stringify(this.plan.planNursingB);
      copy.planNursingC = JSON.stringify(this.plan.planNursingC);
      copy.planNutritionA = JSON.stringify(this.plan.planNutritionA);
      copy.planNutritionB = JSON.stringify(this.plan.planNutritionB);
      copy.planNutritionC = JSON.stringify(this.plan.planNutritionC);
      copy.planNutritionD = JSON.stringify(this.plan.planNutritionD);
      copy.planNutritionE = JSON.stringify(this.plan.planNutritionE);
      copy.planImpactA = JSON.stringify(this.plan.planImpactA);
      copy.planImpactB = JSON.stringify(this.plan.planImpactB);
      copy.planGuideA = JSON.stringify(this.plan.planGuideA);
      copy.planGuideB = JSON.stringify(this.plan.planGuideB);
      copy.agreement = JSON.stringify(this.plan.agreement);



     

         if(copy.createDate != this.occurrenceDay){
            copy.id = "";
            
            try{
             let res = await insertPlan(copy);
                if (res.code == 0) {
                  this.$Notice.success({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.operationSuccess")
                  });
                }else if(res.code == 415){
                  this.$Notice.error({
                    title:this.$t("global.operationFail") ,
                    desc:this.$t("global.claim")
                  })

                } else {
                  this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.failed")
                  });
                }
                this.selectGetDateById();
                console.log("插入");

                if(this.plan.bedsoreStatus == "1" && this.plan.happenedDate){
                  this.goTo("/BedsoreAssess"); 
                }

            }catch(err){
                 console.log(err);
                 this.$Notice.error({
                    title: this.$t("global.reminder"),
                    desc: this.$t("global.failed")
                  });
            }
           

          }else{
          
             try{
              let result = await updatePlan(copy);
                  if (result.code == 0) {
                    this.$Notice.success({
                      title: this.$t("global.reminder"),
                      desc: this.$t("global.operationSuccess")
                    });
                  }else if(result.code == 415){
                    this.$Notice.error({
                      title: this.$t("global.operationFail"),
                      desc: this.$t("global.claim")
                    });
                  } else {
                    this.$Notice.error({
                      title: this.$t("global.reminder"),
                      desc: this.$t("global.failed")
                    });
                  }
                this.onGet();
                console.log("更新");
                if(this.plan.bedsoreStatus == "1" && this.plan.happenedDate){
                    this.goTo("/BedsoreAssess"); 
                  }
             }catch(err){
             console.log(err);
             this.$Notice.error({
                      title: this.$t("global.reminder"),
                      desc: this.$t("global.failed")
                    });
             }
           

          }


   
 
    
    },

    async onGet() {
      console.log("nian" , this.occurrenceDay);

      try{
          let result = await selectPlan({
            oldManId: this.oldId ,
            date:this.occurrenceDay
          });
      
          if(result.code == 0 || result.code == 416){
                if (result.data === null) {
                  return;
                }

              
                
                this.plan = result.data;
                this.plan.bedsoreNow = JSON.parse(result.data.bedsoreNow);
                this.plan.bedsorePass = JSON.parse(result.data.bedsorePass);
                this.plan.planSkin = JSON.parse(result.data.planSkin);
                this.plan.planAdl = JSON.parse(result.data.planAdl);
                this.plan.planDiet = JSON.parse(result.data.planDiet);
                this.plan.planNutrition = JSON.parse(result.data.planNutrition);
                this.plan.planImpact = JSON.parse(result.data.planImpact);
                this.plan.planChange = JSON.parse(result.data.planChange);
                this.plan.planPressureA = JSON.parse(result.data.planPressureA);
                this.plan.planPressureB = JSON.parse(result.data.planPressureB);
                this.plan.planPressureC = JSON.parse(result.data.planPressureC);
                this.plan.planPressureD = JSON.parse(result.data.planPressureD);
                this.plan.planNursingA = JSON.parse(result.data.planNursingA);
                this.plan.planNursingB = JSON.parse(result.data.planNursingB);
                this.plan.planNursingC = JSON.parse(result.data.planNursingC);
                this.plan.planNutritionA = JSON.parse(result.data.planNutritionA);
                this.plan.planNutritionB = JSON.parse(result.data.planNutritionB);
                this.plan.planNutritionC = JSON.parse(result.data.planNutritionC);
                this.plan.planNutritionD = JSON.parse(result.data.planNutritionD);
                this.plan.planNutritionE = JSON.parse(result.data.planNutritionE);
                this.plan.planImpactA = JSON.parse(result.data.planImpactA);
                this.plan.planImpactB = JSON.parse(result.data.planImpactB);
                this.plan.planGuideA = JSON.parse(result.data.planGuideA);
                this.plan.planGuideB = JSON.parse(result.data.planGuideB);
                this.plan.agreement = JSON.parse(result.data.agreement);

                if(this.plan.happenedDate === null){
                  this.plan.happenedDate = "";
                }

                if(this.plan.happenedDate == ""){
                  this.boolDate = false;
                }else{
                  this.boolDate = true;
                }

          }else{
                  this.$Notice.error({
                      title: this.$t("global.reminder"),
                      desc:  this.$t("global.loadFail"),
                    });
          }
      }catch(err){
        console.log(err);
        this.$Notice.error({
                      title: this.$t("global.reminder"),
                      desc:  this.$t("global.loadFail"),
                    });
      }
    
    
   
    },

    // 老人公共信息
    async oSharenOldInfo(){
         let res = await getBaseInfo({
            id: this.oldId
         });
         this.oldName = res.data.name;
         this.oldAge = res.data.age;
         this.oldDate = res.data.birthday;
        //  this.plan.bigDate = res.data.birthday;
         this.gender = res.data.sex;
         if(res.data.sex == 2){
             this.oldSex = "oldManMsg.Information.female";
         }else if(res.data.sex == 1){
             this.oldSex = "oldManMsg.Information.male";
         }   
       
         let lang = window.sessionStorage.getItem("language");
        
         if(!lang){
           lang = "ja"; 
         }

         if(lang == "ja"){

          let year = this.oldDate.split("-");
            try{
             let resultY = await getYear({
                   year:year[0]
                })
                if(resultY.code == 0){
                    console.log(resultY.data.name);
                    this.oldDate = `${resultY.data.name}-${year[1]}-${year[2]}`
                    this.plan.bigDate = this.oldDate;
                    console.log(this.plan.bigDate);
                }
            }catch(err){
               console.log(err);
            }
           

         }

    } ,


    


    onGender(index) {
      if (this.oldSex == index) {
        setTimeout(() => {
          this.oldSex = "";
        }, 10);
      }
    },

    onBedsoreNow(index) {
      if (this.plan.bedsoreNow.bool == index) {
        setTimeout(() => {
          this.plan.bedsoreNow.bool = "";
        }, 10);
      }
    },

  

    onBedsorePass(index) {
      if (this.plan.bedsorePass.bool == index) {
        setTimeout(() => {
          this.plan.bedsorePass.bool = "";
        }, 10);
      }
    },


    onRiskIndependent(index) {
      if (this.plan.riskIndependent == index) {
        setTimeout(() => {
          this.plan.riskIndependent = "";
        }, 10);
      }
    },
    onRiskBathe(index) {
      if (this.plan.riskBathe == index) {
        setTimeout(() => {
          this.plan.riskBathe = "";
        }, 10);
      }
    },

    onRiskFood(index) {
      if (this.plan.riskFood == index) {
        setTimeout(() => {
          this.plan.riskFood = "";
        }, 10);
      }
    },
    onRiskJacket(index) {
      if (this.plan.riskJacket == index) {
        setTimeout(() => {
          this.plan.riskJacket = "";
        }, 10);
      }
    },
    onRiskUnderwear(index) {
      if (this.plan.riskUnderwear == index) {
        setTimeout(() => {
          this.plan.riskUnderwear = "";
        }, 10);
      }
    },
    onRiskTumble(index) {
      if (this.plan.riskTumble == index) {
        setTimeout(() => {
          this.plan.riskTumble = "";
        }, 10);
      }
    },
    onRiskSit(index) {
      if (this.plan.riskSit == index) {
        setTimeout(() => {
          this.plan.riskSit = "";
        }, 10);
      }
    },
    onRiskSitCar(index) {
      if (this.plan.riskSitCar == index) {
        setTimeout(() => {
          this.plan.riskSitCar = "";
        }, 10);
      }
    },
    onRiskNormal(index) {
      if (this.plan.riskNormal == index) {
        setTimeout(() => {
          this.plan.riskNormal = "";
        }, 10);
      }
    },
    onRiskUroclepsia(index) {
      if (this.plan.riskUroclepsia == index) {
        setTimeout(() => {
          this.plan.riskUroclepsia = "";
        }, 10);
      }
    },
    onRiskIncontinence(index) {
      if (this.plan.riskIncontinence == index) {
        setTimeout(() => {
          this.plan.riskIncontinence = "";
        }, 10);
      }
    },
    onRiskBarronCatheter(index) {
      if (this.plan.riskBarronCatheter == index) {
        setTimeout(() => {
          this.plan.riskBarronCatheter = "";
        }, 10);
      }
    },
    onRiskNutritionStatus(index) {
      if (this.plan.riskNutritionStatus == index) {
        setTimeout(() => {
          this.plan.riskNutritionStatus = "";
        }, 10);
      }
    },
    onRriskPass(index) {
      if (this.plan.riskPass == index) {
        setTimeout(() => {
          this.plan.riskPass = "";
        }, 10);
      }
    },
    onPlanSkin(index) {
      if (this.plan.planSkin.radio == index) {
        setTimeout(() => {
          this.plan.planSkin.radio = "";
        }, 10);
      }
    },
    onPlanAdl(index) {
      if (this.plan.planAdl.radio == index) {
        setTimeout(() => {
          this.plan.planAdl.radio = "";
        }, 10);
      }
    },
    onPlanDiet(index) {
      if (this.plan.planDiet.radio == index) {
        setTimeout(() => {
          this.plan.planDiet.radio = "";
        }, 10);
      }
    },
    onPlanNutrition(index) {
      if (this.plan.planNutrition.radio == index) {
        setTimeout(() => {
          this.plan.planNutrition.radio = "";
        }, 10);
      }
    },
    onPlanImpact(index) {
      if (this.plan.planImpact.radio == index) {
        setTimeout(() => {
          this.plan.planImpact.radio = "";
        }, 10);
      }
    },
    onPlanChange(index) {
      if (this.plan.planChange.radio == index) {
        setTimeout(() => {
          this.plan.planChange.radio = "";
        }, 10);
      }
    },
    onPlanPressureA(index) {
      if (this.plan.planPressureA.radio == index) {
        setTimeout(() => {
          this.plan.planPressureA.radio = "";
        }, 10);
      }
    },
    onPlanPressureB(index) {
      if (this.plan.planPressureB.radio == index) {
        setTimeout(() => {
          this.plan.planPressureB.radio = "";
        }, 10);
      }
    },
    onPlanPressureC(index) {
      if (this.plan.planPressureC.radio == index) {
        setTimeout(() => {
          this.plan.planPressureC.radio = "";
        }, 10);
      }
    },
    onPlanPressureD(index) {
      if (this.plan.planPressureD.radio == index) {
        setTimeout(() => {
          this.plan.planPressureD.radio = "";
        }, 10);
      }
    },
    onPlanNursingA(index) {
      if (this.plan.planNursingA.radio == index) {
        setTimeout(() => {
          this.plan.planNursingA.radio = "";
        }, 10);
      }
    },
    onPlanNursingB(index) {
      if (this.plan.planNursingB.radio == index) {
        setTimeout(() => {
          this.plan.planNursingB.radio = "";
        }, 10);
      }
    },
    onPlanNursingC(index) {
      if (this.plan.planNursingC.radio == index) {
        setTimeout(() => {
          this.plan.planNursingC.radio = "";
        }, 10);
      }
    },
    onPlanNutritionA(index) {
      if (this.plan.planNutritionA.radio == index) {
        setTimeout(() => {
          this.plan.planNutritionA.radio = "";
        }, 10);
      }
    },
    onPlanNutritionB(index) {
      if (this.plan.planNutritionB.radio == index) {
        setTimeout(() => {
          this.plan.planNutritionB.radio = "";
        }, 10);
      }
    },
    onPlanNutritionC(index) {
      if (this.plan.planNutritionC.radio == index) {
        setTimeout(() => {
          this.plan.planNutritionC.radio = "";
        }, 10);
      }
    },

    onPlanNutritionD(index) {
      if (this.plan.planNutritionD.radio == index) {
        setTimeout(() => {
          this.plan.planNutritionD.radio = "";
        }, 10);
      }
    },
    onPlanNutritionE(index) {
      if (this.plan.planNutritionE.radio == index) {
        setTimeout(() => {
          this.plan.planNutritionE.radio = "";
        }, 10);
      }
    },
    onPlanImpactA(index) {
      if (this.plan.planImpactA.radio == index) {
        setTimeout(() => {
          this.plan.planImpactA.radio = "";
        }, 10);
      }
    },
    onPlanImpactB(index) {
      if (this.plan.planImpactB.radio == index) {
        setTimeout(() => {
          this.plan.planImpactB.radio = "";
        }, 10);
      }
    },
    onPlanGuideA(index) {
      if (this.plan.planGuideA.radio == index) {
        setTimeout(() => {
          this.plan.planGuideA.radio = "";
        }, 10);
      }
    },
    onPlanGuideB(index) {
      if (this.plan.planGuideB.radio == index) {
        setTimeout(() => {
          this.plan.planGuideB.radio = "";
        }, 10);
      }
    },
    onRiskPlan(index) {
      if (this.plan.riskPlan == index) {
        setTimeout(() => {
          this.plan.riskPlan = "";
        }, 10);
      }
    },
    //更改发生日
    changeHappenedDate(e) {
      this.plan.happenedDate = e;
      let oldObj = JSON.parse(localStorage.getItem("oldInfo"));
      oldObj.happenedDate = e;
      localStorage.setItem("oldInfo", JSON.stringify(oldObj));
    } ,
    // 月次功能

    async selectGetDateById(){
    
      console.log(this.occurrenceYear);
   
      try{
      let res = await getDateById({
          oldManId:this.oldId , 
          type:18 ,
          year:this.occurrenceYear
        });
        if(res.code == 0){
          this.occurrenceDayList =  res.data.map((item , index)=>{
              return {value:item.date}   
          });

          console.log(this.occurrenceDayList);
          if(this.occurrenceDayList.length > 0){
            this.occurrenceDay =  this.occurrenceDayList[0].value;  
            this.plan.createDate = this.occurrenceDayList[0].value; 
            this.onGet();
            console.log("进来");
          }else{
            setTimeout(()=>{
            this.plan.createDate = format(new Date(), "YYYY-MM-DD");
            } , 10)
            this.occurrenceDay = "";
          }
        }
      }catch(err){
        console.log(err);
          this.$Notice.error({
                      title: this.$t("global.reminder"),
                      desc:  this.$t("global.loadFail"),
                    });

      }
     


      },
      onGetYear(e){
            this.occurrenceYear = e;
            this.selectGetDateById();
      } ,
      onWith(e){
        this.plan.createDate = e;
        this.onGet();
      }
  },

  async created() {
    let oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
    this.oldId = oldInfo.oldId;
    let year = new Date().getFullYear();

    this.plan.createDate  = format(new Date(), "YYYY-MM-DD");

    this.selectGetDateById();
    this.oSharenOldInfo();
  }
};
</script>

<style lang="less" scoped>
.care-plan {
  font-size: 0.14rem /* 14/102 */;

  table td {
    padding: 0 0.03rem /* 3/102 */;
  }

  .head {
    background: var(--table-bg);
    color: #fff;
  }

  input {
    margin: 0 0.03rem /* 3/102 */;
    border: 0;
    outline: none;
    max-width: 0.98rem /* 100/102 */;
  }

  .date {
    width: 0.39rem /* 40/102 */ !important;
    text-align: right;
  }

  .plan-title {
    text-align: left;
    font-size: 0.18rem /* 18/102 */;
    line-height: 0.55rem /* 56/102 */;
    padding: 0 0.26rem /* 27/102 */;
    // background: linear-gradient(90deg, #63af1e,#63af1e,#fff);
    color: #fff;
    margin: 0.25rem /* 25/102 */ 0;
  }
  .plan-table {
    width: 100%;
    line-height: 0.49rem /* 50/102 */;
    margin-bottom: 0.2rem /* 20/102 */;
    border-color: var(--border-color);
    font-size: 0.16rem /* 16/102 */;
    border-radius: 5px;
    overflow: hidden;
    .sex label:first-child {
      margin-right: 0.29rem /* 30/102 */;
    }
    span {
      margin: 0 0.29rem /* 30/102 */;
    }
  } // .plan-table end

  .plan-info {
    margin-bottom: 0.2rem /* 20/102 */;
    span {
      margin: 0 0.39rem /* 40/102 */;
    }
  }

  .plan-license {
    display: block;
    text-align: left;
    margin-bottom: 0.2rem /* 20/102 */;
  }
  .plan-footer {
    width: 100%;
    line-height: 0.49rem /* 50/102 */;
    margin-bottom: 0.2rem /* 20/102 */;
    border-color: var(--border-color);
    border-radius: 5px;
    overflow: hidden;
    input[type="text"] {
      width: 0.98rem /* 100/102 */;
    }
  }
  .table {
    width: 100%;
    .sex label:first-child {
      margin-right: 0.39rem /* 40/102 */;
    }
    .info-list {
      line-height: 0.39rem /* 40/102 */;
      text-align: left;
      padding-left: 0.1rem /* 10/102 */;
    }
  }
  .head-bg {
    line-height: 0.49rem /* 50/102 */;
  }
} // .care-plan end
</style>
<style>
.newfont > textarea{
      font-size: 0.14rem;
}
</style>