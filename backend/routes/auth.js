const Router = require('express').Router
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const db = require('../db')

const router = Router()

const createToken = () => {
  return jwt.sign({}, 'secret', { expiresIn: '1h' })
}

//test testing

router.post('/login', async (req, res, next) => {
  const email = await db
    .getDb()
    .collection('user')
    .findOne({ email: res.body.email })

  const pw = req.body.password
  // Check if user login is valid
  if (email) {
    // bcrypt.
  }
  // If yes, create token and return it to client
  const token = createToken()
  // res.status(200).json({ token: token, user: { email: 'dummy@dummy.com' } });
  res
    .status(401)
    .json({ message: 'Authentication failed, invalid username or password.' })
})

router.post('/signup', (req, res, next) => {
  const email = req.body.email
  const pw = req.body.password
  // Hash password before storing it in database => Encryption at Rest
  bcrypt
    .hash(pw, 12)
    .then((hashedPW) => {
      // Store hashedPW in database

      db.getDb()
        .db()
        .collection('users')
        .insertOne({
          email,
          hashedPW,
        })
        .then((result) => {
          console.log(result)
          res.status(201).json({ token: token, user: { email } })
        })
        .catch((err) => {
          res
            .status(409)
            .json({ message: 'User with that name already exists' })
        })
      console.log(hashedPW)
      const token = createToken()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Creating the user failed.' })
    })
  // Add user to database
})

module.exports = router
