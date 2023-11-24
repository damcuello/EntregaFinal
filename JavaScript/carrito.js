const pintarCarrito = () => {
    modalContainer.innerHTML = ""; /*Realizo esto para que al abrir y cerrar la orden no me duplique los elementos*/
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
     <h1 class="modal-header-titulo">Orden.</h1>
    `;

    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";


    /*Función para que al X se cierre el preview*/
    modalbutton.addEventListener("click", () => {
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
         <span class="restar"> - </span>
         <p>Cantidad: ${menu.cantidad}</p>
         <span class="sumar"> + </span>
         <p>Total: ${menu.cantidad * menu.precio}</p>
         <span class="delete-product"> ❌ </span)
        `;
        modalContainer.append(ordenContent);

        let restar = ordenContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if (menu.cantidad !== 1) {
                menu.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });

        let sumar = ordenContent.querySelector(".sumar");
        sumar.addEventListener("click", () =>{
            menu.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        let eliminar = ordenContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () =>{
            eliminarMenu(menu.id);
        });
    });



    const total = orden.reduce((acc, elem) => acc + elem.precio * elem.cantidad, 0);

    const totalOrden = document.createElement("div")
    totalOrden.className = "total-content"
    totalOrden.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalOrden);
};

verOrden.addEventListener("click", pintarCarrito);

const eliminarMenu = (id) => {
    const foundId = orden.find((element) => element.id === id);

    orden = orden.filter((ordenId) => {
        return ordenId !== foundId;
    });
    ordenCounter();
    saveLocal();
    pintarCarrito();
};


const ordenCounter = () => {
    cantidadOrden.style.display = "block";
    const ordenLength = orden.length;
    localStorage.setItem("ordenLength", JSON.stringify(ordenLength))
    cantidadOrden.innerText = JSON.parse(localStorage.getItem("ordenLength"));
};

ordenCounter();