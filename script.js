// 1️⃣ Seleccionar elementos del DOM
const input = document.getElementById("tareaInput");       // campo para escribir la tarea
const btn = document.getElementById("agregarBtn");         // botón "Agregar"
const lista = document.getElementById("listaTareas");      // lista donde aparecen las tareas
const borrarTodoBtn = document.getElementById("borrarTodoBtn"); // botón "Borrar Todo"

// Al cargar la página, recuperar las tareas guardadas (HTML de la lista)
lista.innerHTML = localStorage.getItem("tareas") || "";

// 🔁 Volver a activar los eventos de cada tarea (porque innerHTML los borra)
lista.querySelectorAll("li").forEach(agregarEventosALi);



// Agregar tarea
btn.onclick = () => {
  if (!input.value.trim()) return alert("Escribe una tarea"); // no dejar agregar vacíos

  const li = document.createElement("li");
  li.innerHTML = `
    ${input.value.trim()}
    <button>Eliminar</button>
  `;

  agregarEventosALi(li);          // activa los eventos (marcar y eliminar)
  lista.appendChild(li);          // añade el <li> a la lista
  guardar();                      // guarda todo en localStorage
  input.value = "";               // limpia el campo
};


function agregarEventosALi(li) {
  // Marcar tarea como completada (al hacer clic sobre el texto)
  li.onclick = function (e) {
    if (e.target.tagName !== "BUTTON") {
      li.classList.toggle("completada");
      guardar(); // actualiza localStorage
    }
  };

  // Eliminar tarea (al hacer clic en el botón)
  li.querySelector("button").onclick = function (e) {
    e.stopPropagation(); // evita que también marque la tarea
    li.remove();
    guardar(); // actualiza localStorage
  };
}


function guardar() {
  localStorage.setItem("tareas", lista.innerHTML);
}


borrarTodoBtn.onclick = () => {
  lista.innerHTML = "";
  localStorage.removeItem("tareas");
};

