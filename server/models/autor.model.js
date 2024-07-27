const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        minlength: [3, "Ingrese mínimo 3 caracteres"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Autor', AutorSchema);
