// procesador.ts

import { type Persona } from './06-interfaces';

// Función que toma un objeto Persona y devuelve un string con los datos
export function describirPersona(persona: Persona): string {
  return `Nombre: ${persona.nombre}, Edad: ${persona.edad}`;
}
