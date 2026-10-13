"use client";

import * as React from "react";
import { EditorDialog } from "@/components/editor/editor-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  onProjectNameChange: (value: string) => void;
  projectSlug?: string;
  roomId?: string;
  onSubmit: (e?: React.FormEvent) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CreateProjectDialog({
  open,
  onOpenChange,
  projectName,
  onProjectNameChange,
  projectSlug,
  roomId,
  onSubmit,
  onCancel,
  isLoading = false,
}: CreateProjectDialogProps) {
  const previewRoomId = roomId || projectSlug || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || isLoading) return;
    onSubmit(e);
  };

  return (
    <EditorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Project"
      description="Start a new architecture workspace."
      footer={
        <div className="flex w-full items-center justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-project-form"
            disabled={!projectName.trim() || isLoading}
          >
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        </div>
      }
    >
      <form
        id="create-project-form"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="create-project-name"
            className="text-xs font-medium text-copy-secondary"
          >
            Project Name
          </label>
          <Input
            id="create-project-name"
            placeholder="e.g. Cloud Infrastructure"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            autoFocus
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-surface-border bg-subtle/50 px-3 py-2 text-xs">
          <span className="text-copy-muted shrink-0">Room ID preview:</span>
          <span className="font-mono text-copy-primary truncate">
            {previewRoomId ? previewRoomId : "..."}
          </span>
        </div>
      </form>
    </EditorDialog>
  );
}
