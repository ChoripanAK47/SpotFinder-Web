# SpotFinder Docker Helper Scripts
# Usa estos comandos para gestionar tu aplicación Docker

Write-Host "🐳 SpotFinder Docker Helper" -ForegroundColor Cyan
Write-Host ""

function Show-Menu {
    Write-Host "Opciones disponibles:" -ForegroundColor Yellow
    Write-Host "  1. Iniciar todos los servicios (build + up)"
    Write-Host "  2. Iniciar en segundo plano (detached)"
    Write-Host "  3. Detener servicios"
    Write-Host "  4. Ver estado de servicios"
    Write-Host "  5. Ver logs"
    Write-Host "  6. Reiniciar servicios"
    Write-Host "  7. Limpiar todo (⚠️ elimina volúmenes)"
    Write-Host "  8. Reconstruir sin caché"
    Write-Host "  9. Abrir la aplicación en navegador"
    Write-Host "  0. Salir"
    Write-Host ""
}

function Start-Services {
    Write-Host "🚀 Iniciando servicios..." -ForegroundColor Green
    docker-compose up --build
}

function Start-ServicesDetached {
    Write-Host "🚀 Iniciando servicios en segundo plano..." -ForegroundColor Green
    docker-compose up -d --build
    Write-Host "✅ Servicios iniciados. Accede a http://localhost:8080" -ForegroundColor Green
}

function Stop-Services {
    Write-Host "⏹️ Deteniendo servicios..." -ForegroundColor Yellow
    docker-compose stop
    Write-Host "✅ Servicios detenidos" -ForegroundColor Green
}

function Show-Status {
    Write-Host "📊 Estado de los servicios:" -ForegroundColor Cyan
    docker-compose ps
}

function Show-Logs {
    Write-Host "📜 Logs de los servicios (Ctrl+C para salir):" -ForegroundColor Cyan
    docker-compose logs -f
}

function Restart-Services {
    Write-Host "🔄 Reiniciando servicios..." -ForegroundColor Yellow
    docker-compose restart
    Write-Host "✅ Servicios reiniciados" -ForegroundColor Green
}

function Clean-All {
    Write-Host "⚠️ ADVERTENCIA: Esto eliminará todos los contenedores y volúmenes" -ForegroundColor Red
    $confirm = Read-Host "¿Estás seguro? (s/N)"
    if ($confirm -eq "s" -or $confirm -eq "S") {
        Write-Host "🧹 Limpiando todo..." -ForegroundColor Yellow
        docker-compose down -v
        docker system prune -f
        Write-Host "✅ Limpieza completada" -ForegroundColor Green
    } else {
        Write-Host "❌ Operación cancelada" -ForegroundColor Yellow
    }
}

function Rebuild-NoCache {
    Write-Host "🔨 Reconstruyendo sin caché..." -ForegroundColor Yellow
    docker-compose build --no-cache
    Write-Host "✅ Reconstrucción completada" -ForegroundColor Green
}

function Open-App {
    Write-Host "🌐 Abriendo aplicación en navegador..." -ForegroundColor Cyan
    Start-Process "http://localhost:8080"
}

# Main loop
while ($true) {
    Show-Menu
    $choice = Read-Host "Selecciona una opción"
    
    switch ($choice) {
        "1" { Start-Services }
        "2" { Start-ServicesDetached }
        "3" { Stop-Services }
        "4" { Show-Status }
        "5" { Show-Logs }
        "6" { Restart-Services }
        "7" { Clean-All }
        "8" { Rebuild-NoCache }
        "9" { Open-App }
        "0" { 
            Write-Host "👋 ¡Hasta luego!" -ForegroundColor Cyan
            exit 
        }
        default { 
            Write-Host "❌ Opción no válida" -ForegroundColor Red 
        }
    }
    
    Write-Host ""
    Write-Host "Presiona Enter para continuar..." -ForegroundColor Gray
    Read-Host
    Clear-Host
}
