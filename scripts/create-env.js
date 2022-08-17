const fs = require("fs"); // Fs es un modulo de NODE llamado fileSystem y nos permiten enviar datos en nuestra computadora.

fs.writeFileSync('./.env', `API=${process.env.API}\n`) 
/* 
    Creamos un archivo .env en la raiz del proyecto. Y creamos este recurso .env del lado del servidor. 
    
    Pero como accedemos a process.env.API? 
    La configuramos en netlify en deploy settings/Environment variables: Para que tenga la variable API.
    Antes debo ejecutar este recurso antes del build en package.json
*/