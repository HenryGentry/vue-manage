<template>
  <div>
    <div class="info-container">
      <table>
        <tbody>
          <tr>
            <td>ID</td>
            <td>{{ userInfo.id }}</td>
          </tr>
          <tr>
            <td>用户名</td>
            <td>{{ userInfo.username }}</td>
          </tr>
          <tr>
            <td>备注</td>
            <td>{{ userInfo.remark }}</td>
          </tr>
          <tr>
            <td>创建时间</td>
            <td>{{ userInfo.date }}</td>
          </tr>
        </tbody>
      </table>

      <input type="button" value="修改密码" class="button" @click="changePassword">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        id: 1,
        username: '周浩锋',
        remark: '这是一条没有备注的备注',
        date: '2017-01-01'
      }
    }
  },
  methods: {
    changePassword () {
      this.$router.push('infoPassword')
    }
  }
}
</script>
