const AutorController = require('../controllers/autor.controller');

// Exporta una función que toma una instancia de 'app' (una aplicación Express) y define las rutas de la API.
module.exports = function(app) {
    app.post('/', AutorController.createAutor);        // Crear un nuevo autor
    app.get('/', AutorController.getAllAutor);          // Obtener todos los autores
    app.get('/:id', AutorController.getAutor);          // Obtener un autor por ID
    app.put('/:id', AutorController.updateAutor);       // Actualizar un autor por ID
    app.delete('/:id', AutorController.deleteAutor);    // Eliminar un autor por ID
}
