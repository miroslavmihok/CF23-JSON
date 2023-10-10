// all flower data
const flowers = [
  {
    flowerName: "Rose",
    price: 10.99,
    img: "../assets/rose.webp",
    description:
      "A classic symbol of love and beauty, available in various colors.",
    quantity: 0,
  },
  {
    flowerName: "Tulip",
    price: 8.49,
    img: "../assets/tulip.webp",
    description:
      "Known for their bright and vibrant petals, tulips come in various shades.",
    quantity: 0,
  },
  {
    flowerName: "Lily",
    price: 12.99,
    img: "../assets/lily.webp",
    description:
      "Elegant and fragrant, lilies are perfect for special occasions.",
    quantity: 0,
  },
  {
    flowerName: "Daisy",
    price: 6.99,
    img: "../assets/daisy.webp",
    description:
      "Simple and cheerful, daisies add a touch of freshness to any bouquet.",
    quantity: 0,
  },
  {
    flowerName: "Sunflower",
    price: 9.99,
    img: "../assets/sunflower.webp",
    description:
      "Bright and sunny, sunflowers are a symbol of happiness and warmth.",
    quantity: 0,
  },
];

// on Page load:

window.addEventListener("DOMContentLoaded", function () {
  loadProducts();
  loadCart();
  attachButtonListeners();
});

// price format
const currencyFormater = new Intl.NumberFormat("de-AT", {
  style: "currency",
  currency: "EUR",
});

// function to display each flower data inside html

const productContainer = document.querySelector(".products_list");

const loadProducts = () => {
  let displayProducts = flowers.map((item) => {
    return `<div class="product">
        <div class="product_img">
            <img src=${item.img} alt="${item.flowerName} img">
        </div>
        <div class="product_name">
            <h3>${item.flowerName}</h3>
            <p>${item.description}</p>
            <p><strong>${currencyFormater.format(item.price)}</strong></p>
        </div>
        <div class="product_quantity">
            <button class="addProduct">Add to Cart</button>
        </div>
    </div>`;
  });
  displayProducts = displayProducts.join("");
  productContainer.innerHTML = displayProducts;
};

// functionality of add buttons + cart array
let cartProducts = [];

const attachButtonListeners = () => {
  const addBtns = document.querySelectorAll(".addProduct");

  // ADD BUTTONS

  addBtns.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      let isInsideCart = cartProducts.some(
        (item) => item.flowerName === flowers[i].flowerName
      );
      let indexOfInside = cartProducts.findIndex(
        (item) => item.flowerName === flowers[i].flowerName
      );

      if (!isInsideCart) {
        flowers[i].quantity++;
        cartProducts.push(flowers[i]);
        loadCart();
      } else {
        cartProducts[indexOfInside].quantity++;
        loadCart();
      }
    });
  });
};

const attachCartButtonListeners = () => {
  //   CART BUTTONS
  const decreaseBtns = document.querySelectorAll(".decreaseBtn");
  const increaseBtns = document.querySelectorAll(".increasetBtn");
  const removeBtns = document.querySelectorAll(".removeBtn");

  const increaseQuantity = (index) => {
    cartProducts[index].quantity++;
  };

  const decreaseQuantity = (index) => {
    if (cartProducts[index].quantity > 1) {
        cartProducts[index].quantity--;
    } else {
        cartProducts[index].quantity = 0;
        cartProducts.splice(index, 1);
    }
  };

  const removeQuantity = (index) => {
    cartProducts[index].quantity = 0;
    cartProducts.splice(index, 1);
  };

  increaseBtns.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      increaseQuantity(i);
      loadCart();
    });
  });

  decreaseBtns.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      decreaseQuantity(i);
      loadCart();
    });
  });

  removeBtns.forEach((btn, i) => {
    btn.addEventListener('click', function() {
      removeQuantity(i);
      loadCart();
    })
  })
};

// functionality of cart and listing of products inside

const cartContainer = document.querySelector(".cart_products");

const loadCart = () => {
  let displayProducts = cartProducts.map((item) => {
    return `<div class="cart_product">
    <div class="cart_product_img">
        <img src=${item.img} alt="${item.flowerName} img">
    </div>
    <div class="cart_product_name">
        <h3>${item.flowerName}</h3>
        <p>${item.description}</p>
    </div>
    <div class="cart_product_quantity">
        <button class="decreaseBtn">-</button>
        <span class="product_quantity_value">${item.quantity}</span>
        <button class="increasetBtn">+</button>
        <button class="removeBtn">x</button>
        <span class="result">${currencyFormater.format(
          item.price * item.quantity
        )}</span>
    </div>
</div>`;
  });
  displayProducts = displayProducts.join("");
  cartContainer.innerHTML = displayProducts;
  attachCartButtonListeners();
};
