<template>
  <div class="card border-0 shadow">
    <div class="card-body">
      <div v-if="todo.id === id && todo.isUpdate === true">
        <div>
          <Input label="Update Todo" 
            @input="changeTitle"
            :value="selected.title"
           />
        </div>
        <div>
          <Input
            label="Update Description"
            @input="changeDescription"
            :value="selected.description"
          />
        </div>
        <div class="row my-4">
          <div class="col-4">
            <button class="btn btn-danger" @click="$emit('cancel')">
              Cancel
            </button>
          </div>
          <div class="col-4">
            <button class="btn btn-success" @click="$emit('store')">
              Update
            </button>
          </div>
        </div>
      </div>
      <div v-else-if="todo.id === id && todo.isUpdate === false">
        <h5 class="card-title">
          {{ todo.title }}
        </h5>
        <p class="card-text">
          {{ todo.description }}
        </p>
        <div>
          <input
            type="checkbox"
            @input="$emit('update:status', !todo.status)"
          />
          {{ todo.status ? "Done" : "Undone" }}
        </div>
        <div class="row my-4">
          <div class="col-12 col-md-3 my-2">
            <button class="btn btn-danger" @click="$emit('delete')">
              Delete
            </button>
          </div>
          <div class="col-12 col-md-3 my-2">
            <button class="btn btn-info" @click="$emit('edit')">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Input from "@/components/Input.vue";
import Card from "@/components/Card.vue";
export default {
  props: {
    todo: {
      type: Object,
    },
    status: {
      type: Boolean,
    },
    update: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
    },
    selected : {
      type : Object
    }
  },
  emits: ["delete", "update:status", "update:status", "edit", "cancel"],
  components: { Input, Card },
  setup(_){
    return {
      changeTitle: value => _.selected.title = value,
      changeDescription: value => _.selected.description = value
    }
  }
};
</script>
