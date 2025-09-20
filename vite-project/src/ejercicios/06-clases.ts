/*export class Persona {
    public nombre: string;
    public direccion: string;

    constructor(nombre: string, direccion: string){
      //  this.nombre ='Jose';
      //  this.direccion ='Jones';

    }
}
*/
export class Persona {
    constructor(
        public nombre: string = 'sin nombre',
        public direccion: string = 'Sin direccion'

    ) {
    }
}

export class Trabajador extends Persona {
  constructor(
    public nombre: string,
    public cargo: string,
    public empresa: string,
    public direccionTrabajo: string
  ) {
    super(nombre); // Solo pasamos el nombre, la dirección será "Sin direccion"
  }
}

const trabajador = new Trabajador(
  'Diseñador UX',
  'Google',
  'Av. Creativa 789',
  'Daniel'
);

console.log(`👨 ${trabajador.nombre} trabaja como ${trabajador.cargo} en ${trabajador.empresa}, su oficina está en ${trabajador.direccionTrabajo}. Vive en: ${trabajador.direccion}.`);