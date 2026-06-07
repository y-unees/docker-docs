# Vercel Deployment Guide

This document outlines the deployment architecture and hosting configuration for `docker-docs` after migrating from a self-hosted Docker/Azure infrastructure to Vercel.

---

# Architecture Migration

## Previous Infrastructure

The original deployment relied on a self-managed server stack running on Azure.

```text
User
  ↓
Cloudflare
  ↓
Azure VM (Ubuntu)
  ↓
NGINX Reverse Proxy
  ↓
Docker Container
  ↓
Next.js Application
```

### Characteristics

* Azure Virtual Machine hosting
* NGINX reverse proxy management
* Docker image builds and container lifecycle management
* Manual server maintenance and updates
* Consumed VM storage and compute resources

---

## Current Infrastructure

The application is now deployed directly to Vercel's global edge network.

```text
User
  ↓
Cloudflare (Proxied DNS)
  ↓
Vercel Edge Network
  ↓
Next.js Application
```

### Benefits

| Feature                 | Benefit                        |
| ----------------------- | ------------------------------ |
| Edge Deployment         | Lower global latency           |
| Automatic Scaling       | No infrastructure management   |
| Built-in SSL            | Managed by Vercel              |
| Preview Deployments     | Automatic for pull requests    |
| Zero Server Maintenance | No VM administration           |
| Git-Based Deployments   | Continuous deployment workflow |

---

# Local Development

Local development remains unchanged.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Optional Docker Usage

Although production hosting now runs on Vercel, the project's Dockerfile is retained for:

* Local containerized development
* Testing production builds locally
* Alternative self-hosted deployments
* Infrastructure portability

Build locally:

```bash
docker build -t docker-docs .
```

Run locally:

```bash
docker run -d --name local-docs -p 3000:3000 docker-docs
```

---

# Deploying to Vercel

## Step 1 — Import Repository

1. Sign in to Vercel.
2. Select **Add New Project**.
3. Connect your GitHub account.
4. Choose the `docker-docs` repository.
5. Click **Import**.

---

## Step 2 — Configure Project

Vercel automatically detects Next.js projects.

Verify the following settings:

| Setting          | Value         |
| ---------------- | ------------- |
| Framework Preset | Next.js       |
| Root Directory   | ./            |
| Build Command    | npm run build |
| Install Command  | npm install   |
| Output Directory | Auto Detected |

No custom configuration is required.

---

## Step 3 — Deploy

Click:

```text
Deploy
```

Vercel will automatically:

1. Install dependencies.
2. Execute `npm run build`.
3. Run the Velite content compilation process.
4. Generate the optimized production build.
5. Deploy globally to the Vercel Edge Network.

---

# Velite Build Integration

No additional Vercel configuration is required for Velite.

During deployment, Vercel executes:

```bash
npm run build
```

which automatically triggers:

```text
Velite Content Processing
        ↓
Content Generation
        ↓
Next.js Production Build
        ↓
Vercel Deployment
```

As long as Velite is already integrated into the build pipeline, content generation happens automatically on every deployment.

---

# Cloudflare Custom Domain Configuration

The project uses Cloudflare as the authoritative DNS provider while Vercel serves application traffic.

## Step 1 — Add Domain in Vercel

Navigate to:

```text
Project Settings
  → Domains
```

Add:

```text
docker.unishdhungana.com.np
```

Vercel will provide DNS verification requirements.

---

## Step 2 — Create Cloudflare DNS Record

Create a new DNS record:

| Type  | Name   | Target               |
| ----- | ------ | -------------------- |
| CNAME | docker | cname.vercel-dns.com |

Ensure the record is:

```text
Proxied (Orange Cloud Enabled)
```

---

## Step 3 — Verify Domain

After DNS propagation:

1. Return to Vercel.
2. Open Domain Settings.
3. Verify the domain status.

Expected result:

```text
Valid Configuration
```

---

# SSL/TLS Configuration

To prevent redirect loops between Cloudflare and Vercel:

Navigate to:

```text
Cloudflare
  → SSL/TLS
```

Set Encryption Mode to either:

```text
Full
```

or

```text
Full (Strict)
```

Recommended:

```text
Full (Strict)
```

This ensures secure end-to-end HTTPS communication between:

```text
Visitor
    ↓
Cloudflare
    ↓
Vercel
```

---

# Deployment Workflow

After initial setup, deployments become fully automated.

```text
git push
    ↓
GitHub
    ↓
Vercel Build Trigger
    ↓
npm run build
    ↓
Velite Content Generation
    ↓
Production Deployment
    ↓
Global Edge Network
```

No SSH access, Docker builds, NGINX configuration, or VM maintenance is required.

---

# Operational Notes

* Cloudflare remains the DNS and proxy provider.
* Vercel handles application hosting and global delivery.
* The Dockerfile remains available for local development and optional self-hosting.
* Every push to the configured branch automatically creates a new deployment.
* Pull requests can generate preview deployments for testing and review.
