"use client";

import * as React from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface EditorNavbarProps {
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  title?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}

export function EditorNavbar({
  isSidebarOpen = false,
  onToggleSidebar,
  title,
  centerContent,
  rightContent,
  className,
}: EditorNavbarProps) {
  return (
    <header
      className={cn(
        "relative z-50 flex h-14 w-full shrink-0 select-none items-center justify-between border-b border-surface-border bg-surface px-4 text-copy-primary",
        className
      )}
    >
      {/* Left section: sidebar toggle button + optional title */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close projects sidebar" : "Open projects sidebar"}
          title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          className="text-copy-muted hover:bg-subtle hover:text-copy-primary"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="size-4" />
          ) : (
            <PanelLeftOpen className="size-4" />
          )}
        </Button>
        {title && (
          <div className="font-heading text-sm font-semibold tracking-tight text-copy-primary">
            {title}
          </div>
        )}
      </div>

      {/* Center section */}
      <div className="flex flex-1 items-center justify-center min-w-0 px-2">
        {centerContent}
      </div>

      {/* Right section: user profile and controls */}
      <div className="flex items-center justify-end gap-2">
        {rightContent}
        <UserButton
          appearance={{
            elements: {
              userButtonPopoverCard: {
                backgroundColor: "#18181c",
                border: "1px solid #2a2a30",
              },
              userButtonPopoverActionButton: {
                color: "#c0c0cc",
              },
              userButtonPopoverActionButtonText: {
                color: "#c0c0cc",
              },
              userButtonPopoverActionButtonIcon: {
                color: "#808090",
              },
            },
          }}
        />
      </div>
    </header>
  );
}
