<template>
  <div class="main-wrap">
    <div class="main-cont">
      <input type="text" class="main-input" placeholder="大佬，给自己起个名吧" v-on:keydown.enter="signIn" v-model.trim="username">
      <div class="main-alert" v-if="errorMsg">{{errorMsg}}</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Main',
  data () {
    return {
      username: '',
      errorMsg: ''
    }
  },
  methods: {
    ...mapMutations(['setUsername']),
    signIn: function () { // 登录
      if (!this.username) {
        this.showAlert('昵称不能为空')
      } else {
        if (this.username.length < 3) {
          this.showAlert('昵称太短啦')
        } else {
          this.setUsername({
            username: this.username
          })
          sessionStorage.setItem('username', this.username)
          this.$router.push({
            path: '/control'
          })
        }
      }
    },
    showAlert: function (msg) { // 弹出提示
      this.errorMsg = msg || '出错了'
      setTimeout(() => {
        this.errorMsg = ''
      }, 2500)
    }
  }
}
</script>

<style lang="less">
@import './Main.less';
</style>
