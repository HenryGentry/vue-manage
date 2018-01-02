<template>
  <div class="add-container">
    <go-back level="swiper"></go-back>
    <div class="grid-x align-center">
      <div class="medium-6 text-left custom-swiper-add">
            <label for="title">标题 
            <input type="text" name="title" v-model="slideshowName" placeholder="请输入标题" >
          </label>
          <label for="url">轮播图指向地址
            <input type="url" name="url" v-model="skipUrl" placeholder="请输入指向的地址">
          </label>
          <label for="order">轮播图顺序
            <input type="number" name="order" min="1" v-model="orderNum"  placeholder="请输入轮播的顺序">
          </label>
          <label for="remark">备注
            <textarea name="remark" rows="5" v-model="remark" maxlength="120" placeholder="轮播图的备注"></textarea>
          </label>

          <div v-if="!image">
            <label for="upload" class="button">上传图片</label>
            <input type="file" id="upload" accept="image/*" @change="onFileChange" class="show-for-sr">
          </div>
          <div v-else>
            <img :src="image" class="custom-image">
            <button class="button float-center" @click="removeImage">移除图片</button>
          </div>
          
          <br>
          <input type="button" class="button" value="确认提交" @click="upload">
          <input type="reset" class="button alert" value="取消" @click="cancel">
          
      </div>
    </div>
  </div>
</template>

<script>
import goBack from '../GoBack'
export default {
  props: ['type', 'slideshowId', 'index', 'title', 'skip', 'mark', 'img', 'imgId'],
  data () {
    return {
      slideshowName: '',
      orderNum: 0,
      skipUrl: '',
      remark: '',
      image: '',
      imageSize: 0,
      file: ''
    }
  },
  created () {
    this.init()
  },
  components: {
    goBack: goBack
  },
  methods: {
    init () {
      this.orderNum = parseInt(this.index) + 1
      this.slideshowName = this.title
      this.skipUrl = this.skip
      this.remark = this.mark
      this.image = this.img
    },
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
    },
    upload () {
      if (this.slideshowName === '') {
        alert('标题不能为空')
        return
      }
      if (this.skipUrl === '') {
        alert('轮播图指向地址不能为空')
        return
      }
      if (this.image === '') {
        alert('图片不能为空')
        return
      }
      let formData = new FormData()
      formData.append('image', this.file)
      formData.append('remark', '轮播图')
      let self = this
      let update = {
        slideshowName: this.slideshowName,
        skipUrl: this.skipUrl,
        imgId: this.imgId,
        remark: this.remark,
        orderNum: this.orderNum,
        slideshowId: this.slideshowId
      }
      if (this.file === '') {
        this.$http.post('/api/slideshow/update', update)
          .then(response => {
            if (response.data.code === '0') {
              alert('更新轮播图成功')
              self.$router.push('swiper')
            } else {
              alert('更新轮播图失败')
            }
          })
      }
      if (this.file !== '') {
        this.$http.post('/api/image/upload', formData)
        .then(res => {
          if (res.data.code === '0') {
            if (this.type === 'update') {
              let data = {
                slideshowName: self.slideshowName,
                skipUrl: self.skipUrl,
                imgId: res.data.imgId,
                remark: self.remark,
                orderNum: self.orderNum,
                slideshowId: self.slideshowId
              }
              self.$http.post('/api/slideshow/update', data)
              .then(response => {
                if (response.data.code === '0') {
                  alert('更新轮播图成功')
                  self.$router.push('swiper')
                } else {
                  alert('更新轮播图失败')
                }
              })
            }
            if (this.type === 'add') {
              let data = {
                slideshowName: self.slideshowName,
                skipUrl: self.skipUrl,
                imgId: res.data.imgId,
                remark: self.remark,
                orderNum: self.orderNum
              }
              self.$http.post('/api/slideshow/create', data)
              .then(response => {
                if (response.data.code === '0') {
                  alert('新增轮播图成功')
                  self.$router.push('swiper')
                } else {
                  alert('新增轮播图失败')
                }
              })
            }
          } else {
            alert('图片上传失败,请重试')
          }
        })
      }
    },
    cancel () {
      this.$router.push('swiper')
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-text {
    font-size: 1rem;
    margin-left: 10px;
  }
  .show-for-sr {
    vertical-align: middle;
  }
  textarea {
    resize: none;
  }
  .custom-image {
    max-width: 280px;
    max-height: 280px;
  }
</style>
