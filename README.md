# Mesa Abierta — Catálogo de recetas

Trabajo Práctico N.º 2 de Programación III (UTN San Nicolás).

## Tema y API
Catálogo de recetas de cocina. Usa [TheMealDB](https://www.themealdb.com/api.php) con la clave pública de pruebas (`1`), que es gratuita y no es secreta, por lo que no hace falta `config.js`.

## Cómo ejecutarlo
```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # genera dist/
npm run preview   # prueba el build
```

## Funcionalidades
- Landing con hero, descripción del tema y enlace al catálogo.
- Catálogo con tarjetas (imagen, nombre, categoría y país) cargadas con `fetch`.
- Estados de cargando y error (con botón para reintentar).
- Búsqueda por nombre, filtro por categoría (armado desde los datos), orden A–Z / Z–A y estado "sin resultados".
- Responsive (mobile-first), sin frameworks ni librerías.

## Publicación
Subir el contenido de `dist/` a GitHub Pages, Netlify o Vercel (comando de build: `npm run build`, carpeta: `dist`).
