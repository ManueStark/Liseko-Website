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

checkoutBtn.addEventListener("click", () => {
  let message = "Bonjour LISEKO,%0A%0AJe souhaite commander :%0A";

  cart.forEach((item) => {
    message += `- ${item.name} x ${item.quantity}%0A`;
  });

  message += `%0ATotal : ${cartTotal.textContent}`;

  window.open(
    `https://wa.me/2250504250606?text=${message}`,
    "_blank"
  );
});

renderCart();