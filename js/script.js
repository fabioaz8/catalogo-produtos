let currentCategory = "all";

const products = [
  {
    id: 1,
    name: "Notebook Dell i5",
    category: "tecnologia",
    price: "R$ 1.800,00",
    description: "Notebook em bom estado, 8GB RAM, SSD 256GB.",
    images: ["images/produto1_1.jpg", "images/produto1_2.jpg"],
    sold: false
    /* sold: true */
  },
  {
    id: 2,
    name: "HQ Batman Ano Um",
    category: "hqs",
    price: "R$ 40,00",
    description: "Clássico da DC Comics em ótimo estado.",
    images: ["images/produto2_1.jpg"],
    sold: false
  },
  {
    id: 3,
    name: "Disco Pink Floyd - The Wall",
    category: "vinil",
    price: "R$ 120,00",
    description: "Vinil original, capa conservada.",
    images: ["images/produto3_1.jpg", "images/produto3_2.jpg"],
    sold: false
  }
];

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
      <h3>${p.name}</h3>
      <p>${p.price}</p>
    `;

    list.appendChild(card);
  });
}

function filterCategory(cat) {
  currentCategory = cat;
  const term = document.getElementById("searchInput").value;
  renderProducts(cat, term);
}

function openModal(product) {
  document.getElementById("modal-title").innerText = product.name;
  document.getElementById("modal-description").innerText = product.description;
  document.getElementById("modal-price").innerText = product.price;

  const gallery = document.getElementById("modal-gallery");
  gallery.innerHTML = "";
  product.images.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    gallery.appendChild(image);
  });

  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function searchProducts() {
  const term = document.getElementById("searchInput").value;
  renderProducts(currentCategory, term);
}

renderProducts();
