const products = [
    {
      name: "Laptop",
      price: 1200,
      quantity: 0,
      productId: 1,
      image: "https://example.com/laptop.jpg",
    },
    {
      name: "Smartphone",
      price: 800,
      quantity: 0,
      productId: 2,
      image: "https://example.com/smartphone.jpg",
    },
    {
      name: "Headphones",
      price: 150,
      quantity: 0,
      productId: 3,
      image: "https://example.com/headphones.jpg",
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
  