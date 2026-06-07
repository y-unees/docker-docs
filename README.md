# DevDocs

### Ultra-Fast Documentation Engine for Docker & Container Workflows

A modern, static-first documentation platform engineered for speed, maintainability, and exceptional developer experience. Built with **Next.js 16 App Router**, **Velite**, and **Tailwind CSS v4**, DevDocs delivers a highly optimized documentation experience focused on Docker, containers, and command-line workflows.

The platform compiles structured Markdown content into a fully static production artifact, providing excellent performance, simplified deployment, and predictable scalability.

**Repository:** https://github.com/y-unees/docker-docs

---

## Core Features

* **Next.js 16 App Router Architecture**

  * Leverages modern React Server Components and App Router conventions.
  * Optimized routing, layouts, and rendering performance.
  * Turbopack-powered development environment for near-instant feedback loops.

* **Velite Content Processing**

  * Schema-driven Markdown and MDX compilation.
  * Strongly typed content generation.
  * Build-time content validation for improved reliability.

* **Automatic Slug Generation**

  * Generates clean, consistent documentation routes.
  * Windows-compatible path handling.
  * Eliminates manual URL management across content pages.

* **Static Production Output**

  * Entire documentation site is generated during build.
  * Fast page delivery with minimal runtime overhead.
  * Simple deployment to any static hosting platform.

* **Modern Documentation Experience**

  * Clean glassmorphic dark interface.
  * Responsive layout optimized for desktop and mobile devices.
  * Typography-focused reading experience for technical content.

* **Documentation-Focused Architecture**

  * Dedicated content pipeline for Docker and container-based workflows.
  * Structured navigation and content organization.
  * Scalable foundation for future documentation expansion.

---

## Tech Stack

| Technology      | Purpose                                                |
| --------------- | ------------------------------------------------------ |
| Next.js 16      | Application framework, routing, static generation      |
| Velite          | Markdown/MDX content compilation and schema validation |
| Tailwind CSS v4 | Utility-first styling and design system                |
| TypeScript      | Type safety and developer tooling                      |
| Lucide React    | Consistent SVG icon system                             |

---

## Project Structure Architecture

```text
docker-docs/
│
├── content/
│   └── docs/
│       ├── getting-started.mdx
│       ├── docker-installation.mdx
│       ├── docker-concept.mdx
|       ├── publishing-images-to-docker-hub.mdx
│       └── ...
│
├── src/
│   ├── app/
│   │   ├── docs/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
|   |   └── globals.css
│   │
│   ├── lib/
│   │   ├── content/
│   │   ├── navigation/
│   │   └── utilities/
│   │
│   └── styles/
│       
│
├── public/
│
├── velite.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Architecture Overview

* **`content/docs/`**

  * Source of truth for all documentation content.
  * Contains Markdown and MDX documents processed by Velite.

* **`src/app/`**

  * Next.js App Router entry points.
  * Handles layouts, routes, and page rendering.

* **`src/components/`**

  * Shared UI primitives and documentation-specific components.

* **`src/lib/`**

  * Utility functions, content helpers, navigation generation, and supporting logic.

* **`velite.config.ts`**

  * Content schema definitions and compilation configuration.

---

## Local Setup

### Prerequisites

* Node.js 20+
* npm

### Clone Repository

```bash
git clone https://github.com/y-unees/docker-docs.git

cd docker-docs
```

### Install Dependencies

```bash
npm install
```

---

## Development

The development environment runs **Next.js 16** and **Velite** concurrently, ensuring content updates and application updates remain synchronized during development.

```bash
npm run dev
```

This command:

* Starts the Next.js development server using Turbopack.
* Watches documentation content changes.
* Rebuilds Velite-generated content automatically.
* Provides instant feedback during authoring and development.

---

## Production Build

Generate the fully optimized static production artifact:

```bash
npm run build
```

The build process:

1. Compiles all Markdown and MDX content through Velite.
2. Validates content schemas.
3. Generates application routes.
4. Produces optimized static assets.
5. Outputs a deployment-ready documentation site.

---

## Documentation Content

The platform currently contains **18 complete documentation pages** covering:

* Docker fundamentals
* Container lifecycle management
* Image workflows
* Volume management
* Networking concepts
* CLI operations
* Build and deployment workflows
* Container best practices

All content is statically generated and optimized for fast navigation and searchability.

---

## Design Philosophy

This project is built around a simple principle:

> Documentation should feel as fast and polished as the software it describes.

By combining Next.js 16, Velite, and Tailwind CSS v4, the platform provides a streamlined authoring experience while delivering a lightweight, production-ready documentation site with minimal operational complexity.

---

## Build Characteristics

| Attribute           | Value                 |
| ------------------- | --------------------- |
| Rendering Strategy  | Static Generation     |
| Framework           | Next.js 16 App Router |
| Development Bundler | Turbopack             |
| Content Engine      | Velite                |
| Styling System      | Tailwind CSS v4       |
| Language            | TypeScript            |
| Deployment Target   | Static Hosting        |
| Documentation Pages | 18                    |

---

## License

This project is available under the license defined within the repository.
