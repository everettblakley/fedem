<template>
  <div
    class="mx-auto flex flex-col sm:flex-row divide-y divide-x-0 sm:divide-y-0 sm:divide-x divide-black"
  >
    <aside class="flex flex-col">
      <router-link to="#personal-info">Personal Info</router-link>
      <router-link to="#groups">Groups</router-link>
    </aside>
    <div>
      <section id="personal-info">
        <text-input
          label="Name"
          id="name"
          v-model="user.name"
          :error="errors.name"
        ></text-input>
        <text-input
          label="Email"
          id="email"
          v-model="user.email"
          :error="errors.email"
        ></text-input>
      </section>
      <section id="groups"></section>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import TextInput from "../components/input/TextInput.vue";
export default {
  name: "Profile",
  data() {
    return {
      errors: {
        name: "",
        email: "",
      },
    };
  },
  created() {
    if (!this.authenticated) {
      this.$router.push({ name: "Login" });
    }
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["authenticated"]),
  },
  components: { TextInput },
};
</script>
