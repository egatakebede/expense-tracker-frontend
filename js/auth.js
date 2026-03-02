document.addEventListener('DOMContentLoaded', () {});document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const form = document.getElementById("expenseForm");
  const list = document.getElementById("expensesList");
  let editId = null; // Stores id of the expense being edited

  // Load all expenses
  async function loadExpenses() {
    const res = await get("/expenses/", token);
    list.innerHTML = "";
    res.expenses?.forEach(exp => {
      const li = document.createElement("li");
      li.innerText = `${exp.title} - $${exp.amount} (${exp.category})`;

      // Edit button
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.onclick = () => {
        editId = exp.id;
        form.title.value = exp.title;
        form.amount.value = exp.amount;
        form.category.value = exp.category;
        form.notes.value = exp.notes;
        form.spent_at.value = exp.spent_at.split("T")[0]; // show date only
      };

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.onclick = async () => {
        await del(`/expenses/${exp.id}`, token);
        loadExpenses();
      };

      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }

  // Form submit handler
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        title: form.title.value,
        amount: parseFloat(form.amount.value),
        category: form.category.value,
        notes: form.notes.value,
        spent_at: new Date(form.spent_at.value).toISOString(),
      };

      if (editId) {
        // Update existing expense
        await put(`/expenses/${editId}`, data, token);
        editId = null; // reset edit state
      } else {
        // Create new expense
        await post("/expenses/", data, token);
      }

      form.reset();
      loadExpenses();
    });
  }

  loadExpenses();
});