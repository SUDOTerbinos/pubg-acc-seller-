// Global variables
let accounts = []
let filteredAccounts = []

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
  loadAccounts()
})

// Initialize application
function initializeApp() {
  setupSmoothScrolling()
}

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  document.getElementById("search-input").addEventListener("input", filterAccounts)

  // Filter functionality
  document.getElementById("tier-filter").addEventListener("change", filterAccounts)
  document.getElementById("price-filter").addEventListener("change", filterAccounts)

  // Hero buttons
  document.querySelector(".btn-primary").addEventListener("click", () => {
    document.getElementById("accounts").scrollIntoView({ behavior: "smooth" })
  })
}

// Load accounts data
async function loadAccounts() {
  try {
    // In a real application, this would fetch from your Python backend
    // For now, we'll use mock data
    accounts = await fetchAccountsFromAPI()
    filteredAccounts = [...accounts]
    renderFeaturedAccounts()
    renderAllAccounts()
  } catch (error) {
    console.error("Error loading accounts:", error)
    showErrorMessage("Failed to load accounts. Please try again later.")
  }
}

// Mock API call (replace with actual API endpoint)
async function fetchAccountsFromAPI() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    {
      id: 1,
      title: "Conqueror Account - Season 24",
      level: 85,
      tier: "conqueror",
      tierDisplay: "Conqueror",
      kd: 4.2,
      price: 299,
      images: [
        "public/photo_2025-07-06_19-18-41.jpg",
        "public/photo_2025-07-06_19-18-43.jpg",
        "public/photo_2025-07-06_19-18-46.jpg"
      ],
      badges: ["verified", "premium"],
      stats: { matches: 1250, wins: 320, survival: "15.2 min" },
      featured: true,
    },
    {
      id: 2,
      title: "Ace Master - Rare Skins",
      level: 72,
      tier: "ace",
      tierDisplay: "Ace Master",
      kd: 3.8,
      price: 199,
      images: [
        "public/photo_2025-07-06_19-19-03.jpg",
        "public/photo_2025-07-06_19-19-05.jpg",
        "public/photo_2025-07-06_19-19-06.jpg"
      ],
      badges: ["hot", "premium"],
      stats: { matches: 980, wins: 245, survival: "12.8 min" },
      featured: true,
    },
    {
      id: 3,
      title: "Crown V - Full Collection",
      level: 68,
      tier: "crown",
      tierDisplay: "Crown V",
      kd: 3.2,
      price: 149,
      images: [
        "https://pubg-account-images.s3.amazonaws.com/crown/1.jpg",
        "https://pubg-account-images.s3.amazonaws.com/crown/2.jpg",
        "https://pubg-account-images.s3.amazonaws.com/crown/3.jpg"
      ],
      badges: ["verified"],
      stats: { matches: 750, wins: 180, survival: "11.5 min" },
      featured: true,
    },
    {
      id: 4,
      title: "Diamond III - Starter Pack",
      level: 45,
      tier: "diamond",
      tierDisplay: "Diamond III",
      kd: 2.8,
      price: 89,
      images: [
        "https://pubg-account-images.s3.amazonaws.com/diamond/1.jpg",
        "https://pubg-account-images.s3.amazonaws.com/diamond/2.jpg",
        "https://pubg-account-images.s3.amazonaws.com/diamond/3.jpg"
      ],
      badges: ["verified"],
      stats: { matches: 420, wins: 95, survival: "9.2 min" },
      featured: false,
    },
    {
      id: 5,
      title: "Platinum I - Good Stats",
      level: 38,
      tier: "platinum",
      tierDisplay: "Platinum I",
      kd: 2.4,
      price: 59,
      images: [
        "https://pubg-account-images.s3.amazonaws.com/platinum/1.jpg",
        "https://pubg-account-images.s3.amazonaws.com/platinum/2.jpg",
        "https://pubg-account-images.s3.amazonaws.com/platinum/3.jpg"
      ],
      badges: ["hot"],
      stats: { matches: 320, wins: 68, survival: "8.1 min" },
      featured: false,
    },
    {
      id: 6,
      title: "Ace - Mythic Outfits",
      level: 78,
      tier: "ace",
      tierDisplay: "Ace",
      kd: 3.9,
      price: 249,
      images: [
        "https://pubg-account-images.s3.amazonaws.com/ace-mythic/1.jpg",
        "https://pubg-account-images.s3.amazonaws.com/ace-mythic/2.jpg",
        "https://pubg-account-images.s3.amazonaws.com/ace-mythic/3.jpg"
      ],
      badges: ["premium", "verified"],
      stats: { matches: 1100, wins: 285, survival: "14.1 min" },
      featured: false,
    },
  ]
}

// Render featured accounts
function renderFeaturedAccounts() {
  const featuredContainer = document.getElementById("featured-accounts")
  const featuredAccounts = accounts.filter((account) => account.featured)

  featuredContainer.innerHTML = featuredAccounts.map((account) => createAccountCard(account, true)).join("")

  // Add event listeners to featured account cards
  featuredAccounts.forEach((account) => {
    addAccountCardListeners(account.id)
  })
}

// Render all accounts
function renderAllAccounts() {
  const accountsContainer = document.getElementById("accounts-grid")

  if (filteredAccounts.length === 0) {
    accountsContainer.innerHTML = '<div class="no-results">No accounts found matching your criteria.</div>'
    return
  }

  accountsContainer.innerHTML = filteredAccounts.map((account) => createAccountCard(account, false)).join("")

  // Add event listeners to account cards
  filteredAccounts.forEach((account) => {
    addAccountCardListeners(account.id)
  })
}

// Create account card HTML
function createAccountCard(account, isFeatured) {
  const badgeHTML = account.badges
    .map((badge) => {
      const badgeClass = `badge-${badge}`
      const badgeText = badge.charAt(0).toUpperCase() + badge.slice(1)
      return `<span class="badge ${badgeClass}">${badgeText}</span>`
    })
    .join("")

  // Get the first image as the main image, or use a placeholder if none exists
  const mainImage = account.images && account.images.length > 0 
    ? account.images[0] 
    : '/images/placeholder.jpg';

  return `
    <div class="account-card" data-id="${account.id}">
      <div class="card-image" onclick="showImageGallery(${account.id})">
        <img 
          src="${mainImage}" 
          alt="${account.title}" 
          onerror="this.onerror=null; this.src='/public/photo_2025-07-06_19-18-39.jpg'"
          loading="lazy"
        >
        <div class="tier-badge tier-${account.tier}">${account.tierDisplay}</div>
        ${account.images && account.images.length > 1 
          ? `<div class="gallery-indicator">
               <i class="fas fa-images"></i> ${account.images.length} images
             </div>` 
          : ''}
      </div>
      <div class="card-content">
        ${badgeHTML ? `<div class="card-badges">${badgeHTML}</div>` : ''}
        <h4>${account.title}</h4>
        <div class="card-stats">
          <div class="stat">
            <i class="fas fa-trophy"></i>
            <span>Level ${account.level}</span>
          </div>
          <div class="stat">
            <i class="fas fa-crosshairs"></i>
            <span>KD: ${account.kd}</span>
          </div>
        </div>
        <div class="card-price">
          <span class="price">$${account.price}</span>
          <a href="contact.html" class="btn-buy">
            <i class="fas fa-shopping-cart"></i>
            Buy Now
          </a>
        </div>
      </div>
    </div>
  `
}

// Add event listeners to account cards
function addAccountCardListeners(accountId) {
  // No longer needed as we're using regular links now
}

// Filter accounts based on search and filters
function filterAccounts() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase()
  const tierFilter = document.getElementById("tier-filter").value
  const priceFilter = document.getElementById("price-filter").value

  filteredAccounts = accounts.filter((account) => {
    // Filter by search term
    const matchesSearch = account.title.toLowerCase().includes(searchTerm) ||
                         account.tierDisplay.toLowerCase().includes(searchTerm)
    
    // Filter by tier
    const matchesTier = tierFilter === "all" || account.tier === tierFilter
    
    // Filter by price range
    let matchesPrice = true
    if (priceFilter !== "all") {
      const [min, max] = priceFilter.split('-')
      matchesPrice = account.price >= parseInt(min) && 
                    (max === '+' ? true : account.price <= parseInt(max))
    }
    
    return matchesSearch && matchesTier && matchesPrice
  })

  renderAllAccounts()
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
  `
  
  document.body.appendChild(notification)
  
  // Auto remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.add("fade-out")
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

// Get notification icon based on type
function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "fas fa-check-circle"
    case "error":
      return "fas fa-exclamation-circle"
    case "warning":
      return "fas fa-exclamation-triangle"
    case "info":
    default:
      return "fas fa-info-circle"
  }
}

// Setup smooth scrolling for navigation
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
}

// Show error message
function showErrorMessage(message) {
  const errorDiv = document.createElement("div")
  errorDiv.className = "error-message"
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-circle"></i>
    <span>${message}</span>
  `
  
  const accountsSection = document.getElementById("accounts")
  if (accountsSection) {
    accountsSection.insertBefore(errorDiv, accountsSection.firstChild)
  } else {
    document.body.insertBefore(errorDiv, document.body.firstChild)
  }
  
  // Auto remove error after 5 seconds
  setTimeout(() => {
    errorDiv.classList.add("fade-out")
    setTimeout(() => errorDiv.remove(), 300)
  }, 5000)
}

// Utility function to format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

// Apply debounce to search
const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input")
  if (searchInput) {
    const debouncedFilter = debounce(filterAccounts, 300)
    searchInput.addEventListener("input", debouncedFilter)
  }
})

// Show image gallery modal
function showImageGallery(accountId) {
  const account = accounts.find(acc => acc.id === accountId);
  if (!account || !account.images || account.images.length === 0) return;

  // Create gallery HTML with proper styling
  const galleryHTML = `
    <div class="gallery-modal" id="gallery-modal">
      <div class="gallery-content">
        <span class="close-gallery" onclick="closeImageGallery()">&times;</span>
        <div class="gallery-main">
          <img src="${account.images[0]}" id="main-gallery-image" alt="${account.title}">
        </div>
        <div class="gallery-controls">
          <button class="gallery-nav prev" onclick="navigateGallery(${accountId}, -1)">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="gallery-thumbnails">
            ${account.images.map((img, index) => `
              <img src="${img}" 
                   alt="Thumbnail ${index + 1}" 
                   class="gallery-thumbnail ${index === 0 ? 'active' : ''}" 
                   onclick="changeGalleryImage(${index}, ${accountId})">
            `).join('')}
          </div>
          <button class="gallery-nav next" onclick="navigateGallery(${accountId}, 1)">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  // Add gallery to the page
  const galleryDiv = document.createElement('div');
  galleryDiv.innerHTML = galleryHTML;
  document.body.appendChild(galleryDiv);
  document.body.style.overflow = 'hidden';
  
  // Add keyboard navigation
  document.addEventListener('keydown', handleKeyNavigation);
}

// Add navigation function
function navigateGallery(accountId, direction) {
  const account = accounts.find(acc => acc.id === accountId);
  if (!account) return;
  
  const currentImg = document.querySelector('.gallery-thumbnail.active');
  if (!currentImg) return;
  
  const currentIndex = Array.from(document.querySelectorAll('.gallery-thumbnail')).indexOf(currentImg);
  let newIndex = currentIndex + direction;
  
  // Wrap around if needed
  if (newIndex < 0) newIndex = account.images.length - 1;
  if (newIndex >= account.images.length) newIndex = 0;
  
  changeGalleryImage(newIndex, accountId);
}

// Handle keyboard navigation
function handleKeyNavigation(e) {
  const gallery = document.getElementById('gallery-modal');
  if (!gallery) return;
  
  const currentCard = document.querySelector('.gallery-thumbnail.active');
  if (!currentCard) return;
  
  const accountId = parseInt(currentCard.closest('.gallery-content').dataset.accountId);
  
  switch(e.key) {
    case 'ArrowLeft':
      navigateGallery(accountId, -1);
      break;
    case 'ArrowRight':
      navigateGallery(accountId, 1);
      break;
    case 'Escape':
      closeImageGallery();
      break;
  }
}

// Update the changeGalleryImage function
function changeGalleryImage(index, accountId) {
  const account = accounts.find(acc => acc.id === accountId);
  if (!account || !account.images[index]) return;

  // Update main image
  const mainImg = document.getElementById('main-gallery-image');
  if (mainImg) {
    mainImg.src = account.images[index];
    mainImg.alt = `${account.title} - Image ${index + 1}`;
  }

  // Update active thumbnail
  document.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
    if (i === index) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

// Update closeImageGallery to clean up event listeners
function closeImageGallery() {
  const gallery = document.getElementById('gallery-modal');
  if (gallery) {
    document.removeEventListener('keydown', handleKeyNavigation);
    gallery.remove();
    document.body.style.overflow = 'auto';
  }
}
