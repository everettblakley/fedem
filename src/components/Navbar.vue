<template>
  <b-navbar type="is-info">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="../assets/logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
        <h5 class="ml-2 subtitle has-text-white has-text-weight-normal">
          Fed<span class="has-text-weight-bold has-text-grey-dark">Em</span>
        </h5>
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-info">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light"> Log in </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
