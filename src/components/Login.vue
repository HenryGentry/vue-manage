<template>
  <div class="container" @keydown.enter="login">
      <div class="text-left">
        <div class="grid-x align-center lead">
          <div class="small-6 medium-4 large-3">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      this.$http.post('/api/user/login', {
        userName: this.username,
        password: this.password
      })
      .then(function (response) {
        if (response.data.code === '0') {
          window.location.href = '/home'
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

