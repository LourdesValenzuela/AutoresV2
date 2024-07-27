import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AutorForm.css';

const AutorForm = ({
    nombre,
    setNombre,
    onSubmitHandler
}) => {
    const navigate = useNavigate(); // Crea una instancia de navigate

    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        onSubmitHandler(e); // Llama a la función que maneja el envío
        navigate('/'); // Redirige a la página principal
    };

    return (
        <div className="autor-form-container">
            <div className="autor-form">
                <h2>Add a new author:</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            onChange={(e) => setNombre(e.target.value)}
                            value={nombre}
                        />
                    </div>
                    <div className="form-actions">
                        <Link to="/" className="cancel-link">Cancel</Link>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AutorForm;


