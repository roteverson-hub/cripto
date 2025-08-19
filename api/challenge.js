const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzwXTsbKs8pOqyhFTKk-mtt8IbuiK2hwoBFJ7PsjtzOTMadRSVpDzuYQGGzGikm1fyb/exec"; // cole aqui a URL do doGet

document.getElementById('loadChallenge').addEventListener('click', async () => {
  try {
    const response = await fetch(APPS_SCRIPT_URL);
    const data = await response.json();

    // Mostra tema
    document.getElementById('theme').textContent = `Tema: ${data.theme}`;

    // Monta palavras cifradas
    const challengeDiv = document.getElementById('challenge');
    challengeDiv.innerHTML = ''; // limpa anterior
    data.words.forEach((word, index) => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p>${word}</p>
        <input type="text" id="input-${index}" placeholder="Digite a palavra correta">
      `;
      challengeDiv.appendChild(div);
    });

    // Para debug (JSON completo)
    document.getElementById('debug').textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    console.error(err);
    alert("Erro ao carregar desafio do dia.");
  }
});
