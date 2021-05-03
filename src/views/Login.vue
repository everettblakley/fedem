<template>
  <form class="form mx-auto w-auto md:w-1/2 lg:w-1/3">
    <div class="group">
      <label for="email">Email</label>
      <input type="email" v-model="email" name="email" id="email" required />
    </div>

    <div class="group">
      <label for="password">Password</label>
      <input
        type="password"
        v-model="password"
        name="password"
        id="password"
        required
      />
    </div>
    <button class="btn mt-4" @click.prevent="submit" type="submit">
      Login
    </button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submit() {
      this.login(this.email, this.password).then(() =>
        this.$router.replace({ name: "Home" })
      );
    },
    ...mapActions(["login"]),
  },
};
</script>
