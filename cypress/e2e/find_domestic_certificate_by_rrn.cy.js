const stage = Cypress.expose('API_STAGE') || 'production'
const isCrossOrigin = (Cypress.expose(`get_service_en_${stage}`) !== Cypress.expose(`get_domain_${stage}`))

describe('Find domestic certificate by RRN in English', () => {
    context('when searching for a domestic certificate', () => {
        beforeEach(() => {
            cy.visit(Cypress.expose(`find_service_en_${stage}`))
            cy.contains('Start now').click()
            if (isCrossOrigin) {
                cy.origin(Cypress.expose(`find_domain_${stage}`), () => {
                    cy.get('#label-domestic').click()
                    cy.contains('button', 'Continue').click()
                    cy.contains('find an energy certificate by using its certificate number').click()
                    cy.get('input[name=reference_number]').type('9038-0010-6222-8839-5964')
                    cy.contains('button', 'Find').click()
                })
            } else {
                cy.get('#label-domestic').click()
                cy.contains('button', 'Continue').click()
                cy.contains('find an energy certificate by using its certificate number').click()
                cy.get('input[name=reference_number]').type('9038-0010-6222-8839-5964')
                cy.contains('button', 'Find').click()
            }
        })

        it('shows the certificate with the expected header', () => {
            if (isCrossOrigin) {
                cy.origin(Cypress.expose(`find_domain_${stage}`), () => {
                    cy.get('body').should('contain', 'Energy performance certificate (EPC)')
                })
            } else {
                cy.get('body').should('contain', 'Energy performance certificate (EPC)')
            }
        })
    })
})

describe('Find domestic certificate by RRN in Welsh', () => {
    context('when search for a domestic certificate in Welsh', () => {
        beforeEach(() => {
            cy.visit(Cypress.expose(`find_service_cy_${stage}`))
            cy.contains('Dechrau nawr').click()
            if (isCrossOrigin) {
                cy.origin(Cypress.expose(`find_domain_${stage}`), () => {
                    cy.get('#label-domestic').click()
                    cy.contains('Parhau').click()
                    cy.contains('ddod o hyd i dystysgrif ynni drwy ddefnyddio rhif y dystysgrif').click()
                    cy.get('input[name=reference_number]').type('9038-0010-6222-8839-5964')
                    cy.contains('button', 'Chwiliwch').click()
                })
            } else {
                cy.get('#label-domestic').click()
                cy.contains('Parhau').click()
                cy.contains('ddod o hyd i dystysgrif ynni drwy ddefnyddio rhif y dystysgrif').click()
                cy.get('input[name=reference_number]').type('9038-0010-6222-8839-5964')
                cy.contains('button', 'Chwiliwch').click()
            }
        })
        it('shows the certificate with the expected header', () => {
            if (isCrossOrigin) {
                cy.origin(Cypress.expose(`find_domain_${stage}`), () => {
                    cy.get('body').should('contain', 'Tystysgrif perfformiad ynni (EPC)')
                })
            } else {
                cy.get('body').should('contain', 'Tystysgrif perfformiad ynni (EPC)')
            }
        })
    })
})
