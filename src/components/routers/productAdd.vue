<template>
  <div>
    <go-back level="product"></go-back>
      <div class="grid-container">
        <div class="grid-x grid-margin-x align-center text-left">
          <label for="productName" class="medium-6 cell">产品名称: 
            <input type="text" name="productName" v-model="productName">
          </label>
          <label for="productRemark" class="medium-6 cell">产品备注: 
            <input type="text" name="productRemark" v-model="productRemark">
          </label>
          
          <label for="productDesc" class="medium-12 cell">产品描述:
            <quill-editor class="editor" ref="quillEditor" v-model="productDesc"></quill-editor>
          </label>

          <div v-if="!image">
            <label for="upload" class="button">上传封面</label>
            <input type="file" id="upload" accept="image/*" @change="onFileChange" class="show-for-sr">
          </div>
          <div v-else>
            <img :src="image" class="custom-image">
            <button class="button float-center" @click="removeImage">移除图片</button>
          </div>      
        </div>
        <input type="button" class="button" value="确认提交" @click="submit">
        <input type="reset" class="button alert" value="取消" @click="cancel">

        <label for="uploadFile" id="imgInput" class="button" style="display: none;">上传图片</label>
        <input type="file" id="uploadFile" accept="image/*" @change="uploadFile" class="show-for-sr" >
      </div>

      <loading v-if="isloading"></loading>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
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
      file: '',
      imgId: '',
      addRange: [],
      isloading: false
    }
  },
  computed: {
    editor () {
      return this.$refs.quillEditor.quill
    }
  },
  created () {
    if (this.type === 'update') {
      this.query()
    }
  },
  components: {
    quillEditor,
    goBack: goBack,
    loading: loading
  },
  mounted () {
    this.editor.getModule('toolbar').addHandler('image', this.imgHandler)
  },
  methods: {
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
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
    imgHandler () {
      this.addRange = this.editor.getSelection()
      let fileInput = document.getElementById('imgInput')
      fileInput.click()
    },
    submit () {
      this.isloading = true
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
          self.isloading = false
          alert('请选择一张封面图')
        }
      })
    },
    update () {
      if (this.productName === '') {
        alert('请填写产品名称')
        return
      }
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
        self.isloading = false
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
        self.isloading = false
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
    },
    uploadFile (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      let formData = new FormData()
      formData.append('image', files[0])
      formData.append('remark', '产品图')
      let self = this
      this.$http.post('/api/image/upload', formData)
      .then(res => {
        if (res.data.code === '0') {
          let imgUrl = res.data.imgUrl
          self.productDesc = self.productDesc + '<img src=' + imgUrl + '>'
        } else {
          alert('插入图片失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  textarea {
    resize: none;
  }
</style>
