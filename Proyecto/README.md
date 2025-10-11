# 🐱 Cat Facts App - Proyecto Final

## 👥 Integrantes del Grupo
- **Saul Eduardo Cordoba**

## 📋 Descripción General del Proyecto

Cat Facts App es una aplicación web moderna desarrollada con **Angular 20** que consume la API pública de **Cat Facts** (https://catfact.ninja/). La aplicación permite a los usuarios explorar hechos curiosos sobre gatos y conocer diferentes razas felinas del mundo a través de una interfaz intuitiva y responsive.

### 🎯 Propósito y Alcance

El propósito de este proyecto es demostrar el dominio de tecnologías web modernas mediante el desarrollo de una Single Page Application (SPA) que:
- Consume múltiples endpoints de una API RESTful
- Implementa buenas prácticas de desarrollo con Angular
- Proporciona una experiencia de usuario excepcional con diseño responsive
- Se despliega en la nube usando Netlify

## 🏗️ Estructura del Proyecto

```
Vite-Project-Saul/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── shared/
│   │   │       └── navbar/          # Componente de navegación
│   │   ├── models/                  # Interfaces TypeScript
│   │   │   ├── cat-fact.model.ts   # Modelo para hechos de gatos
│   │   │   └── cat-breed.model.ts  # Modelo para razas de gatos
│   │   ├── pages/
│   │   │   └── cat-facts/
│   │   │       ├── random-fact/      # Página de hecho aleatorio
│   │   │       ├── facts-list/       # Página de lista de hechos
│   │   │       ├── breeds-list/      # Página de tabla de razas
│   │   │       └── breed-explorer/   # Página de explorador visual de razas
│   │   ├── services/
│   │   │   ├── cat-facts.service.ts            # Servicio para consumir la API
│   │   │   ├── translation.service.ts          # Servicio de traducción de UI
│   │   │   └── content-translation.service.ts  # Servicio de traducción de contenido
│   │   ├── app.config.ts           # Configuración de la aplicación
│   │   ├── app.routes.ts           # Configuración de rutas
│   │   └── app.ts                  # Componente raíz
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── public/
│   └── _redirects                  # Configuración para Netlify
├── angular.json                    # Configuración de Angular CLI
├── netlify.toml                    # Configuración de despliegue en Netlify
├── package.json                    # Dependencias y scripts
├── tsconfig.json                   # Configuración de TypeScript
└── README.md                       # Este archivo
```

## ✨ Funcionalidades Principales

### 1. 🎲 Hecho Aleatorio sobre Gatos
- **Endpoint**: `GET https://catfact.ninja/fact`
- Muestra un hecho aleatorio sobre gatos
- Botón para generar un nuevo hecho
- Indica la longitud del texto
- Animaciones suaves al cargar nuevo contenido

### 2. 📚 Catálogo de Hechos sobre Gatos
- **Endpoint**: `GET https://catfact.ninja/facts?limit={limit}&page={page}`
- Lista paginada de hechos sobre gatos
- Control de cantidad de elementos por página (5, 10, 15, 20)
- Navegación por páginas con indicadores visuales
- Numeración automática de los hechos
- Indicador del total de hechos disponibles

### 3. 🐈 Razas de Gatos del Mundo (Tabla)
- **Endpoint**: `GET https://catfact.ninja/breeds?limit={limit}&page={page}`
- Catálogo de razas de gatos en formato de tabla
- Información detallada de cada raza:
  - Nombre de la raza
  - País de origen
  - Tipo de origen (Natural/Standard)
  - Tipo de pelaje
  - Patrón de color
- Búsqueda en tiempo real por cualquier campo
- Control de cantidad de razas por página (10, 15, 20, 25)
- Paginación avanzada
- Diseño responsive

### 4. 🎴 Explorador Visual de Razas (NUEVO)
- **Endpoint**: `GET https://catfact.ninja/breeds?limit=98`
- Presenta TODAS las razas en un formato visual de tarjetas interactivas
- Panel de estadísticas con:
  - Total de razas
  - País con más razas
  - Cantidad de tipos de pelaje
  - Cantidad de patrones
- Tarjetas con efecto hover y animaciones
- Modal de detalle al hacer clic en una raza
- Grid completamente responsive
- Estadísticas calculadas en tiempo real con Signals

### 5. 🌐 Sistema de Traducción Bilingüe (ES/EN)
- **Idiomas**: Español (por defecto) e Inglés
- Botón de cambio de idioma en el navbar
- Traducción completa de la interfaz de usuario
- **Traducción automática del contenido de la API**:
  - Hechos sobre gatos traducidos
  - Información de razas traducida (países, orígenes, pelajes, patrones)
- Sistema inteligente de traducción con:
  - Diccionario pre-cargado con 150+ términos comunes
  - Traducción palabra por palabra
  - API de traducción como respaldo
  - Funciona incluso sin conexión a internet
- Persistencia del idioma seleccionado en localStorage
- Re-traducción automática al cambiar idioma

### 6. 🎨 Características Adicionales
- Diseño moderno y profesional con Bootstrap 5
- Iconos de Bootstrap Icons
- Navbar responsive con menú hamburguesa en móviles
- Animaciones y transiciones suaves
- Estados de carga con spinners
- Manejo de errores con mensajes informativos
- Completamente responsive (móvil, tablet, desktop)

## 🔌 Consumo de APIs

El proyecto consume **3 servicios diferentes** de la API Cat Facts en **4 páginas distintas**:

| Servicio | Método | Endpoint | Descripción | Usado en | Parámetros |
|----------|--------|----------|-------------|----------|------------|
| Random Fact | GET | `/fact` | Obtiene un hecho aleatorio | Random Fact | Ninguno |
| Facts List | GET | `/facts` | Obtiene lista paginada de hechos | Facts List | `limit`, `page` |
| Breeds List | GET | `/breeds` | Obtiene lista paginada de razas | Cat Breeds + Breed Explorer | `limit`, `page` |

**Nota**: El endpoint `/breeds` se utiliza en 2 páginas diferentes con enfoques distintos:
- **Cat Breeds**: Vista de tabla con búsqueda y paginación personalizada
- **Breed Explorer**: Vista de tarjetas mostrando TODAS las razas con estadísticas

### Implementación del Servicio

```typescript
// src/app/services/cat-facts.service.ts
@Injectable({ providedIn: 'root' })
export class CatFactsService {
  private readonly apiUrl = 'https://catfact.ninja';

  getRandomFact(): Observable<CatFact>
  getFacts(limit: number, page: number): Observable<CatFactsResponse>
  getBreeds(limit: number, page: number): Observable<CatBreedsResponse>
}
```

## 📦 Dependencias Necesarias

### Dependencias de Producción
```json
{
  "@angular/common": "^20.3.0",
  "@angular/compiler": "^20.3.0",
  "@angular/core": "^20.3.0",
  "@angular/forms": "^20.3.0",
  "@angular/platform-browser": "^20.3.0",
  "@angular/router": "^20.3.0",
  "rxjs": "~7.8.0",
  "bootstrap": "5.3.3",
  "bootstrap-icons": "1.11.3"
}
```

### Dependencias de Desarrollo
```json
{
  "@angular/cli": "^20.3.3",
  "@angular/compiler-cli": "^20.3.0",
  "typescript": "~5.9.2"
}
```

## 🚀 Pasos para la Ejecución

### Prerrequisitos
- Node.js 20.x o superior
- npm 10.x o superior

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd Vite-Project-Saul
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

### 4. Construir para producción
```bash
npm run build
# o
ng build
```

Los archivos de producción se generarán en `dist/mi-app/browser/`

### 5. Ejecutar tests (opcional)
```bash
npm test
# o
ng test
```

## 🌐 Despliegue en Netlify

### Opción 1: Deploy Manual
1. Construir el proyecto: `npm run build`
2. Ir a https://app.netlify.com/
3. Arrastrar la carpeta `dist/mi-app/browser` al área de deploy

### Opción 2: Deploy con Git
1. Conectar el repositorio de GitHub/GitLab a Netlify
2. Configurar:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/mi-app/browser`
3. Netlify detectará automáticamente el archivo `netlify.toml` con la configuración

### Configuración de Netlify
El archivo `netlify.toml` incluye:
- Comando de build y directorio de publicación
- Redirects para manejo de rutas SPA
- Headers de seguridad
- Configuración de caché para assets estáticos

## 🛠️ Tecnologías y Conceptos Aplicados

### Temas Vistos en Clase
- ✅ **Angular Framework**: Uso de componentes standalone modernos (Angular 20)
- ✅ **TypeScript**: Tipado fuerte con interfaces y modelos
- ✅ **Reactive Programming**: Uso de RxJS (Observables, forkJoin, timeout, catchError)
- ✅ **HTTP Client**: Consumo de APIs REST con provideHttpClient
- ✅ **Routing**: Navegación entre páginas con Angular Router
- ✅ **Signals**: Uso de la nueva API de signals y computed signals
- ✅ **Effects**: Effects para re-traducción automática
- ✅ **Forms**: Two-way data binding con FormsModule
- ✅ **Dependency Injection**: Inyección de servicios
- ✅ **Directivas**: Uso de directivas estructurales (@if, @for)
- ✅ **Pipes**: Transformación de datos en templates
- ✅ **CSS/Bootstrap**: Diseño responsive y moderno
- ✅ **Internacionalización (i18n)**: Sistema de traducción completo
- ✅ **LocalStorage**: Persistencia de preferencias del usuario
- ✅ **Git**: Control de versiones con múltiples ramas

### Buenas Prácticas Implementadas
- Arquitectura modular y escalable
- Separación de responsabilidades (Services, Components, Models)
- Componentes standalone reutilizables
- Manejo apropiado de errores
- Loading states para mejor UX
- Código limpio y bien documentado
- Responsive design desde el inicio
- Optimización para producción

## 🎨 Diseño y UX

### Paleta de Colores
- **Primary**: Bootstrap Primary (#0d6efd)
- **Secondary**: Gradientes personalizados
- **Backgrounds**: Blanco y grises suaves
- **Accents**: Colores de Bootstrap Icons

### Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 991px
  - Desktop: > 991px

### Animaciones
- Fade-in para contenido nuevo
- Hover effects en tarjetas
- Transiciones suaves en navegación
- Loading spinners durante peticiones HTTP

## 📊 Estructura de Datos

### Modelo de Fact
```typescript
interface CatFact {
  fact: string;
  length: number;
}
```

### Modelo de Breed
```typescript
interface CatBreed {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
}
```

### Modelo de Respuesta Paginada
```typescript
interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
  // ... más campos de paginación
}
```

## 🤖 Uso de Inteligencia Artificial

Durante el desarrollo de este proyecto se utilizó asistencia de IA (Cursor/Claude) para:
- Generación de estructura base de componentes
- Sugerencias de mejores prácticas de Angular
- Optimización de código TypeScript
- Diseño responsive con Bootstrap
- Documentación del código

**Nota importante**: Todo el código generado con asistencia de IA fue revisado, comprendido y adaptado según las necesidades específicas del proyecto. El desarrollador tiene pleno conocimiento de la funcionalidad implementada y puede explicar cada parte del código.

## 📝 Notas de Desarrollo

### Decisiones de Arquitectura
- Se eligió usar **standalone components** en lugar de módulos para aprovechar la arquitectura más moderna de Angular
- Se implementó **Signals** para el manejo de estado local en componentes
- Se utilizó **provideHttpClient** con fetch API para mejor rendimiento
- Se separó la lógica de negocio en servicios para mejor mantenibilidad

### Desafíos y Soluciones
1. **Paginación compleja**: Se implementó un sistema de páginas visibles con elipsis
2. **Búsqueda en tiempo real**: Se utilizó ngModel para filtrado instantáneo
3. **Deployment en Netlify**: Se configuró correctamente el routing SPA con redirects

## 🔗 Enlaces Útiles

- **Repositorio**: https://github.com/Garetetete/Vite-Project-Saul
- **Rama del Proyecto**: `proyecto`
- **Sitio en Netlify**: [Próximamente - Listo para despliegue]
- **API Documentation**: https://catfact.ninja/
- **Angular Docs**: https://angular.dev/
- **Bootstrap Docs**: https://getbootstrap.com/

## 📞 Contacto

Para cualquier duda o consulta sobre el proyecto:
- **Nombre**: Saul Eduardo Cordoba
- **Email**: sauleduardo1111@gmail.com
- **GitHub**: [@Garetetete](https://github.com/Garetetete)
- **Universidad**: Universidad de los Llanos

---

## 🏆 Criterios de Evaluación Cumplidos

| Criterio | Ponderación | Estado | Detalles |
|----------|-------------|--------|----------|
| **Estructura del proyecto** | 20% | ✅ | Código organizado, modular y limpio con separación clara de responsabilidades |
| **Consumo de APIs** | 25% | ✅ | 3 endpoints implementados correctamente en 4 páginas diferentes |
| **Explicación del proyecto** | 25% | ✅ | Documentación completa, código comentado y bien estructurado |
| **Abarcar temas vistos** | 15% | ✅ | Angular 20, TypeScript, RxJS, Signals, Effects, HTTP, Routing, Forms, i18n |
| **Originalidad y valor agregado** | 15% | ✅ | Sistema de traducción inteligente bilingüe, 4 páginas, estadísticas dinámicas, diseño moderno |

### 🌟 Valor Agregado Destacable

1. **Sistema de Traducción Bilingüe Completo**
   - Traducción de UI y contenido de la API
   - Diccionario pre-cargado con 150+ términos
   - Funciona sin API externa gracias al sistema de fallback
   - Persistencia de idioma seleccionado

2. **4 Páginas con Enfoques Diferentes**
   - Mismo endpoint usado de 2 formas distintas (tabla y tarjetas)
   - Cada página con funcionalidad única y valor propio

3. **Estadísticas en Tiempo Real**
   - Uso avanzado de Computed Signals
   - Cálculos dinámicos sin re-renders innecesarios

4. **Documentación Extensa**
   - README completo con todos los detalles
   - DEPLOYMENT.md para instrucciones de despliegue
   - GUIA-RAPIDA.md para referencia rápida
   - TRADUCCION.md explicando el sistema de i18n
   - PAGINAS.md documentando cada página

---

**Desarrollado con ❤️ y ☕ por Saul Eduardo Cordoba**

*Proyecto Final - Universidad de los Llanos - 2025*

---

### 📚 Documentación Adicional

Este proyecto incluye documentación detallada en los siguientes archivos dentro de la carpeta `documentacion/`:
- **`README.md`** (este archivo): Descripción general del proyecto
- **`documentacion/DEPLOYMENT.md`**: Guía paso a paso para despliegue en Netlify
- **`documentacion/GUIA-RAPIDA.md`**: Referencia rápida de comandos y funcionalidades
- **`documentacion/TRADUCCION.md`**: Explicación técnica del sistema de traducción
- **`documentacion/PAGINAS.md`**: Detalle de las 4 páginas y uso de endpoints
- **`documentacion/LEEME-PRIMERO.txt`**: Resumen rápido del proyecto
