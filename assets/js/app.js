const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

function updateCartCountGlobal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((a, b) => a + b.quantity, 0);

  const el1 = document.getElementById("cartCount");
  const el2 = document.getElementById("cartCountFloat");

  if (el1) el1.textContent = total;
  if (el2) el2.textContent = total;
}

updateCartCountGlobal();