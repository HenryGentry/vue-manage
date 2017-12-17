<template>
  <div>
    <nav>
      <ul class="breadcrumbs custom-breadcrumbs">
        <!-- <li v-for="(item, index) in list" v-bind:key="item">
          <span v-if="index == currentIndex">{{ item }}</span>
          <a v-else>{{ item }}</a>
        </li> -->
        <li><a>首页</a></li>
        <li><a>{{ list[currentIndex] }}</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import '../scss/main.scss'
export default {
  props: ['currentIndex'],
  data () {
    return {
      list: [
        '个人信息',
        '轮播图管理',
        '新闻管理',
        '新闻分类',
        '产品管理',
        '公司信息',
        '管理员'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/main.scss';
  .breadcrumbs {
    li {
      font-size: $breadcrumbs-item-font-size;
    }
  }
</style>

