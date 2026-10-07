import * as React from "react";
import { Sparkles, Share2, FileText } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-base text-copy-primary">
      {/* Left panel - 50% width on large screens with distinct surface tone */}
      <aside className="hidden lg:flex lg:w-1/2 flex-col justify-between border-r border-surface-border bg-surface p-10 xl:p-16 select-none">
        {/* Top: Compact Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-brand shrink-0" aria-hidden="true" />
          <span className="font-heading text-base font-bold tracking-tight text-copy-primary">
            Ghost AI
          </span>
        </div>

        {/* Center: Main copy + feature list */}
        <div className="my-auto py-10 max-w-lg">
          <h1 className="font-heading text-3xl xl:text-4xl font-bold tracking-tight text-copy-primary leading-[1.2]">
            Design systems at the<br />speed of thought.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-copy-muted">
            Describe your architecture in plain English. Ghost AI maps it to a shared canvas your whole team can refine in real time.
          </p>

          {/* Feature list */}
          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
                <Sparkles className="size-4.5" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-sm font-semibold text-copy-primary">
                  AI Architecture Generation
                </h2>
                <p className="text-xs text-copy-muted leading-relaxed">
                  Describe your system, AI maps it to nodes and edges on a live canvas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
                <Share2 className="size-4.5" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-sm font-semibold text-copy-primary">
                  Real-time Collaboration
                </h2>
                <p className="text-xs text-copy-muted leading-relaxed">
                  Live cursors, presence indicators, and shared node editing across your team.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
                <FileText className="size-4.5" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-sm font-semibold text-copy-primary">
                  Instant Spec Generation
                </h2>
                <p className="text-xs text-copy-muted leading-relaxed">
                  Export a complete Markdown technical spec directly from the canvas graph.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="text-xs text-copy-faint">
          &copy; 2026 Ghost AI. All rights reserved.
        </div>
      </aside>

      {/* Right panel - 50% width on large screens, full-width on mobile */}
      <main className="flex flex-1 lg:w-1/2 min-h-screen items-center justify-center p-6 sm:p-10 lg:p-12 bg-base">
        <div className="w-full max-w-md flex justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
