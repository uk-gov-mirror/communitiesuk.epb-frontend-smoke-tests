const stage = Cypress.expose('API_STAGE') || 'production'
const isCrossOrigin = (Cypress.expose(`get_service_en_${stage}`) !== Cypress.expose(`get_domain_${stage}`))

describe('Find DEC by postcode (English)', () => {
    beforeEach(() => {
        cy.visit(Cypress.expose(`find_service_en_${stage}`))
        cy.contains('Start now').click()
        if (isCrossOrigin) {
            cy.origin(Cypress.expose(`find_domain_${stage}`), () => {
                cy.get('#label-non-domestic').click()
                cy.contains('Continue').click()
                cy.get('input[name=postcode]').type('SW1A 2AA')
                cy.contains('button', 'Find').click()
                cy.contains('DEC').click()
            })
        } else {
            cy.get('#label-non-domestic').click()
            cy.contains('Continue').click()
            cy.get('input[name=postcode]').type('SW1A 2AA')
            cy.contains('button', 'Find').click()
            cy.contains('DEC').click()
        }
    })

    it('shows the certificate with the expected header', () => {
        if (isCrossOrigin) {
            cy.origin(Cypress.expose(`find_domain_${stage}`), () => {
                cy.get('body').should('contain', 'Display energy certificate (DEC)')
            })
        } else {
            cy.get('body').should('contain', 'Display energy certificate (DEC)')
        }
    })
})

describe('Find DEC by postcode (Welsh)', () => {
    beforeEach(() => {
        cy.visit(Cypress.expose(`find_service_cy_${stage}`))
        cy.contains('Dechrau nawr').click()
        if (isCrossOrigin) {
            cy.origin(Cypress.expose(`find_domain_${stage}`), () => {
                cy.get('#label-non-domestic').click()
                cy.contains('Parhau').click()
                cy.get('input[name=postcode]').type('SW1A 2AA')
                cy.contains('button', 'Chwiliwch').click()
                cy.contains('DEC').click()
            })
        } else {
            cy.get('#label-non-domestic').click()
            cy.contains('Parhau').click()
            cy.get('input[name=postcode]').type('SW1A 2AA')
            cy.contains('button', 'Chwiliwch').click()
            cy.contains('DEC').click()
        }
    })

    it('shows the certificate with the expected header', () => {
        if (isCrossOrigin) {
            cy.origin(Cypress.expose(`find_domain_${stage}`), () => {
                cy.get('body').should('contain', 'Tystysgrif ynni i’w harddangos (DEC)')
            })
        } else {
            cy.get('body').should('contain', 'Tystysgrif ynni i’w harddangos (DEC)')
        }
    })
})
