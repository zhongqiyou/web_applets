<template>
  <div v-if="is">
    <el-form-item label="报价时间">
      <el-input v-model="offerInfo.material_time" readonly></el-input>
    </el-form-item>

    <el-form-item label="报价单照片">
      <img v-bind:src="imageUrl(offerInfo.image_url)" style="width: 100px;height: 100px" alt="">
    </el-form-item>

    <div v-if="offerInfo.get_user">
      <el-form-item label="报价用户名称">
        <el-input v-model="offerInfo.get_user[0].get_supplier_audit_info.nick_name" readonly ></el-input>
      </el-form-item>

      <el-form-item label="报价用户手机">
        <el-input v-model="offerInfo.get_user[0].get_supplier_audit_info.mobile" readonly ></el-input>
      </el-form-item>

      <!-- <el-form-item label="报价用户头像">
        <img :src="offerInfo.get_user.avatar_url" style="width: 100px;height: 100px" alt="">
      </el-form-item> -->

      <div v-if="offerInfo.get_user.get_supplier">
        <el-form-item label="用户公司名称">
          <el-input v-model="offerInfo.get_user.get_supplier.supplier_name"></el-input>
        </el-form-item>
      </div>
    </div>

    <el-form-item label="审核团" v-if="false">
      <table class="formChildTable" border="1" cellspacing="0" cellpadding="0" v-if="offerInfo.get_offer_specification.length > 0">
        <tr>
          <th>审核名称</th>
          <th>审核手机</th>
          <th>审核头像</th>
          <th>是否通过</th>
        </tr>

        <tr v-for="(item , index) in userAudit" :key="index">
          <td>
            <span>{{ item.get_user.nick_name }}</span>
          </td>
          <td>
            <span>{{ item.get_user.mobile }}</span>
          </td>
          <td>
            <img :src="item.get_user.avatar_url" style="width: 50px;height: 50px" alt="">
          </td>
          <td>
            <span>{{ item.audit | auditText }}</span>
          </td>
        </tr>

      </table>
    </el-form-item>

    <el-form-item label="">
      <table class="formChildTable" border="1" cellspacing="0" cellpadding="0" v-if="offerInfo.get_offer_user.length > 0">
        <tr>
          <th>材料名称</th>
          <th>规格</th>
          <th>上周报价</th>
          <th>本周报价</th>
          <th>备注</th>
        </tr>

        <tr v-for="(item , index) in offerInfo.get_offer_user" :key="index">
          <td>
            <span>{{ item.name }}</span>
          </td>
          <td>
            <span>{{ item.specification }}</span>
          </td>
          <td>
            <span>{{ item.up_money }}</span>
          </td>
          <td>
            <span>{{ item.money }}</span>
          </td>
          <td>
            <span>{{ item.remarks }}</span>
          </td>
        </tr>

      </table>
    </el-form-item>
  </div>
</template>

<script>
    export default {
      name: "info",
      props: {
        items: Object,
      },
      data() {
        return {
          offerInfo: {
           get_offer_user:[{}] ,
           get_user:[{
             get_supplier:{} ,
             get_supplier_audit_info:{}
           }]
          },
          is: false
        }
      },
      created() {
        this.is = true
        this.offerInfo = this.items;
    

      },
      methods: {
        imageUrl(data)
        {
          return `${process.env.VUE_APP_IMAGE_URL}${data}`
        },
      },
      watch: {
        items: {
          handler(val, olbVal) {
            console.log(this.items, '------------!@#')
          },
          deep: true
        }
      }
    }
</script>

<style scoped>

</style>
