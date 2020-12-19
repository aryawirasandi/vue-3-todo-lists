<template>
  <div class="container py-5">
    <card>
      <template v-slot:content>
        <h1 class="card-title">Submit A Todo</h1>
        <p class="card-text">A place where you can submit your todo here</p>
      </template>
    </card>
    <form @submit.prevent="submitData">
      <card>
        <template v-slot:content>
          <div class="mb-3">
            <Input label="todo" v-model:value="title" />
          </div>
          <div class="mb-3">
            <Input label="description" v-model:value="description" />
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-primary">Submit A Todo</button>
          </div>
        </template>
      </card>
    </form>
    <div class="row mt-3" v-if="todos.length === 0">
      <h1 class="text-center">Data is not found</h1>
    </div>
    <div class="row mt-3" v-else>
      <div class="col-md-4 my-2" v-for="todo in todos" :key="todo.id">
        <todo :todo="todo" @delete="deleteData" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Input from "@/components/Input.vue";
import Todo from "@/components/Todo.vue";
import { ref, computed, reactive, readonly } from "vue";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "App",
  setup() {
    const title = ref("");
    const description = ref("");
    const error = ref(true);
    const todos = reactive([]);

    console.log(readonly(todos));

    const submitData = () => {
      const todoObject = {
        id: uuidv4,
        title: title.value,
        status: false,
        description: description.value,
      };
      todos.push(todoObject);
    };
    const deleteData = (value) => {
      console.log(value);
    };
    return {
      Card,
      Input,
      Todo,
      title,
      description,
      todos,
      submitData,
    };
  },
};
</script>
