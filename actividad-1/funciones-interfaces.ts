// ==================== FUNCIONES EN TYPESCRIPT ====================

// Función tradicional
function restar(x: number, y: number): number {
    return x - y;
}

// Función flecha
const dividir = (x: number, y: number): number => {
    return x / y;
}

// Función con parámetros opcionales y por defecto
function calcularPotencia(numero: number, exponente?: number, multiplicador: number = 2): number {
    return numero * multiplicador;
}

// Ejecutando funciones
const resultado1: number = restar(10, 3);
const resultado2: number = dividir(20, 4);
const resultado3: number = calcularPotencia(5);

console.log('=== RESULTADOS DE FUNCIONES ===');
console.log('Resta:', resultado1);
console.log('División:', resultado2);
console.log('Potencia:', resultado3);
console.log('');

// ==================== INTERFACES Y OBJETOS ====================

interface Heroe {
    nombre: string;
    poder: number;
    mostrarInfo: () => void;
}

// Función que modifica el poder de un héroe
const aumentarPoder: (heroe: Heroe, cantidad: number) => void = (heroe, cantidad) => {
    heroe.poder += cantidad;
    console.log(`Nuevo poder de ${heroe.nombre}: ${heroe.poder}`);
}

// Crear objeto héroe
const heroe1: Heroe = {
    nombre: 'Superman',
    poder: 95,
    mostrarInfo() {
        console.log(`🦸 Héroe: ${this.nombre} | Poder: ${this.poder}`);
    }
}

console.log('=== INFORMACIÓN DEL HÉROE ===');
console.log(heroe1);
heroe1.mostrarInfo();
aumentarPoder(heroe1, 15);
console.log('');

// ==================== INTERFACE COMPLEJA ====================

interface Cliente {
    id: number;
    nombre: string;
    correo: string;
    estado: boolean;
    permisos: string[];
    ubicacion: {
        ciudad: string;
        pais: string;
    }
    saludar: () => string;
    cambiarCorreo: (nuevoCorreo: string) => void;
}

// Crear cliente
const cliente1: Cliente = {
    id: 101,
    nombre: "Carlos Rodríguez",
    correo: "carlos@empresa.com",
    estado: true,
    permisos: ["leer", "escribir", "ejecutar"],
    ubicacion: {
        ciudad: "Madrid",
        pais: "España"
    },
    saludar() {
        return `¡Hola! Soy ${this.nombre} de ${this.ubicacion.ciudad}`;
    },
    cambiarCorreo(nuevoCorreo: string) {
        this.correo = nuevoCorreo;
        console.log(`✅ Correo actualizado a: ${this.correo}`);
    }
}

console.log('=== INFORMACIÓN DEL CLIENTE ===');
console.log(cliente1);
console.log(cliente1.saludar());
cliente1.cambiarCorreo("carlos.rodriguez@empresa.com");

export {}

