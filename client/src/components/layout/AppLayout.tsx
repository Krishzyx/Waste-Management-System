import React from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Recycle, HeartHandshake, Link as LinkIcon, Home, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NavItem = ({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) => {
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer font-medium group",
          isActive
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-primary/70 group-hover:text-primary")} />
        <span>{children}</span>
      </div>
    </Link>
  );
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isHome = location === "/";

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
              E
            </div>
            <span className="text-2xl font-heading font-bold text-sidebar-foreground tracking-tight">
              EcoTrack
            </span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-2 mt-4">
          Platform
        </div>
        <NavItem href="/admin" icon={LayoutDashboard}>Dashboard</NavItem>
        <NavItem href="/drumyards" icon={Recycle}>Drumyards</NavItem>
        <NavItem href="/ngos" icon={HeartHandshake}>NGO Network</NavItem>
        
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-2 mt-8">
          Operations
        </div>
        <NavItem href="/connections" icon={LinkIcon}>Manage Links</NavItem>
      </nav>

      <div className="p-4 mt-auto border-t border-sidebar-border">
        <div className="bg-sidebar-accent/50 p-4 rounded-xl">
          <p className="text-xs text-muted-foreground font-medium">Logged in as</p>
          <p className="text-sm font-bold text-foreground">Admin User</p>
        </div>
      </div>
    </div>
  );

  if (isHome) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r border-sidebar-border bg-sidebar sticky top-0 h-screen overflow-y-auto">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-md z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">
              E
            </div>
            <span className="text-xl font-heading font-bold">EcoTrack</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-sidebar border-r-sidebar-border">
             <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:p-8 p-4 mt-16 md:mt-0 overflow-x-hidden">
        <div className="max-w-6xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
          {children}
        </div>
      </main>
    </div>
  );
}
