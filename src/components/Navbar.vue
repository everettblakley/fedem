<template>
  <div class="container">This is the navbar</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapState(["user"]),
  },
};
</script>
