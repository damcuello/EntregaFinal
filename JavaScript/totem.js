const contenidoTotem = document.getElementById("contenidoTotem");
const verOrden = document.getElementById("verOrden");
const modalContainer = document.getElementById("modalContainer");


let orden = [];

// Inserto los distintos menus y sus propiedades al HTML//
menus.forEach((menu) => {
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
        orden.push({
            id: menu.id,
            imagen: menu.imagen,
            nombre: menu.nombre,
            precio: menu.precio,
        })
        console.log(orden);
    })
});

verOrden.addEventListener("click", () => {
    modalContainer.innerHTML = ""; /*Realizo esto para que al abrir y cerrar la orden no me duplique los elementos*/
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
     <h1 class="modal-header-titulo">Orden.</h1>
    `;

    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "xx";
    modalbutton.className = "modal-header-button";


    /*Función para que al tocar numero de orden se cierre el preview*/
    modalbutton.addEventListener("click", () =>{
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);


    orden.forEach((menu) => {
        let ordenContent = document.createElement("div");
        ordenContent.className = "modal-content"
        ordenContent.innerHTML = `
         <img src="${menu.imagen}">
         <h3>${menu.nombre}</h3>
         <p>${menu.precio} $</p>
        `;
        modalContainer.append(ordenContent)
    });

    const total = orden.reduce((acc, elem) => acc + elem.precio, 0);

    const totalOrden = document.createElement("div")
    totalOrden.className = "total-content"
    totalOrden.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalOrden);
});








