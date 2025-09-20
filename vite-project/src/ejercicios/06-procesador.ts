// procesador.ts

import { type Persona } from './06-interfaces';

export function describirCompra(persona: Persona): string {
  const total = persona.productos.reduce((suma, producto) => suma + producto.precio, 0);

  return `${persona.nombre} (edad: ${persona.edad}) ha comprado ${persona.productos.length} producto(s) por un total de $${total}`;
}
