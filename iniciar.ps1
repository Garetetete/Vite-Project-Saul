Write-Host "Instalando dependencias..." -ForegroundColor Cyan
npm install

Write-Host "`nIniciando servidor Angular..." -ForegroundColor Green
npx ng serve --open

Write-Host "`nServidor corriendo en http://localhost:4200" -ForegroundColor Yellow
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow



