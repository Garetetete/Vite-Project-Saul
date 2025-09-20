
interface Detalle{
    autor: string
    anio: number;
}

interface ReproductorAudio {
    volumen: number;
    duracion: number;
    cancion: string;
    detalle: Detalle;

}

const ReproductorAudio: ReproductorAudio = {
    volumen: 0,
    duracion: 18,
    cancion: "Cancion prueba",
    detalle: {
        autor: "Pepito",
        anio: 2025
    }
}

const cancion = ReproductorAudio.cancion;
const autor = ReproductorAudio.detalle.autor
console.log(cancion);
console.log(autor);


//Desestructurador
const { cancion: nombreCancion, duracion } = ReproductorAudio;
console.log(nombreCancion);
console.log(duracion);

//obtener el nombre del autor
const { detalle } = ReproductorAudio;
const { autor: nombreAutor1} = detalle;
console.log(nombreAutor1);

const { detalle : { autor: nombreAutor2 } } = ReproductorAudio;
console.log(nombreAutor2);

// arrays

const frutas = ["Peras", "Manzanas", "Fresas"];
console.log("Frutas: " + (frutas[3] || 'No se ha encontrado nada'));

//const [p1,p2,p3, p4 = 'No se encuentra'] = frutas;
const [,,p3] = frutas;
console.log(p3);

///////// -----------------------------------------------------

export interface Producto {
  descripcion: string;
  precio: number;
}

const celular: Producto = {
  descripcion: "Samsung A1",
  precio: 100,
};

const Computador: Producto = {
  descripcion: "Lenovo",
  precio: 300,
};

const carrito: Producto[] = [celular, Computador];
const impuesto: number = 0.19;
const propina: number = 0.05;

interface ImpuestosOption {
  impuesto: number;
  productos: Producto[];
  propina: number; // ← esto debe ser un número, no un array
}

export function calcularImpuesto(options: ImpuestosOption): number[] {
  let total = 0;
  options.productos.forEach(({ precio }) => {
    total += precio;
  });

  return [
    total,
    total * options.impuesto,
    total * options.propina
  ];
}

// Primera forma de llamar
const resultadoCompra = calcularImpuesto({
  impuesto,
  productos: carrito,
  propina,
});

console.log("Total: " + resultadoCompra[0]);
console.log("Total impuesto: " + resultadoCompra[1]);
console.log("Propina: " + resultadoCompra[2]);

// Segunda forma con desestructuración
const [TotalCompra, totalImpuestoCompra, totalPropina] = calcularImpuesto({
  impuesto,
  productos: carrito,
  propina,
});

console.log("Total: " + TotalCompra);
console.log("Total impuesto: " + totalImpuestoCompra);
console.log("Propina: " + totalPropina);


