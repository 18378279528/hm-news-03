<template>
  <div>
    <my-header>注册</my-header>
    <my-logo></my-logo>
    <van-form @submit="register">
      <van-field
        v-model="user.username"
        name="name"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="user.nickname"
        name="nickname"
        label="昵称"
        placeholder="昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <p class="tips">
      已有账号？去
      <router-link to="./login">登录</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        nickname: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请填写用户名", trigger: "onChange" },
          {
            pattern: /^\d{5,11}$/,
            message: "用户名5-11位",
            trigger: "onChange",
          },
        ],
        nickname: [
          { required: true, message: "请填写昵称", trigger: "onChange" },
          {
            pattern: /^[\u4e00-\u9fa5]{2,6}$/,
            message: "昵称必须2-6位的中文",
            trigger: "onChange",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "onChange" },
          { pattern: /^\d{3,9}$/, message: "密码3-9位", trigger: "onChange" },
        ],
      },
    };
  },
  methods: {
    async register(v) {
      console.log(v);
      const res = await this.$axios.post("/register", {
        username: this.user.username,
        nickname: this.user.nickname,
        password: this.user.password,
      });
      console.log(res);
      const { statusCode, data, message } = res.data;
      if (statusCode === 200) {
        this.$toast.success(message);
        this.$router.push({
          name: "login",
          params: {
            username: this.user.username,
            password: this.user.password,
          },
        });
      } else {
        this.$toast.fail(message);
      }
    },
  },
};
</script>

<style lang='less' scoped>
.tips {
  text-align: right;
  font-size: 16px;
  padding: 15px;
  a {
    color: orange;
  }
}
</style>