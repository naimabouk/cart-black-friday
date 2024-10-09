const decreaseButtons = document.querySelectorAll(".decrease-quantity");
const increaseButtons = document.querySelectorAll(".increase-quantity");
const favoriteButtons = document.querySelectorAll(".favorite-item");
const deleteButtons = document.querySelectorAll(".delete-item");
const totalPriceElement = document.querySelector("#total-price");
const emptyCart = document.getElementById("empty-cart");

function calculateTotal() {
  let total = 0;
  let cartItems = document.querySelectorAll(".cart-item");
  if (cartItems.length == 0) {
    emptyCart.classList.remove("hidden");
    emptyCart.classList.add("flex");
  } else {
    emptyCart.classList.remove("flex");
    emptyCart.classList.add("hidden");
  }
  cartItems.forEach((item) => {
    const priceElement = item.querySelector("p.text-gray-600");
    const quantityElement = item.querySelector("input[type='number']");
    const price = parseFloat(priceElement.innerText.replace("$", ""));
    const quantity = parseInt(quantityElement.value);

    total += price * quantity;
  });

  totalPriceElement.innerText = `$${total.toFixed(2)}`;
}

decreaseButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const input = this.nextElementSibling;
    let currentValue = parseInt(input.value);
    if (currentValue > 1) {
      input.value = currentValue - 1;
      calculateTotal();
    }
  });
});

increaseButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const input = this.previousElementSibling;
    let currentValue = parseInt(input.value);
    input.value = currentValue + 1;
    calculateTotal();
  });
});

favoriteButtons.forEach((button) => {
  button.addEventListener("click", function () {
    this.classList.toggle("text-red-500");
    this.classList.toggle("animate-pulse");
    this.classList.toggle("scale-150");
  });
});

deleteButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const itemContainer = this.closest(".cart-item");
    itemContainer.remove();
    calculateTotal();
  });
});

calculateTotal();
