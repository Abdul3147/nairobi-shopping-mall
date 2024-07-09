// Initialize the shopping list array
let shoppingList = [];

// DOM elements
const itemInput = document.getElementById('item-input');
const addBtn = document.getElementById('add-btn');
const shoppingListEl = document.getElementById('shopping-list');
const clearBtn = document.getElementById('clear-btn');

// Load items from local storage
function loadItems() {
    const storedItems = localStorage.getItem('shoppingList');
    if (storedItems) {
        shoppingList = JSON.parse(storedItems);
        renderList();
    }
}

// Save items to local storage
function saveItems() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Render the shopping list
function renderList() {
    shoppingListEl.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="purchase-btn">${item.purchased ? 'Unpurchase' : 'Purchase'}</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        if (item.purchased) {
            li.classList.add('purchased');
        }
        shoppingListEl.appendChild(li);

        // Edit button functionality
        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => editItem(index));

        // Purchase button functionality
        const purchaseBtn = li.querySelector('.purchase-btn');
        purchaseBtn.addEventListener('click', () => togglePurchase(index));

        // Delete button functionality
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteItem(index));
    });
}

// Add new item
function addItem() {
    const itemName = itemInput.value.trim();
    if (itemName) {
        shoppingList.push({ name: itemName, purchased: false });
        itemInput.value = '';
        saveItems();
        renderList();
    }
}

// Edit item
function editItem(index) {
    const li = shoppingListEl.children[index];
    const span = li.querySelector('span');
    const itemName = span.textContent;

    span.innerHTML = `
        <input type="text" class="edit-input" value="${itemName}">
        <button class="save-btn">Save</button>
    `;

    const editInput = span.querySelector('.edit-input');
    const saveBtn = span.querySelector('.save-btn');

    editInput.focus();

    saveBtn.addEventListener('click', () => {
        const newName = editInput.value.trim();
        if (newName) {
            shoppingList[index].name = newName;
            saveItems();
            renderList();
        }
    });
}

// Toggle purchase status
function togglePurchase(index) {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    saveItems();
    renderList();
}

// Delete item
function deleteItem(index) {
    shoppingList.splice(index, 1);
    saveItems();
    renderList();
}

// Clear the entire list
function clearList() {
    shoppingList = [];
    saveItems();
    renderList();
}

// Event listeners
addBtn.addEventListener('click', addItem);
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});
clearBtn.addEventListener('click', clearList);

// Initial load
loadItems();
