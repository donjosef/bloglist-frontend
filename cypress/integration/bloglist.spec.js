describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'gino1',
      name: 'gino',
      password: '11111'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy
      .get('.login-form')
      .should('contain', 'Username')
      .and('contain', 'Password')
      .and('contain', 'Login')
  })

  it('succeeds with correct credentials', function () {
    cy.get('#username').type('gino1')
    cy.get('#password').type('11111')
    cy.get('#login-btn').click()

    cy.contains('gino1 logged in')
  })

  it('fails with wrong credentials', function () {
    cy.get('#username').type('gino')
    cy.get('#password').type('11111')
    cy.get('#login-btn').click()

    cy.contains('invalid username')
    cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'gino1', password: '11111' })
    })

    it('a new blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-blog-btn').click()
      cy.contains('test title')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'test title', author: 'test author', url: 'test url' })
        cy.createBlog({ title: 'test title2', author: 'test author2', url: 'test url2' })
      })

      it('the blog likes can be updated', function () {
        cy.get('button[data-id="view-blog-btn"]:first').click()
        cy.get('[data-id="like-blog-btn"]:first').click()
        cy.get('button[data-id="view-blog-btn"]:last').click()
        cy.get('[data-id="like-blog-btn"]:last').click()

        cy.get('[data-id="blog"]:first').should('contain', 'Likes: 1')
        cy.get('[data-id="blog"]:last').should('contain', 'Likes: 1')
      })

      it('the blog has remove button', function () {
        cy.get('[data-id="view-blog-btn"]').click({ multiple: true })
        cy.contains('Remove')
      })

      it('blogs should be ordered based on likes', function () {
        cy.get('[data-id="view-blog-btn"]').last().click()
        cy.get('[data-id="like-blog-btn"]').last().click()

        cy.get('[data-id="blog"]:first').should('contain', 'Likes: 1')
      })
    })
  })

})
