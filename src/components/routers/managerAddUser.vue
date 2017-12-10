<template>
  <div>
    <go-back level="manager"></go-back>

    <form action="">
      <div class="grid-container">
        <div class="grid-x align-center">
          <div class="medium-6 text-left">
            <label for="username">用户名
              <input type="text" placeholder="请输入用户名">
            </label>
            <label for="password">密码
              <input type="password" placeholder="请输入密码">
            </label>
            <label for="checkPassword">再次输入密码
              <input type="password" placeholder="请再次输入密码">
            </label>
            <input type="submit" class="button" value="确认">
            <input type="reset" class="button alert" value="重设">
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import goBack from '../GoBack'
export default {
  components: {
    goBack: goBack
  }
}
</script>
