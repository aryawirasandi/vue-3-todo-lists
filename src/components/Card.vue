<template>
  <div class="card border-0 shadow">
    <div class="card-body">
      <slot name="content"> </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "card",
};
</script>
<style scoped>
</style>