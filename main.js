// Language selector functionality
const languageButton = document.getElementById('languageButton');
const languageDropdown = document.getElementById('languageDropdown');
const currentLanguageSpan = document.getElementById('currentLanguage');

// Toggle language dropdown
languageButton.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    languageDropdown.classList.remove('show');
});

// Loading overlay functionality
const loadingOverlay = document.getElementById('loadingOverlay');

function showLoading() {
    loadingOverlay.classList.add('show');
}

function hideLoading() {
    loadingOverlay.classList.remove('show');
}

// Update language change handler to include loading animation
languageDropdown.addEventListener('click', async (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const selectedLang = e.target.getAttribute('data-lang');
        
        showLoading();
        
        try {
            // Change language
            languageManager.changeLanguage(selectedLang);
            currentLanguageSpan.textContent = LanguageManager.getLanguageName(selectedLang);
            
            // Update game cards
            await updateGameCards();
            
            // Update category names
            updateCategoryNames(selectedLang);
            
            // Simulate loading time for smooth transition
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error('Error changing language:', error);
        } finally {
            hideLoading();
            languageDropdown.classList.remove('show');
        }
    }
});

// Update category names based on language
function updateCategoryNames(lang) {
    Object.keys(CATEGORIES).forEach(categoryKey => {
        const category = CATEGORIES[categoryKey];
        const elements = document.querySelectorAll(`[data-category="${categoryKey}"]`);
        elements.forEach(element => {
            const translation = category.translations[lang] || category.translations.en;
            element.textContent = `${category.icon} ${translation}`;
        });
    });
}

// Update game cards with loading state
async function updateGameCards() {
    const currentLang = languageManager.getCurrentLanguage();
    
    const gameCards = document.querySelectorAll('.game-card');
    const updatePromises = Array.from(gameCards).map(async card => {
        const gameId = card.getAttribute('data-game-id');
        const game = GAMES.find(g => g.id === gameId);
        
        if (game && game.translations && game.translations[currentLang]) {
            const translation = game.translations[currentLang];
            
            // Animate the text change
            const titleElement = card.querySelector('.game-title');
            const descElement = card.querySelector('.game-description');
            
            // Fade out
            titleElement.style.opacity = '0';
            descElement.style.opacity = '0';
            
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Update content
            titleElement.textContent = translation.title || game.title;
            descElement.textContent = translation.description || game.description;
            
            // Fade in
            titleElement.style.opacity = '1';
            descElement.style.opacity = '1';
        }
    });
    
    await Promise.all(updatePromises);
}

// Initialize game cards with current language
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = languageManager.getCurrentLanguage();
    updateCategoryNames(currentLang);
    updateGameCards();
});

// Initialize current language display
currentLanguageSpan.textContent = LanguageManager.getLanguageName(languageManager.getCurrentLanguage());

// Font loading handler
document.documentElement.classList.add('fonts-loading');
document.fonts.ready.then(() => {
    document.documentElement.classList.remove('fonts-loading');
    document.documentElement.classList.add('fonts-loaded');
});

// Game loading and caching
class GameLoader {
    constructor() {
        this.cache = new Map();
        this.loadingGames = new Set();
        this.observer = null;
        this.initIntersectionObserver();
    }

    initIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const gameCard = entry.target;
                    const gameId = gameCard.getAttribute('data-game-id');
                    this.loadGameAssets(gameId);
                }
            });
        }, {
            rootMargin: '50px'
        });
    }

    async loadGameAssets(gameId) {
        if (this.loadingGames.has(gameId) || this.cache.has(gameId)) return;
        
        this.loadingGames.add(gameId);
        const game = GAMES.find(g => g.id === gameId);
        
        if (game) {
            try {
                // Preload game thumbnail
                if (game.thumbnail) {
                    const img = new Image();
                    img.src = game.thumbnail;
                    await img.decode();
                }
                
                // Cache game data
                this.cache.set(gameId, {
                    thumbnail: game.thumbnail,
                    loaded: true,
                    timestamp: Date.now()
                });
                
                // Update UI to show loaded state
                this.updateGameCardUI(gameId);
            } catch (error) {
                console.error(`Error loading game assets for ${gameId}:`, error);
            } finally {
                this.loadingGames.delete(gameId);
            }
        }
    }

    updateGameCardUI(gameId) {
        const gameCard = document.querySelector(`[data-game-id="${gameId}"]`);
        if (gameCard) {
            gameCard.classList.add('loaded');
            const thumbnail = gameCard.querySelector('.game-thumbnail');
            if (thumbnail) {
                thumbnail.style.opacity = '1';
            }
        }
    }

    observeGameCard(gameCard) {
        this.observer.observe(gameCard);
    }

    clearCache() {
        const now = Date.now();
        const maxAge = 30 * 60 * 1000; // 30 minutes
        
        for (const [gameId, data] of this.cache.entries()) {
            if (now - data.timestamp > maxAge) {
                this.cache.delete(gameId);
            }
        }
    }
}

// Initialize game loader
const gameLoader = new GameLoader();

// Create game card element
function createGameCard(game) {
    const currentLang = languageManager.getCurrentLanguage();
    const translation = game.translations[currentLang] || game.translations.en;
    
    const card = document.createElement('div');
    card.className = 'game-card';
    card.setAttribute('data-game-id', game.id);
    
    card.innerHTML = `
        <div class="game-thumbnail" style="opacity: 0; transition: opacity 0.3s ease">
            <img src="images/placeholder.png" data-src="${game.thumbnail}" alt="${translation.title}">
        </div>
        <div class="game-info">
            <h3 class="game-title">${translation.title}</h3>
            <p class="game-description">${translation.description}</p>
            <div class="game-meta">
                <span class="game-rating">★ ${game.rating.toFixed(1)}</span>
                <span class="game-plays">${game.plays.toLocaleString(currentLang)} ${TRANSLATIONS[currentLang].ui.plays}</span>
            </div>
        </div>
    `;
    
    // Add click handler
    card.addEventListener('click', () => {
        router.navigate(`/games/${game.id}`);
    });
    
    // Observe for lazy loading
    gameLoader.observeGameCard(card);
    
    return card;
}

// Load games for a category
async function loadGames(category) {
    showLoading();
    
    try {
        const gamesContainer = document.getElementById('gamesContainer');
        gamesContainer.innerHTML = '';
        
        const filteredGames = category === 'all' 
            ? GAMES 
            : GAMES.filter(game => game.category === category);
        
        const fragment = document.createDocumentFragment();
        
        filteredGames.forEach(game => {
            const card = createGameCard(game);
            fragment.appendChild(card);
        });
        
        gamesContainer.appendChild(fragment);
    } finally {
        hideLoading();
    }
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', debounce(async (e) => {
    const query = e.target.value.toLowerCase();
    const currentLang = languageManager.getCurrentLanguage();
    
    if (query.length < 2) {
        searchResults.classList.add('hidden');
        return;
    }
    
    showLoading();
    
    try {
        const results = GAMES.filter(game => {
            const translation = game.translations[currentLang] || game.translations.en;
            return translation.title.toLowerCase().includes(query) ||
                   translation.description.toLowerCase().includes(query);
        });
        
        const searchResultsGrid = document.getElementById('searchResultsGrid');
        searchResultsGrid.innerHTML = '';
        
        if (results.length > 0) {
            results.forEach(game => {
                const card = createGameCard(game);
                searchResultsGrid.appendChild(card);
            });
            searchResults.classList.remove('hidden');
        } else {
            searchResults.classList.add('hidden');
        }
    } finally {
        hideLoading();
    }
}, 300));

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Redirect to localized route if needed
    if (!window.location.pathname.match(/^\/[a-z]{2}\//)) {
        router.redirectToLocalizedHome();
    }
    
    // Start cache cleanup interval
    setInterval(() => gameLoader.clearCache(), 5 * 60 * 1000); // Every 5 minutes
}); 
