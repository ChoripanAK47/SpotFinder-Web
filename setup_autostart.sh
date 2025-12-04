#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Configuración de Auto-Inicio para SpotFinder ===${NC}"

# 1. Obtener directorio actual
PROJECT_DIR=$(pwd)
echo -e "Directorio del proyecto detectado: ${GREEN}$PROJECT_DIR${NC}"
read -p "¿Es este el directorio correcto donde está tu docker-compose.yml? (s/n): " confirm

if [[ $confirm != "s" && $confirm != "S" ]]; then
    echo "Por favor, navega al directorio de tu proyecto y vuelve a ejecutar este script."
    exit 1
fi

SERVICE_NAME="spotfinder"
SERVICE_FILE="/etc/systemd/system/$SERVICE_NAME.service"

echo -e "\n${BLUE}Creando archivo de servicio en $SERVICE_FILE...${NC}"

# 2. Crear archivo de servicio systemd
# Usamos 'sudo' dentro del bloque bash -c para redirigir la escritura
sudo bash -c "cat > $SERVICE_FILE" <<EOF
[Unit]
Description=SpotFinder Docker Compose Application
Requires=docker.service
After=docker.service network.target

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$PROJECT_DIR
# Ejecutamos docker compose up -d --build al iniciar
# Usamos la ruta completa a docker (generalmente /usr/bin/docker)
ExecStart=/usr/bin/docker compose up -d --build
# Bajamos los contenedores al detener el servicio
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

echo -e "${GREEN}Archivo de servicio creado exitosamente.${NC}"

# 3. Recargar daemon de systemd
echo -e "\n${BLUE}Recargando systemd...${NC}"
sudo systemctl daemon-reload

# 4. Habilitar servicio
echo -e "${BLUE}Habilitando servicio para inicio automático...${NC}"
sudo systemctl enable $SERVICE_NAME

# 5. Iniciar servicio ahora (opcional)
read -p "¿Quieres iniciar el servicio ahora para probar? (s/n): " start_now
if [[ $start_now == "s" || $start_now == "S" ]]; then
    echo -e "${BLUE}Iniciando servicio... (esto puede tardar mientras construye los dockers)${NC}"
    sudo systemctl start $SERVICE_NAME
    echo -e "${GREEN}Servicio iniciado.${NC}"
else
    echo "Puedes iniciarlo manualmente luego con: sudo systemctl start $SERVICE_NAME"
fi

echo -e "\n${GREEN}=== Configuración Completada ===${NC}"
echo "Tu aplicación ahora se iniciará automáticamente cuando arranque el servidor."
echo "Comandos útiles:"
echo "  - Ver estado: sudo systemctl status $SERVICE_NAME"
echo "  - Ver logs:   docker compose logs -f"
echo "  - Reiniciar:  sudo systemctl restart $SERVICE_NAME"
