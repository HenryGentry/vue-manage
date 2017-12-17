<template>
  <div>
    <go-back level="info"></go-back>
    <form>
      <div class="grid-container">
        <div class="grid-x align-center">
          <div class="medium-6 text-left ">
            <label for="oldPassword">旧密码: <span class="help-text">{{ promptA }}</span>
              <input type="password" placeholder="请输入旧密码" v-model="oldPassword">
            </label>
            <label for="newPassword">新密码: <span class="help-text">{{ promptA }}</span>
              <input type="password" placeholder="请输入新密码" v-model="newPassword">
            </label>
            <label for="Password">确认密码: <span class="help-text">{{ promptA }}</span>
              <input type="password" placeholder="请再次输入新密码" v-model="checkedPassword">
            </label>
            <input type="button" class="button" @click="updatePassword" value="确认">
            <input type="reset" class="button alert" value="取消">
          </div>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import goBack from '../GoBack'
export default {
  props: ['id', 'userName'],
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      checkedPassword: '',
      promptA: ' 必填',
      promptB: ' 必填',
      promptC: ' 必填'
    }
  },
  components: {
    goBack: goBack
  },
  methods: {
    updatePassword () {
      if (this.oldPassword === '') {
        alert('旧密码不能为空')
        return
      }
      if (this.newPassword === '') {
        alert('新密码不能为空')
        return
      }
      if (this.newPassword !== this.checkedPassword) {
        alert('新密码不相同')
        return
      }
      let self = this
      this.$http.post('/api/user/update', {
        userId: self.id,
        userName: self.userName,
        oldPassword: self.oldPassword,
        newPassword: self.newPassword
      })
      .then(res => {
        if (res.data.code === '0') {
          alert('修改密码成功')
        } else {
          alert('修改密码失败')
        }
      })
    }
  }
}
</script>
