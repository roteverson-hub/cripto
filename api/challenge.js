// api/challenge.js
export default async function handler(req, res) {
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzwXTsbKs8pOqyhFTKk-mtt8IbuiK2hwoBFJ7PsjtzOTMadRSVpDzuYQGGzGikm1fyb/exec"; // substitua pela URL do doGet

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
