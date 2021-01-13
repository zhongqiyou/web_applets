<template>
  <el-row>
    <div class="login">
      <div class="login-title">登录</div>
      <div class="login-user">
        <el-input v-model="userItems.username" type="text" placeholder="用户名"  suffix-icon="el-icon-user"></el-input>
      </div>
      <div class="login-pass">
        <el-input v-model="userItems.password" type="password" placeholder="密码"   suffix-icon="el-icon-goods"></el-input>
      </div>
      <div class="login-send">
        <el-button @click="clickLogin" type="primary">登录</el-button>
      </div>
    </div>
  </el-row>
</template>

<script>
  import { getLogin } from '@/api/login'
  import storage from '@/utils/storage'
export default {
  name: 'Login',
  data() {
    return {
      userItems: {
        username: '',
        password: ''
      },
    }
  },
  filters: {

  },
  created() {

  },
  methods: {
    clickLogin() {
      return new Promise((resolve, reject) => {
        getLogin(this.userItems).then(res => {
          let { data } = res
          if (res.status === 200) {
            storage.set('TOKEN', `Bearer ${data.token}`)
            storage.set('USER_INFO', JSON.stringify(data))
            this.$router.push({ path: '/' })
            resolve()
          } else {
            this.$message.error(res.message)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
</script>

<style>
  .login{
    margin: 100px auto;
    width: 400px;
    height: 250px;
    background: #ffffff;
    padding: 20px 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .login-title{
    text-align: center;
    color: #666666;
  }
  .login-user{
    display: flex;

  }
  .login-pass{
    display: flex;

  }
  .login-send{
    text-align: right;
  }
</style>
