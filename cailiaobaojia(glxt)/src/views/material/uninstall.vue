<template>
  <div>
    <div class="header">
      <!-- <el-button type="primary" icon="el-icon-plus" @click="_uninstallAndConcrete" >清除前端 卸料缓存</el-button> -->
      <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true" >新增</el-button>
    </div>

    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div>
        <el-input v-model.trim="uninstallName" style="width: 60%;" placeholder="请输入内容"></el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uninstallsAdd">新 增</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        sortable
        width="180">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="dialogVisibleIndex(scope.$index, scope.row)">修改</el-button>

          <el-button
            size="mini"
            @click="uninstallDeletes(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { uninstallList, uninstallUpdate,
    uninstallDelete, uninstallAdd,
    uninstallAndConcrete} from "../../api/material";
  export default {
      name: "uninstall",
      data() {
        return {
          tableData: [],
          dialogVisible: false,
          uninstallName: ''
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
        getList()
        {
          return new Promise((resolve, reject) => {
            uninstallList().then(res => {
              if (res.status === 200) {
                this.tableData = res.data
              }
              resolve()
            }).catch(err => {
              reject(err)
            })
          })
        },
        dialogVisibleIndex(index, row)
        {
          if(row.name == ""){
          this.$message.error("内容不能为空")
          return
        }
          return new Promise((resolve, reject) => {
            uninstallUpdate({
              data: row
            }).then(res => {
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: '修改成功！'
                })
              } else {
                this.$message.error('修改失败！请刷新页面再试！')
              }
              resolve()
            }).catch(err => {
              reject(err)
            })
          })
        },
        uninstallDeletes(index, row)
        {
          this.$confirm('此操作将永久删除该卸料, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return new Promise((resolve, reject) => {
              uninstallDelete({
                data: row
              }).then(res => {
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
              }).catch(err => {
                reject(err)
              })
            })
          }).catch(() => {});
        },
        uninstallsAdd()
        {
          if (this.uninstallName === '') {
            this.$message.error('名称不能为空！')
          }
          return new Promise((resolve, reject) => {
            uninstallAdd({
              name: this.uninstallName
            }).then(res => {
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: '添加成功！'
                })
                setTimeout(() => {
                  this.$router.go(0);
                }, 3000)
              } else {
                this.$message.error(res.data.message)
              }
              resolve()
            }).catch(err => {
              reject(err)
            })
          })
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
