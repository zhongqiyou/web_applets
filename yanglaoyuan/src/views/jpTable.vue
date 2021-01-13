<template>
  <div>
    <div class="trip-title">受伤名称和病例</div>
    <Table :columns="columns1" :data="data1"></Table>
		<div class="trip-title">病例</div>
    <Table :columns="columns2" :data="data2"></Table>
		<div class="trip-title">入所者一览表</div>
    <Table :columns="columns3" :data="data3"></Table>
		<div class="trip-title">老人保健设施系统账票一览表</div>
    <Table :columns="columns4" :data="data4"></Table>
    <!-- <div class="title">护理服务人员会议的重点</div>
    <table class="time-table" border="1">
      <thead>
        <tr>
          <td colspan="4">
            用户名
          </td>
          <td colspan="1">殿</td>
          <td colspan="1">1</td>
          <td colspan="1">2</td>
          <td colspan="1">3</td>
          <td colspan="1">4</td>
          <td colspan="10">
            &nbsp;设施服务计划制定者（负责人）姓名&nbsp;&nbsp;&nbsp;看护职员专员&nbsp;&nbsp;
          </td>
        </tr>
      </thead>
    </table> -->
    <div class="trip-title">基本信息</div>
    <div class="title">ID：</div>
    <div class="photos">
      <div class="item">
        <div class="placeholder_block"></div>
        <div class="lable">照片</div>
      </div>
      <div class="item">
        <div class="placeholder_block"></div>
        <div class="lable">证件照</div>
      </div>
    </div>
    <table class="table" cellspacing="0" cellpadding="0" border="1" width="100%">
      <tr>
        <td class="head-bg" colspan="2">
          但送
        </td>
        <td colspan="3">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="2">
          入住日
        </td>
        <td colspan="2">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="2">
          退所日
        </td>
        <td colspan="2">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">
          姓名
        </td>
        <td colspan="3">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="2">
          出省年月
        </td>
        <td colspan="2">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="2">
          年龄
        </td>
        <td colspan="2">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">
          住址
        </td>
        <td colspan="11">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">
          心脏复苏
        </td>
        <td colspan="5">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="2">
          紧急运送医院①
        </td>
        <td colspan="4">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">
          紧急搬送
        </td>
        <td colspan="5">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="2">
          紧急运送医院②
        </td>
        <td colspan="4">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2" rowspan="3">
          紧急联系方式
        </td>
        <td class="head-bg" colspan="2">
          姓名
        </td>
        <td colspan="3">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="1" rowspan="3">
          关系
        </td>
        <td colspan="1">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="1" rowspan="3">
          电话
        </td>
        <td class="head-bg" colspan="1">
          住宅
        </td>
        <td colspan="2" rowspan="1">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">
          住所
        </td>
        <td colspan="3">
          <div class="cell"><Input /></div>
        </td>
        <td colspan="1">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="1">
          手机
        </td>
        <td colspan="2">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">
          工作地点
        </td>
        <td colspan="3">
          <div class="cell"><Input /></div>
        </td>
        <td colspan="1">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="1">
          单位
        </td>
        <td colspan="2">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2" rowspan="2">
          伤病名
        </td>
        <td colspan="11">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td colspan="11">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="7">使用开始前的经历</td>
        <td class="head-bg" colspan="8">既往史</td>
      </tr>
      <tr>
        <td colspan="7"><div class="cell"><Input type="textarea" :rows="4" /></div></td>
        <td colspan="8"><div class="cell"><Input type="textarea" :rows="4" /></div></td>
      </tr>
      <tr>
        <td class="head-bg" colspan="5">使用开始前的经历</td>
        <td class="head-bg" colspan="3">兴趣爱好</td>
        <td class="head-bg" colspan="5">既往史</td>
      </tr>
      <tr>
        <td colspan="5"><div class="cell"><Input type="textarea" :rows="4" /></div></td>
        <td colspan="3"><div class="cell"><Input type="textarea" :rows="4" /></div></td>
        <td colspan="5"><div class="cell"><Input type="textarea" :rows="4" /></div></td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">感染症</td>
        <td colspan="4"><div class="cell">HBs抗原</div></td>
        <td colspan="3"><div class="cell">HCV</div></td>
        <td colspan="2"><div class="cell">TPHA</div></td>
        <td colspan="3"><div class="cell">TB</div></td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">过敏源</td>
        <td colspan="4"><div class="cell">食物</div></td>
        <td colspan="4"><div class="cell">药物</div></td>
        <td colspan="4"><div class="cell">其他</div></td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2" rowspan="2">
          私人医生①
        </td>
        <td class="head-bg" colspan="2">
          医疗机构名称
        </td>
        <td colspan="3">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="1" rowspan="2">
          诊疗<br/>科目
        </td>
        <td colspan="1">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="1" rowspan="2">
          电话
        </td>
        <td colspan="3" rowspan="1">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">
          主治医生
        </td>
        <td colspan="3">
          <div class="cell"><Input /></div>
        </td>
        <td colspan="1">
          <div class="cell"><Input /></div>
        </td>
        <td colspan="3">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2" rowspan="2">
          私人医生②
        </td>
        <td class="head-bg" colspan="2">
          医疗机构名称
        </td>
        <td colspan="3">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="1" rowspan="2">
          诊疗<br/>科目
        </td>
        <td colspan="1">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="1" rowspan="2">
          电话
        </td>
        <td colspan="3" rowspan="1">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">
          主治医生
        </td>
        <td colspan="3">
          <div class="cell"><Input /></div>
        </td>
        <td colspan="1">
          <div class="cell"><Input /></div>
        </td>
        <td colspan="3">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2" rowspan="2">
          护理经理
        </td>
        <td class="head-bg" colspan="2">
          公司名称
        </td>
        <td colspan="5">
          <div class="cell"><Input /></div>
        </td>
        <td class="head-bg" colspan="1" rowspan="2">
          电话
        </td>
        <td colspan="4" rowspan="2">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">
          负责人
        </td>
        <td colspan="5">
          <div class="cell"><Input /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2" rowspan="4">
          护理保险<br/>利用服务
        </td>
        <td class="head-bg" colspan="2">
          公司名称
        </td>
        <td colspan="5">
          <div class="cell"><Input type="textarea" :rows="2" /></div>
        </td>
        <td class="head-bg" colspan="1">
          使用<br/>频率
        </td>
        <td colspan="3">
          <div class="cell"><Input type="textarea" :rows="2" /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">
          公司名称
        </td>
        <td colspan="5">
          <div class="cell"><Input type="textarea" :rows="2" /></div>
        </td>
        <td class="head-bg" colspan="1">
          使用<br/>频率
        </td>
        <td colspan="3">
          <div class="cell"><Input type="textarea" :rows="2" /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">
          公司名称
        </td>
        <td colspan="5">
          <div class="cell"><Input type="textarea" :rows="2" /></div>
        </td>
        <td class="head-bg" colspan="1">
          使用<br/>频率
        </td>
        <td colspan="3">
          <div class="cell"><Input type="textarea" :rows="2" /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">
          公司名称
        </td>
        <td colspan="5">
          <div class="cell"><Input type="textarea" :rows="2" /></div>
        </td>
        <td class="head-bg" colspan="1">
          使用<br/>频率
        </td>
        <td colspan="3">
          <div class="cell"><Input type="textarea" :rows="2" /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">
          居住
        </td>
        <td colspan="11">
          <div class="cell"><Input type="textarea" :rows="2" placeholder="填写独居或者其他居住情况" /></div>
        </td>
      </tr>
      <tr>
        <td class="head-bg" colspan="2">
          援助信息
        </td>
        <td colspan="11">
          <div class="cell"><Input type="textarea" :rows="2" placeholder="填写被援助的范式" /></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: "伤病名",
          key: "name",
          className: 'ivu-head-bg'
        },
        {
          title: "开始时间",
          key: "startTime",
          className: 'ivu-head-bg'
        },
        {
          title: "终止时间",
          key: "endTime",
          className: 'ivu-head-bg'
				},
				{
          title: "回程",
          key: "goBack",
          className: 'ivu-head-bg'
        }
			],
			data1: [
				{
					name: '伤病名',
					startTime: '2020-01-03',
					endTime: '2020-05-03',
          goBack: '回程数据',
          className: 'ivu-head-bg'
				},
				{
					name: '伤病名',
					startTime: '2020-01-03',
					endTime: '2020-05-03',
          goBack: '回程数据',
          className: 'ivu-head-bg'
				}
			],
			columns2: [
        {
          title: "其他部门的咨询日期",
          key: "date",
          className: 'ivu-head-bg'
        },
        {
          title: "咨询目的地",
          key: "address",
          className: 'ivu-head-bg'
        },
				{
          title: "回程",
          key: "goBack",
          className: 'ivu-head-bg'
        }
			],
			data2: [
				{
					address: '目的地',
					date: '2020-01-03',
          goBack: '回程数据',
          className: 'ivu-head-bg'
				},
				{
					address: '目的地',
					date: '2020-01-03',
          goBack: '回程数据',
          className: 'ivu-head-bg'
				}
			],
			columns3: [
        {
          title: "入住",
          key: "checkIn",
          className: 'ivu-head-bg'
        },
        {
          title: "退房",
          key: "checkOut",
          className: 'ivu-head-bg'
        },
				{
          title: "房间号",
					key: "roomNum",
          width: 80,
          className: 'ivu-head-bg'
        },
				{
          title: "床号",
					key: "badNum",
          width: 70,
          className: 'ivu-head-bg'
        },
				{
          title: "ID",
					key: "id",
          width: 60,
          className: 'ivu-head-bg'
        },
				{
          title: "姓名",
					key: "name",
          width: 100,
          className: 'ivu-head-bg'
        },
				{
          title: "出生年月日",
					key: "birthday",
          width: 110,
          className: 'ivu-head-bg'
        },
				{
          title: "邮政编码",
					key: "postalCode",
          width: 100,
          className: 'ivu-head-bg'
        },
				{
          title: "住所",
          key: "address",
          className: 'ivu-head-bg'
        },
				{
          title: "电话号码",
          key: "phone",
          className: 'ivu-head-bg'
        }
			],
			data3: [
				{
					checkIn: '入住数据',
					checkOut: '退房数据',
					roomNum: '1',
					badNum: '2',
					id: 'id',
					name: '姓名',
					birthday: '2020-01-03',
					postalCode: '邮政',
					address: '住所',
					phone: '133****1744'
				},
				{
					checkIn: '入住数据',
					checkOut: '退房数据',
					roomNum: '1',
					badNum: '2',
					id: 'id',
					name: '姓名',
					birthday: '2020-01-03',
					postalCode: '邮政',
					address: '住所',
					phone: '133****1744'
				}
			],
			columns4: [
        {
          type: 'index',
					width: 60,
					align: 'center',
          title: 'No.',
          className: 'ivu-head-bg'
        },
        {
          title: "账票名",
					key: "name",
					width: 250,
          align: 'center',
          className: 'ivu-head-bg'
        },
				{
          title: "纸上记载（PDF）",
					key: "paper",
					width: 100,
          align: 'center',
          className: 'ivu-head-bg'
        },
				{
          title: "PC记载",
					key: "pc",
					width: 100,
          align: 'center',
          className: 'ivu-head-bg'
        },
				{
          title: "监察是否必要",
					key: "must",
					width: 100,
          align: 'center',
          className: 'ivu-head-bg'
        },
				{
          title: "备考",
					key: "remarks",
          align: 'center',
          className: 'ivu-head-bg'
        },
				{
          title: "记录者",
					key: "recorder",
          align: 'center',
          className: 'ivu-head-bg'
        }
			],
			data4: [
				{
					name: '入住者一览表',
					paper: '×',
					pc: '○',
					must: '×',
					remarks: '备考数据',
					recorder: '咨询员·看护'
				},
				{
					name: '入住者一览表',
					paper: '×',
					pc: '○',
					must: '×',
					remarks: '备考数据',
					recorder: '咨询员·看护'
				}
			]
    };
  }
};
</script>

<style lang="less" scoped>
	.title {
			color: #333;
			font-size: 0.16rem;
			font-weight: bold;
			padding: 0.2rem 0 0.2rem 0.15rem;
			text-align: left;
	}
	.time-table{
		width: 100%;
		font-size: .12rem /* 12/102 */;
		tbody td{
			max-width: .49rem /* 50/102 */;
			&:last-child{
				min-width: auto;
			}
			&:first-child{
				width: .2rem /* 20/102 */;
			}
		}
	} // .time-table end
	.time-info{
		text-align: left;
		display: flex;
		font-size: .14rem /* 14/102 */;
		color: #000;
		margin-top: .2rem /* 20/102 */;
		.info-title{
			margin-right: .2rem /* 20/102 */;
		}
  } // .trip-info ned
  
  .photos {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.15rem 0;
    .item {
      margin: 0 0.3rem;
      .placeholder_block {
        width: 1.5rem;
        height: 2rem;
        background: #fafafa;
        border: 0.01rem solid #e7e7e7;
      }
      .label {
        margin-top: 0.15rem;
        color: #333;
        font-size: 0.16rem;
      }
    }
  }
  .table {
    background: #ffffff;
    border:solid #e7e7e7;
    border-width:1px 0px 0px 1px;
    td {
      border:solid #e7e7e7;
      border-width:0px 1px 1px 0px;
      padding: 0.1rem 0.15rem;
    }
    .ivu-input {
      border: 0!important;
    }
    .cell {
      font-size: 0.14rem;
      color: #333;
    }
    .flex {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      white-space: nowrap;
    }
    .short {
      width: 1rem;
      input {
        text-align: right;
      }
    }
  }
  .tip_text {
    padding: 0.15rem 0 0.15rem 0.1rem;
    color: #707070;
    font-size: 0.14rem;
    text-align: left;
  }
  textarea {
    resize: none;
  }
</style>