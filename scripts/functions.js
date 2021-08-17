// FormBtnStatus function :

let FormBtnStatus = () => {
  let allInputs = document.querySelectorAll("#add-product-form input");
  let pTitle = document.querySelector(".title");
  let pPrice = document.querySelector(".price");
  let addBtn = document.querySelector(".form-btn");

  allInputs.forEach(function (item) {
    item.addEventListener("keyup", () => {
      let a = pTitle.value;
      let b = pPrice.value;
      if (a.trim() != 0 && b.trim() != 0) {
        addBtn.classList.add("active");
      } else {
        addBtn.classList.remove("active");
      }
    });
  });
};

// getSaveProducts function :

let getSaveProducts = () => {
  let productsJSON = localStorage.getItem("products");
  return productsJSON !== null ? JSON.parse(productsJSON) : [];
};

// saveProducts function :

let saveProducts = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

// removeProduct function :

let removeProduct = (id) => {
  let productIndex = products.findIndex((item) => item.id === id);
  if (productIndex > -1) {
    products.splice(productIndex, 1);
  }
};

// toggleProduct function :

let toggleProduct = (id) => {
  let product = products.find((item) => item.id === id);
  if (product !== undefined) {
    product.exist = !product.exist;
  }
};

// sortProducts function :

let sortProducts = (products, sortBy) => {
  if (sortBy === "byEdited") {
    return products.sort((a, b) => {
      if (a.updated > b.updated) {
        return -1;
      } else if (a.updated < b.updated) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return products.sort((a, b) => {
      if (a.created > b.created) {
        return -1;
      } else if (a.created < b.created) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return products;
  }
};

// renderProducts function :

let renderProducts = (products, filters) => {
  products = sortProducts(products, filters.sortBy);
  let filteredProducts = products.filter((item) => {
    return item.title.toLowerCase().includes(filters.searchItem.toLowerCase());
  });
  filteredProducts = filteredProducts.filter((item) => {
    if (filters.availableProducts) {
      return item.exist;
    } else {
      return true;
    }
  });

  document.querySelector("#products").innerHTML = "";

  filteredProducts.forEach((item) => {
    document.querySelector("#products").appendChild(createProductDOM(item));
  });
};

// createProductDOM function :

let createProductDOM = function (product) {
  let productEl = document.createElement("div");
  let checkbox = document.createElement("input");
  let productTitle = document.createElement("span");
  let productPrice = document.createElement("span");
  let removeButton = document.createElement("button");
  let editProduct = document.createElement("a");

  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = !product.exist;
  productEl.appendChild(checkbox);
  checkbox.addEventListener("change", function () {
    toggleProduct(product.id);
    saveProducts(products);
    renderProducts(products, filters);
  });

  productTitle.textContent = product.title;
  productTitle.className = "product-title";
  productEl.appendChild(productTitle);

  productPrice.textContent = `${Number(product.price).toLocaleString()} تومان`;
  productPrice.className = "product-price";
  productEl.appendChild(productPrice);

  removeButton.textContent = "حذف";
  removeButton.className = "remove-button";
  productEl.appendChild(removeButton);

  removeButton.addEventListener("click", function () {
    removeProduct(product.id);
    saveProducts(products);
    renderProducts(products, filters);
  });

  editProduct.textContent = "ویرایش";
  editProduct.className = "edit-product";
  editProduct.setAttribute("href", `/edit-product.html#${product.id}`);
  productEl.appendChild(editProduct);

  productEl.setAttribute("class", "product-row");

  return productEl;
};

// lastEditMessage function :

let lastEditMessage = function (timestamp) {
  return `آخرین ویرایش : ${moment(timestamp).locale("fa").fromNow()}`;
};
