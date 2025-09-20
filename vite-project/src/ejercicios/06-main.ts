// main.ts

import { describirCompra } from './06-procesador';
import { type Persona } from './06-interfaces';

const cliente: Persona = {
  nombre: 'Carlos',
  edad: 35,
  productos: [
    { descripcion: 'Laptop', precio: 1200 },
    { descripcion: 'Mouse', precio: 50 }
  ]
};

const mensaje = describirCompra(cliente);
console.log(mensaje);
