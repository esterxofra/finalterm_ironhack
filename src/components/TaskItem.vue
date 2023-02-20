<template>
  <div class="container-task-board">
    <div class="card-task">
      <!-- TÍTULO DE LA TAREA -->
      <h2 :class="props.task.is_complete ? 'done' : 'pending'">
        {{ task.title }}
      </h2>
      <hr />
      <!-- DESCRIPCIÓN DE LA TAREA -->

      <p>Description:</p>
      <ul>
        <li :class="props.task.is_complete ? 'done' : 'pending'">
          {{ task.description }}
        </li>
      </ul>
      <hr />

      <p>Created on:</p>

      <p :class="props.task.is_complete ? 'done' : 'pending'">
        {{ task.description }}
      </p>

      <hr />

      <p>Deadline:</p>

      <p :class="props.task.is_complete ? 'done' : 'pending'">
        {{ task.description }}
      </p>

      <div class="container-icons">
        <!-- BOTÓN PARA DESPLEGAR LA OPCIÓN DE EDITAR LA TAREA -->
        <button @click="showInput" class="icon-button">
          <img
            class="icon-img"
            src="../assets/icons/edit-icon-desktop.png"
            alt="Edit task"
          />
        </button>

        <!-- BOTÓN PARA MARCAR COMO COMPLETADA LA TAREA -->
        <button @click="completedTask" class="icon-button">
          <img
            class="icon-img"
            src="../assets/icons/completed-icon-desktop.png"
            alt="Mark task as completed"
          />
        </button>

        <!-- BOTÓN PARA ELIMINAR LA TAREA -->
        <button @click="showModalToggle" class="icon-button">
          <img
            class="icon-img"
            src="../assets/icons/bin-icon-desktop.png"
            alt="Delete task"
          />
        </button>
      </div>
    </div>
  </div>

  <!-- BOTÓN PARA CONFIRMAR LA ELIMINACIÓN DE LA TAREA -->
  <div class="modal" v-if="showModal">
    <h2>Are you sure you want to delete this task?</h2>
    <button @click="deleteTask">Yes, of course!</button>
    <button @click="showModalToggle">Cancel</button>
  </div>

  <!-- INPUTS Y BOTÓN PARA EDITAR LA TAREA -->
  <div v-if="inputContainer">
    <div>
      <label for="title">Insert or modify your current title:</label>
      <input
        type="text"
        name="title"
        v-model="currentTaskTitle"
        placeholder="Insert new title..."
      />
    </div>
    <div>
      <label for="description"
        >Insert or modify your current description:</label
      >
      <input
        type="text"
        name="description"
        v-model="currentTaskDescription"
        placeholder="Insert new description..."
      />
    </div>
    <button @click="editTask">Edit Task</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

//DEFINIR EMITS PARA PASAR LÓGICA Y EVENTOS HACIA COMPONENTES PADRES (TE VENDRAN UNOS EMITS DE TU PADRE QUE SE LLAMARAN CHILDCOMPLETE Y EDITCHILD)

const emit = defineEmits(["childComplete", "editChild"]);

// Variable para usar el store de tarea facilmente
const taskStore = useTaskStore();

// Variable para recibir info de la tarea mediante prop como .Objeto
const props = defineProps({
  task: Object,
});

// FUNCIÓN PARA COMPLETAR TAREA QUE SE ENCARGA DE ENVIAR LA INFO AL PADRE
const completedTask = () => {
  // console.log("click!");
  // console.log(props.task.is_complete);
  emit("childComplete", props.task);
};

// FUNCIÓN PARA QUE CUANDO LE DES A EDITAR TAREA TE APAREZCAN NUEVOS INPUS Y EL BOTÓN DE EDITAR
const inputContainer = ref(false);
const currentTaskTitle = ref("");
const currentTaskDescription = ref("");

const showInput = () => {
  inputContainer.value = !inputContainer.value;
  currentTaskTitle.value = props.task.title;
  currentTaskDescription.value = props.task.description;
};

// FUNCIÓN CON VALIDACIÓN, ENVÍO DE DATOS Y EVENTOS MEDIANTE EMIT
const editTask = () => {
  if (
    currentTaskTitle.value.length === 0 ||
    currentTaskDescription.value.length === 0
    // Si no hay título o descripción, que me salte una alerta
  ) {
    alert("The task title or description is empty or just too short");
  } else {
    const newTaskEdited = {
      title: currentTaskTitle.value,
      description: currentTaskDescription.value,
      id: props.task.id,
    };
    emit("editChild", newTaskEdited);

    /*
    JARKO - EL HIJO LLAMA DIRECTAMENTE A LA BASE DE DATOS SIN PASAR POR EL PADRE: 
    await taskStore.editTaskSupabase(
      currentTaskTitle.value,
      props.task.id,
      currentTaskDescription.value
      */
  }
};

//FUNCIÓN PARA ELIMINAR UNA TAREA
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

//FUNCIÓN PARA QUE APAREZCA EL MODAL DE CONFIRMARCIÓN ANTES DE ELIMINAR UNA TAREA
const showModal = ref(false);
const showModalToggle = () => {
  showModal.value = !showModal.value;
};
</script>

<style>
.done {
  /* color: green; */
  text-decoration: line-through;
}

.pending {
  /* color: red; */
  text-decoration: none;
}
</style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
