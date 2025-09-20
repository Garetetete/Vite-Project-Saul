export interface Libro {
    titulo: string;
    autor?: {
        nombre?: string;
        pais?: string;
    };
    anioPublicacion?: number;
}

const mostrarLibro = (libro: Libro) => {
    const nombreAutor = libro.autor?.nombre ?? 'Autor desconocido';
    const paisAutor = libro.autor?.pais ?? 'País desconocido';
    const anio = libro.anioPublicacion ?? 'Año no disponible';

    console.log(`📘 Título: ${libro.titulo}`);
    console.log(`👤 Autor: ${nombreAutor}`);
    console.log(`🌍 País: ${paisAutor}`);
    console.log(`📅 Año: ${anio}`);
    console.log('--------------------------');
};

const libroCompleto: Libro = {
    titulo: 'Cien Años de Soledad',
    autor: {
        nombre: 'Gabriel García Márquez',
        pais: 'Colombia'
    },
    anioPublicacion: 1967
};

const libroSinAutor: Libro = {
    titulo: 'Libro Misterioso',
    anioPublicacion: 2021
};

const libroSinAnio: Libro = {
    titulo: 'Manual de React',
    autor: {
        nombre: 'Dan Abramov',
        pais: 'Rusia'
    }
};

mostrarLibro(libroCompleto);
mostrarLibro(libroSinAutor);
mostrarLibro(libroSinAnio);
