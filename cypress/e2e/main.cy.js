import { cities } from "../mocksData";
import { cityGdynia } from "../mocksData";
import { cityDhaka } from "../mocksData";
import { cityFier } from "../mocksData";

describe('GoPlaces', () => {

  const getTwoCities = () => {
    cy.visit("http://localhost:3000/price-comparison");

    cy.get(':nth-child(1) > .navbar_settings__location_choose_cntr > .css-b62m3t-container > .css-1cqou5v-control > .css-1fdsijx-ValueContainer > .css-qbdosj-Input').type("Gdynia")
    cy.get("div[id='react-select-9-option-0']").click()
    cy.get(':nth-child(2) > .navbar_settings__location_choose_cntr > .css-b62m3t-container > .css-1cqou5v-control > .css-1fdsijx-ValueContainer > .css-qbdosj-Input').type("Dhaka")
    cy.get("div[id='react-select-11-option-0']").click()

    cy.wait('@aliasCityOne')
    cy.wait('@aliasCityTwo')
  }
  beforeEach('intercept request', () => {
    cy.intercept('GET', 'https://cost-of-living-and-prices.p.rapidapi.com/cities', { cities })
      .as('aliasCities')
    cy.intercept('GET', 'https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=Fier&country_name=Albania', cityFier)
      .as('aliasCityTwo')
    cy.intercept('GET', 'https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=Gdynia&country_name=Poland', cityGdynia)
      .as('aliasCityOne')
    cy.intercept('GET', 'https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=Dhaka&country_name=Bangladesh', cityDhaka)
      .as('aliasCityTwo')
  })

  it('init', () => {
    expect(true).to.equal(true)
  })

  it("get data and choose the country and city", () => {
    cy.visit("http://localhost:3000/");
    cy.wait('@aliasCities')
    cy.get('.home_page__content_countries_cntr').contains('Albania').click()
    cy.url().should('be.equal', 'http://localhost:3000/Albania')
    cy.get('.country_page__cities_cntr').contains('Fier').click()
    cy.url().should('include', 'city/7,%20Fier')
    cy.get('.city_page__title').should('have.text', 'Fier, Albania')
  })

  it("change tab to Price Comparison", () => {
    cy.visit("http://localhost:3000/");
    cy.wait('@aliasCities')
    cy.contains("a", "Price Comparison").click();
    cy.url().should('be.equal', 'http://localhost:3000/price-comparison')
  })

  it("compare places", () => {
    getTwoCities()
    cy.contains('p', 'Gdynia').should('be.visible')
    cy.contains('p', 'Dhaka').should('be.visible')
    cy.get('.comparison').contains('Price per m2 to Buy Apartment Outside of City Center').should('be.visible')
  })

  it("change the language to PL", () => {
    getTwoCities()
    cy.get('.navbarSettings__lang_cntr > .css-b62m3t-container > .css-xlnhxx-control > .css-1hb7zxy-IndicatorsContainer > .css-1xc3v61-indicatorContainer').click()
    cy.get('#react-select-3-option-1').click()
    cy.get('.navbarSettings__lang_cntr').contains('PL').should('be.visible')
  })

  it("change the currency to EUR", () => {
    getTwoCities()
    cy.get('.navbarSettings__currency_cntr > .css-b62m3t-container > .css-xlnhxx-control > .css-1hb7zxy-IndicatorsContainer > .css-1xc3v61-indicatorContainer').click()
    cy.get('#react-select-5-option-1').click()
    cy.get('.navbarSettings__currency_cntr').contains('EUR').should('be.visible')
  })

  it("change item quantity", () => {
    getTwoCities()
    cy.get(':nth-child(1) > .comparison > .comparison__cntr > :nth-child(1) > .comparison__elem_cntr > :nth-child(3) > .comparison__cityOne_price_amount').should('have.text', "1743.32")
    cy.get(':nth-child(1) > .comparison > .comparison__cntr > :nth-child(1) > .comparison__elem_cntr > .comparison__quantity_cntr > .comparison__quantity_plus').click()
    cy.get(':nth-child(1) > .comparison > .comparison__cntr > :nth-child(1) > .comparison__elem_cntr > .comparison__quantity_cntr > .comparison__quantity_input').should('have.value', "2")
    cy.get(':nth-child(1) > .comparison > .comparison__cntr > :nth-child(1) > .comparison__elem_cntr > :nth-child(3) > .comparison__cityOne_price_amount').should('have.text', "3486.64")
  })
})