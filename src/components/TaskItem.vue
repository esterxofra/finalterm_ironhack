<template>
  <div class="container-board">
    <div class="card-task">
      <div class="category">
        <p :class="props.task.is_complete ? 'done' : 'pending'">
          {{ task.category }}
        </p>
      </div>

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
        {{ task.inserted_at }}
      </p>

      <hr />

      <p>Deadline:</p>

      <p :class="props.task.is_complete ? 'done' : 'pending'">
        {{ task.deadline }}
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
    <div class="modal-form">
      <h2>Are you sure you want to delete this task?</h2>
      <div class="confirmation">
        <button class="button-confirmation" @click="deleteTask">
          Yes, of course!
        </button>
        <button class="button-confirmation" @click="showModalToggle">
          Cancel
        </button>
      </div>
    </div>
  </div>

  <!-- INPUTS Y BOTÓN PARA EDITAR LA TAREA -->
  <div class="container-edit" v-if="inputContainer">
    <div class="container-edit-form">
      <label for="title">Insert or modify your current title:</label>
      <input
        type="text"
        name="title"
        v-model="currentTaskTitle"
        placeholder="Insert new title..."
      />

      <label for="description"
        >Insert or modify your current description:</label
      >
      <input
        type="text"
        name="description"
        v-model="currentTaskDescription"
        placeholder="Insert new description..."
      />

      <label for="category">Insert or modify your current category:</label>
      <input
        type="text"
        name="category"
        v-model="currentTaskCategory"
        placeholder="Insert new category..."
      />

      <label for="deadline">Deadline:</label>
      <input type="date" name="deadline" v-model="currentTaskDeadline" />

      <button @click="editTask">Edit Task</button>
    </div>
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
const currentTaskDeadline = ref("");
const currentTaskCategory = ref("");

const showInput = () => {
  if (!props.task.is_complete) {
    inputContainer.value = !inputContainer.value;
    currentTaskTitle.value = props.task.title;
    currentTaskDescription.value = props.task.description;
    currentTaskDeadline.value = props.task.deadline;
    currentTaskCategory.value = props.task.category;
  }
};

// FUNCIÓN CON VALIDACIÓN, ENVÍO DE DATOS Y EVENTOS MEDIANTE EMIT
const editTask = () => {
  if (
    currentTaskTitle.value.length === 0 ||
    currentTaskDescription.value.length === 0 ||
    currentTaskDeadline.value.length === 0 ||
    currentTaskCategory.value.length === 0
    // Si no hay título o descripción, que me salte una alerta
  ) {
    alert("The task title or description is empty or just too short");
  } else {
    const newTaskEdited = {
      id: props.task.id,
      title: currentTaskTitle.value,
      description: currentTaskDescription.value,
      deadline: currentTaskDeadline.value,
      category: currentTaskCategory.value,
    };
    emit("editChild", newTaskEdited);
    inputContainer.value = !inputContainer.value;

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
