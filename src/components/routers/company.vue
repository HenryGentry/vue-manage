<template>
  <div>
    <app-nav currentIndex="5"></app-nav>
    <div class="company-container text-left grid-x grid-margin-x">
      <label for="name" class="medium-6 cell">公司名称
        <input type="text" placeholder="公司名称" v-model="name">
      </label>
      <label for="fullName" class="medium-6 cell">公司全称
        <input type="text" placeholder="公司全称" v-model="fullName">
      </label>
      <label for="address" class="medium-6 cell">地址
        <input type="text" placeholder="地址" v-model="address">
      </label>
      <label for="license" class="medium-6 cell">备案号
        <input type="text" placeholder="备案号" v-model="license">
      </label>
      <label for="telephone" class="medium-4 cell">电话号码
        <input type="tel" placeholder="电话号码" v-model="telephone">
      </label>
      <label for="fax" class="medium-4 cell">传真
        <input type="text" placeholder="传真" v-model="fax">
      </label>
      <label for="email" class="medium-4 cell">邮箱
        <input type="email" placeholder="邮箱" v-model="email">
      </label>
      <label for="content" class="medium-12 cell">公司简介
        <textarea placeholder="公司简介" rows="6" v-model="content"></textarea>
      </label>
      <label for="service" class="medium-12 cell">服务体系
        <textarea rows="6" placeholder="服务体系" v-model="service"></textarea>
      </label>
        <button class="button medium-2 float-center" @click="submit">保存</button>
    </div>
  </div>
</template>

<script>
import Nav from '../Nav'
export default {
  data () {
    return {
      name: '',
      fullName: '',
      address: '',
      license: '',
      telephone: '',
      fax: '',
      email: '',
      content: '',
      service: '',
      id: null
    }
  },
  created () {
    this.query()
  },
  components: {
    appNav: Nav
  },
  methods: {
    submit () {
      let data = {
        id: this.id,
        name: this.name,
        fullName: this.fullName,
        address: this.address,
        caseNumber: this.license,
        telephone: this.telephone,
        fax: this.fax,
        email: this.email,
        introduction: this.content,
        serviceSystem: this.service
      }
      let self = this
      this.$http.post('/api/company/update', data)
      .then(res => {
        if (res.data.code === '0') {
          alert('更新成功')
        } else if (res.data.code === '401') {
          self.$router.push('/admin/login')
        }
      })
    },
    query () {
      let self = this
      this.$http.get('/api/company/get')
      .then(res => {
        if (res.data.code === '0') {
          self.id = res.data.company.id
          self.name = res.data.company.name
          self.fullName = res.data.company.fullName
          self.address = res.data.company.address
          self.license = res.data.company.caseNumber
          self.telephone = res.data.company.telephone
          self.fax = res.data.company.fax
          self.email = res.data.company.email
          self.content = res.data.company.introduction
          self.service = res.data.company.serviceSystem
        } else if (res.data.code === '401') {
          self.$router.push('/admin/login')
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
