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
      <li class="pagination-previous"><a href="#">上一页 <span class="show-for-sr">page</span></a></li>
      <li><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li class="ellipsis"></li>
      <li><a href="#">4</a></li>
       <li class="pagination-next"><a href="#">下一页 <span class="show-for-sr">page</span></a></li>
    </ul>
  </div>  
</template>

<script>
import Nav from '../Nav'

export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.queryNews()
  },
  components: {
    appNav: Nav
  },
  methods: {
    addNews () {
      this.$router.push('newsAdd')
    },
    queryNews () {
      let self = this
      this.$http.post('/api/news/query', {})
      .then((res) => {
        if (res.data.code === '0') {
          self.list = res.data.newsList
        }
        if (res.data.code === '401') {
          self.$router.push('/login')
        }
      })
    }
  }
}
</script>
