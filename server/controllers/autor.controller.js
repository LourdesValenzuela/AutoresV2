const Autor = require('../models/autor.model');

module.exports.getAutor = (request, response) => {
    Autor.findOne({ _id: request.params.id })
        .then(autor => {
            if (!autor) {
                return response.status(404).json({ message: 'Autor not found' });
            }
            response.json(autor);
        })
        .catch(err => {
            console.error('Error al obtener autor:', err);
            response.status(500).json({ message: err.message });
        });
};

module.exports.createAutor = (request, response) => {
    const { nombre } = request.body;
    Autor.create({ nombre })
        .then(autor => {
            console.log('Autor creado:', autor);
            response.json(autor);
        })
        .catch(err => {
            console.error('Error al crear autor:', err);
            response.status(400).json(err);
        });
};

module.exports.getAllAutor = (request, response) => {
    Autor.find({})
        .then(autores => {
            console.log('Autores encontrados:', autores);
            response.json(autores);
        })
        .catch(err => {
            console.error('Error al obtener autores:', err);
            response.status(400).json(err);
        });
};

module.exports.updateAutor = (request, response) => {
    Autor.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true, runValidators: true })
        .then(updateAutor => response.json(updateAutor))
        .catch(err => response.status(400).json({ message: err.message }));
};

module.exports.deleteAutor = (request, response) => {
    Autor.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.status(500).json({ message: err.message }));
};
