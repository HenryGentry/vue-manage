<template>
  <div>
    <app-nav currentIndex="2"></app-nav>
    <table>
      <thead>
        <tr>
          <th class="text-center">编号</th>
          <th class="text-center">标题</th>
          <th class="text-center">作者</th>
          <th class="text-center">新闻发布时间</th>
          <th class="text-center">修改时间</th>
          <th class="text-center">备注</th>
          <th class="text-center">发布状态</th>
          <th class="text-center">所属分类</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item.newsId">
          <td>{{ index + 1 }}</td>
          <td>{{ item.newsTitle }}</td>
          <td>{{ item.newsAuthor }}</td>
          <td>{{ item.newsCreateTime }}</td>
          <td>{{ item.newsUpdateTime }}</td>
          <td>{{ item.newsRemark }}</td>
          <td>{{ item.newsStatus }}</td>
          <td>{{ item.newsCategoryName }}</td>
          <td>
            <button class="button" @click="updateNews('update', item.newsId)">修改</button>
            <button class="button alert" @click="removeNews(item.newsId)">删除</button>
            <button class="button" v-if="item.newsStatus === 0" @click="changeStatus(item.newsId)">发&ensp;&ensp;布</button>
            <button class="button" v-else-if="item.newsStatus === 1" @click="changeStatus(item.newsId)">不发布</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="button" @click="updateNews('add')">+ 增加新闻</button>

    <ul class="pagination">
      <li class="pagination-previous" :class="{ disabled: currentPage === 1 }" @click="queryNews(currentPage - 1)" v-show="lastPage > 1">
        <a v-if="currentPage !== 1">上一页<span class="show-for-sr">page</span></a>
        <span v-else>上一页<span class="show-for-sr">page</span></span>
      </li>
      <li v-for="n in lastPage" :key="n" @click="queryNews(n)" :class="{current: currentPage === n}">
        <span v-if="currentPage === n">{{ n }}</span>
        <a v-else>{{ n }}</a>
      </li>
      <li class="pagination-next" :class="{ disabled: currentPage === lastPage }" @click="queryNews(currentPage + 1)" v-show="lastPage > 1">
        <a v-if="currentPage !== lastPage">下一页 <span class="show-for-sr">page</span></a>
        <span v-else>下一页<span class="show-for-sr">page</span></span>
      </li>
    </ul>
  </div>  
</template>

<script>
import Nav from '../Nav'

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
    if (from.name === 'newsAdd') {
      next(vm => {
        vm.queryNews(vm.currentPage)
      })
    }
    next()
  },
  created () {
    this.queryNews()
  },
  components: {
    appNav: Nav
  },
  computed: {
    lastPage () {
      return Math.ceil(this.total / this.PAGE_SIZE)
    }
  },
  methods: {
    queryNews (index) {
      index = index || 1
      this.currentPage = index
      let data = {
        pageIndex: index,
        pageSize: this.PAGE_SIZE
      }
      let self = this
      this.$http.post('/api/news/query', data)
      .then((res) => {
        if (res.data.code === '0') {
          self.list = res.data.newsList
          self.total = res.data.total
        }
        if (res.data.code === '401') {
          self.$router.push('/admin/login')
        }
      })
    },
    updateNews (type, id) {
      id = id || ''
      this.$router.push('newsAdd?type=' + type + '&id=' + id)
    },
    removeNews (id) {
      let msg = '确认删除吗?'
      if (!confirm(msg)) {
        return
      }
      let self = this
      this.$http.post('/api/news/batchDelete', {
        newsIdList: [id]
      })
      .then(res => {
        if (res.data.code === '0') {
          alert('删除成功')
          self.queryNews(self.currentPage)
        } else {
          alert('删除失败')
        }
      })
    },
    changeStatus (id) {
      let self = this
      this.$http.post('/api/news/updateStatus', {
        newsId: id
      })
      .then(res => {
        if (res.data.code === '0') {
          self.queryNews(self.currentPage)
        } else if (res.data.code === '401') {
          self.$router.push('/admin/login')
        }
      })
    }
  }
}
</script>
