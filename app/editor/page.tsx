"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { CreateProjectDialog } from "@/components/editor/create-project-dialog";
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog";
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";
import { ProjectItem } from "@/types/project";

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState<ProjectItem | null>(null);

  const {
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
  } = useProjectDialogs();

  return (
    <div className="relative flex min-h-screen flex-col bg-base text-copy-primary">
      <EditorNavbar
        title="Ghost AI"
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projects={projects}
        selectedProjectId={activeProject?.id}
        onSelectProject={(project) => setActiveProject(project)}
        onNewProject={openCreateDialog}
        onRenameProject={openRenameDialog}
        onDeleteProject={openDeleteDialog}
      />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="flex max-w-lg flex-col items-center text-center">
          <h1 className="font-heading text-xl font-semibold tracking-tight text-copy-primary sm:text-2xl">
            Create a project or open an existing one
          </h1>
          <p className="mt-2 text-sm text-copy-muted">
            Start a new architecture workspace, or choose a project from the sidebar.
          </p>
          <Button
            onClick={openCreateDialog}
            className="mt-6 gap-2"
          >
            <Plus className="size-4" />
            <span>New Project</span>
          </Button>
        </div>
      </main>

      {/* Project Dialogs */}
      <CreateProjectDialog
        open={activeDialog === "create"}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        projectName={createName}
        onProjectNameChange={setCreateName}
        projectSlug={createSlug}
        onSubmit={handleCreateProject}
        onCancel={closeDialog}
        isLoading={isLoading}
      />

      <RenameProjectDialog
        open={activeDialog === "rename"}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        currentProjectName={selectedProject?.name || ""}
        renameValue={renameName}
        onRenameValueChange={setRenameName}
        onSubmit={handleRenameProject}
        onCancel={closeDialog}
        isLoading={isLoading}
      />

      <DeleteProjectDialog
        open={activeDialog === "delete"}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        projectName={selectedProject?.name || ""}
        onConfirm={handleDeleteProject}
        onCancel={closeDialog}
        isLoading={isLoading}
      />
    </div>
  );
}
