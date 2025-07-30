// Admin Panel JavaScript
let accounts = [];

// Initialize the admin panel
document.addEventListener('DOMContentLoaded', () => {
    loadAccounts();
    setupEventListeners();
});

// Load accounts from localStorage or initialize with empty array
function loadAccounts() {
    const savedAccounts = localStorage.getItem('pubgAccounts');
    accounts = savedAccounts ? JSON.parse(savedAccounts) : [];
    renderAccounts();
}

// Save accounts to localStorage
function saveAccounts() {
    localStorage.setItem('pubgAccounts', JSON.stringify(accounts));
}

// Setup event listeners
function setupEventListeners() {
    // Add account form submission
    document.getElementById('add-account-form').addEventListener('submit', handleAddAccount);
    
    // Image preview for textarea
    document.getElementById('account-images').addEventListener('input', updateImagePreview);
}

// Handle adding a new account
function handleAddAccount(e) {
    e.preventDefault();
    
    const newAccount = {
        id: Date.now(), // Simple ID generation
        title: document.getElementById('account-title').value,
        tier: document.getElementById('account-tier').value,
        tierDisplay: document.getElementById('account-tier').options[document.getElementById('account-tier').selectedIndex].text,
        level: parseInt(document.getElementById('account-level').value),
        kd: parseFloat(document.getElementById('account-kd').value),
        price: parseFloat(document.getElementById('account-price').value),
        status: document.getElementById('account-status').value,
        badges: document.getElementById('account-badges').value
            .split(',')
            .map(badge => badge.trim())
            .filter(badge => badge),
        images: document.getElementById('account-images').value
            .split('\n')
            .map(url => url.trim())
            .filter(url => url),
        stats: {
            matches: Math.floor(Math.random() * 1000) + 100,
            wins: Math.floor(Math.random() * 200) + 20,
            survival: (Math.random() * 10 + 5).toFixed(1) + ' min'
        },
        featured: Math.random() > 0.5
    };

    accounts.unshift(newAccount);
    saveAccounts();
    renderAccounts();
    
    // Reset form
    e.target.reset();
    document.getElementById('preview-images').innerHTML = '';
    
    // Show success message
    alert('Account added successfully!');
    showSection('manage-accounts');
}

// Render all accounts in the manage section
function renderAccounts() {
    const container = document.getElementById('accounts-container');
    if (!container) return;

    container.innerHTML = accounts.map(account => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden account-card relative">
            ${account.status === 'sold' ? 
                '<div class="sold-tag bg-red-500 text-white text-xs px-2 py-1 rounded">SOLD</div>' : 
                '<div class="sold-tag bg-green-500 text-white text-xs px-2 py-1 rounded">AVAILABLE</div>'
            }
            <div class="relative h-48 overflow-hidden">
                <img src="${account.images[0] || 'public/photo_2025-07-06_19-18-39.jpg'}" 
                     alt="${account.title}" 
                     class="w-full h-full object-cover">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 class="text-white font-bold text-lg">${account.title}</h3>
                    <div class="flex items-center text-white text-sm">
                        <span class="bg-blue-500 px-2 py-1 rounded mr-2">${account.tierDisplay}</span>
                        <span>$${account.price}</span>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-center mb-2">
                    <div class="text-gray-600">Level ${account.level}</div>
                    <div class="text-gray-800 font-bold">KD: ${account.kd}</div>
                </div>
                <div class="flex space-x-2 mb-3">
                    ${account.badges.map(badge => 
                        `<span class="text-xs bg-gray-200 px-2 py-1 rounded">${badge}</span>`
                    ).join('')}
                </div>
                <div class="flex justify-between">
                    <button onclick="toggleAccountStatus(${account.id})" 
                            class="text-sm ${account.status === 'sold' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white px-3 py-1 rounded">
                        ${account.status === 'sold' ? 'Mark Available' : 'Mark Sold'}
                    </button>
                    <button onclick="confirmDelete(${account.id})" 
                            class="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle account status between sold and available
function toggleAccountStatus(accountId) {
    const account = accounts.find(acc => acc.id === accountId);
    if (account) {
        account.status = account.status === 'sold' ? 'available' : 'sold';
        saveAccounts();
        renderAccounts();
    }
}

// Confirm before deleting an account
function confirmDelete(accountId) {
    if (confirm('Are you sure you want to delete this account? This action cannot be undone.')) {
        deleteAccount(accountId);
    }
}

// Delete an account
function deleteAccount(accountId) {
    accounts = accounts.filter(acc => acc.id !== accountId);
    saveAccounts();
    renderAccounts();
}

// Show/hide sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Update image preview in the add account form
function updateImagePreview() {
    const previewContainer = document.getElementById('preview-images');
    if (!previewContainer) return;
    
    const urls = document.getElementById('account-images').value
        .split('\n')
        .map(url => url.trim())
        .filter(url => url);
    
    previewContainer.innerHTML = urls.map(url => `
        <div class="relative group">
            <img src="${url}" alt="Preview" class="w-full h-40 object-cover rounded">
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button onclick="removeImage(this, '${url}')" class="text-white bg-red-500 rounded-full p-2">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    // Show preview modal if there are images
    if (urls.length > 0) {
        document.getElementById('image-preview-modal').classList.remove('hidden');
    } else {
        closeImagePreview();
    }
}

// Close image preview modal
function closeImagePreview() {
    document.getElementById('image-preview-modal').classList.add('hidden');
}

// Remove image from preview and textarea
function removeImage(button, urlToRemove) {
    const textarea = document.getElementById('account-images');
    const urls = textarea.value
        .split('\n')
        .map(url => url.trim())
        .filter(url => url && url !== urlToRemove);
    
    textarea.value = urls.join('\n');
    updateImagePreview();
}

// Export accounts data (for backup)
function exportAccounts() {
    const dataStr = JSON.stringify(accounts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `pubg-accounts-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Import accounts data (from backup)
function importAccounts(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedAccounts = JSON.parse(e.target.result);
            if (confirm(`This will import ${importedAccounts.length} accounts. Continue?`)) {
                accounts = importedAccounts;
                saveAccounts();
                renderAccounts();
                alert('Accounts imported successfully!');
            }
        } catch (error) {
            alert('Error importing accounts. Please check the file format.');
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);
    
    // Reset the input to allow re-importing the same file
    event.target.value = '';
}

// Add export/import buttons to the UI
function addExportImportButtons() {
    const manageSection = document.getElementById('manage-accounts');
    if (!manageSection) return;
    
    const buttonsHtml = `
        <div class="flex justify-end mb-4 space-x-4">
            <label class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                <i class="fas fa-file-import mr-2"></i> Import
                <input type="file" class="hidden" accept=".json" onchange="importAccounts(event)">
            </label>
            <button onclick="exportAccounts()" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                <i class="fas fa-file-export mr-2"></i> Export
            </button>
        </div>
    `;
    
    manageSection.insertAdjacentHTML('afterbegin', buttonsHtml);
}

// Initialize export/import buttons when the page loads
window.addEventListener('load', addExportImportButtons);
