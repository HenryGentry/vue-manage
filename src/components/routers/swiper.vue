<template>
  <div>
    <div class="swiper-container">
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
            <td><button class="button" @click="addSwiper">修改</button></td>
            <td><button class="button alert">删除</button></td>
          </tr>
        </tbody>
      </table>
      
      <div class="add-button">
        <button class="button" @click="addSwiper">+ 添加轮播图</button>
      </div>
      
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
        url: 'https://www.baidu.com',
        thumbnail: '../../resources/kite.jpg'
      }, {
        id: 1,
        name: '测试图片一',
        url: 'https://www.baidu.com',
        thumbnail: '../../resources/kite.jpg'
      }, {
        id: 1,
        name: '测试图片一',
        url: 'https://www.baidu.com',
        thumbnail: '../../resources/kite.jpg'
      }, {
        id: 1,
        name: '测试图片一',
        url: 'https://www.baidu.com',
        thumbnail: '../../resources/kite.jpg'
      }]
    }
  },
  methods: {
    addSwiper () {
      this.$router.push('swiperChange')
    },
    cancel () {
      this.isAdd = !this.isAdd
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
  .custom-input {
    display: inline-block;
  }
</style>
