import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const AUTH_SECRET = process.env.AUTH_SECRET || "default-secret-change-me";
const COOKIE_NAME = "admin-session";

// Função simples para criar um token
function createToken(username: string): string {
  const payload = {
    username,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 horas
  };
  // Codifica em base64 (não é criptografia real, mas suficiente para uso básico)
  const data = JSON.stringify(payload);
  const token = Buffer.from(data + "|" + AUTH_SECRET).toString("base64");
  return token;
}

// Função para verificar token
export function verifyToken(token: string): { valid: boolean; username?: string } {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [data, secret] = decoded.split("|");
    
    if (secret !== AUTH_SECRET) {
      return { valid: false };
    }
    
    const payload = JSON.parse(data);
    
    if (payload.exp < Date.now()) {
      return { valid: false }; // Token expirado
    }
    
    return { valid: true, username: payload.username };
  } catch {
    return { valid: false };
  }
}

// POST - Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Verificar credenciais
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Usuário ou senha incorretos" },
        { status: 401 }
      );
    }

    // Criar token e definir cookie
    const token = createToken(username);
    
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 horas
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Login realizado!" });
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: "Erro ao processar login" },
      { status: 500 }
    );
  }
}

// DELETE - Logout
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  
  return NextResponse.json({ success: true, message: "Logout realizado!" });
}

// GET - Verificar se está autenticado
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const result = verifyToken(token);
  
  if (!result.valid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ 
    authenticated: true, 
    username: result.username 
  });
}
