# Script para construir el proyecto para Netlify
# Proyecto Final - Angular 20

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   BUILD PARA NETLIFY" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si existe node_modules
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
    Write-Host ""
}

Write-Host "🔨 Construyendo proyecto para producción..." -ForegroundColor Yellow
Write-Host ""

# Construir el proyecto
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "✅ BUILD COMPLETADO EXITOSAMENTE" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📂 Archivos listos en: dist/mi-app/browser" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Opciones para desplegar:" -ForegroundColor White
    Write-Host ""
    Write-Host "1️⃣  Netlify Drop (Manual):" -ForegroundColor Yellow
    Write-Host "   • Ve a: https://app.netlify.com/drop" -ForegroundColor Gray
    Write-Host "   • Arrastra la carpeta: dist/mi-app/browser" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2️⃣  Netlify CLI:" -ForegroundColor Yellow
    Write-Host "   • Instala CLI: npm install -g netlify-cli" -ForegroundColor Gray
    Write-Host "   • Despliega: netlify deploy --prod --dir=dist/mi-app/browser" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3️⃣  Git + Netlify (Automático):" -ForegroundColor Yellow
    Write-Host "   • Sube a GitHub" -ForegroundColor Gray
    Write-Host "   • Conecta con Netlify" -ForegroundColor Gray
    Write-Host "   • Configuración automática con netlify.toml" -ForegroundColor Gray
    Write-Host ""
    Write-Host "📖 Más info en: DEPLOYMENT.md" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ ERROR EN EL BUILD" -ForegroundColor Red
    Write-Host ""
    Write-Host "Posibles soluciones:" -ForegroundColor Yellow
    Write-Host "1. Reinstala dependencias: npm install" -ForegroundColor Gray
    Write-Host "2. Verifica la versión de Node.js (requiere v20.19+)" -ForegroundColor Gray
    Write-Host "3. Revisa el log de errores arriba" -ForegroundColor Gray
    Write-Host ""
}

