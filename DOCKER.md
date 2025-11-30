# 🐳 Guía de Docker - SpotFinder

Esta guía te ayudará a ejecutar el proyecto SpotFinder completo usando Docker.

## 📋 Requisitos Previos

- **Docker Desktop** versión 20.10 o superior
- **Docker Compose** versión 1.29 o superior
- Al menos **4GB de RAM** disponible para Docker
- Puertos disponibles: **8080** (frontend/gateway)

Para verificar tu instalación:
```bash
docker --version
docker-compose --version
```

## 🏗️ Arquitectura del Proyecto

El proyecto SpotFinder está compuesto por 4 servicios en contenedores:

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (Nginx)                  │
│         React App + API Gateway Reverso             │
│                   Puerto: 8080                      │
└──────────────┬───────────────────┬──────────────────┘
               │                   │
       ┌───────▼───────┐    ┌──────▼───────┐
       │ Users Service │    │Spots Service │
       │ Spring Boot   │    │ Spring Boot  │
       │   Puerto 8080 │    │  Puerto 8080 │
       └───────┬───────┘    └──────┬───────┘
               │                   │
               └────────┬──────────┘
                        │
                 ┌──────▼──────┐
                 │MySQL Server │
                 │  Puerto 3306 │
                 └─────────────┘
```

### Servicios:

1. **mysqldb**: Base de datos MySQL 8.0 compartida
   - Crea automáticamente 2 bases de datos: `db_usuarios_vm` y `db_spots_vm`
   - Datos persistentes en volumen `mysql_data`

2. **users-service**: Microservicio de gestión de usuarios
   - Spring Boot backend
   - Se conecta a `db_usuarios_vm`

3. **spots-service**: Microservicio de gestión de spots
   - Spring Boot backend
   - Se conecta a `db_spots_vm`
   - Gestiona uploads de imágenes (persistidas en `./uploads_data`)

4. **frontend**: Aplicación React + Nginx
   - Sirve la interfaz de usuario
   - Actúa como API Gateway (proxy reverso) hacia los backends
   - Expone todo en el puerto 8080

## 🚀 Comandos Principales

### Iniciar todos los servicios

```bash
# Construir y levantar todos los servicios
docker-compose up --build

# En modo detached (segundo plano)
docker-compose up -d --build
```

**Nota**: El primer build puede tardar varios minutos. Los siguientes serán más rápidos.

### Detener los servicios

```bash
# Detener contenedores (mantiene los datos)
docker-compose stop

# Detener y eliminar contenedores (mantiene volúmenes)
docker-compose down

# Eliminar TODO incluyendo volúmenes (⚠️ borra la base de datos)
docker-compose down -v
```

### Ver estado de los servicios

```bash
# Ver servicios activos
docker-compose ps

# Ver logs de todos los servicios
docker-compose logs

# Seguir logs en tiempo real
docker-compose logs -f

# Logs de un servicio específico
docker-compose logs -f frontend
docker-compose logs -f users-service
docker-compose logs -f spots-service
docker-compose logs -f mysqldb
```

### Reconstruir servicios

```bash
# Reconstruir un servicio específico
docker-compose build frontend
docker-compose build users-service
docker-compose build spots-service

# Reconstruir sin usar caché (útil para resolver problemas)
docker-compose build --no-cache
```

### Reiniciar servicios individuales

```bash
# Reiniciar un servicio específico
docker-compose restart frontend
docker-compose restart users-service
docker-compose restart spots-service
docker-compose restart mysqldb
```

## 🌐 URLs de Acceso

Una vez iniciados los servicios, puedes acceder a:

- **Aplicación Web**: http://localhost:8080
- **API Usuarios** (vía Gateway): http://localhost:8080/api/v1/usuarios
- **API Spots** (vía Gateway): http://localhost:8080/api/v1/spots
- **Uploads de Imágenes** (vía Gateway): http://localhost:8080/uploads

## 🔧 Troubleshooting

### Los servicios no inician correctamente

1. Verifica que no haya otros servicios usando el puerto 8080:
   ```bash
   # Windows
   netstat -ano | findstr :8080
   
   # Si está ocupado, detén el proceso o cambia el puerto en docker-compose.yml
   ```

2. Verifica los logs para errores:
   ```bash
   docker-compose logs
   ```

3. Asegúrate de que Docker Desktop esté ejecutándose

### Error de conexión a la base de datos

Los backends pueden fallar si intentan conectarse antes de que MySQL esté listo. Esto es normal en el primer inicio. Soluciones:

1. **Espera 30-60 segundos** y vuelve a verificar:
   ```bash
   docker-compose ps
   ```

2. Si un servicio está en estado "Exit", reinícialo:
   ```bash
   docker-compose restart users-service
   docker-compose restart spots-service
   ```

3. Verifica que MySQL esté healthy:
   ```bash
   docker-compose logs mysqldb | grep "ready for connections"
   ```

### Limpiar y empezar de cero

Si tienes problemas persistentes:

```bash
# Detener todo
docker-compose down -v

# Limpiar imágenes huérfanas
docker system prune

# Reconstruir desde cero
docker-compose up --build
```

### El frontend no carga o muestra errores 502

1. Verifica que los backends estén corriendo:
   ```bash
   docker-compose ps
   ```

2. Revisa los logs del frontend:
   ```bash
   docker-compose logs frontend
   ```

3. Prueba acceder directamente a los backends (internamente):
   ```bash
   # Entrar al contenedor del frontend
   docker exec -it spotfinder-frontend sh
   
   # Desde dentro, probar conectividad
   wget http://users-service:8080
   wget http://spots-service:8080
   ```

### Cambios en el código no se reflejan

Después de hacer cambios en el código fuente, necesitas reconstruir:

```bash
# Detener
docker-compose down

# Reconstruir y reiniciar
docker-compose up --build
```

### Ver todos los contenedores e imágenes

```bash
# Ver todos los contenedores (activos e inactivos)
docker ps -a

# Ver todas las imágenes
docker images

# Limpiar contenedores detenidos
docker container prune

# Limpiar imágenes sin usar
docker image prune
```

## 🗄️ Gestión de Base de Datos

### Acceder a MySQL desde línea de comandos

```bash
# Ejecutar bash en el contenedor de MySQL
docker exec -it spotfinder-mysql bash

# Dentro del contenedor, conectarse a MySQL
mysql -u root -p
# Contraseña: root

# Ver bases de datos
SHOW DATABASES;

# Usar una base de datos
USE db_usuarios_vm;
USE db_spots_vm;
```

### Backup de la base de datos

```bash
# Backup de db_usuarios_vm
docker exec spotfinder-mysql mysqldump -u root -proot db_usuarios_vm > backup_usuarios.sql

# Backup de db_spots_vm
docker exec spotfinder-mysql mysqldump -u root -proot db_spots_vm > backup_spots.sql

# Backup de ambas
docker exec spotfinder-mysql mysqldump -u root -proot --databases db_usuarios_vm db_spots_vm > backup_completo.sql
```

### Restaurar desde backup

```bash
# Restaurar backup
docker exec -i spotfinder-mysql mysql -u root -proot < backup_completo.sql
```

## 📦 Volúmenes y Persistencia

El proyecto usa persistencia en dos lugares:

1. **mysql_data**: Volumen de Docker para datos de MySQL
   ```bash
   # Ver volúmenes
   docker volume ls
   
   # Inspeccionar volumen
   docker volume inspect proyectofullstack_mysql_data
   ```

2. **./uploads_data**: Carpeta local para imágenes de spots
   - Los archivos se guardan directamente en tu sistema de archivos
   - Ubicación: `ProyectoFullStack/uploads_data`

## 🔐 Variables de Entorno

Las credenciales actuales son para desarrollo. Para producción, deberías:

1. Cambiar las contraseñas en `docker-compose.yml`
2. Nunca commitear la API Key de Google Maps al repositorio
3. Usar archivos `.env` para secrets

## 📝 Notas Importantes

- **Primer inicio**: Puede tardar 5-10 minutos en construir todas las imágenes
- **Uso de RAM**: El conjunto completo usa ~2-3GB de RAM
- **Persistencia**: Los datos de MySQL persisten entre reinicios, las imágenes también
- **Network interno**: Los servicios se comunican internamente vía red `spotfinder-net`
- **Desarrollo**: Para desarrollo rápido, considera usar volumes para hot-reload

## 🆘 Soporte

Si tienes problemas:

1. Revisa los logs: `docker-compose logs`
2. Verifica el estado: `docker-compose ps`
3. Reinicia el servicio problemático: `docker-compose restart <servicio>`
4. Como último recurso: `docker-compose down -v && docker-compose up --build`

---

**¡Listo!** Tu aplicación SpotFinder debería estar corriendo en http://localhost:8080 🎉
