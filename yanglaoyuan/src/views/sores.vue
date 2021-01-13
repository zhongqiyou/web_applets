<template>
  <div>
    <div class="trip-title">{{$t( 'evaluate.tabList.mobileTrauma')}}</div>
    <table
    v-if="tabIndex == 2"
      class="table new-table new-table-padding"
      cellspacing="0"
      cellpadding="0"
      border="1"
      width="100%"
      style="margin-top: 0.2rem;"
    >
      <tr>
        <td
          class="head-bg"
          rowspan="14"
          style="width: 0.5rem;"
        >{{$t('evaluate.mobileTrauma.mobile')}}</td>
        <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.appliancesUse')}}</td>
        <td colspan="9">
          <RadioGroup v-model="old_move.moveTool.bool">
            <!-- <label><input type="radio" value="0" @click="onmoveToolNull" v-model="old_move.moveTool.bool" class="radio-middle" />{{$t('evaluate.mobileTrauma.helpBar')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onmoveToolNull" v-model="old_move.moveTool.bool" class="radio-middle" />{{$t('evaluate.foodMedicine.other')}}</label> -->
           <Radio  label="0" @mouseup.native="onmoveToolNull('0')">{{$t('evaluate.mobileTrauma.helpBar')}}</Radio>
           <Radio  label="1" @mouseup.native="onmoveToolNull('1')">{{$t('evaluate.foodMedicine.other')}}</Radio>
           [<Input
              type="textarea"
              autosize
              v-model="old_move.moveTool.content"
              class="new-width-input special"
              style="width: 30%;"
            />]
          </RadioGroup>
        </td>
        <td colspan="6" class="head-bg">{{$t('evaluate.foodMedicine.subject')}}</td>
      </tr>
      <tr>
        <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.transformation')}}</td>
        <td colspan="9">
          <RadioGroup v-model="old_move.moveTransform.bool">
            <!-- <label><input type="radio" value="0" @click="onmoveTransformNull" v-model="old_move.moveTransform.bool" class="radio-middle"/>{{$t('evaluate.foodMedicine.no')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onmoveTransformNull" v-model="old_move.moveTransform.bool" class="radio-middle"/>{{$t('evaluate.foodMedicine.have')}}</label>[ -->
           <Radio  label="0" @mouseup.native="onmoveTransformNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
           <Radio  label="1" @mouseup.native="onmoveTransformNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
           [<Input
              type="textarea" autosize
              v-model="old_move.moveTransform.content"
              class="new-width-input special"
              style="width: 20%;"
              maxlength="4"
            />
            {{$t('evaluate.mobileTrauma.everyTime')}}]
          </RadioGroup>
        </td>
        <td colspan="6" rowspan="4">
          <i-input
            type="textarea"
            autosize
            class="special"
            v-model="old_move.moveSpeSubA"
            :placeholder="$t('evaluate.foodMedicine.enter')"
          ></i-input>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.inductionPad')}}</td>
        <td colspan="9">
          <RadioGroup v-model="old_move.moveReaction">
            <!-- <label><input type="radio" value="0" @click="onmoveReactionNull" v-model="old_move.moveReaction" class="radio-middle"/>{{$t('evaluate.mobileTrauma.standUp')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onmoveReactionNull" v-model="old_move.moveReaction" class="radio-middle"/>{{$t('evaluate.mobileTrauma.getUP')}}</label>
            <label class="label-margin-left"><input type="radio" value="2" @click="onmoveReactionNull" v-model="old_move.moveReaction" class="radio-middle"/>{{$t('evaluate.mobileTrauma.unused')}}</label> -->
           <Radio  label="0" @mouseup.native="onmoveReactionNull('0')">{{$t('evaluate.mobileTrauma.standUp')}}</Radio>
           <Radio  label="1" @mouseup.native="onmoveReactionNull('1')">{{$t('evaluate.mobileTrauma.getUP')}}</Radio>
           <Radio  label="2" @mouseup.native="onmoveReactionNull('2')">{{$t('evaluate.mobileTrauma.unused')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.methodMoving')}}</td>
        <td colspan="9">
          <RadioGroup v-model="old_move.moveMeans">
            <!-- <label><input type="radio" value="0" @click="onmoveMeansNull" v-model="old_move.moveMeans" class="radio-middle"/>{{$t('evaluate.mobileTrauma.walk')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onmoveMeansNull" v-model="old_move.moveMeans" class="radio-middle"/>{{$t('evaluate.mobileTrauma.wheelchairSelf')}}</label>
            <br/>
            <label><input type="radio" value="2" @click="onmoveMeansNull" v-model="old_move.moveMeans" class="radio-middle"/>{{$t('evaluate.mobileTrauma.wheelchairAssisted')}}</label>
            <label class="label-margin-left"><input type="radio" value="3" @click="onmoveMeansNull" v-model="old_move.moveMeans" class="radio-middle"/>{{$t('evaluate.mobileTrauma.chairReclining')}}</label>
            <label class="label-margin-left"><input type="radio" value="4" @click="onmoveMeansNull" v-model="old_move.moveMeans" class="radio-middle"/>{{$t('evaluate.mobileTrauma.stretcher')}}</label> -->
           <Radio  label="0" @mouseup.native="onmoveMeansNull('0')">{{$t('evaluate.mobileTrauma.walk')}}</Radio>
           <Radio  label="1" @mouseup.native="onmoveMeansNull('1')">{{$t('evaluate.mobileTrauma.wheelchairSelf')}}</Radio>
           <Radio  label="2" @mouseup.native="onmoveMeansNull('2')">{{$t('evaluate.mobileTrauma.wheelchairAssisted')}}</Radio>
           <Radio  label="3" @mouseup.native="onmoveMeansNull('3')">{{$t('evaluate.mobileTrauma.chairReclining')}}</Radio>
           <Radio  label="4" @mouseup.native="onmoveMeansNull('4')">{{$t('evaluate.mobileTrauma.stretcher')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.assistantMobile')}}</td>
        <td colspan="9">
          <RadioGroup v-model="old_move.moveAssist">
            <!-- <label><input type="radio" value="0" @click="onmoveAssistNull" v-model="old_move.moveAssist" class="radio-middle"/>{{$t('evaluate.mobileTrauma.none')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onmoveAssistNull" v-model="old_move.moveAssist" class="radio-middle"/>{{$t('evaluate.mobileTrauma.crutch')}}</label>
            <label class="label-margin-left"><input type="radio" value="2" @click="onmoveAssistNull" v-model="old_move.moveAssist" class="radio-middle"/>{{$t('evaluate.mobileTrauma.caneMulti')}}</label>
            <label class="label-margin-left"><input type="radio" value="3" @click="onmoveAssistNull" v-model="old_move.moveAssist" class="radio-middle"/>{{$t('evaluate.mobileTrauma.chairReclining')}}</label>
             <br/>
            <label><input type="radio" value="4" @click="onmoveAssistNull" v-model="old_move.moveAssist" class="radio-middle"/>{{$t('evaluate.mobileTrauma.walkersF')}}</label>
            <label class="label-margin-left"><input type="radio" value="5" @click="onmoveAssistNull" v-model="old_move.moveAssist" class="radio-middle"/>{{$t('evaluate.mobileTrauma.walkingU')}}</label>
            <label class="label-margin-left"><input type="radio" value="6" @click="onmoveAssistNull" v-model="old_move.moveAssist" class="radio-middle"/>{{$t('evaluate.mobileTrauma.walkerForearm')}}</label>
            <label class="label-margin-left"><input type="radio" value="7" @click="onmoveAssistNull" v-model="old_move.moveAssist" class="radio-middle"/>{{$t('evaluate.mobileTrauma.wheelchair')}}</label> -->
        
           <Radio  label="0" @mouseup.native="onmoveAssistNull('0')">{{$t('evaluate.mobileTrauma.none')}}</Radio>
           <Radio  label="1" @mouseup.native="onmoveAssistNull('1')">{{$t('evaluate.mobileTrauma.crutch')}}</Radio>
           <Radio  label="2" @mouseup.native="onmoveAssistNull('2')">{{$t('evaluate.mobileTrauma.caneMulti')}}</Radio>
           <Radio  label="3" @mouseup.native="onmoveAssistNull('3')">{{$t('evaluate.mobileTrauma.chairReclining')}}</Radio>
           <Radio  label="4" @mouseup.native="onmoveAssistNull('4')">{{$t('evaluate.mobileTrauma.walkersF')}}</Radio>
           <Radio  label="5" @mouseup.native="onmoveAssistNull('5')">{{$t('evaluate.mobileTrauma.walkingU')}}</Radio>
           <Radio  label="6" @mouseup.native="onmoveAssistNull('6')">{{$t('evaluate.mobileTrauma.walkerForearm')}}</Radio>
           <Radio  label="7" @mouseup.native="onmoveAssistNull('7')">{{$t('evaluate.mobileTrauma.wheelchair')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td rowspan="2" colspan="1" class="head-bg">1</td>
        <td colspan="9" class="head-bg">{{$t('evaluate.mobileTrauma.actionsBasic')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.transfer')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.mobile')}}</td>
        <td colspan="5" class="head-bg">{{$t('evaluate.mobileTrauma.goBedAction')}}</td>
        <td colspan="2" class="head-bg">{{$t('evaluate.foodMedicine.subject')}}</td>
      </tr>
      <tr>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.overTurn')}}</td>
        <td colspan="4" class="head-bg">{{$t('evaluate.mobileTrauma.getUP')}}</td>
        <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.standUp')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.standingHold')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.transfer')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.mobile')}}</td>
        <td colspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.restBed')}}</td>
        <td colspan="2" class="head-bg">{{$t('evaluate.mobileTrauma.beddingOrganize')}}</td>
        <td colspan="2" rowspan="5">
          <i-input
            type="textarea"
            autosize
            v-model="old_move.moveSpeSubB"
            class="special"
            :placeholder="$t('evaluate.foodMedicine.enter')"
            style="min-width:0.3rem;"
          ></i-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" class="head-bg">{{$t('evaluate.foodMedicine.statusQuo')}}</td>
        <td colspan="1">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveSituation.content1"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="4">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveSituation.content2"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="3">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveSituation.content3"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="1">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveSituation.content4"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="1">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveSituation.content5"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="1">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveSituation.content6"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="3">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveSituation.content7"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="2">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveSituation.content8"
            class="new-width-input special"
            style="width: 100%;"
          />
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
        <!-- <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.lieDown')}}</td> -->
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.sitting')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.lieDown')}}</td>

        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.feetLift')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.postureAdjust')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.quiltLift')}}</td>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.quiltCover')}}</td>
      </tr>
      <tr>
        <td colspan="1" class="head-bg">{{$t('evaluate.mobileTrauma.assessmentAction')}}</td>
        <td colspan="1">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveAssess.content1"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="4">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveAssess.content2"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="3">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveAssess.content3"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="1">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveAssess.content4"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="1">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveAssess.content5"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="1">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveAssess.content6"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="3">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveAssess.content7"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="2">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveAssess.content8"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
      </tr>
      <tr>
        <td colspan="1" class="head-bg">{{$t('evaluate.foodMedicine.prospect')}}</td>
        <td colspan="1">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveExpect.content1"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="4">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveExpect.content2"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="3">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveExpect.content3"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="1">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveExpect.content4"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="1">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveExpect.content5"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="1">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveExpect.content6"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="3">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveExpect.content7"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
        <td colspan="2">
          <Input
            type="textarea"
            autosize
            v-model="old_move.moveExpect.content8"
            class="new-width-input special"
            style="width: 100%;"
          />
        </td>
      </tr>
      <tr>
        <td colspan="6" class="head-bg">{{$t('evaluate.mobileTrauma.mobility')}}（TUG）</td>
        <td colspan="9">
          <Input
            type="text"
            class="new-width-input special"
            v-model="old_move.moveAbility"
            style="width: 20%;"
            maxlength="5"
          />
          {{$t('evaluate.new.second')}}
        </td>
        <td colspan="4" class="head-bg">{{$t('evaluate.mobileTrauma.mattersSpecial')}}</td>
      </tr>
      <tr>
        <td colspan="6" class="head-bg">{{$t('evaluate.mobileTrauma.groundWalking')}}</td>
        <td colspan="9">
          <RadioGroup v-model="old_move.moveHorizon">
             <!-- <label><input type="radio" value="0" @click="onmoveHorizonNull" v-model="old_move.moveHorizon" class="radio-middle"/>{{$t('evaluate.foodMedicine.reliance')}}</label>
             <label class="label-margin-left"><input type="radio" value="1" @click="onmoveHorizonNull" v-model="old_move.moveHorizon" class="radio-middle"/>{{$t('evaluate.foodMedicine.guard')}}</label>
             <label class="label-margin-left"><input type="radio" value="2" @click="onmoveHorizonNull" v-model="old_move.moveHorizon" class="radio-middle"/>{{$t('evaluate.foodMedicine.partial')}}</label>
             <label class="label-margin-left"><input type="radio" value="3" @click="onmoveHorizonNull" v-model="old_move.moveHorizon" class="radio-middle"/>{{$t('evaluate.foodMedicine.allAssistance')}}</label>
             <label class="label-margin-left"><input type="radio" value="4" @click="onmoveHorizonNull" v-model="old_move.moveHorizon" class="radio-middle"/>{{$t('evaluate.foodMedicine.implemented')}}</label> -->
           <Radio  label="0" @mouseup.native="onmoveHorizonNull('0')">{{$t('evaluate.foodMedicine.reliance')}}</Radio>
           <Radio  label="1" @mouseup.native="onmoveHorizonNull('1')">{{$t('evaluate.foodMedicine.guard')}}</Radio>
           <Radio  label="2" @mouseup.native="onmoveHorizonNull('2')">{{$t('evaluate.foodMedicine.partial')}}</Radio>
           <Radio  label="3" @mouseup.native="onmoveHorizonNull('3')">{{$t('evaluate.foodMedicine.allAssistance')}}</Radio>
           <Radio  label="4" @mouseup.native="onmoveHorizonNull('4')">{{$t('evaluate.foodMedicine.implemented')}}</Radio>
          </RadioGroup>
        </td>
        <td rowspan="2" colspan="4">
          <i-input
            type="textarea"
            autosize
            class="special"
            v-model="old_move.moveSpeSubC"
            :placeholder="$t('evaluate.foodMedicine.enter')"
          ></i-input>
        </td>
      </tr>
      <tr>
        <td colspan="6" class="head-bg">{{$t('evaluate.mobileTrauma.stairsClimbing')}}</td>
        <td colspan="9">
          <RadioGroup v-model="old_move.moveClimbStairs">
             <!-- <label><input type="radio" value="0" @click="onmoveClimbStairsNull" v-model="old_move.moveClimbStairs"/>{{$t('evaluate.foodMedicine.reliance')}}</label>
             <label class="label-margin-left"><input type="radio" value="1" @click="onmoveClimbStairsNull" v-model="old_move.moveClimbStairs"/>{{$t('evaluate.foodMedicine.guard')}}</label>
             <label class="label-margin-left"><input type="radio" value="2" @click="onmoveClimbStairsNull" v-model="old_move.moveClimbStairs"/>{{$t('evaluate.foodMedicine.partial')}}</label>
             <label class="label-margin-left"><input type="radio" value="3" @click="onmoveClimbStairsNull" v-model="old_move.moveClimbStairs"/>{{$t('evaluate.foodMedicine.allAssistance')}}</label>
             <label class="label-margin-left"><input type="radio" value="4" @click="onmoveClimbStairsNull" v-model="old_move.moveClimbStairs"/>{{$t('evaluate.foodMedicine.implemented')}}</label> -->
           <Radio  label="0" @mouseup.native="onmoveClimbStairsNull('0')">{{$t('evaluate.foodMedicine.reliance')}}</Radio>
           <Radio  label="1" @mouseup.native="onmoveClimbStairsNull('1')">{{$t('evaluate.foodMedicine.guard')}}</Radio>
           <Radio  label="2" @mouseup.native="onmoveClimbStairsNull('2')">{{$t('evaluate.foodMedicine.partial')}}</Radio>
           <Radio  label="3" @mouseup.native="onmoveClimbStairsNull('3')">{{$t('evaluate.foodMedicine.allAssistance')}}</Radio>
           <Radio  label="4" @mouseup.native="onmoveClimbStairsNull('4')">{{$t('evaluate.foodMedicine.implemented')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
    </table>

    <table
        v-if="tabIndex == 2"
      class="table new-table"
      cellspacing="0"
      cellpadding="0"
      border="1"
      width="100%"
      style="margin-top: 0.2rem;overflow:auto;"
    >
      <tr>
        <td
          class="head-bg"
          rowspan="16"
          style="width: .5rem;"
        >{{$t('evaluate.bathingChanging.factors')}}</td>
        <td class="head-bg" colspan="3">{{$t('evaluate.bathingChanging.ulcer')}}</td>
        <td colspan="3">
          <RadioGroup v-model="old_move.bedsoreFactor">
            <!-- <label><input type="radio" value="0" @click="onbedsoreFactorNull" v-model="old_move.bedsoreFactor"/>{{$t('evaluate.foodMedicine.have')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onbedsoreFactorNull" v-model="old_move.bedsoreFactor"/>{{$t('evaluate.foodMedicine.no')}}</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreFactorNull('0')">{{$t('evaluate.foodMedicine.have')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreFactorNull('1')">{{$t('evaluate.foodMedicine.no')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">{{$t('evaluate.mobileTrauma.bedsoresOr')}}</td>
        <td>
          <RadioGroup v-model="old_move.bedsoreExist">
            <!-- <label><input type="radio" value="0" @click="onbedsoreExistNull" v-model="old_move.bedsoreExist" class="radio-middle"/>{{$t('evaluate.foodMedicine.have')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onbedsoreExistNull" v-model="old_move.bedsoreExist" class="radio-middle"/>{{$t('evaluate.foodMedicine.no')}}</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreExistNull('0')">{{$t('evaluate.foodMedicine.have')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreExistNull('1')">{{$t('evaluate.foodMedicine.no')}}</Radio>
          </RadioGroup>
        </td>
        <td class="head-bg">{{$t('evaluate.mobileTrauma.bedsore')}}</td>
        <td class="dateW" style="white-space: nowrap;">
          <!-- <Input
            type="text"
            v-model="old_move.bedsoreDate[0]"
            class="new-width-input special"
            style="width:0.6rem;"
            maxlength="4"
          />
          {{$t('global.year')}}
          <Input
            type="text"
            v-model="old_move.bedsoreDate[1]"
            class="new-width-input special"
            style="width: 0.4rem;"
            maxlength="2"
          />
          {{$t('global.month')}}
          <Input
            type="text"
            v-model="old_move.bedsoreDate[2]"
            class="new-width-input special"
            style="width: 0.4rem;"
            maxlength="2"
          />
          {{$t('global.day')}}-->
          <Col span="12">
            <DatePicker
            class="new-width-input-date"
              type="date"
              :editable="false"
              :value="old_move.bedsoreDate"
              placeholder="Select date"
              style="width:1.5rem;"
              @on-change="old_move.bedsoreDate = $event"
            ></DatePicker>
          </Col>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">{{$t('evaluate.mobileTrauma.now')}}</td>
        <td colspan="3">
          <RadioGroup v-model="old_move.bedsoreNow.bool">
             <!-- <label><input type="radio" @click="onbedsoreNowNull" value="0" v-model="old_move.bedsoreNow.bool" class="radio-middle"/>{{$t('evaluate.foodMedicine.no')}}</label>
             <label class="label-margin-left"><input type="radio" @click="onbedsoreNowNull" value="1" v-model="old_move.bedsoreNow.bool" class="radio-middle"/>{{$t('evaluate.bathingChanging.sacrum')}}</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreNowNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreNowNull('1')">{{$t('evaluate.bathingChanging.sacrum')}}</Radio>
           ( <Input
              type="textarea" autosize
              v-model="old_move.bedsoreNow.content"
              class="new-width-input special"
              style="width: 20%;"
            />)
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">{{$t('evaluate.mobileTrauma.past')}}</td>
        <td colspan="3">
          <RadioGroup v-model="old_move.bedsorePast.bool">
             <!-- <label><input type="radio" @click="onbedsorePastNull" value="0" v-model="old_move.bedsorePast.bool" class="radio-middle"/>{{$t('evaluate.foodMedicine.no')}}</label>
             <label class="label-margin-left"><input type="radio" @click="onbedsorePastNull" value="1" v-model="old_move.bedsorePast.bool" class="radio-middle"/>{{$t('evaluate.bathingChanging.sacrum')}}</label> -->
           <Radio  label="0" @mouseup.native="onbedsorePastNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsorePastNull('1')">{{$t('evaluate.bathingChanging.sacrum')}}</Radio>
           (<Input
              type="textarea" autosize
              v-model="old_move.bedsorePast.content"
              class="new-width-input special"
              style="width: 20%;"
            />)
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">{{$t('evaluate.mobileTrauma.independenceDaily')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreStatus">
            <!-- <label><input type="radio" value="J1" @click="onbedsoreStatusNull" v-model="old_move.bedsoreStatus"/>J1</label>
            <label class="label-margin-left"><input type="radio" value="J2" @click="onbedsoreStatusNull" v-model="old_move.bedsoreStatus"/>J2</label>
            <label class="label-margin-left"><input type="radio" value="A1" @click="onbedsoreStatusNull" v-model="old_move.bedsoreStatus"/>A1</label>
            <label class="label-margin-left"><input type="radio" value="A2" @click="onbedsoreStatusNull" v-model="old_move.bedsoreStatus"/>A2</label>
            <label class="label-margin-left"><input type="radio" value="B1" @click="onbedsoreStatusNull" v-model="old_move.bedsoreStatus"/>B1</label>
            <label class="label-margin-left"><input type="radio" value="B2" @click="onbedsoreStatusNull" v-model="old_move.bedsoreStatus"/>B2</label>
            <label class="label-margin-left"><input type="radio" value="C1" @click="onbedsoreStatusNull" v-model="old_move.bedsoreStatus"/>C1</label>
            <label class="label-margin-left"><input type="radio" value="C2" @click="onbedsoreStatusNull" v-model="old_move.bedsoreStatus"/>C2</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreStatusNull('0')">J1</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreStatusNull('1')">J2</Radio>
           <Radio  label="2" @mouseup.native="onbedsoreStatusNull('2')">A1</Radio>
           <Radio  label="3" @mouseup.native="onbedsoreStatusNull('3')">A2</Radio>
           <Radio  label="4" @mouseup.native="onbedsoreStatusNull('4')">B1</Radio>
           <Radio  label="5" @mouseup.native="onbedsoreStatusNull('5')">B2</Radio>
           <Radio  label="6" @mouseup.native="onbedsoreStatusNull('6')">C1</Radio>
           <Radio  label="7" @mouseup.native="onbedsoreStatusNull('7')">C2</Radio>
          </RadioGroup>
        </td>
        <td class="head-bg" style="width: 1.5rem;">{{$t('evaluate.mobileTrauma.response')}}</td>
      </tr>
      <tr>
        <td
          class="head-bg"
          rowspan="4"
          style="max-width: 1rem;"
        >{{$t('evaluate.bathingChanging.situation')}}</td>
        <td class="head-bg" colspan="2">{{$t('evaluate.mobileTrauma.bathing')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreBathe">
             <!-- <label><input type="radio" value="0" @click="onbedsoreBatheNull" v-model="old_move.bedsoreBathe" class="radio-middle"/>{{$t('evaluate.mobileTrauma.myselfDoing')}}</label>
             <label class="label-margin-left"><input type="radio" value="1" @click="onbedsoreBatheNull" v-model="old_move.bedsoreBathe" class="radio-middle"/>{{$t('evaluate.bathingChanging.dontIt')}}</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreBatheNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreBatheNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
        <td rowspan="11">
          <p>{{$t('evaluate.mobileTrauma.carePlan')}}</p>
          <h3 style="margin: .8rem 0 .1rem;">{{$t('evaluate.mobileTrauma.decubitusPlan')}}</h3>

          <RadioGroup v-model="old_move.bedsorePolicy">
            <!-- <label><input type="radio" value="0" @click="onbedsorePolicyNull" v-model="old_move.bedsorePolicy" class="radio-middle"/>{{$t('evaluate.foodMedicine.have')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onbedsorePolicyNull" v-model="old_move.bedsorePolicy" class="radio-middle"/>{{$t('evaluate.mobileTrauma.none')}}</label> -->
             <Radio  label="0" @mouseup.native="onbedsorePolicyNull('0')">{{$t('evaluate.foodMedicine.have')}}</Radio>
             <Radio  label="1" @mouseup.native="onbedsorePolicyNull('1')">{{$t('evaluate.mobileTrauma.none')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t('evaluate.bathingChanging.intakeFood')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreAdi">
            <!-- <label><input type="radio" value="0" @click="onbedsoreAdiNull" v-model="old_move.bedsoreAdi" class="radio-middle"/>{{$t('evaluate.mobileTrauma.myselfDoing')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onbedsoreAdiNull" v-model="old_move.bedsoreAdi" class="radio-middle"/>{{$t('evaluate.bathingChanging.dontIt')}}</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreAdiNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreAdiNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="2">{{$t('evaluate.mobileTrauma.dressing')}}</td>
        <td class="head-bg">{{$t('evaluate.bathingChanging.jacket')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreUpper">
            <!-- <label><input type="radio" value="0" @click="onbedsoreUpperNull" v-model="old_move.bedsoreUpper" class="radio-middle" />{{$t('evaluate.mobileTrauma.myselfDoing')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onbedsoreUpperNull" v-model="old_move.bedsoreUpper" class="radio-middle" />{{$t('evaluate.bathingChanging.dontIt')}}</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreUpperNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreUpperNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg">{{$t('evaluate.bathingChanging.garment')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreUnder">
            <!-- <label><input type="radio" value="0" @click="onbedsoreUnderNull" v-model="old_move.bedsoreUnder" class="radio-middle" />{{$t('evaluate.mobileTrauma.myselfDoing')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onbedsoreUnderNull" v-model="old_move.bedsoreUnder" class="radio-middle" />{{$t('evaluate.bathingChanging.dontIt')}}</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreUnderNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreUnderNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="4">{{$t('evaluate.mobileTrauma.actionsBasic')}}</td>
        <td class="head-bg" colspan="2">{{$t('evaluate.mobileTrauma.overTurn')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreTurn">
            <!-- <label><input type="radio" value="0" @click="onbedsoreTurnNull" v-model="old_move.bedsoreTurn" class="radio-middle"/>{{$t('evaluate.mobileTrauma.myselfDoing')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onbedsoreTurnNull" v-model="old_move.bedsoreTurn" class="radio-middle"/>{{$t('evaluate.bathingChanging.dontIt')}}</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreTurnNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreTurnNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t('evaluate.mobileTrauma.keepSitting')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreKeep">
            <!-- <label><input type="radio" value="0" @click="onbedsoreKeepNull" v-model="old_move.bedsoreKeep" class="radio-middle" />{{$t('evaluate.mobileTrauma.myselfDoing')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onbedsoreKeepNull" v-model="old_move.bedsoreKeep" class="radio-middle" />{{$t('evaluate.bathingChanging.dontIt')}}</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreKeepNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreKeepNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t('evaluate.bathingChanging.sitDown')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreSit">
           <!-- <label><input type="radio" value="0" @click="onbedsoreSitNull" v-model="old_move.bedsoreSit" class="radio-middle" />{{$t('evaluate.mobileTrauma.myselfDoing')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onbedsoreSitNull" v-model="old_move.bedsoreSit" class="radio-middle" />{{$t('evaluate.bathingChanging.dontIt')}}</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreSitNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreSitNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t('evaluate.mobileTrauma.keepStanding')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreStand">
             <!-- <label><input type="radio"  value="0" @click="onbedsoreStandNull" v-model="old_move.bedsoreStand" class="radio-middle"/>{{$t('evaluate.mobileTrauma.myselfDoing')}}</label>
             <label class="label-margin-left"><input type="radio"  value="1" @click="onbedsoreStandNull" v-model="old_move.bedsoreStand" class="radio-middle"/>{{$t('evaluate.bathingChanging.dontIt')}}</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreStandNull('0')">{{$t('evaluate.mobileTrauma.myselfDoing')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreStandNull('1')">{{$t('evaluate.bathingChanging.dontIt')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td rowspan="3" class="head-bg">{{$t('evaluate.mobileTrauma.excretionSit')}}</td>
        <td class="head-bg" colspan="2">{{$t('evaluate.mobileTrauma.incontinenceUrinary')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreUracratia">
             <!-- <label ><input type="radio" value="0" @click="onbedsoreUracratiaNull" v-model="old_move.bedsoreUracratia" class="radio-middle"/>{{$t('evaluate.foodMedicine.no')}}</label>
             <label class="label-margin-left"><input type="radio" value="1" @click="onbedsoreUracratiaNull" v-model="old_move.bedsoreUracratia" class="radio-middle"/>{{$t('evaluate.foodMedicine.have')}}</label>
             <label class="label-margin-left"><input type="radio" value="2" @click="onbedsoreUracratiaNull" v-model="old_move.bedsoreUracratia" class="radio-middle"/>{{$t('evaluate.mobileTrauma.targetOut')}}(*2)</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreUracratiaNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreUracratiaNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
           <Radio  label="2" @mouseup.native="onbedsoreUracratiaNull('2')">{{$t('evaluate.mobileTrauma.targetOut')}}(*2)</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t('evaluate.mobileTrauma.incontinence')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreEncopresis">
             <!-- <label><input type="radio" value="0" @click="onbedsoreEncopresisNull"  v-model="old_move.bedsoreEncopresis" class="radio-middle"/>{{$t('evaluate.foodMedicine.no')}}</label>
             <label class="label-margin-left"><input type="radio" value="1" @click="onbedsoreEncopresisNull"  v-model="old_move.bedsoreEncopresis" class="radio-middle"/>{{$t('evaluate.foodMedicine.have')}}</label>
             <label class="label-margin-left"><input type="radio" value="2" @click="onbedsoreEncopresisNull"  v-model="old_move.bedsoreEncopresis" class="radio-middle"/>{{$t('evaluate.mobileTrauma.targetOut')}}(*3)</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreEncopresisNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreEncopresisNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
           <Radio  label="2" @mouseup.native="onbedsoreEncopresisNull('2')">{{$t('evaluate.mobileTrauma.targetOut')}}(*3)</Radio>
          </RadioGroup>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">{{$t('evaluate.bathingChanging.conduit')}}</td>
        <td colspan="2">
          <RadioGroup v-model="old_move.bedsoreCatheter">
             <!-- <label><input type="radio" value="0" @click="onbedsoreCathetersNull" v-model="old_move.bedsoreCatheter" class="radio-middle"/>{{$t('evaluate.foodMedicine.no')}}</label>
             <label class="label-margin-left"><input type="radio" value="1" @click="onbedsoreCathetersNull" v-model="old_move.bedsoreCatheter" class="radio-middle"/>{{$t('evaluate.foodMedicine.have')}}</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreCathetersNull('0')">{{$t('evaluate.foodMedicine.no')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreCathetersNull('1')">{{$t('evaluate.foodMedicine.have')}}</Radio>
          </RadioGroup>
        </td>
      </tr>

      <!-- 要求 （减了一行“名誉状态”，加了两栏）start -->
      <tr>
        <td class="head-bg" colspan="2">{{$t('evaluate.new.Cultivation_state')}}</td>
        <td class="head-bg" colspan="2">BMI（18.6）</td>
        <td colspan="6">
          <RadioGroup v-model="old_move.bedsoreHonor">
            <!-- <label><input type="radio" value="0" @click="onbedsoreHonorNull" v-model="old_move.bedsoreHonor" class="radio-middle"/>{{$t('evaluate.new.High_risk')}}</label>
            <label class="label-margin-left"><input type="radio" value="1" @click="onbedsoreHonorNull" v-model="old_move.bedsoreHonor" class="radio-middle"/>{{$t('evaluate.new.Medium_risk')}}</label>
            <label class="label-margin-left"><input type="radio" value="2" @click="onbedsoreHonorNull" v-model="old_move.bedsoreHonor" class="radio-middle"/>{{$t('evaluate.new.Low_risk')}}</label> -->
           <Radio  label="0" @mouseup.native="onbedsoreHonorNull('0')">{{$t('evaluate.new.High_risk')}}</Radio>
           <Radio  label="1" @mouseup.native="onbedsoreHonorNull('1')">{{$t('evaluate.new.Medium_risk')}}</Radio>
           <Radio  label="2" @mouseup.native="onbedsoreHonorNull('2')">{{$t('evaluate.new.Low_risk')}}</Radio>
          </RadioGroup>
        </td>
      </tr>

      <tr>
        <td class="head-bg" colspan="4">{{$t('evaluate.new.months3')}}</td>
        <td colspan="6">
          <!-- {{old_move.bedsoreHistory}} -->
          <RadioGroup v-model="old_move.bedsoreHistory">
             <!-- <label><input type="radio" value="0" @click="onbedsoreHistoryNull" v-model="old_move.bedsoreHistory" class="radio-middle" />{{$t('evaluate.new.No')}}</label>
             <label class="label-margin-left"><input type="radio" value="1" @click="onbedsoreHistoryNull" v-model="old_move.bedsoreHistory" class="radio-middle" />{{$t('evaluate.new.Yes')}}</label> -->
            <Radio  label="0" @mouseup.native="onbedsoreHistoryNull('0')">{{$t('evaluate.new.No')}}</Radio>
            <Radio  label="1" @mouseup.native="onbedsoreHistoryNull('1')">{{$t('evaluate.new.Yes')}}</Radio>
          </RadioGroup>
        </td>
      </tr>
      <!-- 要求 （减了一行“名誉状态”，加了两栏）end -->
    </table>

    <div class="tip_text" v-if="tabIndex == 2">
      <span>※１．{{$t('evaluate.mobileTrauma.nutrition')}}</span>
      <span>※2．{{$t('evaluate.mobileTrauma.nutrition2')}}</span>
      <span>※3．{{$t('evaluate.mobileTrauma.nutrition3')}}</span>
    </div>
    <div class="table-submit">
      <button @click="onInsert">
        <i class="iconfont icon-baocun"></i>
        {{$t('global.submit')}}
      </button>
      <!-- <button @click="onUpdate">
        <i class="iconfont icon-submit"></i> update
      </button>-->
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
} from "../network/every";

import Vue from "vue";
import { LoadingBar } from 'view-design';

export default {
  data() {
    return {
        cancelIndex:0,
        oldId:"" ,
      //移动&褥瘡危険因子の評価(data)
        old_move: {
        // 选框start
        moveTool: {bool:""},
        moveTransform: {bool:""},
        moveReaction:"" ,
        moveMeans:"" ,
        moveAssist:"" ,
        moveHorizon:"" ,
        moveClimbStairs:"" ,
        bedsoreFactor:"" ,
        bedsoreExist:"" ,
        bedsoreNow: {bool:""},
        bedsorePast: {bool:""},
        bedsoreStatus:"" ,
        bedsoreBathe:"" ,
        bedsorePolicy:"" ,
        bedsoreAdi:"" ,
        bedsoreUpper:"" ,
        bedsoreUnder:"" ,
        bedsoreTurn:"" ,
        bedsoreKeep:"" ,
        bedsoreSit:"" ,
        bedsoreStand:"" ,
        bedsoreUracratia:"" ,
        bedsoreEncopresis:"" ,
        bedsoreCatheter:"" ,
        bedsoreHonor:"" ,
        bedsoreHistory:"" ,
        // 选框end
        moveSituation: {},
        moveAssess: {},
        moveExpect: {},
        // bedsoreDate: [],
      
      
        oldManId: 2,
        id: "",
        assessmentInfoId: 0,
      },
      happen_year: "",
      happen_month: "",
      happen_day: "",
      whether: "",
    };
  },

  methods: {
    // 单选双击取消事件
    // --------------
    onTimeCancel(){
      this.cancelIndex += 1;
      let timmer = setTimeout(res => {
        this.cancelIndex = 1;
        clearTimeout(timmer);
      }, 300);

      if (this.cancelIndex <= 2) {
         return false;
      }else{
          return true;
      }
    } ,
    // --------------
    onmoveToolNull(index) {
      if(this.old_move.moveTool.bool == index){
         setTimeout(()=>{
            this.old_move.moveTool.bool = "";
        },10)
      }
      // if(!this.onTimeCancel()) return;
      //  this.old_move.moveTool.bool = "";
    },
    onmoveTransformNull(index) {
       if(this.old_move.moveTransform.bool == index){
         setTimeout(()=>{
          this.old_move.moveTransform.bool = "";
        },10)
       }
      // if(!this.onTimeCancel()) return;
      // this.old_move.moveTransform.bool = "";
    },
    onmoveReactionNull(index) {
        if(this.old_move.moveReaction == index){
         setTimeout(()=>{
        this.old_move.moveReaction = "";
        },10)
       }
      // if(!this.onTimeCancel()) return;
      // this.old_move.moveReaction = "";
    },
    onmoveMeansNull(index) {
       if( this.old_move.moveMeans == index){
         setTimeout(()=>{
         this.old_move.moveMeans = "";
        },10)
       }
      // if(!this.onTimeCancel()) return;
      // this.old_move.moveMeans = "";
    },
    onmoveAssistNull(index) {
      if(this.old_move.moveAssist == index){
         setTimeout(()=>{
        this.old_move.moveAssist = "";
        },10)
       }
      // if(!this.onTimeCancel()) return;
      // this.old_move.moveAssist = "";
    },
    onmoveHorizonNull(index) {
       if(this.old_move.moveHorizon  == index){
         setTimeout(()=>{
       this.old_move.moveHorizon = "";
        },10)
       }
      // if(!this.onTimeCancel()) return;
      // this.old_move.moveHorizon = "";
    },
    onmoveClimbStairsNull(index) {
      if(this.old_move.moveClimbStairs  == index){
         setTimeout(()=>{
       this.old_move.moveClimbStairs = "";
        },10)
       }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.moveClimbStairs = "";
    },
    onbedsoreFactorNull(index) {
      if(this.old_move.bedsoreFactor == index){
         setTimeout(()=>{
        this.old_move.bedsoreFactor= "";
        },10)
       }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreFactor = "";
    },
    onbedsoreExistNull(index) {
      if(this.old_move.bedsoreExist == index){
         setTimeout(()=>{
        this.old_move.bedsoreExist = "";
        },10)
       }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreExist = "";
    },
    onbedsoreNowNull(index) {
        if(this.old_move.bedsoreNow.bool == index){
         setTimeout(()=>{
        this.old_move.bedsoreNow.bool = "";
        },10)
       }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreNow.bool = "";
    },
    onbedsorePastNull(index) {
      if(this.old_move.bedsorePast.bool == index){
         setTimeout(()=>{
        this.old_move.bedsorePast.bool = "";
        },10)
       }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsorePast.bool = "";
    },
    onbedsoreStatusNull(index) {
      if(this.old_move.bedsoreStatus == index){
         setTimeout(()=>{
        this.old_move.bedsoreStatus = "";
        },10)
       }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreStatus = "";
    },
    onbedsoreBatheNull(index) {
      if( this.old_move.bedsoreBathe == index){
         setTimeout(()=>{
         this.old_move.bedsoreBathe = "";
        },10)
       }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreBathe = "";
    },
    onbedsorePolicyNull(index) {
       if(this.old_move.bedsorePolicy == index){
         setTimeout(()=>{
         this.old_move.bedsorePolicy = "";
        },10)
       }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsorePolicy = "";
    },
    onbedsoreAdiNull(index) {
    if(this.old_move.bedsoreAdi == index){
         setTimeout(()=>{
         this.old_move.bedsoreAdi = "";
        },10)
      }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreAdi = "";
    },
    onbedsoreUpperNull(index) {
      if(this.old_move.bedsoreUpper == index){
         setTimeout(()=>{
         this.old_move.bedsoreUpper = "";
        },10)
      }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreUpper = "";
    },
    onbedsoreUnderNull(index) {
      if(this.old_move.bedsoreUnder == index){
         setTimeout(()=>{
         this.old_move.bedsoreUnder = "";
        },10)
      }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreUnder = "";
    },
    onbedsoreTurnNull(index) {
       if(this.old_move.bedsoreTurn == index){
         setTimeout(()=>{
         this.old_move.bedsoreTurn = "";
        },10)
      }
      //  if(!this.onTimeCancel()) return;
      //  this.old_move.bedsoreTurn = "";
    },
    onbedsoreKeepNull(index) {
      if( this.old_move.bedsoreKeep == index){
         setTimeout(()=>{
          this.old_move.bedsoreKeep = "";
        },10)
      }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreKeep = "";
    },
    onbedsoreSitNull(index) {
       if(this.old_move.bedsoreSit == index){
         setTimeout(()=>{
         this.old_move.bedsoreSit = "";
        },10)
      }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreSit = "";
    },
    onbedsoreStandNull(index) {
      if(this.old_move.bedsoreStand == index){
         setTimeout(()=>{
         this.old_move.bedsoreStand = "";
        },10)
      }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreStand = "";
    },
    onbedsoreUracratiaNull(index) {
       if(this.old_move.bedsoreUracratia == index){
         setTimeout(()=>{
         this.old_move.bedsoreUracratia = "";
        },10)
      }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreUracratia = "";
    },
    onbedsoreEncopresisNull(index) {
       if(this.old_move.bedsoreEncopresis == index){
         setTimeout(()=>{
         this.old_move.bedsoreEncopresis = "";
        },10)
      }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreEncopresis = "";
    },
    onbedsoreCathetersNull(index) {
       if(this.old_move.bedsoreCatheter == index){
         setTimeout(()=>{
         this.old_move.bedsoreCatheter = "";
        },10)
      }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreCatheter = "";
    },
    onbedsoreHonorNull(index) {
       if(this.old_move.bedsoreHonor == index){
         setTimeout(()=>{
         this.old_move.bedsoreHonor = "";
        },10)
      }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreHonor = "";
    },
    onbedsoreHistoryNull(index) {
       if(this.old_move.bedsoreHistory == index){
         setTimeout(()=>{
         this.old_move.bedsoreHistory = "";
        },10)
      }
      //  if(!this.onTimeCancel()) return;
      // this.old_move.bedsoreHistory = "";
    },

    async onInsert() {
      //移动+褥瘡危険因子の評価(插入/更新数据)
      this.onSelectMoveAll();
    },
    //移动+褥瘡危険因子の評価
    async onGetSelectMoveAll() {
      let res = await selectMoveListAll({
        oldManId: this.oldId,
      });
      if (res.data.length > 0) {
        this.old_move = res.data[0];

        // this.old_move.bedsoreDate = res.data[0].bedsoreDate.split("-");
        this.old_move.bedsoreNow = JSON.parse(res.data[0].bedsoreNow);
        this.old_move.bedsorePast = JSON.parse(res.data[0].bedsorePast);
        this.old_move.moveAssess = JSON.parse(res.data[0].moveAssess);
        this.old_move.moveExpect = JSON.parse(res.data[0].moveExpect);
        this.old_move.moveSituation = JSON.parse(res.data[0].moveSituation);
        this.old_move.moveTool = JSON.parse(res.data[0].moveTool);
        this.old_move.moveTransform = JSON.parse(res.data[0].moveTransform);

        this.happen_year = this.old_move.bedsoreDate[0];
        this.happen_month = this.old_move.bedsoreDate[1];
        this.happen_day = this.old_move.bedsoreDate[2];
        this.whether = this.old_move.bedsoreExist;
      }
    },
    async onSelectMoveAll() {
      // let timeBedsore = `${this.old_move.bedsoreDate[0]}-${this.old_move.bedsoreDate[1]}-${this.old_move.bedsoreDate[2]}`;
      // if (!timeBedsore.match(/\d{4}-\d{2}-\d{2}/gi)) {
      //   this.$Notice.error({
      //     title: this.$t("worksheet.format"),
      //     desc: this.$t("medicalTable.bulletBox.format"),
      //   });
      //   return;
      // }

      if (
        JSON.stringify(this.old_move.moveTool) == "{}" ||
        JSON.stringify(this.old_move.moveTransform) == "{}" ||
        JSON.stringify(this.old_move.moveSituation) == "{}" ||
        JSON.stringify(this.old_move.moveAssess) == "{}" ||
        JSON.stringify(this.old_move.moveExpect) == "{}" ||
        JSON.stringify(this.old_move.bedsoreNow) == "{}" ||
        JSON.stringify(this.old_move.bedsorePast) == "{}"
      ) {
        this.$Notice.error({
          title: this.$t("worksheet.format"),
          desc: this.$t("evaluate.springBox.empty"),
        });
        return;
      }
      if(this.old_move.bedsoreDate == ""){
         this.$Notice.error({
          title: this.$t("worksheet.format"),
          desc: this.$t("evaluate.springBox.empty"),
        });
        return 
        }

      // 路由跳转

      let newTime = this.old_move.bedsoreDate.split("-");
      this.happen_year = newTime[0];
      this.happen_month = newTime[1];
      this.happen_day = newTime[2];
      this.whether = this.old_move.bedsoreExist;
      if (this.whether === "0") {
        this.goTo(
          `/BedsoreAssess?year=${this.happen_year}&month=${this.happen_month}&day=${this.happen_day}`
        );
      }
       this.old_move.oldManId = this.oldId;
      let objMove = {};
      for (let i in this.old_move) {
        Vue.set(objMove, i, this.old_move[i]);
      }
      // objMove.bedsoreDate =
      //   this.old_move.bedsoreDate[0] +
      //   "-" +
      //   this.old_move.bedsoreDate[1] +
      //   "-" +
      //   this.old_move.bedsoreDate[2];
      objMove.bedsoreNow = JSON.stringify(this.old_move.bedsoreNow);
      objMove.bedsorePast = JSON.stringify(this.old_move.bedsorePast);
      objMove.moveAssess = JSON.stringify(this.old_move.moveAssess);
      objMove.moveExpect = JSON.stringify(this.old_move.moveExpect);
      objMove.moveSituation = JSON.stringify(this.old_move.moveSituation);
      objMove.moveTool = JSON.stringify(this.old_move.moveTool);
      objMove.moveTransform = JSON.stringify(this.old_move.moveTransform);
      console.log(objMove);
      console.log(this.old_move);
    
      if (this.old_move.id == "") {
        let res = await insertMoveSave(objMove);
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
        console.log("数据插入");
        this.onGetSelectMoveAll();
      } else {
        let result = await updateMove(objMove);
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
        console.log("数据更新");
        this.onGetSelectMoveAll();
      }
    },
  },
  async created() {
     let oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
     this.oldId = oldInfo.oldId;
    //移动+褥瘡危険因子の評価(获取数据)
    this.onGetSelectMoveAll();
    console.log("发生日：" ,this.old_move.bedsoreDate);
  },
};
</script>

<style lang="less" scoped>
.radio-middle{
vertical-align:middle;
}
.label-margin-left{
  margin-left: 0.1rem;
}
.space {
  margin-right: 0.3rem;
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
</style>

<style>
.new-width-input > input {
  max-width: 10rem !important;
  font-size: 0.14rem;
}

.new-min-width-input > input {
  min-width: 0.4rem;
}

.new-width-input-date>.ivu-date-picker-rel>.ivu-input-wrapper>input{
  text-align: center;
  font-size: 0.14rem;
}
</style>

<style lang="less">
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
.dateD_width .ivu-input {
}
.sheet {
  padding: 0 25px 0 15px;
}

.table {
  font-size: 0.14rem /* 14/102 */;
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
  margin: 0 0.2rem /* 20/102 */;
}

.date {
  padding: 0.1rem 0 !important;

  input {
    width: 0.31rem /* 32/102 */;
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
  font-size: 0.18rem /* 18/102 */;
  line-height: 0.55rem /* 56/102 */;
  padding: 0 0.26rem /* 27/102 */;
  background: linear-gradient(90deg, #63af1e, #63af1e, #fff);
  color: #fff;
  margin: 0.25rem /* 25/102 */ 0;
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

.food > tr > td {
  height: 0.37rem;
}

.food > tr > th {
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
</style>