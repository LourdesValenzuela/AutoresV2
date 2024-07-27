import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import AutorForm from '../AutorForm/AutorForm';
import AutorList from '../AutorList/AutorList';
import Detail from '../../views/Detail/Detail';
import Update from '../../views/Update/Update';
import './App.css';

const App = () => {
    const [nombre, setNombre] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [autor, setAutor] = useState([]);
    const [redirect, setRedirect] = useState(null);

    const onSubmitHandler = (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    axios.post('http://localhost:8000/', { nombre })
        .then(res => {
            console.log(res);
            fetchAutor();
            setNombre(""); // Restablece el estado nombre después de enviar el formulario
            setRedirect('/'); // Redirige a la página principal
        })
        .catch(err => console.log(err));
};


    const fetchAutor = () => {
        axios.get('http://localhost:8000/')
            .then(res => {
                console.log(res.data);
                setAutor(res.data);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
                setLoaded(true);
            });
    };

    const updateAutorInState = (updatedAutor) => {
        setAutor(autor.map(a => a._id === updatedAutor._id ? updatedAutor : a));
    };

    useEffect(() => {
        fetchAutor();
    }, []);

    const removeFromDom = autorId => {
        setAutor(autor.filter(a => a._id !== autorId));
    };

    const deleteAutor = (autorId) => {
        axios.delete(`http://localhost:8000/${autorId}`)
            .then(res => {
                removeFromDom(autorId);
                setRedirect('/');
            })
            .catch(err => console.error(err));
    };

    return (
        <Router>
            <div className="App">
                <h1>Favorite Authors</h1>
                <div className="divider"></div>
                {redirect && <Navigate to={redirect} />}
                <Routes>
                    <Route path="/" element={
                        <div>
                            <Link to="/new">Add new author</Link>
                            <div className="divider"></div>
                            {loaded && <AutorList autor={autor} removeFromDom={removeFromDom} />}
                        </div>
                    } />
                    <Route path="/new" element={
                        <div>
                            <Link to="/">Home</Link> {/* Enlace para volver a la página principal */}
                            <AutorForm
                                nombre={nombre}
                                setNombre={setNombre}
                                onSubmitHandler={onSubmitHandler}
                            />
                        </div>
                    } />
                    <Route path="/:id/edit" element={
                        <div>
                          <Link to="/">Home</Link> {/* Enlace para volver a la página principal */}
                          <Update updateAutorInState={updateAutorInState} />
                        </div>
                    } />
                    <Route path="/:id" element={<Detail deleteAutor={deleteAutor} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
