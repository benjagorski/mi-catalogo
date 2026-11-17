import "./styles.css";

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?f=";
const LETRAS = "abcdefghijklmnopqrstuvwxyz";

const grilla = document.querySelector("#grilla");
const estado = document.querySelector("#estado");
const contador = document.querySelector("#contador");
const inputBusqueda = document.querySelector("#busqueda");
const selectCategoria = document.querySelector("#categoria");
const selectOrden = document.querySelector("#orden");

let comidas = [];

async function pedirLetra(letra) {
  const response = await fetch(API_URL + letra);
  if (!response.ok) {
    throw new Error(`La API respondió con el código ${response.status}`);
  }
  const datos = await response.json();
  return datos.meals ?? [];
}

async function cargarComidas() {
  mostrarCargando();
  try {
    const listas = await Promise.all([...LETRAS].map(pedirLetra));
    comidas = listas.flat();
    if (comidas.length === 0) {
      throw new Error("La API no devolvió recetas");
    }
    llenarCategorias();
    estado.textContent = "";
    estado.className = "estado";
    mostrar();
  } catch (error) {
    mostrarError(error);
  }
}

function mostrarCargando() {
  grilla.replaceChildren();
  contador.textContent = "";
  estado.className = "estado cargando";
  estado.textContent = "Cargando recetas…";
}

function mostrarError(error) {
  console.error(error);
  grilla.replaceChildren();
  contador.textContent = "";
  estado.className = "estado error";
  estado.setAttribute("role", "alert");
  estado.textContent = "No se pudieron cargar las recetas. Revisá tu conexión y probá de nuevo. ";
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "boton";
  boton.textContent = "Reintentar";
  boton.addEventListener("click", () => {
    estado.setAttribute("role", "status");
    cargarComidas();
  });
  estado.append(boton);
}

function llenarCategorias() {
  const categorias = [...new Set(comidas.map((c) => c.strCategory).filter(Boolean))].sort();
  for (const categoria of categorias) {
    const opcion = document.createElement("option");
    opcion.value = categoria;
    opcion.textContent = categoria;
    selectCategoria.append(opcion);
  }
}

function crearTarjeta(comida) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta";

  const img = document.createElement("img");
  img.src = `${comida.strMealThumb}/medium`;
  img.alt = `Plato: ${comida.strMeal}`;
  img.loading = "lazy";

  const cuerpo = document.createElement("div");
  cuerpo.className = "tarjeta-cuerpo";

  const titulo = document.createElement("h2");
  titulo.textContent = comida.strMeal;

  const dato = document.createElement("p");
  dato.textContent = [comida.strCategory, comida.strArea].filter(Boolean).join(" · ");

  cuerpo.append(titulo, dato);
  tarjeta.append(img, cuerpo);
  return tarjeta;
}

function mostrar() {
  const texto = inputBusqueda.value.trim().toLowerCase();
  const categoria = selectCategoria.value;

  const resultado = comidas
    .filter((c) => c.strMeal.toLowerCase().includes(texto))
    .filter((c) => categoria === "" || c.strCategory === categoria)
    .sort((a, b) => a.strMeal.localeCompare(b.strMeal));

  if (selectOrden.value === "desc") resultado.reverse();

  grilla.replaceChildren(...resultado.map(crearTarjeta));
  contador.textContent = `${resultado.length} recetas`;

  if (resultado.length === 0) {
    estado.className = "estado vacio";
    estado.textContent = "No hay recetas con ese nombre o categoría. Probá con otra búsqueda.";
  } else {
    estado.className = "estado";
    estado.textContent = "";
  }
}

inputBusqueda.addEventListener("input", mostrar);
selectCategoria.addEventListener("change", mostrar);
selectOrden.addEventListener("change", mostrar);

cargarComidas();
