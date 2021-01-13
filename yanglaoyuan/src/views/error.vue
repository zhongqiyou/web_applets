<template>
  <div class="login">
    <div class="login-cn">
      <i-select :model.sync="seleModel" style="width:1rem;">
        <i-option v-for="(item,index) in seleData" :key="index" :value="item.value">{{ item.label }}</i-option>
      </i-select>
    </div>
    <div class="login-main">
      <div class="main-title">The Nursing Home</div>
      <div class="main-form">
        <div class="form-info">
          <img src="../assets/images/error.png" alt="">
          <h2>The ID or password is incorrect</h2>
          <p>Please enter your ID orpassword again</p>
        </div>
        <div class="main-button">
          <button class="enter">Datemine</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      seleData:[
        {
          value: 'Chinese',
          label: 'Chinese'
        },
        {
          value: 'English',
          label: 'English'
        }
      ],
      seleModel:'Chinese'
    }
  }
}
</script>

<style lang="less">

  .login{
    width: 100vw;
    height: 100vh;
    background: url('../assets/images/bg.png');
    background-size: cover;
    .login-cn{
      padding: .36rem /* 37/102 */ .22rem /* 22/102 */;
      display: flex;
      justify-content: flex-end;
    } // .login-cn end

    .login-main{
      margin:.29rem /* 30/102 */ auto 0;
      width:4.41rem /* 450/102 */;
      .main-title{
        font-size: .49rem /* 50/102 */;
        color: #fff;
        margin-bottom:.29rem /* 30/102 */;
      }

      .main-form{
        padding: .1rem /* 10/102 */;
        padding-bottom: .29rem /* 30/102 */;
        background: #fff;
        border-radius: .1rem /* 10/102 */;
        .form-info{
          overflow: hidden;
          img{
            width: 100%;
          }
          h2{
            margin-top: -.39rem /* 40/102 */;
            font-size: .22rem /* 22/102 */;
            margin-bottom: .05rem /* 5/102 */;
            font-weight: 700;
          }
          p{
            font-size: .14rem /* 14/102 */;
          }
        }
      } // .main-form end
      
      .main-button{
        text-align: center;
        margin-top: .2rem /* 20/102 */;
        button{
          border: 0;
          font-size: .18rem /* 18/102 */;
          background: #4FBF18;
          color: #fff;
          border-radius: .05rem /* 5/102 */;
          padding: .05rem /* 5/102 */ .15rem /* 15/102 */;
        }
      }
    } // .login-main end
  } // .login end
</style>