<template>
  <div>
    <div class="header">
      <el-button type="primary" icon="el-icon-plus" @click="onOpenPopup">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">

      <el-table-column prop="id" label="id">
      </el-table-column>

      <el-table-column
        prop="account"
        label="账号"
      >
      </el-table-column>

      <el-table-column
        prop="name"
        label="姓名"
      >
      </el-table-column>

      <el-table-column
        prop="mobile"
        label="手机"
      >
      </el-table-column>

      <el-table-column
        prop="avatarUrl"
        label="头像"
      >
        <template slot-scope="scope">
          <PreviewImage :url="scope.row.avatarUrl"></PreviewImage>
        </template>
      </el-table-column>

      <el-table-column
        prop="prohibit"
        label="是否禁用"

        :filters="filters"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.prohibit === '0' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.prohibitText}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="open(scope.$index, scope.row)">删除</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <div v-if="dialogVisible">
        <el-form label-width="100px">

          <el-form-item label="账号">
            <el-input v-model="editUser.account" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input v-model="editUser.pwd" placeholder="为空的时候不修改"></el-input>
          </el-form-item>

          <el-form-item label="手机号码">
            <el-input v-model="editUser.mobile" placeholder="请输入手机号码"></el-input>
          </el-form-item>

          <el-form-item label="名称">
            <el-input v-model="editUser.name" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <UploadImage
              ref="imageUpload"
              :url="editUser.avatarUrl"
              :action="imageUrl"
              :limit="1"
              :headers="headers"
            ></UploadImage>
          </el-form-item>

          <el-switch
            v-model="editUser.prohibit"
            active-value="1"
            inactive-value="0"
            active-text="启动"
            inactive-text="禁用">
          </el-switch>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dataHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import storage from '@/utils/storage'
  import { adminList, adminUserUpdate, adminUserAdd, adminUserDeleted } from '@/api/user'
  import PreviewImage from "../components/PreviewImage";
  import UploadImage from "../components/UploadImage";
  export default {
    components: {
      PreviewImage,
      UploadImage
    },
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        filters: [
          {text: '禁用', value: '0'},
          {text: '启用', value: '1'},
        ],
        editUser: {},
        imageUrl: '',
        isAdd: false,
        headers: {}
      }
    },
    created() {
      this.headers = {
        Authorization:  storage.get('TOKEN')
      }
      this.imageUrl = `${process.env.VUE_API_URL}/imageUploadToken/imageUpload`
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
            adminUserDeleted({
              id: row.id
            }).then(res => {
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                resolve()
                setTimeout(() => {
                  this.$router.go(0);
                }, 3000)
              } else {
                this.$message.error(res.data.message)
              }
            }).catch(err => {
              reject(err)
            })
          })
        }).catch(() => {});
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      handleClick(row) {
        this.editUser = row
        this.isAdd = false
        this.dialogVisible = true
      },
      onOpenPopup()
      {
        this.isAdd = true
        this.editUser = {}
        this.dialogVisible = true
      },
      dataHandle()
      {
        if (this.$refs.imageUpload.dataImageUrl[0]) {
          this.editUser.avatarUrl = this.$refs.imageUpload.dataImageUrl[0]
        }
        if (this.isAdd) {
          this.adminAdd()
        } else {
          this.adminUpload()
        }
      },
      adminAdd()
      {
        return new Promise((resolve, reject) => {
          adminUserAdd({
            items: this.editUser
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: '添加成功!'
              })
              setTimeout(() => {
                this.$router.go(0);
              }, 3000)
              resolve()
            } else {
              this.$message.error(res.message)
            }
          }).catch(err => {
            reject(err)
          })
        })
      },
      adminUpload()
      {
        return new Promise((resolve, reject) => {
          adminUserUpdate({
            items: this.editUser
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: '修改成功!'
              })
              setTimeout(() => {
                this.$router.go(0);
              }, 3000)
              resolve()
            } else {
              this.$message.error(res.message)
            }
          }).catch(err => {
            reject(err)
          })
        })
      },
      getUserList()
      {
        return new Promise((resolve, reject) => {
          adminList().then(res => {
            if (res.status === 200) {
              let { data } = res
              this.tableData = data
              resolve()
            }
          }).catch(err => {
            reject(err)
          })
        })
      }
    },
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
