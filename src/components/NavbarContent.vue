<template>
  <div class="flex flex-col items-center space-y-4">
    <router-link v-if="authenticated" to="/profile" active-class="underline"
      ><p>Profile</p></router-link
    >
    <p v-if="authenticated" @click="logout" class="cursor-pointer">Logout</p>
    <router-link
      v-if="!authenticated"
      :to="{ name: 'Login' }"
      active-class="underline"
      ><p>Login</p></router-link
    >
    <router-link v-if="!authenticated" to="/sign-up" active-class="underline"
      ><p>Sign up</p></router-link
    >
    <router-link to="/about" active-class="underline"><p>About</p></router-link>
  </div>
</template>

<script>
export default {
  name: "NavbarContent",
  props: {
    authenticated: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace({ name: "Login" });
    },
  },
};
</script>
