<template>
  <div class="stateBar clearfix">
    <div class="stateItem clearfix fl">
      <div class="stateTitle fl">前后：</div>
      <div class="stateValue fl">{{direction ? (direction === 'forward' ? '向前' : '向后') : '静止'}}</div>
    </div>
    <div class="stateItem clearfix fl">
      <div class="stateTitle fl">左右：</div>
      <div class="stateValue fl">{{side ? (side === 'left' ? '向左' : '向右') : '静止'}}</div>
    </div>
    <div class="stateItem clearfix fl">
      <div class="stateTitle fl">sin值：</div>
      <div class="stateValue fl">{{sin}}</div>
    </div>
    <div class="stateItem clearfix fl">
      <div class="stateTitle fl">cos值：</div>
      <div class="stateValue fl">{{cos}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StateBar',
  props: ['direction', 'sin', 'cos', 'side']
}
</script>

<style lang="less">
.stateBar {
  position: absolute;
  top: 0;
  left: 15%;
  width: 70%;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0 0 8px 8px;
  user-select: none;
  padding: 0 16px;
  box-sizing: border-box;

  .stateItem {
    width: 25%;
    font-size: 14px;
    line-height: 36px;
    color: #fff;
  }
}
</style>
