// api/challenge.js
export default async function handler(req, res) {
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzwXTsbKs8pOqyhFTKk-mtt8IbuiK2hwoBFJ7PsjtzOTMadRSVpDzuYQGGzGikm1fyb/exec"; // substitua pela URL do doGet

  try {
    const response = await fetch(APPS_SCRIPT_URL);
    const data = await response.json();

    // Força Content-Type com UTF-8
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send(JSON.stringify(data));
  } catch (err) {
    console.error(err);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(500).send(JSON.stringify({ error: "Erro ao buscar desafio do Apps Script" }));
  }
}
