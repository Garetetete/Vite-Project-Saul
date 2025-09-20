// interfaces.ts

export interface Producto {
  descripcion: string;
  precio: number;
}

export interface Persona {
  nombre: string;
  edad: number;
  productos: Producto[];
}
