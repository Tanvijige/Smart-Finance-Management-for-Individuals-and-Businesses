// JavaScript code for the expense tracker

// Selectors
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseDateInput = document.getElementById("expense-date");
const expenseTableBody = document.querySelector("#expense-table tbody");
const monthFilter = document.getElementById("month-filter");
const yearFilter = document.getElementById("year-filter");
const filterBtn = document.getElementById("filter-btn");
const resetBtn = document.getElementById("reset-btn");

// Event Listeners
document.querySelector(".btn-outline-info").addEventListener("click", addExpense);
filterBtn.addEventListener("click", filterExpenses);
resetBtn.addEventListener("click", resetFilters);

// Array to store expenses
let expenses = [];

// Function to add expense
function addExpense() {
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value.trim());
  const date = expenseDateInput.value;

  if (!name || isNaN(amount) || !date) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const expense = {
    id: Date.now(),
    name,
    amount,
    date,
  };

  expenses.push(expense);
  renderTable(expenses);
  expenseForm.reset();
}

// Function to render the table
function renderTable(expenseList) {
  expenseTableBody.innerHTML = ""; // Clear table

  expenseList.forEach((expense) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${expense.name}</td>
      <td>${expense.amount.toFixed(2)}</td>
      <td>${expense.date}</td>
      <td>
        <button class="delete-btn" data-id="${expense.id}">Delete</button>
      </td>
    `;

    expenseTableBody.appendChild(row);
  });

  // Attach delete event to buttons
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", deleteExpense);
  });
}

// Function to delete an expense
function deleteExpense(event) {
  const expenseId = parseInt(event.target.dataset.id, 10);
  expenses = expenses.filter((expense) => expense.id !== expenseId);
  renderTable(expenses);
}

// Function to filter expenses
function filterExpenses() {
  const month = monthFilter.value;
  const year = yearFilter.value.trim();

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth() + 1; // Months are 0-based
    const expenseYear = expenseDate.getFullYear();

    return (
      (!month || expenseMonth === parseInt(month, 10)) &&
      (!year || expenseYear === parseInt(year, 10))
    );
  });

  renderTable(filteredExpenses);
}

// Function to reset filters
function resetFilters() {
  monthFilter.value = "";
  yearFilter.value = "";
  renderTable(expenses);
}
