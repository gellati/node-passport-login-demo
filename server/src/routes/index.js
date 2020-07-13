const express = require('express')
const router = express.Router()
const { ensureAuthenticated} = require('../../config/auth')

// Welcome page
router.get('/', (request, response) => response.render('welcome'))

// Dashboard page
router.get('/dashboard', ensureAuthenticated, (request, response) =>
  response.render('dashboard', {
    user: {
      name: request.user.name  // user.name in dashboard.ejs
    }
  })
)

module.exports = router