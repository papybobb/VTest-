// ⚠️ CONFIGURATION - MODIFIEZ ICI VOS INFORMATIONS
const CONFIG = {
// Remplacez par votre nom d’utilisateur Telegram (sans @)
telegramUsername: ‘votre_username’,

```
// Vos produits
products: [
    {
        id: 1,
        name: 'Produit Premium 1',
        description: 'Un produit d\'exception avec des caractéristiques uniques. Qualité supérieure garantie.',
        price: '29.99€',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        video: null,
        badge: 'Populaire',
        formats: [
            { name: 'Petit', price: '29.99€' },
            { name: 'Moyen', price: '39.99€' },
            { name: 'Grand', price: '49.99€' }
        ],
        ratings: [],
        comments: []
    },
    {
        id: 2,
        name: 'Produit Premium 2',
        description: 'Découvrez notre deuxième produit avec des fonctionnalités exceptionnelles et un design moderne.',
        price: '39.99€',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        video: null,
        badge: 'Nouveau',
        formats: [
            { name: 'Standard', price: '39.99€' },
            { name: 'Premium', price: '59.99€' },
            { name: 'Deluxe', price: '79.99€' }
        ],
        ratings: [],
        comments: []
    },
    {
        id: 3,
        name: 'Produit Premium 3',
        description: 'Le meilleur choix pour ceux qui recherchent l\'excellence. Innovation et qualité réunies.',
        price: '49.99€',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
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
```

};

// Variables globales
let currentProduct = null;
let selectedFormat = null;

// Initialisation - S’exécute quand la page est chargée
function init() {
console.log(‘🚀 Application démarrée’);
console.log(‘📦 Nombre de produits:’, CONFIG.products.length);

```
initTelegramWebApp();
loadProducts();
setupEventListeners();
loadStoredData();
```

}

// Initialisation de l’API Telegram
function initTelegramWebApp() {
try {
if (window.Telegram && window.Telegram.WebApp) {
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();
console.log(‘✅ Telegram WebApp initialisé’);
} else {
console.log(‘ℹ️ Mode navigation normale (pas dans Telegram)’);
}
} catch (e) {
console.log(‘ℹ️ Telegram WebApp non disponible’);
}
}

// Charger les produits dans la grille
function loadProducts() {
console.log(‘📦 Chargement des produits…’);
const productsGrid = document.getElementById(‘productsGrid’);

```
if (!productsGrid) {
    console.error('❌ Element productsGrid introuvable');
    return;
}

productsGrid.innerHTML = ''; // Vider d'abord

CONFIG.products.forEach((product, index) => {
    console.log(`➕ Ajout du produit ${index + 1}:`, product.name);
    
    const avgRating = calculateAverageRating(product.ratings);
    
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.onclick = function() { openProductModal(product); };
    
    productCard.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x400?text=Image'">
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

console.log('✅ Produits chargés avec succès');
```

}

// Ouvrir la modal d’un produit
function openProductModal(product) {
console.log(‘🔍 Ouverture du produit:’, product.name);
currentProduct = product;
selectedFormat = product.formats[0];

```
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
    modalImage.onerror = function() {
        this.src = 'https://via.placeholder.com/600x300?text=Image+non+disponible';
    };
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
```

}

// Fermer la modal
function closeModal() {
const modal = document.getElementById(‘productModal’);
modal.classList.remove(‘active’);
document.body.style.overflow = ‘auto’;

```
const modalVideo = document.getElementById('modalVideo');
if (modalVideo && modalVideo.style.display === 'block') {
    modalVideo.pause();
}
```

}

// Charger les options de format
function loadFormats(formats) {
const formatOptions = document.getElementById(‘formatOptions’);
formatOptions.innerHTML = ‘’;

```
formats.forEach((format, index) => {
    const option = document.createElement('div');
    option.className = 'format-option' + (index === 0 ? ' selected' : '');
    option.onclick = function() { selectFormat(format, option); };
    
    option.innerHTML = `
        <span class="format-name">${format.name}</span>
        <span class="format-price">${format.price}</span>
    `;
    
    formatOptions.appendChild(option);
});
```

}

// Sélectionner un format
function selectFormat(format, element) {
selectedFormat = format;

```
document.querySelectorAll('.format-option').forEach(function(opt) {
    opt.classList.remove('selected');
});

element.classList.add('selected');
```

}

// Commander (redirection vers Telegram)
function orderProduct() {
if (!selectedFormat) {
alert(‘Veuillez sélectionner un format’);
return;
}

```
const message = 'Bonjour ! Je souhaite commander :\n\n📦 ' + currentProduct.name + '\n📏 Format : ' + selectedFormat.name + '\n💰 Prix : ' + selectedFormat.price;

const encodedMessage = encodeURIComponent(message);
const telegramUrl = 'https://t.me/' + CONFIG.telegramUsername + '?text=' + encodedMessage;

console.log('📱 Redirection vers:', telegramUrl);

if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.openTelegramLink(telegramUrl);
} else {
    window.open(telegramUrl, '_blank');
}
```

}

// Système de notation
function setupRatingSystem() {
const stars = document.querySelectorAll(’#starsInput .star’);

```
stars.forEach(function(star) {
    star.addEventListener('click', function() {
        const rating = parseInt(star.dataset.value);
        addRating(rating);
        updateStarsDisplay(rating);
    });
    
    star.addEventListener('mouseenter', function() {
        const rating = parseInt(star.dataset.value);
        updateStarsDisplay(rating);
    });
});

const starsInput = document.getElementById('starsInput');
starsInput.addEventListener('mouseleave', function() {
    if (currentProduct) {
        const avgRating = calculateAverageRating(currentProduct.ratings);
        updateStarsDisplay(avgRating);
    }
});
```

}

// Ajouter une notation
function addRating(rating) {
if (!currentProduct) return;

```
currentProduct.ratings.push(rating);
saveToStorage();
loadRatings(currentProduct);

showFeedback('Merci pour votre note ! ⭐');
```

}

// Charger les notations
function loadRatings(product) {
const avgRating = calculateAverageRating(product.ratings);
const ratingAverage = document.getElementById(‘ratingAverage’);

```
if (product.ratings.length > 0) {
    ratingAverage.textContent = 'Note moyenne : ' + avgRating.toFixed(1) + '/5 (' + product.ratings.length + ' avis)';
} else {
    ratingAverage.textContent = 'Soyez le premier à noter ce produit';
}

updateStarsDisplay(avgRating);
```

}

// Mettre à jour l’affichage des étoiles
function updateStarsDisplay(rating) {
const stars = document.querySelectorAll(’#starsInput .star’);
stars.forEach(function(star, index) {
if (index < Math.round(rating)) {
star.textContent = ‘★’;
star.classList.add(‘active’);
} else {
star.textContent = ‘☆’;
star.classList.remove(‘active’);
}
});
}

// Calculer la note moyenne
function calculateAverageRating(ratings) {
if (ratings.length === 0) return 0;
const sum = ratings.reduce(function(a, b) { return a + b; }, 0);
return sum / ratings.length;
}

// Ajouter un commentaire
function addComment() {
const commentInput = document.getElementById(‘commentInput’);
const text = commentInput.value.trim();

```
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
```

}

// Charger les commentaires
function loadComments(product) {
const commentsList = document.getElementById(‘commentsList’);
commentsList.innerHTML = ‘’;

```
if (product.comments.length === 0) {
    commentsList.innerHTML = '<p class="no-comments">Aucun commentaire pour le moment. Soyez le premier à partager votre avis !</p>';
    return;
}

product.comments.forEach(function(comment) {
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
    
    const stars = '⭐'.repeat(Math.round(comment.rating));
    
    commentEl.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${escapeHtml(comment.author)}</span>
            <span class="comment-rating">${stars}</span>
        </div>
        <p class="comment-text">${escapeHtml(comment.text)}</p>
        <p class="comment-date">${formattedDate}</p>
    `;
    
    commentsList.appendChild(commentEl);
});
```

}

// Obtenir le nom de l’utilisateur
function getUserName() {
try {
if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
const user = window.Telegram.WebApp.initDataUnsafe.user;
if (user && user.first_name) {
return user.first_name;
}
}
} catch (e) {
console.log(‘Info utilisateur non disponible’);
}
return ‘Utilisateur’;
}

// Échapper le HTML
function escapeHtml(text) {
const div = document.createElement(‘div’);
div.textContent = text;
return div.innerHTML;
}

// Afficher un message de feedback
function showFeedback(message) {
const feedback = document.createElement(‘div’);
feedback.style.cssText = ‘position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #6C5CE7 0%, #FF6B9D 100%); color: white; padding: 1rem 2rem; border-radius: 12px; font-weight: 600; z-index: 10000; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);’;
feedback.textContent = message;
document.body.appendChild(feedback);

```
setTimeout(function() {
    feedback.remove();
}, 2000);
```

}

// Sauvegarder dans le localStorage
function saveToStorage() {
try {
localStorage.setItem(‘telegram_shop_data’, JSON.stringify(CONFIG.products));
console.log(‘💾 Données sauvegardées’);
} catch (e) {
console.log(‘❌ Erreur de sauvegarde:’, e);
}
}

// Charger depuis le localStorage
function loadStoredData() {
try {
const stored = localStorage.getItem(‘telegram_shop_data’);
if (stored) {
const data = JSON.parse(stored);
data.forEach(function(storedProduct, index) {
if (CONFIG.products[index]) {
CONFIG.products[index].ratings = storedProduct.ratings || [];
CONFIG.products[index].comments = storedProduct.comments || [];
}
});
console.log(‘✅ Données chargées depuis le stockage’);
}
} catch (e) {
console.log(‘❌ Erreur de chargement:’, e);
}
}

// Configuration des écouteurs d’événements
function setupEventListeners() {
// Bouton fermer modal
const modalClose = document.getElementById(‘modalClose’);
if (modalClose) {
modalClose.addEventListener(‘click’, closeModal);
}

```
// Clic en dehors de la modal
const modal = document.getElementById('productModal');
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target.id === 'productModal') {
            closeModal();
        }
    });
}

// Bouton commander
const orderBtn = document.getElementById('orderBtn');
if (orderBtn) {
    orderBtn.addEventListener('click', orderProduct);
}

// Bouton soumettre commentaire
const submitComment = document.getElementById('submitComment');
if (submitComment) {
    submitComment.addEventListener('click', addComment);
}

// Système de notation
setupRatingSystem();

// Touche Échap pour fermer
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

console.log('✅ Event listeners configurés');
```

}

// Démarrer l’application quand le DOM est prêt
if (document.readyState === ‘loading’) {
document.addEventListener(‘DOMContentLoaded’, init);
} else {
init();
}

console.log(‘📱 Script chargé’);