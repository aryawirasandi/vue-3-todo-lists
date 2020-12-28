
import { ref, reactive, watchEffect, computed, onMounted, toRefs } from "vue"
import { v4 as uuidv4 } from "uuid";

const useTodosAction = () => {
    const title = ref("");
    const description = ref("");
    const error = ref(false);
    const errorMessage = ref("");
    const selected = reactive({
        data: {},
    });
    const todos = reactive({
        data: [],
    });

    const state = reactive({
        message: "skjdsad",
    });

    onMounted(() => console.table(toRefs(state)))

    const animateError = computed(() => {
        return error ? "animate__fadeOutDown" : "animate__fadeInUp"
    })

    const submitData = () => {
        const todoObject = {
            id: uuidv4(),
            title: title.value,
            status: false,
            description: description.value,
            isUpdate: false,
            animateEffect: "animate__animated animate__bounce",
        };
        if (title.value !== "" && description.value !== "") {
            todos.data = [...todos.data, todoObject];
            error.value = false;
            errorMessage.value = "";
            clearForm();
        } else if (title.value === "") {
            error.value = true;
            errorMessage.value = "Title must be filled";
        } else if (description.value === "") {
            error.value = true;
            errorMessage.value = "Description must be filled";
        } else if (description.value === "" && title.value === "") {
            error.value = true;
            errorMessage.value = "Kedua form harus di isi";
        }
    };

    const clearForm = () => {
        title.value = "";
        description.value = "";
    };

    const showData = (id) => {
        const selectedTodo = todos.data.find((todo) => todo.id === id);
        selected.data = selectedTodo;
        selectedTodo.isUpdate = !selectedTodo.isUpdate;
    };

    const cancel = (id) => {
        showData(id);
        selected.data = {};
    };

    const deleteData = (id) => {
        const findTodo = todos.data.filter((todo) => todo.id !== id);
        todos.data = findTodo;
        return todos.data;
    };

    const updateData = (value) => {
        const findTodo = todos.data.find((todo) => todo.id === value.id);
        findTodo.title = value.title;
        findTodo.description = value.description;
        findTodo.isUpdate = false;
    };

    watchEffect(() => {
        if (title.value.length > 0 || description.value.length > 0) {
            error.value = false;
        }
    });

    const inputTitle = (value) => (title.value = value);
    const inputDesc = (value) => (description.value = value);

    return {
        title,
        description,
        errorMessage,
        selected,
        todos,
        error,
        submitData,
        clearForm,
        showData,
        cancel,
        deleteData,
        updateData,
        animateError,
        inputDesc,
        inputTitle
    }
}

export {
    useTodosAction
}