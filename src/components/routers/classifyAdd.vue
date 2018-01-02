<template>
  <div>
    <go-back level="classify"></go-back>
      <div class="grid-container">
        <div class="grid-x align-center">
          <div class="medium-6 text-left">
            <label for="name">分类名称: <span class="help-text"> 必填</span>
              <input type="text" name="name" v-model="categoryName">
            </label>
            <label for="describe">分类描述: 
              <textarea name="describe" id="describe" rows="10" maxlength="120" v-model="categoryDesc"></textarea>
            </label>
            <input type="submit" class="button" value="确认提交" @click="submit">
            <input type="reset" class="button alert" value="取消" @click="cancel">
          </div>   
        </div>
      </div>

  </div>
</template>

<script>
import goBack from '../GoBack'
export default {
  props: ['type', 'id'],
  created () {
    if (this.type === 'update') {
      this.query()
    }
  },
  data () {
    return {
      categoryName: '',
      categoryDesc: ''
    }
  },
  components: {
    goBack: goBack
  },
  methods: {
    query () {
      let self = this
      this.$http.post('/api/category/getById', {
        categoryId: self.id
      })
      .then((res) => {
        if (res.data.code === '0') {
          self.categoryName = res.data.category.categoryName
          self.categoryDesc = res.data.category.categoryDesc
        }
      })
    },
    submit () {
      if (this.type === 'add') {
        // 参数校验
        if (!this.validate()) {
          alert('分类名称不能为空')
          return
        }
        let self = this
        this.$http.post('/api/category/create', {
          categoryName: self.categoryName,
          categoryDesc: self.categoryDesc
        })
        .then(res => {
          if (res.data.code === '0') {
            alert('新增分类成功')
            self.$router.push('classify')
          } else if (res.data.code === '28000010') {
            alert('新增名称已存在')
          } else {
            alert('新增分类失败')
          }
        })
      }
      if (this.type === 'update') {
        // 参数校验
        if (!this.validate()) {
          alert('分类名称不能为空')
          return
        }
        let self = this
        this.$http.post('/api/category/update', {
          categoryName: self.categoryName,
          categoryDesc: self.categoryDesc,
          categoryId: self.id
        })
        .then(res => {
          if (res.data.code === '0') {
            alert('更新分类成功')
            self.$router.go(-1)
          } else if (res.data.code === '28000010') {
            alert('分类名称已存在')
          } else {
            alert('更新分类失败')
          }
        })
      }
    },
    cancel () {
      this.$router.go(-1)
    },
    validate () {
      if (this.categoryName === '') {
        return false
      }
      return true
    }
  }
}
</script>

<style>
  textarea {
    resize: none
  }
</style>

