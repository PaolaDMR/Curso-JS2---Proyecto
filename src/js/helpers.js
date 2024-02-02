const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

// Función asíncrona para obtener datos JSON desde una URL
async function getJSON(url) {
    try {
      // a. La declaración de res.
    //   const response = await fetch(url); 

    const fetchPro = fetch(url);

    response = await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]);

      // Validacion ok
      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      return data;

    } catch (error) {
      // Captura cualquier error durante el proceso
      console.error(error.message);
      throw error; 
    }
  }
  
  // Exporta la función para que pueda ser utilizada en otros archivos
  module.exports = getJSON;