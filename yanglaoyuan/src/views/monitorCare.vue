<template>
  <div class="sheet">
    <div class="sheetTitle">监测看护(护理)</div>
    <table class="table monitorTable" border="1px" cellspacing="1" cellpadding="0">
      <tr>
        <td colspan="2" class="head-bg">生活各方面要解决的问题(需求)</td>
        <td colspan="3">
          <input type="text" class="bd" />
        </td>
        <td colspan="1" class="head-bg">利用者名</td>
        <td colspan="2">
          <input type="text" class="bd" />
        </td>
      </tr>
      <tr>
        <td colspan="1" class="head-bg">长期目标</td>
        <td colspan="2">城山苑</td>
        <td colspan="1" class="head-bg">配方员</td>
        <td colspan="1">护理支持专家</td>
        <td colspan="1" class="head-bg">配方日期</td>
        <td colspan="2">
          <input type="text" class="bd years" />年
          <input type="text" class="bd years" />月
          <input type="text" class="bd years" />日
        </td>
      </tr>
    </table>
    <table class="table sheetTable" border="1px" cellspacing="1" cellpadding="0">
      <tr>
        <td class="head-bg" colspan="1">短期目标</td>
        <td colspan="4" class="head-bg">服务实施内容(期间)</td>
      </tr>
      <tr>
        <td colspan="1">
          <textarea></textarea>
        </td>
        <td colspan="4">
          <textarea></textarea>
        </td>
      </tr>
      <tr>
        <td colspan="5" style="text-align:left">1期：执行期间</td>
      </tr>
      <tr>
        <td colspan="5">
          <div class="credit">
            <div>护士计入栏</div>
            <div>护理支援专家输入栏</div>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="1">执行状况</td>
        <td colspan="1">本人、专属满意度</td>
        <td colspan="1">新课题</td>
        <td colspan="1">目标达成度</td>
        <td colspan="1">之后的方针</td>
      </tr>
      <tr>
        <td class="daLeft" colspan="1">
          <CheckboxGroup class="cell">
            <Checkbox label="按计划执行"></Checkbox>
            <Checkbox label="基本上按照计划"></Checkbox>
            <Checkbox label="不怎么实施"></Checkbox>
            <Checkbox label="不怎么实施"></Checkbox>
            <Checkbox label="未执行"></Checkbox>
          </CheckboxGroup>
        </td>
        <td class="daLeft" colspan="1">
          <CheckboxGroup class="cell">
            <Checkbox label="满意"></Checkbox>
            <Checkbox label="基本满意"></Checkbox>
            <Checkbox label="有一点不满意"></Checkbox>
            <Checkbox label="不满意"></Checkbox>
          </CheckboxGroup>
        </td>
        <td class="daLeft" colspan="1">
          <CheckboxGroup class="cell">
            <Checkbox label="有"></Checkbox>
            <Checkbox label="没有特别的"></Checkbox>
          </CheckboxGroup>
        </td>
        <td class="daLeft">
          <CheckboxGroup class="cell">
            <Checkbox label="已经达成"></Checkbox>
            <Checkbox label="基本达成"></Checkbox>
            <Checkbox label="未达成"></Checkbox>
          </CheckboxGroup>
        </td>
        <td class="daLeft" colspan="1">
          <CheckboxGroup class="cell">
            <Checkbox label="继续"></Checkbox>
            <Checkbox label="变更"></Checkbox>
            <Checkbox label="终止·中止"></Checkbox>
          </CheckboxGroup>
        </td>
      </tr>
      <tr>
        <td colspan="5">
          <textarea placeholder="评价："></textarea>

          <div>
            <span>护理/姓名：</span>
            <input type="text" class="bd" />
            <span>护理/姓名：</span>
            <input type="text" class="bd" />
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="5" style="text-align:left">2期：执行期间</td>
      </tr>
      <tr>
        <td colspan="5">
          <div class="credit">
            <div>护士计入栏</div>
            <div>护理支援专家输入栏</div>
          </div>
        </td>
      </tr>
     <tr>
        <td colspan="1">执行状况</td>
        <td colspan="1">本人、专属满意度</td>
        <td colspan="1">新课题</td>
        <td colspan="1">目标达成度</td>
        <td colspan="1">之后的方针</td>
      </tr>
      <tr>
        <td class="daLeft" colspan="1">
          <CheckboxGroup class="cell">
            <Checkbox label="按计划执行"></Checkbox>
            <Checkbox label="基本上按照计划"></Checkbox>
            <Checkbox label="不怎么实施"></Checkbox>
            <Checkbox label="不怎么实施"></Checkbox>
            <Checkbox label="未执行"></Checkbox>
          </CheckboxGroup>
        </td>
        <td class="daLeft" colspan="1">
          <CheckboxGroup class="cell">
            <Checkbox label="满意"></Checkbox>
            <Checkbox label="基本满意"></Checkbox>
            <Checkbox label="有一点不满意"></Checkbox>
            <Checkbox label="不满意"></Checkbox>
          </CheckboxGroup>
        </td>
        <td class="daLeft" colspan="1">
          <CheckboxGroup class="cell">
            <Checkbox label="有"></Checkbox>
            <Checkbox label="没有特别的"></Checkbox>
          </CheckboxGroup>
        </td>
        <td class="daLeft">
          <CheckboxGroup class="cell">
            <Checkbox label="已经达成"></Checkbox>
            <Checkbox label="基本达成"></Checkbox>
            <Checkbox label="未达成"></Checkbox>
          </CheckboxGroup>
        </td>
        <td class="daLeft" colspan="1">
          <CheckboxGroup class="cell">
            <Checkbox label="继续"></Checkbox>
            <Checkbox label="变更"></Checkbox>
            <Checkbox label="终止·中止"></Checkbox>
          </CheckboxGroup>
        </td>
      </tr>
      <tr>
        <td colspan="5">
          <textarea placeholder="评价："></textarea>

          <div>
            <span>护理/姓名：</span>
            <input type="text" class="bd" />
            <span>护理/姓名：</span>
            <input type="text" class="bd" />
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="5" style="text-align:left">3期：执行期间</td>
      </tr>
      <tr>
        <td colspan="5">
          <div class="credit">
            <div>护士计入栏</div>
            <div>护理支援专家输入栏</div>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="1">执行状况</td>
        <td colspan="1">本人、专属满意度</td>
        <td colspan="1">新课题</td>
        <td colspan="1">目标达成度</td>
        <td colspan="1">之后的方针</td>
      </tr>
      <tr>
        <td colspan="1">执行状况</td>
        <td colspan="1">本人、专属满意度</td>
        <td colspan="1">新课题</td>
        <td colspan="1">目标达成度</td>
        <td colspan="1">之后的方针</td>
      </tr>
      <tr>
        <td class="daLeft" colspan="1">
          <CheckboxGroup class="cell">
            <Checkbox label="按计划执行"></Checkbox>
            <Checkbox label="基本上按照计划"></Checkbox>
            <Checkbox label="不怎么实施"></Checkbox>
            <Checkbox label="不怎么实施"></Checkbox>
            <Checkbox label="未执行"></Checkbox>
          </CheckboxGroup>
        </td>
        <td class="daLeft" colspan="1">
          <CheckboxGroup class="cell">
            <Checkbox label="满意"></Checkbox>
            <Checkbox label="基本满意"></Checkbox>
            <Checkbox label="有一点不满意"></Checkbox>
            <Checkbox label="不满意"></Checkbox>
          </CheckboxGroup>
        </td>
        <td class="daLeft" colspan="1">
          <CheckboxGroup class="cell">
            <Checkbox label="有"></Checkbox>
            <Checkbox label="没有特别的"></Checkbox>
          </CheckboxGroup>
        </td>
        <td class="daLeft">
          <CheckboxGroup class="cell">
            <Checkbox label="已经达成"></Checkbox>
            <Checkbox label="基本达成"></Checkbox>
            <Checkbox label="未达成"></Checkbox>
          </CheckboxGroup>
        </td>
        <td class="daLeft" colspan="1">
          <CheckboxGroup class="cell">
            <Checkbox label="继续"></Checkbox>
            <Checkbox label="变更"></Checkbox>
            <Checkbox label="终止·中止"></Checkbox>
          </CheckboxGroup>
        </td>
      </tr>
      <tr>
        <td colspan="5">
          <textarea placeholder="评价："></textarea>

          <div>
            <span>护理/姓名：</span>
            <input type="text" class="bd" />
            <span>护理/姓名：</span>
            <input type="text" class="bd" />
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="5">
          <textarea>总结：</textarea>

          <div class="summary">根据上述的护理经过·评价，现护理计划·继续·变更·结束</div>
        </td>
      </tr>
    </table>
  </div>
</template>
<style >
.bd {
  border: none;
  outline: medium;
  /* background: #f5f5f5; */
}
textarea {
  border: 0;
  resize: none;
  outline: none;
  width: 100%;
  /* background: #f5f5f5; */
  height: 1.45rem;
  padding: 0 0.2rem;
}
.sheet {
  padding: 0 0.25rem 0 0.15rem;
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

.monitorTable {
  font-size: 0.14rem;
  width: 100%;
  margin-bottom: 0.25rem;
}
.monitorTable tr {
  height: 0.5rem;
}
.sheetTable {
  font-size: 0.14rem;
  width: 100%;
}
.sheetTable tr {
  height: 0.4rem;
}

.years {
  width: 0.3rem;
}
.marquee {
  zoom: 150%;
  vertical-align: text-bottom;
}
.daLeft {
  text-align: left;
}
.credit {
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: #237804;
}
.summary {
  width: 100%;
  text-align: center;
  color: #ccc;
}
.cell {
  display: flex;
  flex-direction: column;
}
</style>