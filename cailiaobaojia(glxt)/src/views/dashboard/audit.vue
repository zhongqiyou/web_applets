<template>
<div>
  <el-table :data="tableData" border style="width: 100%">

    <el-table-column prop="id" label="id">
    </el-table-column>

    <el-table-column prop="nickName" label="姓名">
    </el-table-column>

    <el-table-column prop="mobile" label="手机">
    </el-table-column>

    <el-table-column prop="company" label="公司名称">
    </el-table-column>

    <el-table-column prop="identityText" label="身份">
    </el-table-column>

    <el-table-column prop="identityAdminText" label="是否管理">
    </el-table-column>

    <el-table-column prop="avatarUrl" label="头像">
      <template slot-scope="scope">
        <img style="width: 50px; height: 50px" :src="scope.row.avatarUrl" alt="">
      </template>
    </el-table-column>

    <el-table-column prop="prohibit" label="是否禁用" :filters="filters" :filter-method="filterTag" filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag :type="scope.row.prohibit === '0' ? 'primary' : 'success'" disable-transitions>{{scope.row.prohibitText}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="text" @click="open(scope.$index, scope.row)">删除</el-button>
        <el-button @click="dialogVisibleIndex(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>

  </el-table>

  <Pagination @handleCurrentChange="getUserList" :total="pagination.total"></Pagination>

  <el-dialog title="编辑" :visible.sync="dialogVisible" width="60%">
    <userInfo ref="userItems" audit="0" :isAudit="true" :user-id="userId"></userInfo>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateData">修 改</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import {
  auditList,
  updateUserAudit,
  deletedUser
} from "../../api/user";
import Pagination from "../components/Pagination";
import userInfo from "./userInfo";
export default {
  components: {
    Pagination,
    userInfo
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [
        {
          get_inside_audit_info: {},
          get_project_audit_info: {},
          get_supplier_audit_info: {}
        }
      ],
      filters: [{
          text: '禁用',
          value: '0'
        },
        {
          text: '启用',
          value: '1'
        },
      ],
      userId: 0,
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        audit: 0
      },
    }
  },
  filters: {

  },
  created() {
    this.getUserList()
  },
  methods: {
    open(value, row)
    {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        new Promise((resolve, reject) => {
          deletedUser({
            id: row.id
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
          }).catch(err => {
            reject(err)
          })
        })
      }).catch(() => {});
    },
    filterTag(value, row) {
      return row.prohibit === value;
    },
    handleClick(row) {
      console.log(row);
    },
    dialogVisibleIndex(index, row) {
      this.userId = row.id
      this.dialogVisible = true
    },
    getUserList(page) {
      if (page !== undefined) {
        this.pagination.page = page
      }
      return new Promise((resolve, reject) => {
        auditList(this.pagination).then(res => {
          if (res.status === 200) {
            let {
              data
            } = res
            this.pagination.total = data.total
            data.data.forEach((res, index) => {
              if (res.get_inside_audit_info) {
                data.data[index].company = '本平台人员'
              } else {
                if (!res.get_project_audit_info && !res.get_supplier_audit_info) {
                  data.data[index].company = '本平台人员'
                  return
                }
                data.data[index].company = res.get_project_audit_info
                  ?
                  res.get_project_audit_info.project_name
                  :
                  res.get_supplier_audit_info.supplier_name
              }
            })
            this.tableData = data.data
            resolve()
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateData() {
      return new Promise((resolve, reject) => {
        updateUserAudit({
          userId: this.userId,
          projectIds:"" ,
          items: this.$refs.userItems.infoData
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
            setTimeout(() => {
              this.$router.go(0);
            }, 3000)
            resolve()
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
</script>
