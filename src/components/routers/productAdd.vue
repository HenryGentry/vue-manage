<template>
  <div>
    <go-back level="product"></go-back>
    <form action="">
      <div class="grid-container">
        <div class="grid-x align-center">
          <div class="medium-6 text-left">
            <label for="productName">产品名称
              <input type="text" name="productName">
            </label>
            <label for="productRemark">产品备注
              <input type="text" name="productRemark">
            </label>
            <label for="productDescribe">产品描述
              <textarea name="productDescribe" id="productDescribe" rows="10"></textarea>
            </label>
            <label for="file">请选择图片
              <input type="file" accept="image/*" name="请选择图片">
            </label>
            <input type="submit" class="button" value="确认提交">
            <input type="reset" class="button alert" value="放弃修改">
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

