<template>
  <div>
    <div class="header">
      <div class="header-left">
          <el-input

            class="marginSmall widthText"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="keywordValue">
          </el-input>
           <el-date-picker
              size="large"
              v-model="keywordDate"
              class="widthDate marginSmall"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>

           <el-select v-model="filtersVal" placeholder="请选择" class="marginSmall">
           <el-option
              v-for="item in filters"
              :key="item.value"
              :value="item.text">
            </el-option>
          </el-select>

          <el-select v-model="auditFiltersVal" placeholder="请选择" class="marginSmall">
           <el-option
              v-for="item in auditFilters"
              :key="item.value"
              :value="item.text">
            </el-option>
          </el-select>


            <el-button type="primary" @click="onSelectData" class="marginSmall">搜索</el-button>
      </div>

      <el-button type="primary" icon="el-icon-plus" @click="multipleTable">导出</el-button>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          prop="constructionUnits"
          label="施工单位"
        >
        </el-table-column>

        <el-table-column
          prop="constructionName"
          label="工程名称"
        >
        </el-table-column>

        <el-table-column
          prop="constructionDepartment"
          label="施工部位"
        >
        </el-table-column>

        <el-table-column
          prop="concrete"
          label="砼等级"
        >
        </el-table-column>

        <el-table-column
          prop="collapse"
          label="塌落度"
        >
        </el-table-column>

        <el-table-column
          prop="volume"
          label="总方量"
        >
        </el-table-column>

        <el-table-column
          prop="pouring"
          label="浇筑时间"
        >
        </el-table-column>

        <el-table-column
          prop="nickName"
          label="用户昵称"
        >
        </el-table-column>

        <el-table-column
          prop="mobile"
          label="手机号码"
        >
        </el-table-column>

        <el-table-column
          prop="onLineText"
          label="是否上网"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.onLine === '0' ? 'primary' : 'success'"
              disable-transitions>{{filters[scope.row.onLine].text}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="audit"
          label="审核状态"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.audit === '0' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.auditText}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="130">
          <template slot-scope="scope">
            <el-button @click="dialogVisibleIndex(scope.$index, scope.row)" type="text" size="small">查看</el-button>
            <el-button  type="text" @click="onDeleteReport(scope.row.id)" size="small">删除</el-button>
            <el-button v-if="scope.row.audit === '2'" @click="subscribeMessageSend(scope.$index, scope.row)" type="text" size="small">通知</el-button>
          </template>
        </el-table-column>

      </el-table>

      <Pagination @handleCurrentChange="getList" :total="pagination.total"></Pagination>

      <el-dialog
        title="报料详情"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <materialInfo :Id="id"></materialInfo>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">确 定</el-button>
      </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import Pagination from "../components/Pagination";
  import materialInfo from "./materialInfo";
  import { materialList, subscribeMessage , deleteMaterial , sendmes} from "../../api/material";
  import {format} from "../../utils/every";
  export default {
  components: {
    Pagination, materialInfo
  },
  data() {
    return {
        // header 筛选start
      keywordValue:"" ,
      keywordDate:"" ,
       // header 筛选end
      tableData: [],
      dialogVisible: false,
      id: '',
      filters: [
        {text: '否', value: '0'},
        {text: '是', value: '1'},
      ],
      filtersVal:"",
      auditFilters: [
        {text: '待审核', value: '0',},
        {text: '未通过', value: '1',},
        {text: '已通过', value: '2',}
      ],
      auditFiltersVal:"" ,
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {

   onDeleteReport(id){
      this.$confirm('此操作将永久删除该报价, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_=>{
      return new Promise((resolve , reject)=>{
              deleteMaterial({id}).then(res=>{
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

    // 查询搜索数据
    onSelectData(){
      // 初始化会第一页在进行查询
      this.pagination = {page: 1, limit: 10, total: 0};
      if(this.keywordDate){
          let start_time = format(this.keywordDate[0].getTime() , 'YYYY-MM-DD HH:mm:ss');
          let end_time =  format(this.keywordDate[1].getTime() , 'YYYY-MM-DD HH:mm:ss');
          Object.assign(this.pagination , {name:this.keywordValue ,start_time , end_time })
      }else{
          Object.assign(this.pagination , {name:this.keywordValue})
      }
      
      let filtersIndex , auditFiltersIndex;
      this.filters.map(item =>{
         if(item.text === this.filtersVal) filtersIndex = item.value;
      })

        this.auditFilters.map(item =>{
         if(item.text === this.auditFiltersVal) auditFiltersIndex = item.value;
      })
 
      Object.assign(this.pagination , {name:this.keywordValue , audit:auditFiltersIndex , online:filtersIndex})

         this.getList()

} ,

    multipleTable()
    {
      // 获取所选的报料列表
      let items = this.$refs.multipleTable.selection
      let ids = {}
      items.forEach((res, index) => {
        ids[index] = res.id
      })
      if (Object.keys(ids).length === 0) {
        this.$message.error('请勾选需要导出数据')
        return
      }
      let url = `${process.env.VUE_URL}/excel/materialIds?ids=${JSON.stringify(ids)}`
      window.open(url);
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    dialogVisibleIndex(index, row)
    {
      this.id = row.id
      this.dialogVisible = true
    },
    subscribeMessageSend(index, row)
    {
        let data = {
          mobile:row.mobile , 
          name:row.constructionUnits ,
          time:row.pouring
        }   
        
      return new Promise((resolve, reject) => {
        sendmes(data).then(res => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: '发送成功！'
            })
          } else {
            this.$message.error('发送失败！请联系技术人员')
          }
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    getList(page , a)
    {
      if (page !== undefined) {
        this.pagination.page = page
      }
      return new Promise((resolve, reject) => {
        materialList(this.pagination).then(res => {
          if (res.status === 200) {
            let { data } = res
            this.pagination.total = data.total
            this.tableData = data.data
            this.tableData.forEach(item=>{
                item.collapse = item.get_unload.name
                item.concrete = item.get_concrete.name + " " + item.get_concretes.name
            })
            
            console.log(data.data, '------------!')
            resolve()
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateData()
    {
      // TODO
      return new Promise((resolve, reject) => {

      })
    }
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    background: #ffffff;
    padding: 10px;
  }
  .header-left{
    display: flex;
  }
  .marginSmall{
    margin-right: 20px ;
  }
  .widthDate{
    width: 400px;
  }
  .widthText{
    width:300px;
  }
</style>
