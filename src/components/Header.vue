<template>
  <div>
    <div class="top-bar header-container">
      <div class="top-bar-left text-left">
        <h3>新净界后台管理系统</h3>
      </div>
      <div class="top-bar-right">
        <button class="button alert" @click="signOut">退出系统</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default ({
    methods: {
      signOut () {
        let self = this
        this.$http.get('/api/user/signOut', {})
        .then(res => {
          if (res.data.code === '0') {
            self.$router.push('/admin/login')
          }
        })
      }
    }
  })
</script>


<style lang="scss" scoped>
  @import  '../scss/main.scss';
  .header-container {
    background-color: $main-background-color;
    color: $main-font-color;
    padding: $header-padding 10px;
    
    h3 {
      margin: 0;
    }
    button {
      margin: 0
    }
  }
</style>

