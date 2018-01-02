<template>
  <div>
    <app-nav currentIndex="7"></app-nav>
    <table>
      <thead>
        <tr>
          <th class="text-center">序号</th>
          <th class="text-center">项目名称</th>
          <th class="text-center">项目简介</th>
          <th class="text-center">所属案例</th>
          <th class="text-center">图片</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item.projectId">
          <td>{{ index + 1 }}</td>
          <td>{{ item.projectName }}</td>
          <td><p class="desc float-center">{{ item.projectDesc }}</p></td>
          <td>{{ item.caseName }}</td>
          <td><img :src="item.imgUrl" alt="无法展示图片" class="table-image"></td>
          <td>
            <button class="button" @click="toProjectAdd('update', item.projectId)">修改</button>
            <button class="button alert" @click="deleteProject(item.projectId)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="button" @click="toProjectAdd('add')">新增项目</button>

    <ul class="pagination">
      <li class="pagination-previous" :class="{ disabled: currentPage === 1 }" @click="query(currentPage - 1)" v-show="lastPage > 1">
        <a v-if="currentPage !== 1">上一页<span class="show-for-sr">page</span></a>
        <span v-else>上一页<span class="show-for-sr">page</span></span>
      </li>
      <li v-for="n in lastPage" :key="n" @click="query(n)" :class="{current: currentPage === n}">
        <span v-if="currentPage === n">{{ n }}</span>
        <a v-else>{{ n }}</a>
      </li>
      <li class="pagination-next" :class="{ disabled: currentPage === lastPage }" @click="query(currentPage + 1)" v-show="lastPage > 1">
        <a v-if="currentPage !== lastPage">下一页 <span class="show-for-sr">page</span></a>
        <span v-else>下一页<span class="show-for-sr">page</span></span>
      </li>
    </ul>
  </div>
</template>

<script>
import appNav from '../Nav'
export default {
  data () {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      PAGE_SIZE: 5
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'projectAdd') {
      next(vm => {
        vm.query()
      })
    }
    next()
  },
  created () {
    this.query()
  },
  computed: {
    lastPage () {
      return Math.ceil(this.total / this.PAGE_SIZE)
    }
  },
  components: {
    appNav: appNav
  },
  methods: {
    toProjectAdd (type, id) {
      id = id || ''
      this.$router.push('projectAdd?type=' + type + '&id=' + id)
    },
    query (index) {
      index = index || 1
      let self = this
      this.currentPage = index
      this.$http.post('/api/project/query', {
        pageIndex: index,
        pageSize: self.PAGE_SIZE
      })
      .then(res => {
        if (res.data.code === '0') {
          self.list = res.data.projectList
          self.total = res.data.total
        } else if (res.data.code === '401') {
          self.$router.push('/admin/login')
        }
      })
    },
    deleteProject (id) {
      let msg = '确认删除吗?'
      if (!confirm(msg)) {
        return
      }
      let self = this
      this.$http.post('/api/project/delete', {
        projectId: id
      })
      .then(res => {
        if (res.data.code === '0') {
          alert('删除成功')
          self.query(self.currentPage)
        } else {
          alert('删除失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../scss/main.scss';
</style>
