// Dibuja la lista de comandos a partir de los datos que publica el bot (ver version.js).
(function () {
  var box = document.getElementById("commands-list");
  if (!box) return;

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function renderCommand(c) {
    var usage = "<code>" + esc(c.usage) + "</code>";
    if (c.slash) usage += " / <code>/" + esc(c.name) + "</code>";
    var badge = c.permission && c.permission !== "todos"
      ? ' <span class="badge badge-' + esc(c.permission) + '">' + esc(c.permission_text) + "</span>"
      : "";
    return '<div class="cmd"><div class="cmd-usage">' + usage + badge + "</div>" +
           '<div class="cmd-desc">' + esc(c.description) + "</div></div>";
  }

  function renderCategory(cat) {
    var desc = cat.description ? '<p class="cat-desc">' + esc(cat.description) + "</p>" : "";
    return "<h2>" + esc(cat.emoji) + " " + esc(cat.title) + "</h2>" + desc +
           '<div class="section">' + (cat.commands || []).map(renderCommand).join("") + "</div>";
  }

  window.aviaryData
    .then(function (data) {
      var cats = data.categories || [];
      if (!cats.length) throw new Error("sin categorías");
      box.innerHTML = cats.map(renderCategory).join("");
    })
    .catch(function () {
      box.innerHTML = '<div class="section">No se pudo cargar la lista de comandos. Intenta recargar la página.</div>';
    });
})();
