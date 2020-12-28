<template>
  <div>
    <label :for="label" class="form-label outline-none">
      {{ label }}
    </label>
    <input
      type="text"
      class="form-control"
      aria-describedby="input your todo here"
      :id="label"
      :value="value"
      @input="input($event.target.value)"
    />
  </div>
</template>
<script>
import { watchEffect, computed } from "vue";
export default {
  props: {
    label: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  emits: ["input"],
  methods: {
    input(value) {
      this.$emit("input", value);
    },
  },
};
</script>
