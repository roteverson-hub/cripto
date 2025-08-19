export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método não permitido" });
  }

  try {
    const { username, password } = req.body;

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
    return res.status(200).json(data);
  } catch (err) {
    console.error("Erro no /api/login:", err);
    return res.status(500).json({ success: false, message: "Erro interno no servidor" });
  }
}
