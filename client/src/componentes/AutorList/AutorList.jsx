import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import './AutorList.css';

const AutorList = ({ autor = [], removeFromDom }) => {
    if (typeof removeFromDom !== 'function') {
        console.error('removeFromDom is not a function');
        return null;
    }

    const deleteAutor = (autorId) => {
        axios.delete(`http://localhost:8000/${autorId}`)
            .then(res => {
                removeFromDom(autorId);
            })
            .catch(err => {
                console.error('Error deleting author:', err);
                alert('Error deleting author. Please try again.');
            });
    };

    const sortedAutores = [...autor].sort((a, b) => a.nombre.localeCompare(b.nombre));

    return (
        <div className="autor-list-container">
            <h2>We have quotes by:</h2>
            <table className="autor-list-table">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions available</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedAutores.map((autor, idx) => (
                        <tr key={autor._id}>
                            <td>
                                <Link to={`/${autor._id}`}>
                                    {autor.nombre || 'Unnamed Author'}
                                </Link>
                            </td>
                            <td className="autor-list-actions">
                                <button className="edit"><Link to={`/${autor._id}/edit`} style={{color: 'white'}}>Edit</Link></button>
                                <button onClick={() => deleteAutor(autor._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AutorList;
