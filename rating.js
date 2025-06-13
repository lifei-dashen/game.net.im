// Rating system with multilingual support
class RatingSystem {
    constructor() {
        this.currentGame = null;
        this.ratings = JSON.parse(localStorage.getItem('gameRatings')) || {};
        this.initializeEvents();
    }

    initializeEvents() {
        // Star rating hover effects
        document.querySelectorAll('.stars .far').forEach(star => {
            star.addEventListener('mouseover', () => this.handleStarHover(star));
            star.addEventListener('mouseout', () => this.handleStarOut());
            star.addEventListener('click', () => this.handleStarClick(star));
        });
    }

    handleStarHover(star) {
        const rating = parseInt(star.getAttribute('data-rating'));
        this.updateStarsDisplay(rating);
        this.updateRatingTooltip(rating);
    }

    handleStarOut() {
        if (!this.currentGame) return;
        const currentRating = this.ratings[this.currentGame.id] || 0;
        this.updateStarsDisplay(currentRating);
        this.hideRatingTooltip();
    }

    async handleStarClick(star) {
        if (!this.currentGame) return;
        
        const rating = parseInt(star.getAttribute('data-rating'));
        const previousRating = this.ratings[this.currentGame.id];
        
        // Show rating confirmation
        const confirmed = await this.showRatingConfirmation(rating, previousRating);
        if (!confirmed) return;
        
        // Save rating
        this.ratings[this.currentGame.id] = rating;
        localStorage.setItem('gameRatings', JSON.stringify(this.ratings));
        
        // Update UI
        this.updateStarsDisplay(rating);
        this.showRatingFeedback(rating);
        
        // Update game's average rating
        this.updateGameRating(this.currentGame.id, rating);
    }

    updateStarsDisplay(rating) {
        document.querySelectorAll('.stars .far').forEach((star, index) => {
            star.classList.toggle('fas', index < rating);
            star.classList.toggle('far', index >= rating);
        });
    }

    updateRatingTooltip(rating) {
        const currentLang = languageManager.getCurrentLanguage();
        const tooltips = {
            en: ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'],
            zh: ['很差', '较差', '一般', '不错', '很棒'],
            hi: ['बहुत खराब', 'खराब', 'औसत', 'अच्छा', 'बहुत अच्छा'],
            fr: ['Terrible', 'Mauvais', 'Moyen', 'Bon', 'Excellent'],
            ar: ['سيء جداً', 'سيء', 'متوسط', 'جيد', 'ممتاز'],
            es: ['Terrible', 'Malo', 'Regular', 'Bueno', 'Excelente'],
            ja: ['最悪', '悪い', '普通', '良い', '最高'],
            ru: ['Ужасно', 'Плохо', 'Средне', 'Хорошо', 'Отлично'],
            pt: ['Terrível', 'Ruim', 'Médio', 'Bom', 'Excelente'],
            de: ['Schrecklich', 'Schlecht', 'Durchschnittlich', 'Gut', 'Ausgezeichnet'],
            ko: ['최악', '나쁨', '보통', '좋음', '최고']
        };

        const tooltip = document.getElementById('ratingTooltip');
        if (!tooltip) {
            const newTooltip = document.createElement('div');
            newTooltip.id = 'ratingTooltip';
            newTooltip.className = 'rating-tooltip';
            document.querySelector('.rating').appendChild(newTooltip);
        }

        const tooltipText = tooltips[currentLang] || tooltips.en;
        document.getElementById('ratingTooltip').textContent = tooltipText[rating - 1];
    }

    hideRatingTooltip() {
        const tooltip = document.getElementById('ratingTooltip');
        if (tooltip) {
            tooltip.textContent = '';
        }
    }

    async showRatingConfirmation(newRating, previousRating) {
        const currentLang = languageManager.getCurrentLanguage();
        const translations = {
            en: {
                title: previousRating ? 'Update Rating?' : 'Submit Rating?',
                message: previousRating 
                    ? `Would you like to change your rating from ${previousRating} to ${newRating} stars?`
                    : `Would you like to rate this game ${newRating} stars?`,
                confirm: 'Confirm',
                cancel: 'Cancel'
            },
            zh: {
                title: previousRating ? '更新评分？' : '提交评分？',
                message: previousRating 
                    ? `您想将评分从 ${previousRating} 星改为 ${newRating} 星吗？`
                    : `您想给这个游戏 ${newRating} 星评分吗？`,
                confirm: '确认',
                cancel: '取消'
            },
            // ... Add translations for other languages
        };

        const t = translations[currentLang] || translations.en;
        
        return new Promise(resolve => {
            const modal = document.createElement('div');
            modal.className = 'rating-confirmation-modal';
            modal.innerHTML = `
                <div class="rating-confirmation-content">
                    <h3>${t.title}</h3>
                    <p>${t.message}</p>
                    <div class="rating-confirmation-buttons">
                        <button class="confirm-btn">${t.confirm}</button>
                        <button class="cancel-btn">${t.cancel}</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            modal.querySelector('.confirm-btn').addEventListener('click', () => {
                modal.remove();
                resolve(true);
            });

            modal.querySelector('.cancel-btn').addEventListener('click', () => {
                modal.remove();
                resolve(false);
            });
        });
    }

    showRatingFeedback(rating) {
        const currentLang = languageManager.getCurrentLanguage();
        const feedbacks = {
            en: ['Thanks for rating!', 'Your rating has been updated!'],
            zh: ['感谢您的评分！', '您的评分已更新！'],
            // ... Add translations for other languages
        };

        const feedback = document.createElement('div');
        feedback.className = 'rating-feedback';
        feedback.textContent = feedbacks[currentLang]?.[0] || feedbacks.en[0];
        
        document.querySelector('.rating').appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }

    updateGameRating(gameId, newRating) {
        // Here you would typically send this to your backend
        // For now, we'll just update the local display
        const game = GAMES.find(g => g.id === gameId);
        if (game) {
            // Simple weighted average calculation
            game.rating = (game.rating * game.ratingCount + newRating) / (game.ratingCount + 1);
            game.ratingCount++;
            
            // Update rating display in game card
            const gameCard = document.querySelector(`[data-game-id="${gameId}"]`);
            if (gameCard) {
                const ratingElement = gameCard.querySelector('.game-rating');
                if (ratingElement) {
                    ratingElement.textContent = `★ ${game.rating.toFixed(1)}`;
                }
            }
        }
    }

    setCurrentGame(game) {
        this.currentGame = game;
        const currentRating = this.ratings[game.id] || 0;
        this.updateStarsDisplay(currentRating);
    }
}

// Initialize rating system
const ratingSystem = new RatingSystem();

// Export for use in other files
window.ratingSystem = ratingSystem; 
