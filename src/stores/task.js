import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

// REMEMBER: LAS FUNCIONES ASYNC SE COMUNICAN CON LA BASE DE DATOS (EN NUESTRO CASO, SUPABASE). POR COMO ESTÁ MONTADO NUESTRO CÓDIGO, ES LA STORE (EN ESTE CASO LA DE TAREAS PORQUE ESTAMOS EDITANDO, ELIMINANDO Y MODIFICANDO TAREAS) QUIEN SE COMUNICA CON SUPABASE. FORMULARIOS DE ENTRADA???

export const useTaskStore = defineStore("tasks", () => {
  // Esta tienda utiliza el Composition API
  const tasksArr = ref(null);
  // conesguir tareas de supabase (objeto)
  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });
    tasksArr.value = tasks;
    return tasksArr.value;
  };
  // añadir tareas de supabase
  const addTask = async (
    title,
    inserted_at,
    description,
    deadline,
    category
  ) => {
    console.log(useUserStore().user.id);
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
        inserted_at: inserted_at,
        description: description,
        deadline: deadline,
        category: category,
      },
    ]);
  };

  //COMPLETAR TAREA DE SUPERBASE - APUNTANDO AL VALOR BOOLEANO is_complete

  const completeTask = async (valorDeBooleano, id) => {
    let { data: tasks, error } = await supabase
      .from("tasks")
      .update({ is_complete: valorDeBooleano })
      .match({ id: id });
  };

  // EDITAR TAREA EN SUPABASE (ASYNC PORQUE SE COMUNICA CON LA BASE DE DATOS Y LE PASAMOS 3 PARÁMETROS - UNDEFINE (VALOR POR DEFECTO PORQUE NO LOS ESTOY UTILIANDO)) - ESTA FUNCIÓN ES LLAMADA EN EL PADRE (HOME.VUE) Y PASADA AL HIJO A TRAVÉS DE UNA ACCIÓN @EDITCHILD. CON EL APPROACH DE JARKO LO ESTARÍAMOS PASANDO DIRECTAMENTE AL HIJO (TASKITEM.VUE). CON EL APPROACH DE DIEGO PODEMOS SELECCIONAR VARIAS TASK A LA VEZ (EJEMPLO, CORREO ELECTRÓNICO) Y CON EL APPROACH DE JARKO ES MÁS DIRECTO PERO NO SE PODRÍA SELECCIONAR VARIAS TAREAS AL MISMO TIEMPO.

  // RECAP! EDITTASKSUPABASE ES UNA FUNCIÓN ASYNC CON 3 PARÁMETROS QUE TIENE QUE GENERAR UNOS DATOS Y DEVOLVERNOS EN TODO CASO UN ERROR { data: tasks, error }. AWAIT (ESPERA QUE LA BASE DE DATOS FUNCIONE). ENTONCES .FROM . UPDATE . MATCH SON MÉTIDOS PROPIOS DE LAS BASES DE DATOS (EN ESTE CASO SUPABASE) QUE NOS PERMITE ACTUALIZAR EL TIITULO Y LA DESCRIPCIÓN DE LA BASE DE DATOS DE TASK. PERO A QUIÉN SE LO QUIERO CAMBIAR? A AQUEL QUE HAGA MATCH O SEA EQ AL ID.

  const editTaskSupabase = async (
    title,
    id,
    description,
    deadline,
    category
  ) => {
    let { data: tasks, error } = await supabase
      .from("tasks")
      .update({
        title: title,
        description: description,
        deadline: deadline,
        category: category,
      })
      .match({ id: id });
  };

  // BORRAR TAREAS EN SUPABASE
  const deleteTask = async (id) => {
    const { data, error } = await supabase.from("tasks").delete().match({
      id: id,
    });
  };

  // nota: para traer las imagenes del supabase
  // supabase.storage y en el from pondremos avatars porque es como se llama nuestro bucket y despues vendran otros metros que son los que tenemos que buscar

  return {
    tasksArr,
    fetchTasks,
    addTask,
    deleteTask,
    completeTask,
    editTaskSupabase,
  };

  // MUY IMPORTANTE: SI NOS SALE UN ERROR QUE NOS DICE QUE LA FUNCIÓN EDITTASK NO ES UNA FUNCIÓN(COSA QUE NO ES VERDAD) ESPORQUE NOS HEMOS OLVIDADO DE METERLO DENTRO DEL RETURN!!!
});
