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

// toggleProduct function :

let toggleProduct = function (id) {
  let product = products.find(function (item) {
    return item.id === id;
  });
  if (product !== undefined) {
    product.exist = !product.exist;
  }
};

// renderProducts function :

let renderProducts = function (products, filters) {
  let filteredProducts = products.filter(function (item) {
    return item.title.toLowerCase().includes(filters.searchItem.toLowerCase());
  });
  filteredProducts = filteredProducts.filter(function (item) {
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
  let productTitle = document.createElement("a");
  let removeButton = document.createElement("button");

  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = !product.exist;
  productEl.appendChild(checkbox);
  checkbox.addEventListener("change", function () {
    toggleProduct(product.id);
    saveProducts(products);
    renderProducts(products, filters);
  });

  productTitle.textContent = product.title;
  productTitle.setAttribute('href',`/edit-product.html#${product.id}`)
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
