<template>
  <div>
    <div class="grid-x">
      <div class="small-12">
        <app-header></app-header>
      </div>

      <ul class="vertical menu sidebar medium-2 lead" >
        <li v-bind:class="{ active: isActive1 }" @click="toggle" id="1"><router-link to="/admin/home/info">个人信息</router-link></li>
        <li v-bind:class="{ active: isActive2 }" @click="toggle" id="2"><router-link to="/admin/home/swiper">轮播图管理</router-link></li>
        <li v-bind:class="{ active: isActive3 }" @click="toggle" id="3"><router-link to="/admin/home/news">新闻管理</router-link></li>
        <li v-bind:class="{ active: isActive4 }" @click="toggle" id="4"><router-link to="/admin/home/classify">新闻分类</router-link></li>
        <li v-bind:class="{ active: isActive5 }" @click="toggle" id="5"><router-link to="/admin/home/product">产品管理</router-link></li>
        <li v-bind:class="{ active: isActive6 }" @click="toggle" id="6"><router-link to="/admin/home/company">公司信息</router-link></li>
        <li v-bind:class="{ active: isActive7 }" @click="toggle" id="7"><router-link to="/admin/home/cases">案例管理</router-link></li>
        <li v-bind:class="{ active: isActive8 }" @click="toggle" id="8"><router-link to="/admin/home/project">项目管理</router-link></li>
        <li v-bind:class="{ active: isActive9 }" @click="toggle" id="9" v-if="roleId === '1'"><router-link to="/admin/home/manager">管理员</router-link></li>
      </ul>
   
      <div class="content medium-10">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
            </router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive">
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  data () {
    return {
      isActive1: true,
      isActive2: false,
      isActive3: false,
      isActive4: false,
      isActive5: false,
      isActive6: false,
      isActive7: false,
      isActive8: false,
      isActive9: false,
      lastId: '1',
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
      let id = e.currentTarget.id
      switch (id) {
        case '1': this.isActive1 = !this.isActive1; break
        case '2': this.isActive2 = !this.isActive2; break
        case '3': this.isActive3 = !this.isActive3; break
        case '4': this.isActive4 = !this.isActive4; break
        case '5': this.isActive5 = !this.isActive5; break
        case '6': this.isActive6 = !this.isActive6; break
        case '7': this.isActive7 = !this.isActive7; break
        case '8': this.isActive8 = !this.isActive8; break
        case '9': this.isActive9 = !this.isActive9; break
      }
      switch (this.lastId) {
        case '1': this.isActive1 = !this.isActive1; break
        case '2': this.isActive2 = !this.isActive2; break
        case '3': this.isActive3 = !this.isActive3; break
        case '4': this.isActive4 = !this.isActive4; break
        case '5': this.isActive5 = !this.isActive5; break
        case '6': this.isActive6 = !this.isActive6; break
        case '7': this.isActive7 = !this.isActive7; break
        case '8': this.isActive8 = !this.isActive8; break
        case '9': this.isActive9 = !this.isActive9; break
      }
      this.lastId = id
    },
    toInfo () {
      this.$router.push('info')
    },
    query () {
      let self = this
      this.$http.get('/api/user/get', {})
      .then(res => {
        if (res.data.code === '401') {
          self.$router.push('/admin/login')
        }
        if (res.data.code === '0') {
          self.roleId = res.data.user.roleId
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
      margin: 2px;
    }
    a {
      color: $main-font-color;
    }
  }

  .active {
    a {
      background-color: #ffae00;
    }
  }

  .content {
    padding: $content-padding;
  }

</style>

