<template>
  <div>
    <go-back level="product"></go-back>
      <div class="grid-container">
        <div class="grid-x align-center">
          <div class="medium-6 text-left">
            <label for="productName">产品名称: 
              <input type="text" name="productName" v-model="productName">
            </label>
            <label for="productRemark">产品备注: 
              <input type="text" name="productRemark" v-model="productRemark">
            </label>
            <label for="productDesc">产品描述: 
              <textarea name="productDesc" rows="5" maxlength="120" v-model="productDesc"></textarea>
            </label>
            
            <div v-if="!image">
              <label for="upload" class="button">上传图片</label>
              <input type="file" id="upload" accept="image/*" @change="onFileChange" class="show-for-sr">
            </div>
            <div v-else>
              <img :src="image" class="custom-image">
              <button class="button float-center" @click="removeImage">移除图片</button>
            </div>

            <input type="button" class="button" value="确认提交" @click="submit">
            <input type="reset" class="button alert" value="取消" @click="cancel">
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import goBack from '../GoBack'
import loading from '../Loading'
export default {
  props: ['type', 'id'],
  data () {
    return {
      productName: '',
      productDesc: '',
      productRemark: '',
      image: '',
      imageSize: 0,
      file: '',
      imgId: '',
      isloading: false
    }
  },
  created () {
    if (this.type === 'update') {
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
    },
    query () {
      let self = this
      this.$http.post('/api/product/getById', {
        productId: self.id
      })
      .then(res => {
        if (res.data.code === '0') {
          self.productName = res.data.product.productName
          self.productDesc = res.data.product.productDesc
          self.productRemark = res.data.product.productRemark
          self.imgId = res.data.product.imgId
          self.image = res.data.product.imgUrl
        }
      })
    },
    submit () {
      if (this.imgId === '') {
        this.uploadImage()
      } else {
        this.update()
      }
    },
    uploadImage () {
      let formData = new FormData()
      formData.append('image', this.file)
      formData.append('remark', '产品图')
      let self = this
      return self.$http.post('/api/image/upload', formData)
      .then(res => {
        if (res.data.code === '0') {
          self.imgId = res.data.imgId
          if (self.type === 'update') {
            self.update()
          } else {
            self.add()
          }
        } else if (res.data.code === '401') {
          self.$router.push('/admin/login')
        } else {
          alert('请选择一张图片')
        }
      })
    },
    update () {
      let self = this
      let data = {
        productId: this.id,
        productName: this.productName,
        productRemark: this.productRemark,
        imgId: this.imgId,
        productDesc: this.productDesc
      }
      this.$http.post('/api/product/update', data)
      .then(res => {
        if (res.data.code === '0') {
          alert('更新产品成功')
          self.$router.go(-1)
        } else if (res.data.code === '401') {
          self.$router.push('/admin/login')
        } else {
          alert('更新产品失败')
        }
      })
    },
    add () {
      let data = {
        productName: this.productName,
        productDesc: this.productDesc,
        imgId: this.imgId,
        productRemark: this.productRemark
      }
      let self = this
      this.$http.post('/api/product/create', data)
      .then(res => {
        if (res.data.code === '0') {
          alert('新增产品成功')
          self.$router.go(-1)
        } else if (res.data.code === '401') {
          self.$router.push('/admin/login')
        } else {
          alert('新增产品失败')
        }
      })
    },
    cancel () {
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
