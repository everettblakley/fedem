<template>
  <h3>Logging you out...</h3>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Logout",
  methods: {
    ...mapActions(["logout"]),
  },
  created() {
    this.logout().then(() => this.$router.replace({ name: "Login" }));
  },
};
</script>
