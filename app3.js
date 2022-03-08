const urls = {
    Albums: 'https://jsonplaceholder.typicode.com/albums',
    Post: 'https://jsonplaceholder.typicode.com/posts',
    Todos: 'https://jsonplaceholder.typicode.com/todos',
    Users: 'https://jsonplaceholder.typicode.com/users',
    Comments: 'https://jsonplaceholder.typicode.com/comments',
    Photos: 'https://jsonplaceholder.typicode.com/photos'
};

function post() {
    let url="";
    let titulo_tabla="";
    const opcion = document.getElementById("urls").value;
    switch(opcion){
        case "Albums": 
            url = urls.Albums;
            titulo_tabla="--ALBUMS--";
            break;
        case "Posts":
            url = urls.Post;
            titulo_tabla="--POSTS--";
            break;
        case "Todos":
            url = urls.Todos;
            titulo_tabla="--TODOS--";
            break;
        case "Users":
            url = urls.Users;
            titulo_tabla="--USERS--";
            break;
        case "Comments":
            url = urls.Comments;
            titulo_tabla="--COMMENTS--";
            break;
        case "Photos":
            url = urls.Photos;
            titulo_tabla="--PHOTOS--";
            break;
        default:
            url = urls.Users;
            titulo_tabla="--por defecto Users--";
    }
     // Obtener la referencia del elemento div
    let papatabla= document.getElementById("cont-tabla")
    // Crea un elemento <table> y un elemento <tbody> con su titulo caption
    let tabla   = document.createElement("table");
    let tTitulo = document.createElement("caption");
    let tblBody = document.createElement("tbody");

    tTitulo.textContent=titulo_tabla;
    tabla.appendChild(tTitulo); //inyeccion de codigo

    // ir al jsonplaceholder
    fetch(url)
        .then( response => response.json() )
        .then( data => obtenerData(data) )
        .catch( error => console.log(error) )

        const obtenerData = (data) => {
            const Data = data.map(function(obj) {return obj;});
            // se extraen las llaves de cada elemento de Data
            const keys = [];   // las llaves de cada objeto de data
            for(let ele in Data[0]){
                keys.push(ele);
            }
            // Crea la fila theader
            let row = document.createElement("tr");

            for (let ele of keys) {
                // se llena las celdas del theader
                let celda = document.createElement("th");
                let textoCelda = document.createTextNode(ele);
                celda.appendChild(textoCelda);
                row.appendChild(celda);

                tblBody.appendChild(row);
            }

            for(let elemento of Data){
                const valores = [];   // los valores de cada llave
                for(let ele in elemento){
                    valores.push(elemento[ele]);
                }

                let row = document.createElement("tr");
                for (let ele of valores) {
                    // Crea un elemento <td> y un nodo de texto, para que el nodo de
                    // texto sea el contenido de <td>, ubica el elemento <td> al final
                    // de la fila de la tabla
                    let celda = document.createElement("td");
                    let textoCelda = document.createTextNode(ele);
                    celda.appendChild(textoCelda);
                    row.appendChild(celda);
                    // agrega la fila al final de la tabla dontro de tbody
                    tblBody.appendChild(row);
                }
            }

            // posiciona el <tbody> debajo del elemento <table>
            tabla.appendChild(tblBody);
            // appends <table> dentro <div>
            papatabla.appendChild(tabla);
            // modifica el atributo "border" de la tabla y lo fija a "5";
            tabla.setAttribute("border", "5"); 
    }
}

function limpiar(){

let tabla = document.querySelector("table");
let div = document.getElementById("cont-tabla");
div.removeChild (tabla);

}