"use client";

import * as React from "react";
import { ProjectItem } from "@/types/project";
import { generateSlug } from "@/lib/slug";

export type ProjectDialogType = "create" | "rename" | "delete" | null;

export const INITIAL_MOCK_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    name: "E-Commerce Microservices",
    slug: "e-commerce-microservices",
    isOwner: true,
    updatedAt: "Updated 2h ago",
  },
  {
    id: "proj-2",
    name: "Auth & Identity Mesh",
    slug: "auth-identity-mesh",
    isOwner: true,
    updatedAt: "Updated yesterday",
  },
  {
    id: "proj-3",
    name: "Payment Processing Core",
    slug: "payment-processing-core",
    isOwner: true,
    updatedAt: "Updated 3 days ago",
  },
  {
    id: "proj-4",
    name: "Global Edge CDN",
    slug: "global-edge-cdn",
    isOwner: false,
    updatedAt: "Shared Oct 10",
  },
  {
    id: "proj-5",
    name: "Analytics Event Pipeline",
    slug: "analytics-event-pipeline",
    isOwner: false,
    updatedAt: "Shared Sep 28",
  },
];

export interface UseProjectDialogsReturn {
  // Dialog state
  activeDialog: ProjectDialogType;
  selectedProject: ProjectItem | null;
  openCreateDialog: () => void;
  openRenameDialog: (project: ProjectItem) => void;
  openDeleteDialog: (project: ProjectItem) => void;
  closeDialog: () => void;

  // Form state
  createName: string;
  setCreateName: (name: string) => void;
  createSlug: string;
  renameName: string;
  setRenameName: (name: string) => void;

  // Loading state
  isLoading: boolean;

  // Mock projects & actions
  projects: ProjectItem[];
  handleCreateProject: (e?: React.FormEvent) => void;
  handleRenameProject: (e?: React.FormEvent) => void;
  handleDeleteProject: () => void;
}

export function useProjectDialogs(
  initialProjects: ProjectItem[] = INITIAL_MOCK_PROJECTS
): UseProjectDialogsReturn {
  const [projects, setProjects] = React.useState<ProjectItem[]>(initialProjects);
  const [activeDialog, setActiveDialog] = React.useState<ProjectDialogType>(null);
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);

  // Form state
  const [createName, setCreateName] = React.useState("");
  const [renameName, setRenameName] = React.useState("");

  // Loading state
  const [isLoading, setIsLoading] = React.useState(false);

  // Live slug preview derived from createName
  const createSlug = React.useMemo(() => generateSlug(createName), [createName]);

  const openCreateDialog = React.useCallback(() => {
    setActiveDialog("create");
    setSelectedProject(null);
    setCreateName("");
  }, []);

  const openRenameDialog = React.useCallback((project: ProjectItem) => {
    setActiveDialog("rename");
    setSelectedProject(project);
    setRenameName(project.name);
  }, []);

  const openDeleteDialog = React.useCallback((project: ProjectItem) => {
    setActiveDialog("delete");
    setSelectedProject(project);
  }, []);

  const closeDialog = React.useCallback(() => {
    setActiveDialog(null);
    setSelectedProject(null);
    setCreateName("");
    setRenameName("");
    setIsLoading(false);
  }, []);

  const handleCreateProject = React.useCallback(
    (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      const trimmedName = createName.trim();
      if (!trimmedName) {
        return;
      }

      setIsLoading(true);

      const newProject: ProjectItem = {
        id: `proj-${Date.now()}`,
        name: trimmedName,
        slug: generateSlug(trimmedName) || "untitled-project",
        isOwner: true,
        updatedAt: "Just now",
      };

      setProjects((prev) => [newProject, ...prev]);
      setIsLoading(false);
      closeDialog();
    },
    [createName, closeDialog]
  );

  const handleRenameProject = React.useCallback(
    (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      if (!selectedProject) {
        return;
      }

      const trimmedName = renameName.trim();
      if (!trimmedName) {
        return;
      }

      setIsLoading(true);

      setProjects((prev) =>
        prev.map((project) =>
          project.id === selectedProject.id
            ? {
                ...project,
                name: trimmedName,
                slug: generateSlug(trimmedName) || project.slug,
                updatedAt: "Just now",
              }
            : project
        )
      );

      setIsLoading(false);
      closeDialog();
    },
    [renameName, selectedProject, closeDialog]
  );

  const handleDeleteProject = React.useCallback(() => {
    if (!selectedProject) {
      return;
    }

    setIsLoading(true);

    setProjects((prev) => prev.filter((project) => project.id !== selectedProject.id));

    setIsLoading(false);
    closeDialog();
  }, [selectedProject, closeDialog]);

  return {
    activeDialog,
    selectedProject,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,

    createName,
    setCreateName,
    createSlug,
    renameName,
    setRenameName,

    isLoading,

    projects,
    handleCreateProject,
    handleRenameProject,
    handleDeleteProject,
  };
}
