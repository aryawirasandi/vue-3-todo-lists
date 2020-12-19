<template>
  <div class="card border-0 shadow">
    <div class="card-body">
      <h5 class="card-title">
        {{ todo.title }}
      </h5>
      <p class="card-text">
        {{ todo.description }}
      </p>
      <div>
        <input type="checkbox" />
        {{ todo.status ? "Done" : "Undone" }}
      </div>
      <button class="btn btn-danger" @click="$emit('delete')">Delete</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    todo: {
      type: Object,
    },
    id: {
      type: String,
    },
  },
  emits : ['delete']
};
</script>