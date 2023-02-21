<template>
  <div class="container-new-task">
    <div v-if="showErrorMessage">
      <p class="error-text">{{ errorMessage }}</p>
    </div>

    <div class="form-new-task">
      <label for="new-title" class="label-task">Task title:</label>
      <input
        type="text"
        name="new-title"
        placeholder="Add a Task Title"
        v-model="name"
      />

      <label for="new-description" class="label-task">Add a description:</label>
      <input
        type="text"
        name="new-description"
        placeholder="Add a Task Description"
        v-model="description"
      />

      <label for="new-category" class="label-task">Category:</label>
      <input type="text" name="new-category" />

      <label for="created-on" class="label-task">Created on:</label>
      <input type="date" name="created-on" v-model="description" />

      <label for="deadline" class="label-task">Deadline:</label>
      <input type="date" name="deadline" v-model="description" />

      <button @click="addTask" class="button-task">Add task</button>
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

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

// Arrow function para crear tareas.
const addTask = () => {
  if (name.value.length === 0 || description.value.length === 0) {
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.

    taskStore.addTask(name.value, description.value);
    name.value = "";
    description.value = "";
  }
};
</script>

<style></style>
