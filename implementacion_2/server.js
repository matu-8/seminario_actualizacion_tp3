
const express = require('express');
const path    = require('path');
const crypto  = require('crypto');


const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares ───────────────────────────────────────────────────────────────
app.use(express.json());

// Gestión manual de cookies de sesión (sin dependencias extra)
app.use((req, res, next) => {
  const raw     = req.headers.cookie || '';
  const cookies = Object.fromEntries(
    raw.split(';').map(c => c.trim().split('=').map(decodeURIComponent))
  );

  let sessionId = cookies['session_id'];

  if (!sessionId || !store[sessionId]) {
    sessionId = crypto.randomUUID();
    store[sessionId] = [];
    res.setHeader('Set-Cookie',
      `session_id=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 365}`
    );
  }

  req.sessionId = sessionId;
  next();
});

// ── Almacenamiento en memoria ─────────────────────────────────────────────────
// Estructura: { [sessionId]: [ { id, nombre, edad, nota }, ... ] }
const store = {};

// ── Ruta principal (home) ─────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── API REST ──────────────────────────────────────────────────────────────────

// GET /api/alumnos  →  devuelve los alumnos del cliente actual
app.get('/api/alumnos', (req, res) => {
  const alumnos = store[req.sessionId] || [];
  res.json(alumnos);
});

// POST /api/alumnos  →  agrega un alumno
app.post('/api/alumnos', (req, res) => {
  const { nombre, edad, nota } = req.body;

  // Validaciones básicas en el servidor
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ error: 'Nombre inválido.' });
  }
  const edadNum = parseInt(edad, 10);
  if (isNaN(edadNum) || edadNum < 1 || edadNum > 120) {
    return res.status(400).json({ error: 'Edad inválida (1–120).' });
  }
  const notaNum = parseFloat(nota);
  if (isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
    return res.status(400).json({ error: 'Nota inválida (0–10).' });
  }

  const nuevo = {
    id:     crypto.randomUUID(),
    nombre: nombre.trim(),
    edad:   edadNum,
    nota:   notaNum,
  };

  store[req.sessionId].push(nuevo);
  res.status(201).json(nuevo);
});

// DELETE /api/alumnos/:id  →  elimina un alumno por id
app.delete('/api/alumnos/:id', (req, res) => {
  const lista = store[req.sessionId] || [];
  const idx   = lista.findIndex(a => a.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({ error: 'Alumno no encontrado.' });
  }

  lista.splice(idx, 1);
  res.json({ ok: true });
});

// DELETE /api/alumnos  →  elimina todos los alumnos del cliente
app.delete('/api/alumnos', (req, res) => {
  store[req.sessionId] = [];
  res.json({ ok: true });
});

// ── Inicio del servidor ───────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
  console.log(`Acceda desde la red local en http://<su-ip>:${PORT}`);
});
