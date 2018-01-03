<template>
  <div>
    <app-nav currentIndex="6"></app-nav>
    <div class="system-container">
      <table>
        <thead>
          <tr>
            <th class="text-center">编号</th>
            <th class="text-center">用户</th>
            <th class="text-center">用户角色</th>
            <th class="text-center">创建时间</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="item.id" >
            <td>{{ index + 1}}</td>
            <td>{{ item.userName }}</td>
            <td>普通用户</td>
            <td>{{ item.createTime }}</td>
            <td>
              <button class="button alert" @click="deleteUser(item.userId)">删除用户</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="add-button button" @click="updateUser">新建用户</div>
    </div>
    <loading v-if="isloading"></loading>
  </div>
</template>

<script>
import Nav from '../Nav'
import loading from '../Loading'
export default {
  data () {
    return {
      list: [],
      isloading: false
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'managerAddUser') {
      next(vm => {
        vm.queryUser()
      })
    }
    next()
  },
  created () {
    this.queryUser()
  },
  methods: {
    queryUser () {
      let self = this
      self.isloading = true
      this.$http.post('/api/user/list', {})
      .then(res => {
        self.isloading = false
        if (res.data.code === '0') {
          self.list = res.data.userList
        }
        if (res.data.code === '401') {
          self.$router.push('/admin/login')
        }
      })
    },
    updateUser () {
      this.$router.push('managerAddUser')
    },
    deleteUser (id) {
      let msg = '确认删除吗?'
      if (!confirm(msg)) {
        return
      }
      let self = this
      this.$http.post('/api/user/delete', {
        userId: id
      })
      .then(res => {
        if (res.data.code === '0') {
          alert('删除用户成功')
          self.queryUser()
        } else {
          alert('删除用户失败')
        }
      })
    }
  },
  components: {
    appNav: Nav,
    loading: loading
  }
}
</script>
