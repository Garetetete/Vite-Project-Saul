/*
{
    status: boolean;
    message: string;
    statusCode: number;
    result: [estados]
}

usuario = {
    nombre: string;
    apelliido: string;
    edad: number;
}

estados = {
    tipo: string;
    id: number;
}
*/
function verTipo<T>(argument: T): T{
    return argument;
}

interface Mamiferos {
    tipo: string;
    genero: string;
    edad: number;
}

const vaca: Mamiferos = {
    tipo: "Prueba",
    genero: "aaa",
    edad: 1
}

let prueba1 =verTipo("Hola");
let prueba2 =verTipo(true);
let prueba3 =verTipo(vaca);
console.log(prueba1)
console.log(prueba2)
console.log(prueba3)

/// --------------------------------------------


export{};
