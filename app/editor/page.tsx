import { EditorNavbar } from "@/components/editor/editor-navbar";

export default function EditorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-base text-copy-primary">
      <EditorNavbar title="Ghost AI" />
      <main className="flex flex-1 items-center justify-center p-6">
        <p className="text-sm text-copy-muted">Workspace Canvas</p>
      </main>
    </div>
  );
}
