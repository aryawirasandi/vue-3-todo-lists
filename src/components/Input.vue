<template>
  <div>
    <label :for="label" class="form-label outline-none">
      {{ label }}
    </label>
    <input
      type="text"
      class="form-control"
      :class="validForms"
      aria-describedby="input your todo here"
      :id="label"
      :value="value"
      @input="input($event.target.value)"
    />
    <div :class="valids">{{ message }}</div>
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
    validate: {
      type: Object,
      default: {
        message: "",
        error: false,
      },
    },
  },
  emits: ["input"],
  setup(_) {
    const valids = {
      "invalid-feedback": _.validate.error,
      "valid-feedback": !_.validate.error,
    };
    const validForms = {
      "is-valid": !_.validate.error,
      "is-invalid": _.validate.error,
    };
    const message = computed(() =>
      _.validate.message !== "" ? _.validate.message : ""
    );

    return {
      valids,
      validForms,
      message,
    };
  },
  methods: {
    input(value) {
      this.$emit("input", value);
    },
  },
};
</script>