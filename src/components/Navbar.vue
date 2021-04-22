<template>
  <b-navbar type="is-primary">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="../assets/logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
        <h5 class="ml-2 subtitle has-text-white has-text-weight-normal">
          Fed<span class="has-text-weight-bold has-text-black">Em</span>
        </h5>
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div v-if="user">
          <b-dropdown
            class="is-hidden-touch"
            aria-role="menu"
            position="is-bottom-left"
            append-to-body
          >
            <template #trigger>
              <figure class="image is-32x32">
                <img
                  class="is-rounded image-navar-item"
                  src="https://via.placeholder.com/32"
                />
              </figure>
            </template>
            <b-dropdown-item custom aria-role="menuitem">
              Logged as <b>Rafael Beraldo</b>
            </b-dropdown-item>
            <b-dropdown-item has-link aria-role="menuitem">
              <a href="https://google.com" target="_blank">
                <b-icon icon="link"></b-icon>
                Google (link)
              </a>
            </b-dropdown-item>
          </b-dropdown>
          <ul class="is-hidden-desktop">
            <li>Sign out</li>
            <li>Profile</li>
          </ul>
        </div>
        <div v-else class="buttons">
          <a class="button is-secondary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light is-outlined"> Log in </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
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

<style scoped>
.image-navar-item {
  max-height: 2rem;
}
</style>
