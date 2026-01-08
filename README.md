# 🛍️ Mini App Telegram - Boutique E-Commerce

Une mini application Telegram moderne et élégante pour vendre vos produits directement via Telegram.

## ✨ Fonctionnalités

- 📦 **Catalogue de produits** : Affichage de 3+ produits avec photos ou vidéos
- 🎨 **Formats multiples** : Chaque produit peut avoir différents formats/variantes
- ⭐ **Système de notation** : Les clients peuvent noter de 1 à 5 étoiles
- 💬 **Commentaires** : Section commentaires sous chaque produit
- 📱 **Redirection Telegram** : Commande directe via chat Telegram
- 🎭 **Design moderne** : Interface élégante avec animations fluides
- 💾 **Sauvegarde locale** : Les notes et commentaires sont sauvegardés

## 🚀 Installation sur GitHub Pages

### 1. Créer un dépôt GitHub

1. Allez sur [GitHub](https://github.com) et créez un compte si vous n'en avez pas
2. Cliquez sur "New repository"
3. Nommez-le (ex: `telegram-mini-app`)
4. Cochez "Public"
5. Cliquez sur "Create repository"

### 2. Uploader les fichiers

1. Cliquez sur "uploading an existing file"
2. Glissez-déposez ces 3 fichiers :
   - `index.html`
   - `styles.css`
   - `script.js`
3. Cliquez sur "Commit changes"

### 3. Activer GitHub Pages

1. Allez dans "Settings" de votre dépôt
2. Dans le menu de gauche, cliquez sur "Pages"
3. Sous "Source", sélectionnez "main" branch
4. Cliquez sur "Save"
5. Attendez quelques minutes, votre site sera accessible à : `https://votre-username.github.io/telegram-mini-app/`

## ⚙️ Configuration

### Personnaliser vos informations

Ouvrez le fichier `script.js` et modifiez la section `CONFIG` :

```javascript
const CONFIG = {
    // Votre nom d'utilisateur Telegram (sans @)
    telegramUsername: 'votre_username',
    
    // Vos produits
    products: [
        {
            id: 1,
            name: 'Nom de votre produit',
            description: 'Description détaillée',
            price: '29.99€',
            image: 'URL_de_votre_image',
            video: null, // ou 'URL_de_votre_video.mp4'
            badge: 'Populaire',
            formats: [
                { name: 'Petit', price: '29.99€' },
                { name: 'Moyen', price: '39.99€' },
                { name: 'Grand', price: '49.99€' }
            ],
            ratings: [],
            comments: []
        }
        // Ajoutez plus de produits ici...
    ]
};
```

### Modifier les couleurs

Dans `styles.css`, modifiez les variables CSS au début du fichier :

```css
:root {
    --primary: #6C5CE7;        /* Couleur principale */
    --secondary: #FF6B9D;      /* Couleur secondaire */
    --background: #0F0F1E;     /* Couleur de fond */
    --accent: #FFD93D;         /* Couleur d'accentuation */
}
```

## 📱 Intégration dans Telegram

### Méthode 1 : Via BotFather (Recommandé)

1. Ouvrez Telegram et cherchez [@BotFather](https://t.me/botfather)
2. Envoyez `/newbot` et suivez les instructions
3. Une fois créé, envoyez `/newapp`
4. Sélectionnez votre bot
5. Donnez un nom à votre app (ex: "Ma Boutique")
6. Entrez l'URL de votre GitHub Pages : `https://votre-username.github.io/telegram-mini-app/`
7. Uploadez une photo pour votre app
8. Votre mini app est prête ! 🎉

### Méthode 2 : Lien direct

Partagez simplement ce lien :
```
https://t.me/votre_bot/votre_app
```

## 🎨 Personnalisation avancée

### Ajouter plus de produits

Dans `script.js`, dupliquez un objet produit dans le tableau `products` :

```javascript
{
    id: 4, // Nouveau ID
    name: 'Nouveau Produit',
    description: 'Description...',
    price: '59.99€',
    image: 'https://votre-image.jpg',
    video: null,
    badge: 'Nouveau',
    formats: [
        { name: 'Option 1', price: '59.99€' },
        { name: 'Option 2', price: '79.99€' }
    ],
    ratings: [],
    comments: []
}
```

### Utiliser des vidéos

Pour afficher une vidéo au lieu d'une image :

```javascript
{
    // ...
    image: 'https://votre-image-miniature.jpg', // Image de secours
    video: 'https://votre-video.mp4', // URL de la vidéo
    // ...
}
```

### Héberger vos images

Options gratuites pour héberger vos images/vidéos :
- [Imgur](https://imgur.com) - Pour les images
- [Unsplash](https://unsplash.com) - Photos gratuites
- [GitHub](https://github.com) - Créez un dossier `images` dans votre dépôt

## 🔧 Support et dépannage

### Les images ne s'affichent pas
- Vérifiez que les URLs sont accessibles publiquement
- Assurez-vous qu'elles commencent par `https://`

### La redirection Telegram ne fonctionne pas
- Vérifiez que `telegramUsername` est correct (sans @)
- Testez d'abord dans un navigateur normal

### Les commentaires ne sont pas sauvegardés
- Normal ! Ils sont sauvegardés localement sur chaque appareil
- Pour une vraie base de données, il faudrait un backend

## 📝 Structure du projet

```
telegram-mini-app/
│
├── index.html      # Structure HTML de l'application
├── styles.css      # Styles et design
├── script.js       # Logique et fonctionnalités
└── README.md       # Ce fichier
```

## 🎯 Prochaines étapes

1. ✅ Personnalisez vos produits
2. ✅ Changez les couleurs selon votre marque
3. ✅ Ajoutez vos propres images
4. ✅ Testez l'application
5. ✅ Intégrez avec Telegram
6. ✅ Partagez avec vos clients !

## 💡 Conseils

- Utilisez des images de haute qualité (au moins 800x800px)
- Écrivez des descriptions attractives
- Testez sur mobile (la plupart des utilisateurs Telegram sont sur mobile)
- Mettez à jour régulièrement vos produits

## 📄 Licence

Ce projet est libre d'utilisation pour un usage commercial ou personnel.

---

**Créé avec ❤️ pour Telegram Mini Apps**

Besoin d'aide ? Contactez-moi sur Telegram !
