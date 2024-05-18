'use client'

import { useState } from 'react'; // Importa el hook useState desde React.
import ListaPeliculas from './components/ListarPeliculas'; // Importa el componente ListaPeliculas
import ListarGeneros from './components/ListarGeneros'; // Importa el componente ListarGeneros

export default function Home() { // Define un componente funcional llamado Home y lo exporta por defecto.

  // Declara varios estados usando el hook useState.
  const [selectedGeneros, setSelectedGeneros] = useState<string[]>([]); // Estado para almacenar los géneros seleccionados.
  const [tituloPelicula, setBuscarPeliculaNom] = useState<string>(""); // Estado para almacenar la búsqueda de la película por nombre.
  const [descripcionPelicula, setBuscarPeliculaDscr] = useState<string>(""); // Estado para almacenar la búsqueda de la película por descripción.
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la apertura y cierre de un componente de acordeón.

  const ddd = 1
  // Función para manejar el cambio de género seleccionado.
  const CambioGenero = (genero: string) => {
    if (selectedGeneros.includes(genero)) {
      setSelectedGeneros(selectedGeneros.filter(g => g !== genero));
    } else {
      setSelectedGeneros([...selectedGeneros, genero]);
    }
  };

  // Función para alternar la apertura y el cierre del componente de acordeón.
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSelectedGeneros([]); // Restablece los géneros seleccionados si el acordeón está cerrado.
    }
  };

  // Función para manejar el cambio en la búsqueda por nombre de película.
  const BusquedaPeliculaNom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuscarPeliculaNom(event.target.value);
  };

  // Función para manejar el cambio en la búsqueda por descripción de película.
  const BusquedaPeliculaDscr = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBuscarPeliculaDscr(event.target.value);
  };

  return (
    <main>
      {/* Encabezado */}
      <div className="bg-gray-800 sticky-header">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center">
            <span className="text-white text-3xl font-semibold">Películas</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col sm:flex-row">
        {/* Panel de filtros */}
        <div className='bg-gray-800 w-full sm:w-1/5 mb-2 sm:mb-0 sm:mr-2'>
          <div className=" mx-auto max-w-md p-4 sticky-filters">
            <p className="text-white text-2xl mb-4">Filtros</p>

            {/* Componente de géneros */}
            <div className="max-w-md mx-auto mb-4">
              <div className="rounded-lg">
                <div className="flex text-white items-center justify-between cursor-pointer" onClick={toggleAccordion}>
                  <h2 className="text-lg font-medium mb-1">Genero</h2>
                  <svg
                    className={`w-6 h-6 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                    />
                  </svg>
                </div>
                {isOpen && (
                  <div className="text-white md:justify-center mb-6">
                    <ListarGeneros Generos={CambioGenero} />
                  </div>
                )}
              </div>
            </div>

            {/* Entrada de búsqueda por nombre */}
            <input
              type="text"
              className="w-full p-2 rounded-md mb-4"
              placeholder="Nombre de la Película"
              value={tituloPelicula}
              onChange={BusquedaPeliculaNom}
            />

            {/* Entrada de búsqueda por descripción */}
            <textarea
              className="w-full h-32 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              value={descripcionPelicula}
              onChange={BusquedaPeliculaDscr}
              placeholder="Cuentanos de qué trata la película"
            />
          </div>
        </div>

        {/* Lista de películas */}
        <div className="w-full">
          <ListaPeliculas generos={selectedGeneros} tituloPelicula={tituloPelicula} descripcionPelicula={descripcionPelicula} />
        </div>
      </div>
    </main>
  );
}