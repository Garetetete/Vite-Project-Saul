# Script de inicio rápido para Cat Facts App
# Proyecto Final - Angular 20

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   CAT FACTS APP - Proyecto Final" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si existe node_modules
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "✅ Dependencias ya instaladas" -ForegroundColor Green
    Write-Host ""
}

Write-Host "🚀 Iniciando servidor de desarrollo..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📱 La aplicación se abrirá en: http://localhost:4200" -ForegroundColor Cyan
Write-Host ""
Write-Host "Funcionalidades disponibles:" -ForegroundColor White
Write-Host "  • Hecho Aleatorio: /" -ForegroundColor Gray
Write-Host "  • Lista de Hechos: /facts-list" -ForegroundColor Gray
Write-Host "  • Razas de Gatos: /breeds" -ForegroundColor Gray
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Iniciar el servidor
npm start

