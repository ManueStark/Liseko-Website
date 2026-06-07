import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

async function saveOrder() {

  const name =
    document.getElementById("customerName").value;

  const phone =
    document.getElementById("customerPhone").value;

  const address =
    document.getElementById("customerAddress").value;

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

      items: cart,

      total,

      status: "pending",

      createdAt: serverTimestamp()
    }
  );

  alert("Commande enregistrée");
}


const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");

    div.className =
      "bg-white p-5 rounded-xl shadow flex justify-between items-center";

    div.innerHTML = `
      <div>
        <h2 class="font-bold text-lg">
          ${item.name}
        </h2>

        <p class="text-gray-500">
          ${item.price} Fcfa x ${item.quantity}
        </p>
      </div>

      <div class="flex items-center gap-3">

        <button
          onclick="decreaseQuantity(${index})"
          class="bg-gray-200 px-3 py-1 rounded">
          -
        </button>

        <span>${item.quantity}</span>

        <button
          onclick="increaseQuantity(${index})"
          class="bg-gray-200 px-3 py-1 rounded">
          +
        </button>

        <button
          onclick="removeItem(${index})"
          class="bg-red-500 text-white px-3 py-1 rounded">
          X
        </button>

      </div>
    `;

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

checkoutBtn.addEventListener(
  "click",
  async () => {

    if (!cart.length) {
      return;
    }

    await saveOrder();

    cart = [];

    localStorage.removeItem("cart");

    renderCart();
  }
);

renderCart();