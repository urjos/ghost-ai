"use client";

import * as React from "react";
import { FolderKanban, Pencil, Plus, Trash2, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ProjectItem } from "@/types/project";

export interface ProjectSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  onNewProject?: () => void;
  projects?: ProjectItem[];
  ownedProjects?: ProjectItem[];
  sharedProjects?: ProjectItem[];
  onRenameProject?: (project: ProjectItem) => void;
  onDeleteProject?: (project: ProjectItem) => void;
  onSelectProject?: (project: ProjectItem) => void;
  selectedProjectId?: string | null;
  className?: string;
}

export function ProjectSidebar({
  isOpen,
  onClose,
  onNewProject,
  projects = [],
  ownedProjects,
  sharedProjects,
  onRenameProject,
  onDeleteProject,
  onSelectProject,
  selectedProjectId,
  className,
}: ProjectSidebarProps) {
  const myProjects = React.useMemo(() => {
    if (ownedProjects) return ownedProjects;
    return projects.filter((project) => project.isOwner);
  }, [ownedProjects, projects]);

  const sharedProjectsList = React.useMemo(() => {
    if (sharedProjects) return sharedProjects;
    return projects.filter((project) => !project.isOwner);
  }, [sharedProjects, projects]);

  return (
    <>
      {/* Backdrop scrim on mobile to close sidebar when tapping outside */}
      {isOpen && (
        <div
          className="fixed inset-0 top-14 z-30 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
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
        <Tabs defaultValue="my-projects" className="flex min-h-0 flex-1 flex-col">
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

          {/* My Projects tab */}
          <TabsContent
            value="my-projects"
            className="flex-1 min-h-0 overflow-y-auto px-2 py-2"
          >
            {myProjects.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center gap-3 px-4 py-8">
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
            ) : (
              <div className="space-y-1">
                {myProjects.map((project) => (
                  <div
                    key={project.id}
                    className={cn(
                      "group relative flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-subtle cursor-pointer",
                      selectedProjectId === project.id
                        ? "bg-subtle text-copy-primary"
                        : "text-copy-secondary"
                    )}
                    onClick={() => onSelectProject?.(project)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <FolderKanban className="size-4 shrink-0 text-copy-muted group-hover:text-copy-primary transition-colors" />
                      <div className="min-w-0 flex-1 text-left">
                        <p className="truncate text-sm font-medium text-copy-primary">
                          {project.name}
                        </p>
                        <p className="truncate font-mono text-xs text-copy-muted">
                          {project.slug}
                        </p>
                      </div>
                    </div>

                    {/* Actions only for owned projects: rename & delete */}
                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRenameProject?.(project);
                        }}
                        aria-label={`Rename ${project.name}`}
                        title="Rename project"
                        className="text-copy-muted hover:bg-surface hover:text-copy-primary"
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteProject?.(project);
                        }}
                        aria-label={`Delete ${project.name}`}
                        title="Delete project"
                        className="text-copy-muted hover:bg-surface hover:text-state-error"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Shared tab */}
          <TabsContent
            value="shared"
            className="flex-1 min-h-0 overflow-y-auto px-2 py-2"
          >
            {sharedProjectsList.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center gap-3 px-4 py-8">
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
            ) : (
              <div className="space-y-1">
                {sharedProjectsList.map((project) => (
                  <div
                    key={project.id}
                    className={cn(
                      "group relative flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-subtle cursor-pointer",
                      selectedProjectId === project.id
                        ? "bg-subtle text-copy-primary"
                        : "text-copy-secondary"
                    )}
                    onClick={() => onSelectProject?.(project)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <Users className="size-4 shrink-0 text-copy-muted group-hover:text-copy-primary transition-colors" />
                      <div className="min-w-0 flex-1 text-left">
                        <p className="truncate text-sm font-medium text-copy-primary">
                          {project.name}
                        </p>
                        <p className="truncate font-mono text-xs text-copy-muted">
                          {project.slug}
                        </p>
                      </div>
                    </div>

                    {/* Actions hidden for shared/collaborator projects */}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Full-width New Project button at bottom with Plus icon */}
        <div className="shrink-0 border-t border-surface-border p-4">
          <Button
            onClick={onNewProject}
            className="w-full h-9 font-medium gap-1.5"
          >
            <Plus className="size-4" />
            <span>New Project</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
