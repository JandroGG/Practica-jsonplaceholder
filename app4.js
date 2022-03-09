const urls = {
    Albums: 'https://jsonplaceholder.typicode.com/albums',
    Post: 'https://jsonplaceholder.typicode.com/posts',
    Todos: 'https://jsonplaceholder.typicode.com/todos',
    Users: 'https://jsonplaceholder.typicode.com/users',
    Comments: 'https://jsonplaceholder.typicode.com/comments',
    Photos: 'https://jsonplaceholder.typicode.com/photos'
};

const arrayAddress = [];
const arrayCompany = [];

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
            let indexFila=0;
            for(let elemento of Data){
                /////////////
                const valores = [];   // los valores de cada llave
                for(let ele in elemento){
                    valores.push(elemento[ele]);
                }

                let row = document.createElement("tr");
                let indexColumna=0;
                for (let ele of valores){
                    
                    // para cada elemento de valores se le asigna como valor a una celda de la fila tr
                    let celda = document.createElement("td");
                    let textoCelda;
                    if(typeof ele === "object"){
                        textoCelda = document.createTextNode("View");
                        if(keys[indexColumna]==="address"){
                            arrayAddress.push(ele);
                            celda.className="address";
                            celda.id=indexFila;
                        }
                        if(keys[indexColumna]==='company'){
                            arrayCompany.push(ele);
                            celda.className="company";
                            celda.id=indexFila;
                        }
                        
                    }
                    else{
                        textoCelda = document.createTextNode(ele);
                    }
                    celda.appendChild(textoCelda);
                    row.appendChild(celda);
                    // agrega la fila al final de la tabla dontro de tbody
                    tblBody.appendChild(row);
                    indexColumna = indexColumna +1;
                }
                indexFila=indexFila+1;
            }
            // posiciona el <tbody> debajo del elemento <table>
            tabla.appendChild(tblBody);
            // appends <table> dentro <div>
            papatabla.appendChild(tabla);
            // modifica el atributo "border" de la tabla y lo fija a "5";
            tabla.setAttribute("border", "5"); 
    } // fin obtener data
    console.log("fin obtener data");
}

function limpiar(){
    let tabla = document.querySelector("table");    //hijo
    let div = document.getElementById("cont-tabla");    //Padre
    div.removeChild (tabla);

}

function _init(){
    document.getElementById("btn-principal").addEventListener("click", post, false);
    document.getElementById("clear").addEventListener("click", limpiar, false);
    document.getElementById("completar").addEventListener("click", completar, false);
}

function obtener_address_user(e){
    e.target.style.color="red";
    mostrar_address_user(arrayAddress[e.target.id]);
}

function mostrar_address_user(addres){
    let divTooltip = document.getElementById("display-address");    //padre contenedor del di tooltip
    let tabla   = document.createElement("table");                  //creamos la tabla que se insertara dentro del padre
    let tTitulo = document.createElement("caption");                // titulo
    let tblBody = document.createElement("tbody");                  // body de la tabla

    tTitulo.textContent="Addres";
    tabla.appendChild(tTitulo); //inyeccion de codigo

    const idAddres = Object.keys(addres);
    const valueAddres = Object.values(addres);

    for(let i=0;i<idAddres.length;i++){
        let row = document.createElement("tr"); //padre
        let celdah = document.createElement("th");  //hijo
        let celdad = document.createElement("td");  //hijo
        textoCeldah = document.createTextNode(idAddres[i]);
        textoCeldad = document.createTextNode(valueAddres[i]);
        celdah.appendChild(textoCeldah);
        celdad.appendChild(textoCeldad);
        row.appendChild(celdah);
        row.appendChild(celdad);
        tblBody.appendChild(row);
    }

    tabla.appendChild(tblBody);
    divTooltip.appendChild(tabla);
}

function obtener_company_user(e){
    e.target.style.color="red";
    mostrar_company_user(arrayCompany[e.target.id]);
}

function mostrar_company_user(company){
    let divTooltip = document.getElementById("display-address");    //padre contenedor del di tooltip
    let tabla   = document.createElement("table");                  //creamos la tabla que se insertara dentro del padre
    let tTitulo = document.createElement("caption");                // titulo
    let tblBody = document.createElement("tbody");                  // body de la tabla

    tTitulo.textContent="Company";
    tabla.appendChild(tTitulo); //inyeccion de codigo

    const idCompany = Object.keys(company);
    const valueCompany = Object.values(company);

    for(let i=0;i<idCompany.length;i++){
        let row = document.createElement("tr"); //padre
        let celdah = document.createElement("th");  //hijo
        let celdad = document.createElement("td");  //hijo
        textoCeldah = document.createTextNode(idCompany[i]);
        textoCeldad = document.createTextNode(valueCompany[i]);
        celdah.appendChild(textoCeldah);
        celdad.appendChild(textoCeldad);
        row.appendChild(celdah);
        row.appendChild(celdad);
        tblBody.appendChild(row);
    }

    tabla.appendChild(tblBody);
    divTooltip.appendChild(tabla);



    console.log(arrayCompany);
}

function completar(){
    classAddress = document.getElementsByClassName("address");
    classCompany = document.getElementsByClassName("company");
    for(let i of classAddress){
        i.addEventListener("click", obtener_address_user, false);
        i.style.color="blue";
        i.style.cursor="pointer";
    }
    for(let i of classCompany){
        i.addEventListener("click", obtener_company_user, false);
        i.style.color="blue";
        i.style.cursor="pointer";
    }
}



window.addEventListener( "load" , _init, false);