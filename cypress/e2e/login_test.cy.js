describe('Mini Shop (Demo) QA Tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8000')
  })

  it('should display products correctly', () => {
    cy.get('.card').should('have.length.at.least', 1)
  })

  it('should add a product to the cart', () => {
    cy.get('.add').first().click()
    cy.get('#cart-items li').should('have.length', 1)
  })

  it('should increase quantity when same product added twice', () => {
    cy.get('.add').first().click().click()
    cy.get('#cart-items li').should('contain', 'x2')
  })

  it('should remove product from cart', () => {
    cy.get('.add').first().click()
    cy.get('.del').click()
    cy.get('#cart-items li').should('have.length', 0)
  })

  it('should show error when checkout with empty cart', () => {
    cy.get('#checkout').click()
    cy.get('#message').should('contain', 'Le panier est vide')
  })

  it('should perform checkout successfully', () => {
    cy.get('.add').first().click()
    cy.get('#checkout').click()
    cy.get('#message').should('contain', 'Commande créée')
  })
})
