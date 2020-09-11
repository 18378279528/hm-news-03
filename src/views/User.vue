<template>
  <div>
    <div class="header" @click="$router.push('/edit')">
      <div class="avatar">
        <img :src="base+user.head_img" alt />
      </div>
      <div class="info">
        <div class="name">
          <span v-if="user.gender==0" class="iconfont iconxingbienv"></span>
          <span v-else class="iconfont iconxingbienan"></span>
          <span>{{user.nickname}}</span>
        </div>
        <div class="time">{{user.create_date|time}}</div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-nav to="/follow">
      我的关注
      <template #content>关注的用户</template>
    </hm-nav>
    <hm-nav>
      我的跟帖
      <template #content>跟帖/回复</template>
    </hm-nav>
    <hm-nav>
      我的收藏
      <template #content>文章/视频</template>
    </hm-nav>
    <hm-nav to="/edit">设置</hm-nav>
    <van-button type="danger" block @click="leave">退出</van-button>
  </div>
</template>

<script>
export default {
  computed: {
    base() {
      return this.$axios.defaults.baseURL;
    },
  },
  created() {
    this.getInfo();
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    //退出方法
    async leave() {
      try {
        const res = await this.$dialog.confirm({
          title: "温馨提示",
          message: "确认退出吗",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        this.$toast.success("退出成功");
        this.$router.push("/login");
      } catch {
        console.log("取消");
      }
    },
    //获取用户信息
    async getInfo() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const res = await this.$axios.get(`/user/${userId}`);
      const { statusCode, data } = res.data;
      if (statusCode == 200) {
        this.user = data;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.header {
  height: 70px;
  display: flex;
  border-bottom: 3px solid #ddd;
  align-items: center;
  padding: 20px 10px;
  .avatar {
    width: 70px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .info {
    flex: 1;
    padding-left: 10px;
    font-size: 16px;
    .name {
      span:first-child {
        margin-right: 5px;
      }
      .iconxingbienan {
        color: skyblue;
      }
      .iconxingbienv {
        color: pink;
      }
    }
    .time {
      margin-top: 10px;
      color: #666;
    }
  }
}
</style>