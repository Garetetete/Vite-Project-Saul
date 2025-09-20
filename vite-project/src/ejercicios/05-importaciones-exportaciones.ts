import { type Producto, calcularImpuesto } from './04-desestructurador';

const carrito: Producto[] = [
    {
        descripcion: 'Carro',
        precio: 1020
    },
    {
        descripcion: 'Celular',
        precio: 1010
    }
]

const [total, totalImpuesto] = calcularImpuesto({
    impuesto: 100,
    productos: carrito,
    propina: 0
})
console.log({total, totalImpuesto});

/*

crear un archivo con 2 interfaces, otro archivo con una funcion que recibe por parametro
un objeto de tipo de una interfaz y retorno un string con un datos del objeto ,
y otro archivo que haga el llamado de la funcion

*/