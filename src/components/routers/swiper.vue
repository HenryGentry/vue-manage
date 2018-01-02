<template>
  <div>
    <app-nav currentIndex="1"></app-nav>
    <div class="swiper-container">
      <table>
        <thead>
          <tr>
            <th class="text-center">编号</th>
            <th class="text-center">标题</th>
            <th class="text-center">轮播顺序</th>
            <th class="text-center">地址</th>
            <th class="text-center">缩略图</th>
            <th class="text-center">备注</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.slideshowName }}</td>
            <td>{{ item.orderNum }}</td>
            <td>{{ item.skipUrl }}</td>
            <td><img :src="item.imgUrl" alt="" class="table-image"></td>
            <td>{{ item.remark }}</td>
            <td>
              <button 
                class="button" 
                @click="updateSwiper('update', item.slideshowId, item.slideshowName, item.skipUrl, item.remark, item.imgUrl, item.imgId)">
              修改</button>
              <button class="button alert" @click="deleteSlide(item.slideshowId)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="add-button">
        <button class="button" @click="updateSwiper('add')">+ 添加轮播图</button>
      </div>
      
    </div>
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
  beforeRouteEnter (to, from, next) {
    if (from.name === 'swiperChange') {
      next(vm => {
        vm.query()
      })
    }
    next()
  },
  created () {
    this.query()
  },
  methods: {
    updateSwiper (type, slideshowId, title, skipUrl, remark, imgUrl, imgId) {
      title = title || ''
      skipUrl = skipUrl || ''
      remark = remark || ''
      imgUrl = imgUrl || ''
      slideshowId = slideshowId || ''
      imgId = imgId || ''
      this.$router.push('swiperChange?type=' + type + '&slideshowId=' + slideshowId + '&orderNum=' + this.list.length + '&title=' + title + '&skipUrl=' + skipUrl + '&remark=' + remark + '&imgUrl=' + imgUrl + '&imgId=' + imgId)
    },
    query () {
      let self = this
      this.$http.post('/api/slideshow/query', {})
      .then((res) => {
        if (res.data.code === '0') {
          self.list = res.data.slideshowList
        }
        if (res.data.code === '401') {
          self.$router.push('/admin/login')
        }
      })
    },
    deleteSlide (slideshowId) {
      // 二次确认
      let msg = '确认删除吗?'
      if (!confirm(msg)) {
        return
      }
      let self = this
      this.$http.post('/api/slideshow/delete', { slideshowId: slideshowId })
      .then(res => {
        if (res.data.code === '0') {
          alert('删除成功')
          self.query()
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
  .custom-input {
    display: inline-block;
  }
</style>
