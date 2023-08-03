// Select DOM elements
const amountInput = document.getElementById('amount');
const incomeRadio = document.getElementById('income');
const expenseRadio = document.getElementById('expense');
const descriptionInput = document.getElementById('description');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const balanceAmount = document.getElementById('balance-amount');
const transactionsList = document.getElementById('transactions-list');

// Define transaction variables
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let balance = JSON.parse(localStorage.getItem('balance')) || 0;

// Add transaction to the list and update balance
function addTransaction(amount, type, description) {
  // Create new transaction object
  const transaction = {
    id: Math.floor(Math.random() * 100000000),
    amount: +amount,
    type: type,
    description: description
  };

  // Add transaction to the list
  transactions.push(transaction);
  updateTransactionsList();

  // Update balance
  if (type === 'income') {
    balance += transaction.amount;
  } else if (type === 'expense') {
    balance -= transaction.amount;
  }
  updateBalance();

  // Save data to local storage
  saveDataToLocalStorage();
}

// Update the transactions list
function updateTransactionsList() {
  transactionsList.innerHTML = '';
  transactions.forEach((transaction) => {
    const li = document.createElement('li');
    li.classList.add('transaction', transaction.type);
    li.innerHTML = `
      <span>${transaction.description}</span>
      <span>${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}</span>
      <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
    `;
    transactionsList.appendChild(li);
  });
}

// Update the balance amount
function updateBalance() {
  balanceAmount.innerText = `$${balance.toFixed(2)}`;
  if (balance < 0) {
    balanceAmount.style.color = 'red';
  } else {
    balanceAmount.style.color = 'green';
  }
}

// Delete transaction by id
function deleteTransaction(id) {
  const transactionToDelete = transactions.find((transaction) => transaction.id === id);
  if (transactionToDelete) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    updateTransactionsList();

    // Update balance
    if (transactionToDelete.type === 'income') {
      balance -= transactionToDelete.amount;
    } else if (transactionToDelete.type === 'expense') {
      balance += transactionToDelete.amount;
    }
    updateBalance();

    // Save data to local storage
    saveDataToLocalStorage();
  }
}

// Reset balance and local storage
function reset() {
  transactions = [];
  balance = 0;
  updateTransactionsList();
  updateBalance();
  localStorage.clear();
}

// Save data to local storage
function saveDataToLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
  localStorage.setItem('balance', JSON.stringify(balance));
}

// Initialize app with transactions from local storage
function init() {
  updateTransactionsList();
  updateBalance();
}

init();

// Add click event listener to submit button
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const amount = amountInput.value.trim();
  const type = incomeRadio.checked ? 'income' : 'expense';
  const description = descriptionInput.value.trim();

  if (amount && type && description) {
    addTransaction(amount, type, description);

    // Clear form inputs
    amountInput.value = '';
    descriptionInput.value = '';
  }
});

// Add click event listener to reset button
resetBtn.addEventListener('click', () => {
  reset();
});