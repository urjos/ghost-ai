"use client";

import * as React from "react";
import { EditorDialog } from "@/components/editor/editor-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface RenameProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentProjectName: string;
  renameValue: string;
  onRenameValueChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function RenameProjectDialog({
  open,
  onOpenChange,
  currentProjectName,
  renameValue,
  onRenameValueChange,
  onSubmit,
  onCancel,
  isLoading = false,
}: RenameProjectDialogProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Auto-focus and select text when dialog opens
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!renameValue.trim() || isLoading) return;
    onSubmit(e);
  };

  return (
    <EditorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Rename Project"
      description={
        <span>
          Current project name:{" "}
          <span className="font-medium text-copy-primary">
            &ldquo;{currentProjectName}&rdquo;
          </span>
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
            type="submit"
            form="rename-project-form"
            disabled={!renameValue.trim() || isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      }
    >
      <form
        id="rename-project-form"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="rename-project-name"
            className="text-xs font-medium text-copy-secondary"
          >
            New Project Name
          </label>
          <Input
            ref={inputRef}
            id="rename-project-name"
            placeholder="Enter new project name"
            value={renameValue}
            onChange={(e) => onRenameValueChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            autoFocus
            disabled={isLoading}
          />
        </div>
      </form>
    </EditorDialog>
  );
}
