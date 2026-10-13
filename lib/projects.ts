import { prisma } from "@/lib/prisma";
import type { Project } from "@prisma/client";

export class ProjectNotFoundError extends Error {
  constructor(message = "Project not found") {
    super(message);
    this.name = "ProjectNotFoundError";
  }
}

export class ProjectForbiddenError extends Error {
  constructor(message = "Forbidden: Only the project owner can perform this action") {
    super(message);
    this.name = "ProjectForbiddenError";
  }
}

export interface CreateProjectInput {
  ownerId: string;
  name?: string | null;
  description?: string | null;
  id?: string | null;
}

export async function getUserProjects(userId: string): Promise<Project[]> {
  return prisma.project.findMany({
    where: {
      ownerId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      collaborators: true,
    },
  });
}

export async function getSharedProjects(
  userEmail?: string | string[]
): Promise<Project[]> {
  if (!userEmail) return [];
  const emails = Array.isArray(userEmail) ? userEmail : [userEmail];
  const validEmails = emails
    .map((e) => (typeof e === "string" ? e.trim() : ""))
    .filter((e) => e.length > 0);

  if (validEmails.length === 0) return [];

  return prisma.project.findMany({
    where: {
      collaborators: {
        some: {
          email: {
            in: validEmails,
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      collaborators: true,
    },
  });
}

export async function getProjectById(projectId: string): Promise<Project | null> {
  return prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      collaborators: true,
    },
  });
}

export async function createProject({
  ownerId,
  name,
  description,
  id,
}: CreateProjectInput): Promise<Project> {
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const projectName = trimmedName.length > 0 ? trimmedName : "Untitled Project";

  const data: {
    ownerId: string;
    name: string;
    description?: string | null;
    id?: string;
  } = {
    ownerId,
    name: projectName,
    description: typeof description === "string" ? description.trim() : null,
  };

  if (typeof id === "string" && id.trim().length > 0) {
    data.id = id.trim();
  }

  return prisma.project.create({
    data,
    include: {
      collaborators: true,
    },
  });
}

export async function renameProject(
  projectId: string,
  ownerId: string,
  name: string
): Promise<Project> {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new ProjectNotFoundError();
  }

  if (project.ownerId !== ownerId) {
    throw new ProjectForbiddenError();
  }

  const trimmedName = name.trim();
  if (!trimmedName) {
    throw new Error("Project name cannot be empty");
  }

  return prisma.project.update({
    where: { id: projectId },
    data: {
      name: trimmedName,
    },
    include: {
      collaborators: true,
    },
  });
}

export async function deleteProject(
  projectId: string,
  ownerId: string
): Promise<Project> {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new ProjectNotFoundError();
  }

  if (project.ownerId !== ownerId) {
    throw new ProjectForbiddenError();
  }

  return prisma.project.delete({
    where: { id: projectId },
  });
}
