<template>
<div class="app-wrapper">

  <div class="header">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link ">
        <div class="user-change">
          <img :src="headerImage" alt="">
          <img src="../../assets/header.png" alt="">
        </div>
      </span>
      <!-- TODO @PrincessSnow 暂时禁用 该地方相对应功能还未完成 -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="clear" >
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>

  <sidebar class="sidebar-container"></sidebar>
  <div class="main-container">
    <div class="basic-layout">
      <app-main></app-main>
    </div>
  </div>
</div>
</template>

<script>
import AppMain from '@/views/layout/components/AppMain' //页面布局的右侧区域
import sidebar from '@/views/layout/components/sidebar' //页面布局的左侧菜单
import storage from '@/utils/storage'
export default {
  name: 'layout',
  components: {
    sidebar,
    AppMain
  },
  data() {
    return {
      popupBool: false,
      headerImage: ''
    }
  },
  created() {
    let user = storage.get('USER_INFO');
    this.headerImage = user.avatar_url ? user.avatar_url : 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif';
  },
  methods: {
    handleCommand(command) {
      if (command == 'clear') {
        this.$message({
          message: '退出成功！',
          type: "success"
        })
        storage.clear()
        setTimeout(() => {
          this.$router.go(0);
        }, 3000)
      }
    }
    /*onUserChange(){
      this.popupBool = !this.popupBool
    }*/
  }
}
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.header {
  width: 100%;
  height: 40px;
  padding: 5px;
  box-sizing: border-box;
  background: rgb(48, 65, 86);
  position: relative;
  display: flex;
  justify-content: flex-end;
}

.user-change {
  height: 30px;
  float: right;
  cursor: pointer;
}

.user-change>img {
  height: 30px;
  width: 30px;
  /*background: cadetblue;*/
  vertical-align: bottom;

}

.user-change>img+img {
  height: 10px;
  width: 10px;
  margin-left: 3px;
}

.header-popup {
  background: #ffffff;
  border: 1px solid #cccccc;
  width: 70px;
  height: auto;
  font-size: 12px;
  text-align: center;
  position: absolute;
  right: 0;
  top: 40px;
  cursor: pointer;
  z-index: 10086;
}

.header-popup>p {
  padding: 5px 0;
}

.header-popup>p:hover {
  background: #e9e7e7;
}

.basic-layout {
  padding: 10px;
}
</style>
