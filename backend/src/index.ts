import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors(), express.json());

const db = new Database('tareas.db');
db.exec('CREATE TABLE IF NOT EXISTS tareas (id TEXT PRIMARY KEY, titulo TEXT, fechaCreacion TEXT, completada INTEGER)');

app.get('/api/tareas', (_req, res) => {
  res.json(db.prepare('SELECT id, titulo, fechaCreacion, completada FROM tareas').all().map((t: any) => ({ ...t, completada: Boolean(t.completada) })));
});

app.post('/api/tareas', (req, res) => {
  const nueva = { id: uuidv4(), titulo: req.body.titulo, fechaCreacion: new Date().toLocaleTimeString(), completada: 0 };
  db.prepare('INSERT INTO tareas VALUES (?, ?, ?, ?)').run(nueva.id, nueva.titulo, nueva.fechaCreacion, nueva.completada);
  res.status(201).json({ ...nueva, completada: false });
});

const toggle = (req: any, res: any) => { db.prepare('UPDATE tareas SET completada = NOT completada WHERE id = ?').run(req.params.id); res.json({ success: true }); };
app.patch('/api/tareas/:id', toggle);
app.put('/api/tareas/:id', toggle);
app.delete('/api/tareas/:id', (req, res) => { db.prepare('DELETE FROM tareas WHERE id = ?').run(req.params.id); res.json({ success: true }); });

app.listen(3000, () => console.log('Servidor en puerto 3000 con SQLite'));