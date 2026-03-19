# 📋 Registro de Alumnos

Aplicación web simple para registrar alumnos con su nombre, edad y nota. Los datos se muestran ordenados automáticamente por nota (descendente) y nombre (alfabético), y **persisten en el navegador** mediante `localStorage`.

---

## Características

- Carga de alumnos con nombre, edad y nota
- Listado ordenado por nota (mayor a menor) y por nombre en caso de empate
- Eliminación individual de alumnos o borrado total
- Persistencia de datos con `localStorage` (los datos sobreviven al cierre del navegador)
- Validación de campos antes de guardar
- Sin dependencias externas ni servidor requerido

---

## Requisitos

- Un navegador web moderno (Chrome, Firefox, Edge, Safari)
- No se necesita instalar nada

---

## Instalación

1. Clone el repositorio:

```bash
git clone https://github.com/tu-usuario/registro-alumnos.git
cd registro-alumnos
```

 el archivo `index.html`.

---
**Opcion más rápida**: Desacrgue el archivo index.html
## Ejecución

Abra el archivo `index.html` directamente en su navegador:

- **Doble clic** sobre `index.html`, o
- Desde la terminal:

```bash
# En Linux / macOS
open index.html

# En Windows
start index.html
```

No se necesita servidor local ni conexión a internet (solo se cargan fuentes de Google Fonts).

---

## Uso

1. Complete los campos **Nombre**, **Edad** y **Nota** (entre 0 y 10).
2. Presione el botón **+ Agregar** o la tecla **Enter**.
3. El alumno aparecerá en la tabla ordenado automáticamente.
4. Para eliminar un alumno, presione el botón **✕** en su fila.
5. Para borrar todos los registros, use el botón **Borrar todo**.

Los datos se guardan automáticamente. Al cerrar y volver a abrir el navegador, los alumnos seguirán ahí.

---

## Estructura del proyecto

```
registro-alumnos/
└── index.html   ← Toda la aplicación (HTML + CSS + JS en un solo archivo)
```

---

## Tecnologías

- HTML5
- CSS3
- JavaScript (vanilla)
- `localStorage` para persistencia de datos
