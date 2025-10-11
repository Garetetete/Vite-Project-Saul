# 🚀 Guía de Despliegue en Netlify

## Opción 1: Despliegue Manual (Drag & Drop)

### Pasos:

1. **Construir el proyecto**
   ```bash
   cd Proyecto
   npm install
   npm run build
   ```

2. **Ubicar la carpeta de salida**
   - Después del build, la carpeta estará en: `Proyecto/dist/mi-app/browser`

3. **Subir a Netlify**
   - Ve a https://app.netlify.com/
   - Inicia sesión o crea una cuenta
   - Haz clic en "Add new site" → "Deploy manually"
   - Arrastra la carpeta `dist/mi-app/browser` al área de drop
   - ¡Listo! Netlify te dará una URL pública

## Opción 2: Despliegue con Git (Recomendado)

### Pasos:

1. **Subir el proyecto a GitHub**
   ```bash
   cd Proyecto
   git init
   git add .
   git commit -m "Initial commit - Cat Facts App"
   git branch -M main
   git remote add origin <URL_DE_TU_REPOSITORIO>
   git push -u origin main
   ```

2. **Conectar con Netlify**
   - Ve a https://app.netlify.com/
   - Haz clic en "Add new site" → "Import an existing project"
   - Selecciona "GitHub" y autoriza la conexión
   - Busca y selecciona tu repositorio

3. **Configurar el Build**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/mi-app/browser`
   - **Base directory**: dejar vacío o poner `Proyecto` si subes todo el repositorio

4. **Deploy**
   - Haz clic en "Deploy site"
   - Netlify detectará automáticamente el archivo `netlify.toml` con toda la configuración
   - Cada vez que hagas push a main, se desplegará automáticamente

## Opción 3: Netlify CLI

### Instalación:
```bash
npm install -g netlify-cli
```

### Despliegue:
```bash
cd Proyecto
npm run build
netlify deploy --prod --dir=dist/mi-app/browser
```

## 📋 Checklist Pre-Despliegue

- ✅ El proyecto compila sin errores: `npm run build`
- ✅ El archivo `netlify.toml` está en la carpeta `Proyecto`
- ✅ El archivo `_redirects` está en `Proyecto/public`
- ✅ Todas las dependencias están en `package.json`
- ✅ La ruta base está configurada en `index.html` como `<base href="/">`

## 🔧 Configuración Automática

El proyecto ya incluye:
- ✅ `netlify.toml` con toda la configuración necesaria
- ✅ `public/_redirects` para el manejo de rutas SPA
- ✅ Headers de seguridad configurados
- ✅ Configuración de caché para assets

## 🌐 Verificar el Despliegue

Una vez desplegado, verifica:
1. La página principal carga correctamente
2. La navegación entre páginas funciona (/, /facts-list, /breeds)
3. Los hechos y razas se cargan desde la API
4. El diseño responsive funciona en móvil y desktop

## 🐛 Solución de Problemas

### Error 404 en rutas
- Verifica que el archivo `_redirects` esté en la carpeta correcta
- Asegúrate de que el `netlify.toml` tenga la configuración de redirects

### Error en el Build
- Ejecuta `npm install` para asegurar que todas las dependencias estén instaladas
- Verifica que la versión de Node.js sea compatible (v20+)

### API no responde
- La API de Cat Facts no requiere autenticación
- Verifica tu conexión a internet
- Prueba la API directamente: https://catfact.ninja/fact

## 📞 Soporte

Si tienes problemas con el despliegue:
- Revisa los logs de build en Netlify
- Consulta la documentación: https://docs.netlify.com/
- Verifica el README.md del proyecto

---

**¡Éxito con tu despliegue! 🎉**

