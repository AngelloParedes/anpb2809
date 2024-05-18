'use client'

import { useState, useEffect } from 'react'; // Importa los hooks useState y useEffect desde React.
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP.
import Image from 'next/image'; // Importa el componente Image de Next.js para la gestión de imágenes.
import peliculaImagen from '../img/pelicula.jpg'; // Importa la imagen de la película desde el directorio de imágenes.

// Define una interfaz para el objeto Pelicula.
interface Pelicula {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    genre: string;
    score: number;
}

// Define una interfaz para las props del componente ListaPeliculas.
interface Props {
    generos: string[]; // Una lista de géneros de películas.
    tituloPelicula: string; // El título de la película a buscar.
    descripcionPelicula: string; // La descripción de la película a buscar.
}

// Define el componente funcional ListaPeliculas.
export default function ListaPeliculas({ generos, tituloPelicula, descripcionPelicula }: Props) {
    const [peliculas, setPeliculas] = useState<Pelicula[]>([]); // Declara una variable de estado para almacenar las películas y una función para actualizarla.

    // Hook useEffect que se ejecuta cuando cambian los valores de generos, tituloPelicula o descripcionPelicula.
    useEffect(() => {
        ObtenerPeliculas(); // Llama a la función ObtenerPeliculas para obtener las películas.
    }, [generos, tituloPelicula, descripcionPelicula]); // Los cambios en generos, tituloPelicula o descripcionPelicula activarán este efecto.

    // Función asíncrona para obtener las películas.
    const ObtenerPeliculas = async () => {
        try {
            let peliculasFiltradas: Pelicula[] = [];

            // Si no se han seleccionado géneros, obtiene todas las películas.
            if (generos.length === 0) {
                const response = await axios.get<Pelicula[]>('http://localhost:3001/movies');
                peliculasFiltradas = response.data;
            } else {
                // Si se han seleccionado géneros, obtiene películas filtradas por esos géneros.
                const response = await axios.get<Pelicula[]>('http://localhost:3001/movies', {
                    params: { genres: generos.join(',') }
                });
                peliculasFiltradas = response.data.filter(pelicula =>
                    generos.some(selectedGenero => pelicula.genre === selectedGenero)
                );
            }

            // Filtra las películas por título si se proporciona un título de búsqueda.
            if (tituloPelicula) {
                peliculasFiltradas = peliculasFiltradas.filter(pelicula =>
                    new RegExp(`\\b${tituloPelicula}`, 'i').test(pelicula.title)
                );
            }

            // Filtra las películas por descripción si se proporciona una descripción de búsqueda.
            if (descripcionPelicula) {
                peliculasFiltradas = peliculasFiltradas.filter(pelicula =>
                    new RegExp(`\\b${descripcionPelicula}`, 'i').test(pelicula.description)
                );
            }

            // Establece las películas filtradas como el nuevo estado de las películas.
            setPeliculas(peliculasFiltradas);
        } catch (error) {
            console.error('Error fetching movies:', error); // Maneja cualquier error que ocurra durante la obtención de las películas.
        }
    };

    // Renderiza una lista de películas.
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Películas</h2>
                <div className="mb-4">
                    {generos.length > 0 && ( // Comprueba si hay géneros seleccionados.
                        <p className="text-2xl text-gray-700 mb-2">Peliculas de: {generos.join(', ')}</p> // Muestra los géneros seleccionados como una lista separada por comas.
                    )}
                    {generos.length === 0 && ( // Comprueba si no hay géneros seleccionados.
                        <p className="text-2xl text-gray-700 mb-2">Todas las Peliculas</p> // Indica que se están mostrando todas las películas si no hay géneros seleccionados.
                    )}
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {peliculas.map((pelicula) => ( // Mapea cada película y renderiza un elemento para cada una.
                        <div key={pelicula.id} className="group rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={peliculaImagen} // Utiliza la imagen de la película importada como la fuente de la imagen.
                                alt={pelicula.title} // Utiliza el título de la película como el atributo alt de la imagen.
                                className="w-full h-64 object-cover object-center" // Establece clases para estilizar la imagen.
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{pelicula.title}</h3> {/* Muestra el título de la película. */}
                                <p className="text-sm text-gray-600 mb-4">{pelicula.genre}</p> {/* Muestra el género de la película. */}
                                <p className="text-sm text-gray-700">{pelicula.description}</p> {/* Muestra la descripción de la película. */}
                                {[...Array(5)].map((_, index) => (
                                    // Para cada índice en un rango de 0 a 4, creamos un span que representa una estrella.
                                    <span key={index} className={`text-2xl ${index < Math.floor(pelicula.score) ? 'text-yellow-500' : 'text-gray-300'}`}>
                                        {/* Utilizamos el carácter Unicode "&#9733;" que representa una estrella rellena. */}
                                        &#9733;
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}