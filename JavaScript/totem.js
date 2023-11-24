const contenidoTotem = document.getElementById("contenidoTotem");
const verOrden = document.getElementById("verOrden");
const modalContainer = document.getElementById("modalContainer");
const cantidadOrden = document.getElementById("cantidadOrden");


let orden = JSON.parse(localStorage.getItem("orden")) || [];

const getMenu = async () =>{
    const response = await fetch("data.json");
    const data = await response.json();

    // Inserto los distintos menus y sus propiedades al HTML//
data.forEach((menu) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${menu.imagen}">
    <h3>${menu.nombre}</h3>
    <p class="price">${menu.precio} $</p>
    `;

    contenidoTotem.append(content);

    let agregar = document.createElement("button")
    agregar.innerText = "Agregar al menu";
    agregar.className = "agregar";

    content.append(agregar);

    agregar.addEventListener("click", () => {
        const repeat = orden.some((repeatMenu) => repeatMenu.id === menu.id);
        if (repeat) {
            orden.map((men) => {
                if (men.id === menu.id) {
                    men.cantidad++;
                }
            });
        } else {
            orden.push({
                id: menu.id,
                imagen: menu.imagen,
                nombre: menu.nombre,
                precio: menu.precio,
                cantidad: menu.cantidad,
            });
            console.log(orden);
            ordenCounter();
            saveLocal ();
        }
    });
});
};

getMenu();




const saveLocal = () => {
localStorage.setItem("orden", JSON.stringify (orden));
};

//get item

JSON.parse(localStorage.getItem("orden"));




