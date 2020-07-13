const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

const app = express()

// Passport config
require('../config/passport')(passport)

const db = require('../config/keys').url

// Connect to Mongo
mongoose.connect(db,
  { useNewUrlParser: true, }
  )
  .then( () => console.log('MongoDB Connected'))
  .catch(err => console.log(err))


// EJS
const viewPath = path.join(__dirname, './views')
app.use(expressLayouts)
app.set('views', viewPath)
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.urlencoded({ extended: false }))

// Express session
app.use(session({
  secret: 'da scret',
  resave: true,
  saveUninitialized: true,
}))


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global variables
app.use((request, response, next) => {
  response.locals.success_msg = request.flash('success_msg')
  response.locals.error_msg = request.flash('error_msg')
  response.locals.error = request.flash('error')
  next()
})

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.SERVER_PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))
