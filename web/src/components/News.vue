<template>
  <div>
    <div class="empty" v-if="news.length == 0">暂时没有消息。。。</div>
    <el-button id="refresh_btn" type="primary" @click="fetchNews" :loading="loading">刷新消息</el-button>
    <el-badge :is-dot="item.status === 'UNREAD' ? true : false" v-for="item in news" :key="item._id">
      <el-card shadow="hover" @dblclick.native="readNew(item._id)">
        <p>{{ item.type }}</p>
        <span>{{ item.title }}</span>
      </el-card>
    </el-badge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
      loading: false
    };
  },
  computed: {
    newsCount() {
      let sum = 0;
      for (let i = 0; i < this.news.length; i++) {
        if (this.news[i].status === "UNREAD") sum++;
      }
      return sum;
    }
  },
  watch: {
    newsCount: function(data) {
      this.$emit("fetchCount", data);
    }
  },
  created() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      this.loading = true;
      const res = await this.$axios.get(`/web/news/${this.$store.getters.id}`);
      this.loading = false;
      this.news = res.data;
    },
    async readNew(id) {
      await this.$axios.put(`/web/news/${id}`);
      this.fetchNews();
    }
  }
};
</script>

<style>
.el-badge {
  display: block;
}
.el-badge__content.is-fixed.is-dot {
  right: 10px;
}
.el-badge__content.is-fixed {
  top: 5px;
}
.el-card {
  margin-bottom: 10px;
  border-radius: 20px;
  text-align: left;
}
.empty {
  margin: 0 auto;
  width: 95%;
  height: 100px;
  background-color: #fff;
  border-radius: 10px;
  color: #ccc;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  line-height: 100px;
}
#refresh_btn {
  margin-left: 1000px;
  margin-top: 5px;
}
</style>
