<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapMutations(['setSocketId'])
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
      console.log(this.$socket.id)
      this.setSocketId({
        id: this.$socket.id
      })
    }
  }
}
</script>

<style lang="less">
@import './assets/less/reset.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>
