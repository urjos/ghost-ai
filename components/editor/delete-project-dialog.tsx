"use client";

import * as React from "react";
import { EditorDialog } from "@/components/editor/editor-dialog";
import { Button } from "@/components/ui/button";

export interface DeleteProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DeleteProjectDialog({
  open,
  onOpenChange,
  projectName,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteProjectDialogProps) {
  return (
    <EditorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Project"
      description={
        <span>
          Are you sure you want to delete{" "}
          <span className="font-medium text-copy-primary">
            &ldquo;{projectName}&rdquo;
          </span>
          ? This action cannot be undone.
        </span>
      }
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
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Project"}
          </Button>
        </div>
      }
    />
  );
}
