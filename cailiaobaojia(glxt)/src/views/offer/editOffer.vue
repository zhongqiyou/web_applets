<template>
  <div v-if="form">
    <el-form ref="form" label-width="100px">
      <el-form-item label="材料名称">
        <span>{{ form.name }}</span>
      </el-form-item>

      <el-form-item label="需求数量">
        <span>{{ form.num }}</span>
      </el-form-item>

      <el-form-item label="需求周期">
        <span>{{form.demand_times}}</span>
      </el-form-item>
     
      <div v-if="audit == 2">
      <div v-if="form.get_user_offer" v-for="item in form.get_user_offer">
         <!-- {{item}} -->
        <info :items="item"></info>
      </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { offerInfo } from "../../api/offer";
  import { userInfo } from "../../api/user";
  import info from "./info";
  // import { offerUserAudit } from "../../api/offer";

  export default {
    components: {
      info
    },
  name: "editOffer",
  props: {
    offerId: Number,
    audit:String
  },
  data() {
    return {
      form: {
        get_offer_specification: []
      },
      user: {},
      userAudit: {},
      id: 0,
    }
  },
  created() {
    this.id = this.offerId
    this.getUserOfferInfo()
  },
  methods: {
    upOfferInfo()
    {
      return new Promise((resolve, reject) => {
        offerInfo({
          id: this.id
        }).then(res => {
          if (res.status === 200) {
            let { data } = res
            data.demand_time = new Date(data.demand_time * 1000)
            data.material_time = data.material_time ? new Date(data.material_time * 1000) : ''
            this.form = data
            console.log(this.form, '----------!')
            resolve()
            // resolve(this.upUserInfo())
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    upUserInfo()
    {
      if (this.form.audit != 2 && this.form.user_id != 0) {
        return new Promise((resolve, reject) => {
          userInfo({
            userId: this.form.user_id,
            audit: 2
          }).then(res => {
            if (res.status == 200) {
              this.user = res.data
              resolve()
            }
          }).catch(err => {
            this.$message.error(err.message)
            reject(err)
          })
        })
      }
    },
    getUserOfferInfo()
    {
      this.upOfferInfo()

      /*offerUserAudit({
        id: this.id
      }).then(res => {
        if (res.status === 200) {
          this.userAudit = res.data
        } else {
          this.$message.error(res.status)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })*/
    }
  },
    filters: {
      auditText: function (val) {
        let arr = ['待审核', '未通过', '已通过'];
        return arr[val]
      }
    },
    watch: {
      offerId: {
        handler(val, olbVal) {
          if (val !== this.id) {
            this.id = val
            this.getUserOfferInfo()
          }
        },
        deep: true
      }
    }
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
