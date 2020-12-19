<template>
  <div class="container py-5">
    <alert text="submit failed" v-if="error"/>
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
        <todo :todo="todo" @delete="deleteData(todo.id)"/>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Input from "@/components/Input.vue";
import Todo from "@/components/Todo.vue";
import Alert from "@/components/Alert.vue";
import { ref, computed, reactive, readonly, watchEffect } from "vue";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "App",
  setup() {
    const title = ref("");
    const description = ref("");
    const error = ref(false);
    let todos = ref();

    const submitData = () => {
      const todoObject = {
        id: uuidv4(),
        title: title.value,
        status: false,
        description: description.value,
      };
      if(title.value !== "" && description.value !== ""){
        todos.value.push(todoObject);
        title.value = "";
        description.value = "";
      }else{
        error.value = true;
      }
    };

    const deleteData = id => {
      const findTodo = todos.value.filter(todo => todo.id !== id);
      todos.value = findTodo;
    };

    watchEffect(() => {
      if(title.value.length > 0 || description.value.length > 0){
        error.value = false;
      }
    })

    return {
      Card,
      Input,
      Todo,
      Alert,
      title,
      description,
      todos,
      submitData,
      deleteData,
      error
    };
  }
};
</script>
