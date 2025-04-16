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
            btnEliminar.onclick = (id) => {
                eliminarProducto(id)
            };
                
            li.appendChild(btnEliminar);
            
            lista_productos.append(li);
            
        });
    }).catch(err => console.log(err));
}

cargarProductos();


const miBtnCrear = document.getElementById('miBtnCrear');

miBtnCrear.addEventListener('click', (e) => {
    console.log("entro");
    e.preventDefault(); 
    let nombre = document.getElementById('nombre').value;
    let descripcion = document.getElementById('descripcion').value;
    let precio = Number(document.getElementById('precio').value);
    const data = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
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
        e.reset();
    }).catch(err => console.log(err));
});

function eliminarProducto(id){
    console.log("ENTRO");
    const options = {
        method: 'DELETE'
    };
    fetch(`http://localhost:3000/productos/${id}/`, options)
    .then(response => response.json())
    .then(data => {
        const lista_productos = document.getElementById('lista-productos');
        lista_productos.innerHTML = "";
        cargarProductos();
    }).catch(err => console.log(err));
}
