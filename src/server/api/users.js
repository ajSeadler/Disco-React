const express = require('express');
const usersRouter = express.Router();
const { requireUser } = require('./utilis');
const { JWT_SECRET = 'somesecretvalue' } = process.env;
const jwt = require('jsonwebtoken');

const { createUser, getUser, getUserByEmail } = require('../db');

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({
      users,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.get('/me', requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both an email and password',
    });
  }
  try {
    const user = await getUser({ email, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email,
        },
        JWT_SECRET,
        {
          expiresIn: '1w',
        }
      );

   
      res.send({
        message: 'Login successful!',
        token,
      });
    } else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      });
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.post('/register', async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user with that email already exists',
      });
    }

    const user = await createUser({
      name,
      email,
      password,
    });

    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      JWT_SECRET,
      {
        expiresIn: '1w',
      }
    );

    // Store the token in local storage


    res.send({
      message: 'Sign up successful!',
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
