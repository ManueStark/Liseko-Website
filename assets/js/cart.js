import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

async function saveOrder() {

  const name =
    document.getElementById("customerName").value.trim();

  const phone =
    document.getElementById("customerPhone").value.trim();

  const address =
    document.getElementById("customerAddress").value.trim();

  const note =
    document.getElementById("customerNote").value.trim();

  
    if (!name || !phone || !address) {
    alert("Veuillez remplir tous les champs.");
    return false;
  }

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

 await addDoc(
  collection(db, "orders"),
  {
    customer: {
      name,
      phone,
      address
    },
    deliveryInstructions: note,
    items: cart,
    total,
    status: "pending",
    createdAt: serverTimestamp()
  }
);

return true;

}


const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItems.innerHTML = '';

cart.forEach((item, index) => {
  cartItems.innerHTML += `
    <div class="flex justify-between items-center py-3 border-b">

      <div>
        <h4 class="font-semibold">${item.name}</h4>
        <p>${item.price} Fcfa</p>
      </div>

      <div class="flex items-center gap-2">

        <button
          onclick="decreaseQuantity(${index})"
          class="bg-gray-200 px-2 rounded">
          -
        </button>

        <span>${item.quantity}</span>

        <button
          onclick="increaseQuantity(${index})"
          class="bg-gray-200 px-2 rounded">
          +
        </button>

      </div>

    </div>
  `;
});

function increaseQuantity(index) {
  cart[index].quantity++;
  updateCart();
}

function decreaseQuantity(index) {

  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  updateCart();
}

    cartItems.appendChild(div);
  });

  cartTotal.textContent = `${total} Fcfa`;

  localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseQuantity(index) {
  cart[index].quantity++;
  renderCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  }

  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

checkoutBtn.addEventListener("click", async () => {
  try {

    const saved = await saveOrder();

    if (!saved) {
      return;
    }

    const name =
      document.getElementById("customerName").value;

    const phone =
      document.getElementById("customerPhone").value;

    const address =
      document.getElementById("customerAddress").value;

    const note =
      document.getElementById("customerNote").value;

    const total = cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

    let message = `
Bonjour LISEKO

Nom : ${name}
Téléphone : ${phone}
Adresse : ${address}

Instructions : ${note || "Aucune"}

Commande :
`;

    cart.forEach((item) => {
      message += `- ${item.name} x ${item.quantity}\n`;
    });

    message += `\nTotal : ${total} FCFA`;

    const whatsappMessage =
      encodeURIComponent(message);

    window.open(
      `https://wa.me/2250504250606?text=${whatsappMessage}`,
      "_blank"
    );

    localStorage.removeItem("cart");

    cart = [];

    renderCart();

  } catch (error) {
    console.error(error);
    alert("Erreur lors de l'enregistrement.");
  }
});