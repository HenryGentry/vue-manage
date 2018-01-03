<template>
  <div class="container" @keydown.enter="login">
    <h1 class="h2">新净界管理系统</h1>
    <div class="text-left">
      <div class="grid-x align-center lead">
        <div class="small-6 medium-4 large-3 fieldset">
          <label for="username">用户名
            <input type="text" v-model="username" placeholder="用户名" autofocus maxlength="20">
          </label>
          <label for="password">密码
            <input type="password" v-model="password" placeholder="密码" maxlength="12">
          </label>
          <input type="button" value="确认" class="button expanded" @click="login">
        </div>
      </div>
    </div>
    <loading v-if="isloading"></loading>
  </div>
</template>

<script>
import loading from './Loading'
export default {
  data () {
    return {
      username: '',
      password: '',
      isloading: false
    }
  },
  components: {
    loading: loading
  },
  methods: {
    login: function () {
      let self = this
      self.isloading = true
      this.$http.post('/api/user/login', {
        userName: this.username,
        password: this.password
      })
      .then(function (response) {
        self.isloading = false
        if (response.data.code === '0') {
          window.location.href = '/admin/home'
        } else {
          alert('密码或者用户名错误，请重新登录')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/main.scss';
  .container {
    margin-top: 100px;
  }
</style>

