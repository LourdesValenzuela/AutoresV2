import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../../componentes/AutorForm/AutorForm.css'

const Update = ({ updateAutorInState }) => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/${id}`)
            .then(res => {
                setNombre(res.data.nombre || '');
                setError(null); // Reset error if the author is found
            })
            .catch(err => {
                setError('Lo sentimos, pero no pudimos encontrar el autor que estás buscando. ¿Deseas agregar este autor a nuestra base de datos?');
            });
    }, [id]);

    const updateAutor = e => {
        e.preventDefault();

        if (nombre.trim() === '') {
            alert('El nombre no puede estar vacío.');
            return;
        }

        axios.put(`http://localhost:8000/${id}`, { nombre })
            .then(res => {
                console.log('Autor updated:', res.data);
                updateAutorInState(res.data); // Actualiza el autor en el estado del App component
                navigate('/');
            })
            .catch(err => {
                console.error('Error updating autor:', err);
            });
    };

    return (
        <div className="autor-form-container">
            <div className="autor-form">
                {error ? (
                    <div>
                        <p>{error}</p>
                        <Link to="/new">Agregar nuevo autor</Link>
                    </div>
                ) : (
                    <div>
                        <h2>Edit this author</h2>
                        <form onSubmit={updateAutor}>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input 
                                    type="text" 
                                    name="nombre" 
                                    value={nombre} 
                                    onChange={(e) => setNombre(e.target.value)} 
                                />
                            </div>
                            <div className="form-actions">
                                <Link to="/" className="cancel-link">Cancel</Link>
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Update;
