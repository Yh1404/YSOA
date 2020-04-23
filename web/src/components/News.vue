<template>
  <div>
    <div></div>
    <el-badge :is-dot="item.status === 'UNREAD' ? true : false " v-for="item in news" :key="item._id">
      <el-card shadow="hover" @dblclick.native="readNew(item._id)">
        <p>{{item.type}}</p>
        <span>{{item.body}}</span>
      </el-card>
    </el-badge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: []
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
      const res = await this.$axios.get(`/web/news/${this.$store.getters.id}`);
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
}
</style>

