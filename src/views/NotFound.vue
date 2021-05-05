<template>
  <div class="container mx-auto px-8">
    <h3>Hmm.. Couldn't find that</h3>
    <p>Not sure what you were looking for. But you didn't find it here</p>
    <router-link :to="{ name: 'Home' }">Go home instead</router-link>
  </div>
</template>
<script>
export default {
  name: "NotFound",
};
</script>
