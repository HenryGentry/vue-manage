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
            <button class="button">修改</button>
            <button class="button alert">删除</button>
            <button class="button">发布</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="button" @click="addNews">+ 增加新闻</button>

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
    addNews () {
      this.$router.push('newsAdd')
    },
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
          self.$router.push('/login')
        }
      })
    }
  }
}
</script>
