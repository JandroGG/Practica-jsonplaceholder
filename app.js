const urls = {
    Albums: 'https://jsonplaceholder.typicode.com/albums',
    Post: 'https://jsonplaceholder.typicode.com/posts',
    Todos: 'https://jsonplaceholder.typicode.com/todos',
    Users: 'https://jsonplaceholder.typicode.com/users',
    Comments: 'https://jsonplaceholder.typicode.com/comments',
    Photos: 'https://jsonplaceholder.typicode.com/photos'
};

let Data, keys, values = [], tituloTabla;

// let isDoneAddress = false;
// let isDoneCompany = false;
let mostrarDataIsDone = false;


function buscarData(){
    let url;
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

    inicio=document.querySelector(".inicio");
    inicio.style.backgroundColor = "orange";
    inicio.textContent = " ...Buscando";

    fetch(url)
        .then( response => response.json() )
        .then( data => obtenerData(data) )
        .catch( error => mostrarError(error) )

    const obtenerData = (data) => {
        Data = data.map((obj) => obj);
        inicio.style.backgroundColor = "greenyellow";
        inicio.textContent = "Datos obtenidos"
        mostrarData();
    }   

    const mostrarError = (error) => {
        console.log(error);
        inicio.style.backgroundColor = "red";
        inicio.textContent = "Sin conexion";
    }  
}

function mostrarData(){

    if(Data === undefined){
        console.log('buscando Data');
        console.log('keys: '+keys);
        console.log('Data: '+Data);
    }
    else{
        if(!mostrarDataIsDone){
            keys = Object.keys(Data[0]);
            // arreglo de informacion:
            for(let i=0;i<keys.length;i++){
                values.push(Data.map((item) => item[keys[i]]));
            }
    
            // contruccion de la tabla
            let divContenedor= document.getElementById("contenedor");
            let tabla   = document.createElement("table");
            let tituloDeLaTabla = document.createElement("caption");
            let tableBody = document.createElement("tbody");
            tituloDeLaTabla.textContent=titulo_tabla;
            tabla.appendChild(tituloDeLaTabla);
    
            // construccion del header:
            let row = document.createElement("tr");
            for (let ele of keys) {
                // se llena las celdas del theader
                let celda = document.createElement("th");
                let textoCelda = document.createTextNode(ele);
                celda.appendChild(textoCelda);
                row.appendChild(celda);
                tableBody.appendChild(row);
            }
    
            for(let [columna,ele] of values[0].entries()){
                let row = document.createElement("tr");
                for( let [fila, ele] of values.entries()){
                    let celda = document.createElement("td");
               ///////////////////////////////////////////////////////////////////////////////////////////
                    if(typeof values[fila][columna] === "object"){
                        textoCelda = document.createTextNode("click");
                        switch(keys[fila]){
                            case "address":
                                celda.className="address";
                                celda.id="A-"+columna;
                                break;
                            case "company":
                                celda.className="company";
                                celda.id="C-"+columna;                        
                                break;
                        }
                    }
                    else{
                        textoCelda = document.createTextNode(values[fila][columna]);
                    }
    
                    if(keys[fila] === "url" /*|| keys[fila] === "website"*/){
                        let ancla = document.createElement("a");
                        ancla.setAttribute("href", values[fila][columna]);
                        ancla.setAttribute('target', "_blank")
                        let anclaTexto = document.createTextNode("visit");
                        ancla.appendChild(anclaTexto);
    
                        textoCelda = document.createTextNode("");
                        celda.appendChild(ancla);
                        celda.className="url";
                        celda.id="U-"+columna;
                    }
                    // <img src="imagenes/paisaje.PNG"/>
                    else if (keys[fila] === "thumbnailUrl"){
    
                        let imagen = document.createElement("img");
                        imagen.setAttribute("src", values[fila][columna]);
                        imagen.className = "imagen";
                        let imagenTexto = document.createTextNode("view");
                        imagen.appendChild(imagenTexto);
    
                        textoCelda = document.createTextNode("");
                        celda.appendChild(imagen);
                        celda.id = "img-" + columna;
                    }
    
                 ///////////////////////////////////////////////////////////////////////////////////////////
                    celda.appendChild(textoCelda);
                    row.appendChild(celda);
                    tableBody.appendChild(row);
                }
            }
            tabla.appendChild(tableBody);
            divContenedor.appendChild(tabla);
            tabla.setAttribute("border", "5");
    
            // Fin construccion de la tabla.
            // adicionales:
            const opcion = document.getElementById("urls").value;
            switch(opcion){
                case "Users":
                    classAddress = document.getElementsByClassName("address");
                    classCompany = document.getElementsByClassName("company");
                    for(let i of classAddress){
                        i.addEventListener("click", mostrarAddressUser, false);
                        i.style.color="blue";
                        i.style.cursor="pointer";
                    }
                    for(let i of classCompany){
                        i.addEventListener("click", mostrarCompanyUser, false);
                        i.style.color="blue";
                        i.style.cursor="pointer";
                    }
                    break;
    
                case "Photos":
                    // classUrl = document.getElementsByClassName("url");
                    // for(let i of classUrl){
                    //     i.addEventListener("click", obtenerCompanyUser, false);
                    //     i.style.color="blue";
                    //     i.style.cursor="pointer";
                    // }
                    break;
            }
            mostrarDataIsDone=true;
        }
        
    } ////// fin del else principal
    
}

function mostrarAddressUser(event){
    // console.log('mostrar addres user ', event.target.id);
    // if(!isDoneAddress){
        let CeldaContenedor = document.getElementById(event.target.id);
        CeldaContenedor.textContent="";
        CeldaContenedor.style.textAlign="center";
        let userId = parseInt((event.target.id[(event.target.id).length - 1]));
        const keysAddress = Object.keys(values[4][userId]);
        const valuesAddres = Object.values(values[4][userId]);
        let temporal = Object.keys(valuesAddres[4]);
        keysAddress.push(temporal[0]);
        keysAddress.push(temporal[1]);       

        temporal = Object.values(valuesAddres[4]);
        valuesAddres.pop();
        valuesAddres.push("localization:")
        valuesAddres.push(temporal[0]);
        valuesAddres.push(temporal[1]);

        let toolTip = document.createElement("div");
        toolTip.setAttribute("class", "tooltip");
        let textTooltip = document.createTextNode("⬆");
        toolTip.appendChild(textTooltip);

        let spanTooltip = document.createElement("span");
        spanTooltip.setAttribute("class", "tooltiptext");

        let linea = "";
        for(let [index, ele] of keysAddress.entries()){
            let parrafo = document.createElement("p");
            parrafo.setAttribute("class", "ptooltip");
            let spancito = document.createElement("span");
            spancito.setAttribute("class", "keys-negrita");
            let spancitoText = document.createTextNode(keysAddress[index]+": ");
            spancito.appendChild(spancitoText);

            let textParrafo = document.createTextNode(valuesAddres[index]);
            parrafo.appendChild(spancito);
            parrafo.appendChild(textParrafo);
            spanTooltip.appendChild(parrafo);

        }
        toolTip.appendChild(spanTooltip);
        CeldaContenedor.appendChild(toolTip);
        isDoneAddress=true;
    // }
    //////////////////
    

}


function mostrarCompanyUser(event){
    // console.log('mostrar company users', event.target.id);
    let CeldaContenedor = document.getElementById(event.target.id);
    CeldaContenedor.textContent="";
    CeldaContenedor.style.textAlign="center";
    
    // futuro cambio para fusionar con la function mostrarAddressUsers
    let userId = parseInt((event.target.id[(event.target.id).length - 1]));
    const keysAddress = Object.keys(values[7][userId]);
    const valuesAddres = Object.values(values[7][userId]);
    ///////////////////////
    let toolTip = document.createElement("div");
    toolTip.setAttribute("class", "tooltip");
    let textTooltip = document.createTextNode("⬆");
    toolTip.appendChild(textTooltip);

    let spanTooltip = document.createElement("span");
    spanTooltip.setAttribute("class", "tooltiptext");

    let linea = "";
    for(let [index, ele] of keysAddress.entries()){
        let parrafo = document.createElement("p");
        parrafo.setAttribute("class", "ptooltip");
        let spancito = document.createElement("span");
        spancito.setAttribute("class", "keys-negrita");
        let spancitoText = document.createTextNode(keysAddress[index]+": ");
        spancito.appendChild(spancitoText);

        let textParrafo = document.createTextNode(valuesAddres[index]);
        parrafo.appendChild(spancito);
        parrafo.appendChild(textParrafo);
        spanTooltip.appendChild(parrafo);

    }
    toolTip.appendChild(spanTooltip);
    CeldaContenedor.appendChild(toolTip);   
}

function limpiar(){
    let tabla = document.querySelector("table");    //hijo
    let divContenedor = document.getElementById("contenedor");    //Padre
    inicio=document.querySelector(".inicio");
    inicio.style.backgroundColor = "red";
    inicio.textContent = "Sin Datos"
    divContenedor.removeChild(tabla);

    Data = undefined; keys = []; values = []; titulo_tabla = [];
    mostrarDataIsDone=false;

}

function _init(){
    document.getElementById("buscar-btn").addEventListener("click", mostrarData, false);
    document.getElementById("users-btn").addEventListener("click", limpiar, false);
    // document.getElementById("users-btn").setAttribute("hidden", "true");
}


window.addEventListener( "load" , _init, false);














// let parrafo;
// for(let [index, ele] of keysAddress.entries()){
//     parrafo = document.createElement("p");
//     span = document.createElement("span");
//     textoSpan = document.createTextNode( keysAddress[index] + ': ');
//     span.appendChild(textoSpan);
//     span.className = ".spanAdd";
//     span.id= "spanAdd"
//     textoParrafo = document.createTextNode( valuesAddres[index] );
//     parrafo.appendChild(span);
//     parrafo.appendChild(textoParrafo);
//     divContenedor.appendChild(parrafo);
// }