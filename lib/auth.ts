import { cookies } from "next/headers";

const AUTH_SECRET = process.env.AUTH_SECRET || "default-secret-change-me";
const COOKIE_NAME = "admin-session";

interface TokenPayload {
  username: string;
  exp: number;
}

// Verifica se o usuário está autenticado (server-side)
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [data, secret] = decoded.split("|");

    if (secret !== AUTH_SECRET) {
      return false;
    }

    const payload: TokenPayload = JSON.parse(data);

    if (payload.exp < Date.now()) {
      return false; // Token expirado
    }

    return true;
  } catch {
    return false;
  }
}

// Retorna os dados do usuário autenticado
export async function getAuthUser(): Promise<{ username: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [data, secret] = decoded.split("|");

    if (secret !== AUTH_SECRET) {
      return null;
    }

    const payload: TokenPayload = JSON.parse(data);

    if (payload.exp < Date.now()) {
      return null;
    }

    return { username: payload.username };
  } catch {
    return null;
  }
}
