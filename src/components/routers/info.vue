<template>
  <div>
    <app-nav currentIndex="0"></app-nav>
    <div class="info-container">
      <table>
        <tbody>
          <tr>
            <td>用户ID</td>
            <td>{{ userInfo.userId }}</td>
          </tr>
          <tr>
            <td>用户名</td>
            <td>{{ userInfo.userName }}</td>
          </tr>
          <tr>
            <td>创建时间</td>
            <td>{{ userInfo.createTime }}</td>
          </tr>
          <tr>
            <td>角色名称</td>
            <td>{{ userInfo.roleName }}</td>
          </tr>
        </tbody>
      </table>

      <input type="button" value="修改密码" class="button" @click="changePassword">
    </div>
  </div>
</template>

<script>
import Nav from '../Nav'

export default {
  data () {
    return {
      userInfo: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'infoPassword') {
      next(vm => {
        vm.getUserInfo()
      })
    }
    next()
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    changePassword () {
      this.$router.push('infoPassword?id=' + this.userInfo.userId + '&userName=' + this.userInfo.userName)
    },
    getUserInfo () {
      let self = this
      this.$http.get('/api/user/get', {})
      .then(res => {
        if (res.data.code === '401') {
          self.$router.push('/admin/login')
        }
        if (res.data.code === '0') {
          self.userInfo = res.data.user
        }
      })
    }
  },
  components: {
    appNav: Nav
  }
}
</script>
