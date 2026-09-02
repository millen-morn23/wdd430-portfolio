"use server";

import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const currentYear = new Date().getFullYear();

const CreateProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters."),
  technologies: z.string().min(2, "Add at least one technology."),
  type: z.enum(["opensource", "school"]),
  yearCompleted: z.coerce
    .number()
    .int("Year must be a whole number.")
    .gte(2000, "Year must be 2000 or later.")
    .lte(
      currentYear,
      `Year cannot be greater than ${currentYear}.`,
    ),
});

const ProjectFormSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  technologies: z.string().min(2),
  type: z.enum(["opensource", "school"]),
});

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    technologies?: string[];
    yearCompleted?: string[];
    type?: string[];
  };
  message?: string | null;
};

async function requireOwnerSession() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  return session;
}

function parseTechnologies(technologies: string): string {
  const technologyArray = technologies
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  return `{${technologyArray
    .map(
      (technology) =>
        `"${technology
          .replace(/\\/g, "\\\\")
          .replace(/"/g, '\\"')}"`,
    )
    .join(",")}}`;
}

export async function createProject(
  prevState: State,
  formData: FormData,
): Promise<State> {
  await requireOwnerSession();

  const validatedFields = CreateProjectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    type: formData.get("type"),
    yearCompleted: formData.get("yearCompleted"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to create project.",
    };
  }

  const {
    title,
    description,
    technologies,
    type,
    yearCompleted,
  } = validatedFields.data;

  const postgresArray = parseTechnologies(technologies);

  try {
    await sql`
      INSERT INTO projects (
        title,
        description,
        type,
        technologies,
        year_completed
      )
      VALUES (
        ${title},
        ${description},
        ${type},
        ${postgresArray}::text[],
        ${yearCompleted}
      )
    `;
  } catch (error) {
    console.error("Error creating project:", error);

    return {
      message: "Database Error: Failed to create project.",
    };
  }

  revalidatePath("/projects");
  redirect("/dashboard/projects");
}

export async function updateProject(
  id: string,
  formData: FormData,
) {
  await requireOwnerSession();

  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    type: formData.get("type"),
  };

  const parsed = ProjectFormSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error("Invalid project input.");
  }

  const {
    title,
    description,
    technologies,
    type,
  } = parsed.data;

  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId <= 0) {
    throw new Error("Invalid project ID.");
  }

  const postgresArray = parseTechnologies(technologies);

  try {
    await sql`
      UPDATE projects
      SET
        title = ${title},
        description = ${description},
        type = ${type},
        technologies = ${postgresArray}::text[]
      WHERE id = ${projectId}
    `;
  } catch (error) {
    console.error("Error updating project:", error);

    throw new Error(
      "Failed to update project. Please try again later.",
    );
  }

  revalidatePath("/projects");
  revalidatePath(`/dashboard/projects/${projectId}/edit`);
  redirect("/dashboard/projects");
}

export async function deleteProject(id: string) {
  await requireOwnerSession();

  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId <= 0) {
    throw new Error("Invalid project ID.");
  }

  try {
    await sql`
      DELETE FROM projects
      WHERE id = ${projectId}
    `;
  } catch (error) {
    console.error("Error deleting project:", error);

    throw new Error(
      "Failed to delete project. Please try again later.",
    );
  }

  revalidatePath("/projects");
  redirect("/dashboard/projects");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password.";
        default:
          return "Something went wrong.";
      }
    }

    throw error;
  }
}
