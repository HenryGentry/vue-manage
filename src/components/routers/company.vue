<template>
  <div>
    <app-nav currentIndex="5"></app-nav>
    <div class="company-container text-left">
      <label for="header">
        公司名字
        <input type="text" placeholder="公司名字">
      </label>
      <label for="content">
        公司简介
        <textarea name="content" id="content" placeholder="公司简介" rows="12"></textarea>
      </label>
      <button class="button">保存</button>
    </div>
  </div>
</template>

<script>
import Nav from '../Nav'
export default {
  components: {
    appNav: Nav
  }
}
</script>

