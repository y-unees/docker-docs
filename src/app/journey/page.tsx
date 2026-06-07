import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Container, 
  Cloud, 
  ShieldAlert, 
  Cpu, 
  Lightbulb
} from 'lucide-react';

export default function DevOpsJourneyPage() {
  const roadmapSteps = [
    {
      title: "The Genesis: Project Inception",
      subtitle: "Pre-Requisite Phase",
      icon: <Sparkles className="h-5 w-5 text-blue-400" />,
      badge: "Inception",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      description: "Starting out with an interest in DevOps rather than traditional software development, I needed a solid, real-world project to practice on. By collaborating with AI, I built a modern Next.js documentation site powered by Velite. This gave me the perfect production-ready codebase to begin experimenting with containerization."
    },
    {
        title: "The Deep Dive Into Docker",
        subtitle: "Containerization & Layer Optimization",
        icon: <BookOpen className="h-5 w-5 text-emerald-400" />,
        badge: "Architecture",
        badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        description: (
            <div className="space-y-4">
            <p>
                Instead of relying on basic local node environments, the documentation site was treated as a proper microservice. To keep environments consistent and minimize image size, we implemented a 3-stage multi-stage Docker build. This separated the heavy compilation tools from the final runtime container.
            </p>

            {/* The Code Breakdown Panel */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-mono text-xs text-zinc-300 space-y-4">
                
                {/* Stage 1 */}
                <div>
                <span className="text-emerald-400 font-bold block mb-1">Stage 1: Dependency Layer (deps)</span>
                <code className="text-zinc-500 block mb-1">FROM node:20-alpine AS deps → RUN npm ci</code>
                <p className="text-zinc-400 font-sans pl-2">
                    Rather than a standard package update, we used <code className="bg-zinc-900 px-1 text-zinc-300 rounded">npm ci</code>. This locked in the exact dependency tree from the lockfile, creating a clean, reliable cache layer that sped up subsequent builds.
                </p>
                </div>

                {/* Stage 2 */}
                <div>
                <span className="text-emerald-400 font-bold block mb-1">Stage 2: Compilation (builder)</span>
                <code className="text-zinc-500 block mb-1">FROM node:20-alpine AS builder → RUN npm run build</code>
                <p className="text-zinc-400 font-sans pl-2">
                    This environment takes the dependencies, processes the raw source files, and builds the application. It runs the Velite engine to compile markdown into a highly optimized Next.js production bundle.
                </p>
                </div>

                {/* Stage 3 */}
                <div>
                <span className="text-emerald-400 font-bold block mb-1">Stage 3: Runtime Environment (runner)</span>
                <code className="text-zinc-500 block mb-1">FROM node:20-alpine AS runner → EXPOSE 3000 → CMD ["node", "server.js"]</code>
                <p className="text-zinc-400 font-sans pl-2">
                    The final step strips away all source files and development tools. By extracting only the necessary standalone binaries and static assets, we produced a secure, lightweight Alpine-based container.
                </p>
                </div>

            </div>

            <p className="pt-2">
                To keep the Docker daemon running smoothly, we added a strict <code className="bg-zinc-900 px-1 text-zinc-300 rounded font-mono">.dockerignore</code> file. By excluding local artifacts like <code className="text-red-400 font-mono">node_modules/</code> and <code className="text-red-400 font-mono">.next/</code>, we drastically cut down the build context sent to the engine. This optimization ultimately resulted in a highly efficient output container weighing in at roughly 60MB.
            </p>
            </div>
        )
        },
    {
      title: "Azure Cloud Provisioning",
      subtitle: "Infrastructure Management",
      icon: <Cloud className="h-5 w-5 text-purple-400" />,
      badge: "Deployment",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      description: "Transitioning from local development to the cloud, we provisioned an Ubuntu VM on Azure. From there, we established remote SSH access, configured the Docker engine, and deployed the repository directly to a live server environment."
    }
  ];

  const errors = [
    {
      issue: "Build Context Bloat",
      cause: "Initial Docker builds were copying massive local cache folders directly into the engine, slowing down the pipeline and wasting disk space.",
      solution: "Added a precise `.dockerignore` file tailored to the multi-stage setup, filtering out unnecessary directories before the build process even started."
    },
    {
      issue: "Node.js Version Conflict",
      cause: "Next.js threw compilation errors during the build stage due to outdated dependency constraints in the default `node:18-alpine` image.",
      solution: "Bumped the base image across all build stages to `node:20-alpine`, aligning the container environment with modern framework requirements."
    },
    {
      issue: "Port 3000 Collision",
      cause: "Docker failed to bind to host port 3000 with an `address already in use` error, even though no background processes were actively using it.",
      solution: "Mapped the internal container port to an alternative host port (`-p 3050:3000`), cleanly bypassing the host-level network collision."
    },
    {
      issue: "Connection Timeouts (ERR_CONNECTION_TIMED_OUT)",
      cause: "External web traffic couldn't reach the NGINX proxy because default firewalls on both Ubuntu (`ufw`) and Azure (NSG) were blocking incoming requests.",
      solution: "Opened ports 80 and 443 in the local firewall and updated Azure's inbound security rules to correctly accept traffic from Cloudflare's proxy network."
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] min-h-screen w-full overflow-y-auto bg-zinc-950 text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-500/30">
        <div className="max-w-4xl mx-auto">
        
        {/* Top Header Banner */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full max-w-md mx-auto -top-12"></div>
          <span className="text-xs font-mono tracking-widest text-blue-400 uppercase bg-blue-500/5 border border-blue-500/10 px-3 py-1 rounded-full">
            Technical Log
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-100 bg-clip-text text-transparent mt-4">
            From Blueprint to Cloud
          </h1>
          <p className="mt-4 text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A visual documentation log charting how a simple idea evolved into a deployed containerized application.
          </p>
        </div>

        {/* Section 1: The Evolutionary Roadmap */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-zinc-200 mb-8 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-zinc-500" /> Pipeline Milestones
          </h2>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-[27px] before:bg-zinc-900 before:w-[2px] before:my-4">
            {roadmapSteps.map((step, idx) => (
              <div key={idx} className="relative flex gap-6 items-start group">
                <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl z-10 shrink-0 group-hover:border-zinc-700 transition-colors shadow-lg">
                  {step.icon}
                </div>
                <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-6 w-full group-hover:border-zinc-800/80 transition-all shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-zinc-500">{step.subtitle}</span>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-mono ${step.badgeColor}`}>
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-200 mb-3">{step.title}</h3>
                  <div className="text-zinc-400 text-sm leading-relaxed">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Interactive Troubleshooting Matrix */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-zinc-200 mb-8 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-400" /> Production Diagnostics
          </h2>
          <p className="text-zinc-400 text-sm mb-6 max-w-2xl">
            A summary of the real-world bugs encountered during the deployment phase, highlighting what broke and how we patched it.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {errors.map((err, idx) => (
              <div key={idx} className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-5 hover:border-zinc-800 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-red-400 text-sm font-bold mb-2 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span>
                    {err.issue}
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                    <strong className="text-zinc-300 font-medium">Root Cause:</strong> {err.cause}
                  </p>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-lg p-3 text-xs leading-relaxed">
                  <span className="text-emerald-400 font-bold block mb-0.5 font-mono">✔ Resolution:</span>
                  <span className="text-zinc-400">{err.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: The Present-Future Paradigm (Vercel Migration) */}
        <div className="bg-zinc-900/30 border border-zinc-900 rounded-xl p-6 relative overflow-hidden mb-12 shadow-xl">
          <div className="absolute right-0 bottom-0 opacity-[0.02] transform translate-x-12 translate-y-12">
            <Lightbulb className="h-64 w-64 text-zinc-100" />
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-900 pb-4 mb-4">
            <h2 className="text-xl font-bold text-zinc-200 flex items-center gap-2">
              <Container className="h-5 w-5 text-purple-400" /> Current Infrastructure: Edge Migration
            </h2>
            <span className="text-[10px] bg-purple-500/10 text-purple-400 font-mono border border-purple-500/20 px-2 py-0.5 rounded">
              Status: Active
            </span>
          </div>
          
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Building and self-hosting the Dockerized application on an Azure VM was a massive success that provided invaluable hands-on systems experience. However, as the infrastructure evolved, we recognized a strategic opportunity to optimize our server compute. To free up our Azure environment for heavier backend services, we transitioned the documentation site to an edge-hosted model.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-900">
              <span className="text-zinc-200 font-bold block mb-1">Server Offloading via Vercel</span>
              The Next.js execution layer was smoothly migrated to Vercel's global CDN. This move completely delegates the build processes and traffic hosting to a dedicated edge network, automating our CI/CD pipeline while preserving our original Azure server's resources.
            </div>
            <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-900">
              <span className="text-zinc-200 font-bold block mb-1">Seamless Domain Routing</span>
              Cloudflare remains our dedicated DNS and security proxy. By simply updating our DNS records to route traffic to Vercel instead of the Azure IP, we seamlessly shifted the underlying infrastructure. The custom <code className="text-orange-400 bg-orange-500/5 px-1 py-0.5 rounded font-mono">docker.unishdhungana.com.np</code> domain remained intact with zero client downtime.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}