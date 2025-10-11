# 📚 Repositorio de Actividades - Curso de Angular

Este repositorio contiene todas las actividades y el proyecto final del curso de desarrollo web con Angular.

## 📁 Estructura del Repositorio

```
Vite-Project-Saul/
├── actividad-1/        # Funciones e interfaces en TypeScript
├── actividad-2/        # Sistema de gestión de comidas
├── actividad-3/        # Componente de carro con Angular
├── actividad-4/        # CRUD de programas de TV
├── actividad-6/        # Buscador de GIFs con API de Giphy
└── Proyecto/           # 🎯 PROYECTO FINAL - Cat Facts App
```

## 🎯 Proyecto Final: Cat Facts App

El proyecto final se encuentra en la carpeta **`Proyecto/`** y es una aplicación completa que consume la API de Cat Facts.

### Características del Proyecto Final:
- ✅ Consume 3 endpoints diferentes de la API
- ✅ Interfaz moderna y responsive con Bootstrap 5
- ✅ Implementación con Angular 20 y standalone components
- ✅ Completamente listo para desplegar en Netlify
- ✅ Documentación completa

### Acceder al Proyecto Final:
```bash
cd Proyecto
npm install
npm start
```

### Desplegar en Netlify:
Ver instrucciones detalladas en `Proyecto/DEPLOYMENT.md`

**Opción rápida:**
```bash
cd Proyecto
npm run build
# Subir la carpeta dist/mi-app/browser a Netlify
```

## 🌐 Enlaces Útiles

- **API utilizada**: https://catfact.ninja/
- **Documentación del proyecto**: Ver `Proyecto/README.md`
- **Guía de despliegue**: Ver `Proyecto/DEPLOYMENT.md`

## 📊 Actividades Previas

### Actividad 1: TypeScript Básico
Práctica de funciones, interfaces y tipos en TypeScript.

### Actividad 2: Sistema de Comidas
Sistema de gestión con TypeScript y POO.

### Actividad 3: Componente Car
Primer componente Angular con routing.

### Actividad 4: CRUD Programas TV
CRUD completo con componentes Angular.

### Actividad 6: GIFs App
Consumo de API de Giphy con Angular.

## 👨‍💻 Autor

**Saúl** - Estudiante Universidad de los Llanos

---

## 🚀 Inicio Rápido del Proyecto Final

Si solo quieres ver el proyecto final funcionando:

```bash
# 1. Navegar a la carpeta del proyecto
cd Proyecto

# 2. Instalar dependencias (si no están instaladas)
npm install

# 3. Ejecutar en modo desarrollo
npm start

# 4. Abrir en el navegador
# http://localhost:4200
```

## 📦 Para Desplegar en Netlify

### Método 1: Manual (Más rápido)
```bash
cd Proyecto
npm install
npm run build
```
Luego arrastra la carpeta `dist/mi-app/browser` a https://app.netlify.com/drop

### Método 2: Con Git (Automático)
1. Sube el repositorio a GitHub
2. Conecta Netlify con tu repositorio
3. Configura:
   - Build command: `npm run build`
   - Publish directory: `Proyecto/dist/mi-app/browser`
   - Base directory: `Proyecto`

**Nota**: El archivo `netlify.toml` ya tiene toda la configuración necesaria.

---

## 📝 Notas Importantes

- El proyecto usa **Angular 20** con las últimas características
- Configuración de **Standalone Components**
- **Bootstrap 5** para el diseño
- **TypeScript 5.9** para el tipado
- API pública sin necesidad de keys

## 🎓 Aprendizajes Aplicados

En este proyecto final se aplicaron todos los conceptos vistos en clase:
- Consumo de APIs REST
- Routing y navegación
- Componentes standalone
- Servicios e inyección de dependencias
- Signals para manejo de estado
- Reactive programming con RxJS
- Diseño responsive
- Deployment en la nube

---

**Desarrollado con ❤️ para el curso de Angular - Universidad de los Llanos 2025**

