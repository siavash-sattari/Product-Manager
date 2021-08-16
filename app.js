let products = getSaveProducts();

let filters = {
  searchItem: "",
  availableProducts: false,
  sortBy: "byEdited",
};

renderProducts(products, filters);

document.querySelector("#add-product-form").addEventListener("submit", function (e) {
  e.preventDefault();
  let timestamp = moment().valueOf();
  products.push({
    id: uuidv4(),
    title: e.target.elements.productTitle.value,
    price: e.target.elements.productPrice.value,
    exist: true,
    created: timestamp,
    updated: timestamp,
  });
  saveProducts(products);
  renderProducts(products, filters);
  e.target.elements.productTitle.value = "";
  e.target.elements.productPrice.value = "";
});

document.querySelector("#search-products").addEventListener("input", function (e) {
  filters.searchItem = e.target.value;
  renderProducts(products, filters);
});

document.querySelector("#available-products").addEventListener("change", function (e) {
  filters.availableProducts = e.target.checked;
  renderProducts(products, filters);
});

window.addEventListener("storage", function (e) {
  if (e.key === "products") {
    products = JSON.parse(e.newValue);
    renderProducts(products, filters);
  }
});

document.querySelector("#sort").addEventListener("change", function (e) {
  filters.sortBy = e.target.value;
  renderProducts(products, filters);
});
