<template>
  <div class="extend">
    <table class="table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
      <tr>
        <td class="head-bg" rowspan="17" style="width: .5rem;">褥瘡危険因子の評価</td>
        <td class="head-bg" colspan="3">评估压力性溃疡的危险因素</td>
        <td colspan="3">
          <label><input type="checkbox">有</label>
          <label><input type="checkbox">没有</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">有无褥疮</td>
        <td>
          <label><input type="checkbox">有</label>
          <label><input type="checkbox">没有</label>
        </td>
        <td class="head-bg">褥疮发生日</td>
        <td class="date"><input type="text" maxlength="4"> 年<input maxlength="2" type="text"> 月<input type="text" maxlength="2"> 日</td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">现在</td>
        <td colspan="3">
          <label>1.现在<input type="checkbox">没有</label>
          <label><input type="checkbox">有【骶骨部、挫伤骨部、尾骨部、髂骨部、肘部、其他(<input type="text" />)】</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">过去</td>
        <td colspan="3">
          <label><input type="checkbox">没有</label>
          <label><input type="checkbox">有【骶骨部、挫伤骨部、尾骨部、髂骨部、肘部、其他(<input type="text" />)】</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">日常生活自立度</td>
        <td colspan="2">
          <label><input type="checkbox">J1</label>
          <label><input type="checkbox">J2</label>
          <label><input type="checkbox">A1</label>
          <label><input type="checkbox">A2</label>
          <label><input type="checkbox">B1</label>
          <label><input type="checkbox">B2</label>
          <label><input type="checkbox">C1</label>
          <label><input type="checkbox">C2</label>
        </td>
        <td class="head-bg" style="width: 1.5rem;">应对</td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="4" style="max-width: 1rem;">ADLの状況</td>
        <td class="head-bg" colspan="2">入浴</td>
        <td colspan="2">
          <label><input type="checkbox">自己做</label>
          <label><input type="checkbox">没有做</label>
        </td>
        <td rowspan="12">
          <p>如果“自己没去”、“有”或“是”符合1个以上“高风险”、“中风险”，就制定并实施褥疮护理计划。</p>
          <h3 style="margin: .8rem 0 .1rem;">褥瘡计划</h3>
          <label style="margin-left: 0;"><input type="checkbox">有</label>
          <label><input type="checkbox">无</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">食物摄入量</td>
        <td colspan="2">
          <label><input type="checkbox">自己做</label>
          <label><input type="checkbox">没有做</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="2">更衣</td>
        <td class="head-bg">上衣</td>
        <td colspan="2">
          <label><input type="checkbox">自己做</label>
          <label><input type="checkbox">没有做</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg">下衣</td>
        <td colspan="2">
          <label><input type="checkbox">自己做</label>
          <label><input type="checkbox">没有做</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" rowspan="4">基本动作</td>
        <td class="head-bg" colspan="2">翻身</td>
        <td colspan="2">
          <label><input type="checkbox">自己做</label>
          <label><input type="checkbox">没有做</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">保持坐姿</td>
        <td colspan="2">
          <label><input type="checkbox">自己做</label>
          <label><input type="checkbox">没有做</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">坐下</td>
        <td colspan="2">
          <label><input type="checkbox">自己做</label>
          <label><input type="checkbox">没有做</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">保持站立</td>
        <td colspan="2">
          <label><input type="checkbox">自己做</label>
          <label><input type="checkbox">没有做</label>
        </td>
      </tr>
      <tr>
        <td rowspan="3" class="head-bg">排泄状况</td>
        <td class="head-bg" colspan="2">尿失禁</td>
        <td colspan="2">
          <label><input type="checkbox">有</label>
          <label><input type="checkbox">没有</label>
          <label><input type="checkbox">对象外(*2)</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">便失禁</td>
        <td colspan="2">
          <label><input type="checkbox">有</label>
          <label><input type="checkbox">没有</label>
          <label><input type="checkbox">对象外(*2)</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">导管的使用</td>
        <td colspan="2">
          <label><input type="checkbox">有</label>
          <label><input type="checkbox">没有</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">荣誉状态</td>
        <td colspan="2">
          <label><input type="checkbox">有</label>
          <label><input type="checkbox">否</label>
        </td>
      </tr>
    </table>

    <div class="tip_text"><span>※１．经管营养·静脉营养的情况</span><span>※2。使用管状物等或自行导尿等的情况</span><span>※3。人工肛门的情况</span>
    </div>

    <table class="table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
      <tr>
        <td class="head-bg" rowspan="13" style="width: .5rem;">入浴</td>
        <td class="head-bg" colspan="4">需要帮助的清洗点</td>
        <td class="head-bg" colspan="2">热水の温度</td>
        <td class="head-bg" colspan="2">帮助者</td>
        <td class="head-bg" colspan="2">浴槽的种类</td>
      </tr>
      <tr class="block">
        <td colspan="4">
          <article>
            <label><input type="checkbox">头发</label>
            <label><input type="checkbox">脸</label>
            <label><input type="checkbox">臀部</label>
            <label><input type="checkbox">膝盖(右·左)</label>
            <label><input type="checkbox">膝下(右·左)</label>
            <label><input type="checkbox">鞋底(右·左)</label>
            <label><input type="checkbox">背</label>
          </article>

          <article>
            <label><input type="checkbox">手臂(右·左)</label>
            <label><input type="checkbox">肩膀(右·左)</label>
            <label><input type="checkbox">私处</label>
            <label><input type="checkbox">大腿</label>
            <label><input type="checkbox">脖子</label>
            <label><input type="checkbox">脚背(右·左)</label>
            <label><input type="checkbox">手(右·左)</label>
          </article>

        </td>
        <td colspan="2">
          <label><input type="checkbox">热量(40度)</label>
          <label><input type="checkbox">普通(38度)</label>
          <label><input type="checkbox">低温(36度)</label>
        </td>
        <td colspan="2">
          <label><input type="checkbox">男性</label>
          <label><input type="checkbox">女性</label>
          <label><input type="checkbox">任意</label>
        </td>
        <td colspan="2">
          <label><input type="checkbox">私人浴室</label>
          <label><input type="checkbox">精浴</label>
          <label><input type="checkbox">特浴</label>
          <label><input type="checkbox">沐浴</label>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="head-bg">入浴</td>
        <td colspan="7">
          <label><input type="checkbox">自立</label>
          <label><input type="checkbox">看守</label>
          <label><input type="checkbox">部分协助</label>
          <label><input type="checkbox">所有协助</label>
          <label><input type="checkbox">没有执行</label>
        </td>
      </tr>
      <tr>
        <td colspan="8" class="head-bg">沐浴详细动作</td>
        <td colspan="2" class="head-bg">特记事项·课题</td>
      </tr>
      <tr>
        <td class="head-bg"></td>
        <td class="head-bg" colspan="4">洗身体</td>
        <td class="head-bg" colspan="3">洗头发</td>
        <td rowspan="4" colspan="2"><textarea></textarea></td>
      </tr>
      <tr>
        <td class="head-bg">行程</td>
        <td class="head-bg">身体上的水</td>
        <td class="head-bg">把肥皂抹在毛巾上</td>
        <td class="head-bg">洗身体</td>
        <td class="head-bg">洗肥皂</td>
        <td class="head-bg">拿起洗发水</td>
        <td class="head-bg">揉搓整个头皮</td>
        <td class="head-bg">洗洗发水</td>
      </tr>
      <tr>
        <td class="head-bg">现状</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="head-bg">前景</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="head-bg"></td>
        <td class="head-bg" colspan="3">进入浴池</td>
        <td class="head-bg">座位保持</td>
        <td class="head-bg" colspan="2">从浴池里出来</td>
        <td class="head-bg" colspan="2">入浴后的动作</td>
        <td rowspan="4"><textarea></textarea></td>
      </tr>
      <tr>
        <td class="head-bg">行程</td>
        <td class="head-bg">坐在浴盆边</td>
        <td class="head-bg">跨进浴池</td>
        <td class="head-bg">泡在浴缸里</td>
        <td class="head-bg">浴池内座位稳定</td>
        <td class="head-bg">坐在浴盆边</td>
        <td class="head-bg">走出浴缸</td>
        <td class="head-bg">擦拭身体</td>
        <td class="head-bg">干法</td>
      </tr>
      <tr>
        <td class="head-bg">现状</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="head-bg">前景</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">特记事项等</td>
        <td colspan="7"><input style="max-width: none;width: 100%;" type="text"></td>
      </tr>
    </table>

    <table class="table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
      <tr>
        <td rowspan="25" class="head-bg" style="width: 0.5rem;">更衣</td>
        <td class="head-bg" colspan="3">更衣时间</td>
        <td colspan="10">
          <label><input type="checkbox">朝[ <input type="text"> ]</label>
          <label><input type="checkbox">昼[ <input type="text"> ]</label>
          <label><input type="checkbox">夕[ <input type="text"> ]</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">白天的服装</td>
        <td colspan="10">
          <label><input type="checkbox">换衣服</label>
          <label><input type="checkbox">穿着睡</label>
          <label><input type="checkbox">其他</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">夜间的服装</td>
        <td colspan="10">
          <label><input type="checkbox">睡衣</label>
          <label><input type="checkbox">和白天一样</label>
          <label><input type="checkbox">其他</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">课题·特记事项等</td>
        <td colspan="10">
          <label><input type="text"></label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">更衣</td>
        <td colspan="10">
          <label><input type="checkbox">自立</label>
          <label><input type="checkbox">看守</label>
          <label><input type="checkbox">部分协助</label>
          <label><input type="checkbox">所有协助</label>
          <label><input type="checkbox">没有执行</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="13">更衣动作（穿）</td>
      </tr>
      <tr>
        <td class="head-bg"></td>
        <td class="head-bg">準備</td>
        <td class="head-bg" colspan="4">上衣（头戴）</td>
        <td class="head-bg" colspan="7">上衣（前开）</td>
      </tr>
      <tr>
        <td class="head-bg">行程</td>
        <td class="head-bg">准备衣服</td>
        <td class="head-bg">拿衣服</td>
        <td class="head-bg">把头穿过去</td>
        <td class="head-bg">将手穿过袖子</td>
        <td class="head-bg">修整</td>
        <td class="head-bg">拿衣服</td>
        <td class="head-bg">穿过一只手</td>
        <td class="head-bg">把衣服往背后转</td>
        <td class="head-bg" colspan="2">传递另一只手</td>
        <td class="head-bg">纽扣</td>
        <td class="head-bg">拉紧拉链</td>
      </tr>
      <tr>
        <td class="head-bg">现状</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td colspan="2"></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="head-bg">前景</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td colspan="2"></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="head-bg" colspan="13">更衣动作（穿）</td>
      </tr>
      <tr>
        <td class="head-bg"></td>
        <td class="head-bg" colspan="4">下衣</td>
        <td class="head-bg" colspan="4">穿袜子</td>
        <td class="head-bg" colspan="4">穿鞋子</td>
      </tr>
      <tr>
        <td class="head-bg">行程</td>
        <td class="head-bg">将双腿穿过裤子</td>
        <td class="head-bg">拉起</td>
        <td class="head-bg">修整</td>
        <td class="head-bg">闭上前面(按钮等)</td>
        <td class="head-bg">拿袜子</td>
        <td class="head-bg">拿衣服</td>
        <td class="head-bg">把脚尖伸进去</td>
        <td class="head-bg">把衣服往背后转</td>
        <td class="head-bg" colspan="2">传递另一只手</td>
        <td class="head-bg">纽扣</td>
        <td class="head-bg">拉紧拉链</td>
      </tr>
      <tr>
        <td class="head-bg">现状</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td colspan="2"></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="head-bg">前景</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td colspan="2"></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="head-bg" colspan="13">更衣动作（脱）</td>
      </tr>
      <tr>
        <td class="head-bg"></td>
        <td class="head-bg" colspan="3">上衣（头戴）</td>
        <td class="head-bg" colspan="5">上衣（前开）</td>
        <td class="head-bg" colspan="4">下衣</td>
      </tr>
      <tr>
        <td class="head-bg">行程</td>
        <td class="head-bg">把头拉出来</td>
        <td class="head-bg">把手伸出来</td>
        <td class="head-bg">放下衣服</td>
        <td class="head-bg">解开扣子</td>
        <td class="head-bg">解开拉链</td>
        <td class="head-bg">抽出一只手</td>
        <td class="head-bg">把衣服放在你的背上</td>
        <td class="head-bg">拉出另一只手</td>
        <td class="head-bg">解开（按钮等）</td>
        <td class="head-bg">从腰部向下滑至膝盖以上</td>
        <td class="head-bg">一次拉出一只脚</td>
        <td class="head-bg">放下衣服</td>
      </tr>
      <tr>
        <td class="head-bg">现状</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="head-bg">前景</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="head-bg" colspan="7">更衣动作（脱）</td>
        <td class="head-bg" colspan="6">特記事項・課題</td>
      </tr>
      <tr>
        <td class="head-bg"></td>
        <td class="head-bg" colspan="3">上衣（头戴）</td>
        <td class="head-bg" colspan="3">上衣（前开）</td>
        <td rowspan="4" colspan="6"><textarea></textarea></td>
      </tr>
      <tr>
        <td class="head-bg">行程</td>
        <td class="head-bg">下至脚踝</td>
        <td class="head-bg">拉出脚跟</td>
        <td class="head-bg">拉出脚趾</td>
        <td class="head-bg">拆下皮带和鞋带</td>
        <td class="head-bg">拉出脚跟</td>
        <td class="head-bg">放下鞋子</td>
      </tr>
      <tr>
        <td class="head-bg">现状</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="head-bg">前景</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    
    <table class="table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
      <tr>
        <td class="head-bg" rowspan="10" style="width: 0.5rem;">更衣</td>
        <td class="head-bg" colspan="3">口腔护理</td>
        <td colspan="9">
          <label><input type="checkbox">自立</label>
          <label><input type="checkbox">看守</label>
          <label><input type="checkbox">部分协助</label>
          <label><input type="checkbox">所有协助</label>
          <label><input type="checkbox">没有执行</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="3">整容</td>
        <td colspan="9">
          <label><input type="checkbox">自立</label>
          <label><input type="checkbox">看守</label>
          <label><input type="checkbox">部分协助</label>
          <label><input type="checkbox">所有协助</label>
          <label><input type="checkbox">没有执行</label>
        </td>
      </tr>
      <tr>
        <td colspan="12" class="head-bg">精细的口腔护理，洗脸，美发</td>
      </tr>
      <tr>
        <td class="head-bg">行程</td>
        <td class="head-bg">换个牙刷</td>
        <td class="head-bg">涂牙膏</td>
        <td class="head-bg">刷牙</td>
        <td class="head-bg">打开水龙头</td>
        <td class="head-bg">往杯子里倒水</td>
        <td class="head-bg">含漱液</td>
        <td class="head-bg">擦嘴</td>
        <td class="head-bg">洗脸</td>
        <td class="head-bg">擦脸</td>
        <td class="head-bg">梳头</td>
        <td class="head-bg">刮胡子</td>
      </tr>
      <tr>
        <td class="head-bg">现状</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="head-bg">前景</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="head-bg" colspan="4">口腔护理時間</td>
        <td class="head-bg" colspan="3">使用器具</td>
        <td class="head-bg" colspan="3">假牙</td>
        <td class="head-bg" colspan="2">特記事項・課題</td>
      </tr>
      <tr class="block">
        <td colspan="4">
          <article>
            <label><input type="checkbox">起床之后</label>
            <label><input type="checkbox">早餐后</label>
            <label><input type="checkbox">午饭后</label>
            <label><input type="checkbox">其他</label>
          </article>

          <article>
            <label><input type="checkbox">休息之前</label>
            <label><input type="checkbox">晚饭后</label>
            <label><input type="checkbox">零食后</label>
          </article>
        </td>
        <td colspan="3">
          <article>
            <label><input type="checkbox">牙刷</label>
            <label><input type="checkbox">纱布</label>
            <label><input type="checkbox">舌刷</label>
            <label><input type="checkbox">其他</label>
          </article>

          <article>
            <label><input type="checkbox">杯子</label>
            <label><input type="checkbox">海绵刷</label>
            <label><input type="checkbox">假牙清洁器</label>
          </article>
        </td>
        <td colspan="3">
            <label><input type="checkbox">全部假牙(上 下)</label>
            <label><input type="checkbox">局部假牙(上 下)</label>
            <label><input type="checkbox">无</label>
        </td>
        <td rowspan="3" colspan="2"><textarea style="min-height: 1.5rem;"></textarea></td>
      </tr>
      <tr>
        <td colspan="4" class="head-bg">洗脸时间</td>
        <td colspan="6" class="head-bg">化妆</td>
      </tr>
      <tr class="block">
        <td colspan="4">
          <article>
            <label><input type="checkbox">起床之后</label>
            <label><input type="checkbox">早餐后</label>
            <label><input type="checkbox">午饭后</label>
            <label><input type="checkbox">其他</label>
          </article>

          <article>
            <label><input type="checkbox">休息之前</label>
            <label><input type="checkbox">晚饭后</label>
            <label><input type="checkbox">零食后</label>
          </article>
        </td>
        <td colspan="6">
          <label><input type="checkbox">有</label>
          <label><input type="checkbox">没有</label>
          <label><input type="checkbox">有时</label>
        </td>
      </tr>
    </table>

    <table class="table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
      <tr>
        <td rowspan="2" class="head-bg" style="width: 0.5rem;">更衣</td>
        <td class="head-bg">起床时间</td>
        <td class="head-bg">起床方法</td>
      </tr>
      <tr>
        <td>
					<div class="cell">
						<p>标准时间</p>
						<p>[<Input style="width: 0.5rem; margin: 0 0.1rem;" />]时</p>
					</div>
				</td>
        <td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="自然"></Checkbox><br />
							<Checkbox label="闹钟"></Checkbox><br />
							<Checkbox label="其他"></Checkbox><br />
						</CheckboxGroup>
					</div>
				</td>
      </tr>
    </table>
		<table class="table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
      <tr>
        <td rowspan="2" class="head-bg" style="width: 0.5rem;">更衣</td>
        <td class="head-bg">睡觉时间</td>
        <td class="head-bg">睡觉方法</td>
        <td class="head-bg">睡眠状态</td>
        <td class="head-bg">电</td>
        <td class="head-bg">准备的物品</td>
        <td class="head-bg">特记事项·课题</td>
      </tr>
      <tr>
        <td>
					<div class="cell">
						<p>标准时间</p>
						<p>[<Input style="width: 0.5rem; margin: 0 0.1rem;" />]时</p>
					</div>
				</td>
        <td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="自然"></Checkbox><br />
							<Checkbox label="眠前服药"></Checkbox><br />
							<p>[<Input style="width: 0.5rem; margin: 0 0.1rem;" />]</p>
							<p>[<Input style="width: 0.5rem; margin: 0 0.1rem;" />]</p>
							<p>[<Input style="width: 0.5rem; margin: 0 0.1rem;" />]</p>
							<Checkbox label="其他"></Checkbox><br />
						</CheckboxGroup>
					</div>
				</td>
        <td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="睡眠良好"></Checkbox><br />
							<Checkbox label="有时睡不着"></Checkbox><br />
							<Checkbox label="睡不着"></Checkbox><br />
							<Checkbox label="打鼾"></Checkbox>[<Input style="width: 0.5rem; margin: 0 0.1rem;" />]<br />
							<Checkbox label="梦话"></Checkbox>[<Input style="width: 0.5rem; margin: 0 0.1rem;" />]<br />
						</CheckboxGroup>
					</div>
				</td>
        <td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="全关"></Checkbox><br />
							<Checkbox label="小灯泡"></Checkbox><br />
							<Checkbox label="全开"></Checkbox><br />
						</CheckboxGroup>
					</div>
				</td>
        <td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="饮料"></Checkbox><br />
							<p>[<Input style="width: 0.5rem; margin: 0 0.1rem;" />]</p>
							<Checkbox label="点心"></Checkbox><br />
							<Checkbox label="时钟"></Checkbox><br />
							<Checkbox label="其他"></Checkbox><br />
						</CheckboxGroup>
					</div>
				</td>
        <td><div class="cell"></div></td>
      </tr>
    </table>
		<table class="table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
			<tr>
				<td class="head-bg" rowspan="33" style="width: 0.5rem;">心身机能</td>
				<td class="head-bg" colspan="4" style="width: 189px;">视力</td>
				<td colspan="1">
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="自立"></Checkbox>
							<Checkbox label="看守"></Checkbox>
							<Checkbox label="部分协助"></Checkbox>
							<Checkbox label="所有协助"></Checkbox>
							<Checkbox label="没有执行"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
				<td class="head-bg" style="width: 2.4rem;">特记事项·课题</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">听力</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="对生活没有影响"></Checkbox>
							<Checkbox label="有点耳聋"></Checkbox>
							<Checkbox label="耳聋"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
				<td rowspan="29" style="vertical-align: top;">
					<div class="cell">
						<p class="flex">
							血糖测定
							<CheckboxGroup style="margin-left: 0.2rem;">
								<Checkbox label="有"></Checkbox>
								<Checkbox label="无"></Checkbox>
							</CheckboxGroup>
						</p>
						<p class="flex">
							每日·每周·每月
							<Input style="width: 0.8rem;" />
							测定
						</p>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">失语症和构音障碍</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有"></Checkbox>
							<Checkbox label="有"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">理解力</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="可以理解"></Checkbox>
							<Checkbox label="有一点困难"></Checkbox>
							<Checkbox label="简单的内容"></Checkbox>
							<Checkbox label="不能理解"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">人际关系</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有问题"></Checkbox>
							<Checkbox label="有点问题"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">性格</td>
				<td>
					<div class="cell">
						<Input />
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">精神行动障碍</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有"></Checkbox>
							<Checkbox label="有"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">估计障碍</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有"></Checkbox>
							<Checkbox label="有"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">记忆障碍</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有"></Checkbox>
							<Checkbox label="有"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">运动机能障碍</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有"></Checkbox>
							<Checkbox label="有"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">感觉机能障碍</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有"></Checkbox>
							<Checkbox label="有"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4" >高次脑机能障碍</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有"></Checkbox>
							<Checkbox label="有"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">疼痛</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有"></Checkbox>
							<Checkbox>有<span style="margin-left: 0.2rem;">部位</span></Checkbox>[<Input style="width: 0.8rem; margin: 0 0.1rem;" />]
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">拒缩</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有"></Checkbox>
							<Checkbox>有<span style="margin-left: 0.2rem;">部位</span></Checkbox>[<Input style="width: 0.8rem; margin: 0 0.1rem;" />]
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">体内金属</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有"></Checkbox>
							<Checkbox>有<span style="margin-left: 0.2rem;">部位</span></Checkbox>[<Input style="width: 0.8rem; margin: 0 0.1rem;" />]
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">过敏(食物)</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有"></Checkbox>
							<Checkbox>有<span style="margin-left: 0.2rem;">[<Input style="width: 0.8rem; margin: 0 0.1rem;" />]</span></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">过敏(药物)</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有"></Checkbox>
							<Checkbox>有<span style="margin-left: 0.2rem;">[<Input style="width: 0.8rem; margin: 0 0.1rem;" />]</span></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">感染症</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有"></Checkbox>
							<Checkbox>有<span style="margin-left: 0.2rem;">[<Input style="width: 0.8rem; margin: 0 0.1rem;" />]</span></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">需要注意的内服药</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="没有"></Checkbox>
							<Checkbox class="flex">有
								<span class="flex" style="margin-left: 0.2rem;">[
									<CheckboxGroup>
										<Checkbox label="抗凝固药"></Checkbox>
										<Checkbox label="降血糖药"></Checkbox>
										<Checkbox label="降血压"></Checkbox><br />
										<Checkbox label="钾制剂"></Checkbox>
										<Checkbox label="抗精神病药"></Checkbox>
										<Checkbox label="安眠药"></Checkbox>
									</CheckboxGroup>
								]</span>
							</Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">HDS-R</td>
				<td>
					<div class="cell flex">
						点(实施日 <Input style="width: 0.5rem;" /> 年 <Input style="width: 0.5rem;" /> 月 <Input style="width: 0.5rem;" /> 日)
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">认知症的诊断（情况诊断名）</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="阿尔兹海默症"></Checkbox>
							<Checkbox label="脑血管性"></Checkbox>
							<Checkbox label="额颞"></Checkbox>
							<Checkbox label="小体型"></Checkbox>
							<Checkbox label="不明"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="2">症状</td>
				<td class="head-bg" colspan="2">状况</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="2" rowspan="3">核心症状</td>
				<td class="head-bg" colspan="2">记忆障碍</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="不记得名字"></Checkbox>
							<Checkbox label="不记得吃过饭"></Checkbox>
							<Checkbox label="反复说同一件事"></Checkbox>
							<Checkbox label="一遍又一遍地做同样的事情"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="2">见识障碍</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="不知道日期"></Checkbox>
							<Checkbox label="不知道位置"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="2">失行失认</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="把垃圾桶当成厕所使用"></Checkbox>
							<Checkbox label="不能正确穿衣服"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="2" rowspan="4">BPSD</td>
				<td class="head-bg" colspan="2">徘徊</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="在同一个地方转转"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>	
			<tr>
				<td class="head-bg" colspan="2">幻觉幻听</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="可以看到一些东西"></Checkbox>
							<Checkbox label="可以听到一些东西"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="2">暴力行为</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="突然生气"></Checkbox>
							<Checkbox label="激动"></Checkbox>
							<Checkbox label="大声"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>		
			<tr>
				<td class="head-bg" colspan="2">不洁行为</td>
				<td>
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="厕所外小便"></Checkbox>
							<Checkbox label="触摸大便"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>	
			<tr>
				<td class="head-bg" colspan="4">其他</td>
				<td colspan="1">
					<div class="cell">
						<Input type="textarea" :row="4" />
					</div>
				</td>
			</tr>	
			<tr>
				<td class="head-bg" colspan="4">当前病史</td>
				<td colspan="1">
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="见附表"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
				<td rowspan="2" colspan="1">
					<div class="cell">
						<p style="display: flex; align-items: center; justify-content: space-between; padding: 0 0.15rem;">
							<span>4：独立</span>
							<span>3：观看和通话</span>
						</p>
						<p style="display: flex; align-items: center; justify-content: space-between; padding: 0 0.15rem;">
							<span>2：部分协助</span>
							<span>1：全部协助</span>
						</p>
						<p style="display: flex; align-items: center; justify-content: space-between; padding: 0 0.15rem;">
							<span>0：未实施</span>
						</p>
					</div>
				</td>
			</tr>
			<tr>
				<td class="head-bg" colspan="4">病史</td>
				<td colspan="1">
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="见附表"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
		</table>
    
    <table class="table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
      <tr>
        <td rowspan="8" class="head-bg" style="width: 0.5rem;">环境因子</td>
        <td class="head-bg"></td>
        <td class="head-bg">课题</td>
        <td class="head-bg" colspan="2">状况</td>
        <td class="head-bg">房间布置</td>
      </tr>
      <tr>
        <td class="head-bg">家族</td>
        <td class="head-bg"></td>
        <td colspan="2">
          <label><input type="checkbox">独居</label>
          <label><input type="checkbox">夫妇</label>
          <label><input type="checkbox">其他( <input type="text"> )</label>
        </td>
        <td rowspan="3"><textarea></textarea></td>
      </tr>
      <tr>
        <td class="head-bg">福利设备等</td>
        <td class="head-bg"></td>
        <td>
          <p>
          <label><input type="checkbox">手杖</label>
          <label><input type="checkbox">矫形器</label>
          <label><input type="checkbox">助行器</label>
          <label><input type="checkbox">轮椅</label>
          </p>
          <p>
          <label><input type="checkbox">扶手</label>
          <label><input type="checkbox">床</label>
          <label><input type="checkbox">便携式马桶</label>
          </p>
          <label><input type="checkbox">斜坡</label>
        </td>
        <td class="block">
          <p style='padding: 0 .15rem;'>调整</p>
          <label><input type="checkbox">已调整</label>
          <label><input type="checkbox">未调整</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg">护理者</td>
        <td class="head-bg"></td>
        <td>
          <label><input type="checkbox">没有</label>
          <label><input type="checkbox">有</label>
        </td>
        <td rowspan="2" class="block">
          <p style='padding: 0 .15rem;'>调整</p>
          <label><input type="checkbox">已调整</label>
          <label><input type="checkbox">未调整</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg">护理者の护理协助</td>
        <td class="head-bg"></td>
        <td>
          <label><input type="checkbox">没有</label>
          <label><input type="checkbox">有</label>
        </td>
        <td class="head-bg">房间布置</td>
      </tr>
      <tr class="block">
        <td class="head-bg">居住环境</td>
        <td class="head-bg"></td>
        <td>
          <label><input type="checkbox">独立式住宅</label>
          <label><input type="checkbox">公寓:起居室( <input type="text"> 楼 )</label>
          <label><input type="checkbox">楼梯 <input type="checkbox">电梯</label>
          <label><input type="checkbox">扶手 (服装位置: <input type="text"> )</label>
          <label><input type="checkbox" style="visibility: hidden">餐桌 (<input type="checkbox" />桌子 <input type="checkbox" /> 桌子/椅子  )</label>
          <label><input type="checkbox" style="visibility: hidden">马桶 (<input type="checkbox" />西式 <input type="checkbox" /> 日式 <input type="checkbox" /> 手提式马桶 )</label>
        </td>
        <td>
          <p style='padding: 0 .15rem;'>调整</p>
          <label><input type="checkbox">已调整</label>
          <label><input type="checkbox">改修中</label>
          <label><input type="checkbox">未调整</label>
        </td>
        <td rowspan="3"><textarea></textarea></td>
      </tr>
      <tr>
        <td class="head-bg">车流量</td>
        <td class="head-bg"></td>
        <td colspan="2">
          <label><input type="checkbox">没有</label>
          <label><input type="checkbox">有</label>
        </td>
      </tr>
      <tr>
        <td class="head-bg">社会参与</td>
        <td class="head-bg"></td>
        <td colspan="2">
          <input style="max-width: none; width: 100%;" type="text">
        </td>
      </tr>
    </table>

		<table class="table" cellspacing="0" cellpadding="0" border="1" width="100%" style="margin-top: 0.2rem;">
			<tr>
				<td class="head-bg" rowspan="8" style="width: 0.5rem">作业汇总表</td>
				<td class="head-bg" style="width: 189px;">见识</td>
				<td>
					<div class="cell"><Input /></div>
				</td>
				<td class="head-bg" style="width: 2.4rem;">风险管理</td>
			</tr>
			<tr>
				<td class="head-bg" rowspan="4" style="width: 1.5rem;">生活各个方面需要解决的问题</td>
				<td>
					<div class="cell"><Input /></div>
				</td>
				<td rowspan="8" style="vertical-align: top;">
					<div class="cell">
						<CheckboxGroup>
							<Checkbox label="跌倒、跌落"></Checkbox>
							<Checkbox label="误食"></Checkbox>
							<Checkbox label="自残"></Checkbox><br/>
							<Checkbox label="滑到"></Checkbox>
							<Checkbox label="护理事故"></Checkbox>
							<Checkbox label="身体情况恶化"></Checkbox><br/>
							<Checkbox label="麻烦别人"></Checkbox>
							<Checkbox label="营养恶化"></Checkbox>
						</CheckboxGroup>
					</div>
				</td>
			</tr>
			<tr>
				<td><div class="cell"><Input /></div></td>
			</tr>
			<tr>
				<td><div class="cell"><Input /></div></td>
			</tr>
			<tr>
				<td><div class="cell"><Input /></div></td>
			</tr>
			<tr>
				<td class="head-bg" rowspan="3">优先顺位</td>
				<td><div class="cell"><Input /></div></td>
			</tr>
			<tr>
				<td><div class="cell"><Input /></div></td>
			</tr>
			<tr>
				<td><div class="cell"><Input /></div></td>
			</tr>
		</table>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  }
}
</script>

<style lang="less">
  .table{
    font-size: .14rem /* 14/102 */;
    text-align: left;
    .cell {
      text-align: left;
      .flex {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }
    input{
      border: 0;
      outline: none;
      max-width: .59rem /* 60/102 */;
    }
    label{
      margin: 0 0.1rem;
      input{
        margin: 0 .05rem;
      }
    }
    textarea{
      border: 0;
      resize: none;
      width: 100%;
      min-height: 1.96rem /* 200/102 */;
    }
    article{
      display: inline-block;
      width: 49%;
    }
    .block label{
      display: block;
    }
  }
  .tip_text span{
    margin: 0 .2rem /* 20/102 */;
  }
  .date{
    padding: .1rem 0!important;
    input{
      width: .31rem /* 32/102 */;
      text-align: right;
    }
  }
</style>