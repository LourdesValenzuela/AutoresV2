const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Mongoose
require('./server/config/mongoose.config');

// Configuración de rutas
require('./server/routes/autor.routes')(app);

app.listen(8000, () => {
    console.log(`Listening at Port 8000`);
});
