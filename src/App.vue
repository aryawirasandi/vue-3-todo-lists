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
            <Input label="todo" @input="inputTitle" :value="title"/>
            {{ title }}
          </div>
          <div class="mb-3">
            <Input label="description" @input="inputDesc" :value="description" />
            {{ description }}
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
      {{ selected }}
      <div class="col-md-4 my-2" v-for="todo in todos.data" :key="todo.id">
        <todo 
        :todo="todo" 
        :status="todo.status"
        :id="todo.id"
        :selected="selected.data"
        @delete="deleteData(todo.id)" 
        @edit="showData(todo.id)"
        @cancel="cancel(todo.id)"
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
import { ref, reactive, computed  , watchEffect, event } from "vue";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "App",
  setup() {
    const title = ref("");
    const description = ref("");
    const error = ref(false);
    const selected = reactive({
        data : {}
    })
    const todos = reactive({
        data : []
    });
  

    const submitData = () => {
      const todoObject = {
        id: uuidv4(),
        title: title.value,
        status: false,
        description: description.value,
        isUpdate : false,
      };
      if(title.value !== "" && description.value !== ""){
        todos.data = [...todos.data, todoObject];
        clearForm();
      }else{
        error.value = true;
      }
    }

    const clearForm = () => {
        title.value = "";
        description.value = "";
    }
    
    const showData = id => {
      const selectedTodo = todos.data.find(todo => todo.id === id)
      selected.data = selectedTodo;
      selectedTodo.isUpdate = !selectedTodo.isUpdate;
    }

    const cancel = id => {
      showData(id);
      selected.data = {}
    }

    const deleteData = id => {
      const findTodo = todos.data.filter(todo => todo.id !== id);
      todos.data = findTodo;
      return todos.data;
    };
    
    const inputTitle = (value) => title.value = value;
    const inputDesc = (value) => description.value = value;

    // watchEffect(() => {
    //   if(title.value.length > 0 || description.value.length > 0){
    //     error.value = false
    //   }
    // })
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
      error,
      showData,
      cancel,
      selected,
      inputTitle,
      inputDesc,
      event
    };
  }
};
</script>
