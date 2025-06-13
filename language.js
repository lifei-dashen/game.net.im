// Language handling functionality
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || this.getBrowserLanguage() || 'en';
        this.initLanguage();
    }

    // Get browser's language
    getBrowserLanguage() {
        const lang = navigator.language.toLowerCase().split('-')[0];
        return Object.keys(TRANSLATIONS).includes(lang) ? lang : 'en';
    }

    // Initialize language
    initLanguage() {
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        this.updateMetaTags();
        this.translatePage();
    }

    // Change language
    changeLanguage(lang) {
        if (TRANSLATIONS[lang]) {
            this.currentLang = lang;
            localStorage.setItem('preferredLanguage', lang);
            this.initLanguage();
        }
    }

    // Update meta tags for SEO
    updateMetaTags() {
        const meta = TRANSLATIONS[this.currentLang].meta;
        document.title = meta.title;
        document.querySelector('meta[name="description"]').content = meta.description;
        document.querySelector('meta[name="keywords"]').content = meta.keywords;
    }

    // Translate the page content
    translatePage() {
        const translations = TRANSLATIONS[this.currentLang];
        
        // Translate navigation
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let translation = translations;
            
            for (const k of keys) {
                if (translation && translation[k]) {
                    translation = translation[k];
                } else {
                    translation = key;
                    break;
                }
            }
            
            if (typeof translation === 'string') {
                if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Handle RTL/LTR specific styling
        const isRTL = this.currentLang === 'ar';
        document.body.style.direction = isRTL ? 'rtl' : 'ltr';
        document.body.classList.toggle('rtl', isRTL);
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLang;
    }

    // Get language name in its native form
    static getLanguageName(code) {
        const languageNames = {
            en: 'English',
            zh: '中文',
            hi: 'हिन्दी',
            fr: 'Français',
            ar: 'العربية',
            es: 'Español',
            ja: '日本語',
            ru: 'Русский',
            pt: 'Português',
            de: 'Deutsch',
            ko: '한국어'
        };
        return languageNames[code] || code;
    }
}

// Initialize language manager
const languageManager = new LanguageManager();

// Export for use in other files
window.languageManager = languageManager; 
