<template>
  <div>
    <go-back level="manager"></go-back>

      <div class="grid-container">
        <div class="grid-x align-center">
          <div class="medium-6 text-left">
            <label for="userName">用户名
              <input type="text" v-model="userName" placeholder="请输入用户名">
            </label>
            <label for="password">密码
              <input type="password" v-model="password" placeholder="请输入密码">
            </label>
            <label for="checkPassword">再次输入密码
              <input type="password" v-model="checkPassword" placeholder="请再次输入密码">
            </label>
            <input type="button" class="button" value="确认" @click="submit">
            <input type="reset" class="button alert" value="重设">
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import goBack from '../GoBack'
export default {
  data () {
    return {
      userName: '',
      password: '',
      checkPassword: ''
    }
  },
  components: {
    goBack: goBack
  },
  methods: {
    submit () {
      if (this.userName === '') {
        alert('用户名不能为空')
        return
      }
      if (this.password === '') {
        alert('密码不能为空')
        return
      }
      if (this.password !== this.checkPassword) {
        console.log(this.password, this.checkPassword)
        alert('密码不相同')
        return
      }
      let self = this
      this.$http.post('/api/user/create', {
        userName: self.userName,
        password: self.password
      })
      .then(res => {
        if (res.data.code === '0') {
          alert('新增用户成功')
          self.$router.push('manager')
        } else if (res.data.code === '28000000') {
          alert('用户已经存在')
        } else {
          alert('新增用户失败')
        }
      })
    }
  }
}
</script>
