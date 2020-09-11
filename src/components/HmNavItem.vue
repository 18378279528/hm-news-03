<template>
  <div class="nav-item" @click="tiaozhuan">
    <div class="title">
      <slot></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    tiaozhuan() {
      if (this.to) this.$router.push(this.to);
    },
  },
  props: {
    to: String,
  },
};
</script>

<style lang='less' scoped>
.nav-item {
  display: flex;
  border-bottom: 1px solid #ccc;
  height: 50px;
  align-items: center;
  font-size: 16px;
  .title {
    padding: 0 10px;
  }
  .content {
    flex: 1;
    text-align: right;
    margin-right: 10px;
  }
}
</style>