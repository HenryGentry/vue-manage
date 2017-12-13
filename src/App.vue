<template>
  <div id="app">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        login: true
      }
    },
    created () {
      this.checkLogin()
    },
    methods: {
      checkLogin () {
        if (!this.login) {
          this.$router.push('/login')
        } else {
          this.$router.push('/home/info')
        }
      }
    }
  /* 登录选项 */
  /* !this.getCookie('session')  */
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}
</style>
