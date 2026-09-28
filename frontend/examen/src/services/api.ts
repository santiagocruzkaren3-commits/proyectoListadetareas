//* Importaciones y exportaciones
import axios from 'axios';
import type { Tarea } from '../types/tarea';

const URL = 'http://localhost:3000/api/tareas';

//*Funciones (tercera forma: flecha) y Promesas con fetch
export const obtenerTareasFetch = (): Promise<Tarea[]> => {
  return fetch(URL)
    .then((res) => res.json())
    .catch((err) => { console.error('Error 500: Server error', err); return []; });
};

//*Funciones asincronas con axios (Async/Await)
export const crearTareaAxios = async (titulo: string): Promise<Tarea> => {
  const respuesta = await axios.post(URL, { titulo, completada: false });
  //*diferencia entre cuano poner 200 y 500
  if (respuesta.status === 200 || respuesta.status === 201) return respuesta.data;
  throw new Error('Error al crear tarea');
};

export const alternarTareaAxios = (id: string) => axios.patch(`${URL}/${id}`);

//*export default (otra forma de exportar)
const eliminarTarea = (id: string) => axios.delete(`${URL}/${id}`);
export default eliminarTarea;