const products = [
  {
    name: "Laptop",
    price: 1200,
    quantity: 0,
    productId: 1,
    image: "https://via.placeholder.com/150?text=Laptop",
  },
  {
    name: "Smartphone",
    price: 800,
    quantity: 0,
    productId: 2,
    image: "https://via.placeholder.com/150?text=Smartphone",
  },
  {
    name: "Headphones",
    price: 150,
    quantity: 0,
    productId: 3,
    image: "https://via.placeholder.com/150?text=Headphones",
  },
];
  
  let cart = [];
  let remainingBalance = 0; // الرصيد المتبقي
  
  function addProductToCart(productId) {
    const product = products.find((item) => item.productId === productId);
    if (!product) return;
  
    const cartItem = cart.find((item) => item.productId === productId);
  
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  }
  
  function increaseQuantity(productId) {
    const cartItem = cart.find((item) => item.productId === productId);
    if (cartItem) {
      cartItem.quantity++;
    }
  }
  
  function decreaseQuantity(productId) {
    const cartItem = cart.find((item) => item.productId === productId);
    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        removeProductFromCart(productId);
      }
    }
  }
  
  function removeProductFromCart(productId) {
    cart = cart.filter((item) => item.productId !== productId);
  }
  
  function cartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  function pay(amount) {
    const total = cartTotal();
    remainingBalance += amount - total;
  
    if (amount >= total) {
      cart = []; 
    }
  
    return remainingBalance;
  }
  
  function clearCart() {
    cart = [];
  }
  
  function convertCurrency(amount, currency) {
    const rates = { USD: 1, EUR: 0.85, YEN: 110 };
    return (amount * rates[currency]).toFixed(2);
  }
  
  function formatPrice(amount, currency) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    });
    return formatter.format(amount);
  }
  
  function addNewProduct(name, price, image) {
    const newProduct = {
      name,
      price: parseFloat(price),
      quantity: 0,
      productId: products.length + 1,
      image,
    };
    products.push(newProduct);
  }

function displayProducts() {
  const productList = document.getElementById("product-list");
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${formatPrice(product.price, 'USD')}</p>
      <button onclick="addProductToCart(${product.productId})">Add to Cart</button>
    `;
    productList.appendChild(productCard);
  });
}

function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
      <p>${item.name} - ${formatPrice(item.price, 'USD')} x ${item.quantity}</p>
      <button onclick="increaseQuantity(${item.productId})">+</button>
      <button onclick="decreaseQuantity(${item.productId})">-</button>
      <button onclick="removeProductFromCart(${item.productId})">Remove</button>
    `;
    cartItems.appendChild(cartItem);
  });
  document.getElementById("cart-total").innerText = formatPrice(cartTotal(), 'USD');
}

document.getElementById("checkout-button").addEventListener("click", () => {
  const total = cartTotal();
  alert(`Your total is ${formatPrice(total, 'USD')}`);
  clearCart();
  updateCartUI();
});

displayProducts();

document.getElementById("pay-button").addEventListener("click", () => {
  const paymentAmount = parseFloat(document.getElementById("payment-amount").value);
  const remaining = pay(paymentAmount);
  document.getElementById("remaining-balance").innerText = formatPrice(remaining, 'USD');
  updateCartUI();
});
