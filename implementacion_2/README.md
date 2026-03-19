# 📋 Registro de Alumnos — Backend

Servidor web construido con **Node.js + Express** que sirve la aplicación de Registro de Alumnos y gestiona la persistencia de datos en memoria del servidor, diferenciando a cada cliente mediante una cookie de sesión.

---

## Funcionalidad agregada

### Servidor Express (`server.js`)

- Sirve el archivo `index.html` como página principal en la ruta `/`.
- Escucha en **todas las interfaces de red** (`0.0.0.0`), lo que permite el acceso desde cualquier dispositivo en la misma red local.
- Expone una **API REST** bajo `/api/alumnos` para que el cliente realice todas las operaciones de datos.

### Identificación de clientes (sesiones por cookie)

Cada persona que abre la página recibe automáticamente una cookie `session_id` única (UUID v4), con una vigencia de 1 año. Gracias a esa cookie, el servidor reconoce a cada cliente y le devuelve **únicamente sus propios datos**, incluso si el navegador se cierra y se vuelve a abrir.

No se requiere registro ni contraseña.

### Persistencia en memoria del servidor

Los datos de todos los clientes se almacenan en un objeto JavaScript en memoria del proceso Node.js mientras este esté corriendo. Los datos **no sobreviven a un reinicio del servidor** (comportamiento en memoria pura, sin base de datos).

### API REST disponible

| Método   | Ruta                  | Descripción                              |
|----------|-----------------------|------------------------------------------|
| `GET`    | `/api/alumnos`        | Devuelve los alumnos del cliente actual  |
| `POST`   | `/api/alumnos`        | Agrega un nuevo alumno                   |
| `DELETE` | `/api/alumnos/:id`    | Elimina un alumno por su ID              |
| `DELETE` | `/api/alumnos`        | Elimina todos los alumnos del cliente    |

### Cambios en `index.html`

El frontend ya no usa `localStorage`. Ahora realiza llamadas `fetch` a la API del servidor para leer, guardar y eliminar alumnos. Al cargar la página, el cliente solicita sus datos al servidor y los muestra directamente.

---

## Estructura del proyecto

```
registro-alumnos/
├── server.js      ← Servidor Express (backend)
├── index.html     ← Aplicación frontend (servida por Express)
├── package.json   ← Dependencias y scripts
└── README.md
```

---

## Requisitos

- **Node.js** v18 o superior
- **npm**

---

## Instalación

1. Clone o descargue el repositorio:

```bash
git clone https://github.com/tu-usuario/registro-alumnos.git
cd registro-alumnos
```

2. Instale las dependencias:

```bash
npm install
```

---

## Ejecución

### Modo normal

```bash
npm start
```

### Modo desarrollo (reinicio automático al guardar cambios, Node.js v18+)

```bash
npm run dev
```

El servidor quedará disponible en:

```
http://localhost:3000
```

### Acceso desde otros dispositivos en la red local

1. Averigue la IP local de su máquina:

```bash
# Linux / macOS
ip a       # o: hostname -I

# Windows
ipconfig
```

2. Desde cualquier dispositivo en la misma red, abra el navegador ingrese a:

```
http://<ip-de-tu-maquina>:3000
```

Ejemplo: `http://192.168.1.50:3000`

---

## Uso

1. Abra la página desde su navegador.
2. Complete los campos **Nombre**, **Edad** y **Nota** y presione **+ Agregar** o **Enter**.
3. Los datos se envían al servidor y se muestran ordenados por nota.
4. Al cerrar el navegador y volver a abrir la misma URL, el servidor reconoce su sesión y le devuelve sus correspondientes datos.

> **Nota:** los datos se guardan en la memoria del proceso Node.js. Si el servidor se reinicia, los datos se pierden. Para persistencia permanente se requeriría una base de datos.

---

## Tecnologías

- Node.js
- Express 4
- Cookies de sesión (HTTP-only, sin librerías externas)
- HTML5 / CSS3 / JavaScript (fetch API)
