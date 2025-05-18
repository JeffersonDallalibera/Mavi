let fotoAtual = null;
let exibindoFoto = false;

// Mostra/oculta a imagem
function mostrarFoto(nomeArquivo, legenda) {
  const container = document.getElementById("foto-exibida");
  const imagem = document.getElementById("imagem-momento");
  const texto = document.getElementById("legenda-momento");

  if (fotoAtual === nomeArquivo && exibindoFoto) {
    container.classList.remove("mostrar");
    setTimeout(() => {
      container.classList.add("hidden");
      container.style.display = "none";
      exibindoFoto = false;
    }, 500);
    return;
  }

  fotoAtual = nomeArquivo;
  imagem.src = "fotos/" + nomeArquivo;
  texto.textContent = legenda;

  container.classList.remove("hidden");
  container.style.display = "block";
  setTimeout(() => container.classList.add("mostrar"), 10);
  exibindoFoto = true;
}

// Atualiza contador de dias
function atualizarContador() {
  const inicio = new Date("2025-03-07T21:18:00"); // coloque a data de início do namoro
  const agora = new Date();
  const diff = agora - inicio;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById(
    "contador"
  ).innerText = `${dias} dias, ${horas}h ${minutos}m ${segundos}s`;
  setTimeout(atualizarContador, 1000);
}
// Exibe a carta
function mostrarCarta() {
  document.getElementById("mensagemCarta").classList.toggle("hidden");
}

// Anima o carrossel
let carrosselIndex = 0;
function avancarCarrossel() {
  const container = document.getElementById("carrossel-dinamico");
  const larguraFoto = container.firstChild.offsetWidth + 20;
  carrosselIndex++;
  if (carrosselIndex * larguraFoto >= container.scrollWidth) {
    carrosselIndex = 0;
  }
  container.scrollTo({
    left: carrosselIndex * larguraFoto,
    behavior: "smooth",
  });
}
setInterval(avancarCarrossel, 3000);

// Carrega dados do JSON
fetch("fotos.json")
  .then((res) => res.json())
  .then((fotos) => {
    // Preenche o carrossel
    const carrossel = document.getElementById("carrossel-dinamico");
    fotos.forEach((foto) => {
      const div = document.createElement("div");
      div.className = "photo-card";
      div.innerHTML = `
        <img src="fotos/${foto.arquivo}" alt="${foto.descricao}">
        <div class="photo-text">${foto.descricao}</div>
      `;
      carrossel.appendChild(div);
    });

    // Preenche timeline com datas únicas
    const timelineUl = document.getElementById("timeline-dinamica");
    const datasUnicas = [...new Set(fotos.map((f) => f.data))];

    datasUnicas.forEach((data) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = data;

      btn.onclick = () => {
        const imagensDaData = fotos.filter((f) => f.data === data);
        const aleatoria =
          imagensDaData[Math.floor(Math.random() * imagensDaData.length)];
        mostrarFoto(aleatoria.arquivo, aleatoria.descricao);
      };

      li.appendChild(btn);
      timelineUl.appendChild(li);
    });
  })
  .catch((err) => console.error("Erro ao carregar o JSON:", err));

atualizarContador();
