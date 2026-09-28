//* Importaciones y exportaciones
import { useEffect, useState } from 'react';
import { Formulario } from './Formulario';
import { ListaTareas } from './components/ListaTareas';
import type { Tarea } from './types/tarea';
import { obtenerTareasFetch, crearTareaAxios, alternarTareaAxios } from './services/api';
import eliminarTarea from './services/api';

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [filtro, setFiltro] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState<string>('');

  useEffect(() => { obtenerTareasFetch().then(setTareas); }, []);

  return (
    <div style={{ maxWidth: '650px', width: '90%', margin: '40px auto', background: '#FCF7DF', padding: '32px', borderRadius: '20px', boxShadow: '0 12px 30px rgba(62,54,48,0.18)', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#3E3630', marginBottom: '20px', textAlign: 'center' }}>☑ Mi Lista de Tareas</h2>
      <Formulario onAgregar={(t) => crearTareaAxios(t).then((n) => setTareas([...tareas, n]))} />
      <input type="text" placeholder="🔍 Buscar tarea..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #A79A8A', background: '#fff', color: '#3E3630', marginBottom: '14px', boxSizing: 'border-box' }} />
      <ListaTareas tareas={tareas} filtro={filtro} busqueda={busqueda} onFiltro={setFiltro} onToggle={(id) => alternarTareaAxios(id).then(() => setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t)))} onEliminar={(id) => eliminarTarea(id).then(() => setTareas(tareas.filter(t => t.id !== id)))} />
    </div>
  );
}