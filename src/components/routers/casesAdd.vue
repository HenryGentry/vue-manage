<template>
  <div>
    <go-back level="cases"></go-back>
    <div class="grid-container">
      <div class="grid-x align-center">
        <div class="medium-6 text-left">
          <label for="casesName">案例名称: 
            <input type="text" name="casesName" placeholder="案例名称" v-model="caseName">
          </label>
          <label for="casesRemark">案例备注: 
            <input type="text" name="casesRemark" placeholder="案例备注" v-model="remark">
          </label>
        </div>   
      </div>
    </div>
    <button class="button" @click="submit">确认提交</button>
    
  </div>
</template>

<script>
import goBack from '../GoBack'
export default {
  props: ['type', 'id', 'name', 'remark'],
  data () {
    return {
      caseName: '',
      caseMemo: ''
    }
  },
  created () {
    this.caseName = this.name
    this.caseMemo = this.remark
  },
  components: {
    goBack: goBack
  },
  methods: {
    submit () {
      if (this.type === 'add') {
        let self = this
        this.$http.post('/api/case/create', {
          caseName: self.caseName,
          caseMemo: self.caseMemo
        })
        .then(res => {
          if (res.data.code === '0') {
            alert('新增案例成功')
            self.$router.go(-1)
          } else if (res.data.code === '401') {
            self.$router.push('/admin/login')
          }
        })
      }

      if (this.type === 'update') {
        let self = this
        this.$http.post('/api/case/update', {
          caseId: self.id,
          caseName: self.caseName,
          caseMemo: self.caseMemo
        })
        .then(res => {
          if (res.data.code === '0') {
            alert('更改案例成功')
            self.$router.go(-1)
          } else if (res.data.code === '401') {
            self.$router.push('/home/login')
          }
        })
      }
    }
  }
}
</script>
