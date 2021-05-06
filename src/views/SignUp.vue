<template>
  <div class="mt-4 px-8 pb-8 sm:px-0">
    <span class="flex flex-col space-y-4 items-center text-center mb-5">
      <h3 class="hard-shadow-orange">Welcome to FedEmAt</h3>
      <p>
        The best way to keep your pets happy and remember when you last fed 'em
        at!
      </p>
      <p>Before getting started, let's get a little information about you!</p>
    </span>
    <form
      class="form mx-auto w-auto sm:w-3/4 md:w-1/2 lg:w-1/3 overflow-hidden"
      @submit.prevent="goForward"
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
          <text-input
            v-model="fields.name"
            :error="errors.name"
            label="Name"
            id="name"
          />
          <text-input
            v-model="fields.email"
            type="email"
            :error="errors.email"
            label="Email"
            id="email"
          />
          <text-input
            v-model="fields.password"
            type="password"
            :error="errors.password"
            label="Password"
            id="password"
          >
            <small class="text-gray-500" name="password-help"
              >Password must be at least 8 characters, one uppercase, one
              lowercase, and one number. You know, the usual stuff.</small
            >
          </text-input>
          <text-input
            v-model="fields.confirmPassword"
            type="password"
            :error="errors.confirmPassword"
            label="Confirm Password"
            id="confirmPassword"
          />
        </div>
        <div v-else-if="step === 2" key="group">
          <text-input
            v-model="fields.group"
            type="text"
            :error="errors.group"
            label="Group"
            id="group"
          >
            <small class="text-gray-500" name="password-help"
              >Groups are how pets are organized. A person can be in many
              groups, but we'll start with just one for now. You can change the
              name later if you want</small
            >
          </text-input>
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
          type="button"
          @click.prevent="goBack"
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
import TextInput from "../components/input/TextInput.vue";
import { mapActions } from "vuex";
export default {
  name: "SignUp",
  components: { TextInput },
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
        group: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    goBack() {
      if (this.step > 0) {
        this.step = this.step - 1;
      }
    },
    goForward() {
      const errors = this.validate();
      if (Object.values(errors).every((v) => !v)) {
        if (this.step === 3) {
          this.submit();
        } else {
          this.step += 1;
        }
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
      this.login(this.fields).then(() =>
        this.$router.replace({ name: "Home" })
      );
    },
    ...mapActions(["login"]),
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
