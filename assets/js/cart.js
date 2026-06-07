import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

// ---------------- SAVE ORDER ----------------
async function saveOrder() {
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const note = document.getElementById("customerNote").value.trim();

  if (!name || !phone || !address) {
    alert("Veuillez remplir tous les champs.");
    return false;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  await addDoc(collection(db, "orders"), {
    customer: { name, phone, address },
    deliveryInstructions: note,
    items: cart,
    total,
    status: "pending",
    createdAt: serverTimestamp()
  });

  return true;
}

// ---------------- RENDER CART ----------------
function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<div class="text-center text-gray-500 py-4">Panier vide</div>`;
    cartTotal.textContent = "0 Fcfa";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "flex justify-between items-center py-3 border-b";

    div.innerHTML = `
      <div>
        <h4 class="font-semibold">${item.name}</h4>
        <p>${item.price} Fcfa</p>
      </div>

      <div class="flex items-center gap-2">
        <button onclick="decreaseQuantity(${index})" class="bg-gray-200 px-2 rounded">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${index})" class="bg-gray-200 px-2 rounded">+</button>
      </div>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = `${total} Fcfa`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ---------------- QUANTITY ----------------
window.increaseQuantity = function (index) {
  cart[index].quantity++;
  renderCart();
};

window.decreaseQuantity = function (index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
};

// ---------------- CHECKOUT ----------------
checkoutBtn.addEventListener("click", async () => {
  try {
    const saved = await saveOrder();
    if (!saved) return;

    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const address = document.getElementById("customerAddress").value;
    const note = document.getElementById("customerNote").value;

    let message = `Bonjour LISEKO,\nPour ma commande :\n\nNom : ${name}\nTéléphone : ${phone}\nAdresse : ${address}\n\nInstructions : ${note || "Aucune"}\n\nCommande :\n`;

    cart.forEach(item => {
      message += `- ${item.name} x ${item.quantity}\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `\nTotal : ${total} FCFA`;

    window.open(
      `https://wa.me/2250504250606?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    cart = [];
    localStorage.removeItem("cart");
    renderCart();

  } catch (err) {
    console.error(err);
    alert("Erreur lors de l'enregistrement.");
  }
});

// init
renderCart();