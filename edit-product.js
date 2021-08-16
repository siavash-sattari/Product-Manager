let productTitle = document.querySelector("#product-title");
let deleteProduct = document.querySelector("#delete-product");
let lastEdit = document.querySelector("#last-edit");

let productID = location.hash.substring(1);
// console.log(productID)

let products = getSaveProducts();
let product = products.find(function (item) {
  return item.id === productID;
});

if (product === undefined) {
  location.assign("/index.html");
}

productTitle.value = product.title;
lastEdit.textContent = lastEditMessage(product.updated);

productTitle.addEventListener("input", function (e) {
  product.title = e.target.value;
  product.updated = moment().valueOf();
  lastEdit.textContent = lastEditMessage(product.updated);
  saveProducts(products);
});

deleteProduct.addEventListener("click", function (e) {
  removeProduct(product.id);
  saveProducts(products);
  location.assign("/index.html");
});

window.addEventListener("storage", function (e) {
  if (e.key === "products") {
    products = JSON.parse(e.newValue);
    product = products.find(function (item) {
      return item.id === productID;
    });
    if (product === undefined) {
      location.assign("index.html");
    }
    productTitle.value = product.title;
    lastEdit.textContent = lastEditMessage(product.updated);
  }
});