// getSaveProducts function :

let getSaveProducts = function () {
  let productsJSON = localStorage.getItem("products");
  if (productsJSON !== null) {
    return JSON.parse(productsJSON);
  } else {
    return [];
  }
};

// saveProducts function :

let saveProducts = function (products) {
  localStorage.setItem("products", JSON.stringify(products));
};

// removeProduct function :

let removeProduct = function (id) {
  let productIndex = products.findIndex(function (item) {
    return item.id === id;
  });
  if (productIndex > -1) {
    products.splice(productIndex, 1);
  }
};

// renderProducts function :

let renderProducts = function (products, filters) {
  let filteredProducts = products.filter(function (item) {
    return item.title.toLowerCase().includes(filters.searchItem.toLowerCase());
  });
  filteredProducts.filter(function (item) {
    if (filters.availableProducts) {
      return item.exist;
    } else {
      return true;
    }
  });

  document.querySelector("#products").innerHTML = "";

  filteredProducts.forEach(function (item) {
    document.querySelector("#products").appendChild(createProductDOM(item));
  });
};

// createProductDOM function :

let createProductDOM = function (product) {
  let productEl = document.createElement("div");
  let checkbox = document.createElement("input");
  let productTitle = document.createElement("span");
  let removeButton = document.createElement("button");

  checkbox.setAttribute("type", "checkbox");
  productEl.appendChild(checkbox);

  productTitle.textContent = product.title;
  productEl.appendChild(productTitle);

  removeButton.textContent = "Remove";
  productEl.appendChild(removeButton);

  removeButton.addEventListener("click", function () {
    removeProduct(product.id);
    saveProducts(products);
    renderProducts(products, filters);
  });

  return productEl;
};
