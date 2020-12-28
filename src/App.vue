<template>
  <div class="container py-5">
    <alert
      :text="errorMessage"
      v-if="error"
      class="animate__animated"
      :class="animateError"
    />
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
            <Input label="todo" @input="inputTitle" :value="title" />
          </div>
          <div class="mb-3">
            <Input
              label="description"
              @input="inputDesc"
              :value="description"
            />
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-primary">Submit A Todo</button>
          </div>
        </template>
      </card>
    </form>
    <div class="row mt-3" v-if="todos.data.length === 0">
      <h1 class="text-center">There is not data</h1>
    </div>
    <div class="row mt-3" v-else>
      <div class="col-md-4 my-2" v-for="todo in todos.data" :key="todo.id">
        <todo
          :todo="todo"
          :status="todo.status"
          :id="todo.id"
          :selected="selected.data"
          :animation="todo.animateEffect"
          @delete="deleteData(todo.id)"
          @edit="showData(todo.id)"
          @cancel="cancel(todo.id)"
          @store="updateData"
          v-model:status="todo.status"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Input from "@/components/Input.vue";
import Todo from "@/components/Todo.vue";
import Alert from "@/components/Alert.vue";
import { useTodosAction } from "@/utils/todos.js";
export default {
  name: "App",
  setup() {
    return {
      Alert,
      Card,
      Todo,
      Input,
      ...useTodosAction(),
    };
  },
};
</script>
