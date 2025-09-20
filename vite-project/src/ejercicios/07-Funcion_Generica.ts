function crearCaja<T>(valor: T): { contenido: T } {
  return {
    contenido: valor
  };
}

// 1. Número
const cajaNumero = crearCaja(5);
console.log(cajaNumero); // { contenido: 5 }

// 2. String
const cajaString = crearCaja("pizza");
console.log(cajaString); // { contenido: "pizza" }

// 3. Objeto (comida)
const comida = {
  nombre: "Hamburguesa",
  calorias: 600
};

const cajaComida = crearCaja(comida);
console.log(cajaComida); // { contenido: { nombre: "Hamburguesa", calorias: 600 } }

export{};
