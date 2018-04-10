<template>
  <div class="ruler-wrap" @touchmove.prevent.stop="">
    <div class="vertical-line" :style="{'left': left + 'px'}"></div>
    <div class="horizontal-line" :style="{'top': top + 'px'}"></div>
  </div>
</template>

<script>
export default {
  name: 'Ruler',
  data () {
    return {
      left: -1,
      top: -1
    }
  },
  methods: {
    updatePos: function (e) {
      let touch = e.targetTouches[0] || e.changedTouches[0]
      if (touch) {
        let touchX = touch.clientX
        let touchY = touch.clientY
        this.left = touchX
        this.top = touchY
      }
    }
  },
  mounted () {
    window.addEventListener('touchmove', this.updatePos)
    window.addEventListener('touchstart', this.updatePos)
  }
}
</script>

<style lang="less">
  .ruler-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .vertical-line {
      position: absolute;
      width: 1px;
      background-color: #f5f5f5;
      height: 100%;
    }
    .horizontal-line {
      position: absolute;
      width: 100%;
      background-color: #f5f5f5;
      height: 1px;
    }
  }
</style>
