<template>
<div>
  <el-form ref="form" label-width="150px">

    <!-- 公共 start-->
    <el-form-item label="头像" class="userImg">
      <img :src="infoData[0].avatar_url" width="100" height="100" alt="">
    </el-form-item>

    <el-form-item v-if="isAudit" label="审核">
      <el-radio-group v-model="infoData[0].audit">
        <el-radio label="0">未审核</el-radio>
        <el-radio label="1">未通过</el-radio>
        <el-radio label="2">通过</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="身份">
      <el-radio-group v-model="infoData[0].identity">
        <el-radio disabled label="0">未确定身份</el-radio>
        <el-radio disabled label="1">供应商</el-radio>
        <el-radio disabled label="2">项目方</el-radio>
        <el-radio disabled label="3">内部人员</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="是否管理">
      <el-radio-group v-model="infoData[0].identity_admin">
        <el-radio disabled label="0">未确定</el-radio>
        <el-radio disabled label="1">员工</el-radio>
        <el-radio disabled label="2">管理</el-radio>
      </el-radio-group>
    </el-form-item>

   <el-form-item label="绑定公司" v-if="infoData[0].get_inside_audit_info && infoData[0].identity_admin == '1'">
     <el-select v-model="company" multiple @change="onChengeCompany" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="手机号码">
      <el-input v-model="infoData[0].mobile"></el-input>
    </el-form-item>

    <el-form-item label="名称">
      <el-input v-model="infoData[0].nick_name"></el-input>
    </el-form-item>

    <el-form-item label="是否禁用">
      <el-radio-group v-model="infoData[0].prohibit">
        <el-radio label="0">禁用</el-radio>
        <el-radio label="1">启用</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- 公共 end-->

    <!-- 不应该给用户随意修改企业信息 start -->

   <div v-if="infoData[0].get_inside_audit_info">
      <el-form-item  label="个人姓名">
          <el-input v-model="infoData[0].get_inside_audit_info.nick_name"></el-input>
        </el-form-item>

        <el-form-item  label="个人手机">
          <el-input v-model="infoData[0].get_inside_audit_info.mobile"></el-input>
        </el-form-item>
   </div>

    <div v-if="infoData[0].get_project_audit_info">
      <el-form-item  label="负责人手机号码">
        <el-input v-model="infoData[0].get_project_audit_info.admin_mobile"></el-input>
      </el-form-item>

      <el-form-item  label="负责人姓名">
        <el-input v-model="infoData[0].get_project_audit_info.admin_nick_name"></el-input>
      </el-form-item>

      <el-form-item  label="个人姓名">
        <el-input v-model="infoData[0].get_project_audit_info.nick_name"></el-input>
      </el-form-item>

      <el-form-item  label="个人手机">
        <el-input v-model="infoData[0].get_project_audit_info.mobile"></el-input>
      </el-form-item>

      <el-form-item  label="项目方公司名称">
        <el-input v-model="infoData[0].get_project_audit_info.project_name"></el-input>
      </el-form-item>
    </div>

    <div v-if="infoData[0].get_project" >
      <el-form-item  label="负责人手机号码">
        <el-input v-model="infoData[0].get_project.admin_mobile"></el-input>
      </el-form-item>

      <el-form-item  label="负责人姓名">
        <el-input v-model="infoData[0].get_project.admin_nick_name"></el-input>
      </el-form-item>

      <el-form-item  label="项目方公司名称">
        <el-input v-model="infoData[0].get_project.project_name"></el-input>
      </el-form-item>
    </div>

    <div v-if="infoData[0].get_supplier_audit_info">
      <el-form-item label="供应方公司名称">
        <el-input v-model="infoData[0].get_supplier_audit_info.supplier_name"></el-input>
      </el-form-item>

      <el-form-item label="营业执照注册号">
        <el-input v-model="infoData[0].get_supplier_audit_info.registration_number"></el-input>
      </el-form-item>

      <el-form-item label="统一社会信用号">
        <el-input v-model="infoData[0].get_supplier_audit_info.credit_number"></el-input>
      </el-form-item>

      <el-form-item label="注册联系人">
        <el-input v-model="infoData[0].get_supplier_audit_info.nick_name"></el-input>
      </el-form-item>

      <el-form-item label="联系人手机号码">
        <el-input v-model="infoData[0].get_supplier_audit_info.mobile"></el-input>
      </el-form-item>

      <el-form-item label="执照图片">
        <img v-bind:src="imageUrl(infoData[0].get_supplier_audit_info.image_url)" alt="">
      </el-form-item>
    </div>

    <!--  子级  end -->

  </el-form>
  <!-- end -->
</div>
</template>

<script>
import {
  userInfo
} from "../../api/user";
export default {
  name: "userInfo",
  props: {
    userId: Number,
    audit: {
      type: String,
      default: '0'
    },
    isAudit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      company:[] ,
      companyId:[] ,

       options: [],

      item: {
        userId: 0,
        audit: 0,
      },
      infoData: 
       [{
        get_project_audit_info: {},
        get_supplier_audit_info: {},
        get_inside: {},
        get_project: {},
        get_supplier: {}
       }]
      

    }
  },
  created() {
    this.item.userId = this.userId
    this.item.audit = parseInt(this.audit)
    this.getUserInfo()
  },
  methods: {
    onChengeCompany(arr){
      this.companyId = [];
       this.options.map((item) => {
            arr.map((itemchild)=>{
                 if(item.value === itemchild) return this.companyId.push(item.label); 
            })
        });  
        this.companyId = this.companyId;

    } ,

    getUserInfo() {
      return new Promise((resolve, reject) => {
        userInfo(this.item).then(res => {
          if (res.status === 200) {
            const _this = this;
            this.options = [];
            this.company = [];
            this.companyId = [];
            this.infoData = res.data[0];
            let arr = res.data[0][0].project_ids;
            if(arr){
              arr =  arr.split(",");
            }
            console.log(res.data[1] , "`````````````");
             res.data[1].map((item) => {
               console.log(item , "```````");
               this.options.push({value:item.get_project.project_name , label:item.get_project.id});
                if(arr){
                   arr.map(itemchild =>{
                 if(itemchild == item.get_project.id){
                    _this.company.push(item.get_project.project_name);
                    _this.companyId.push(item.get_project.id)
                 }
               })
                }
             });
              
               
              
             resolve()
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    imageUrl(data)
    {
      return `${process.env.VUE_APP_IMAGE_URL}${data}`
    },
  },
  watch: {
    userId: {
      handler(val, olbVal) {
        if (val !== this.item.userId) {
          this.item.userId = val
          this.getUserInfo()
        }
      },
      deep: true
    }
  }
}
</script>

<style>
.el-form-item__content {
  text-align: left !important;
}

.userImg {
  display: flex;
  align-items: center;
  text-align: left;
}

.userImg>div {
  margin-left: 0 !important;
  line-height: 0 !important;
}
</style>
