# 🗺️ SpotFinder - Proyecto Full Stack

Aplicación web para descubrir y compartir spots interesantes con sistema de microservicios.

## 📁 Estructura del Proyecto

```
ProyectoFullStack/
├── SpotFinderReact/              # Frontend React
│   └── SpotFinderReact/
│       ├── src/                  # Código fuente React
│       ├── Dockerfile            # Configuración Docker para frontend
│       ├── nginx.conf            # Configuración Nginx (API Gateway)
│       └── .dockerignore         # Archivos excluidos del build
│
├── SpotFinder-Backend-Usuarios/  # Microservicio de Usuarios
│   └── usuarios/
│       ├── src/                  # Código fuente Spring Boot
│       ├── pom.xml               # Dependencias Maven
│       ├── Dockerfile            # Configuración Docker
│       └── .dockerignore         # Archivos excluidos del build
│
├── SpotFinder-Backend-Spots/     # Microservicio de Spots
│   └── spots/
│       ├── src/                  # Código fuente Spring Boot
│       ├── pom.xml               # Dependencias Maven
│       ├── Dockerfile            # Configuración Docker
│       └── .dockerignore         # Archivos excluidos del build
│
├── db-init/                      # Scripts de inicialización DB
│   └── init.sql                  # Crea las bases de datos
│
├── uploads_data/                 # Imágenes subidas (persistente)
├── docker-compose.yml            # Orquestación de servicios
├── docker-helper.ps1             # Script helper de Docker
└── DOCKER.md                     # Documentación completa de Docker
```

## 🚀 Inicio Rápido con Docker

### Requisitos
- Docker Desktop instalado
- 4GB RAM disponible
- Puerto 8080 libre

### Levantar la aplicación

```bash
# Iniciar todos los servicios
docker-compose up --build

# O usar el script helper interactivo
.\docker-helper.ps1
```

### Acceder a la aplicación
- **Web**: http://localhost:8080
- **API Usuarios**: http://localhost:8080/api/v1/usuarios
- **API Spots**: http://localhost:8080/api/v1/spots

## 📚 Documentación

- **[DOCKER.md](./DOCKER.md)**: Guía completa de Docker con todos los comandos y troubleshooting
- **Frontend**: Ver [SpotFinderReact/SpotFinderReact/README.md](./SpotFinderReact/SpotFinderReact/README.md)

## 🏗️ Arquitectura

### Microservicios
- **Frontend (React + Nginx)**: Interfaz de usuario y API Gateway
- **Users Service (Spring Boot)**: Gestión de usuarios y autenticación
- **Spots Service (Spring Boot)**: Gestión de spots y uploads
- **MySQL**: Base de datos compartida con 2 esquemas separados

### Comunicación
- El frontend actúa como **API Gateway** usando Nginx como proxy reverso
- Los backends se comunican internamente vía red Docker `spotfinder-net`
- Toda la comunicación externa se hace a través del puerto 8080

## 🛠️ Desarrollo

### Sin Docker (desarrollo local)

Cada servicio puede ejecutarse independientemente para desarrollo:

**Frontend:**
```bash
cd SpotFinderReact/SpotFinderReact
npm install
npm run dev
```

**Backend Usuarios:**
```bash
cd SpotFinder-Backend-Usuarios/usuarios
./mvnw spring-boot:run
```

**Backend Spots:**
```bash
cd SpotFinder-Backend-Spots/spots
./mvnw spring-boot:run
```

### Con Docker (recomendado)

Simplemente usa:
```bash
docker-compose up --build
```

## 🔧 Comandos Útiles

Ver [DOCKER.md](./DOCKER.md) para la lista completa de comandos y troubleshooting.

```bash
# Ver estado
docker-compose ps

# Ver logs
docker-compose logs -f

# Reiniciar un servicio
docker-compose restart frontend

# Detener todo
docker-compose down

# Limpiar y empezar de cero
docker-compose down -v
docker-compose up --build
```

## 📝 Tecnologías

- **Frontend**: React + Vite, Google Maps API
- **Backend**: Spring Boot + Java 17
- **Base de Datos**: MySQL 8.0
- **Containerización**: Docker + Docker Compose
- **API Gateway**: Nginx

## 🤝 Contribuir

1. Haz cambios en el código
2. Reconstruye con `docker-compose up --build`
3. Verifica que todo funcione
4. Commit y push

## 📄 Licencia

Este proyecto es privado y con fines educativos.

---

**¿Problemas?** Consulta [DOCKER.md](./DOCKER.md) para troubleshooting detallado.
