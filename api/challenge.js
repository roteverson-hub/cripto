// api/challenge.js
export default async function handler(req, res) {
  const APPS_SCRIPT_URL = "SUA_URL_DO_WEBAPP_DO_APPSCRIPT"; // substitua pela URL do doGet

  try {
    const response = await fetch(APPS_SCRIPT_URL);
    const data = await response.json();

    // Retorna o JSON para o frontend
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar desafio do Apps Script" });
  }
}
