<template>
  <div class="px-8 sm:px-0">
    <h3>Welcome to FedEmAt</h3>
    <p>The world's best pet feeding app</p>
    <p>Before getting started, let's get a little information about you!</p>
    <form
      class="form mx-auto w-auto sm:w-3/4 md:w-1/2 lg:w-1/3"
      @submit.prevent="submit"
    >
      <transition name="step">
        <div v-if="step === 1">
          <div class="group">
            <label for="name">Name</label
            ><input id="name" type="text" v-model="fields.name" />
          </div>
        </div>
        <div v-else-if="step === 2">
          <div class="group">
            <label for="group">Group Name</label
            ><input type="text" v-model="fields.group" />
          </div>
        </div>
        <div v-else>Step {{ step }}</div>
      </transition>
      <button class="btn" @click.prevent="progress">Next</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "SignUp",
  data: function () {
    return {
      step: 1,
      fields: {
        name: "",
        email: "",
        group: "",
        password: "",
        confirmPassword: "",
      },
      errors: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    progress() {
      const errors = this.validate();
      if (Object.keys(errors).length === 0) {
        this.step = this.step + 1;
      } else {
        this.errors = errors;
      }
    },
    validate() {
      return {};
    },
    submit() {
      console.log(this.fields);
    },
  },
};
</script>
