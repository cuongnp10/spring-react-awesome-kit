import { Link } from "react-router-dom";
import {
  Package,
  Layers,
  ArrowRight,
  Database,
  ShieldCheck,
  Zap,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { useAuthStore } from "@/features/auth/auth-store";

export function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-xl border bg-gradient-to-r from-card via-card to-muted/40 p-6 md:p-8 shadow-sm">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Zap className="h-3.5 w-3.5" />
            <span>Phase 3 Frontend Ready</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.name || "Developer"}!
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your fullstack workspace is powered by Spring Boot 3.4 (Java 21) on the backend
            and React 18 + Vite + TypeScript + Shadcn UI on the frontend.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Button asChild className="gap-2">
              <Link to="/products">
                <Package className="h-4 w-4" />
                <span>Manage Products</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="http://localhost:8080/swagger-ui/index.html"
                target="_blank"
                rel="noreferrer"
                className="gap-2"
              >
                <span>Backend Swagger UI</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Architecture Highlights */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <span>Backend Tri-Architecture</span>
            </CardTitle>
            <CardDescription>
              Select between Layered, Hexagonal, and Feature-Sliced architectures
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between py-1 border-b">
              <span className="text-muted-foreground">Layered (SBA301)</span>
              <Badge variant="outline">templates/backends/layered</Badge>
            </div>
            <div className="flex items-center justify-between py-1 border-b">
              <span className="text-muted-foreground">Hexagonal (Ports)</span>
              <Badge variant="outline">templates/backends/hexagonal</Badge>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-muted-foreground">Feature-Sliced</span>
              <Badge variant="outline">templates/backends/feature</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-500" />
              <span>Database & Migration</span>
            </CardTitle>
            <CardDescription>
              Automated schema lifecycle management with Flyway
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between py-1 border-b">
              <span className="text-muted-foreground">Database</span>
              <span className="font-medium">PostgreSQL 16</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b">
              <span className="text-muted-foreground">Flyway Migration</span>
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                V1__init_schema.sql
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-muted-foreground">Soft Delete</span>
              <span className="font-mono text-xs">is_deleted column</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Type-Safe CodeGen</span>
            </CardTitle>
            <CardDescription>
              Contract-first synchronization between Spring & React
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between py-1 border-b">
              <span className="text-muted-foreground">OpenAPI Tool</span>
              <span className="font-semibold">Orval + TanStack Query</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b">
              <span className="text-muted-foreground">Generate Command</span>
              <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                npm run api:generate
              </code>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-muted-foreground">Mock Fallback</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                Active & Offline Safe
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Developer Command Cheatsheet */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span>Quick Start Commands</span>
          </CardTitle>
          <CardDescription>
            Convenient scripts to run during local development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-3 rounded-lg border bg-muted/30 font-mono text-xs space-y-1">
              <p className="text-muted-foreground font-sans font-medium text-[11px]">
                Start Frontend Dev Server
              </p>
              <p className="text-foreground font-bold">npm run dev</p>
            </div>
            <div className="p-3 rounded-lg border bg-muted/30 font-mono text-xs space-y-1">
              <p className="text-muted-foreground font-sans font-medium text-[11px]">
                Regenerate API Client from OpenAPI Spec
              </p>
              <p className="text-foreground font-bold">npm run api:generate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
