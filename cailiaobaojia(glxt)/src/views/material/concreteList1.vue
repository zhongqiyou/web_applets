<template>
  <div style="width:49%;">
    <div class="header" >
      <!-- <el-button type="primary" icon="el-icon-plus" @click="_uninstallAndConcrete" >清除前端 砼缓存</el-button> -->
      <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true" >新增</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        border>
        <el-table-column
          prop="id"
          label="id"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          sortable
          width="180">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容"  v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="dialogVisibleIndex(scope.$index, scope.row)">修改</el-button>

            <el-button
              size="mini"
              @click="concreteDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >

      

      <div>
        <el-input v-model.trim="concreteName" style="width: 60%;" placeholder="请输入内容"></el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="concreteAdd">新 增</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {getConcreteList, concreteUpdate, concreteAdd, concreteDelete, uninstallAndConcrete} from "../../api/material";
  export default {
    components: {

    },
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        pid: 0,
        concreteName: ''
      }
    },
    created() {
      this.getList()
    },
    methods: {
      _uninstallAndConcrete()
      {
        return new Promise((resolve, reject) => {
          uninstallAndConcrete().then(res => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: '清除缓存成功！'
              })
            }
          })
        })
      },
      concreteAdd()
      {
       const _this = this;
       if (this.concreteName === '') {
          this.$message.error('名称必填')
          return
        }
            

        return new Promise((resolve, reject) => {
          concreteAdd({
            name: _this.concreteName , 
            type:1
          }).then(res => {
            if (res. status === 200) {
              this.$message({
                type: "success",
                message: '添加成功！'
              })
              resolve()
              setTimeout(() => {
                this.$router.go(0);
              }, 3000)
            } else {
              this.$message.error(res.data.message[0])
              resolve()
            }
          }).catch(err => {
            reject(err)
          })
        })
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      concreteDelete(index, row)
      {
        this.$confirm('此操作将永久删除该砼, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return new Promise((resolve, reject) => {
            concreteDelete({
              id: row.id
            }).then(res => {
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: '删除成功！'
                })
                resolve()
                setTimeout(() => {
                  this.$router.go(0);
                }, 3000)
              } else {
                this.$message.error(res.message)
              }
            }).catch(err => {
              reject(err)
            })
          })
        }).catch(() => {});
      },
      dialogVisibleIndex(index, row)
      {
       if(row.name == ""){
        this.$message.error("内容不能为空")
         return
        }
        return new Promise((resolve, reject) => {
          concreteUpdate({
            data: row
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: '修改成功！'
              })
            } else {
              this.$message.error(res.message)
            }
            resolve()
          }).catch(err => {
            reject(err)
          })
        })
      },
      getList(page)
      {
        if (page !== undefined) {
          this.pagination.page = page
        }
        return new Promise((resolve, reject) => {
          getConcreteList({
            type:1
          }).then(res => {
            if (res.status === 200) {
              this.tableData = res.data
              console.log(res)
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
    width:100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    background: #ffffff;
    padding: 10px;
  }
</style>
