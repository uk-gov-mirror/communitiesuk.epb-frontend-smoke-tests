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
            })
        } else {
            cy.get('#label-non-domestic').click()
            cy.contains('Continue').click()
        }
    })

    context('when searching by name', () => {
        beforeEach(() => {
            if (isCrossOrigin) {
                cy.origin(Cypress.expose(`get_domain_${stage}`), () => {
                    cy.contains('find an assessor by name').click()
                    cy.get('input[name=name]').type('Andrew Parkin')
                    cy.contains('button', 'Search').click()
                })
            } else {
                cy.contains('find an assessor by name').click()
                cy.get('input[name=name]').type('Andrew Parkin')
                cy.contains('button', 'Search').click()
            }
        })

        it('shows assessor search results', () => {
            if (isCrossOrigin) {
                cy.origin(Cypress.expose(`get_domain_${stage}`), () => {
                    cy.get('body').should(body => {
                        const bodyInner = body.text()
                        expect(bodyInner).to.match(/results? for the name Andrew Parkin/)
                    })
                })
            } else {
                cy.get('body').should(body => {
                    const bodyInner = body.text()
                    expect(bodyInner).to.match(/results? for the name Andrew Parkin/)
                })
            }
        })
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
            })
        } else {
            cy.get('#label-non-domestic').click()
            cy.contains('Parhau').click()
        }
    })

    context('when searching for an assessor by name', () => {
        beforeEach(() => {
            if (isCrossOrigin) {
                cy.origin(Cypress.expose(`get_domain_${stage}`), () => {
                    cy.contains('chwilio am asesydd yn ôl enw').click()
                    cy.get('input[name=name]').type('Andrew Parkin')
                    cy.contains('button', 'Chwiliwch').click()
                })
            } else {
                cy.contains('chwilio am asesydd yn ôl enw').click()
                cy.get('input[name=name]').type('Andrew Parkin')
                cy.contains('button', 'Chwiliwch').click()
            }
        })

        it('shows assessor search results', () => {
            if (isCrossOrigin) {
                cy.origin(Cypress.expose(`get_domain_${stage}`), () => {
                    cy.get('body').should(body => {
                        const bodyInner = body.text()
                        expect(bodyInner).to.match(/canlyniad(au)? ar gyfer yr enw Andrew Parkin/)
                    })
                })
            } else {
                cy.get('body').should(body => {
                    const bodyInner = body.text()
                    expect(bodyInner).to.match(/canlyniad(au)? ar gyfer yr enw Andrew Parkin/)
                })
            }
        })
    })
})
