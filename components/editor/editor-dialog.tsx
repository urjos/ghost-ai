"use client";

import * as React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface EditorDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

/**
 * EditorDialog provides a standardized dialog pattern matching the dark technical
 * workspace styling tokens (`globals.css`) and `rounded-3xl` modal specs.
 *
 * Supports title, description, body children, and footer actions.
 */
export function EditorDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  showCloseButton = true,
}: EditorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "rounded-3xl border border-surface-border bg-elevated text-copy-primary sm:max-w-md",
          className
        )}
        showCloseButton={showCloseButton}
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-base font-semibold text-copy-primary">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-copy-muted">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children && <div className="py-2 text-copy-secondary">{children}</div>}

        {footer && (
          <DialogFooter className="-mx-4 -mb-4 rounded-b-3xl border-t border-surface-border bg-subtle/50 p-4">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
