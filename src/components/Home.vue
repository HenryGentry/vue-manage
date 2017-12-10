<template>
  <div>
    <div class="grid-x">
      <div class="small-12">
        <app-header></app-header>
      </div>

      <ul class="vertical menu sidebar medium-2 lead">
        <li><router-link to="/home/info">个人信息</router-link></li>
        <li><router-link to="/home/swiper">轮播图管理</router-link></li>
        <li><router-link to="/home/news">新闻管理</router-link></li>
        <li><router-link to="/home/product">产品管理</router-link></li>
        <li><router-link to="/home/company">公司信息</router-link></li>
        <li><router-link to="/home/manager">管理员</router-link></li>
      </ul>
   
      <div class="content medium-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {
    appHeader: Header
  }
}
</script>


<style lang="scss" scoped>
  @import '../scss/main.scss';
  .sidebar {
    li {
      background-color: $main-background-color;
      border: 2px solid #fcfcfc;
    }
    a {
      color: $main-font-color;
    }
  }

  .content {
    padding: $content-padding;
  }

</style>

