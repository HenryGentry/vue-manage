<template>
  <div>
    <div class="product-container">
      <table>
        <thead>
          <tr >
            <th class="text-center">ID</th>
            <th class="text-center">标题</th>
            <th class="text-center">地址</th>
            <th class="text-center">缩略图</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.url }}</td>
            <td><img :src="item.thumbnail" :alt="item.name" class="table-image"></td>
            <td><button class="button">修改</button></td>
            <td><button class="button alert">删除</button></td>
          </tr>
        </tbody>
      </table>

      <button class="button" @click="addProduct">+ 增加产品信息</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isAdd: false,
      list: [{
        id: 1,
        name: '测试图片一',
        url: 'https://www.baidu.com'
      }]
    }
  },
  methods: {
    addProduct () {
      this.$router.push('productAdd')
    }
  }
}
</script>
