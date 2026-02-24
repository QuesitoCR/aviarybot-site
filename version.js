fetch("./version.json")
  .then(res => res.json())
  .then(data => {

    document.querySelectorAll(".bot-version")
      .forEach(el => el.textContent = data.version);

    document.querySelectorAll(".bot-update")
      .forEach(el => el.textContent = data.last_update);

  })
  .catch(err => {
    console.error("No se pudo cargar version.json", err);
  });
