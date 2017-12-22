<template>
  <div>
    <go-back level="news"></go-back>
    <div class="grid-x grid-margin-x text-left">
      <label for="title" class="medium-8 cell">标题
        <input type="text" v-model="title" placeholder="标题">
      </label>
      <label for="author" class="medium-4 cell">作者
        <input type="text" name="author" v-model="author" placeholder="作者">
      </label>
      <label for="remark" class="medium-8 cell">备注
        <input type="text" name="remark" v-model="remark" placeholder="备注">
      </label>
      <label for="classify" class="medium-4 cell" >分类
        <select name="classify" v-model="classify">
          <option v-for="item in classifyList" :key="item.categoryId" :value="item.categoryId">
            {{ item.categoryName }}
          </option>
        </select>
      </label>
    </div>
    <quill-editor
      class="editor"
      ref="quillEditor"
      v-model="content">
    </quill-editor>
    <button class="button" @click="submit">确认提交</button>

    <label for="upload" id="imgInput" class="button" style="display: none;">上传图片</label>
    <input type="file" id="upload" accept="image/*" @change="onFileChange" class="show-for-sr" >

    <input type="checkbox" v-model="status"><label>是否发布</label>

  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import goBack from '../GoBack'

export default {
  props: ['type', 'id'],
  data () {
    return {
      title: '',
      author: '',
      remark: '',
      classifyList: [],
      classify: '',
      content: '',
      addRange: [],
      status: true
    }
  },
  components: {
    quillEditor,
    goBack: goBack
  },
  computed: {
    editor () {
      return this.$refs.quillEditor.quill
    }
  },
  created () {
    this.queryClassify()
    if (this.type === 'update') {
      this.queryNews()
    }
  },
  mounted () {
    this.editor.getModule('toolbar').addHandler('image', this.imgHandler)
  },
  methods: {
    submit () {
      if (this.title === '') {
        alert('标题不能为空')
        return
      }
      if (this.author === '') {
        this.author = '匿名'
      }
      if (this.classify === '') {
        alert('请选择分类')
        return
      }
      if (this.content === '') {
        alert('新闻内容不能为空')
        return
      }
      let status = this.status ? '1' : '0'

      let self = this
      if (this.type === 'add') {
        let data = {
          newsTitle: self.title,
          newsAuthor: self.author,
          newsCategoryId: self.classify,
          newsRemark: self.remark,
          newsContent: self.content,
          newsStatus: status
        }
        this.$http.post('/api/news/create', data)
        .then(res => {
          if (res.data.code === '0') {
            alert('保存新闻成功')
            self.$router.push('news')
          } else {
            alert('保存新闻失败')
          }
        })
      } else if (this.type === 'update') {
        let data = {
          newsId: self.id,
          newsTitle: self.title,
          newsAuthor: self.author,
          newsCategoryId: self.classify,
          newsRemark: self.remark,
          newsContent: self.content,
          newsStatus: status
        }
        this.$http.post('/api/news/update', data)
        .then(res => {
          if (res.data.code === '0') {
            alert('成功修改新闻')
            self.$router.push('news')
          } else {
            alert('修改新闻失败')
          }
        })
      }
    },
    imgHandler () {
      this.addRange = this.editor.getSelection()
      let fileInput = document.getElementById('imgInput')
      fileInput.click()
    },
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      let formData = new FormData()
      formData.append('image', files[0])
      formData.append('remark', '新闻图')
      let self = this
      this.$http.post('/api/image/upload', formData)
      .then(res => {
        if (res.data.code === '0') {
          let imgUrl = res.data.imgUrl
          self.content = self.content + '<img src=' + imgUrl + '>'
        } else {
          alert('插入图片失败')
        }
      })
    },
    queryClassify () {
      let self = this
      this.$http.post('/api/category/query', {})
      .then((res) => {
        if (res.data.code === '0') {
          self.classifyList = res.data.categoryList
        }
      })
    },
    queryNews () {
      let self = this
      this.$http.post('/api/news/getById', {
        newsId: self.id
      })
      .then(res => {
        if (res.data.code === '0') {
          self.title = res.data.news.newsTitle
          self.content = res.data.news.newsContent
          self.author = res.data.news.newsAuthor
          self.status = res.data.news.newsStatus === 1
          self.classify = res.data.news.newsCategoryId
          self.remark = res.data.news.newsRemark
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .editor {
    height: 20rem;
    margin-bottom: 100px;
  }
</style>
