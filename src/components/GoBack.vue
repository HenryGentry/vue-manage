<template>
  <div>
    <div class="text-left arrow-left" @click="popRouter">返回上一级</div>
  </div>
</template>

<script>
export default {
  props: ['level'],
  methods: {
    popRouter () {
      this.$router.push(this.level)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/main.scss';
  .arrow-left {
    cursor: pointer;
  }
  .arrow-left:before {
    content: '';
    border: $arrow-border-color solid;
    border-width: 0 0 $arrow-border-width $arrow-border-width;
    display: inline-block;
    width: $arrow-size;
    height: $arrow-size;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    cursor: pointer;
  }
</style>
