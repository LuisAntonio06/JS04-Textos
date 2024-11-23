/* VARIABLES */
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

/* EVENT LISTENERS */
eventListeners();

function eventListeners(){

    /* Cuando el usuario agreea un Nuevo tweet */
    formulario.addEventListener('submit', agregarTweet);

    /* Cuando el documento esta listo */
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];
   
        console.log(tweets);

        crearHTML();
    } )
}



/* FUNCIONES */
function agregarTweet(e) {
    e.preventDefault();

    /* TextArea Donde el usuario escribe */
    const tweet = document.querySelector('#tweet').value;

    if(tweet.trim() === ''){
        mostrarError('Un tweet no puede ir vacio')
        return; // Evita que se ejecuten mas líneas de código.
    }

    const tweetObj = {
        id:Date.now(),
        tweet : tweet
    }

    /* Añadir al arreglo de tweets */
    tweets = [... tweets , tweetObj]

    /* Una vez agregado vamos a crear el HTML */
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();



}

// Mostrar Mensaje de Error
    function mostrarError(error) {
        const mensajeError = document.createElement('p');
        mensajeError.textContent = error;
        mensajeError.classList.add('error');

        // Insertarlos en el contenido
        const contenido = document.querySelector('#contenido');
        contenido.append(mensajeError);

        /* Elimina la alerta despues de 3 segundos */
        setTimeout(() => {
            mensajeError.remove();
        }, 3000);
}

// Muestra un listado de los tweets

function crearHTML()  {

    limpiarHTML()

    if(tweets.length > 0) {
        tweets.forEach( tweet => {

            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X'

            /* Añadir la función de eliminar */
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear el html
            const li = document.createElement('li');

            /* Añadir el texto */
            li.innerHTML = tweet.tweet;

            /*  Asignar el boton */
            li.appendChild(btnEliminar)

            // Insertarlo en el HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}
/* Agrega los tweets actuales a LocalStorage */

function sincronizarStorage() {
    localStorage.setItem('tweets',JSON.stringify(tweets))
}

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}


// Limpiar HTML 
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

