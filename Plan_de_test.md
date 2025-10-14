# Plan de test - Mini E-commerce (Demo using FakeStoreAPI)

## Objectif
Mettre en place et exécuter un plan de test pour la mini application e-commerce (frontend + API).

## Environnement
- Frontend statique (frontend/index.html) servant des produits depuis https://fakestoreapi.com
- Exécuter via: `python -m http.server 8000` depuis dossier frontend
- Cypress pour tests E2E
- Postman/Newman pour tests API

## Périmètre
- Authentification (non implémentée dans la démo) - tests API recommandés si présent
- Ajout / suppression du panier
- Paiement / confirmation (simulé via POST /carts)
- Navigation et chargement des pages

## Critères d’acceptation
- Les scénarios critiques doivent réussir (ajout panier, total correct, checkout crée une commande)
- Les tests automatisés doivent produire un rapport et captures d’écran en cas d’échec

## Scénarios prioritaires
1. Chargement des produits
2. Ajout d’un produit au panier
3. Vérification du total
4. Suppression d’un produit du panier
5. Passage de la commande (checkout)
