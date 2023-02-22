<template>
  <div class="container-new-task">
    <div v-if="showErrorMessage">
      <p class="error-text">{{ errorMessage }}</p>
    </div>

    <div class="form-new-task">
      <div class="inner-container">
        <label for="new-title" class="label-task">Task title:</label>
        <input
          type="text"
          class="input-task"
          name="new-title"
          placeholder="Add a Task Title"
          v-model="name"
        />
      </div>

      <div class="inner-container">
        <label for="new-description" class="label-task"
          >Add a description:</label
        >
        <input
          type="text"
          class="input-task"
          name="new-description"
          placeholder="Add a Task Description"
          v-model="description"
        />
      </div>

      <div class="inner-container">
        <label for="new-category" class="label-task">Category:</label>
        <input
          type="text"
          class="input-task"
          name="new-category"
          placeholder="Add a Task Category"
          v-model="category"
        />
      </div>

      <div class="inner-container">
        <label for="deadline" class="label-task">Deadline:</label>
        <input
          type="date"
          class="input-task"
          name="deadline"
          v-model="deadline"
        />
      </div>

      <div class="add-task-container">
        <button @click="addTask" class="button-task">Add task</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref("");
const description = ref("");
const deadline = ref("");
const category = ref("");

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

// Arrow function para crear tareas.
const addTask = () => {
  if (
    name.value.length === 0 ||
    description.value.length === 0 ||
    deadline.value.length === 0 ||
    category.value.length === 0
  ) {
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.

    taskStore.addTask(
      name.value,
      description.value,
      deadline.value,
      category.value
    );
    name.value = "";
    description.value = "";
    deadline.value = "";
    category.value = "";
  }
};
</script>

<style></style>
