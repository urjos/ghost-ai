"use client";

import * as React from "react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

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
      />
      <main className="flex flex-1 items-center justify-center p-6">
        <p className="text-sm text-copy-muted">Workspace Canvas</p>
      </main>
    </div>
  );
}
