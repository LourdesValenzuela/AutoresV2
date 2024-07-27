import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const Detail = ({ deleteAutor }) => {
    const { id } = useParams();
    const [autor, setAutor] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/${id}`)
            .then(res => setAutor(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/${id}`)
            .then(res => {
                deleteAutor(id);
                navigate('/');
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <Link to="/">Home</Link> {/* Enlace para volver a la página principal */}
            <h2>{autor.nombre}</h2>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
};

export default Detail;
