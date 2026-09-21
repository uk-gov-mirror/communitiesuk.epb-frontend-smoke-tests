const stage = Cypress.expose('API_STAGE') || 'production'
const isCrossOrigin = (Cypress.expose(`get_service_en_${stage}`) !== Cypress.expose(`get_domain_${stage}`))

describe('Find a non-domestic assessor (English)', () => {
    beforeEach(() => {
        cy.visit(Cypress.expose(`get_service_en_${stage}`))
        cy.contains('Start now').click()
        if (isCrossOrigin) {
            cy.origin(Cypress.expose(`get_domain_${stage}`), () => {
                cy.get('#label-non-domestic').click()
                cy.contains('Continue').click()
                cy.get('input[name=postcode]').type('SW1A 2AA')
                cy.contains('button', 'Find').click()
            })
        } else {
            cy.get('#label-non-domestic').click()
            cy.contains('Continue').click()
            cy.get('input[name=postcode]').type('SW1A 2AA')
            cy.contains('button', 'Find').click()
        }
    })

    it('shows assessor search results', () => {
        if (isCrossOrigin) {
            cy.origin(Cypress.expose(`get_domain_${stage}`), () => {
                cy.get('body').should('contain', 'assessors in order of distance from SW1A 2AA')
            })
        } else {
            cy.get('body').should('contain', 'assessors in order of distance from SW1A 2AA')
        }
    })
})

describe('Find a non-domestic assessor (Welsh)', () => {
    beforeEach(() => {
        cy.visit(Cypress.expose(`get_service_cy_${stage}`))
        cy.contains('Dechrau nawr').click()
        if (isCrossOrigin) {
            cy.origin(Cypress.expose(`get_domain_${stage}`), () => {
                cy.get('#label-non-domestic').click()
                cy.contains('Parhau').click()
                cy.get('input[name=postcode]').type('SW1A 2AA')
                cy.contains('button', 'Chwiliwch').click()
            })
        } else {
            cy.get('#label-non-domestic').click()
            cy.contains('Parhau').click()
            cy.get('input[name=postcode]').type('SW1A 2AA')
            cy.contains('button', 'Chwiliwch').click()
        }
    })

    it('shows assessor search results', () => {
        if (isCrossOrigin) {
            cy.origin(Cypress.expose(`get_domain_${stage}`), () => {
                cy.get('body').should('contain', 'aseswyr yn nhrefn eu pellter o SW1A 2AA')
            })
        } else {
            cy.get('body').should('contain', 'aseswyr yn nhrefn eu pellter o SW1A 2AA')
        }
    })
})
