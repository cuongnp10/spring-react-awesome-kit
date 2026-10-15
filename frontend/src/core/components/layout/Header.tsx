import { Bell, LogOut, User as UserIcon } from "lucide-react";
import { ThemeToggle } from "@/core/theme/theme-toggle";
import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/core/components/ui/avatar";
import { useAuthStore } from "@/features/auth/auth-store";
import { Badge } from "@/core/components/ui/badge";

export function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="h-16 border-b bg-card/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Status info */}
      <div className="flex items-center gap-3">
        <h2 className="text-base font-semibold">Console</h2>
        <Badge variant="outline" className="hidden sm:inline-flex text-xs gap-1.5 py-0.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Spring Boot Ready
        </Badge>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9 border">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || "Developer"}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || "admin@awesomekit.dev"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
