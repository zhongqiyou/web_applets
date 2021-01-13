<template>
  <div>
    <div class="header">
      <el-button type="primary" icon="el-icon-plus" @click="exportExcel">导出</el-button>
    </div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="施工单位">
        <span>{{ form.construction_units }}</span>
      </el-form-item>

      <el-form-item label="工程名称">
        <span>{{ form.construction_name }}</span>
      </el-form-item>

      <el-form-item label="施工部门">
        <span>{{ form.construction_department }}</span>
      </el-form-item>

      <el-form-item label="砼等级">
        <span>{{ form.get_concrete }}</span>
      </el-form-item>

      <el-form-item label="卸料方式">
        <span>{{ form.get_uninstall }}</span>
      </el-form-item>

      <el-form-item label="塌落度">
        <span>{{ form.collapse }}</span>
      </el-form-item>

      <el-form-item label="总方量">
        <span>{{ form.volume }}</span>
      </el-form-item>

      <el-form-item label="是否上线">
        <span>{{ form.on_line | onLineText }}</span>
      </el-form-item>

      <el-form-item label="浇筑时间">
        <span>{{ form.pouring }}</span>
      </el-form-item>

      <el-form-item label="用户昵称">
        <span>{{ form.nick_name }}</span>
      </el-form-item>

      <el-form-item label="手机号码">
        <span>{{ form.mobile }}</span>
      </el-form-item>

      <el-form-item label="审核状态">
        <span>{{ form.audit | auditText }}</span>
      </el-form-item>

    </el-form>
    <!-- end -->
  </div>
</template>

<script>
  import { getMaterialInfo } from "../../api/material";
  export default {
      name: "userInfo",
      props: {
        Id: Number,
      },
      data() {
          return {
            form: {
              get_concrete: {name:""},
              get_uninstall: {name:""}
            },
            materialId: 0,
          }
      },
      created() {
        this.materialId = this.Id
        this.getMaterial()
      },
      methods: {
        exportExcel()
        {
          let id = this.materialId
          let url = `${process.env.VUE_URL}/excel/material?id=${id}`
          window.open(url);
        },
        getMaterial()
        {
          return new Promise((resolve, reject) => {
            getMaterialInfo({
              id: this.materialId
            }).then(res => {
              if (res.status === 200) {
               
               this.$set(this,'form' , res.data);
               let str = `${res.data.get_concrete.name} ${res.data.get_concretes.name}`;
               console.log(str);
               this.form.get_concrete = str;
               this.form.get_uninstall = res.data.get_uninstall.name;
               this.form.collapse = res.data.get_unload.name;
               console.log(res.data , "````````````````````");
              }
              resolve()
            }).catch(err => {
              reject(err)
            })
          })
        }
      },
    filters: {
      auditText(val) {
        let arr = ['待审核', '未通过', '已通过']
        return arr[val]
      },
      onLineText(val) {
        let arr = ['否', '是']
        return arr[val]
      }
    },
      watch: {
        Id: {
          handler(val, olbVal) {
            if (val !== this.materialId) {
              this.materialId = val
              this.getMaterial()
            }
          },
          deep: true
        }
      }
    }
</script>

<style>
  .el-form-item__content{
    text-align: left !important;
  }
</style>
