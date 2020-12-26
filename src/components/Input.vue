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
    <!-- <div :class="valids">{{ validMesssage }}</div> -->
  </div>
</template>
<script>
import { watchEffect } from 'vue';
export default {
  props: {
    label: {
      type: String,
    },
    value: {
      type: String,
    },
    invalidMessage: {
      type: String,
      default : null
    },
    isError: {
      type: Object,
    },
  },
  emits: ['input'],
  setup(_) {
    const valids = {
      "invalid-feedback": _.isError,
      "valid-feedback": !_.isError,
    };
    const validForms = {
      "is-valid": !_.isError,
      "is-invalid": _.isError,
    };
    return {
      valids,
      validForms,
    };
  },
  methods : {
    input(value){
      this.$emit('input', value)
    }
  }
};
</script>