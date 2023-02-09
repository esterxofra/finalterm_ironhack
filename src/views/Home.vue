<template>
  <div class="wrapper">
    <Nav />

    <div class="content">
      <h3>Your account:</h3>
      <router-link to="/account">Account</router-link>
    </div>
    <NewTask />
    <h1>Tasks:</h1>

    <!-- 4 step: key standard de v-for i task es lo que li volem passar . task seria tot. id unic-->

    <!-- aixo :task="task" es prop perque es el pare que es tot l'array qui li passa info al fill (taskitem) perque es el component que crido a home -->

    <!-- aixo es un emit @child-complete="completeTaskSupabase" perque li pasem una funció que tenim en el pare (home) -->

    <!-- la task a supabase te com estat sempre false pero necessitem una funció que vagi a superbase per acualitzar l'estat de la tasca false true -->

    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @childComplete="completeTaskSupabase"
      @editChild="editTaskSupabase"
    />
    <!-- con el approach de Jarko deberíamos eliminar este emit @editChild="editTaskSupabase" -->

    <!-- aquest evento crida a la funció copletask del boto de taskitem mark as completed-->
  </div>
</template>

<script setup>
import { ref, onUpdated } from "vue";
import { useTaskStore } from "../stores/task";
import { useRouter } from "vue-router";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";

const taskStore = useTaskStore();

// Variable para guardar las tareas de supabase - array de tasques
// 1 step --> crear una variable que contindrà un array
const tasks = ref([]);

// Creamos una función que conecte a la store para conseguir las tareas de supabase
// 2 step --> omplir l'array de tasques
const getTasks = async () => {
  tasks.value = await taskStore.fetchTasks();
};

// 3 setp --> abans no s'hagi muntat aquest component, cridem a la funció. un cop carreguem la pagina es vegin les tareas. aquesta funció es crida sols uan es crida al component.
getTasks();

onUpdated(() => {
  getTasks();
});

// FUNCIÓN PARA COMPLETAR TAREA CONECTANDOSE A SUPABASE

// a la funció completedTask (taskitem) li estem un emit que es childComplete que es un event que activa la funciói completeTaskSupabase i aquesta funció el que da es conectar-se mab supabase.

// com aquesta funcio completeTaskSupabase te un parametre que es taskObject quan cridem l'emit li hem de pasar un argument que es la taska que hem rebut desde props (taskttems) linea 39

const completeTaskSupabase = async (taskObject) => {
  console.log("click");
  console.log(taskObject); // esto es un objeto que incluye description, id, inserted_at, is_complete, title, user_id
  console.log(taskObject.id);
  console.log(taskObject.is_complete); //false

  // taskObject aixo es el prop.task que li passes per taskitem (on cridem l'emit)

  let changeTaskBooleanValue = !taskObject.is_complete; //true

  // li passem una taska que es un key complet. aquesta pot ser true o false. creem una variable miro la task object. si task is complete es false el bolen sera true

  let taskId = taskObject.id;

  await taskStore.completeTask(changeTaskBooleanValue, taskId);

  // Variable para usar tienda de tarea fácil const taskStore = useTaskStore(); estic cridant a la funció completeTask que tens guardada a la task store. await perque el que fa completeastk es anar a superbase. esperar a que tonri la info. dependem de una cosa externa i mentre esperem saltarien errors no puc crear els items perque no tinc la resposa. t'esperes a tenir la informaciño per continuar ejecutant el codi.

  // per defecte la tasca no feta es false pero changeTaskBooleanValue es el contrari
};

// FUNCIÓN PARA EDITAR UNA TAREA CONECTÁNDOSE A SUPERBASE
const editTaskSupabase = async (editTaskObject) => {
  await taskStore.editTaskSupabase(
    editTaskObject.title,
    editTaskObject.id,
    editTaskObject.description
  );
};
</script>

<style></style>

<!-- 
**Hints**
1. ref() is used here!
2. (NewTask, TaskItem, Footer, Nav) components are used here! 
3. Tasks are going to be contained in an array here!
4. An async function is needed to get all of the tasks stored within the supabase database, this async function's body will 
contain the tasks value which be use to store the fetchTasks method which lives inside the userTaskStore. This function 
needs to be called within the setUp script in order to run within the first instance of this component lifecycle.

5. NewTask component will receive a customEvent on this instance of the homeView that will fire the add-to-do function
6. add-to-do function will receive 2 params/arguments that will tak a taskTitle and a taskDescription and the body of this 
async function will call the taskStore that calls the addTask function from the store that pushes the info of the task to the 
backEnd. This is possible by passing the 2 param/arguments that will be passed by the user from the inputs within the NewTask 
Component. 

7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem 
component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show 
either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the 
task out of the array. 1 customEvent for editing the task title and description. This function needs to call the function 
mentioned on hint4.


7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument 
will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the 
value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in 
order to call the right id. 
7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to 
call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call 
the function mentioned on hint4. 
7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to 
take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument 
oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function 
needs to call the function mentioned on hint4.
-->
