<template>
  <div>
    <table>
      <thead>
        <tr>
          <th class="text-center">ID</th>
          <th class="text-center">标题</th>
          <th class="text-center">作者</th>
          <th class="text-center">新闻发布时间</th>
          <th class="text-center">修改时间</th>
          <th class="text-center">备注</th>
          <th class="text-center">发布状态</th>
          <th class="text-center">所属分类</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ list.id }}</td>
          <td>{{ list.header }}</td>
          <td>{{ list.author }}</td>
          <td>{{ list.date }}</td>
          <td>{{ list.update }}</td>
          <td>{{ list.remark }}</td>
          <td>{{ list.status }}</td>
          <td>{{ list.classify }}</td>
          <td><button class="button">修改</button></td>
          <td><button class="button">删除</button></td>
          <td><button class="button">发布</button></td>
        </tr>
      </tbody>
    </table>

    <button class="button">+ 增加新闻</button>

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
  data () {
    return {
      list: {
        id: 1,
        header: '这是一个标题',
        author: '周浩锋',
        date: '2017-10-02',
        update: '2017-10-23',
        remark: '备注',
        status: '已发布',
        classify: 'aaa'
      }
    }
  },
  components: {
    quillEditor
  }
}
</script>
