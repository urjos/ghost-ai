import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserProjects, getSharedProjects } from "@/lib/projects";
import { EditorHomeView } from "@/components/editor/editor-home-view";
import type { ProjectItem } from "@/types/project";

export default async function EditorPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  const emails = user?.emailAddresses?.map((e) => e.emailAddress) ?? [];

  const [ownedDbProjects, sharedDbProjects] = await Promise.all([
    getUserProjects(userId),
    getSharedProjects(emails),
  ]);

  const ownedProjects: ProjectItem[] = ownedDbProjects.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.id,
    isOwner: true,
    updatedAt: p.updatedAt.toISOString(),
  }));

  const sharedProjects: ProjectItem[] = sharedDbProjects.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.id,
    isOwner: false,
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <EditorHomeView
      ownedProjects={ownedProjects}
      sharedProjects={sharedProjects}
    />
  );
}
