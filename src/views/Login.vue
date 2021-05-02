<template>
  <form>
    <label for="email">Email</label>
    <input type="email" v-model="email" name="email" id="email" />
    <label for="password">Password</label>
    <input type="password" v-model="password" name="password" id="password" />
    <button @click.prevent="login">Login</button>
  </form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log(this.email, this.password);
    },
  },
};
</script>
