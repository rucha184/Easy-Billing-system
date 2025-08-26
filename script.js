const itemForm = document.getElementById("item-form");
const invoiceBody = document.getElementById("invoice-body");
const grandTotalEl = document.getElementById("grand-total");

let grandTotal = 0;

itemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("item-name").value;
  const qty = parseInt(document.getElementById("item-qty").value);
  const price = parseFloat(document.getElementById("item-price").value);
  const total = qty * price;

  // Add row to invoice table
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${name}</td>
    <td>${qty}</td>
    <td>₹${price.toFixed(2)}</td>
    <td>₹${total.toFixed(2)}</td>
    <td><button class="btn btn-sm btn-danger remove-btn">Remove</button></td>
  `;
  invoiceBody.appendChild(row);

  // Update total
  grandTotal += total;
  grandTotalEl.textContent = `Grand Total: ₹${grandTotal.toFixed(2)}`;

  // Clear form
  itemForm.reset();
});

// Remove item
invoiceBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    const row = e.target.closest("tr");
    const total = parseFloat(row.children[3].textContent.replace("₹", ""));
    grandTotal -= total;
    grandTotalEl.textContent = `Grand Total: ₹${grandTotal.toFixed(2)}`;
    row.remove();
  }
});
