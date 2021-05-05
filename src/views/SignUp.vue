<template>
  <div class="mt-8 px-8 pb-8 sm:px-0">
    <span class="flex flex-col space-y-4 items-center text-center mb-5">
      <h3 class="hard-shadow-orange">Welcome to FedEmAt</h3>
      <p>The world's best pet feeding app</p>
      <p>Before getting started, let's get a little information about you!</p>
    </span>
    <form
      class="form mx-auto w-auto sm:w-3/4 md:w-1/2 lg:w-1/3 overflow-hidden"
      @submit.prevent="progress(1)"
      novalidate
    >
      <div class="flex justify-evenly items-center">
        <p class="w-100 transition-colors flex-wrap flex-1 text-center">
          Personal Details
        </p>
        <p
          class="w-100 transition-colors flex-wrap flex-1 text-center"
          :class="{ 'text-gray-500': step < 2 }"
        >
          Group Info
        </p>
        <p
          class="w-100 transition-colors flex-wrap flex-1 text-center"
          :class="{ 'text-gray-500': step < 3 }"
        >
          Pets
        </p>
      </div>
      <div class="my-4 bg-gray-200">
        <div
          class="h-2 bg-yellow-500 transform transition-all"
          :class="{
            'w-1/3': step === 1,
            'w-2/3': step === 2,
            'w-full': step === 3,
          }"
        ></div>
      </div>
      <transition name="step" mode="out-in">
        <div v-if="step === 1" key="personal">
          <div class="group" :class="{ error: errors.name }">
            <label for="name">Name</label
            ><input id="name" type="text" v-model="fields.name" />
            <small v-if="errors.name" class="text-sm text-red-500">{{
              errors.name
            }}</small>
          </div>
          <div class="group" :class="{ error: errors.email }">
            <label for="email">Email</label
            ><input
              type="email"
              name="email"
              id="email"
              v-model="fields.email"
            />
            <small v-if="errors.email" class="text-sm text-red-500">{{
              errors.email
            }}</small>
          </div>
          <div class="group" :class="{ error: errors.password }">
            <label for="password">Password</label
            ><input
              type="password"
              name="password"
              id="password"
              v-model="fields.password"
            />
            <small class="text-gray-500" name="password-help"
              >Password must be at least 8 characters, one uppercase, one
              lowercase, and one number. You know, the usual stuff.</small
            >
            <small v-if="errors.password" class="text-sm text-red-500">{{
              errors.password
            }}</small>
          </div>
          <div class="group" :class="{ error: errors.confirmPassword }">
            <label for="confirm-password">Confirm Password</label
            ><input
              type="password"
              name="confirm-password"
              id="confirm-password"
              v-model="fields.confirmPassword"
            />
            <small v-if="errors.confirmPassword" class="text-sm text-red-500">{{
              errors.confirmPassword
            }}</small>
          </div>
        </div>
        <div v-else-if="step === 2" key="group">
          <div class="group" :class="{ error: errors.group }">
            <label for="group">Group Name</label
            ><input type="text" v-model="fields.group" />
            <small class="text-gray-500" name="password-help"
              >Groups are how pets are organized. A person can be in many
              groups, but we'll start with just one for now. You can change the
              name later if you want</small
            >
            <small v-if="errors.group" class="text-sm text-red-500">{{
              errors.group
            }}</small>
          </div>
        </div>
        <div v-else key="pets">
          <h6>Add some pets, yo!</h6>
        </div>
      </transition>
      <div class="flex justify-between p-2 overflow-hidden">
        <button
          class="btn mt-4 transform transition-opacity"
          :disabled="step === 1"
          :class="{
            'opacity-0': step === 1,
            'opacity-100': step !== 1,
          }"
          @click.prevent="progress(-1)"
        >
          Back
        </button>
        <button class="btn mt-4 bg-yellow-500" type="submit">
          {{ step === 3 ? "Finish" : "Next" }}
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import {
  emailValidator,
  equalValuesValidator,
  notEmptyValidator,
  passwordValidator,
} from "../utilities/validators";
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
      errors: {},
    };
  },
  methods: {
    progress(stepSize) {
      const errors = this.validate();
      if (
        (stepSize === -1 && this.step > 0) ||
        Object.values(errors).every((v) => !v)
      ) {
        this.step = this.step + stepSize;
      }
    },
    validate() {
      switch (this.step) {
        case 1:
          this.errors = {
            name: notEmptyValidator(this.fields.name, "Name"),
            email: emailValidator(this.fields.email),
            password: passwordValidator(this.fields.password),
            confirmPassword: equalValuesValidator(
              this.fields.confirmPassword,
              this.fields.password,
              "Confirm Password",
              "Password"
            ),
          };
          break;
        case 2:
          this.errors = {
            group: notEmptyValidator(this.fields.group, "Group"),
          };
          break;
        default:
          break;
      }
      return this.errors;
    },
    submit() {
      console.log(this.fields);
    },
  },
};
</script>

<style>
.step-enter {
  transform: translateX(100%);
}

.step-enter-to,
.step-leave {
  transform: translateX(0);
}

.step-leave-to {
  transform: translateX(-100%);
}

.step-enter-active,
.step-leave-active {
  transition: transform 250ms ease-out;
}
</style>
