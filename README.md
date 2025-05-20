# BikeRent 🚲

Sistema de gestión de alquiler de bicicletas distribuidas en la ciudad, implementado mediante una arquitectura de microservicios.

## Descripción del Proyecto

BikeRent es una aplicación web que permite la gestión de un servicio de alquiler de bicicletas de todo tipo distribuidas por la ciudad. El sistema está desarrollado con tecnologías modernas y una arquitectura orientada a microservicios.

### Características Principales

- **Gestión de Usuarios**: Sistema completo de registro y autenticación de usuarios mediante Keycloak.
- **Roles y Permisos**: Diferentes niveles de acceso (administradores, usuarios) gestionados por Keycloak.
- **API REST**: Endpoints seguros para todas las operaciones del sistema.
- **Seguridad**: Implementación de OAuth 2.0 y JWT para autenticación y autorización.

### Tecnologías Utilizadas

- **Backend**: Spring Boot 3.4
- **Base de Datos**: PostgreSQL 16.8
- **Autenticación**: Keycloak 26.2
- **Documentación API**: Swagger/OpenAPI 3
- **Contenedores**: Docker y Docker Compose
- **JDK**: Java 21

## Estructura del Proyecto

El proyecto sigue una arquitectura MVC (Modelo-Vista-Controlador) con componentes separados en:

- **Controllers**: Manejo de solicitudes HTTP y respuestas
- **Services**: Lógica de negocio
- **DTO**: Objetos para transferencia de datos
- **Config**: Configuraciones de la aplicación (seguridad, beans, etc.)
- **Util**: Clases utilitarias (Ej. KeycloakProvider)

## Requisitos Previos

Para desplegar este proyecto necesitas:

- Docker y Docker Compose
- Java 21 (para desarrollo local)
- Maven (incluido con wrapper)
  
## Instrucciones de Despliegue

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/BikeRent.git
cd BikeRent
```

### 2. Compilar el Proyecto

Usa el wrapper de Maven incluido para compilar:

```bash
# En Linux/Mac
./mvnw clean package -DskipTests

# En Windows
mvnw.cmd clean package -DskipTests
```

### 3. Crear el Volumen para Keycloak

```bash
docker volume create keycloak_data_springBoot
```

### 4. Construir la Imagen Docker

```bash
docker compose build java_app
```

### 5. Iniciar los Servicios

```bash
docker compose up
```
Se debe tener la base de datos de keycloack

