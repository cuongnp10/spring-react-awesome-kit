import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  Settings,
  FileCode2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-card flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-base shadow-sm">
          AK
        </div>
        <div>
          <span className="font-semibold text-sm tracking-tight block">
            Awesome Kit
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
            Spring + React
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 px-3 space-y-1">
        <p className="px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">
          Management
        </p>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </NavLink>
        ))}

        <div className="pt-6">
          <p className="px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">
            Developer Resources
          </p>
          <a
            href="http://localhost:8080/swagger-ui/index.html"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileCode2 className="h-4 w-4" />
              <span>Swagger UI</span>
            </div>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
          <a
            href="http://localhost:8080/v3/api-docs"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <div className="flex items-center gap-3">
              <Layers className="h-4 w-4" />
              <span>OpenAPI JSON</span>
            </div>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t text-xs text-muted-foreground space-y-1">
        <div className="flex items-center justify-between">
          <span>Backend Architecture</span>
          <span className="font-mono text-[10px] bg-secondary px-1.5 py-0.5 rounded text-foreground font-semibold">
            Tri-Arch Ready
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Environment</span>
          <span className="text-emerald-500 font-medium">Active</span>
        </div>
      </div>
    </aside>
  );
}
