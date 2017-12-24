<template>
  <div>
    <app-nav currentIndex="4"></app-nav>
    <div class="product-container">
      <table>
        <thead>
          <tr>
            <th class="text-center">编号</th>
            <th class="text-center">产品名称</th>
            <th class="text-center">产品备注</th>
            <th class="text-center">产品描述</th>
            <th class="text-center">创建时间</th>
            <th class="text-center">产品图片</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="item.productId">
            <td>{{ index + 1 }}</td>
            <td>{{ item.productName}}</td>
            <td>{{ item.productRemark }}</td>
            <td><p class="desc float-center">{{ item.productDesc }}</p></td>
            <td>{{ item.createTime }}</td>
            <td><img :src="item.imgUrl" :alt="item.imgUrl" class="table-image"></td>
            <td>
              <button class="button" @click="updateProduct('update', item.productId)">修改</button>
              <button class="button alert" @click="removeProduct(item.productId)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <button class="button" @click="updateProduct('add')">+ 增加产品信息</button>
    </div>
  </div>
</template>

<script>
import Nav from '../Nav'
export default {
  data () {
    return {
      isAdd: false,
      list: []
    }
  },
  created () {
    this.queryProduct()
  },
  methods: {
    queryProduct () {
      let self = this
      this.$http.post('/api/product/query', {})
      .then(res => {
        if (res.data.code === '0') {
          self.list = res.data.productList
        }
        if (res.data.code === '401') {
          self.$router.push('/login')
        }
      })
    },
    updateProduct (type, id) {
      id = id || ''
      this.$router.push('productAdd?type=' + type + '&id=' + id)
    },
    removeProduct (id) {
      // 二次确认
      let msg = '确认删除吗?'
      if (!confirm(msg)) {
        return
      }
      let self = this
      this.$http.post('/api/product/delete', {
        productId: id
      })
      .then(res => {
        if (res.data.code === '0') {
          alert('删除成功')
          self.queryProduct()
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

<style lang="scss" scoped>
  @import '../../scss/main.scss';
  .table-image {
    max-width: $max-image;
    max-height: $max-image;
  }
</style>
