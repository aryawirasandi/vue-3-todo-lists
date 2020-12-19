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
      @input="$emit('input', $event.target.value)"
    />
    <!-- <div :class="valids">{{ validMesssage }}</div> -->
  </div>
</template>
<script>
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
    },
    isError: {
      type: Boolean,
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
};
</script>