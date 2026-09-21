const stage = Cypress.expose('API_STAGE') || 'production'
const isCrossOrigin = (Cypress.expose(`get_service_en_${stage}`) !== Cypress.expose(`get_domain_${stage}`))

describe('Find a Domestic Assessor (English)', () => {
    it('shows assessor search results', () => {
        cy.visit(Cypress.expose(`get_service_en_${stage}`))
        cy.contains('Start now').click()
        if (isCrossOrigin) {
            cy.origin(Cypress.expose(`get_domain_${stage}`), () => {
                cy.get('#label-domestic').click()
                cy.contains('Continue').click()
                cy.get('#label-domesticRdSap').click()
                cy.contains('Continue').click()
                cy.get('input[name=postcode]').type('SW1A 2AA')
                cy.contains('button', 'Find').click()
                cy.get('body').should('contain', 'assessors in order of distance from SW1A 2AA')
            })
        } else {
            cy.get('#label-domestic').click()
            cy.contains('Continue').click()
            cy.get('#label-domesticRdSap').click()
            cy.contains('Continue').click()
            cy.get('input[name=postcode]').type('SW1A 2AA')
            cy.contains('button', 'Find').click()
            cy.get('body').should('contain', 'assessors in order of distance from SW1A 2AA')
        }
    })
})

describe('Find a Domestic Assessor (Welsh)', () => {
    it('shows assessor search results', () => {
        cy.visit(Cypress.expose(`get_service_cy_${stage}`))
        cy.contains('Dechrau nawr').click()
        if (isCrossOrigin) {
            cy.origin(Cypress.expose(`get_domain_${stage}`), () => {
                cy.get('#label-domestic').click()
                cy.contains('Parhau').click()
                cy.get('#label-domesticRdSap').click()
                cy.contains('Parhau').click()
                cy.get('input[name=postcode').type('SW1A 2AA')
                cy.contains('button', 'Chwiliwch').click()
                cy.get('body').should('contain', 'aseswyr yn nhrefn eu pellter o SW1A 2AA')
            })
        } else {
            cy.get('#label-domestic').click()
            cy.contains('Parhau').click()
            cy.get('#label-domesticRdSap').click()
            cy.contains('Parhau').click()
            cy.get('input[name=postcode').type('SW1A 2AA')
            cy.contains('button', 'Chwiliwch').click()
            cy.get('body').should('contain', 'aseswyr yn nhrefn eu pellter o SW1A 2AA')
        }
    })
})
