<template>
  <div class="mt-8 px-8 sm:px-0">
    <span class="flex flex-col space-y-4 items-center text-center">
      <h3 class="hard-shadow-orange">Welcome back</h3>
      <p>Please login</p>
    </span>
    <form
      class="form mx-auto w-auto sm:w-3/4 md:w-1/2 lg:w-1/3"
      @submit.prevent="submit"
    >
      <text-input
        v-model="email"
        :error="errors.email"
        label="Email"
        type="email"
        id="email"
      />

      <text-input
        v-model="password"
        :error="errors.password"
        label="Password"
        type="password"
        id="password"
      />
      <button class="btn mt-4" type="submit">Login</button>
    </form>

    <div class="flex flex-col items-center space-y-4 pt-8">
      <router-link to="/forgot-password" class="btn hover:underline"
        >Forgot Password</router-link
      >
      <router-link to="/sign-up" class="btn hover:underline"
        >Sign up</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TextInput from "../components/input/TextInput.vue";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errors: {},
    };
  },
  computed: {
    ...mapGetters(["authenticated"]),
  },
  created() {
    if (this.authenticated) {
      this.$router.push({ name: "Home" });
    }
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
  components: { TextInput },
};
</script>
