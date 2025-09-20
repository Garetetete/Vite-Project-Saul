export interface Comida {
  nombre: string;
  calorias: number;
  esVegana: boolean
}

const pizza: Comida = {
  nombre: 'Pizza',
  calorias: 800,
  esVegana: false,
};

const enzalada: Comida = {
    nombre: 'Enzalada',
    calorias: 150,
    esVegana: true,
}

const hamburguesa: Comida = {
    nombre: 'Hamburguesa',
    calorias: 600,
    esVegana: false,
}

class ComidaService {
  mostrarInfo(comida: Comida): void {
    const { nombre, calorias, esVegana } = comida;
    console.log(`Nombre: ${nombre}, Calorías: ${calorias}, ¿Vegana?: ${esVegana}`);
  }

  modificarCalorias(comida: Comida, nuevasCalorias: number): Comida {
    return {
      ...comida,
      calorias: nuevasCalorias,
    };
  }
}

class NotificationComida {
  constructor(
    public servicio: ComidaService
  ) {}

  notificar(comida: Comida) {
    console.log('Notificando comida...');
    this.servicio.mostrarInfo(comida);
    console.log();
  }
}

// Instancias
const servicio = new ComidaService();
const notificador = new NotificationComida(servicio);

// Comidas
notificador.notificar(pizza);
notificador.notificar(enzalada);
notificador.notificar(hamburguesa);

// Modificar calorías de la pizza
const nuevaPizza = servicio.modificarCalorias(pizza, 500);

// Notificar comida modificada
notificador.notificar(nuevaPizza);

