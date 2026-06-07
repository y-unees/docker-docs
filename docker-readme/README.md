# docker-docs

### Production-Ready Docker Documentation Platform

A modern documentation platform built with **Next.js** and **Velite**, designed for fast content delivery, simple maintenance, and containerized deployment workflows.

The application is packaged as a lightweight Docker image and deployed on an **Azure Virtual Machine (Ubuntu 24.04)** behind **NGINX** and **Cloudflare**, providing secure HTTPS access, efficient reverse proxying, and streamlined infrastructure management.

---

## Project Overview

`docker-docs` is a containerized documentation site focused on delivering static and dynamic documentation content through a highly optimized production environment.

### Key Highlights

* Next.js application with App Router architecture
* Velite-powered content processing and schema generation
* Multi-stage Docker build for minimal production image size
* Cloudflare-managed HTTPS and DNS routing
* NGINX reverse proxy on Azure VM
* Lightweight deployment and infrastructure footprint
* Production-ready container lifecycle management

---

## Technology Stack

| Component            | Technology              |
| -------------------- | ----------------------- |
| Frontend Framework   | Next.js                 |
| Content Engine       | Velite                  |
| Language             | TypeScript              |
| Container Runtime    | Docker                  |
| Reverse Proxy        | NGINX                   |
| Cloud Platform       | Azure VM (Ubuntu 24.04) |
| DNS / SSL            | Cloudflare              |
| Base Container Image | node:20-alpine          |

---

# Local Development & Docker Build

## Build Docker Image

```bash
docker build -t docker-docs .
```

## Run Container Locally

```bash
docker run -d \
  --name local-docs \
  -p 3000:3000 \
  docker-docs
```

## Verify Application

Open:

```text
http://localhost:3000
```

---

# Production Deployment Architecture

The production environment uses Cloudflare as the public entry point, NGINX as a reverse proxy, and Docker for application hosting.

```text
┌─────────────┐
│   Browser   │
│   HTTPS     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Cloudflare  │
│   Proxy     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│ Azure VM (Ubuntu 24.04) │
│                         │
│  NGINX Reverse Proxy    │
│        Port 80          │
└──────────┬──────────────┘
           │
           ▼
┌───────────────────────┐
│ Docker Container      │
│ docker-docs           │
│ Port 3000             │
│ Exposed on 3050 Host  │
└───────────────────────┘
```

### Request Flow

```text
Browser (HTTPS)
      ↓
Cloudflare Proxy
      ↓
Azure VM
      ↓
NGINX Reverse Proxy
      ↓
127.0.0.1:3050
      ↓
Docker Container
      ↓
Next.js Application
```

---

# Dockerfile & Optimization Strategy

The project uses a **three-stage Docker build process** designed to reduce image size, improve caching efficiency, and speed up deployments.

## Build Stages

| Stage   | Purpose                               |
| ------- | ------------------------------------- |
| deps    | Install production dependencies       |
| builder | Compile and build Next.js application |
| runner  | Lightweight production runtime image  |

### Base Image

```dockerfile
node:20-alpine
```

Using Alpine Linux significantly reduces image size while maintaining compatibility with modern Node.js workloads.

### Optimization Benefits

| Optimization              | Impact                                                  |
| ------------------------- | ------------------------------------------------------- |
| Multi-stage builds        | Removes unnecessary build tooling from production image |
| Alpine base image         | Smaller runtime footprint                               |
| Dependency isolation      | Better Docker layer caching                             |
| Production-only artifacts | Reduced attack surface                                  |
| Minimal runtime image     | Faster deployments                                      |

### Final Image Size

```text
~60 MB
```

---

## .dockerignore Optimization

A dedicated `.dockerignore` file is used to prevent unnecessary files from being sent to the Docker daemon during image builds.

### Excluded Directories

```text
node_modules/
.next/
.git/
```

### Result

| Metric                 | Before  | After   |
| ---------------------- | ------- | ------- |
| Build Context Transfer | ~500 MB | < 1 MB  |
| Docker Build Speed     | Slower  | Faster  |
| Network Overhead       | High    | Minimal |

This significantly improves build performance both locally and on remote servers.

---

# Production Deployment Commands

The following commands are used on the Azure production server.

## 1. Clone Repository

```bash
git clone <repository-url>

cd docker-docs
```

---

## 2. Build Production Image

```bash
docker build -t docker-docs .
```

---

## 3. Run Production Container

Port **3050** is used on the host machine to avoid conflicts with other services already bound to port **3000**.

```bash
docker run -d \
  --name my-docs-app \
  -p 3050:3000 \
  --restart always \
  docker-docs
```

### Verify Running Container

```bash
docker ps
```

### View Logs

```bash
docker logs -f my-docs-app
```

### Restart Container

```bash
docker restart my-docs-app
```

---

# NGINX Configuration Example

The following NGINX server block proxies incoming traffic from the public domain to the Docker container running on port **3050**.

```nginx
server {
    listen 80;
    server_name docker.unishdhungana.com.np;

    location / {
        proxy_pass http://127.0.0.1:3050;

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## NGINX Reload

After updating the configuration:

```bash
sudo nginx -t
```

```bash
sudo systemctl reload nginx
```

---

# Infrastructure Summary

| Layer               | Component                   |
| ------------------- | --------------------------- |
| DNS & SSL           | Cloudflare                  |
| Virtual Machine     | Azure Ubuntu 24.04          |
| Reverse Proxy       | NGINX                       |
| Application Runtime | Docker                      |
| Application         | Next.js + Velite            |
| Public Domain       | docker.unishdhungana.com.np |
| Container Port      | 3000                        |
| Host Port           | 3050                        |

---

# Operational Benefits

* Fully containerized deployment workflow
* Simple build and release process
* Lightweight production image (~60MB)
* Cloudflare-managed HTTPS
* NGINX reverse proxy architecture
* Automatic container restart on server reboot
* Reduced Docker build context for faster deployments
* Clean separation between infrastructure and application layers

---

## License

This project is distributed under the license defined within the repository.
