<template>
  <div class="flex flex-col items-center space-y-4">
    <router-link v-if="authenticated" to="/profile" active-class="underline"
      >Profile</router-link
    >
    <router-link v-if="authenticated" :to="{ name: 'Logout' }"
      >Logout</router-link
    >
    <router-link
      v-if="!authenticated"
      :to="{ name: 'Login' }"
      active-class="underline"
      >Login</router-link
    >
    <router-link v-if="!authenticated" to="/sign-up" active-class="underline"
      >Sign up</router-link
    >
    <router-link to="/about" active-class="underline">About</router-link>
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
