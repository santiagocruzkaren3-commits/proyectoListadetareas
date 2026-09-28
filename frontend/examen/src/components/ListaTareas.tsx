//* Importaciones y exportaciones
import type { Tarea } from '../types/tarea';

interface Props {
  tareas: Tarea[];
  filtro: string;
  busqueda: string;
  onToggle: (id: string) => void;
  onEliminar: (id: string) => void;
  onFiltro: (f: string) => void;
}

export const ListaTareas = ({ tareas, filtro, busqueda, onToggle, onEliminar, onFiltro }: Props) => {
  const filtradas = tareas.filter(t => t.titulo.toLowerCase().includes(busqueda.toLowerCase())).filter(t => filtro === 'pendientes' ? !t.completada : filtro === 'completadas' ? t.completada : true);

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['todas', 'pendientes', 'completadas'].map(f => (<button key={f} onClick={() => onFiltro(f)} style={{ flex: 1, padding: '8px', borderRadius: '20px', border: 'none', background: filtro === f ? '#3E3630' : '#C7D3DB', color: filtro === f ? '#FCF7DF' : '#3E3630', cursor: 'pointer', textTransform: 'capitalize' }}>{f}</button>))}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {/*Template string*/}
        {filtradas.map(t => (<li key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#C7D3DB', borderRadius: '10px', marginBottom: '10px' }}><span onClick={() => onToggle(t.id)} style={{ cursor: 'pointer', textDecoration: t.completada ? 'line-through' : 'none', color: t.completada ? '#A79A8A' : '#3E3630' }}>{`${t.completada ? '✓' : '○'} ${t.titulo}`}</span><button onClick={() => onEliminar(t.id)} style={{ background: 'none', border: 'none', color: '#3E3630', cursor: 'pointer' }}>🗑️</button></li>))}
      </ul>
    </>
  );
};