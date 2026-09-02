import { sql } from "@vercel/postgres";

export interface User {
  id: string;
  name: string | null;
  email: string;
  passwordHash: string;
}

export async function getUserByEmail(
  email: string,
): Promise<User | null> {
  const { rows } = await sql<User>`
    SELECT
      id::text AS id,
      name,
      email,
      "passwordHash"
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  return rows[0] ?? null;
}