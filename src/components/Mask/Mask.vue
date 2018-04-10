<template>
  <div class="mask-wrap" @touchmove.stop.prevent="" :style="{'display': display, 'opacity': opacity}">
    <div class="mask-alert" :class="{'mask-alert-active': scaleCls}">
      请旋转手机，横屏操作更佳
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaskWrap',
  data () {
    return {
      display: 'none',
      opacity: 0,
      scaleCls: false
    }
  },
  methods: {
    show: function () {
      setTimeout(() => {
        this.display = 'flex'
        setTimeout(() => {
          this.opacity = 1
          setTimeout(() => {
            this.scaleCls = true
          }, 200)
        }, 1)
      }, 200)
    },
    hide: function () {
      this.opacity = 0
      this.scaleCls = false
      setTimeout(() => {
        this.display = 'none'
      }, 200)
    }
  }
}
</script>

<style lang="less">
.mask-wrap {
  display: flex;
  justify-content: center;
  text-align: justify;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0;
  transition: all 0.2s;
  z-index: 10;

  .mask-alert {
    display: inline-block;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    transform: scale(0);
    transition: all 0.2s;
  }
  .mask-alert-active {
    animation: show 0.2s forwards;
  }
}
@keyframes show {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
