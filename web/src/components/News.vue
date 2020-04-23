<template>
  <div>
    <div></div>
    <el-badge :is-dot="item.status === 'UNREAD' ? false : true " v-for="item in news" :key="item.id">
      <el-card shadow="hover">
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
  computed: {},
  created() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      const res = await this.$axios.get(`/web/news/${this.$store.getters.id}`);
      this.news = res.data;
    }
  }
};
</script>

<style >
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

