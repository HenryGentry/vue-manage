<template>
  <div>
    <app-nav currentIndex="6"></app-nav>
    <table>
      <thead>
        <tr>
          <th class="text-center">序号</th>
          <th class="text-center">案例名称</th>
          <th class="text-center">案例备注</th>
          <th class="text-center">项目数</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item.caseId">
          <td>{{ index + 1 }}</td>
          <td>{{ item.caseName }}</td>
          <td>{{ item.caseMemo }}</td>
          <td>{{ item.projectList.length }}</td>
          <td>
            <button class="button" @click="toCaseAdd('update', item.caseId, item.caseName, item.caseMemo)">修改</button>
            <button class="button alert" @click="deleteCase(item.caseId, item.projectList.length)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="button" @click="toCaseAdd('add')">新增案例</button>
  </div>
</template>

<script>
import appNav from '../Nav'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.query()
  },
  components: {
    appNav: appNav
  },
  methods: {
    toCaseAdd (type, id, name, remark) {
      id = id || ''
      name = name || ''
      remark = remark || ''
      this.$router.push('casesAdd?type=' + type + '&id=' + id + '&name=' + name + '&remark=' + remark)
    },
    query () {
      let self = this
      this.$http.post('/api/case/query', {})
      .then(res => {
        if (res.data.code === '0') {
          self.list = res.data.caseList
        }
      })
    },
    deleteCase (id, count) {
      if (count > 0) {
        alert('该案例下有项目，无法删除，请先删除该项目')
        return
      }
      let msg = '确认删除吗?'
      if (!confirm(msg)) {
        return
      }
      this.$http.post('/api/case/delete', {
        caseId: id
      })
      .then(res => {
        if (res.data.code === '0') {
          alert('删除成功')
          self.query()
        } else if (res.data.code === '401') {
          self.$router.push('/login')
        } else {
          alert('删除失败')
        }
      })
    }
  }
}
</script>
