//* Importaciones y exportaciones
import { useState, type FormEvent } from 'react';

//?interfaces
interface FormProps {
  onAgregar: (texto: string) => void;
}

//*segunda forma de funciones (expresión de función)
export const Formulario = function({ onAgregar }: FormProps) {
  //*desestructuraciones de un arreglo (useState)
  const [texto, setTexto] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!texto.trim()) return;
    onAgregar(texto);
    setTexto('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
      <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Nueva tarea..." style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #A79A8A', background: '#FCF7DF', color: '#3E3630' }} />
      <button type="submit" style={{ background: '#3E3630', color: '#FCF7DF', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Agregar</button>
    </form>
  );
};