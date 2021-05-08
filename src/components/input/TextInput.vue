<template>
  <div class="group" :class="{ error: error }">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    />
    <slot></slot>
    <small v-if="error" class="text-sm text-red-500">{{ error }}</small>
  </div>
</template>
<script>
export default {
  name: "TextInput",
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      validator: function (value) {
        // The value must match one of these strings
        return ["email", "text", "number", "password"].indexOf(value) !== -1;
      },
      default: "text",
    },
    error: {
      type: String,
      default: "",
    },
  },
};
</script>
