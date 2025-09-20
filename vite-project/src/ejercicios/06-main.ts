// main.ts

import { describirPersona } from './06-procesador';
import { type Persona } from './06-interfaces';

const usuario: Persona = {
  nombre: 'Ana',
  edad: 28
};

const descripcion = describirPersona(usuario);
console.log(descripcion);
