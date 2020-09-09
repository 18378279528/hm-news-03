<template>
  <div class="hm-header">
    <div class="back" @click="back">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="title">
      <slot></slot>
    </div>
    <div class="extra"></div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang='less' scoped>
.hm-header {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  text-align: center;
  line-height: 50px;
  .back,
  .extra {
    width: 50px;
  }
  .iconfont {
    font-size: 16px;
  }
  .title {
    flex: 1;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>