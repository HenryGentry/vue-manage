<template>
  <div>
    <go-back level="project"></go-back>
    <div class="grid-container">
      <div class="grid-x align-center">
        <div class="medium-6 text-left">
          <label for="projectName">项目名称: 
            <input type="text" name="projectName" placeholder="项目名称" v-model="projectName">
          </label>
          <label for="classify">所属分类
            <select name="classify" v-model="classify">
              <option v-for="item in classifyList" :key="item.caseId" :value="item.caseId">
                {{ item.caseName }}
              </option>
            </select>
          </label>
          <div v-if="!image">
            <label for="upload" class="button">上传图片</label>
            <input type="file" id="upload" accept="image/*" @change="onFileChange" class="show-for-sr">
          </div>
          <div v-else>
            <img :src="image" class="custom-image">
            <button class="button float-center" @click="removeImage">移除图片</button>
          </div>
          <label for="projectDesc">项目简介 
            <textarea rows="10" maxlength="120" v-model="projectDesc" placeholder="项目简介"></textarea>
          </label>
        </div>   
      </div>
    </div>
    <button class="button" @click="submit">确认提交</button>
    <button class="button alert" @click="cancle">取消</button>

    <loading v-if="isloading"></loading>
  </div>
</template>

<script>
import goBack from '../GoBack'
import loading from '../Loading'
export default {
  props: ['type', 'id'],
  data () {
    return {
      projectName: '',
      classifyList: [],
      classify: '',
      projectDesc: '',
      image: '',
      imageId: '',
      file: '',
      imageSize: 0,
      isloading: false
    }
  },
  created () {
    this.queryClassify()
    if (this.id !== '') {
      this.query()
    }
  },
  components: {
    goBack: goBack,
    loading: loading
  },
  methods: {
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.imageSize = files[0].size
      if (this.imageSize > 4194304) {
        alert('图片太大，请重新选择')
        return
      }
      this.file = files[0]
      this.createImage(files[0])
    },
    createImage (file) {
      let reader = new FileReader()
      let self = this
      reader.onload = e => {
        self.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage () {
      this.image = ''
      this.imageId = ''
    },
    query () {
      let self = this
      this.$http.post('/api/project/getById', {
        projectId: self.id
      })
      .then(res => {
        if (res.data.code === '0') {
          self.projectName = res.data.project.projectName
          self.imageId = res.data.project.imgId
          self.image = res.data.project.imgUrl
          self.classify = res.data.project.caseId
          self.projectDesc = res.data.project.projectDesc
        } else if (res.data.code === '401') {
          self.$router.push('/admin/login')
        }
      })
    },
    queryClassify () {
      let self = this
      this.$http.post('/api/case/query', {})
      .then(res => {
        if (res.data.code === '0') {
          self.classifyList = res.data.caseList
        } else if (res.data.code === '401') {
          self.$router.push('/admin/login')
        }
      })
    },
    submit () {
      if (this.imageId === '') {
        this.uploadImage()
      } else {
        this.update()
      }
    },
    uploadImage () {
      if (this.projectName === '') {
        alert('项目名称不能为空')
        return
      }
      if (this.classify === '') {
        alert('分类不能为空')
        return
      }
      if (this.image === '') {
        alert('图片不能为空')
        return
      }
      this.isloading = true
      let formData = new FormData()
      formData.append('image', this.file)
      formData.append('remark', '项目图')
      let self = this
      return self.$http.post('/api/image/upload', formData)
      .then(res => {
        if (res.data.code === '0') {
          self.imageId = res.data.imgId
          if (self.type === 'update') {
            self.update()
          } else {
            self.add()
          }
        } else if (res.data.code === '401') {
          self.$router.push('/admin/login')
        } else {
          self.isloading = false
          alert('请选择一张图片')
        }
      })
    },
    update () {
      if (this.projectName === '') {
        alert('项目名称不能为空')
        return
      }
      if (this.classify === '') {
        alert('分类不能为空')
        return
      }
      if (this.image === '') {
        alert('图片不能为空')
        return
      }
      this.isloading = true
      let self = this
      let data = {
        projectId: this.id,
        projectName: this.projectName,
        projectDesc: this.projectDesc,
        imgId: this.imageId,
        caseId: this.classify
      }
      this.$http.post('/api/project/update', data)
      .then(res => {
        self.isloading = false
        if (res.data.code === '0') {
          alert('更新项目成功')
          self.$router.go(-1)
        } else if (res.data.code === '401') {
          self.$router.push('/admin/login')
        } else {
          alert('更新项目失败')
        }
      })
    },
    add () {
      let data = {
        projectName: this.projectName,
        projectDesc: this.projectDesc,
        imgId: this.imageId,
        caseId: this.classify
      }
      let self = this
      this.$http.post('/api/project/create', data)
      .then(res => {
        self.isloading = false
        if (res.data.code === '0') {
          alert('新增项目成功')
          self.$router.go(-1)
        } else if (res.data.code === '401') {
          self.$router.push('/admin/login')
        } else {
          alert('新增项目失败')
        }
      })
    },
    cancle () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  textarea {
    resize: none;
  }
</style>
