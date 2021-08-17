let products = getSaveProducts();

let filters = {
  searchItem: "",
  availableProducts: false,
  sortBy: "byEdited",
};

renderProducts(products, filters);

FormBtnStatus();

document.querySelector("#add-product-form").addEventListener("submit", function (e) {
  e.preventDefault();
  let pTitle = document.querySelector(".title").value;
  let pPrice = document.querySelector(".price").value;
  let addBtn = document.querySelector(".form-btn");
  if (pTitle.trim() != 0 && pPrice.trim() != 0) {
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
    addBtn.classList.remove("active");
  }
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

document.querySelector(".delete-all-products").addEventListener("click", function (e) {
  if (confirm("آیا از حذف تمام محصولات مطمئنید?")) {
    products = [];
    localStorage.clear();
    document.querySelector("#products").innerHTML = "";
  }
});
