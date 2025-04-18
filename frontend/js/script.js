function cargarApp(){
    cargarProductos();
    cargarClientesSeleccionables();
}

function cargarProductos(){
    
    fetch('http://localhost:3000/productos')
    .then(response => response.json())
    .then(data => {
        const lista_productos = document.getElementById('lista-productos');
        console.log(data);
        data.forEach(product => {
            let li = document.createElement('li');
            li.innerHTML = product.nombre;
            const btnEliminar = document.createElement('button');
            btnEliminar.innerHTML = 'Eliminar';
            btnEliminar.onclick = () => {
                eliminarProducto(product.id)
            };
                
            li.appendChild(btnEliminar);
            
            lista_productos.append(li);
            
        });
    }).catch(err => console.log(err));
}

function cargarClientesSeleccionables(){
    const listaDesplegableClientes = document.getElementById('clientes');

    fetch('http://localhost:4000/clientes/')
    .then(response => response.json())
    .then(data => {
        const clientes = data;
        console.log("clientes: ", clientes);
        clientes.forEach(cliente => {
            const optionCl = document.createElement('option');
            optionCl.innerHTML = cliente.nombre;
            optionCl.value = cliente.id;
            listaDesplegableClientes.append(optionCl);
        });
    })
    .catch(err => console.log(err));
}




const miBtnCrear = document.getElementById('miBtnCrear');

miBtnCrear.addEventListener('click', (e) => {
    console.log("entro");
    e.preventDefault(); 
    let nombre = document.getElementById('nombre').value;
    let descripcion = document.getElementById('descripcion').value;
    let precio = Number(document.getElementById('precio').value);
    let cliente_id = Number(document.getElementById('clientes').value);
    let cantidad = Number(document.getElementById('cantidad').value);
    let fecha_compra = document.getElementById('fecha_compra').value;
    const data = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        cliente_id: cliente_id,
        cantidad: cantidad,
        fecha_compra: fecha_compra
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch('http://localhost:3000/productos', options)
    .then(response => response.json())
    .then(data => {
        cargarProductos();
        const lista_productos = document.getElementById('lista-productos');
        lista_productos.innerHTML = "";
        document.getElementById('forma').reset()
    }).catch(err => console.log(err));
});

function eliminarProducto(id){
    console.log("ENTRO");
    const options = {
        method: 'DELETE'
    };
    fetch(`http://localhost:3000/productos/${id}/`, options)
    .then(() => {
        const lista_productos = document.getElementById('lista-productos');
        lista_productos.innerHTML = "";
        cargarProductos();
    }).catch(err => console.log(err));
}
