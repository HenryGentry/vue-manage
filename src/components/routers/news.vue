<template>
  <div>
    <div class="news-container">
      <input type="text" placeholder="标题">
      <input type="text" placeholder="作者输入框">
      <input type="text" placeholder="备注">
      <select name="classify" id="classify">
        <option value="aa">aa</option>
        <option value="bb">bb</option>
        <option value="cc">cc</option>
      </select>
      <quill-editor rows="30"></quill-editor>
    </div>
  </div>  
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  }
}
</script>
