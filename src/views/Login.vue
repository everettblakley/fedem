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
import { mapGetters } from "vuex";
import TextInput from "../components/input/TextInput.vue";
import { emailValidator, passwordValidator } from "../utilities/validators";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
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
    validate() {
      this.errors = {
        email: emailValidator(this.email),
        password: passwordValidator(this.password),
      };
      return Object.values(this.errors).every((v) => !v);
    },
    async submit() {
      if (!this.validate()) return;
      this.errors = {};
      this.$store.commit("setIsLoading", true);
      const { user, session, error } = await this.$supabase.auth.signIn({
        email: this.email,
        password: this.password,
      });
      this.$store.commit("setIsLoading", false);
      if (error) {
        console.log(error);
        const { message } = error;
        this.errors = {
          email: message,
          password: message,
        };
      } else {
        this.$store.commit("setUser", user);
        this.$store.comment("setSession", session);
        this.$router.push({ name: "Home" });
      }
    },
  },
  components: { TextInput },
};
</script>
