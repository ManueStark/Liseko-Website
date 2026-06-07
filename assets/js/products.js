const products = [
  {
    id: 1,
    name: "Farine de Manioc",
    price: 2000,
    category: "farine",
    image: "assets/images/manioc.jpg",
    description: "Farine traditionnelle de manioc."
    
  },

  {
    id: 2,
    name: "Farine de Placali",
    price: 2000,
    category: "farine",
    image: "assets/images/placali.jpg",
    description: "Préparation traditionnelle."
  },

  {
    id: 3,
    name: "Poudre de Gingembre",
    price: 2000,
    category: "poudre",
    image: "assets/images/gingembre.jpg",
    description: "100% naturelle."
    
  },

  {
  id: 4,
  name: "Poudre de Petit Cola",
  price: 2500,
  category: "poudre",
  image: "assets/images/petit-cola.jpg",
  description: "Produit naturel."
 
}
];


const productsContainer = document.getElementById("productsContainer");

function displayProducts() {
  products.forEach((product) => {
    const card = document.createElement("div");

    card.className =
      "bg-white rounded-lg shadow-md overflow-hidden text-sm";

    card.innerHTML = `
      <img
        src="${product.image}"
        class="w-full h-32 object-cover"
      />

      <div class="p-5">

        <h2 class="text-xl font-bold mb-2">
          ${product.name}
        </h2>

        <p class="text-green-600 font-bold mb-4">
          ${product.price} Fcfa
        </p>

        <button
          onclick="addToCart(${product.id})"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
          Ajouter au panier
        </button>

      </div>
    `;

    productsContainer.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert("Produit ajouté au panier");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  document.getElementById("cartCount").textContent = total;
}

displayProducts();
updateCartCount();