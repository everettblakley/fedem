<template>
  <div class="mt-8 px-8 md:px-0">
    <span class="flex flex-col space-y-4 items-center">
      <h2 class="text-center">Welcome to FedEmAt</h2>
      <p>The world's best pet feeding tracking app</p>
      <p>Please login</p>
    </span>
    <form
      class="form mx-auto w-auto md:w-1/2 lg:w-1/3"
      @submit.prevent="submit"
    >
      <div class="group" :class="{ error: errors.email }">
        <label for="email">Email</label>
        <input type="email" v-model="email" name="email" id="email" required />
        <small v-if="errors.email" class="text-sm text-red-500">{{
          errors.email
        }}</small>
      </div>

      <div class="group" :class="{ error: errors.password }">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="password"
          name="password"
          id="password"
          required
        />
        <small v-if="errors.password" class="text-sm text-red-500">{{
          errors.password
        }}</small>
      </div>
      <button class="btn mt-4" type="submit">Login</button>
    </form>

    <div class="text-center pt-8">
      <router-link to="/sign-up" class="btn hover:underline"
        >Sign up</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    submit() {
      console.log(this.email, this.password);
      this.login({ email: this.email, password: this.password })
        .then(() => this.$router.replace({ name: "Home" }))
        .catch((errors) => {
          this.errors = errors;
        });
    },
    ...mapActions(["login"]),
  },
};
</script>
