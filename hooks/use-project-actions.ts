"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ProjectItem } from "@/types/project";
import { generateSlug } from "@/lib/slug";

export type ProjectDialogType = "create" | "rename" | "delete" | null;

export interface UseProjectActionsOptions {
  activeWorkspaceId?: string | null;
}

export interface UseProjectActionsReturn {
  // Dialog state
  activeDialog: ProjectDialogType;
  selectedProject: ProjectItem | null;
  openCreateDialog: () => void;
  openRenameDialog: (project: ProjectItem) => void;
  openDeleteDialog: (project: ProjectItem) => void;
  closeDialog: () => void;

  // Create form state
  projectName: string;
  setProjectName: (name: string) => void;
  createName: string;
  setCreateName: (name: string) => void;
  roomId: string;
  projectSlug: string;

  // Rename form state
  renameName: string;
  setRenameName: (name: string) => void;

  // Loading & error state
  isLoading: boolean;
  error: string | null;

  // Actions
  handleCreateProject: (e?: React.FormEvent) => Promise<void>;
  handleRenameProject: (e?: React.FormEvent) => Promise<void>;
  handleDeleteProject: () => Promise<void>;
}

function generateShortSuffix(length = 4): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function useProjectActions(
  options: UseProjectActionsOptions = {}
): UseProjectActionsReturn {
  const { activeWorkspaceId } = options;
  const router = useRouter();
  const pathname = usePathname();

  const [activeDialog, setActiveDialog] = React.useState<ProjectDialogType>(null);
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);

  // Form states
  const [projectName, setProjectName] = React.useState("");
  const [suffix, setSuffix] = React.useState(() => generateShortSuffix());
  const [renameName, setRenameName] = React.useState("");

  // Loading & error states
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Live slug and room ID preview derived from project name + suffix
  const roomId = React.useMemo(() => {
    const slug = generateSlug(projectName) || "untitled-project";
    return `${slug}-${suffix}`;
  }, [projectName, suffix]);

  const openCreateDialog = React.useCallback(() => {
    setSuffix(generateShortSuffix());
    setProjectName("");
    setSelectedProject(null);
    setError(null);
    setActiveDialog("create");
  }, []);

  const openRenameDialog = React.useCallback((project: ProjectItem) => {
    setSelectedProject(project);
    setRenameName(project.name);
    setError(null);
    setActiveDialog("rename");
  }, []);

  const openDeleteDialog = React.useCallback((project: ProjectItem) => {
    setSelectedProject(project);
    setError(null);
    setActiveDialog("delete");
  }, []);

  const closeDialog = React.useCallback(() => {
    setActiveDialog(null);
    setSelectedProject(null);
    setProjectName("");
    setRenameName("");
    setIsLoading(false);
    setError(null);
  }, []);

  const handleCreateProject = React.useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      const trimmedName = projectName.trim();
      if (!trimmedName || isLoading) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: roomId,
            name: trimmedName,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Failed to create project");
        }

        const createdProject = await response.json();
        const targetWorkspaceId = createdProject.id || roomId;

        closeDialog();
        router.push(`/editor/${targetWorkspaceId}`);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to create project";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [projectName, roomId, isLoading, closeDialog, router]
  );

  const handleRenameProject = React.useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      if (!selectedProject || isLoading) {
        return;
      }

      const trimmedName = renameName.trim();
      if (!trimmedName) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/projects/${selectedProject.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Failed to rename project");
        }

        closeDialog();
        router.refresh();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to rename project";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedProject, renameName, isLoading, closeDialog, router]
  );

  const handleDeleteProject = React.useCallback(async () => {
    if (!selectedProject || isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete project");
      }

      const deletedId = selectedProject.id;
      closeDialog();

      const isCurrentWorkspace =
        (activeWorkspaceId && activeWorkspaceId === deletedId) ||
        pathname === `/editor/${deletedId}`;

      if (isCurrentWorkspace) {
        router.push("/editor");
      } else {
        router.refresh();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete project";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedProject, isLoading, activeWorkspaceId, pathname, closeDialog, router]);

  return {
    activeDialog,
    selectedProject,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,

    projectName,
    setProjectName,
    createName: projectName,
    setCreateName: setProjectName,
    roomId,
    projectSlug: roomId,

    renameName,
    setRenameName,

    isLoading,
    error,

    handleCreateProject,
    handleRenameProject,
    handleDeleteProject,
  };
}
