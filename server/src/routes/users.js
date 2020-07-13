const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../../models/User')

// these routes have prefix /users
// Login page
router.get('/login', (request, response) => response.render('login'))

router.get('/register', (request, response) => response.render('register'))


router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []
  const passwordLength = 4

  if(!email || !name || !password || !password2 ) {
    errors.push({ msg: 'Please fill in all fields'})
  }

  if(password !== password2) {
    errors.push({ msg: 'Passwords do not match'})
  }

  if(password.length < passwordLength) {
    errors.push({ msg: `Password should be at least ${passwordLength} characters`})
  }

  if(errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
//    res.send('pass')
    User.findOne({ email: email})
      .then( user => {
        if(user) {
          errors.push({ msg: 'Email is already registered'})
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          })
        } else {
          const newUser = new User({
            name,
            email,
            password
          })

//          const salt = 10
          const saltRounds = 10

          bcrypt.genSalt(saltRounds, (saltErr, salt) => {
            bcrypt.hash( newUser.password, salt, (hashErr, hash) => {
              if(hashErr) throw hashErr

              newUser.password = hash
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in')
                  res.redirect('/users/login')
                })
                .catch(saveErr => console.log(saveErr))

            })
          })
        }
      })

  }

//  console.log(req)
//  console.log(req.body)
//  res.send('hello')


})

// Login handle
router.post('/login', (request, response, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(request, response, next)
})

// Logout handle
router.get('/logout', (request, response) => {
  request.logout()
  request.flash('success_msg', 'You are logged out')
  response.redirect('/users/login')
})


module.exports = router