<template>
  <div>
    <app-nav currentIndex="3"></app-nav>
    <table>
      <thead>
        <tr>
          <th class="text-center">ID</th>
          <th class="text-center">分类名称</th>
          <th class="text-center">分类描述</th>
          <th class="text-center">分类新闻数</th>
          <th class="text-center">创建时间</th>
          <th class="text-center">修改时间</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item.categoryId">
          <td>{{ index + 1 }}</td>
          <td>{{ item.categoryName }}</td>
          <td>{{ item.categoryDesc }}</td>
          <td>{{ item.newsCount }}</td>
          <td>{{ item.createTime }}</td>
          <td>{{ item.updateTime }}</td>
          <td>
            <button class="button" @click="updateClassify('update', item.categoryId)">修改</button>
            <button class="button alert" @click="deleteClassify(item.categoryId, item.newsCount)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="button" @click="updateClassify('add')">+ 新增分类</button>
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
    this.queryClassify()
  },
  methods: {
    updateClassify (type, id) {
      id = id || ''
      this.$router.push('classifyAdd?type=' + type + '&id=' + id)
    },
    queryClassify () {
      let self = this
      this.$http.post('/api/category/query', {})
      .then((res) => {
        if (res.data.code === '0') {
          self.list = res.data.categoryList
        }
      })
    },
    deleteClassify (categoryId, newsCount) {
      if (newsCount > 0) {
        alert('该分类下存在新闻，无法删除')
        return
      }
      let self = this
      this.$http.post('/api/category/delete', {
        categoryId: categoryId
      })
      .then(res => {
        if (res.data.code === '0') {
          alert('删除成功')
          self.queryClassify()
        } else {
          alert('删除失败')
        }
      })
    }
  },
  components: {
    appNav: Nav
  }
}
</script>

