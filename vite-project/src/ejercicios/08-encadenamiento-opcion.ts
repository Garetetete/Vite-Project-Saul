export interface Pasajero {
    nombre: string;
    hijos?: string[];
}   

const pasajero1: Pasajero = {
    nombre: 'Pepito',
    hijos: ['Janeiro','Fevereiro']
}

const pasajero2: Pasajero = {
    nombre: 'Perez',
}

const mostrarHijos = (pasajero: Pasajero) => {
    const CantidadHijos = pasajero.hijos?.length ?? 0;
    console.log(CantidadHijos);
}

mostrarHijos(pasajero1)
mostrarHijos(pasajero2)

// || or

const valorPrueba = 0 || 10;
console.log(valorPrueba)