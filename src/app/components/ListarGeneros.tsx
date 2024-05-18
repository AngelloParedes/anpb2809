'use client'

import { useState, useEffect } from 'react'; // Importa los hooks useState y useEffect desde React.
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP.

// Define una interfaz para el objeto Genero.
interface Genero {
    id: number;
    name: string;
}

// Define una interfaz para las Propiedades del componente ListarGeneros.
interface Props {
    Generos: (genre: string) => void;
}

// Define el componente funcional ListarGeneros.
export default function ListarGeneros({ Generos }: Props) {
    const [generos, setGeneros] = useState<Genero[]>([]); // Declara una variable de estado para almacenar los géneros y una función para actualizarla.

    // Hook useEffect que se ejecuta cuando el componente se monta.
    useEffect(() => {
        ObtenerGeneros(); // Llama a la función ObtenerGeneros para obtener los géneros.
    }, []);

    // Función para obtener los géneros desde la API.
    const ObtenerGeneros = () => {
        axios.get<Genero[]>('http://localhost:3001/genres') // Realiza una solicitud GET a la URL especificada para obtener los géneros.
            .then(response => setGeneros(response.data)) // Actualiza el estado de los géneros con los datos obtenidos de la respuesta.
            .catch(error => console.error('Error fetching genres:', error)); // Maneja cualquier error que ocurra durante la solicitud.
    };

    // Función para manejar la selección de un género.
    const SeleccionarGenero = (NomGenero: string) => {
        Generos(NomGenero); // Llama a la función proporcionada por las Propiedades Generos con el nombre del género seleccionado
    };

    // Renderiza una lista de géneros.
    return (
        <ul className="flex flex-col">
            {generos.map(genero => ( // Mapea cada género y renderiza un elemento de lista para cada uno.
                <li key={genero.id}> {/* Utiliza el ID del género como clave única para la lista. */}
                    <div className="flex items-center">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                onChange={(e) => SeleccionarGenero(genero.name)} // Cuando el usuario selecciona/deselecciona un género, llama a la función SeleccionarGenero.
                                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            />
                            <span className="ml-2 font-bold">{genero.name}</span> {/* Muestra el nombre del género. */}
                        </label>
                    </div>
                </li>
            ))}
        </ul>
    );
}