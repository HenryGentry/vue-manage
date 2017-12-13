<template>
  <div>
    <div class="system-container">
      <table>
        <thead>
          <tr>
            <th width="50" class="text-center">ID</th>
            <th class="text-center">用户</th>
            <th class="text-center">用户角色</th>
            <th width="150"></th>
            <th width="150"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id" >
            <td>{{ item.id }}</td>
            <td>{{ item.user }}</td>
            <td>普通用户</td>
            <td><button class="button">重设密码</button></td>
            <td><button class="button alert">删除用户</button></td>
          </tr>
        </tbody>
      </table>

      <div class="add-button button" @click="addUser">新建用户</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          id: 1,
          user: '周浩锋'
        }
      ]
    }
  },
  methods: {
    addUser () {
      this.$router.push('managerAddUser')
    }
  }
}
</script>
