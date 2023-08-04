
import React from 'react'
import ContactPage from '../../src/pages/ContactPage/ContactPage'
import { Provider } from 'react-redux'
import { store } from '../../src/store/store'

describe('ContactPage', () => {
  beforeEach('mount ContactPage Component', () => {
    cy.mount(
      <Provider store={store}>
        <ContactPage />
      </Provider>
    )
  })

  it('display content', () => {
    cy.get('.page__title').should('have.text', 'Contact')
    cy.get('.page__content_title').should('be.visible')
    cy.get('.contactPage__details_el_cntr > :nth-child(1)').should('have.text', 'Alexa-Web')
    cy.get('.contactPage__details_el_cntr > :nth-child(2)').should('have.text', 'Gdynia, PL')
    cy.get(':nth-child(3) > a').should('have.text', 'info@alexa-web.com')
    cy.get(':nth-child(4) > a').should('have.text', 'alexa-web.com')
  })

  it('wrong data entered', () => {
    cy.get('input[placeholder = "Your name"]').click().type('a')
    cy.get('input[placeholder = "Your email address"]').click().type('a@a')
    cy.get('textarea[placeholder = "Your message"]').click().type('a')
    cy.get('button[type=submit]').click()
    cy.contains('p', 'Please enter the correct details').should('be.visible')
    cy.contains('p', 'Email address is invalid').should('be.visible')
    cy.contains('p', 'Your message must contain at least 5 characters').should('be.visible')
  })

  // it('correct data entered and send', () => {
  //   cy.get('input[placeholder = "Your name"]').click().type('Alexa')
  //   cy.get('input[placeholder = "Your email address"]').click().type('aleksandra.wilczynska.plgdy@gmail.com')
  //   cy.get('textarea[placeholder = "Your message"]').click().type('Test message')
  //   cy.get('button[type=submit]').click()
  //   cy.get('.contactPage__sent_msg_confirmation').should('have.text', 'Your message has been sent!')
  // })
})