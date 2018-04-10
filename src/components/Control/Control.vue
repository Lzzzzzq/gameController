<template>
  <div class="control-wrap" @touchmove.prevent="handleTouchMove" @touchend="handleTouchEnd">
    <mask-wrap ref="maskWrap" />
    <ruler-wrap />
    <state-wrap :side="side" :direction="direction" :sin="sin" :cos="cos" v-if="show" />
    <div class="pos-control" ref="posControl" v-if="show" @touchstart="handleTouchStart">
      <div class="pos-btn" :style="{'left': btnLeft + 'px', 'top': btnTop + 'px'}"></div>
    </div>
    <div class="fire-control" v-if="show" @touchstart.stop.prevent="startFire" @touchend.stop.prevent="endFire" @touchmove.stop.prevent="" :class="{'fire-control-active': fire}">
      <img src="../../assets/images/fire.png" alt="">
    </div>
  </div>
</template>

<script>
import Mask from '../Mask/Mask'
import Ruler from '../Ruler/Ruler'
import Common from '../../assets/js/common'
import State from '../State/State'
import { mapState } from 'vuex'

// eslint-disable-next-line
function $(msg) {
  console.log(msg)
}

export default {
  name: 'Control',
  components: {
    'mask-wrap': Mask,
    'ruler-wrap': Ruler,
    'state-wrap': State
  },
  computed: {
    ...mapState({
      username: state => state.Main.username,
      id: state => state.Main.id
    })
  },
  mounted () {
    if (!this.username) {
      this.$router.push({
        path: '/'
      })
    } else {
      // 发送到socket设置用户名
      this.$socket.emit('setUsername', {
        username: this.username
      })
      this.checkPosition()
      this.addListener()
    }
  },
  data () {
    return {
      // 是否展示
      show: false,
      // 轮盘外侧半径
      wrapR: 60,
      // 摇杆的top值
      btnTop: -30,
      // 摇杆的left值
      btnLeft: -30,
      // 摇杆的半径
      btnR: 30,
      // 摇杆圆心x值
      btnCenterX: 0,
      // 摇杆圆心y值
      btnCenterY: 0,
      // 摇杆偏移量
      offsetPos: 0,
      // 轮盘距离顶部距离
      toTop: 0,
      // 轮盘距离左侧距离
      toLeft: 0,
      // 手指开始滑动
      touchStart: false,
      // 开火
      fire: false,
      // 方向
      direction: 0,
      // 移动的sin值
      sin: 0,
      // 移动的cos值
      cos: 0,
      // 左右方向
      side: 0
    }
  },
  methods: {
    checkPosition: function () {
      // 判断是否为横屏
      let cWidth = document.body.clientWidth
      let cHeight = document.body.clientHeight
      if (cWidth < cHeight) {
        this.$refs.maskWrap.show()
        this.show = false
      } else {
        this.$refs.maskWrap.hide()
        this.show = true
      }
    },
    addListener: function () {
      // 添加事件监听
      window.onresize = () => {
        this.checkPosition()
      }
    },
    handleTouchStart: function (e) {
      // 手指开始触摸
      if (this.toTop === 0) {
        this.toTop = this.$refs.posControl.offsetTop
        this.toLeft = this.$refs.posControl.offsetLeft
        this.btnCenterY = this.toTop + this.btnR
        this.btnCenterX = this.toLeft + this.btnR
        this.offsetPos = this.btnR
        this.btnTop = 0 - this.btnR
        this.btnLeft = 0 - this.btnR
      }
      let touchX = e.targetTouches[0].clientX
      let touchY = e.targetTouches[0].clientY
      this.touchStart = true
      this.btnTop = touchY - this.toTop - this.wrapR - this.offsetPos
      this.btnLeft = touchX - this.toLeft - this.wrapR - this.offsetPos
      let diretionY = touchY - (this.toTop + this.wrapR)
      this.checkDirection(diretionY)
    },
    handleTouchMove: function (e) {
      // 手指开始挪动
      let touchX = e.targetTouches[0].clientX
      let touchY = e.targetTouches[0].clientY
      if (this.touchStart) {
        let disX = Math.abs(touchX - (this.toLeft + this.wrapR))
        let disY = Math.abs(touchY - (this.toTop + this.wrapR))
        let diretionY = touchY - (this.toTop + this.wrapR)
        this.checkDirection(diretionY)
        if (Common.distance(disX, disY) < this.wrapR) {
          // 判断是否在圆内移动
          this.btnTop = touchY - this.toTop - this.wrapR - this.offsetPos
          this.btnLeft = touchX - this.toLeft - this.wrapR - this.offsetPos
        } else {
          // 根据sin和cos求正确的位置
          let x =
            (touchX - this.toLeft - this.wrapR) *
              this.wrapR /
              Common.distance(disX, disY) -
            this.btnR
          let y =
            (touchY - this.toTop - this.wrapR) *
              this.wrapR /
              Common.distance(disX, disY) -
            this.btnR
          this.btnLeft = x
          this.btnTop = y
        }
      }
    },
    handleTouchEnd: function (e) {
      // 手指停止挪动
      this.touchStart = false
      this.btnTop = 0 - this.btnR
      this.btnLeft = 0 - this.btnR
      this.direction = 0
      this.sin = 0
      this.cos = 0
      this.side = 0
    },
    startFire: function () {
      // 开始开火
      this.fire = true
    },
    endFire: function () {
      // 停止开火
      this.fire = false
    },
    checkDirection: function (diretionY) {
      /*
       * 根据手指开始滑动的Y值判断方向
       * @param diretionY 初始滑动方向
       */
      if (!this.direction) {
        this.direction = diretionY > 5 ? 'back' : 'forward'
      }
      let btnCenterX = this.btnLeft + 30
      let btnCenterY = this.btnTop + 30
      let sin = Math.abs(btnCenterX / this.wrapR)
      let cos = Math.abs(btnCenterY / this.wrapR)
      if (this.direction === 'forward') {
        if (
          (btnCenterX > 0 && btnCenterY < 0) ||
          (btnCenterX === 0 && btnCenterY < 0) ||
          (btnCenterX < 0 && btnCenterY < 0)
        ) {
          // 在第一象限、第二象限或直走时
          this.sin = parseFloat(sin.toFixed(3))
          this.cos = parseFloat(cos.toFixed(3))
        } else {
          this.sin = 1
          this.cos = 0
        }
      } else {
        if (
          (btnCenterX < 0 && btnCenterY > 0) ||
          (btnCenterX === 0 && btnCenterY > 0) ||
          (btnCenterX > 0 && btnCenterY > 0)
        ) {
          // 在第三象限、第四象限或直走时
          this.sin = parseFloat(sin.toFixed(3))
          this.cos = parseFloat(cos.toFixed(3))
        } else {
          this.sin = 1
          this.cos = 0
        }
      }
      if (btnCenterX > 0) {
        this.side = 'right'
      } else if (btnCenterX < 0) {
        this.side = 'left'
      } else {
        this.side = 0
      }
    }
  },
  watch: {
    direction: function () {
      // 前后改变
    },
    sin: function () {
      // sin和cos改变
    },
    side: function () {
      // 左右改变
    }
  }
}
</script>

<style lang="less">
@import './Control.less';
</style>
