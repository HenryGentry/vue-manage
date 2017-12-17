<template>
  <div>
    <div class="grid-x">
      <div class="small-12">
        <app-header></app-header>
      </div>

      <!-- v-bind:class="{ active: isActive }" @click="toggle" -->
      <ul class="vertical menu sidebar medium-2 lead">
        <li><router-link to="/home/info">个人信息</router-link></li>
        <li><router-link to="/home/swiper">轮播图管理</router-link></li>
        <li><router-link to="/home/news">新闻管理</router-link></li>
        <li><router-link to="/home/classify">新闻分类</router-link></li>
        <li><router-link to="/home/product">产品管理</router-link></li>
        <li><router-link to="/home/company">公司信息</router-link></li>
        <li v-if="roleId === '1'"><router-link to="/home/manager">管理员</router-link></li>
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
  data () {
    return {
      isActive: true,
      roleId: '1'
    }
  },
  created () {
    this.query()
    this.toInfo()
  },
  components: {
    appHeader: Header
  },
  methods: {
    toggle (e) {
      this.isActive = !this.isActive
    },
    toInfo () {
      this.$router.push('info')
    },
    query () {
      let self = this
      this.$http.get('/api/user/get', {})
      .then(res => {
        if (res.data.code === '401') {
          self.$router.push('/login')
        }
        if (res.data.code === '0') {
          self.roleId = res.data.user.roleId
          console.log(self.roleId)
        }
      })
    }
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

  .active {
    li {
      background-color: #15d982;
    }
  }

  .content {
    padding: $content-padding;
  }

</style>

