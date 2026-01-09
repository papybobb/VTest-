// Configuration de base
const CONFIG = {
    // ⚠️ IMPORTANT : Remplacez par votre nom d'utilisateur Telegram
    telegramUsername: 'Le_V667', // Par exemple : 'monshop' pour @monshop
    
    // Données des produits
    products: [
        {
            id: 1,
            name: 'Brownies "The Gaz Selection" 90U',
            description: 'Un produit d\'exception avec des caractéristiques uniques. Qualité supérieure garantie.',
            price: '5 parts 40e',
            image: 'https://www.google.com/search?sca_esv=727911a362dc4a92&rlz=1C1DHFH_enFR1129FR1129&sxsrf=ANbL-n6wzEvIsg_3t3wBbUNs-xzceGac2Q:1767888565139&udm=2&fbs=ADc_l-aN0CWEZBOHjofHoaMMDxBhxkqK2ctBUPnNyDe33GYYnwcUdDZEOgtbP_iLwZE3_BspBSwA7ni4OLesTXSDJYgVU2Op4jmFVXyk-8dVgHWUW8xph1ZkCMzCdEciz83ZVM9LSpdTaEmByC1mokozROTvs69kHOtGRHh9Lar50xP1c7ZWsYAGtDp7yshDP2eoHVM8zTS2avPt&q=brownie&sa=X&ved=2ahUKEwirsLWPqvyRAxU3VKQEHcDBOXUQtKgLegQIFhAB&biw=1536&bih=695&dpr=1.25&aic=0#sv=CAMSVhoyKhBlLXdHNGVoMU93TzFtM0FNMg53RzRlaDFPKiwsqsPjgQbM9NmSD2efUchPjFT9HR9cCgZtb3NhaWMSEGUtd0c0ZWgxT3dPMW0zQU0YADABGAcguoutMzACSgoIAhACGAIgAigC',
            video: null, // https://t.me/c/3672019462/5
            badge: 'Top vente🥇',
            formats: [
                { name: '2parts', price: '20€' },
                { name: '5parts', price: '40€' },
                { name: '10parts', price: '80€' }
            ],
            ratings: [],
            comments: []
        },
        {
            id: 2,
            name: 'Unicorn Isomere S/R🦄',
            description: 'Découvrez notre deuxième produit pour en voir de toute les coulleurs.',
            price: '20€',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
            video: null,
            badge: '🦄🌈',
            formats: [
                { name: '1', price: '20€' },
                { name: '2', price: '40€' },
                { name: '5', price: '100€' }
            ],
            ratings: [],
            comments: []
        },
        {
            id: 3,
            name: 'Produit Premium 3',
            description: 'Le meilleur choix pour ceux qui recherchent l\'excellence. Innovation et qualité réunies.',
            price: '49.99€',
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
            video: null,
            badge: 'Best Seller',
            formats: [
                { name: 'Basic', price: '49.99€' },
                { name: 'Pro', price: '69.99€' },
                { name: 'Ultimate', price: '99.99€' }
            ],
            ratings: [],
            comments: []
        }
    ]
};

// Variables globales
let currentProduct = null;
let selectedFormat = null;

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    initTelegramWebApp();
    loadProducts();
    setupEventListeners();
    loadStoredData();
});

// Initialisation de l'API Telegram
function initTelegramWebApp() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        
        // Appliquer le thème Telegram
        if (tg.colorScheme === 'dark') {
            document.body.style.background = tg.backgroundColor || '#0F0F1E';
        }
    }
}

// Charger les produits dans la grille
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    CONFIG.products.forEach(product => {
        const avgRating = calculateAverageRating(product.ratings);
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.onclick = () => openProductModal(product);
        
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <div class="product-rating">
                        <span>⭐</span>
                        <span>${avgRating.toFixed(1)}</span>
                        <span>(${product.ratings.length})</span>
                    </div>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Ouvrir la modal d'un produit
function openProductModal(product) {
    currentProduct = product;
    selectedFormat = product.formats[0]; // Sélectionner le premier format par défaut
    
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    
    // Afficher image ou vidéo
    if (product.video) {
        modalImage.style.display = 'none';
        modalVideo.style.display = 'block';
        modalVideo.querySelector('source').src = product.video;
        modalVideo.load();
    } else {
        modalImage.style.display = 'block';
        modalVideo.style.display = 'none';
        modalImage.src = product.image;
    }
    
    // Remplir les informations
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalDescription').textContent = product.description;
    
    // Charger les formats
    loadFormats(product.formats);
    
    // Charger les étoiles et commentaires
    loadRatings(product);
    loadComments(product);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fermer la modal
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Réinitialiser la vidéo si elle existe
    const modalVideo = document.getElementById('modalVideo');
    if (modalVideo.style.display === 'block') {
        modalVideo.pause();
    }
}

// Charger les options de format
function loadFormats(formats) {
    const formatOptions = document.getElementById('formatOptions');
    formatOptions.innerHTML = '';
    
    formats.forEach((format, index) => {
        const option = document.createElement('div');
        option.className = `format-option ${index === 0 ? 'selected' : ''}`;
        option.onclick = () => selectFormat(format, option);
        
        option.innerHTML = `
            <span class="format-name">${format.name}</span>
            <span class="format-price">${format.price}</span>
        `;
        
        formatOptions.appendChild(option);
    });
}

// Sélectionner un format
function selectFormat(format, element) {
    selectedFormat = format;
    
    // Retirer la sélection des autres options
    document.querySelectorAll('.format-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Ajouter la sélection à l'option cliquée
    element.classList.add('selected');
}

// Commander (redirection vers Telegram)
function orderProduct() {
    if (!selectedFormat) {
        alert('Veuillez sélectionner un format');
        return;
    }
    
    const message = `Bonjour ! Je souhaite commander :\n\n📦 ${currentProduct.name}\n📏 Format : ${selectedFormat.name}\n💰 Prix : ${selectedFormat.price}`;
    
    // Encoder le message pour l'URL
    const encodedMessage = encodeURIComponent(message);
    
    // Créer le lien Telegram
    const telegramUrl = `https://t.me/${CONFIG.telegramUsername}?text=${encodedMessage}`;
    
    // Redirection
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.openTelegramLink(telegramUrl);
    } else {
        window.open(telegramUrl, '_blank');
    }
}

// Système de notation
function setupRatingSystem() {
    const stars = document.querySelectorAll('#starsInput .star');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.value);
            addRating(rating);
            updateStarsDisplay(rating);
        });
        
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.value);
            updateStarsDisplay(rating);
        });
    });
    
    document.getElementById('starsInput').addEventListener('mouseleave', () => {
        const avgRating = calculateAverageRating(currentProduct.ratings);
        updateStarsDisplay(avgRating);
    });
}

// Ajouter une notation
function addRating(rating) {
    if (!currentProduct) return;
    
    currentProduct.ratings.push(rating);
    saveToStorage();
    loadRatings(currentProduct);
    
    // Animation de feedback
    showFeedback('Merci pour votre note ! ⭐');
}

// Charger les notations
function loadRatings(product) {
    const avgRating = calculateAverageRating(product.ratings);
    const ratingAverage = document.getElementById('ratingAverage');
    
    if (product.ratings.length > 0) {
        ratingAverage.textContent = `Note moyenne : ${avgRating.toFixed(1)}/5 (${product.ratings.length} avis)`;
    } else {
        ratingAverage.textContent = 'Soyez le premier à noter ce produit';
    }
    
    updateStarsDisplay(avgRating);
}

// Mettre à jour l'affichage des étoiles
function updateStarsDisplay(rating) {
    const stars = document.querySelectorAll('#starsInput .star');
    stars.forEach((star, index) => {
        if (index < Math.round(rating)) {
            star.textContent = '★';
            star.classList.add('active');
        } else {
            star.textContent = '☆';
            star.classList.remove('active');
        }
    });
}

// Calculer la note moyenne
function calculateAverageRating(ratings) {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return sum / ratings.length;
}

// Ajouter un commentaire
function addComment() {
    const commentInput = document.getElementById('commentInput');
    const text = commentInput.value.trim();
    
    if (!text) {
        alert('Veuillez écrire un commentaire');
        return;
    }
    
    const comment = {
        author: getUserName(),
        text: text,
        date: new Date().toISOString(),
        rating: calculateAverageRating(currentProduct.ratings)
    };
    
    currentProduct.comments.unshift(comment);
    saveToStorage();
    loadComments(currentProduct);
    
    commentInput.value = '';
    showFeedback('Commentaire publié ! 💬');
}

// Charger les commentaires
function loadComments(product) {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';
    
    if (product.comments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">Aucun commentaire pour le moment. Soyez le premier à partager votre avis !</p>';
        return;
    }
    
    product.comments.forEach(comment => {
        const commentEl = document.createElement('div');
        commentEl.className = 'comment';
        
        const date = new Date(comment.date);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        commentEl.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-rating">${'⭐'.repeat(Math.round(comment.rating))}</span>
            </div>
            <p class="comment-text">${escapeHtml(comment.text)}</p>
            <p class="comment-date">${formattedDate}</p>
        `;
        
        commentsList.appendChild(commentEl);
    });
}

// Obtenir le nom de l'utilisateur
function getUserName() {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            return user.first_name || user.username || 'Utilisateur';
        }
    }
    return 'Utilisateur';
}

// Échapper le HTML pour éviter les injections XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Afficher un message de feedback
function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #6C5CE7 0%, #FF6B9D 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        animation: slideDown 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    `;
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}

// Sauvegarder dans le localStorage
function saveToStorage() {
    localStorage.setItem('telegram_shop_data', JSON.stringify(CONFIG.products));
}

// Charger depuis le localStorage
function loadStoredData() {
    const stored = localStorage.getItem('telegram_shop_data');
    if (stored) {
        try {
            const data = JSON.parse(stored);
            // Fusionner les données stockées avec les produits existants
            data.forEach((storedProduct, index) => {
                if (CONFIG.products[index]) {
                    CONFIG.products[index].ratings = storedProduct.ratings || [];
                    CONFIG.products[index].comments = storedProduct.comments || [];
                }
            });
        } catch (e) {
            console.error('Erreur lors du chargement des données', e);
        }
    }
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Bouton fermer modal
    document.getElementById('modalClose').addEventListener('click', closeModal);
    
    // Clic en dehors de la modal
    document.getElementById('productModal').addEventListener('click', (e) => {
        if (e.target.id === 'productModal') {
            closeModal();
        }
    });
    
    // Bouton commander
    document.getElementById('orderBtn').addEventListener('click', orderProduct);
    
    // Bouton soumettre commentaire
    document.getElementById('submitComment').addEventListener('click', addComment);
    
    // Système de notation
    setupRatingSystem();
    
    // Touche Échap pour fermer
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}
