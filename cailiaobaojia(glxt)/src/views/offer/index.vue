<template>
<div>
  <div class="header">
    <el-button type="primary" icon="el-icon-plus" @click="exportExcel=true">导出</el-button>
    <el-button type="primary" icon="el-icon-plus" @click="onOpenPopup">新增</el-button>
  </div>
  <div>

    <el-dialog title="导出excel表" :visible.sync="exportExcel" width="60%">
      <!-- start -->
      <div>
        <span class="demonstration">开始时间</span>
        <el-date-picker
          v-model="exportExcelItems.startTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>

        <span class="demonstration">结束时间</span>
        <el-date-picker
          v-model="exportExcelItems.endTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <!-- end -->

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getExportExcel">确 定</el-button>
      </span>
    </el-dialog>

    <div>

      <el-table :data="tableData" border style="width: 100%">

        <el-table-column prop="name" label="材料名称">
        </el-table-column>

        <el-table-column prop="num" label="需求数量">
        </el-table-column>

        <el-table-column prop="demand_time" label="报价截止时间">
        </el-table-column>

        <el-table-column prop="audit" label="是否审核" :filters="filters" :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.audit === '0' ? 'primary' : 'success'" disable-transitions>{{filters[scope.row.audit].text}}</el-tag>
            
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="125">
          <template slot-scope="scope">
            <el-button @click="dialogVisibleIndex(scope.$index, scope.row ,scope.row.audit)" type="text" size="small">查看</el-button>
            <el-button  type="text" @click="onDeleteOffer(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div>
        <Pagination @handleCurrentChange="offerList" :total="pagination.total"></Pagination>
      </div>

    </div>

    <el-dialog title="新增" :visible.sync="dialogVisible" width="40%">
      <!-- start -->
      <addOffer ref="offer"></addOffer>
      <!-- end -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateData">新 增</el-button>
      </span>
    </el-dialog>

    <el-dialog title="查看" :visible.sync="offerEdit" width="60%">
      <!-- start -->
      <editOffer ref="offerEdit" :offer-id="offerId" :audit="offer_audit"></editOffer>
      <!-- end -->

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="offerEdit = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</div>
</template>

<script>
import {
  getOfferList, offerAdd , offerDelete
} from "@/api/offer";
import Pagination from "../components/Pagination";
import addOffer from "./addOffer";
import editOffer from "./editOffer";
export default {
  components: {
    addOffer, editOffer, Pagination
  },
  props:{
    audit : String
  } ,
  data() {
    return {
      offer_audit:"" ,
      tableData: [],
      dialogVisible: false,
      offerEdit: false,
      exportExcel: false,
      exportExcelItems: {
        startTime: '',
        endTime: ''
      },
      offerId: 0,
      filters: [
        {
          text: '未结束',
          value: '0'
        },{
          text: '已结束',
          value: '1'
        },
        {
          text: '已结束',
          value: '2'
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
      },
    }
  },
  filters: {

  },
  created() {
    this.offerList()
  },
  methods: {
    onDeleteOffer(id){

   this.$confirm('此操作将永久删除该报价, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_=>{
      return new Promise((resolve , reject)=>{
              offerDelete({id}).then(res=>{
               if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                setTimeout(() => {
                  this.$router.go(0);
                }, 3000)
              } else {
                this.$message.error(res.message)
               }
                resolve()
              }).catch(err=>{
                reject(err)
              })
            })
      })
   
     
    } ,

    getExportExcel()
    {
      this.exportExcelItems.startTime = Date.parse(this.exportExcelItems.startTime) / 1000
      this.exportExcelItems.endTime = Date.parse(this.exportExcelItems.endTime) / 1000
      if (this.exportExcel.startTime > this.exportExcelItems.endTime) {
        this.$message.error('开始时间不能大于结束时间，请从新选择!')
        this.exportExcel = false
        return;
      }
      let url = `${process.env.VUE_URL}/excel/export?time=${JSON.stringify(this.exportExcelItems)}`
      window.open(url);
      this.exportExcelItems.startTime = ''
      this.exportExcelItems.endTime = ''
      this.exportExcel = false
    },
    dialogVisibleIndex(index, row , audit) {
      this.offer_audit = audit
      this.offerId = row.id
      this.offerEdit = true
    },
    onOpenPopup() {
      this.dialogVisible = true;
    },
    filterTag(value, row) {
      return row.audit === value;
    },
    offerList(page) {
      if (page !== undefined) {
        this.pagination.page = page
      }
      return new Promise((resolve, reject) => {
        getOfferList(this.pagination).then(res => {
          if (res.status === 200) {
            let {
              data
            } = res
            this.pagination.total = data.total
            this.tableData = data.data
          } else {
            this.$message.error(res.message)
          }
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateData() {
      let items = this.$refs.offer.form
      items.time = Date.parse(items.time) / 1000
      return new Promise((resolve, reject) => {
        offerAdd(items).then(res => {
          if (res.status === 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
            setTimeout(() => {
              this.$router.go(0);
            }, 3000)
          } else {
            this.$message.error(res.message)
          }
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateOffer() {
      console.log('---')
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  background: #ffffff;
  padding: 10px;
}
</style>
