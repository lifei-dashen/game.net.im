// Multi-language router
class Router {
    constructor() {
        this.routes = new Map();
        this.currentLang = '';
        this.defaultLang = 'en';
        this.supportedLangs = ['en', 'zh', 'hi', 'fr', 'ar', 'es', 'ja', 'ru', 'pt', 'de', 'ko'];
        
        // Initialize router
        this.init();
    }
    
    init() {
        // Handle initial route
        this.handleRoute();
        
        // Listen for route changes
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Handle link clicks
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('/')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                this.navigate(href);
            }
        });
    }
    
    handleRoute() {
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(Boolean);
        
        // Check if first part is a language code
        if (pathParts.length > 0 && this.supportedLangs.includes(pathParts[0])) {
            this.currentLang = pathParts[0];
            pathParts.shift();
        } else {
            this.currentLang = this.getBrowserLanguage();
        }
        
        // Update language
        languageManager.changeLanguage(this.currentLang);
        
        // Construct route path
        const routePath = '/' + pathParts.join('/');
        
        // Find and execute route handler
        const handler = this.routes.get(routePath) || this.routes.get('*');
        if (handler) {
            handler(this.currentLang, pathParts);
        }
    }
    
    getBrowserLanguage() {
        const lang = navigator.language.toLowerCase().split('-')[0];
        return this.supportedLangs.includes(lang) ? lang : this.defaultLang;
    }
    
    navigate(path, replaceCurrent = false) {
        // Ensure path starts with language code
        if (!this.supportedLangs.some(lang => path.startsWith('/' + lang + '/'))) {
            path = '/' + this.currentLang + path;
        }
        
        // Update URL
        if (replaceCurrent) {
            window.history.replaceState(null, '', path);
        } else {
            window.history.pushState(null, '', path);
        }
        
        // Handle new route
        this.handleRoute();
    }
    
    addRoute(path, handler) {
        this.routes.set(path, handler);
    }
    
    generateUrl(path, lang = null) {
        const targetLang = lang || this.currentLang;
        return '/' + targetLang + path;
    }
    
    redirectToLocalizedHome() {
        const lang = this.getBrowserLanguage();
        this.navigate('/' + lang + '/', true);
    }
}

// Create router instance
const router = new Router();

// Add routes
router.addRoute('/', (lang) => {
    // Home page handler
    document.title = TRANSLATIONS[lang].meta.title;
    loadGames('all');
});

router.addRoute('/games', (lang) => {
    // Games list page handler
    document.title = TRANSLATIONS[lang].meta.title + ' - ' + TRANSLATIONS[lang].sections.allGames;
    loadGames('all');
});

router.addRoute('/games/category/:category', (lang, params) => {
    // Category page handler
    const category = params[2];
    document.title = TRANSLATIONS[lang].meta.title + ' - ' + TRANSLATIONS[lang].sections[category];
    loadGames(category);
});

router.addRoute('/games/:gameId', (lang, params) => {
    // Individual game page handler
    const gameId = params[1];
    const game = GAMES.find(g => g.id === gameId);
    if (game) {
        const gameTitle = game.translations[lang]?.title || game.translations.en.title;
        document.title = gameTitle + ' - ' + TRANSLATIONS[lang].meta.title;
        openGameModal(game);
    }
});

// 404 route
router.addRoute('*', (lang) => {
    document.title = '404 - ' + TRANSLATIONS[lang].meta.title;
    // Show 404 page
});

// Export router
window.router = router; 
