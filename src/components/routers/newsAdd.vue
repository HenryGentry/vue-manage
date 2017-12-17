<template>
  <div>
    <go-back level="news"></go-back>
    <div class="grid-x grid-margin-x text-left">
      <label for="title" class="medium-4 cell">标题
        <input type="text" v-model="title" placeholder="标题">
      </label>
      <label for="author" class="medium-2 cell">作者
        <input type="text" name="author" placeholder="作者输入框">
      </label>
      <label for="remark" class="medium-4 cell">备注
        <input type="text" name="remark" placeholder="备注">
      </label>
      <label for="classify" class="medium-2 cell">分类
        <select name="classify">
          <option value="aa">aa</option>
          <option value="bb">bb</option>
          <option value="cc">cc</option>
        </select>
      </label>
    </div>
    <quill-editor class="editor"></quill-editor>
    <button class="button">确认提交</button>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import goBack from '../GoBack'

export default {
  components: {
    quillEditor,
    goBack: goBack
  }
}
</script>

<style lang="scss" scoped>
  .editor {
    height: 20rem;
    margin-bottom: 100px;
  }
</style>

