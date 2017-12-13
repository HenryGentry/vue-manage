<template>
  <div>
    <table>
      <thead>
        <tr>
          <th class="text-center">ID</th>
          <th class="text-center">分类名称</th>
          <th class="text-center">分类描述</th>
          <th class="text-center">分类新闻数</th>
          <th class="text-center">创建时间</th>
          <th class="text-center">修改时间</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ list.id }}</td>
          <td>{{ list.name }}</td>
          <td>{{ list.describe }}</td>
          <td>{{ list.newsCount }}</td>
          <td>{{ list.createDate }}</td>
          <td>{{ list.updateDate }}</td>
          <td><button class="button">修改</button></td>
          <td><button class="button alert">删除</button></td>
        </tr>
      </tbody>
    </table>
    <button class="button" @click="addClassify">+ 新增分类</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: {
        id: 1,
        name: '时事政治',
        describe: '这是一条描述',
        newsCount: 5,
        createDate: '2017-01-23',
        updateDate: '2017-03-23'
      }
    }
  },
  methods: {
    addClassify () {
      this.$router.push('classifyAdd')
    }
  }
}
</script>

