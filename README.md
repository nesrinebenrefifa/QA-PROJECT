# Mini E-commerce QA Project

Contenu du ZIP:
- frontend/: simple frontend HTML/JS qui consomme FakeStoreAPI
- cypress/: configuration et scripts Cypress (E2E)
- postman_collection.json: collection pour tester les endpoints FakeStoreAPI
- Plan_de_test.md: plan de test
- Cas_de_test.xlsx: table de cas de test
- Rapport_QA.md: modèle de rapport
- README.md: ce fichier

## Pré-requis
- Node.js + npm (pour Cypress) OR utiliser Cypress via npx
- Python 3 (pour servir le dossier frontend)
- Postman / Newman (facultatif)

## Exécution rapide
1. Servir le frontend:
   ```bash
   cd frontend
   python -m http.server 8000
   ```
   Ouvrir `http://localhost:8000` pour vérifier.

2. Lancer Cypress (depuis dossier racine du projet):
   ```bash
   # installer cypress si nécessaire
   npm init -y
   npm install cypress --save-dev
   npx cypress open
   # ou exécuter en mode headless
   npx cypress run
   ```

3. Exécuter collection Postman (optionnel):
   - Importer `postman_collection.json` dans Postman et exécuter les requêtes.
   - Ou avec Newman:
     ```bash
     npm install -g newman
     newman run postman_collection.json
     ```

## Remarques
- Le frontend utilise FakeStoreAPI; les POST vers /carts renverront un objet simulant la création de commande.
- Les captures d'écran en cas d'échec sont configurées via Cypress.
