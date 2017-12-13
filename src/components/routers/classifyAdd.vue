<template>
  <div>
    <go-back level="classify"></go-back>
    <form action="">
      <div class="grid-container">
        <div class="grid-x align-center">
          <div class="medium-6 text-left">
            <label for="name">分类名称
              <input type="text" name="name">
            </label>
            <label for="describe">分类描述
              <textarea name="describe" id="describe" rows="10"></textarea>
            </label>
            <input type="submit" class="button" value="确认提交">
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

