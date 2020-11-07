/// <reference types="Cypress" />
describe('Default Test', () => {
    beforeEach(() => {
        cy.request('POST', 'https://localhost:3003/api/test/reset')
        const rootUser = {
            'username': 'admin',
            'name': 'admin',
            'password': 'admin'
        }
        cy.request('POST', 'https://localhost:3003/api/users', rootUser)
        cy.visit('http://localhost:3000')
    })
    it('Page should show login page by default', () => {
        cy.get('form').should('contain', 'Username').and('contain', 'Password').get('button').should('have.text', 'Login')
    })
    describe('login test', () => {
        it('only logs in with the correct user', () => {
            cy.login('admin', 'admin')
            cy.contains('admin is Logged In')
        })
        it('entering wrong information prints error', () => {
            cy.login('wrong', 'credentials')
            cy.contains('Wrong Username or Password')
        })
    })
    describe('logged in user has some actions', () => {
        it('logged in user can create a new blog', () => {
            cy.login('admin', 'admin')
            cy.contains('Create New Blog').click()
            cy.createBlog('A title', 'The Author', 'A link')
            cy.contains('A title by The Author')
        })

        it('logged in user can like a blog', () => {
            cy.login('admin', 'admin')
            cy.contains('Create New Blog').click()
            cy.createBlog('A title', 'The Author', 'A link')
            cy.contains('Show').click()
            cy.contains('Likes: 0')
            cy.get('.likeButton').click()
            cy.contains('Likes: 1')
        })
        it('logged in user can delete blog if he created it', () => {
            cy.login('admin', 'admin')
            cy.createBlog('title', 'auth', 'url')
            cy.contains('Show').click()
            cy.contains('Remove').click()
            cy.should('not.contain', 'title bt auth')
        })
        it('logged in user can\'t delete a blog if he is not the owner', () => {
            cy.login('admin', 'admin')
            cy.createBlog('title', 'auth', 'url')
            cy.contains('Logout').click()
            const newuser = {
                'username': 'test',
                'name': 'test',
                'password': 'test'
            }
            cy.request('POST', 'https://localhost:3003/api/users', newuser)
            cy.login('test', 'test')
            cy.contains('Show').click()
            cy.contains('Remove').click()
            cy.contains('title by auth')
        })
        describe('showing blogs', () => {
            it.only('blogs are sorted based on likes', () => {
                const blog1 = {
                    'title': 'A',
                    'author': 'B',
                    'likes': 3,
                    'url': 'C'
                }
                const blog2 = {
                    'title': 'D',
                    'author': 'E',
                    'likes': 2,
                    'url': 'F'
                }
                cy.request('POST', 'https://localhost:3003/api/login', { 'username': 'admin', 'password': 'admin' }).then(({ body }) => {
                    localStorage.setItem('CU', JSON.stringify(body))
                    console.log(body)
                    cy.request({
                        'url': 'https://localhost:3003/api/blogs',
                        'method': 'POST',
                        'body': blog2,
                        'headers': {
                            Authorization: `bearer ${body.token}`
                        }
                    })
                    cy.request({
                        'url': 'https://localhost:3003/api/blogs',
                        'method': 'POST',
                        'body': blog1,
                        'headers': {
                            'Authorization': `bearer ${body.token}`
                        }
                    })
                    cy.reload()
                })
                cy.get('div>p').eq(0).contains('Show').click()
                cy.get('div>p').eq(3).contains('Likes: 3') //If it passes first blog is one with most likes
                cy.get('div>p').eq(5).contains('Show').click()
                cy.get('div>p').eq(8).contains('Likes: 2') //Second Likes property is 2 one with less likes
            })
        })
    })
})
