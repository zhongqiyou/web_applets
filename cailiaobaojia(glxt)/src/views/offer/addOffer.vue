<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="材料名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="需求数量">
        <el-input v-model="form.num"></el-input>
      </el-form-item>

      <el-form-item label="需求周期">
        <el-input  v-model="form.times"></el-input>
      </el-form-item>

      <el-form-item label="需求地点">
        <el-input v-model="form.demand" ></el-input>
      </el-form-item>

      <el-form-item label="报价截止时间">
        <el-date-picker v-model="form.time" type="datetime" placeholder="选择日期" class="formDate">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="用户">
        <el-select multiple v-model="form.userId" placeholder="请选择用户" class="formUser">
          <el-option v-for="(item , index) in userInfo" :key="index" :label="item.nick_name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="审核用户">
        <el-checkbox-group
          v-model="form.userAdminId"
          :min="1"
          :max="2">
          <el-checkbox v-for="item in userAdmin" :label="item.id" :key="item.id">{{ item.get_inside.nick_name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="新增材料">
        <div class="formAdd">
          <el-button type="primary" icon="el-icon-plus" circle @click="onAddMaterial"></el-button>
        </div>
      </el-form-item>

      <el-form-item label="">
        <table class="formChildTable" border="1" cellspacing="0" cellpadding="0" v-if="form.offer.length > 0">
          <tr>
            <th>材料名称</th>
            <th>规格</th>
            <th>操作</th>
          </tr>

          <tr v-for="(item , index) in form.offer" :key="index">
            <td>
              <el-input v-model="item.name" placeholder="请填写材料名称"></el-input>
            </td>
            <td>
              <el-input v-model="item.specification" placeholder="请填写规格"></el-input>
            </td>
            <td>
              <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="onAddMaterialDelete(index)"></el-button>
            </td>
          </tr>
        </table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getSupplierList, getUserAdminList } from "../../api/user";
  export default {
  name: "addOffer",
  props: {
  },
  data() {
    return {
      form: {
        offer: [],
        userAdminId: []
      },
      userInfo: [],
      userAdmin: [],
    }
  },
  created() {
    this.getUserSupplierList()
  },
  methods: {
    getAdminList()
    {
      getUserAdminList().then(res => {
        if (res.status === 200) {
          this.userAdmin = res.data
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    getUserSupplierList()
    {
      return new Promise((resolve, reject) => {
        getSupplierList().then(res => {
          if (res.status === 200) {
            this.userInfo = res.data
            resolve(this.getAdminList())
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    onAddMaterial() {
      this.form.offer.push({
        name: "",
        specification: ""
      })
    },
    onAddMaterialDelete(index) {
      this.form.offer.splice(index, 1)
    },
  },
}
</script>

<style>
  .formDate,
  .formUser,
  .formAdd {
    display: flex;
    justify-content: flex-start;
  }

  .formChildTable {
    width: 100%;
    border-color: rgba(220, 223, 230, 0.3);
  }
</style>
