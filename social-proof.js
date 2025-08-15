// Reviews data
const REVIEWS = {
    flavor: [
        {
            rating: 5,
            quote: "Bright orange flavor—clean, not candy-sweet. It actually makes the habit easy.",
            author: "Maya R.",
        },
        {
            rating: 5,
            quote: "Tastes like fresh citrus. I take two after my morning coffee and never forget.",
            author: "Jules D.",
        },
        {
            rating: 4,
            quote: "Light and refreshing. Zero sugar but still satisfying—huge win for me.",
            author: "Andrew P.",
        },
    ],
    benefit: [
        {
            rating: 5,
            quote: "Daily feels steadier—no theatrics, just a routine I can keep.",
            author: "Sofia L.",
        },
        {
            rating: 5,
            quote: "My digestion is more predictable. Simple, consistent, and portable.",
            author: "Dustin O.",
        },
        {
            rating: 4,
            quote: "Small habit, real payoff in day-to-day comfort.",
            author: "Kim V.",
        },
    ],
    ingredients: [
        {
            rating: 5,
            quote: "Clear label with turmeric, ginger, milk thistle—clinically informed picks.",
            author: "Renee T.",
        },
        {
            rating: 5,
            quote: "Love the sugar-free formula and vegan pectin base. Clean and considered.",
            author: "Ben K.",
        },
        {
            rating: 4,
            quote: "The blend makes sense and the taste proves it.",
            author: "Priya M.",
        },
    ],
    convenience: [
        {
            rating: 5,
            quote: "Way easier than powders. Two gummies and I'm out the door.",
            author: "Kate S.",
        },
        {
            rating: 5,
            quote: "No shaker, no sink. I keep a pack in my bag for travel.",
            author: "Kevin M.",
        },
        {
            rating: 4,
            quote: "Zero prep, takes seconds. The definition of keepable.",
            author: "Liam H.",
        },
    ],
};

// Stars component
function createStars(rating) {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'review-stars';

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('svg');
        star.className = `star ${i <= rating ? '' : 'empty'}`;
        star.setAttribute('viewBox', '0 0 24 24');
        star.innerHTML = '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>';
        starsContainer.appendChild(star);
    }

    return starsContainer;
}

// Create review card
function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card fade-in';

    const stars = createStars(review.rating);
    const quote = document.createElement('p');
    quote.className = 'review-quote';
    quote.textContent = review.quote;

    const author = document.createElement('p');
    author.className = 'review-author';
    author.textContent = review.author;

    card.appendChild(stars);
    card.appendChild(quote);
    card.appendChild(author);

    return card;
}

// Update reviews display
function updateReviews(category) {
    const reviewsGrid = document.getElementById('reviews-grid');
    const reviews = REVIEWS[category];

    // Fade out current reviews
    const currentCards = reviewsGrid.querySelectorAll('.review-card');
    currentCards.forEach(card => {
        card.classList.remove('fade-in');
        card.classList.add('fade-out');
    });

    // Wait for fade out, then update content
    setTimeout(() => {
        reviewsGrid.innerHTML = '';

        reviews.forEach(review => {
            const card = createReviewCard(review);
            reviewsGrid.appendChild(card);
        });

        // Trigger fade in
        setTimeout(() => {
            const newCards = reviewsGrid.querySelectorAll('.review-card');
            newCards.forEach(card => {
                card.classList.remove('fade-out');
                card.classList.add('fade-in');
            });
        }, 50);
    }, 300);
}

// Tab switching functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            // Update button states
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });

            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');

            // Update reviews
            updateReviews(category);
        });

        // Keyboard navigation
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with flavor reviews
    updateReviews('flavor');

    // Initialize tab functionality
    initializeTabs();
});
