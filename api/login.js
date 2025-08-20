export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body || {};

      if (!username || !password) {
        return res.status(400).json({ success: false, message: "Usuário e senha obrigatórios" });
      }

      const response = await fetch(process.env.USERS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          username,
          password,
        }),
      });

      const data = await response.json();

      // Se login ok, grava cookie simples com o username para "memória do servidor"
      if (data && data.success) {
        const maxAge = 60 * 60 * 24; // 1 dia
        res.setHeader(
          "Set-Cookie",
          `user=${encodeURIComponent(username)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`
        );
      }

      return res.status(200).json(data);
    } catch (err) {
      console.error("Erro no /api/login:", err);
      return res.status(500).json({ success: false, message: "Erro interno no servidor" });
    }
  }

  // GET opcional: retorna se há usuário lembrado via cookie
  if (req.method === "GET") {
    try {
      const cookie = req.headers.cookie || "";
      const match = cookie.match(/(?:^|;\s*)user=([^;]+)/);
      const username = match ? decodeURIComponent(match[1]) : null;

      return res.status(200).json({
        success: true,
        logged: !!username,
        username: username || null,
      });
    } catch (err) {
      return res.status(200).json({ success: true, logged: false, username: null });
    }
  }

  return res.status(405).json({ success: false, message: "Método não permitido" });
}
