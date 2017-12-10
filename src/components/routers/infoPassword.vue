<template>
  <div>
    <go-back level="info"></go-back>

    <form>
      <div class="grid-container">
        <div class="grid-x align-center">
          <div class="medium-6 text-left ">
            <label for="oldPassword">旧密码：
              <input type="password" placeholder="请输入旧密码">
            </label>
            <label for="newPassword">新密码：
              <input type="password" placeholder="请输入新密码">
            </label>
            <label for="Password">再次确认密码：
              <input type="password" placeholder="请再次确认密码">
            </label>
            <input type="submit" class="button" value="确认">
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
  components: {
    goBack: goBack
  }
}
</script>
