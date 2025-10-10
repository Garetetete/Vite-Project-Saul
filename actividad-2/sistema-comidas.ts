// Interfaz Comida
interface Comida {
    nombre: string;
    calorias: number;
    esVegana: boolean;
}

// Objetos de comida
const pizza: Comida = {
    nombre: 'Pizza',
    calorias: 800,
    esVegana: false
}

const ensalada: Comida = {
    nombre: 'Ensalada',
    calorias: 150,
    esVegana: true
}

const hamburguesa: Comida = {
    nombre: 'Hamburguesa',
    calorias: 600,
    esVegana: false
}

// Clase ComidaService
export class ComidaService {
    constructor(
        public comida: Comida,
    ){
    }

    mostrarInfo(comida: Comida){
        const { nombre, calorias, esVegana } = comida; // Desestructuración
        console.log(`Nombre: ${nombre}, Calorías: ${calorias}, ¿Vegana?: ${esVegana}`);
    }

    modificarCalorias(comida: Comida, nuevasCalorias: number): Comida{
        return {
            ...comida,
            calorias: nuevasCalorias
        };
    }
}

// Clase NotificadorComida
export class NotificadorComida {
    constructor(
        public comidaService: ComidaService
    ){
    }

    notificar(comida: Comida){
        console.log('Notificando comida...');
        this.comidaService.mostrarInfo(comida);
        console.log('');
    }
}   

// Pruebas del sistema
console.log('=== COMIDAS ORIGINALES ===\n');

// Notificar pizza original
const comidaService1 = new ComidaService(pizza);
const notificador1 = new NotificadorComida(comidaService1);
notificador1.notificar(pizza);

// Notificar ensalada
const comidaService2 = new ComidaService(ensalada);
const notificador2 = new NotificadorComida(comidaService2);
notificador2.notificar(ensalada);

// Notificar hamburguesa
const comidaService3 = new ComidaService(hamburguesa);
const notificador3 = new NotificadorComida(comidaService3);
notificador3.notificar(hamburguesa);

console.log('=== MODIFICANDO CALORÍAS ===\n');

// Modificar pizza
const comidaService4 = new ComidaService(pizza);
const pizzaModificada = comidaService4.modificarCalorias(pizza, 500);
const notificador4 = new NotificadorComida(comidaService4);
notificador4.notificar(pizzaModificada);

export {}

