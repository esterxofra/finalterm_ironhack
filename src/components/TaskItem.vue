<template>
  <div class="container">
    <div>
      <!-- TÍTULO DE LA TAREA -->
      <h3 :class="props.task.is_complete ? 'done' : 'pending'">
        {{ task.title }}
      </h3>

      <!-- DESCRIPCIÓN DE LA TAREA -->
      <p :class="props.task.is_complete ? 'done' : 'pending'">
        {{ task.description }}
      </p>
    </div>

    <!-- BOTÓN PARA ELIMINAR LA TAREA -->
    <button @click="showModalToggle">Delete</button>

    <!-- BOTÓN PARA CONFIRMAR LA ELIMINACIÓN DE LA TAREA -->
    <div class="modal" v-if="showModal">
      <h2>Are you sure you want to delete this task?</h2>
      <button @click="deleteTask">Yes</button>
      <button @click="showModalToggle">Cancel</button>
    </div>

    <!-- BOTÓN PARA MARCAR COMO COMPLETADA LA TAREA -->
    <button @click="completedTask">Completed</button>

    <!-- BOTÓN PARA DESPLEGAR LA OPCIÓN DE EDITAR LA TAREA -->
    <button @click="showInput">Edit</button>
  </div>

  <!-- BOTÓN PARA EDITAR LA TAREA -->
  <div v-if="inputContainer">
    <input
      type="text"
      v-model="currentTaskTitle"
      placeholder="Insert title..."
    />
    <input
      type="text"
      v-model="currentTaskDescription"
      placeholder="Insert description..."
    />
    <button @click="editTask">Edit Task</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

//DEFINIR EMITS PARA PASAR LÓGICA Y EVENTOS HACIA COMPONENTES PADRES
// et vindran uns emits del teu pare que es diran childComplete", "editChild
const emit = defineEmits(["childComplete", "editChild"]);

// FUNCIÓN PARA COMPLETAR TAREA QUE SE ENCARGA DE ENVIAR LA INFO AL PADRE

const completedTask = () => {
  // console.log("click!");
  // console.log(props.task.is_complete);
  emit("childComplete", props.task);
};

// Este props.task es de editar
// emetre la funció del pares es a dir teim una fnció al fill que te un evento. quan crido a childcomplete crida a complete task suparbase. ey pare has de cridar aquesta funció

// Variable para usar tienda de tarea fácil
const taskStore = useTaskStore();

// Variable para recibir info de la tarea mediante prop como .Objeto
const props = defineProps({
  task: Object,
});

//per veure tot lo que conte l'array de task
console.log(props.task);

// Función para mostrar y ocultar inputs
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
    alert("Title or Description can not be empty");
  } else {
    const newTaskEdited = {
      title: currentTaskTitle.value,
      description: currentTaskDescription.value,
      id: props.task.id,
    };
    emit("editChild", newTaskEdited);
    /*
    await taskStore.editTaskSupabase(
      currentTaskTitle.value,
      props.task.id,
      currentTaskDescription.value
      */
  }
};

//  EXPLICACIÓN DE JARKO: QUIÉN HABLA CON SUPABASE? LA STORE DE TASK PORQUE ESTOY EDITANDO UNA TASK NO UN USUER. QUIERO COMUNICARME CON LA BASE DE DATOS PERO LOS COMPONENTES POR COMO ESTA EL CÓDIGO NO SE COMUNICAN CON LA SUPABASE, ESTO LO HACEN LAS STORES. FORMULARIOS DE ENTRADA????
// CREAMOS UNA FUNCIÓN EDITTASK, ESTA ES ASINCRONA PORQUE SE COMUNICA CON UNA BASE DE DATOS. Y LE TENEMOS QUE PASAR UN TÍTULO, UNA DESCRIPCIÓN Y UNA ID. ESTO ESTARIA EN EL TASK.JS.
// EN TASKITEM TENEMOS UNA FUNCIÓN ASYNC QUE SE LLAMA SENDDATA

// CONST SENDDATA = ASYNC () => {
// TASKSTORE.EDITASK ( Y LE PONEMOS 3 VARIABLES PORQUE LA FUNCIÓN EDITTASK TIENE TRES VARIABLES). NOS SALE UN ERROR PORQUE EDITTASK NOS DICE QUE NO ES UNA FUNCIÓN PERO SI QUE LO ES PORQUE ESTA EN TASK.JS (CONTIENE UN OBJETO) EL OBJETO TIENE UN RETURN, UNA SERIE DE VALORES QUE ME DEVUELVE Y UNO DE ESOS TIENE QUE SER EDIT TASK PROQUE SINO NO LO RECONOCE COMO UNA FUNCIÓN. ESTO EN TASK.JS EH! ESTAS VARIABLES DE EDITTASK NO LAS ESTOY UTILIZANDO PARA NADA - UNDEFINE (VALOR POR DEFECTO QUE SE UTILIZA CUANDO ESPERABA QUE ME DIERAS ALGO QUE JAMAS ME HAS DADO).

// TASK.JS - EL EDIT TASK SE TIENE QUE CONECTAR CON EL SUPABASE. FORMULARIO DE ENTRADA. GENERAR UNOS DATOS Y QUE NOS DEVUELVA UN ERROR. DECLARAMOS {DATA, ERROR} I AWAIT ESPERA QUE LA BAE DE DATOS DFUNCIONE. DENTRO DE LA BASE DE DATOS TASK QUIERO QUE HAGAS ALGO AWAIT .SUPABASE. FROM TASK. UPDARE PORQUE QUEREMOS ACTUALIZAR LA BASE DE DATOS Y DENTRO LE DECIDMOS, EL TÍTULO QUIERO QUE SEA EL TITULO, LA DESCRIPCIÓN QUE SEA LA DESCRIPCIÓN PERO A QUIEN SE LO QUIERO CAMBIAR? A AQUEL QUE SEA MATCH O EQ CON EL ID. DONDE ID ES ID.

//CUALES SON LOS PARAMETROS REALES QUE LE TENEMOS QUE PASAR A SEND DATA DE TASKITEM: NEWTITLE.VALUE, NEWDESCRIPTION.VALUE Y PROPS.TASK.ID

//VALE HASTA AQUÍ TODO BIEN PERO PARA VER LA ACTUALIZACIÓN DE LA TAREA TENGO QUE IR A ACTUALIZAR LA PÁGINA. O HACER UN EMIT....

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.

const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

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
