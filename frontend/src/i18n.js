// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: {
        hero: {
          title: "Discover our Red Bull Collection",
          subtitle: "The iconic energy drink combined with the latest innovations and cutting-edge sports equipment.",
          button: "Explore Products"
        },
        features: {
          title: "Why choose us?",
          productsPremium: {
            title: "Premium Products",
            description: "Rigorous selection of the best products"
          },
          securePayment: {
            title: "Secure Payment",
            description: "100% secure transactions"
          },
          fastDelivery: {
            title: "Fast Delivery",
            description: "Delivery in 24/48h all over France"
          },
          support24_7: {
            title: "24/7 Support",
            description: "A team ready to listen"
          }
        },
        categories: {
          title: "Our Categories",
          classic: {
            title: "CLASSIC",
            description: "The latest innovations"
          },
          editions: {
            title: "EDITIONS",
            description: "Sporting equipment"
          }
        },
        bestSellers: {
          title: "Best Sellers",
          popular: "Popular",
          button: "View More"
        },
        cta: {
          title: "Ready to boost your energy?",
          subtitle: "Join thousands of Red Bull fans and discover our exclusive selection.",
          button: "Start Shopping"
        },
        error: {
          fetchProducts: "Error fetching products"
        }
      },
      login: "Login",
      register: {
        title: "Create an Account",
        subtitle: "Join us to access all our features",
        label: {
          name: "Name",
          firstName: "First Name",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm Password"
        },
        placeholder: {
          name: "Your name",
          firstName: "Your first name",
          email: "your@email.com",
          password: "••••••••",
          confirmPassword: "••••••••"
        },
        loading: "Registering...",
        submit: "Register",
        alreadyHaveAccount: "Already have an account?",
        login: "Log in",
        error: {
          passwordMismatch: "Passwords do not match",
          passwordTooShort: "Password must be at least 6 characters",
          registration: "Error during registration",
          autoLogin: "Error during automatic login"
        }
      },
      welcome: "Welcome to our application",
      navbar: {
        products: "Products",
        createAccount: "Create Account",
        login: "Login",
        logout: "Logout",
        profile: "Profile"
      },
      productList: {
        header: {
          title: "Our Products"
        },
        buttons: {
          allProducts: "ALL PRODUCTS",
          classic: "CLASSIC",
          editions: "EDITIONS"
        },
        noProducts: "No products found in this category.",
        error: "Error: {{error}}",
        lowStock: "Only {{count}} left!",
        outOfStock: "Out of stock",
        inStock: "Stock: {{count}}",
        unavailable: "Unavailable",
        imageAlt: "{{name}} image"
      }
    }
  },
  fr: {
    translation: {
      home: {
        hero: {
          title: "Découvrez Notre Collection Red Bull",
          subtitle: "La boisson énergisante emblématique, associée aux dernières innovations et aux équipements sportifs de pointe.",
          button: "Explorer les produits"
        },
        features: {
          title: "Pourquoi nous choisir ?",
          productsPremium: {
            title: "Produits Premium",
            description: "Sélection rigoureuse des meilleurs produits"
          },
          securePayment: {
            title: "Paiement Sécurisé",
            description: "Transactions 100% sécurisées"
          },
          fastDelivery: {
            title: "Livraison Rapide",
            description: "Livraison en 24/48h partout en France"
          },
          support24_7: {
            title: "Support 24/7",
            description: "Une équipe à votre écoute"
          }
        },
        categories: {
          title: "Nos Catégories",
          classic: {
            title: "CLASSIQUE",
            description: "Les dernières innovations"
          },
          editions: {
            title: "EDITIONS",
            description: "Équipements sportifs"
          }
        },
        bestSellers: {
          title: "Meilleures Ventes",
          popular: "Populaire",
          button: "Voir plus"
        },
        cta: {
          title: "Prêt à booster votre énergie ?",
          subtitle: "Rejoignez des milliers de fans de Red Bull et découvrez notre sélection exclusive.",
          button: "Commencer vos achats"
        },
        error: {
          fetchProducts: "Erreur lors du chargement des produits"
        }
      },
      login: "Connexion",
      register: {
        title: "Créer un compte",
        subtitle: "Rejoignez-nous pour accéder à toutes nos fonctionnalités",
        label: {
          name: "Nom",
          firstName: "Prénom",
          email: "Email",
          password: "Mot de passe",
          confirmPassword: "Confirmer le mot de passe"
        },
        placeholder: {
          name: "Votre nom",
          firstName: "Votre prénom",
          email: "votre@email.com",
          password: "••••••••",
          confirmPassword: "••••••••"
        },
        loading: "Inscription en cours...",
        submit: "S'inscrire",
        alreadyHaveAccount: "Déjà un compte ?",
        login: "Se connecter",
        error: {
          passwordMismatch: "Les mots de passe ne correspondent pas",
          passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
          registration: "Erreur lors de l'inscription",
          autoLogin: "Erreur lors de la connexion automatique"
        }
      },
      welcome: "Bienvenue dans notre application",
      navbar: {
        products: "Produits",
        createAccount: "Créer un compte",
        login: "Connexion",
        logout: "Se déconnecter",
        profile: "Profil"
      },
      productList: {
        header: {
          title: "Nos Produits"
        },
        buttons: {
          allProducts: "TOUT LES PRODUITS",
          classic: "CLASSIQUE",
          editions: "EDITIONS"
        },
        noProducts: "Aucun produit trouvé dans cette catégorie.",
        error: "Erreur : {{error}}",
        lowStock: "Plus que {{count}} !",
        outOfStock: "Rupture de stock",
        inStock: "Stock : {{count}}",
        unavailable: "Indisponible",
        imageAlt: "Image de {{name}}"
      }
    }
  },
  de: {
    translation: {
      home: {
        hero: {
          title: "Entdecken Sie unsere Red Bull Kollektion",
          subtitle: "Der ikonische Energy-Drink in Kombination mit den neuesten Innovationen und modernster Sportausrüstung.",
          button: "Produkte entdecken"
        },
        features: {
          title: "Warum uns wählen?",
          productsPremium: {
            title: "Premium-Produkte",
            description: "Strenge Auswahl der besten Produkte"
          },
          securePayment: {
            title: "Sichere Zahlung",
            description: "100% sichere Transaktionen"
          },
          fastDelivery: {
            title: "Schnelle Lieferung",
            description: "Lieferung in 24/48h überall in Frankreich"
          },
          support24_7: {
            title: "24/7 Support",
            description: "Ein Team, das Ihnen zuhört"
          }
        },
        categories: {
          title: "Unsere Kategorien",
          classic: {
            title: "KLASSIK",
            description: "Die neuesten Innovationen"
          },
          editions: {
            title: "EDITIONEN",
            description: "Sportausrüstung"
          }
        },
        bestSellers: {
          title: "Bestseller",
          popular: "Beliebt",
          button: "Mehr ansehen"
        },
        cta: {
          title: "Bereit, Ihre Energie zu steigern?",
          subtitle: "Schließen Sie sich Tausenden von Red Bull Fans an und entdecken Sie unsere exklusive Auswahl.",
          button: "Einkauf starten"
        },
        error: {
          fetchProducts: "Fehler beim Laden der Produkte"
        }
      },
      login: "Anmelden",
      register: {
        title: "Konto erstellen",
        subtitle: "Treten Sie bei, um auf alle unsere Funktionen zuzugreifen",
        label: {
          name: "Name",
          firstName: "Vorname",
          email: "E-Mail",
          password: "Passwort",
          confirmPassword: "Passwort bestätigen"
        },
        placeholder: {
          name: "Ihr Name",
          firstName: "Ihr Vorname",
          email: "ihre@email.com",
          password: "••••••••",
          confirmPassword: "••••••••"
        },
        loading: "Registrierung läuft...",
        submit: "Registrieren",
        alreadyHaveAccount: "Haben Sie bereits ein Konto?",
        login: "Anmelden",
        error: {
          passwordMismatch: "Passwörter stimmen nicht überein",
          passwordTooShort: "Das Passwort muss mindestens 6 Zeichen lang sein",
          registration: "Fehler bei der Registrierung",
          autoLogin: "Fehler beim automatischen Login"
        }
      },
      welcome: "Willkommen in unserer Anwendung",
      navbar: {
        products: "Produkte",
        createAccount: "Konto erstellen",
        login: "Anmelden",
        logout: "Abmelden",
        profile: "Profil"
      },
      productList: {
        header: {
          title: "Unsere Produkte"
        },
        buttons: {
          allProducts: "ALLE PRODUKTE",
          classic: "KLASSIK",
          editions: "EDITIONEN"
        },
        noProducts: "Keine Produkte in dieser Kategorie gefunden.",
        error: "Fehler: {{error}}",
        lowStock: "Nur noch {{count}}!",
        outOfStock: "Ausverkauft",
        inStock: "Lager: {{count}}",
        unavailable: "Nicht verfügbar",
        imageAlt: "{{name}} Bild"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // langue par défaut
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React se charge déjà de l'échappement
    }
  });

export default i18n;
