// To run: serve frontend folder (e.g., python -m http.server 8000) and run cypress
describe('Mini Shop E2E', ()=> {
  beforeEach(()=> {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('Ajoute un produit au panier et vérifie le total', () => {
    cy.get('.card').first().within(()=> {
      cy.get('button.add').click();
    });
    cy.get('#cart-items').children().should('have.length.at.least', 1);
    cy.get('#total').invoke('text').should('match', /Total: \$/);
  });

  it('Supprime un produit du panier', () => {
    cy.get('.card').first().within(()=> { cy.get('button.add').click(); });
    cy.get('#cart-items').children().should('have.length.at.least', 1);
    cy.get('#cart-items').find('button.del').click();
    cy.get('#cart-items').children().should('have.length', 0);
  });

  it('Valide le paiement (création de commande via FakeStoreAPI)', () => {
    cy.get('.card').first().within(()=> { cy.get('button.add').click(); });
    cy.get('#checkout').click();
    cy.get('#message').should('contain.text','Commande créée').and('be.visible');
    cy.get('#cart-items').children().should('have.length', 0);
  });

  // Capture screenshot on failure is handled by Cypress; additional example:
  afterEach(function() {
    if (this.currentTest.state === 'failed') {
      cy.screenshot('failure-' + this.currentTest.title);
    }
  });
});
