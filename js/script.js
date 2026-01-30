
let currentCategory = "all";

/* ================================
   CARREGAMENTO DOS PRODUTOS (JSON)
================================ */

let products = [];

// Lê o arquivo products/products.json
fetch("products/products.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao carregar products.json");
    }
    return response.json();
  })
  .then(data => {
    products = data;
    renderProducts();
  })
  .catch(error => {
    console.error("Erro:", error);
  });

/* ================================
   LISTAGEM DE PRODUTOS
================================ */

const list = document.getElementById("product-list");

function renderProducts(filter = "all", search = "") {
  list.innerHTML = "";

  let filtered = products;

  if (filter !== "all") {
    filtered = filtered.filter(p => p.category === filter);
  }

  if (search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "card" + (p.sold ? " sold" : "");

    if (!p.sold) {
      card.onclick = () => openModal(p);
    }

    card.innerHTML = `
      <img src="${p.images[0]}" alt="${p.name}">
      <h2>${p.name}</h2>
      <h3>${p.status_item}</h3>
      <p>${p.description}</p>
      <h3>${p.price}</h3>
    `;

    list.appendChild(card);
  });
}

/* ================================
   FILTRO / BUSCA
================================ */

function filterCategory(cat) {
  currentCategory = cat;
  const term = document.getElementById("searchInput").value;
  renderProducts(cat, term);
}

function searchProducts() {
  const term = document.getElementById("searchInput").value;
  renderProducts(currentCategory, term);
}

/* ================================
   MODAL COM IMAGEM GRANDE
================================ */

function openModal(product) {
  document.getElementById("modal-title").innerText = product.name;
  /* document.getElementById("modal-description").innerText = product.description;*/
  document.getElementById("modal-status_item").innerText = product.status_item;
  document.getElementById("modal-price").innerText = product.price;

  const gallery = document.getElementById("modal-gallery");
  gallery.innerHTML = "";

  // força layout vertical
  gallery.style.display = "flex";
  gallery.style.flexDirection = "column";
  gallery.style.alignItems = "center";

  // IMAGEM PRINCIPAL
  const mainImage = document.createElement("img");
  mainImage.src = product.images[0];
  mainImage.style.width = "100%";
  mainImage.style.height = "350px";
  mainImage.style.objectFit = "contain";
  mainImage.style.marginBottom = "2px";
  mainImage.style.borderRadius = "5px";

  gallery.appendChild(mainImage);

  // MINIATURAS (embaixo)
  if (product.images.length > 1) {
    const thumbs = document.createElement("div");

    thumbs.style.display = "flex";
    thumbs.style.gap = "8px";
    thumbs.style.justifyContent = "center";
    thumbs.style.flexWrap = "wrap";          // 🔑 evita scroll horizontal
    thumbs.style.width = "50%";

    product.images.forEach(img => {
      const thumb = document.createElement("img");
      thumb.src = img;

      thumb.style.width = "70px";
      thumb.style.height = "70px";
      thumb.style.objectFit = "cover";
      thumb.style.cursor = "pointer";
      thumb.style.borderRadius = "4px";
      thumb.style.border = "2px solid #ddd";

      thumb.onclick = () => {
        mainImage.src = img;
      };

      thumbs.appendChild(thumb);
    });

    gallery.appendChild(thumbs);
  }

  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* ================================
   BOTÃO VOLTAR AO TOPO
================================ */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function linkify(text) {
  if (!text) return "";

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, url =>
    `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  );
}

function clearSearch() {
  const input = document.getElementById("searchInput");
  input.value = "";

  // volta para a categoria atual sem filtro de texto
  renderProducts(currentCategory, "");
}
