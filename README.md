# Vite-Project-Saul

Proyecto de prácticas con TypeScript y Angular por Saul.

## Estructura del Proyecto

- **actividad-1/** - TypeScript Básico: Funciones e Interfaces
- **actividad-2/** - Sistema de Comidas con POO
- **actividad-3/** - Angular Signals
- **src/** - Aplicación Angular principal

## Actividad 1: TypeScript Básico

Funciones, interfaces y objetos en TypeScript.

```bash
cd actividad-1
node -e "console.log(require('typescript').transpile(require('fs').readFileSync('funciones-interfaces.ts', 'utf8')))" | node
```

## Actividad 2: Sistema de Comidas

Sistema con clases, interfaces e inyección de dependencias.

```bash
cd actividad-2
node -e "console.log(require('typescript').transpile(require('fs').readFileSync('sistema-comidas.ts', 'utf8')))" | node
```

## Actividad 3: Angular Signals

Componente Car con signals de Angular.

Ver archivos en `actividad-3/` y código fuente en `src/app/pages/car/`

## Aplicación Angular Principal

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.3.

### Development server

To start a local development server, run:

```bash
npm install
npx ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Available Routes

- `/` - Counter Page (Home)
- `/car` - Car Component (Actividad 3 - Signals)
- `/dragonball` - Dragonball Component

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
