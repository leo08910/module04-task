
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'
import { expect, assert } from 'chai'
import 'chai/register-should'

describe('My Login application', () => {
    it('should login with valid credentials using chai expect', async () => {
        await LoginPage.open()

        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        const alertText = await SecurePage.flashAlert.getText()
        expect(alertText).to.include('You logged into a secure area!')
    })

    it('should login with valid credentials using chai assert', async () => {
        await LoginPage.open()

        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        const alertText = await SecurePage.flashAlert.getText()
        assert.include(alertText, 'You logged into a secure area!')
    })

    it('should login with valid credentials using chai should', async () => {
        await LoginPage.open()

        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        const alertText = await SecurePage.flashAlert.getText()
        alertText.should.include('You logged into a secure area!')
    })
})

