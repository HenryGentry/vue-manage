<template>
  <div>
    <div class="product-container">
      <table>
        <thead>
          <tr >
            <th class="text-center">ID</th>
            <th class="text-center">产品名称</th>
            <th class="text-center">产品备注</th>
            <th class="text-center">产品描述</th>
            <th class="text-center">创建时间</th>
            <th class="text-center">产品图片</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.remake }}</td>
            <td>{{ item.describe }}</td>
            <td>{{ item.date }}</td>
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
        remake: '这是一条备注',
        describe: '这是一条描述',
        date: '2017-01-10',
        thumbnail: '../../resources/kite.jpg'
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

<style lang="scss" scoped>
  @import '../../scss/main.scss';
  .table-image {
    max-width: $max-image;
    max-height: $max-image;
  }
</style>

