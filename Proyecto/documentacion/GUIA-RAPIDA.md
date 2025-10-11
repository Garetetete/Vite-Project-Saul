# ⚡ Guía Rápida - Cat Facts App

## 🚀 Inicio Rápido (30 segundos)

```bash
npm install
npm start
```

Abre tu navegador en: http://localhost:4200

## 📦 Deploy a Netlify (2 minutos)

### Opción A: Drag & Drop
```bash
npm run build
```
Arrastra `dist/mi-app/browser` a: https://app.netlify.com/drop

### Opción B: Con Git (Automático)
1. Sube a GitHub
2. Conecta con Netlify
3. Configuración:
   - **Build**: `npm run build`
   - **Publish**: `dist/mi-app/browser`

## 📱 Funcionalidades

### 🌐 **NUEVO: Sistema Bilingüe (Español/Inglés)**
- Botón EN/ES en el navbar para cambiar idioma
- Traduce toda la interfaz automáticamente
- Traduce el contenido de la API en tiempo real
- Persistencia del idioma seleccionado

### 🎲 Hecho Aleatorio (`/`)
- Muestra hechos curiosos sobre gatos
- Botón para generar nuevos hechos
- **Traducción automática a español**

### 📚 Lista de Hechos (`/facts-list`)
- Catálogo completo con paginación
- Control de items por página
- **Todos los hechos traducidos**

### 🐈 Razas de Gatos (`/breeds`)
- Grid de razas con información detallada
- Búsqueda en tiempo real
- Paginación avanzada
- **Información traducida (país, origen, pelaje, patrón)**

## 🔌 API Consumida

- **GET** `/fact` - Hecho aleatorio
- **GET** `/facts?limit=10&page=1` - Lista de hechos
- **GET** `/breeds?limit=12&page=1` - Lista de razas

Base URL: https://catfact.ninja

## 🛠️ Comandos Disponibles

```bash
npm start          # Servidor de desarrollo (puerto 4200)
npm run build      # Build de producción
npm test           # Ejecutar tests
npm run watch      # Build en modo watch
```

## 📂 Estructura

```
Proyecto/
├── src/
│   ├── app/
│   │   ├── models/          # Interfaces TypeScript
│   │   ├── services/        # Servicio de API
│   │   ├── pages/           # Páginas/Componentes
│   │   │   └── cat-facts/   # 3 componentes principales
│   │   └── components/      # Componentes compartidos
│   └── index.html
├── public/
│   └── _redirects          # Config para Netlify
├── netlify.toml            # Config de deployment
└── README.md               # Documentación completa
```

## ✅ Checklist Pre-Entrega

- [x] Consume 3 endpoints de la API
- [x] Diseño moderno y responsive
- [x] Documentación completa
- [x] Configurado para Netlify
- [x] README con toda la info
- [x] Código limpio y comentado

## 🐛 Solución Rápida de Problemas

**Error al compilar:**
```bash
npm install
```

**Puerto 4200 ocupado:**
```bash
npm start -- --port 4201
```

**Limpiar y reinstalar:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Información del Proyecto

- **Framework**: Angular 20
- **UI**: Bootstrap 5 + Bootstrap Icons
- **Lenguaje**: TypeScript 5.9
- **API**: Cat Facts (https://catfact.ninja)
- **Deploy**: Netlify

## 🎯 Cumplimiento de Criterios

| Criterio | ✅ |
|----------|---|
| Estructura organizada | ✅ |
| 3+ servicios API | ✅ |
| Documentación completa | ✅ |
| Temas del curso | ✅ |
| Valor agregado | ✅ |

---

**¿Necesitas más detalles?** Ver `README.md` completo

**¿Problemas con Netlify?** Ver `DEPLOYMENT.md`

---

💡 **Tip**: Para la exposición, ten el proyecto corriendo localmente y muestra:
1. Navegación entre páginas
2. Funcionamiento de cada endpoint
3. Características responsive
4. Código de los servicios
5. Estructura de componentes

**¡Éxito en tu presentación! 🎉**

