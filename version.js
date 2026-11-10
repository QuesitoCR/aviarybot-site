// Carga la versión, la fecha de actualización y la lista de comandos que publica el propio bot.
// El bot sube estos datos a un Gist público cada vez que cambian (nuevos comandos o nueva versión),
// así que la web se actualiza sola. Si GitHub no responde, se usa la copia local de este repositorio.
window.AVIARY_DATA_URL = "https://gist.githubusercontent.com/QuesitoCR/8a78c3fdffd268f618d5111317eaa08d/raw/commands.json";

function aviaryFetchJSON(url) {
  return fetch(url, { cache: "no-cache" }).then(function (res) {
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
  });
}

window.aviaryData = aviaryFetchJSON(window.AVIARY_DATA_URL)
  .catch(function () { return aviaryFetchJSON("./commands.json"); })
  .catch(function () { return aviaryFetchJSON("./version.json"); });

window.aviaryData
  .then(function (data) {
    document.querySelectorAll(".bot-version").forEach(function (el) { el.textContent = data.version || ""; });
    document.querySelectorAll(".bot-update").forEach(function (el) { el.textContent = data.last_update || ""; });
  })
  .catch(function (err) {
    console.error("No se pudo cargar la información del bot", err);
  });
