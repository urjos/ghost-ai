"use client";

import * as React from "react";
import { FolderKanban, Plus, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface ProjectSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  onNewProject?: () => void;
  className?: string;
}

export function ProjectSidebar({
  isOpen,
  onClose,
  onNewProject,
  className,
}: ProjectSidebarProps) {
  return (
    <aside
      aria-label="Projects Sidebar"
      aria-hidden={!isOpen}
      className={cn(
        "fixed top-14 left-0 z-40 flex h-[calc(100vh-3.5rem)] w-80 max-w-[calc(100vw-2rem)] flex-col border-r border-surface-border bg-surface text-copy-primary shadow-2xl transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none",
        className
      )}
    >
      {/* Header with Projects title + close button */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-surface-border px-4">
        <h2 className="font-heading text-sm font-semibold tracking-tight text-copy-primary">
          Projects
        </h2>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close projects sidebar"
          className="text-copy-muted hover:bg-subtle hover:text-copy-primary"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Tabs: My Projects & Shared */}
      <Tabs
        defaultValue="my-projects"
        className="flex min-h-0 flex-1 flex-col"
      >
        <div className="shrink-0 px-4 pt-3 pb-2">
          <TabsList className="grid w-full grid-cols-2 bg-subtle">
            <TabsTrigger value="my-projects" className="text-xs">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="text-xs">
              Shared
            </TabsTrigger>
          </TabsList>
        </div>

        {/* My Projects empty placeholder state */}
        <TabsContent
          value="my-projects"
          className="flex-1 min-h-0 overflow-y-auto px-4 py-8"
        >
          <div className="flex h-full flex-col items-center justify-center text-center gap-3">
            <div className="rounded-2xl border border-surface-border/60 bg-subtle/50 p-4">
              <FolderKanban
                className="size-8 text-copy-muted"
                strokeWidth={1.5}
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-copy-primary">
                No projects yet
              </p>
              <p className="text-xs text-copy-muted max-w-[200px]">
                Create a project to start designing architecture systems.
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Shared empty placeholder state */}
        <TabsContent
          value="shared"
          className="flex-1 min-h-0 overflow-y-auto px-4 py-8"
        >
          <div className="flex h-full flex-col items-center justify-center text-center gap-3">
            <div className="rounded-2xl border border-surface-border/60 bg-subtle/50 p-4">
              <Users
                className="size-8 text-copy-muted"
                strokeWidth={1.5}
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-copy-primary">
                No shared projects
              </p>
              <p className="text-xs text-copy-muted max-w-[200px]">
                Projects shared with you by collaborators will appear here.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Full-width New Project button at bottom with Plus icon */}
      <div className="shrink-0 border-t border-surface-border p-4">
        <Button
          onClick={onNewProject}
          className="w-full h-9 font-medium"
        >
          <Plus className="size-4" />
          <span>New Project</span>
        </Button>
      </div>
    </aside>
  );
}
