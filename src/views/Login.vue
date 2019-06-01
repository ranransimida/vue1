<template>
  <div class="login">
    <my-header title="思密达的项目"></my-header>
    <cube-form :model="model" :schema="schema" @validate="validateHandler" @submit="submitHandler"></cube-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      schema: {
        fields: [
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名"
            },
            rules: {
              required: true,
              type: "string",
              pattern: /[0-9a-zA-Z]{3}/
            },
            trigger: "blur",
            messages: {
              required: "用户名为必填项",
              pattern: "用户名得是三位字母或数字"
            }
          },
          {
            type: "input", // 设置标签
            modelKey: "password", // 与上面model里对应
            label: "密码",
            props: {
              // 设置标签属性
              placeholder: "请输入密码",
              type: "password",
              eye: { open: false }
            },
            rules: {
              required: true
            },
            trigger: "blur",
            messages: {
              required: "密码为必填项"
            }
          },
          {
            type: "submit",
            label: "登录"
          }
        ]
      }
    };
  },
  methods: {
    validateHandler(ret) {
      console.log(ret);
    },
    async submitHandler(e) {
      e.preventDefault();
      console.log("登录了");
      const res = await this.$http.get("/api/login", {
        params: {
          username: this.model.username,
          password: this.model.password
        }
      });
      console.log(res);
      const { code, token, message } = res.data;
      if (code == 0) {
        // 登录成功
        localStorage.setItem("token", token); // 缓存至本地
        this.$store.commit("setToken", token); // 存入store
        // 登录完后 回跳
        const { redirect } = this.$route.query;
        if (redirect) {
          this.$router.push(redirect);
        } else {
          this.$router.push({ path: "/" });
        }
      } else {
        const toast = this.$createToast({
          type: "error",
          txt: message || "登录失败",
          time: 2000
        });
        toast.show();
      }
    }
  }
};
</script>
