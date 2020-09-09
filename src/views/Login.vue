<template>
  <div>
    <my-header>登录</my-header>
    <my-logo></my-logo>
    <van-form @submit="login">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <p class="tips">
      没有账号？去
      <router-link to="./register">注册</router-link>
    </p>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  created() {
    console.log(this.$route.params);
    this.username = this.$route.params.username;
    this.password = this.$route.params.password;
  },
  data() {
    return {
      username: "",
      password: "",
      rules: {
        username: [
          { required: true, message: "请填写用户名", trigger: "onChange" },
          {
            pattern: /^\d{5,11}$/,
            message: "用户名5-11位",
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
    async login(values) {
      const res = await this.$axios.post("/login", {
        username: this.username,
        password: this.password,
      });
      const { statusCode, data, message } = res.data;
      if (statusCode === 200) {
        this.$toast.success(message);
        this.$router.push("/user");
      } else {
        this.$toast("账号密码错误");
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