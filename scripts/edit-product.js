let productTitle = document.querySelector("#product-title");
let productPrice = document.querySelector("#product-price");
let deleteProduct = document.querySelector("#delete-product");
let lastEdit = document.querySelector("#last-edit");

let productID = location.hash.substring(1);

let products = getSaveProducts();
let product = products.find((item) => item.id === productID);

if (product === undefined) {
  location.assign("/index.html");
}

productTitle.value = product.title;
productPrice.value = product.price;
lastEdit.textContent = lastEditMessage(product.updated);

productTitle.addEventListener("input", (e) => {
  product.title = e.target.value;
  product.updated = moment().valueOf();
  lastEdit.textContent = lastEditMessage(product.updated);
  saveProducts(products);
});

productPrice.addEventListener("input", (e) => {
  product.price = e.target.value;
  product.updated = moment().valueOf();
  lastEdit.textContent = lastEditMessage(product.updated);
  saveProducts(products);
});

deleteProduct.addEventListener("click", (e) => {
  removeProduct(product.id);
  saveProducts(products);
  location.assign("/index.html");
});

window.addEventListener("storage", (e) => {
  if (e.key === "products") {
    products = JSON.parse(e.newValue);
    product = products.find((item) => item.id === productID);

    if (product === undefined) {
      location.assign("index.html");
    }

    productTitle.value = product.title;
    productPrice.value = product.price;
    lastEdit.textContent = lastEditMessage(product.updated);
  }
});
