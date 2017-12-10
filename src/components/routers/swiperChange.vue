<template>
  <div class="add-container">
    <go-back level="swiper"></go-back>
    <div class="grid-x align-center">
      <div class="medium-6">
        <form action="">
          <label for="header">
          标题 
          <input type="text" name="header" placeholder="请输入标题" >
        </label>
        <label for="url">
          轮播图指向地址
          <input type="url" name="url" placeholder="请输入连接的地址">
        </label>
        <label for="file">
            请选择图片
          <input type="file" accept="image/*" name="请选择图片">
        </label>
        <input type="button" class="button" value="确认">
        <input type="reset" class="button alert" value="取消">
        </form>
      </div>
    </div>
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
